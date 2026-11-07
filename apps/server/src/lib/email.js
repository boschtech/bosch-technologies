import nodemailer from 'nodemailer';
import { clean } from './validation.js';

const tableStyle = "border-collapse: collapse; width: 100%; max-width: 600px;";
const cellStyle = 'padding: 8px; border-bottom: 1px solid #eee;';
const row = (label, value, style = '') =>
  `<tr><td style='${cellStyle} font-weight: bold; vertical-align: top;'>${label}:</td><td style='${cellStyle}${style}'>${value}</td></tr>`;
const table = (rows) => `<table style='${tableStyle}'>${rows.join('')}</table>`;
const shell = (heading, content) => `<html>
<body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
<h2 style='color: #0f4c81;'>${heading}</h2>${content}</body></html>`;
const identityRows = (lead) => [
  row('Name', lead.name),
  row('Email', `<a href='mailto:${lead.email}'>${lead.email}</a>`),
  row('Company', lead.company),
];

export function contactEmail(lead) {
  return {
    subject: `New Contact Enquiry from ${lead.name}`,
    html: shell('New Contact Form Submission', table([
      ...identityRows(lead), row('Service', lead.service), row('Message', lead.message),
    ])),
  };
}

export function assessmentEmail(lead) {
  const dimensionRows = Object.entries(lead.dimensions).map(([id, dimension]) =>
    `<tr><td style='padding: 6px 8px; border-bottom: 1px solid #eee;'>${clean(dimension.title ?? id)}</td><td style='padding: 6px 8px; border-bottom: 1px solid #eee; font-weight: bold;'>${clean(dimension.score)} / 5.0</td></tr>`);
  return {
    subject: `New Assessment Lead: ${lead.name} — Level ${lead.overallLevel} (${lead.overallScore}/5.0)`,
    html: shell('New Assessment Lead', table([
      ...identityRows(lead),
      row('Overall Score', `${lead.overallScore} / 5.0 (Level ${lead.overallLevel})`,
        ' font-size: 18px; color: #00b894; font-weight: bold;'),
    ]) + `<h3 style='color: #0f4c81; margin-top: 20px;'>Dimension Scores</h3>` +
      table(dimensionRows) +
      `<p style='margin-top: 20px; color: #6c757d; font-size: 12px;'>This lead was captured via the Bosch Technologies Maturity Assessment tool.</p>`),
  };
}

export function testimonialEmail(lead, siteUrl) {
  const rows = [
    row('Name', lead.name), row('Role', lead.role), row('Company', lead.company),
    row('Email', `<a href='mailto:${lead.email}'>${lead.email}</a>`),
    row('Service', lead.service), row('Testimonial', lead.testimonial),
  ];
  if (lead.reference_pdf) rows.push(row('Reference Letter',
    `<a href='${clean(siteUrl)}${lead.reference_pdf}'>View PDF</a>`));
  if (lead.logo) rows.push(row('Logo', `<a href='${clean(siteUrl)}${lead.logo}'>View Logo</a>`));
  return {
    subject: `New Testimonial Submission from ${lead.name} (${lead.company})`,
    html: shell('New Testimonial Submission', table(rows)),
  };
}

export function createMailer(env) {
  let transport;
  return async (email, message) => {
    if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASSWORD || !env.NOTIFICATION_EMAIL) {
      throw new Error('SMTP configuration is incomplete');
    }
    transport ??= nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: Number(env.SMTP_PORT || 587) === 465,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASSWORD },
    });
    try {
      await transport.sendMail({
        from: { name: 'Bosch Technologies', address: env.SMTP_USER },
        to: env.NOTIFICATION_EMAIL, replyTo: email, ...message,
      });
    } catch {
      throw new Error('Failed to send email. Please try again.');
    }
  };
}
