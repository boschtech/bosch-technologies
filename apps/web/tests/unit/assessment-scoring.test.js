import { describe, expect, it } from 'vitest';
import { ASSESSMENT_DIMENSIONS, MATURITY_LEVELS, RECOMMENDATIONS } from '@/lib/assessment-data';
import { calculateScores, unansweredQuestions } from '@/lib/assessment-scoring';
import { safeAssetUrl, validateFields } from '@/lib/forms';

const answersAt = (value) => Object.fromEntries(ASSESSMENT_DIMENSIONS.flatMap((dimension) => dimension.questions.map(({ id }) => [id, value])));

describe('original assessment scoring parity', () => {
  it.each([1, 2, 3, 4, 5])('maps all answers at %s to the matching maturity level', (value) => {
    const result = calculateScores(answersAt(value));
    expect(result.overall).toBe(value);
    expect(result.overallLevel).toBe(value);
    for (const dimension of ASSESSMENT_DIMENSIONS) {
      expect(result.dimensions[dimension.id].score).toBe(value);
      expect(RECOMMENDATIONS[dimension.id][value]).toBeTruthy();
    }
    expect(MATURITY_LEVELS[value].name).toBeTruthy();
  });
  it('rounds dimension means to one decimal before calculating the overall mean', () => {
    const result = calculateScores({ ...answersAt(2), p1: 1, a1: 3, a2: 3, t1: 5 });
    expect(result.dimensions.process).toMatchObject({ score: 1.8, level: 2 });
    expect(result.dimensions.automation).toMatchObject({ score: 2.5, level: 3 });
    expect(result.dimensions.tooling).toMatchObject({ score: 2.8, level: 3 });
    expect(result.overall).toBe(2.2);
    expect(result.overallLevel).toBe(2);
  });
  it('rounds half-level boundaries upward', () => {
    const answers = answersAt(2);
    for (const dimension of ASSESSMENT_DIMENSIONS) {
      answers[dimension.questions[0].id] = 3;
      answers[dimension.questions[1].id] = 3;
    }
    expect(calculateScores(answers).overallLevel).toBe(3);
  });
  it('identifies missing answers and retains original zero fallback', () => {
    expect(unansweredQuestions(0, { p1: 1 })).toEqual(['p2', 'p3', 'p4']);
    expect(unansweredQuestions(4, answersAt(5))).toEqual([]);
    expect(calculateScores({}).overall).toBe(0);
  });
});

describe('shared form validation', () => {
  it('rejects missing, whitespace-only, and invalid email fields', () => {
    expect(validateFields({ name: ' ', email: 'bad' }, ['name', 'email', 'company'])).toEqual({
      name: 'This field is required.', company: 'This field is required.', email: 'Please enter a valid email address.',
    });
    expect(validateFields({ name: 'Jane', email: 'jane@example.com' }, ['name', 'email'])).toEqual({});
  });
  it('only permits non-executable asset URLs', () => {
    for (const url of [undefined, '', 'javascript:alert(1)', '//evil.example', 'data:text/html,hello']) expect(safeAssetUrl(url)).toBeUndefined();
    for (const url of ['/uploads/logo.png', 'https://example.com/ref.pdf', 'http://example.com/logo.png']) expect(safeAssetUrl(url)).toBe(url);
  });
});
