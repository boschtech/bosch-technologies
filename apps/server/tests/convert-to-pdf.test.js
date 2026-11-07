import { PDFDocument } from 'pdf-lib';
import mammoth from 'mammoth';
import { describe, expect, it, vi } from 'vitest';
import { convertToPdf } from '../src/lib/convert-to-pdf.js';

describe('reference PDF conversion', () => {
  it('passes PDF bytes through unchanged', async () => {
    const buffer = Buffer.from(await (await PDFDocument.create()).save());
    expect(await convertToPdf(buffer, 'letter.PDF')).toBe(buffer);
  });
  it('wraps PNG on a portrait A4 page', async () => {
    const png = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=', 'base64');
    const pdf = await PDFDocument.load(await convertToPdf(png, 'letter.png'));
    expect(pdf.getPageCount()).toBe(1);
    expect(pdf.getPage(0).getWidth()).toBeCloseTo(595.28, 1);
    expect(pdf.getPage(0).getHeight()).toBeCloseTo(841.89, 1);
  });
  it('wraps and paginates long plain text, with unsupported glyph fallback', async () => {
    const text = `Reference letter 🙂\tTabbed\r\n${'Long text '.repeat(2000)}\n${'x'.repeat(10000)}`;
    const pdf = await PDFDocument.load(await convertToPdf(Buffer.from(text), 'letter.txt'));
    expect(pdf.getPageCount()).toBeGreaterThan(1);
  });
  it('extracts DOCX text with mammoth before rendering', async () => {
    const extract = vi.spyOn(mammoth, 'extractRawText').mockResolvedValueOnce({ value: 'Reference letter\nGreat team.' });
    const buffer = Buffer.from('mock docx');
    const pdf = await PDFDocument.load(await convertToPdf(buffer, 'letter.docx'));
    expect(extract).toHaveBeenCalledWith({ buffer });
    expect(pdf.getPageCount()).toBe(1);
  });
  it('converts a real minimal DOCX archive end to end', async () => {
    // Minimal Office Open XML archive containing one reference-letter paragraph.
    const docx = Buffer.from('UEsDBAoAAAAIAC9UZ13mdcR+0gAAAIsBAAATAAAAW0NvbnRlbnRfVHlwZXNdLnhtbH2QvVLDMAzHX8XnlasVGBh6SToAKzD0BXSOkvjw11luad++Sls6cIVR+n/8ZLebQ/BqT4Vdip1+NI3e9O32mImVKJE7Pdea1wBsZwrIJmWKooypBKwylgky2i+cCJ6a5hlsipViXdWlQ/ftK42481W9HWR9oRTyrNXLxbiwOo05e2exig77OPyirK4EI8mzh2eX+UEMGu4SFuVvwDX3Ic8ubiD1iaW+YxAXfKcywJDsLkjS/F9z5840js7SLb+05ZIsMbs4BW9uSkAXf+6H83f3J1BLAwQKAAAAAAAvVGddAAAAAAAAAAAAAAAABgAAAF9yZWxzL1BLAwQKAAAACAAvVGddXzOVUpUAAAAHAQAACwAAAF9yZWxzLy5yZWxzjc87DsIwDAbgq0Q+QJ0yMKCmXVi6Ii4QJW5T0TzkhNftycBAEQOjf//6LHfDw6/iRpyXGBS0jYSh70606lKD7JaURW2ErMCVkg6I2TjyOjcxUaibKbLXpY48Y9LmomfCnZR75E8DtqYYrQIebQvi/Ez0jx2naTF0jObqKZQfJ74aVdY8U1Fwj2zRvuOmsoB9h5sX+xdQSwMECgAAAAAAL1RnXQAAAAAAAAAAAAAAAAUAAAB3b3JkL1BLAwQKAAAACAAvVGddqJG31JIAAADIAAAAEQAAAHdvcmQvZG9jdW1lbnQueG1sRY5JDsMgDEWvgjhAnHbRBcpwh94gJc6gAkaGlvT2xemim2dZ33r+3Xh4p97IaafQ60vT6nHoipnJvjyGrGockim93nKOBiDZDf2UGooYarYQ+ynXlVcoxHNkspjSHlbv4Nq2N/DTHrQoHzR/ZEYBC/JwxwUZg0XlMGdko/Cw6Jx8rrpn04GcCflkPPlTwb/m8AVQSwECFAAKAAAACAAvVGdd5nXEftIAAACLAQAAEwAAAAAAAAAAAAAAAAAAAAAAW0NvbnRlbnRfVHlwZXNdLnhtbFBLAQIUAAoAAAAAAC9UZ10AAAAAAAAAAAAAAAAGAAAAAAAAAAAAEAAAAAMBAABfcmVscy9QSwECFAAKAAAACAAvVGddXzOVUpUAAAAHAQAACwAAAAAAAAAAAAAAAAAnAQAAX3JlbHMvLnJlbHNQSwECFAAKAAAAAAAvVGddAAAAAAAAAAAAAAAABQAAAAAAAAAAABAAAADlAQAAd29yZC9QSwECFAAKAAAACAAvVGddqJG31JIAAADIAAAAEQAAAAAAAAAAAAAAAAAIAgAAd29yZC9kb2N1bWVudC54bWxQSwUGAAAAAAUABQAgAQAAyQIAAAAA', 'base64');
    expect((await PDFDocument.load(await convertToPdf(docx, 'letter.docx'))).getPageCount()).toBe(1);
  });
  it('retains best-effort printable ASCII extraction for legacy DOC files', async () => {
    const buffer = Buffer.concat([Buffer.from([0, 1, 2]), Buffer.from('This is a printable reference letter in a binary document.'), Buffer.from([0])]);
    expect((await PDFDocument.load(await convertToPdf(buffer, 'letter.doc'))).getPageCount()).toBe(1);
  });
  it.each([
    ['letter.exe', 'binary'], ['letter.pdf', 'not pdf'], ['letter.png', 'bad image'],
    ['letter.jpg', 'bad image'], ['letter.docx', 'bad zip'], ['letter.doc', '\0\x01'],
  ])('rejects invalid %s conversion', async (filename, content) => {
    await expect(convertToPdf(Buffer.from(content), filename)).rejects.toMatchObject({ status: 400 });
  });
});
