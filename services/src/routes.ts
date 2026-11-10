import { Router } from 'express';
import { actions } from './registry.js';
import { ok } from './lib/responseHelpers.js';
export const router = Router();
router.get('/health', (_req, res) => res.json({ ok: true }));
for (const action of actions) {
  router.post(action.path, async (req, res, next) => {
    try {
      const input = action.input.parse(req.body);
      res.json(ok(await action.run(input)));
    } catch (error) { next(error); }
  });
}
