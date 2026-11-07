import { timingSafeEqual } from 'node:crypto';

export function httpError(status, message) {
  return Object.assign(new Error(message), { status });
}

// PHP clean(): trim, strip_tags, htmlspecialchars. Keep stored text in the
// legacy escaped format, and escape untrusted dimension data before emailing.
export function clean(value) {
  if (typeof value !== 'string' && typeof value !== 'number') return '';
  return String(value).trim().replace(/<[^>]*>/g, '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;',
  })[char]);
}

export function identity(body) {
  const name = clean(body.name);
  const email = clean(body.email);
  const company = clean(body.company);
  if (!name || !email) throw httpError(400, 'Name and email are required');
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) || /[\r\n]/.test(email)) {
    throw httpError(400, 'Invalid email address');
  }
  return { name, email, company };
}

export function secretMatches(value, expected) {
  if (typeof value !== 'string' || !expected) return false;
  const actualBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export const asyncRoute = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};
