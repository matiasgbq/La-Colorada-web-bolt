const TARGET = 'https://gwvaixuymtctmzrfoewl.supabase.co/functions/v1/la-colorada-central-connector';

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(typeof body === 'string' ? body : JSON.stringify(body));
}

export default async function handler(req, res) {
  const expected = process.env.CENTRAL_CONNECTOR_TOKEN;
  if (!expected) return send(res, 503, { error: 'connector_not_configured' });

  const supplied = req.headers['x-la-colorada-key'] ||
    String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!supplied || supplied !== expected) return send(res, 401, { error: 'unauthorized' });

  if (!['GET', 'POST'].includes(req.method)) return send(res, 405, { error: 'method_not_allowed' });

  try {
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const response = await fetch(TARGET + qs, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'x-la-colorada-key': expected,
      },
      body: req.method === 'POST' ? JSON.stringify(req.body ?? {}) : undefined,
    });
    const text = await response.text();
    res.status(response.status);
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.end(text);
  } catch (error) {
    console.error(error);
    send(res, 502, { error: 'connector_upstream_error' });
  }
}
