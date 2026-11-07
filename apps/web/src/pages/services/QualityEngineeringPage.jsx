import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";

export default function QualityEngineeringPage() {
  return (
    <>
      <PageMeta title="Quality Engineering \u2014 Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Quality at Every Stage</span>
          <h1>Quality Engineering</h1>
          <p>
            We embed quality into every phase of your software delivery
            lifecycle. From requirements to production monitoring.
          </p>
          <div className="btn-group mt-3">
            <Link to="/contact" className="btn btn-accent btn-lg">
              Book a Consultation
            </Link>
            <Link to="/assessment" className="btn btn-white">
              Assess Your Maturity First →
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">What We Deliver</span>
            <h2 className="mt-2">Quality Engineering Services</h2>
          </div>
          <div className="service-offerings">
            <div className="offering-card">
              <h3>
                <SiteIcon name="flask-conical" /> Test Process Design
              </h3>
              <p>
                We establish structured, repeatable testing processes aligned
                with your SDLC. Whether Agile, SAFe, or hybrid.
              </p>
              <ul>
                <li>Test strategy and plan creation</li>
                <li>Risk-based testing approach</li>
                <li>Entry/exit criteria and quality gates</li>
                <li>Defect management workflow design</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="search" /> Exploratory Testing
              </h3>
              <p>
                Skilled exploratory testing that finds the bugs automation
                can&apos;t. Focused on usability, edge cases, and business
                logic.
              </p>
              <ul>
                <li>Session-based test management</li>
                <li>Charter-driven exploration</li>
                <li>Heuristic-based test design</li>
                <li>Usability and accessibility reviews</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="clipboard-list" /> Test Management
              </h3>
              <p>
                We help you organise, track, and report on testing activities
                using modern tools and best practices.
              </p>
              <ul>
                <li>Test management tool setup (TestRail, Zephyr, qTest)</li>
                <li>Requirement traceability matrices</li>
                <li>Test suite organisation and maintenance</li>
                <li>Release readiness dashboards</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="bug" /> Defect Triage & Analytics
              </h3>
              <p>
                We implement structured defect workflows and analytics to reduce
                resolution time and prevent recurring issues.
              </p>
              <ul>
                <li>Defect lifecycle workflow design</li>
                <li>Root cause analysis processes</li>
                <li>Defect trend dashboards</li>
                <li>Escape analysis and prevention strategies</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="shield" /> Security Testing
              </h3>
              <p>
                Integrate security testing into your pipeline to identify
                vulnerabilities early in the development cycle.
              </p>
              <ul>
                <li>SAST and DAST tool integration</li>
                <li>OWASP Top 10 validation</li>
                <li>Security test automation</li>
                <li>Dependency vulnerability scanning</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="accessibility" /> Accessibility Testing
              </h3>
              <p>
                Ensure your application is usable by everyone with automated and
                manual accessibility validation.
              </p>
              <ul>
                <li>WCAG 2.1 compliance testing</li>
                <li>Automated accessibility scanning (axe, Pa11y)</li>
                <li>Screen reader testing</li>
                <li>Accessibility remediation guidance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Discover Your Quality Gaps</h2>
            <p>
              Take our free maturity assessment to understand where your testing
              processes stand today.
            </p>
            <Link to="/assessment" className="btn btn-white btn-lg">
              Take the Assessment →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
