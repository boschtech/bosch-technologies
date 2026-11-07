import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";

export default function HomePage() {
  return (
    <>
      <PageMeta title="Bosch Technologies - Automation Test Strategy & Quality Engineering" />
      <section className="hero hero-video">
        <video className="hero-video-bg" autoPlay muted loop playsInline>
          <source src="/images/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <span className="badge badge-accent">
              Automation Test Strategy & Consulting
            </span>
            <h1>
              Build Software That{" "}
              <span className="highlight">Ships Faster</span> With Fewer Defects
            </h1>
            <p>
              <strong>
                We partner with teams to architect powerful test automation
                strategies, engineer resilient frameworks, and elevate testing
                practices to ensure every release is delivered with confidence
                and faster by building CI/CD ready test automation frameworks.
              </strong>
            </p>
            <div className="btn-group">
              <Link to="/assessment" className="btn btn-accent btn-lg">
                Take Free Maturity Assessment →
              </Link>
              <Link
                to="/services/automation-test-strategy"
                className="btn btn-white"
              >
                Our Services
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <h3>5x</h3>
                <p>
                  <strong>Faster release cycles</strong>
                </p>
              </div>
              <div className="hero-stat">
                <h3>80%</h3>
                <p>
                  <strong>Reduction in manual testing</strong>
                </p>
              </div>
              <div className="hero-stat">
                <h3>60%</h3>
                <p>
                  <strong>Fewer production defects</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">What We Do</span>
            <h2 className="mt-2">Our Services</h2>
            <p className="text-muted">
              End-to-end test automation strategy and implementation
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="icon">
                <SiteIcon name="crosshair" />
              </div>
              <h3>Automation Test Strategy</h3>
              <p>
                We design comprehensive test strategies tailored to your
                product, team, and goals. From tool selection to test pyramid
                design.
              </p>
              <Link
                to="/services/automation-test-strategy"
                className="card-link"
              >
                Learn more →
              </Link>
            </div>
            <div className="service-card">
              <div className="icon">
                <SiteIcon name="flask-conical" />
              </div>
              <h3>Quality Engineering</h3>
              <p>
                We build testing frameworks, implement CI/CD quality gates, and
                establish processes that catch bugs before they reach
                production.
              </p>
              <Link to="/services/quality-engineering" className="card-link">
                Learn more →
              </Link>
            </div>
            <div className="service-card">
              <div className="icon">
                <SiteIcon name="graduation-cap" />
              </div>
              <h3>Training & Enablement</h3>
              <p>
                Upskill your team with hands-on workshops in test automation,
                framework design, CI/CD integration, and testing best practices.
              </p>
              <Link to="/services/training" className="card-link">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>How Mature Is Your Test Automation?</h2>
            <p>
              Take our free 5-minute assessment and get a personalised report
              with actionable recommendations for your team.
            </p>
            <Link to="/assessment" className="btn btn-white btn-lg">
              Start Free Assessment →
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">Why Us</span>
            <h2 className="mt-2">What Sets Us Apart</h2>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="compass" />
              </div>
              <div>
                <h4>Strategy First, Tools Second</h4>
                <p>
                  We don&apos;t start with tools, we start with your goals,
                  risks, and constraints to design a strategy that fits.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="layers" />
              </div>
              <div>
                <h4>Framework Architecture Experts</h4>
                <p>
                  We&apos;ve built automation frameworks across Selenium,
                  Playwright, Cypress, Appium, and RestAssured in diverse tech
                  stacks.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="refresh-cw" />
              </div>
              <div>
                <h4>CI/CD Native</h4>
                <p>
                  Every solution we deliver is designed to run in your pipeline.
                  GitHub Actions, Jenkins, Azure DevOps, or GitLab CI.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="trending-up" />
              </div>
              <div>
                <h4>Measurable Outcomes</h4>
                <p>
                  We define success metrics upfront and track them throughout
                  the engagement. Coverage, flakiness, cycle time, defect escape
                  rate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">Our Process</span>
            <h2 className="mt-2">How We Work</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <h4>Assess</h4>
              <p>
                We evaluate your current testing maturity across 5 dimensions to
                identify gaps and opportunities.
              </p>
            </div>
            <div className="process-step">
              <h4>Strategise</h4>
              <p>
                We design a tailored test automation roadmap aligned with your
                team&apos;s capacity and business goals.
              </p>
            </div>
            <div className="process-step">
              <h4>Implement</h4>
              <p>
                We build frameworks, integrate pipelines, and establish
                processes. Working alongside your team.
              </p>
            </div>
            <div className="process-step">
              <h4>Enable</h4>
              <p>
                We train your team to own and evolve the solution, ensuring
                long-term sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-primary text-center">
        <div className="container">
          <h2>Ready to Transform Your Testing?</h2>
          <p
            style={{
              maxWidth: "500px",
              margin: "1rem auto 2rem",
              opacity: "0.9",
            }}
          >
            Let&apos;s start with a conversation about where you are and where
            you want to be.
          </p>
          <div className="btn-group" style={{ justifyContent: "center" }}>
            <Link to="/assessment" className="btn btn-white btn-lg">
              Take Free Assessment
            </Link>
            <Link
              to="/contact"
              className="btn btn-outline"
              style={{ borderColor: "white", color: "white" }}
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
