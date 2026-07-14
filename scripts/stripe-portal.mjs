import { assertExecutionGate } from './stripe-catalog-core.mjs';
import { PORTAL_HEADLINE, portalSettings, selectPortalConfiguration } from './stripe-portal-core.mjs';
import { stripeRestClient } from './stripe-rest-client.mjs';

const args = new Set(process.argv.slice(2));
const valueAfter = (flag) => { const index = process.argv.indexOf(flag); return index >= 0 ? process.argv[index + 1] : undefined; };
const apply = args.has('--apply');
const allowLive = args.has('--allow-live');
const targetAccount = valueAfter('--account') ?? process.env.STRIPE_TARGET_ACCOUNT;
const key = process.env.STRIPE_RESTRICTED_KEY || process.env.STRIPE_SECRET_KEY;
if (!key) throw new Error('Set STRIPE_RESTRICTED_KEY (preferred) or STRIPE_SECRET_KEY in the shell. Never paste it into this script.');
const mode = assertExecutionGate({ key, apply, targetAccount, allowLive, liveEnv: process.env.ALLOW_STRIPE_LIVE_BOOTSTRAP });
const stripe = stripeRestClient(key);
const account = await stripe.request('GET', '/v1/account');
if (targetAccount && account.id !== targetAccount) throw new Error(`Authenticated Stripe account does not match explicit target account ${targetAccount}.`);
const configurations = await stripe.listAll('/v1/billing_portal/configurations');
const existing = selectPortalConfiguration(configurations);
if (!apply) {
  process.stdout.write(`# NetoLabs Portal plan (${mode}, dry-run)\nSTRIPE_PORTAL_CONFIGURATION_ID=${existing?.id ?? '<create:netolabs-standard-portal>'}\n`);
  process.exit(0);
}
const settings = portalSettings();
const portal = existing
  ? await stripe.request('POST', `/v1/billing_portal/configurations/${existing.id}`, settings)
  : await stripe.request('POST', '/v1/billing_portal/configurations', settings, `netolabs-standard-portal:2026-07-14:${mode}`);
if (portal.business_profile?.headline !== PORTAL_HEADLINE || portal.features?.subscription_update?.enabled !== false) throw new Error('Stripe returned an unexpected Portal configuration.');
process.stdout.write(`STRIPE_PORTAL_CONFIGURATION_ID=${portal.id}\n`);
