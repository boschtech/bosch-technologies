import { Router } from 'express';
import multer from 'multer';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, unlink } from 'node:fs/promises';
import { asyncRoute, clean, httpError, identity } from '../lib/validation.js';
import { serializeTestimonial } from '../lib/storage.js';
import { testimonialEmail } from '../lib/email.js';
import { convertToPdf } from '../lib/convert-to-pdf.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 2, fields: 10, fieldSize: 64 * 1024, parts: 12 },
}).fields([{ name: 'logo', maxCount: 1 }, { name: 'referenceLetter', maxCount: 1 }]);

function validLogo(file, extension) {
  if (extension === '.png') return file.buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (extension === '.jpg' || extension === '.jpeg') return file.buffer[0] === 255 && file.buffer[1] === 216 && file.buffer[2] === 255;
  if (extension === '.svg') return /<svg[\s>]/i.test(file.buffer.toString('utf8'));
  return false;
}

export function testimonialRoutes({ storage, sendMail, uploadDir, env }) {
  const router = Router();
  router.get('/testimonials', asyncRoute(async (_req, res) => {
    res.json((await storage.readTestimonials()).filter((record) => record.approved === true)
      .map((record) => serializeTestimonial(record)));
  }));
  router.post('/testimonials', upload, asyncRoute(async (req, res) => {
    const lead = {
      ...identity(req.body), role: clean(req.body.role), service: clean(req.body.service),
      testimonial: clean(req.body.testimonial),
    };
    if (!lead.company || !lead.testimonial) throw httpError(400, 'Company and testimonial are required');
    const logo = req.files?.logo?.[0];
    const reference = req.files?.referenceLetter?.[0];
    const extension = logo ? path.extname(logo.originalname).toLowerCase() : '';
    if (logo && (logo.size > 2 * 1024 * 1024 || !validLogo(logo, extension))) {
      throw httpError(400, 'Logo must be PNG, JPG, JPEG or SVG and no larger than 2 MB');
    }
    const pdf = reference ? await convertToPdf(reference.buffer, reference.originalname) : null;
    const slug = lead.company.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'company';
    const date = new Date().toISOString().slice(0, 10);
    const id = `${slug}-${date}-${randomUUID()}`;
    const logoFilename = `${id}-logo${extension}`;
    const referenceFilename = `${id}-reference.pdf`;
    const record = {
      id, ...lead, logo: logo ? `/uploads/${logoFilename}` : '',
      reference_pdf: pdf ? `/uploads/${referenceFilename}` : '', approved: false, date,
    };
    const written = [];
    try {
      if (logo || pdf) await mkdir(uploadDir, { recursive: true });
      for (const [filename, buffer] of [[logoFilename, logo?.buffer], [referenceFilename, pdf]]) {
        if (buffer) {
          const destination = path.join(uploadDir, filename);
          await writeFile(destination, buffer, { flag: 'wx', mode: 0o600 });
          written.push(destination);
        }
      }
      await storage.updateTestimonials((records) => { records.push(record); });
    } catch (error) {
      await Promise.all(written.map((file) => unlink(file).catch(() => {})));
      throw error;
    }
    await storage.appendLead('testimonial', lead);
    await sendMail(lead.email, testimonialEmail(record, (env.SITE_URL || 'https://boschtechnologies.com').replace(/\/$/, '')));
    res.json({ success: true });
  }));
  return router;
}
