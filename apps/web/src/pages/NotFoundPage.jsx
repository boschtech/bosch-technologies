import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="service-hero">
      <div className="container">
        <h1>404 — Page Not Found</h1>
        <p>
          <Link to="/">Return home</Link>
        </p>
      </div>
    </section>
  );
}
