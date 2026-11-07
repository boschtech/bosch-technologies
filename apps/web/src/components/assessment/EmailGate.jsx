import { useState } from "react";
import { validateFields } from "@/lib/forms";
import { Field } from "@/components/forms/Fields";

export default function EmailGate({ onSubmit }) {
  const [errors, setErrors] = useState({});
  function submit(event) {
    event.preventDefault();
    const details = Object.fromEntries(new FormData(event.currentTarget));
    const next = validateFields(details, ["name", "email", "company"]);
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(details);
  }
  return (
    <div className="email-gate" id="email-gate">
      <h2>Almost There!</h2>
      <p>
        Enter your details to see your personalised maturity report with
        recommendations.
      </p>
      <form
        className="contact-form"
        style={{ maxWidth: 400, margin: "0 auto", textAlign: "left" }}
        onSubmit={submit}
        noValidate
      >
        <Field
          prefix="gate"
          name="name"
          label="Your Name *"
          placeholder="John Smith"
          maxLength={50}
          error={errors.name}
        />
        <Field
          prefix="gate"
          name="email"
          label="Work Email *"
          type="email"
          placeholder="john@company.com"
          error={errors.email}
        />
        <Field
          prefix="gate"
          name="company"
          label="Company *"
          placeholder="Acme Corp"
          maxLength={100}
          error={errors.company}
        />
        <button
          type="submit"
          className="btn btn-accent btn-lg"
          style={{ width: "100%", justifyContent: "center" }}
        >
          See My Results →
        </button>
        <p
          style={{
            fontSize: "0.8rem",
            color: "#6c757d",
            marginTop: 12,
            textAlign: "center",
          }}
        >
          We respect your privacy. No spam, ever.
        </p>
      </form>
    </div>
  );
}
