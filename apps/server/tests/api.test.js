import { mkdtemp, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import request from 'supertest';
import nodemailer from 'nodemailer';
import { PDFDocument } from 'pdf-lib';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';

vi.mock('nodemailer', () => ({ default: { createTransport: vi.fn() } }));
const sendMail = vi.fn();
let dataDir;
let app;
let env;
const person = { name: 'Alex Smith', email: 'alex@example.test', company: 'Example Ltd' };
const contact = { ...person, service: 'Quality Engineering', message: 'Please contact me.' };
const assessment = {
  ...person, overallScore: 3.5, overallLevel: 4,
  dimensions: { tooling: { title: 'Tooling & Infrastructure', score: 3.5, level: 4 } },
  answers: { tooling_1: 3, tooling_2: 4 },
};
const pending = {
  id: 'example-1', ...person, role: 'Engineer', service: 'Quality Engineering',
  testimonial: 'Excellent support', logo: '', reference_pdf: '/references/letter.pdf',
  approved: false, date: '2026-01-01',
};
const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=', 'base64');
const records = () => readFile(path.join(dataDir, 'testimonials.json'), 'utf8').then(JSON.parse);
const seed = (items = [pending]) => writeFile(path.join(dataDir, 'testimonials.json'), JSON.stringify(items));
const submitTestimonial = (overrides = {}) => {
  const fields = { ...person, role: 'Engineer', service: 'Quality Engineering', testimonial: 'Excellent support', ...overrides };
  let submission = request(app).post('/api/testimonials');
  for (const [key, value] of Object.entries(fields)) submission = submission.field(key, value);
  return submission;
};
const admin = async () => {
  const agent = request.agent(app);
  await agent.post('/api/admin/login').send({ key: env.ADMIN_SESSION_SECRET }).expect(200);
  return agent;
};

beforeEach(async () => {
  dataDir = await mkdtemp(path.join(os.tmpdir(), 'bosch-api-'));
  env = {
    NODE_ENV: 'test', SESSION_SECRET: 'test-session-signing-value-only',
    ADMIN_SESSION_SECRET: 'test-admin-value-only',
    CLIENT_ACCESS_CODE_WECONNECTU: 'test-weconnectu-value',
    CLIENT_ACCESS_CODE_COMOTION: 'test-comotion-value',
    CLIENT_ACCESS_CODE_TOOMUCHIWIFI: 'test-toomuchiwifi-value',
    SMTP_HOST: 'smtp.example.test', SMTP_PORT: '587', SMTP_USER: 'smtp@example.test',
    SMTP_PASSWORD: 'test-smtp-value-only', NOTIFICATION_EMAIL: 'notifications@example.test',
  };
  sendMail.mockReset().mockResolvedValue({ messageId: 'test-message' });
  nodemailer.createTransport.mockReturnValue({ sendMail });
  app = createApp({ dataDir, env });
});
afterEach(async () => { await rm(dataDir, { recursive: true, force: true }); });

describe('contact', () => {
  it('sends the legacy HTML email and writes the nine CSV columns', async () => {
    await request(app).post('/api/contact').send(contact).expect(200, { success: true });
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: env.SMTP_HOST, port: 587, secure: false,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    });
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: { name: 'Bosch Technologies', address: env.SMTP_USER },
      to: env.NOTIFICATION_EMAIL, replyTo: person.email,
      subject: `New Contact Enquiry from ${person.name}`,
      html: expect.stringContaining('New Contact Form Submission'),
    }));
    const csv = await readFile(path.join(dataDir, 'leads.csv'), 'utf8');
    expect(csv.split('\n')[0]).toBe('Date,Type,Name,Email,Company,Score,Level,Service,Message');
    expect(csv).toContain('"contact","Alex Smith","alex@example.test","Example Ltd","","","Quality Engineering","Please contact me."');
  });
  it.each([
    {}, { ...contact, name: '' }, { ...contact, email: 'invalid' },
    { ...contact, email: 'x@example.test\r\nBcc:someone@example.test' },
    { ...contact, message: '' }, { ...contact, name: {} },
  ])('rejects invalid fields %#', async (body) => {
    await request(app).post('/api/contact').send(body).expect(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it('sanitizes HTML and escapes multiline CSV data and formulas', async () => {
    await request(app).post('/api/contact').send({
      ...contact, name: ' <b>Alex</b> & team ', company: '=1+1', message: 'Hello, "team"\nNext line',
    }).expect(200);
    expect(sendMail.mock.calls[0][0].html).toContain('Alex &amp; team');
    const csv = await readFile(path.join(dataDir, 'leads.csv'), 'utf8');
    expect(csv).toContain("\"'=1+1\"");
    expect(csv).toContain('Hello, &quot;team&quot;\nNext line');
  });
  it('retains a CSV backup and returns a safe error when SMTP fails', async () => {
    sendMail.mockRejectedValueOnce(new Error('SMTP credentials must not leak'));
    const response = await request(app).post('/api/contact').send(contact).expect(500);
    expect(response.body.error).not.toContain('credentials');
    expect(await readFile(path.join(dataDir, 'leads.csv'), 'utf8')).toContain(person.email);
  });
  it('serializes concurrent CSV writes with a single header', async () => {
    await Promise.all(Array.from({ length: 8 }, () => request(app).post('/api/contact').send(contact).expect(200)));
    const csv = await readFile(path.join(dataDir, 'leads.csv'), 'utf8');
    expect(csv.trim().split('\n')).toHaveLength(9);
  });
});

describe('assessment', () => {
  it('renders dimension scores and writes the legacy score/level columns', async () => {
    await request(app).post('/api/assessment').send(assessment).expect(200, { success: true });
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      subject: 'New Assessment Lead: Alex Smith — Level 4 (3.5/5.0)',
      html: expect.stringContaining('Tooling &amp; Infrastructure'),
    }));
    expect(sendMail.mock.calls[0][0].html).toContain('Dimension Scores');
    expect(sendMail.mock.calls[0][0].html).toContain('3.5 / 5.0');
    expect(await readFile(path.join(dataDir, 'leads.csv'), 'utf8'))
      .toContain('"assessment","Alex Smith","alex@example.test","Example Ltd","3.5","4","",""');
  });
  it.each([
    { name: '' }, { overallScore: null }, { overallScore: '3.5' }, { overallLevel: 8 },
    { dimensions: [] }, { dimensions: { tooling: null } }, { dimensions: { tooling: { score: 6 } } },
    { answers: {} }, { answers: { q1: '3' } },
  ])('rejects invalid assessment values %#', async (fields) => {
    await request(app).post('/api/assessment').send({ ...assessment, ...fields }).expect(400);
  });
  it('never interpolates raw dimension HTML', async () => {
    await request(app).post('/api/assessment').send({
      ...assessment, dimensions: { tooling: { title: '<img src=x onerror=alert(1)>Hello & goodbye', score: 3 } },
    }).expect(200);
    expect(sendMail.mock.calls[0][0].html).not.toContain('onerror');
    expect(sendMail.mock.calls[0][0].html).toContain('Hello &amp; goodbye');
  });
});

