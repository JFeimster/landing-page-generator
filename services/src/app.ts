import express, { type ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { router } from './routes.js';
import { ActionError } from './lib/responseHelpers.js';
export function createApp(options: { limit?: number; windowMs?: number } = {}) {
  const app = express();
  app.disable('x-powered-by');
  // Do not trust arbitrary forwarded IP headers. Configure a trusted proxy at deployment explicitly.
  const clients = new Map<string, { count: number; until: number }>();
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'no-store');
    if (req.method !== 'POST') { next(); return; }
    const now = Date.now();
    const key = req.ip ?? 'unknown';
    if (clients.size >= 10000) for (const [id, record] of clients) if (record.until <= now) clients.delete(id);
    if (clients.size >= 10000 && !clients.has(key)) { res.status(503).json({ status: 'error', error: { code: 'CAPACITY', message: 'Please retry later.' } }); return; }
    const record = clients.get(key);
    const current = record && record.until > now ? record : { count: 0, until: now + (options.windowMs ?? 60000) };
    current.count++;
    clients.set(key, current);
    if (current.count > (options.limit ?? 30)) {
      res.setHeader('Retry-After', String(Math.ceil((current.until - now) / 1000)));
      res.status(429).json({ status: 'error', error: { code: 'RATE_LIMIT', message: 'Request limit reached. Retry later.' } });
      return;
    }
    next();
  });
  app.use(express.json({ limit: '512kb', strict: true }));
  app.use(router);
  app.use((_req, res) => res.status(404).json({ status: 'error', error: { code: 'NOT_FOUND', message: 'Unknown endpoint.' } }));
  const errors: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof ZodError) { res.status(400).json({ status: 'error', error: { code: 'INVALID_INPUT', message: error.issues.map(i => i.path.join('.') + ': ' + i.message).join('; ') } }); return; }
    if (error instanceof ActionError) { res.status(error.status).json({ status: 'error', error: { code: error.code, message: error.message } }); return; }
    if (error?.type === 'entity.too.large') { res.status(413).json({ status: 'error', error: { code: 'BODY_TOO_LARGE', message: 'JSON body exceeds 512 KB.' } }); return; }
    if (error?.type === 'entity.parse.failed') { res.status(400).json({ status: 'error', error: { code: 'INVALID_JSON', message: 'Send valid JSON.' } }); return; }
    res.status(500).json({ status: 'error', error: { code: 'INTERNAL_ERROR', message: 'The request could not be completed.' } });
  };
  app.use(errors);
  return app;
}
