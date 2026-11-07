import { ASSESSMENT_DIMENSIONS } from "./assessment-data";

// Preserve the original order of rounding: dimension means to one decimal,
// then the overall mean, with the level rounded from the unrounded overall.
export function calculateScores(answers) {
  const dimensions = {};
  for (const dimension of ASSESSMENT_DIMENSIONS) {
    const average =
      dimension.questions.reduce(
        (sum, question) => sum + (answers[question.id] || 0),
        0,
      ) / dimension.questions.length;
    dimensions[dimension.id] = {
      score: Math.round(average * 10) / 10,
      level: Math.round(average),
      title: dimension.title,
      icon: dimension.icon,
    };
  }
  const scores = Object.values(dimensions).map(({ score }) => score);
  const overall = scores.reduce((sum, score) => sum + score, 0) / scores.length;
  return {
    dimensions,
    overall: Math.round(overall * 10) / 10,
    overallLevel: Math.round(overall),
  };
}

export function unansweredQuestions(step, answers) {
  return ASSESSMENT_DIMENSIONS[step].questions
    .filter((question) => !answers[question.id])
    .map(({ id }) => id);
}
