import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";

export default function AutomationTestStrategyPage() {
  return (
    <>
      <PageMeta title="Automation Test Strategy \u2014 Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Our Core Service</span>
          <h1>Automation Test Strategy</h1>
          <p>
            We design and implement comprehensive test automation strategies
            that align with your product roadmap, team capabilities, and quality
            goals.
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
            <h2 className="mt-2">End-to-End Automation Strategy</h2>
            <p className="text-muted">
              From assessment to implementation. We cover every aspect of test
              automation
            </p>
          </div>
          <div className="service-offerings">
            <div className="offering-card">
              <h3>
                <SiteIcon name="crosshair" /> Test Strategy Design
              </h3>
              <p>
                A comprehensive test strategy document tailored to your context,
                covering scope, approach, tools, and success criteria.
              </p>
              <ul>
                <li>Test pyramid / trophy analysis and design</li>
                <li>Risk-based test prioritisation</li>
                <li>Entry/exit criteria per test phase</li>
                <li>Automation ROI analysis and business case</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="wrench" /> Tool Selection & Evaluation
              </h3>
              <p>
                Objective, data-driven tool recommendations based on your tech
                stack, team skills, and long-term goals.
              </p>
              <ul>
                <li>
                  Tool landscape analysis (Playwright, Cypress, Selenium,
                  Appium)
                </li>
                <li>Proof of concept development</li>
                <li>Total cost of ownership comparison</li>
                <li>Migration planning from legacy tools</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="layers" /> Framework Architecture
              </h3>
              <p>
                We design and build automation frameworks that are maintainable,
                scalable, and resilient to application changes.
              </p>
              <ul>
                <li>Page Object Model / Screenplay pattern</li>
                <li>Data-driven and keyword-driven design</li>
                <li>Cross-browser and cross-platform support</li>
                <li>Parallel execution and sharding</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="refresh-cw" /> CI/CD Integration
              </h3>
              <p>
                Tests that run automatically in your pipeline, blocking bad code
                and providing rapid feedback to developers.
              </p>
              <ul>
                <li>GitHub Actions, Jenkins, Azure DevOps, GitLab CI</li>
                <li>Multi-stage quality gates</li>
                <li>Automated reporting and notifications</li>
                <li>Docker-based test execution environments</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="zap" /> Performance Testing
              </h3>
              <p>
                Identify bottlenecks before your users do with load, stress, and
                endurance testing integrated into your pipeline.
              </p>
              <ul>
                <li>Load testing (k6, JMeter, Gatling)</li>
                <li>API performance benchmarking</li>
                <li>Performance budgets and monitoring</li>
                <li>Scalability analysis and recommendations</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="plug" /> API Testing
              </h3>
              <p>
                Comprehensive API validation covering functional, contract, and
                security testing at the service layer.
              </p>
              <ul>
                <li>REST and GraphQL test automation</li>
                <li>Contract testing (Pact, Specmatic)</li>
                <li>Schema validation and backward compatibility</li>
                <li>API security scanning integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">Our Approach</span>
            <h2 className="mt-2">How We Deliver Strategy Engagements</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <h4>Discovery</h4>
              <p>
                We interview stakeholders, review your codebase, and analyse
                your current test processes and tooling.
              </p>
            </div>
            <div className="process-step">
              <h4>Assessment</h4>
              <p>
                Using our maturity model, we score your testing across 5
                dimensions and identify priority improvement areas.
              </p>
            </div>
            <div className="process-step">
              <h4>Strategy</h4>
              <p>
                We produce a detailed test automation roadmap with phased
                milestones, tool recommendations, and resource plans.
              </p>
            </div>
            <div className="process-step">
              <h4>Execution</h4>
              <p>
                We implement the strategy alongside your team. Building
                frameworks, pipelines, and processes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Technologies We Work With</h2>
            <p className="text-muted">
              We&apos;re tool-agnostic. We recommend what&apos;s right for your
              context
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="globe" />
              </div>
              <div>
                <h4>UI Automation</h4>
                <p>Playwright, Cypress, Selenium, WebDriverIO, TestCafe</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="smartphone" />
              </div>
              <div>
                <h4>Mobile Testing</h4>
                <p>Appium, Detox, XCUITest, Espresso, BrowserStack</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="plug" />
              </div>
              <div>
                <h4>API Testing</h4>
                <p>RestAssured, Postman/Newman, Supertest, Pact, k6</p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="settings" />
              </div>
              <div>
                <h4>CI/CD & Infrastructure</h4>
                <p>GitHub Actions, Jenkins, Azure DevOps, Docker, Kubernetes</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Start With a Free Assessment</h2>
            <p>
              Discover your test automation maturity level and get personalised
              recommendations in 5 minutes.
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
