export const CATALOG_VERSION = '2026-07-14';
export const OWNER_BRAND = 'netolabs';

export const products = [
  {
    key: 'voxa', name: 'Voxa', repoSlug: 'voxa', canonicalUrl: 'https://voxa.netolabs.dev', taxCode: 'txcd_10103001',
    description: 'Conversation intelligence that turns conversations into actionable knowledge.',
    prices: [
      ['voxa_pro_monthly_brl', 'voxa_pro', 'voxa_pro', 1490, 'brl', 'month', 'STRIPE_PRICE_VOXA'],
    ].map(([lookupKey, packageKey, entitlementKey, unitAmount, currency, interval, envName]) => ({ lookupKey, packageKey, entitlementKey, unitAmount, currency, interval, envName, taxBehavior: 'exclusive' })),
  },
  {
    key: 'benchline', name: 'Benchline', repoSlug: 'netolabs-benchline', canonicalUrl: 'https://evals.netolabs.dev',
    description: 'Release intelligence and evidence-backed evaluation for AI agents.', taxCode: 'txcd_10103001',
    prices: [
      ['benchline_launch_10_monthly_usd', 'launch_10', 'benchline_monthly_runs', 2900, 'usd', 'month', 'STRIPE_PRICE_LAUNCH_10'],
      ['benchline_team_50_monthly_usd', 'team_50', 'benchline_monthly_runs', 9900, 'usd', 'month', 'STRIPE_PRICE_TEAM_50'],
      ['benchline_scale_unlimited_monthly_usd', 'scale_unlimited', 'benchline_monthly_runs', 29900, 'usd', 'month', 'STRIPE_PRICE_SCALE_UNLIMITED'],
      ['benchline_topup_10_once_usd', 'topup_10', 'benchline_purchased_runs', 3900, 'usd', null, 'STRIPE_PRICE_TOPUP_10'],
      ['benchline_topup_50_once_usd', 'topup_50', 'benchline_purchased_runs', 13900, 'usd', null, 'STRIPE_PRICE_TOPUP_50'],
    ].map(([lookupKey, packageKey, entitlementKey, unitAmount, currency, interval, envName]) => ({ lookupKey, packageKey, entitlementKey, unitAmount, currency, interval, envName, taxBehavior: 'exclusive' })),
  },
  {
    key: 'forge', name: 'Forge', repoSlug: 'netolabs-forge', canonicalUrl: 'https://forge.netolabs.dev',
    description: 'A controlled workspace to build, ground, and evaluate dependable AI agents.', taxCode: 'txcd_10103001',
    prices: [
      ['solo', 'brl', 14900], ['solo', 'usd', 2900], ['studio', 'brl', 34900], ['studio', 'usd', 6900], ['scale', 'brl', 89900], ['scale', 'usd', 17900],
    ].map(([plan, currency, unitAmount]) => ({ lookupKey: `forge_${plan}_monthly_${currency}`, packageKey: plan, entitlementKey: 'forge_plan_access', unitAmount, currency, interval: 'month', envName: `STRIPE_PRICE_${String(plan).toUpperCase()}_${String(currency).toUpperCase()}`, taxBehavior: 'exclusive' })),
  },
];

export function productMetadata(spec) {
  return { owner_brand: OWNER_BRAND, product_key: spec.key, repo_slug: spec.repoSlug, canonical_url: spec.canonicalUrl, catalog_version: CATALOG_VERSION, commercial_status: 'approved' };
}

export function productMutableMismatch(spec, remote) {
  const metadata = productMetadata(spec);
  return remote.name !== spec.name || remote.description !== spec.description || !remote.active || (spec.taxCode && remote.tax_code !== spec.taxCode) || Object.entries(metadata).some(([key, value]) => remote.metadata?.[key] !== value);
}

export function priceMetadata(product, price) {
  return { owner_brand: OWNER_BRAND, product_key: product.key, package_key: price.packageKey, entitlement_key: price.entitlementKey, catalog_version: CATALOG_VERSION, commercial_status: 'approved' };
}

export function keyMode(key) {
  if (/^(rk|sk)_test_/.test(key ?? '')) return 'test';
  if (/^(rk|sk)_live_/.test(key ?? '')) return 'live';
  throw new Error('Stripe key must be a server-side test/live restricted or secret key.');
}

export function assertExecutionGate({ key, apply, targetAccount, allowLive, liveEnv }) {
  const mode = keyMode(key);
  if (apply && !targetAccount?.startsWith('acct_')) throw new Error('Apply requires --account acct_... to prevent cross-account mutation.');
  if (mode === 'live' && (!allowLive || liveEnv !== 'true')) throw new Error('Refusing live-mode catalog access without --allow-live and ALLOW_STRIPE_LIVE_BOOTSTRAP=true.');
  return mode;
}

export function selectCanonicalProduct(remoteProducts, spec) {
  const stable = remoteProducts.filter((item) => item.metadata?.owner_brand === OWNER_BRAND && item.metadata?.product_key === spec.key);
  const active = stable.filter((item) => item.active);
  if (active.length > 1) throw new Error(`Duplicate active Products for product_key=${spec.key}; manual canonical selection is required.`);
  const nameOnly = remoteProducts.filter((item) => item.active && item.name.toLowerCase() === spec.name.toLowerCase() && !stable.includes(item));
  return { canonical: active[0] ?? stable[0] ?? null, nameOnly };
}

export function priceMismatch(spec, remote, parentId, expectedLive) {
  if (!remote.active) return 'inactive';
  if (remote.product !== parentId && remote.product?.id !== parentId) return 'parent';
  if (remote.livemode !== expectedLive) return 'mode';
  if (remote.currency !== spec.currency) return 'currency';
  if (remote.unit_amount !== spec.unitAmount) return 'amount';
  if (remote.tax_behavior !== spec.taxBehavior) return 'tax_behavior';
  if (spec.interval && (remote.type !== 'recurring' || remote.recurring?.interval !== spec.interval || remote.recurring?.interval_count !== 1)) return 'cadence';
  if (!spec.interval && remote.type !== 'one_time') return 'cadence';
  return null;
}

export function priceMutableMismatch(product, spec, remote) {
  const metadata = priceMetadata(product, spec);
  return remote.nickname !== spec.lookupKey || Object.entries(metadata).some(([key, value]) => remote.metadata?.[key] !== value);
}

export function canArchivePrice({ explicitlyAllowed, mode, activeSubscriptions, activePaymentLinks }) {
  return explicitlyAllowed && mode === 'test' && activeSubscriptions === 0 && activePaymentLinks === 0;
}
