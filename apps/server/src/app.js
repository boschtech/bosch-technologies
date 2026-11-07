import cors from 'cors';
import express from 'express';
import session from 'express-session';
import multer from 'multer';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { randomBytes } from 'node:crypto';
import { createStorage } from './lib/storage.js';
import { createMailer } from './lib/email.js';
import { contactRoutes } from './routes/contact.js';
import { assessmentRoutes } from './routes/assessment.js';
import { testimonialRoutes } from './routes/testimonials.js';
import { adminTestimonialRoutes } from './routes/admin-testimonials.js';
import { clientAuthRoutes } from './routes/client-auth.js';

/**
 * Options allow isolated storage/configuration in tests, not global env edits.
 * Deployments must persist DATA_DIR separately from the frontend build.
 */
export function createApp(options = {}) {
  const env = options.env || process.env;
  const production = env.NODE_ENV === 'production';
  const webOrigin = env.WEB_ORIGIN || (production ? undefined : 'http://localhost:3000');
  if (production && !env.SESSION_SECRET) throw new Error('SESSION_SECRET is required in production');
  const dataDir = path.resolve(options.dataDir || env.DATA_DIR || fileURLToPath(new URL('../data', import.meta.url)));
  const uploadDir = path.join(dataDir, 'uploads');
  // The built frontend (apps/web's Vite output). Populated by
  // scripts/package-hostinger.mjs as a `web/` sibling of this server's own
  // source on deployment; absent in local dev, where Vite serves the
  // frontend itself and proxies /api and /uploads to this server instead.
  const webDistDir = path.resolve(
    options.webDistDir || env.WEB_DIST_DIR || fileURLToPath(new URL('../web', import.meta.url)),
  );
  const serveWebBuild = existsSync(webDistDir);
  const dependencies = {
    env, uploadDir, storage: createStorage(dataDir), sendMail: createMailer(env),
  };
  const app = express();
  app.disable('x-powered-by');
  // Hostinger terminates HTTPS before forwarding to Node. Override if the
  // deployment uses a different proxy topology.
  app.set('trust proxy', Number(env.TRUST_PROXY ?? (production ? 1 : 0)));
  app.use(cors({ origin: webOrigin || false, credentials: true }));
  app.use(express.json({ limit: '256kb' }));
  app.use(express.urlencoded({ extended: false, limit: '256kb' }));
  app.use((req, res, next) => {
    // Protect session-changing POSTs, including multipart submissions, while
    // permitting CLI/server clients that do not send an Origin header.
    const origin = req.get('origin');
    const allowed = [`${req.protocol}://${req.get('host')}`, webOrigin, env.SITE_URL?.replace(/\/$/, '')];
    if (!['GET', 'HEAD', 'OPTIONS'].includes(req.method) && origin && !allowed.includes(origin)) {
      return res.status(403).json({ error: 'Origin not allowed' });
    }
    next();
  });
  app.use('/api', session({
    name: 'bosch.sid',
    secret: env.SESSION_SECRET || randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    // MemoryStore is dev/single-process only. Supply a persistent store if
    // sessions must survive restarts.
    ...(options.sessionStore ? { store: options.sessionStore } : {}),
    cookie: { httpOnly: true, secure: production, sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 },
  }));
  app.use('/api', (_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  // Only upload assets are static: leads.csv and testimonials.json never are.
  app.use('/uploads', express.static(uploadDir, {
    dotfiles: 'deny',
    index: false,
    setHeaders(res, file) {
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Content-Security-Policy', "sandbox; default-src 'none'");
      // SVGs can be <img> sources but cannot execute scripts in our origin.
      if (path.extname(file) === '.svg') res.setHeader('Content-Disposition', 'attachment');
    },
  }));
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });
  app.use('/api', contactRoutes(dependencies));
  app.use('/api', assessmentRoutes(dependencies));
  app.use('/api', testimonialRoutes(dependencies));
  app.use('/api', adminTestimonialRoutes(dependencies));
  app.use('/api', clientAuthRoutes(dependencies));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'API route not found' }));
  if (serveWebBuild) {
    app.use(express.static(webDistDir, {
      index: false,
      setHeaders(res, filePath) {
        // index.html must always revalidate; fingerprinted Vite assets
        // (under /assets) are safe to cache for a year.
        res.setHeader('Cache-Control', path.basename(filePath) === 'index.html'
          ? 'no-cache' : 'public, max-age=31536000, immutable');
      },
    }));
    // SPA fallback: any other GET request renders the client app, which
    // resolves the route via React Router. /api and /uploads are already
    // handled above and never reach here. res.sendFile() does not run
    // through express.static's setHeaders above, so set the header here too.
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache');
      res.sendFile(path.join(webDistDir, 'index.html'));
    });
  }
  app.use((error, _req, res, _next) => {
    const status = error instanceof multer.MulterError ? 400 :
      (error.status >= 400 && error.status < 500 ? error.status : 500);
    res.status(status).json({
      error: status === 500 ? 'Unable to process submission. Please try again.' : error.message,
    });
  });
  return app;
}