describe('testimonials', () => {
  it('returns an empty public list when storage is new', async () => {
    await request(app).get('/api/testimonials').expect(200, []);
  });
  it('returns readable JSON text without changing legacy escaped storage', async () => {
    await seed([{ ...pending, approved: true, name: 'Alex &amp; team', testimonial: 'They&#039;re &quot;great&quot;' }]);
    const { body } = await request(app).get('/api/testimonials').expect(200);
    expect(body[0].name).toBe('Alex & team');
    expect(body[0].testimonial).toBe('They\'re "great"');
    expect((await records())[0].name).toBe('Alex &amp; team');
  });
  it('lists only approved entries and never exposes emails', async () => {
    await seed([pending, { ...pending, id: 'approved', approved: true }]);
    const { body } = await request(app).get('/api/testimonials').expect(200);
    expect(body).toHaveLength(1);
    expect(body[0]).toEqual({
      id: 'approved', name: person.name, role: pending.role, company: person.company,
      service: pending.service, testimonial: pending.testimonial, logo: '', referencePdf: pending.reference_pdf, date: pending.date,
    });
    expect(body[0]).not.toHaveProperty('email');
    expect(body[0]).not.toHaveProperty('approved');
  });
  it('stores a pending testimonial, sends notification, and includes CSV backup', async () => {
    await submitTestimonial().expect(200, { success: true });
    const [record] = await records();
    expect(record).toMatchObject({ ...person, approved: false, testimonial: 'Excellent support', reference_pdf: '' });
    expect(record.id).toMatch(/^example-ltd-/);
    expect(sendMail.mock.calls[0][0].subject).toBe('New Testimonial Submission from Alex Smith (Example Ltd)');
    expect(await readFile(path.join(dataDir, 'leads.csv'), 'utf8')).toContain('"testimonial"');
    await request(app).get('/api/testimonials').expect(200, []);
  });
  it('stores and serves logo and converted TXT reference assets outside the web build', async () => {
    await submitTestimonial().attach('logo', png, 'logo.png')
      .attach('referenceLetter', Buffer.from('Reference letter\nExcellent work.'), 'letter.txt').expect(200);
    const [record] = await records();
    expect(record.logo).toMatch(/^\/uploads\/.*-logo\.png$/);
    expect(record.reference_pdf).toMatch(/^\/uploads\/.*-reference\.pdf$/);
    const logo = await request(app).get(record.logo).expect(200);
    expect(logo.body).toEqual(png);
    expect(logo.headers['x-content-type-options']).toBe('nosniff');
    const reference = await request(app).get(record.reference_pdf).expect(200);
    expect((await PDFDocument.load(reference.body)).getPageCount()).toBe(1);
    await request(app).get('/uploads/../testimonials.json').expect(404);
    await request(app).get('/data/leads.csv').expect(404);
    expect(sendMail.mock.calls[0][0].html).toContain(record.reference_pdf);
  });
  it('keeps PDF references byte-for-byte unchanged and uses unique filenames', async () => {
    const pdf = Buffer.from(await (await PDFDocument.create()).save());
    await submitTestimonial().attach('referenceLetter', pdf, 'letter.pdf').expect(200);
    await submitTestimonial().attach('referenceLetter', pdf, 'letter.pdf').expect(200);
    const stored = await records();
    expect(stored[0].id).not.toBe(stored[1].id);
    expect(await readFile(path.join(dataDir, stored[0].reference_pdf))).toEqual(pdf);
  });
  it('supports SVG logos while sandboxing direct access', async () => {
    await submitTestimonial().attach('logo', Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>'), 'logo.svg').expect(200);
    const [record] = await records();
    const response = await request(app).get(record.logo).expect(200);
    expect(response.headers['content-disposition']).toBe('attachment');
    expect(response.headers['content-security-policy']).toContain('sandbox');
  });
  it.each([{ name: '' }, { email: 'invalid' }, { company: '' }, { testimonial: '' }])(
    'rejects invalid fields %#', async (fields) => { await submitTestimonial(fields).expect(400); },
  );
  it.each([
    ['referenceLetter', 'letter.exe', Buffer.from('binary')],
    ['referenceLetter', 'letter.png', Buffer.from('not png')],
    ['logo', 'logo.html', Buffer.from('<script>alert(1)</script>')],
    ['logo', 'logo.png', Buffer.from('not png')],
    ['reference_letter', 'letter.txt', Buffer.from('old field name')],
    ['logo', 'logo.png', Buffer.alloc(2 * 1024 * 1024 + 1)],
    ['referenceLetter', 'letter.pdf', Buffer.alloc(5 * 1024 * 1024 + 1)],
  ])('rejects invalid uploads: %s %s', async (field, filename, buffer) => {
    await submitTestimonial().attach(field, buffer, filename).expect(400);
    expect(await readdir(dataDir)).toEqual([]);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it('does not overwrite corrupt JSON storage', async () => {
    await writeFile(path.join(dataDir, 'testimonials.json'), 'corrupt');
    await submitTestimonial().attach('logo', png, 'logo.png').expect(500);
    expect(await readFile(path.join(dataDir, 'testimonials.json'), 'utf8')).toBe('corrupt');
    expect(await readdir(path.join(dataDir, 'uploads'))).toEqual([]);
    await request(app).get('/api/testimonials').expect(500);
  });
  it('serializes concurrent testimonial writes without lost submissions', async () => {
    await Promise.all(Array.from({ length: 8 }, () => submitTestimonial().expect(200)));
    expect(await records()).toHaveLength(8);
  });
});

describe('admin testimonials', () => {
  it('sets an HttpOnly cookie and returns all pending/full records after login', async () => {
    await seed();
    const agent = request.agent(app);
    const login = await agent.post('/api/admin/login').send({ key: env.ADMIN_SESSION_SECRET }).expect(200, { success: true });
    expect(login.headers['set-cookie'][0]).toMatch(/bosch\.sid=.*HttpOnly/);
    expect(login.headers['set-cookie'][0]).toContain('SameSite=Lax');
    const { body } = await agent.get('/api/admin/testimonials').expect(200);
    expect(body[0]).toMatchObject({ id: pending.id, email: person.email, approved: false, referencePdf: pending.reference_pdf });
  });
  it.each([{}, { key: 'wrong' }, { key: {} }])('rejects wrong admin credentials %#', async (body) => {
    await request(app).post('/api/admin/login').send(body).expect(401);
  });
  it.each([
    ['get', '/api/admin/testimonials'],
    ['post', '/api/admin/testimonials/example-1/approve'],
    ['post', '/api/admin/testimonials/example-1/reject'],
    ['delete', '/api/admin/testimonials/example-1'],
    ['patch', '/api/admin/testimonials/example-1'],
  ])('gates %s %s without a session', async (method, url) => {
    await request(app)[method](url).send({ logo: '/logo.png' }).expect(401);
  });
  it('approves and rejects without deleting the record', async () => {
    await seed();
    const agent = await admin();
    await agent.post(`/api/admin/testimonials/${pending.id}/approve`).expect(200, { success: true });
    expect((await records())[0].approved).toBe(true);
    expect((await request(app).get('/api/testimonials')).body).toHaveLength(1);
    await agent.post(`/api/admin/testimonials/${pending.id}/reject`).expect(200, { success: true });
    expect(await records()).toHaveLength(1);
    expect((await records())[0].approved).toBe(false);
  });
  it('sets logo and reference in one PATCH, preserving the legacy disk format', async () => {
    await seed();
    const agent = await admin();
    await agent.patch(`/api/admin/testimonials/${pending.id}`).send({
      logo: '/uploads/logo.png', referencePdf: 'https://example.test/Reference Letter.pdf',
    }).expect(200, { success: true });
    expect((await records())[0]).toMatchObject({
      logo: '/uploads/logo.png', reference_pdf: 'https://example.test/Reference Letter.pdf',
    });
    expect((await records())[0]).not.toHaveProperty('referencePdf');
  });
  it('deletes the requested record', async () => {
    await seed();
    const agent = await admin();
    await agent.delete(`/api/admin/testimonials/${pending.id}`).expect(200, { success: true });
    expect(await records()).toEqual([]);
  });
  it.each([['post', '/approve'], ['post', '/reject'], ['delete', ''], ['patch', '']])(
    'returns 404 for missing IDs on %s %s', async (method, action) => {
      const agent = await admin();
      await agent[method](`/api/admin/testimonials/missing${action}`).send({ logo: '/logo.png' }).expect(404);
    },
  );
  it.each([{}, { logo: '' }, { referencePdf: '' }, { logo: 'javascript:alert(1)' }, { logo: '//evil.test/logo.png' }])(
    'rejects invalid asset updates %#', async (body) => {
      await seed();
      const agent = await admin();
      await agent.patch(`/api/admin/testimonials/${pending.id}`).send(body).expect(400);
      expect((await records())[0].logo).toBe('');
    },
  );
});

describe('client auth', () => {
  it.each(['weconnectu', 'comotion', 'toomuchiwifi'])('unlocks and logs out %s', async (slug) => {
    const agent = request.agent(app);
    await agent.get(`/api/clients/${slug}/session`).expect(200, { authenticated: false });
    const response = await agent.post(`/api/clients/${slug}/unlock`)
      .send({ code: env[`CLIENT_ACCESS_CODE_${slug.toUpperCase()}`] }).expect(200, { success: true });
    expect(response.headers['set-cookie'][0]).toContain('HttpOnly');
    await agent.get(`/api/clients/${slug}/session`).expect(200, { authenticated: true });
    await agent.post(`/api/clients/${slug}/logout`).expect(200, { success: true });
    await agent.get(`/api/clients/${slug}/session`).expect(200, { authenticated: false });
  });
  it.each(['weconnectu', 'comotion', 'toomuchiwifi'])('rejects wrong or missing code for %s', async (slug) => {
    await request(app).post(`/api/clients/${slug}/unlock`).send({ code: 'wrong' }).expect(401);
    await request(app).post(`/api/clients/${slug}/unlock`).send({}).expect(401);
  });
  it.each(['unlock', 'session', 'logout'])('returns 404 for unknown slug: %s', async (action) => {
    await request(app)[action === 'session' ? 'get' : 'post'](`/api/clients/unknown/${action}`).send({}).expect(404);
  });
  it('does not use inherited object keys as client slugs', async () => {
    await request(app).post('/api/clients/toString/unlock').send({ code: 'anything' }).expect(404);
  });
  it('maintains independent client/admin grants across session rotation and logout', async () => {
    const agent = await admin();
    await agent.post('/api/clients/weconnectu/unlock').send({ code: env.CLIENT_ACCESS_CODE_WECONNECTU }).expect(200);
    await agent.get('/api/clients/comotion/session').expect(200, { authenticated: false });
    await agent.post('/api/clients/comotion/unlock').send({ code: env.CLIENT_ACCESS_CODE_COMOTION }).expect(200);
    await agent.post('/api/admin/login').send({ key: env.ADMIN_SESSION_SECRET }).expect(200);
    await agent.post('/api/clients/weconnectu/logout').expect(200);
    await agent.get('/api/clients/comotion/session').expect(200, { authenticated: true });
    await agent.get('/api/clients/weconnectu/session').expect(200, { authenticated: false });
    await agent.get('/api/admin/testimonials').expect(200);
  });
  it('allows idempotent anonymous logout', async () => {
    await request(app).post('/api/clients/weconnectu/logout').expect(200, { success: true });
  });
  it('fails closed when client/admin secrets are unconfigured', async () => {
    app = createApp({ dataDir, env: { SESSION_SECRET: env.SESSION_SECRET } });
    await request(app).post('/api/admin/login').send({ key: '' }).expect(401);
    await request(app).post('/api/clients/weconnectu/unlock').send({ code: '' }).expect(401);
  });
});

describe('app configuration and errors', () => {
  it('requires a production signing secret', () => {
    expect(() => createApp({ env: { NODE_ENV: 'production' } })).toThrow('SESSION_SECRET');
  });
  it('uses Secure cookies behind the production HTTPS proxy', async () => {
    app = createApp({ dataDir, env: { ...env, NODE_ENV: 'production' } });
    const response = await request(app).post('/api/admin/login').set('X-Forwarded-Proto', 'https')
      .send({ key: env.ADMIN_SESSION_SECRET }).expect(200);
    expect(response.headers['set-cookie'][0]).toContain('Secure');
  });
  it('blocks untrusted Origin requests', async () => {
    await request(app).post('/api/admin/login').set('Origin', 'https://evil.test')
      .send({ key: env.ADMIN_SESSION_SECRET }).expect(403);
  });
  it('accepts the default Vite origin despite proxy Host rewriting', async () => {
    await request(app).post('/api/contact').set('Origin', 'http://localhost:3000')
      .set('Host', 'localhost:4000').send(contact).expect(200);
  });
  it('supports explicitly allowed development origins with credentials', async () => {
    app = createApp({ dataDir, env: { ...env, WEB_ORIGIN: 'http://localhost:5173' } });
    const response = await request(app).post('/api/admin/login').set('Origin', 'http://localhost:5173')
      .send({ key: env.ADMIN_SESSION_SECRET }).expect(200);
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:5173');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });
  it('returns JSON for malformed JSON and unknown API routes', async () => {
    await request(app).post('/api/contact').set('Content-Type', 'application/json').send('{').expect(400);
    await request(app).get('/api/missing').expect(404, { error: 'API route not found' });
  });
  it('handles absent SMTP config without exposing details or losing the lead', async () => {
    app = createApp({ dataDir, env: { SESSION_SECRET: env.SESSION_SECRET } });
    await request(app).post('/api/contact').send(contact).expect(500);
    expect(sendMail).not.toHaveBeenCalled();
    expect(await readFile(path.join(dataDir, 'leads.csv'), 'utf8')).toContain(person.email);
  });
  it('uses TLS directly for SMTP port 465', async () => {
    app = createApp({ dataDir, env: { ...env, SMTP_PORT: '465' } });
    await request(app).post('/api/contact').send(contact).expect(200);
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({ port: 465, secure: true }));
  });
});
