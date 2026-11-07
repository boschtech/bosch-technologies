import { useEffect, useRef, useState } from "react";
import SiteIcon from "@/components/SiteIcon";
import { safeAssetUrl, submitForm, validateFields } from "@/lib/forms";
import { Field, ServiceOptions } from "./Fields";

export function TestimonialList() {
  const [items, setItems] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    fetch("/api/testimonials")
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load testimonials");
        return response.json();
      })
      .then((data) => {
        if (active) setItems(data);
      })
      .catch(() => {
        if (active) {
          setItems([]);
          setFailed(true);
        }
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <div className="testimonials-grid">
      {items === null && (
        <p
          role="status"
          className="text-muted text-center"
          style={{ gridColumn: "1 / -1" }}
        >
          Loading testimonials...
        </p>
      )}
      {items?.length === 0 && (
        <p
          role={failed ? "alert" : "status"}
          className="text-muted text-center"
          style={{ gridColumn: "1 / -1" }}
        >
          {failed
            ? "Unable to load testimonials. Please try again later."
            : "Testimonials coming soon — check back shortly!"}
        </p>
      )}
      {items?.map((item) => (
        <article key={item.id} className="testimonial-card">
          <div className="testimonial-quote">
            {item.testimonial
              .split("\n")
              .filter((p) => p.trim())
              .map((p, i) => (
                <p key={i}>{p}</p>
              ))}
          </div>
          <div className="testimonial-author">
            <div className="testimonial-logo">
              {safeAssetUrl(item.logo) ? (
                <img
                  src={safeAssetUrl(item.logo)}
                  alt={`${item.company} logo`}
                />
              ) : (
                <span className="logo-placeholder">
                  {item.company.substring(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="author-name">{item.name}</div>
              <p className="author-role">
                {[item.role, item.company].filter(Boolean).join(", ")}
              </p>
            </div>
          </div>
          <span className="testimonial-service">{item.service}</span>
          {safeAssetUrl(item.referencePdf) && (
            <a
              href={safeAssetUrl(item.referencePdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              style={{ marginTop: 16, alignSelf: "flex-start" }}
            >
              <SiteIcon name="file-text" /> View Full Reference Letter
            </a>
          )}
        </article>
      ))}
    </div>
  );
}

function FileUpload({ name, label, accept, help, error }) {
  const ref = useRef(null);
  const [hasFile, setHasFile] = useState(false);
  return (
    <div className="form-group">
      <label htmlFor={`test-${name}`}>{label}</label>
      <div className="file-input-wrapper">
        <input
          ref={ref}
          id={`test-${name}`}
          type="file"
          name={name}
          accept={accept}
          className="file-input"
          onChange={(event) => setHasFile(event.target.files.length > 0)}
          aria-describedby={error ? `test-${name}-error` : undefined}
        />
        {hasFile && (
          <button
            type="button"
            className="file-clear-btn"
            aria-label={`Remove ${label}`}
            onClick={() => {
              ref.current.value = "";
              setHasFile(false);
            }}
          >
            ✕ Remove
          </button>
        )}
      </div>
      <p className="text-muted" style={{ fontSize: "0.82rem", marginTop: 6 }}>
        {help}
      </p>
      {error && (
        <p
          id={`test-${name}-error`}
          role="alert"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TestimonialForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = new FormData(event.currentTarget);
    const nextErrors = validateFields(Object.fromEntries(form), [
      "name",
      "email",
      "role",
      "company",
      "service",
      "testimonial",
    ]);
    const logo = event.currentTarget.elements.namedItem("logo").files[0];
    const reference = event.currentTarget.elements.namedItem("referenceLetter").files[0];
    if (logo?.size > 2 * 1024 * 1024)
      nextErrors.logo = "Company logo must be 2 MB or smaller.";
    if (
      logo?.size &&
      !["image/png", "image/jpeg", "image/svg+xml"].includes(logo.type)
    )
      nextErrors.logo = "Choose a PNG, JPG, or SVG logo.";
    if (reference?.size > 5 * 1024 * 1024)
      nextErrors.referenceLetter = "Reference letter must be 5 MB or smaller.";
    if (
      reference?.size &&
      !/\.(pdf|png|jpe?g|docx?|txt)$/i.test(reference.name)
    )
      nextErrors.referenceLetter =
        "Choose a PDF, image, Word document, or text file.";
    setErrors(nextErrors);
    setError("");
    if (Object.keys(nextErrors).length) return;
    // Empty browser File objects should not be sent as actual uploads.
    if (logo?.size) form.set("logo", logo);
    else form.delete("logo");
    if (reference?.size) form.set("referenceLetter", reference);
    else form.delete("referenceLetter");
    setStatus("sending");
    try {
      await submitForm("/api/testimonials", form, true);
      setStatus("success");
    } catch (cause) {
      setError(
        cause.message ||
          "Network error. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  }
  if (status === "success")
    return (
      <div
        className="text-center"
        role="status"
        style={{
          padding: "48px 32px",
          background: "#111111",
          border: "1px solid var(--primary)",
          borderRadius: 16,
        }}
      >
        <div style={{ fontSize: "2rem" }}>✓</div>
        <h2>Thank You!</h2>
        <p className="text-muted">
          Your testimonial has been submitted successfully. We&apos;ll review it
          and add it to the page shortly.
        </p>
        <button
          className="btn btn-outline"
          onClick={() => {
            setStatus("idle");
            setErrors({});
          }}
        >
          Submit Another
        </button>
      </div>
    );
  return (
    <form
      className="contact-form testimonial-form"
      onSubmit={submit}
      noValidate
    >
      <div className="testimonial-form-grid">
        <Field
          prefix="test"
          name="name"
          label="Your Name *"
          placeholder="Full name"
          maxLength={50}
          error={errors.name}
        />
        <Field
          prefix="test"
          name="role"
          label="Job Title *"
          placeholder="e.g. Head of QA"
          maxLength={80}
          error={errors.role}
        />
        <Field
          prefix="test"
          name="company"
          label="Company *"
          placeholder="Company name"
          maxLength={100}
          error={errors.company}
        />
        <Field
          prefix="test"
          name="email"
          label="Work Email *"
          type="email"
          placeholder="you@company.com"
          error={errors.email}
        />
      </div>
      <Field
        prefix="test"
        name="service"
        label="Service Used *"
        type="select"
        error={errors.service}
      >
        <ServiceOptions />
      </Field>
      <Field
        prefix="test"
        name="testimonial"
        label="Your Testimonial *"
        type="textarea"
        maxLength={1000}
        placeholder="Tell us how Bosch Technologies helped your team..."
        error={errors.testimonial}
      />
      <FileUpload
        name="logo"
        label="Company Logo (optional)"
        accept="image/png,image/jpeg,image/svg+xml"
        help="PNG, JPG, or SVG — max 2 MB"
        error={errors.logo}
      />
      <FileUpload
        name="referenceLetter"
        label="Reference Letter (optional)"
        accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.txt"
        help="PDF, image, Word document, or text file — max 5 MB. Will be converted to PDF."
        error={errors.referenceLetter}
      />
      <button
        type="submit"
        className="btn btn-accent btn-lg"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Submitting..." : "Submit Testimonial →"}
      </button>
      {error && (
        <p role="alert" style={{ color: "var(--danger)", marginTop: 16 }}>
          {error}
        </p>
      )}
    </form>
  );
}
