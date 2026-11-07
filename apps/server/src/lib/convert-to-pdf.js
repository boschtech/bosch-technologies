import path from 'node:path';
import { PDFDocument, StandardFonts, PageSizes } from 'pdf-lib';
import mammoth from 'mammoth';
import { httpError } from './validation.js';

const mm = (value) => value * 72 / 25.4;

// Buffer in/buffer out keeps uploads off disk until conversion has succeeded.
// As in the PHP converter: PDFs pass through; images use A4 with 10 mm
// margins; text/DOCX use Helvetica 11, 15 mm margins and 6 mm line spacing.
export async function convertToPdf(buffer, originalName) {
  const extension = path.extname(originalName).slice(1).toLowerCase();
  if (extension === 'pdf') {
    if (!buffer.subarray(0, 1024).includes(Buffer.from('%PDF-'))) {
      throw httpError(400, 'Invalid PDF file');
    }
    return buffer;
  }
  if (!['png', 'jpg', 'jpeg', 'txt', 'doc', 'docx'].includes(extension)) {
    throw httpError(400, 'Unsupported reference letter file type');
  }
  try {
    const pdf = await PDFDocument.create();
    if (['png', 'jpg', 'jpeg'].includes(extension)) {
      const image = await (extension === 'png' ? pdf.embedPng(buffer) : pdf.embedJpg(buffer));
      const page = pdf.addPage(PageSizes.A4);
      const scale = Math.min(mm(190) / image.width, mm(277) / image.height, mm(1));
      const width = image.width * scale;
      const height = image.height * scale;
      page.drawImage(image, {
        x: (page.getWidth() - width) / 2, y: (page.getHeight() - height) / 2, width, height,
      });
    } else {
      let text;
      if (extension === 'docx') text = (await mammoth.extractRawText({ buffer })).value;
      else if (extension === 'doc') text = buffer.toString('latin1').match(/[\x20-\x7E]{20,}/g)?.join('\n') || '';
      else text = buffer.toString('utf8');
      if (extension !== 'txt' && !text.trim()) throw new Error('Could not extract document text');
      const font = await pdf.embedFont(StandardFonts.Helvetica);
      // The legacy FPDF font is Latin-1; replace unsupported glyphs rather than
      // rejecting otherwise valid letters (full Unicode needs an embedded font).
      text = Array.from(text, (char) => {
        if (char === '\n') return char;
        if (char === '\r') return '';
        if (char === '\t') return '    ';
        try { font.encodeText(char); return char; } catch { return '?'; }
      }).join('');
      let page = pdf.addPage(PageSizes.A4);
      let y = page.getHeight() - mm(15) - 11;
      const drawLine = (line) => {
        if (y < mm(15)) {
          page = pdf.addPage(PageSizes.A4);
          y = page.getHeight() - mm(15) - 11;
        }
        page.drawText(line, { x: mm(15), y, font, size: 11 });
        y -= mm(6);
      };
      for (const paragraph of text.split('\n')) {
        let line = '';
        // Character-level fallback also wraps very long unbroken strings.
        for (const char of paragraph) {
          if (font.widthOfTextAtSize(line + char, 11) > mm(180)) {
            const space = line.lastIndexOf(' ');
            if (space > 0) {
              drawLine(line.slice(0, space));
              line = line.slice(space + 1);
            } else {
              drawLine(line);
              line = '';
            }
          }
          line += char;
        }
        drawLine(line);
      }
    }
    return Buffer.from(await pdf.save());
  } catch {
    throw httpError(400, 'Could not convert reference letter to PDF');
  }
}
