function appendForm(form, prefix, value) {
  if (value === undefined || value === null) return;
  if (Array.isArray(value)) return value.forEach((item, index) => appendForm(form, `${prefix}[${index}]`, item));
  if (typeof value === 'object') return Object.entries(value).forEach(([key, item]) => appendForm(form, `${prefix}[${key}]`, item));
  form.append(prefix, String(value));
}

function encoded(params = {}) {
  const form = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => appendForm(form, key, value));
  return form;
}

export function stripeRestClient(key) {
  const base = 'https://api.stripe.com';
  async function request(method, path, params = {}, idempotencyKey) {
    const form = encoded(params);
    const url = method === 'GET' && form.size ? `${base}${path}?${form}` : `${base}${path}`;
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${key}`,
        'Stripe-Version': '2026-06-24.dahlia',
        ...(method === 'POST' ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {}),
        ...(idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : {}),
      },
      body: method === 'POST' ? form : undefined,
    });
    const body = await response.json();
    if (!response.ok) {
      const error = new Error(`Stripe API rejected ${method} ${path}: ${body.error?.type ?? 'request_error'} (${body.error?.code ?? response.status}).`);
      error.statusCode = response.status;
      throw error;
    }
    return body;
  }

  async function listAll(path, params = {}) {
    const data = [];
    let startingAfter;
    do {
      const page = await request('GET', path, { ...params, limit: 100, ...(startingAfter ? { starting_after: startingAfter } : {}) });
      data.push(...page.data);
      startingAfter = page.has_more ? page.data.at(-1)?.id : undefined;
    } while (startingAfter);
    return data;
  }

  return { request, listAll };
}
