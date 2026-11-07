import { Router } from 'express';
import { asyncRoute, secretMatches } from '../lib/validation.js';
import { authenticate, saveSession } from '../lib/session.js';

const clientVariables = new Map([
  ['weconnectu', 'CLIENT_ACCESS_CODE_WECONNECTU'],
  ['comotion', 'CLIENT_ACCESS_CODE_COMOTION'],
  ['toomuchiwifi', 'CLIENT_ACCESS_CODE_TOOMUCHIWIFI'],
]);

export function clientAuthRoutes({ env }) {
  const router = Router();
  router.use('/clients/:slug', (req, res, next) => {
    if (!clientVariables.has(req.params.slug)) return res.status(404).json({ error: 'Unknown client' });
    next();
  });
  router.post('/clients/:slug/unlock', asyncRoute(async (req, res) => {
    const slug = req.params.slug;
    if (!secretMatches(req.body.code, env[clientVariables.get(slug)])) {
      return res.status(401).json({ error: 'Invalid access code' });
    }
    await authenticate(req, (session) => { session.clients[slug] = true; });
    res.json({ success: true });
  }));
  router.get('/clients/:slug/session', (req, res) => {
    res.json({ authenticated: !!req.session.clients?.[req.params.slug] });
  });
  router.post('/clients/:slug/logout', asyncRoute(async (req, res) => {
    if (req.session.clients) {
      delete req.session.clients[req.params.slug];
      await saveSession(req);
    }
    res.json({ success: true });
  }));
  return router;
}
