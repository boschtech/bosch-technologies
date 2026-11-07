import { appendFile, mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

// Serialize read/modify/write operations per file within this Node process.
// Multiple server instances require a database or inter-process locking.
const queues = new Map();
function exclusive(file, operation) {
  const previous = queues.get(file) || Promise.resolve();
  const next = previous.catch(() => {}).then(operation);
  queues.set(file, next);
  return next.finally(() => {
    if (queues.get(file) === next) queues.delete(file);
  });
}

const columns = ['Date', 'Type', 'Name', 'Email', 'Company', 'Score', 'Level', 'Service', 'Message'];
const csvCell = (value) => {
  let text = String(value ?? '');
  // Prevent spreadsheet formula execution in downloaded lead backups.
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
};

export function createStorage(dataDir) {
  const testimonialsPath = path.join(dataDir, 'testimonials.json');
  const leadsPath = path.join(dataDir, 'leads.csv');
  async function readTestimonials() {
    try {
      const records = JSON.parse(await readFile(testimonialsPath, 'utf8'));
      if (!Array.isArray(records)) throw new Error('Invalid testimonials data');
      return records;
    } catch (error) {
      if (error.code === 'ENOENT') return [];
      throw error;
    }
  }
  return {
    readTestimonials,
    updateTestimonials(update) {
      return exclusive(testimonialsPath, async () => {
        const records = await readTestimonials();
        const result = await update(records);
        await mkdir(dataDir, { recursive: true });
        const temporaryPath = `${testimonialsPath}.${randomUUID()}.tmp`;
        await writeFile(temporaryPath, `${JSON.stringify(records, null, 2)}\n`, { mode: 0o600 });
        await rename(temporaryPath, testimonialsPath);
        return result;
      });
    },
    appendLead(type, lead) {
      return exclusive(leadsPath, async () => {
        await mkdir(dataDir, { recursive: true });
        const size = await stat(leadsPath).then((file) => file.size).catch((error) => {
          if (error.code !== 'ENOENT') throw error;
          return 0;
        });
        const row = [
          new Date().toISOString().slice(0, 19).replace('T', ' '), type,
          lead.name, lead.email, lead.company,
          type === 'assessment' ? lead.overallScore : '',
          type === 'assessment' ? lead.overallLevel : '',
          type === 'contact' ? lead.service : '',
          type === 'contact' ? lead.message : '',
        ];
        await appendFile(leadsPath, (size ? '' : `${columns.join(',')}\n`) +
          `${row.map(csvCell).join(',')}\n`, { mode: 0o600 });
      });
    },
  };
}

export function serializeTestimonial(record, admin = false) {
  const { id, name, role = '', company, service = '', testimonial, logo = '', date } = record;
  // React renders text safely itself. Undo the legacy htmlspecialchars layer
  // at the JSON boundary so '&amp;' does not appear literally in the UI.
  const text = (value) => String(value ?? '').replace(/&(amp|lt|gt|quot|#0?39);/g, (entity) => ({
    '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#039;': "'", '&#39;': "'",
  })[entity]);
  const result = {
    id, name: text(name), role: text(role), company: text(company),
    service: text(service), testimonial: text(testimonial), logo,
    referencePdf: record.reference_pdf ?? record.referencePdf ?? '', date,
  };
  return admin ? { ...result, email: text(record.email), approved: record.approved === true } : result;
}
