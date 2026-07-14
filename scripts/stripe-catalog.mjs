import { assertExecutionGate, canArchivePrice, keyMode, priceMetadata, priceMismatch, priceMutableMismatch, productMetadata, productMutableMismatch, products } from './stripe-catalog-core.mjs';
import { stripeRestClient } from './stripe-rest-client.mjs';

const args = new Set(process.argv.slice(2));
const valueAfter = (flag) => { const index = process.argv.indexOf(flag); return index >= 0 ? process.argv[index + 1] : undefined; };
const apply = args.has('--apply');
const archiveSafe = args.has('--archive-safe');
const allowLive = args.has('--allow-live');
const targetAccount = valueAfter('--account') ?? process.env.STRIPE_TARGET_ACCOUNT;
const key = process.env.STRIPE_RESTRICTED_KEY || process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error('Set STRIPE_RESTRICTED_KEY (preferred) or STRIPE_SECRET_KEY in the shell. Never paste it into this script.');
const mode = assertExecutionGate({ key, apply, targetAccount, allowLive, liveEnv: process.env.ALLOW_STRIPE_LIVE_BOOTSTRAP });
if (archiveSafe && !apply) throw new Error('--archive-safe is only valid together with --apply.');
if (!key.startsWith('rk_')) process.stderr.write('Warning: use a least-privilege restricted key (rk_) per product/environment whenever possible.\n');

const stripe = stripeRestClient(key);
const account = await stripe.request('GET', '/v1/account');
if (targetAccount && account.id !== targetAccount) throw new Error(`Authenticated Stripe account does not match explicit target account ${targetAccount}.`);
const expectedLive = keyMode(key) === 'live';
const remoteProducts = await stripe.listAll('/v1/products');

async function dependencyCounts(priceId) {
  const subscriptions = await stripe.listAll('/v1/subscriptions', { price: priceId, status: 'all' });
  const nonTerminal = subscriptions.filter((subscription) => !['canceled', 'incomplete_expired'].includes(subscription.status)).length;
  let activePaymentLinks = 0;
  for (const link of await stripe.listAll('/v1/payment_links', { active: true })) {
    const items = await stripe.listAll(`/v1/payment_links/${link.id}/line_items`);
    if (items.some((item) => item.price?.id === priceId)) activePaymentLinks += 1;
  }
  return { activeSubscriptions: nonTerminal, activePaymentLinks };
}

async function ensureProduct(spec) {
  const stable = remoteProducts.filter((item) => item.metadata?.owner_brand === 'netolabs' && item.metadata?.product_key === spec.key);
  const active = stable.filter((item) => item.active);
  if (active.length > 1) throw new Error(`Duplicate active Products for product_key=${spec.key}; manual canonical selection is required.`);
  const nameOnly = remoteProducts.filter((item) => item.active && item.name.toLowerCase() === spec.name.toLowerCase() && !stable.includes(item));
  if (nameOnly.length) process.stderr.write(`Manual review: ${nameOnly.length} active name-only Product match(es) for ${spec.name}; none will be adopted or archived.\n`);
  let product = active[0] ?? stable[0];
  const desired = { name: spec.name, description: spec.description, active: true, metadata: productMetadata(spec), ...(spec.taxCode ? { tax_code: spec.taxCode } : {}) };
  if (!product) {
    if (!apply) return { id: `<create:${spec.key}>`, ...desired };
    product = await stripe.request('POST', '/v1/products', desired, `netolabs-product:${spec.key}:2026-07-14:${mode}`);
    remoteProducts.push(product);
  } else if (apply && productMutableMismatch(spec, product)) product = await stripe.request('POST', `/v1/products/${product.id}`, desired);
  return product;
}

async function ensurePrice(productSpec, product, spec) {
  const matches = await stripe.listAll('/v1/prices', { lookup_keys: [spec.lookupKey], expand: ['data.product'] });
  const exact = matches.find((remote) => !priceMismatch(spec, remote, product.id, expectedLive));
  if (exact) {
    if (apply && priceMutableMismatch(productSpec, spec, exact)) return stripe.request('POST', `/v1/prices/${exact.id}`, { nickname: spec.lookupKey, metadata: priceMetadata(productSpec, spec) });
    return exact;
  }
  const mismatches = matches.map((remote) => ({ remote, reason: priceMismatch(spec, remote, product.id, expectedLive) }));
  if (!apply || product.id.startsWith('<create:')) return { id: `<create:${spec.lookupKey}>`, lookup_key: spec.lookupKey };
  const created = await stripe.request('POST', '/v1/prices', {
    product: product.id, currency: spec.currency, unit_amount: spec.unitAmount, tax_behavior: spec.taxBehavior, nickname: spec.lookupKey, lookup_key: spec.lookupKey,
    transfer_lookup_key: true, recurring: spec.interval ? { interval: spec.interval } : undefined, metadata: priceMetadata(productSpec, spec),
  }, `netolabs-price:${spec.lookupKey}:2026-07-14:${mode}`);
  for (const { remote, reason } of mismatches) {
    if (!archiveSafe || !remote.active || reason === 'mode') continue;
    const dependencies = await dependencyCounts(remote.id);
    if (canArchivePrice({ explicitlyAllowed: archiveSafe, mode, ...dependencies })) await stripe.request('POST', `/v1/prices/${remote.id}`, { active: false });
    else process.stderr.write(`Preserved ${remote.id}: archive safety check found active dependencies or an invalid mode.\n`);
  }
  return created;
}

process.stdout.write(`# NetoLabs Stripe catalog plan (${mode}, ${apply ? 'apply' : 'dry-run'})\n`);
for (const productSpec of products) {
  const product = await ensureProduct(productSpec);
  process.stdout.write(`PRODUCT_${productSpec.key.toUpperCase()}=${product.id}\n`);
  for (const priceSpec of productSpec.prices) {
    const price = await ensurePrice(productSpec, product, priceSpec);
    process.stdout.write(`${priceSpec.envName}=${price.id}\n`);
  }
}
