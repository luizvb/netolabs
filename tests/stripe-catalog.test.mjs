import test from 'node:test';
import assert from 'node:assert/strict';
import { assertExecutionGate, canArchivePrice, priceMetadata, priceMismatch, productMetadata, products, selectCanonicalProduct } from '../scripts/stripe-catalog-core.mjs';

test('catalog contains exactly three Products and all 12 approved Prices', () => {
  assert.deepEqual(products.map((product) => product.key), ['voxa', 'benchline', 'forge']);
  assert.deepEqual(products.map((product) => product.prices.length), [1, 5, 6]);
  assert.equal(new Set(products.flatMap((product) => product.prices.map((price) => price.lookupKey))).size, 12);
});

test('metadata and Voxa commercial contract are approved and stable', () => {
  const forge = products.find((product) => product.key === 'forge');
  assert.equal(productMetadata(forge).commercial_status, 'approved');
  assert.equal(priceMetadata(forge, forge.prices[0]).commercial_status, 'approved');
  const voxa = products.find((product) => product.key === 'voxa');
  assert.deepEqual(voxa.prices[0], { lookupKey: 'voxa_pro_monthly_brl', packageKey: 'voxa_pro', entitlementKey: 'voxa_pro', unitAmount: 1490, currency: 'brl', interval: 'month', envName: 'STRIPE_PRICE_VOXA', taxBehavior: 'exclusive' });
});

test('live and cross-account writes require independent explicit gates', () => {
  assert.equal(assertExecutionGate({ key: 'rk_test_example', apply: false }), 'test');
  assert.throws(() => assertExecutionGate({ key: 'rk_test_example', apply: true }), /--account/);
  assert.throws(() => assertExecutionGate({ key: 'rk_live_example', apply: false, allowLive: true, liveEnv: 'false' }), /Refusing live/);
  assert.equal(assertExecutionGate({ key: 'rk_live_example', apply: true, targetAccount: 'acct_example', allowLive: true, liveEnv: 'true' }), 'live');
});

test('name-only and duplicate Product matches never reconcile silently', () => {
  const spec = products[0];
  assert.equal(selectCanonicalProduct([{ id: 'prod_name', name: 'Voxa', active: true, metadata: {} }], spec).canonical, null);
  assert.throws(() => selectCanonicalProduct([{ id: 'prod_1', name: 'Voxa', active: true, metadata: { owner_brand: 'netolabs', product_key: 'voxa' } }, { id: 'prod_2', name: 'Voxa', active: true, metadata: { owner_brand: 'netolabs', product_key: 'voxa' } }], spec), /Duplicate active/);
});

test('Price validation fails on immutable commercial fields', () => {
  const spec = products[2].prices[0];
  const valid = { active: true, product: 'prod_forge', livemode: false, currency: 'brl', unit_amount: 14900, tax_behavior: 'exclusive', type: 'recurring', recurring: { interval: 'month', interval_count: 1 } };
  assert.equal(priceMismatch(spec, valid, 'prod_forge', false), null);
  assert.equal(priceMismatch(spec, { ...valid, unit_amount: 1 }, 'prod_forge', false), 'amount');
  assert.equal(canArchivePrice({ explicitlyAllowed: true, mode: 'test', activeSubscriptions: 0, activePaymentLinks: 0 }), true);
  assert.equal(canArchivePrice({ explicitlyAllowed: true, mode: 'live', activeSubscriptions: 0, activePaymentLinks: 0 }), false);
});
