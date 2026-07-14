import test from 'node:test';
import assert from 'node:assert/strict';
import { PORTAL_HEADLINE, portalSettings, selectPortalConfiguration } from '../scripts/stripe-portal-core.mjs';

test('standard Portal is neutral and supports the approved self-service lifecycle', () => {
  const settings = portalSettings({});
  assert.equal(settings.business_profile.headline, PORTAL_HEADLINE);
  assert.deepEqual(settings.features.customer_update, { enabled: true, allowed_updates: ['address', 'name', 'tax_id'] });
  assert.equal(settings.features.invoice_history.enabled, true);
  assert.equal(settings.features.payment_method_update.enabled, true);
  assert.equal(settings.features.subscription_cancel.mode, 'at_period_end');
  assert.equal(settings.features.subscription_update.enabled, false);
});

test('legacy Benchline Portal can be adopted only when unambiguous', () => {
  const legacy = { id: 'bpc_legacy', business_profile: { headline: 'Manage your Benchline plan and payment details' } };
  assert.equal(selectPortalConfiguration([legacy]), legacy);
  assert.equal(selectPortalConfiguration([]), null);
  assert.throws(() => selectPortalConfiguration([legacy, { id: 'bpc_standard', business_profile: { headline: PORTAL_HEADLINE } }]), /Multiple/);
});
