import { Router } from 'express';
import { asyncRoute, clean, httpError, identity } from '../lib/validation.js';
import { contactEmail } from '../lib/email.js';

export function contactRoutes({ storage, sendMail }) {
  const router = Router();
  router.post('/contact', asyncRoute(async (req, res) => {
    const lead = { ...identity(req.body), service: clean(req.body.service), message: clean(req.body.message) };
    if (!lead.message) throw httpError(400, 'Message is required');
    // Keep the CSV backup even if SMTP is unavailable, matching the PHP handler.
    await storage.appendLead('contact', lead);
    await sendMail(lead.email, contactEmail(lead));
    res.json({ success: true });
  }));
  return router;
}
