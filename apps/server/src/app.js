import cors from 'cors';
import express from 'express';

/**
 * Builds the Express app. Kept separate from the HTTP listener (src/index.js)
 * so tests can import and exercise it with supertest without binding a port.
 *
 * Route modules (contact, assessment, testimonials, admin-testimonials,
 * client-auth) are added here in the backend-api phase of the refactor.
 */
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  return app;
}
