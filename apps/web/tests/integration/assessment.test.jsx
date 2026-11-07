import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AssessmentPage from '@/pages/AssessmentPage';
import ResultsPanel from '@/components/assessment/ResultsPanel';
import { ASSESSMENT_DIMENSIONS } from '@/lib/assessment-data';
import { calculateScores } from '@/lib/assessment-scoring';
import { generateAssessmentReport } from '@/lib/pdf/assessment-report';

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  RadarChart: ({ children }) => <svg aria-label="Radar">{children}</svg>,
  PolarGrid: () => null, PolarAngleAxis: () => null, PolarRadiusAxis: () => null,
  Radar: () => null, Legend: () => null,
}));
vi.mock('@/lib/pdf/assessment-report', () => ({ generateAssessmentReport: vi.fn().mockResolvedValue(undefined) }));
afterEach(() => vi.unstubAllGlobals());

describe('complete assessment journey', () => {
  it.each(['success', 'network failure'])('answers 20 questions and shows results despite %s', async (server) => {
    vi.stubGlobal('fetch', server === 'success' ? vi.fn().mockResolvedValue({ ok: true, json: async () => ({ success: true }) }) : vi.fn().mockRejectedValue(new Error('Offline')));
    render(<MemoryRouter><AssessmentPage /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
    expect(screen.getAllByRole('alert')).toHaveLength(4);
    for (let step = 0; step < 5; step++) {
      expect(screen.getByText(`Step ${step + 1} of 5`)).toBeInTheDocument();
      for (const group of screen.getAllByRole('radiogroup')) {
        fireEvent.click(within(group).getAllByRole('radio')[3]);
      }
      if (step === 1) {
        fireEvent.click(screen.getByRole('button', { name: '← Previous' }));
        for (const group of screen.getAllByRole('radiogroup')) expect(within(group).getAllByRole('radio')[3]).toBeChecked();
        fireEvent.click(screen.getByRole('button', { name: 'Next →' }));
      }
      fireEvent.click(screen.getByRole('button', { name: step === 4 ? 'See My Results →' : 'Next →' }));
    }
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    expect(screen.getByText('Almost There!')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'See My Results →' }));
    expect(screen.getAllByRole('alert')).toHaveLength(3);
    fireEvent.change(screen.getByLabelText('Your Name *'), { target: { value: 'Jane Smith' } });
    fireEvent.change(screen.getByLabelText('Work Email *'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText('Company *'), { target: { value: 'Acme' } });
    fireEvent.click(screen.getByRole('button', { name: 'See My Results →' }));
    expect(await screen.findByRole('heading', { name: 'Level 4: Measured' })).toBeInTheDocument();
    expect(screen.getAllByText('4.0 / 5.0')).toHaveLength(5);
    expect(screen.getAllByText('Recommendation:')).toHaveLength(5);
    const [url, request] = fetch.mock.calls[0];
    expect(url).toBe('/api/assessment');
    const body = JSON.parse(request.body);
    expect(body).toMatchObject({ name: 'Jane Smith', email: 'jane@example.com', company: 'Acme', overallScore: 4, overallLevel: 4 });
    expect(Object.keys(body.answers)).toHaveLength(20);
    expect(Object.keys(body.dimensions)).toHaveLength(5);
    fireEvent.click(screen.getByRole('button', { name: /download pdf report/i }));
    await waitFor(() => expect(generateAssessmentReport).toHaveBeenCalledWith(expect.objectContaining({ name: 'Jane Smith', results: expect.objectContaining({ overall: 4 }) })));
  });
  it('renders lower score categories and recovers from failed PDF generation', async () => {
    generateAssessmentReport.mockRejectedValueOnce(new Error('Canvas unavailable'));
    const answers = Object.fromEntries(ASSESSMENT_DIMENSIONS.flatMap((dimension, i) => dimension.questions.map(({ id }) => [id, i === 0 ? 1 : 3])));
    render(<MemoryRouter><ResultsPanel results={calculateScores(answers)} details={{ name: 'Jane', company: '' }} /></MemoryRouter>);
    fireEvent.click(screen.getByRole('button', { name: /download pdf report/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Unable to generate your PDF report');
    expect(screen.getByText('1.0 / 5.0')).toHaveClass('score-low');
    expect(screen.getAllByText('3.0 / 5.0')[0]).toHaveClass('score-mid');
  });
});
