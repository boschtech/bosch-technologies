import { Router } from 'express';
import { asyncRoute, httpError, identity } from '../lib/validation.js';
import { assessmentEmail } from '../lib/email.js';

const object = (value) => value && typeof value === 'object' && !Array.isArray(value);
const score = (value) => typeof value === 'number' && Number.isFinite(value) && value >= 1 && value <= 5;

export function assessmentRoutes({ storage, sendMail }) {
  const router = Router();
  router.post('/assessment', asyncRoute(async (req, res) => {
    const lead = identity(req.body);
    const { overallScore, overallLevel, dimensions, answers } = req.body;
    if (!score(overallScore) || !score(overallLevel) || !Number.isInteger(overallLevel)) {
      throw httpError(400, 'Overall score must be 1–5 and overall level an integer from 1–5');
    }
    if (!object(dimensions) || !Object.keys(dimensions).length ||
        !Object.values(dimensions).every((dimension) => object(dimension) && score(dimension.score) &&
          (dimension.title === undefined || typeof dimension.title === 'string'))) {
      throw httpError(400, 'Dimensions must contain dimension objects with scores from 1–5');
    }
    if (!object(answers) || !Object.keys(answers).length ||
        !Object.values(answers).every((answer) => score(answer) && Number.isInteger(answer))) {
      throw httpError(400, 'Answers must contain integer scores from 1–5');
    }
    Object.assign(lead, { overallScore, overallLevel, dimensions, answers });
    await storage.appendLead('assessment', lead);
    await sendMail(lead.email, assessmentEmail(lead));
    res.json({ success: true });
  }));
  return router;
}
