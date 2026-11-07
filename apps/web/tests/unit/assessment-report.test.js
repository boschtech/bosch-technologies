import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ASSESSMENT_DIMENSIONS, RECOMMENDATIONS } from '@/lib/assessment-data';
import { calculateScores } from '@/lib/assessment-scoring';
import { generateAssessmentReport, renderGaugeToDataUrl } from '@/lib/pdf/assessment-report';

const { doc } = vi.hoisted(() => ({
  doc: {
    internal: { pageSize: { getWidth: () => 210, getHeight: () => 297 } },
    setFillColor: vi.fn(), rect: vi.fn(), addImage: vi.fn(), setTextColor: vi.fn(),
    setFontSize: vi.fn(), setFont: vi.fn(), text: vi.fn(), roundedRect: vi.fn(),
    splitTextToSize: vi.fn((text) => [text]), getTextWidth: vi.fn(() => 45),
    link: vi.fn(), save: vi.fn(),
  },
}));
vi.mock('jspdf', () => ({ jsPDF: vi.fn(function () { return doc; }) }));

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    drawImage: vi.fn(), beginPath: vi.fn(), arc: vi.fn(), stroke: vi.fn(), fill: vi.fn(),
    fillText: vi.fn(), createRadialGradient: () => ({ addColorStop: vi.fn() }),
  });
  vi.spyOn(HTMLCanvasElement.prototype, 'toDataURL').mockReturnValue('data:image/png;base64,gauge');
  vi.stubGlobal('Image', class {
    naturalWidth = 600;
    naturalHeight = 200;
    set src(_src) { queueMicrotask(() => this.onload()); }
  });
});
afterEach(() => vi.unstubAllGlobals());

describe('ported one-page PDF report layout', () => {
  it.each([1, 2, 3, 4, 5])('renders level %s with the original recommendations and anchored CTA', async (score) => {
    const answers = Object.fromEntries(ASSESSMENT_DIMENSIONS.flatMap((dimension) => dimension.questions.map(({ id }) => [id, score])));
    await generateAssessmentReport({ results: calculateScores(answers), name: 'Jane Smith', company: 'Acme' });
    expect(doc.rect).toHaveBeenCalledWith(0, 0, 210, 66, 'F');
    expect(doc.rect).toHaveBeenCalledWith(0, 269, 210, 28, 'F');
    expect(doc.addImage).toHaveBeenCalledWith('data:image/png;base64,gauge', 'PNG', 57, 3, 96, 32);
    for (const dimension of ASSESSMENT_DIMENSIONS) {
      expect(doc.splitTextToSize).toHaveBeenCalledWith(`Recommendation: ${RECOMMENDATIONS[dimension.id][score]}`, 180);
    }
    expect(doc.link).toHaveBeenCalledWith(15, 290, 45, 5, { url: 'https://boschtechnologies.com/contact/' });
    expect(doc.save).toHaveBeenCalledWith('Bosch-Maturity-Assessment-Jane-Smith.pdf');
  });
  it('continues without the optional logo if it cannot load', async () => {
    vi.stubGlobal('Image', class { set src(_src) { queueMicrotask(() => this.onerror(new Error('No logo'))); } });
    vi.spyOn(console, 'log').mockImplementation(() => {});
    const answers = Object.fromEntries(ASSESSMENT_DIMENSIONS.flatMap((dimension) => dimension.questions.map(({ id }) => [id, 3])));
    await generateAssessmentReport({ results: calculateScores(answers), name: 'Jane', company: '' });
    expect(doc.save).toHaveBeenCalledWith('Bosch-Maturity-Assessment-Jane.pdf');
  });
  it('renders a PNG canvas gauge and caps scores at the maximum', () => {
    expect(renderGaugeToDataUrl(6, 5)).toBe('data:image/png;base64,gauge');
    expect(HTMLCanvasElement.prototype.getContext).toHaveBeenCalledWith('2d');
  });
});
