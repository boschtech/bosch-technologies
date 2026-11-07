import { useState } from "react";
import { submitForm, validateFields } from "@/lib/forms";
import { Field, ServiceOptions } from "./Fields";

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const nextErrors = validateFields(values, [
      "name",
      "email",
      "company",
      "service",
      "message",
    ]);
    setErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length) return;
    setStatus("sending");
    try {
      await submitForm("/api/contact", values);
      setStatus("success");
    } catch (cause) {
      setError(
        cause.message ||
          "Something went wrong. Please try again or email us directly at admin@boschtechnologies.com.",
      );
      setStatus("idle");
    }
  }
  if (status === "success")
    return (
      <div role="status" className="text-center" style={{ padding: 40 }}>
        <h3 style={{ color: "var(--accent)" }}>Message Sent!</h3>
        <p>
          Thank you for reaching out. We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    );
  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <Field
        prefix="contact"
        name="name"
        label="Full Name *"
        placeholder="Your name"
        maxLength={50}
        error={errors.name}
      />
      <Field
        prefix="contact"
        name="email"
        label="Work Email *"
        type="email"
        placeholder="you@company.com"
        error={errors.email}
      />
      <Field
        prefix="contact"
        name="company"
        label="Company *"
        placeholder="Your company name"
        maxLength={100}
        error={errors.company}
      />
      <Field
        prefix="contact"
        name="service"
        label="Interested In *"
        type="select"
        error={errors.service}
      >
        <ServiceOptions contact />
      </Field>
      <Field
        prefix="contact"
        name="message"
        label="Message *"
        type="textarea"
        maxLength={750}
        placeholder="Tell us about your project, challenges, or questions..."
        error={errors.message}
      />
      <button
        type="submit"
        className="btn btn-accent btn-lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
      {error && (
        <p role="alert" style={{ color: "var(--danger)", marginTop: 16 }}>
          {error}
        </p>
      )}
    </form>
  );
}
