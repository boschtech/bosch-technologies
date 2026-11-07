import { useEffect, useRef } from "react";
import SiteIcon from "@/components/SiteIcon";

export default function QuestionStep({
  dimension,
  step,
  answers,
  errors,
  onAnswer,
  onNext,
  onPrevious,
}) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [step]);
  function answer(question, value, event) {
    onAnswer(question.id, value);
    const block = event.target.closest(".question-block");
    const next = block.nextElementSibling;
    next?.scrollIntoView?.({ behavior: "smooth", block: "center" });
  }
  return (
    <div ref={ref} className="assessment-section active" id={`step-${step}`}>
      <h2>
        <SiteIcon name={dimension.icon} /> {dimension.title}
      </h2>
      <p className="section-desc">{dimension.description}</p>
      {dimension.questions.map((question, index) => (
        <div
          key={question.id}
          className={`question-block${errors.includes(question.id) ? " has-error" : ""}`}
        >
          <h4 id={`${question.id}-label`}>
            {step * 4 + index + 1}. {question.text}
          </h4>
          <div
            className="radio-group"
            role="radiogroup"
            aria-labelledby={`${question.id}-label`}
            aria-describedby={
              errors.includes(question.id) ? `${question.id}-error` : undefined
            }
          >
            {question.options.map((option) => (
              <label
                key={option.value}
                className={`radio-option${answers[question.id] === option.value ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.value}
                  checked={answers[question.id] === option.value}
                  onChange={(event) => answer(question, option.value, event)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.includes(question.id) && (
            <div
              id={`${question.id}-error`}
              className="question-error"
              role="alert"
            >
              Please select an answer
            </div>
          )}
        </div>
      ))}
      <div className="assessment-nav">
        {step > 0 ? (
          <button className="btn btn-outline" onClick={onPrevious}>
            ← Previous
          </button>
        ) : (
          <div />
        )}
        <button
          className={`btn ${step === 4 ? "btn-accent btn-lg" : "btn-primary"}`}
          onClick={onNext}
        >
          {step === 4 ? "See My Results →" : "Next →"}
        </button>
      </div>
    </div>
  );
}
