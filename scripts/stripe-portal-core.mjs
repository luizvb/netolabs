export const PORTAL_HEADLINE = 'Manage your NetoLabs billing and payment details';

export function portalSettings(env = process.env) {
  return {
    business_profile: {
      headline: PORTAL_HEADLINE,
      ...(env.STRIPE_PRIVACY_URL ? { privacy_policy_url: env.STRIPE_PRIVACY_URL } : {}),
      ...(env.STRIPE_TERMS_URL ? { terms_of_service_url: env.STRIPE_TERMS_URL } : {}),
    },
    features: {
      customer_update: { enabled: true, allowed_updates: ['address', 'name', 'tax_id'] },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: { enabled: true, mode: 'at_period_end', cancellation_reason: { enabled: true, options: ['too_expensive', 'missing_features', 'switched_service', 'unused', 'other'] } },
      subscription_update: { enabled: false },
    },
  };
}

export function selectPortalConfiguration(configurations) {
  const candidates = configurations.filter((item) => [PORTAL_HEADLINE, 'Manage your Benchline plan and payment details'].includes(item.business_profile?.headline));
  if (candidates.length > 1) throw new Error('Multiple NetoLabs/legacy Portal configurations found; select the canonical configuration manually.');
  return candidates[0] ?? null;
}
