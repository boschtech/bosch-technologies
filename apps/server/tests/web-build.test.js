import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createApp } from '../src/app.js';

let webDistDir;

beforeEach(async () => {
  webDistDir = await mkdtemp(path.join(os.tmpdir(), 'bosch-web-'));
  await mkdir(path.join(webDistDir, 'assets'), { recursive: true });
  await writeFile(path.join(webDistDir, 'index.html'), '<!doctype html><html><body>app shell</body></html>');
  await writeFile(path.join(webDistDir, 'assets', 'index-abc123.js'), 'console.log("built");');
});
afterEach(async () => { await rm(webDistDir, { recursive: true, force: true }); });

describe('frontend static serving (production/Hostinger deployment)', () => {
  it('serves index.html at the root with a no-cache header', async () => {
    const app = createApp({ webDistDir, dataDir: webDistDir });
    const response = await request(app).get('/').expect(200);
    expect(response.text).toContain('app shell');
    expect(response.headers['cache-control']).toBe('no-cache');
  });

  it('serves fingerprinted assets with a long-lived immutable cache header', async () => {
    const app = createApp({ webDistDir, dataDir: webDistDir });
    const response = await request(app).get('/assets/index-abc123.js').expect(200);
    expect(response.headers['cache-control']).toBe('public, max-age=31536000, immutable');
  });

  it('falls back to index.html for unknown client-side routes', async () => {
    const app = createApp({ webDistDir, dataDir: webDistDir });
    const response = await request(app).get('/services/automation-test-strategy').expect(200);
    expect(response.text).toContain('app shell');
  });

  it('still returns a JSON 404 for unknown /api routes instead of the SPA shell', async () => {
    const app = createApp({ webDistDir, dataDir: webDistDir });
    const response = await request(app).get('/api/does-not-exist').expect(404);
    expect(response.body).toEqual({ error: 'API route not found' });
  });

  it('skips static serving entirely when no web build is present (local dev)', async () => {
    const app = createApp({ webDistDir: path.join(webDistDir, 'does-not-exist'), dataDir: webDistDir });
    const response = await request(app).get('/');
    expect(response.status).not.toBe(200);
  });
});
