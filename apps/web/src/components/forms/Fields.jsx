export const services = [
  ["automation-strategy", "Automation Test Strategy"],
  ["quality-engineering", "Quality Engineering"],
  ["training", "Training & Enablement"],
  ["maturity-assessment", "Maturity Assessment"],
];

export function Field({
  prefix,
  name,
  label,
  error,
  type = "text",
  children,
  ...props
}) {
  const id = `${prefix}-${name}`;
  const shared = {
    id,
    name,
    required: true,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    ...props,
  };
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === "textarea" ? (
        <textarea {...shared} />
      ) : type === "select" ? (
        <select {...shared}>{children}</select>
      ) : (
        <input type={type} {...shared} />
      )}
      {error && (
        <p
          id={`${id}-error`}
          className="gate-field-error"
          role="alert"
          style={{ color: "var(--danger)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function ServiceOptions({ contact = false }) {
  return (
    <>
      <option value="">Select a service...</option>
      {services.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
          {contact && value === "maturity-assessment" ? " (Consultative)" : ""}
        </option>
      ))}
      {contact && <option value="other">Other / General Enquiry</option>}
    </>
  );
}
