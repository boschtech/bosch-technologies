import { useEffect, useState } from "react";

export default function ClientGate(props) {
  useEffect(() => {
    let robots = document.querySelector('meta[name="robots"]');
    const previous = robots?.getAttribute("content");
    const created = !robots;
    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }
    robots.content = "noindex, nofollow";
    return () => {
      if (created) robots.remove();
      else if (previous === null) robots.removeAttribute("content");
      else robots.setAttribute("content", previous);
    };
  }, []);
  return <ClientSessionGate key={props.slug} {...props} />;
}

function ClientSessionGate({ slug, document = false, children }) {
  const [status, setStatus] = useState("loading");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    setCode("");
    setError("");
    fetch(`/api/clients/${slug}/session`, {
      credentials: "same-origin",
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok)
          throw new Error("Unable to check access. Please try again.");
        const session = await response.json();
        if (!controller.signal.aborted)
          setStatus(
            session.authenticated === true ? "authenticated" : "locked",
          );
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err.message);
        setStatus("locked");
      });
    return () => controller.abort();
  }, [slug]);

  async function unlock(event) {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch(`/api/clients/${slug}/unlock`, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Invalid access code. Please try again."
            : "Unable to unlock this document. Please try again.",
        );
      }
      const result = await response.json();
      if (result.success !== true)
        throw new Error("Unable to unlock this document. Please try again.");
      setCode("");
      setStatus("authenticated");
    } catch (err) {
      setError(err.message);
      setStatus("locked");
    }
  }

  if (status === "loading")
    return (
      <section className="section" role="status">
        <div className="container">Checking document access…</div>
      </section>
    );
  if (status === "authenticated") return children;
  return (
    <>
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Private Document</span>
          <h1>Client {document ? "Document" : "Proposal"}</h1>
          <p>
            This document is confidential and intended for authorised recipients
            only.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: "480px" }}>
          <div
            style={{
              background: "#111111",
              border: "1px solid #1a1a1a",
              borderRadius: "16px",
              padding: "40px",
            }}
          >
            <h2 style={{ marginBottom: "8px", textAlign: "center" }}>
              Enter Access Code
            </h2>
            <p
              className="text-muted"
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              Please enter the access code provided to you by Bosch
              Technologies.
            </p>
            {error && (
              <div
                role="alert"
                style={{
                  padding: "12px 16px",
                  background: "rgba(192,57,43,0.08)",
                  border: "1px solid #c0392b",
                  borderRadius: "6px",
                  color: "#c0392b",
                  fontWeight: 600,
                  marginBottom: "20px",
                }}
              >
                {error}
              </div>
            )}
            <form onSubmit={unlock} className="contact-form">
              <div className="form-group">
                <label htmlFor="access_code">Access Code</label>
                <input
                  type="password"
                  id="access_code"
                  name="access_code"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your access code"
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  disabled={status === "submitting"}
                />
              </div>
              <button
                type="submit"
                className="btn btn-accent btn-lg"
                disabled={status === "submitting"}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {status === "submitting"
                  ? "Checking…"
                  : `View ${document ? "Document" : "Proposal"} →`}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
