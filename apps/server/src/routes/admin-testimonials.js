import { Router } from 'express';
import { asyncRoute, httpError, secretMatches } from '../lib/validation.js';
import { serializeTestimonial } from '../lib/storage.js';
import { authenticate } from '../lib/session.js';

const safeAssetUrl = (value) => typeof value === 'string' && value.length > 0 &&
  !/[\u0000-\u001f<>"'\\]/.test(value) && (
    (value.startsWith('/') && !value.startsWith('//')) ||
    /^https:\/\/[^/]+(?:\/|$)/i.test(value)
  );

export function adminTestimonialRoutes({ storage, env }) {
  const router = Router();
  router.post('/admin/login', asyncRoute(async (req, res) => {
    if (!secretMatches(req.body.key, env.ADMIN_SESSION_SECRET)) {
      return res.status(401).json({ error: 'Invalid admin key' });
    }
    await authenticate(req, (session) => { session.isAdmin = true; });
    res.json({ success: true });
  }));
  router.use('/admin/testimonials', (req, res, next) => {
    if (!req.session.isAdmin) return res.status(401).json({ error: 'Admin session required' });
    next();
  });
  router.get('/admin/testimonials', asyncRoute(async (_req, res) => {
    res.json((await storage.readTestimonials()).map((record) => serializeTestimonial(record, true)));
  }));

  const mutate = (update) => asyncRoute(async (req, res) => {
    await storage.updateTestimonials((records) => {
      const index = records.findIndex((record) => record.id === req.params.id);
      if (index === -1) throw httpError(404, 'Testimonial not found');
      update(records, index, req.body);
    });
    res.json({ success: true });
  });
  for (const action of ['approve', 'reject']) {
    router.post(`/admin/testimonials/:id/${action}`, mutate((records, index) => {
      records[index].approved = action === 'approve';
    }));
  }
  router.delete('/admin/testimonials/:id', mutate((records, index) => { records.splice(index, 1); }));
  router.patch('/admin/testimonials/:id', mutate((records, index, body) => {
    const fields = ['logo', 'referencePdf'].filter((field) => Object.hasOwn(body, field));
    if (!fields.length || fields.some((field) => !safeAssetUrl(body[field]))) {
      throw httpError(400, 'Provide a non-empty logo or referencePdf URL (site-relative or HTTPS)');
    }
    for (const field of fields) records[index][field === 'referencePdf' ? 'reference_pdf' : field] = body[field];
  }));
  return router;
}
