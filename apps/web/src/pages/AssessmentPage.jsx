import { useState } from "react";
import PageMeta from "@/components/PageMeta";
import QuestionStep from "@/components/assessment/QuestionStep";
import EmailGate from "@/components/assessment/EmailGate";
import ResultsPanel from "@/components/assessment/ResultsPanel";
import { ASSESSMENT_DIMENSIONS } from "@/lib/assessment-data";
import { calculateScores, unansweredQuestions } from "@/lib/assessment-scoring";
import { submitForm } from "@/lib/forms";

export default function AssessmentPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState([]);
  const [phase, setPhase] = useState("questions");
  const [details, setDetails] = useState(null);
  function next() {
    const missing = unansweredQuestions(step, answers);
    setErrors(missing);
    if (missing.length) {
      document
        .getElementById(`${missing[0]}-label`)
        ?.scrollIntoView?.({ behavior: "smooth", block: "center" });
      return;
    }
    if (step === ASSESSMENT_DIMENSIONS.length - 1) setPhase("gate");
    else setStep(step + 1);
  }
  function submitLead(values) {
    const results = calculateScores(answers);
    setDetails(values);
    setPhase("results");
    // This optional email/lead request never blocks client-side results.
    submitForm("/api/assessment", {
      ...values,
      overallScore: results.overall,
      overallLevel: results.overallLevel,
      dimensions: results.dimensions,
      answers,
    }).catch(() => {});
  }
  return (
    <>
      <PageMeta title="Free Test Automation Maturity Assessment — Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Free 5 Minutes Tool</span>
          <h1>Test Automation Maturity Assessment</h1>
          <p>
            Answer 20 questions across 5 dimensions. Get your maturity score, a
            radar chart, personalised recommendations, and a downloadable PDF
            report. These are all{" "}
            <span style={{ fontWeight: "bold", color: "#d4af37" }}>FREE</span>.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="assessment-wrapper">
            {phase === "questions" && (
              <>
                <div className="sticky-progress">
                  <div className="step-indicator">
                    <span className="current-step">Step {step + 1} of 5</span>
                    <span className="answered-count">
                      <span className="count-num">
                        {Object.keys(answers).length}
                      </span>{" "}
                      of 20 answered
                    </span>
                  </div>
                  <div
                    className="progress-bar-container"
                    role="progressbar"
                    aria-label="Assessment progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(((step + 1) / 6) * 100)}
                  >
                    <div
                      className="progress-bar"
                      style={{ width: `${((step + 1) / 6) * 100}%` }}
                    />
                  </div>
                </div>
                <div id="assessment-sections">
                  <QuestionStep
                    dimension={ASSESSMENT_DIMENSIONS[step]}
                    step={step}
                    answers={answers}
                    errors={errors}
                    onAnswer={(id, value) => {
                      setAnswers((previous) => ({ ...previous, [id]: value }));
                      setErrors((previous) =>
                        previous.filter((key) => key !== id),
                      );
                    }}
                    onNext={next}
                    onPrevious={() => {
                      setErrors([]);
                      setStep(step - 1);
                    }}
                  />
                </div>
              </>
            )}
            {phase === "gate" && <EmailGate onSubmit={submitLead} />}
            {phase === "results" && (
              <ResultsPanel
                results={calculateScores(answers)}
                details={details}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
}
