import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";

export default function TrainingPage() {
  return (
    <>
      <PageMeta title="Training & Enablement \u2014 Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Upskill Your Team</span>
          <h1>Training & Enablement</h1>
          <p>
            Hands-on workshops and mentoring programmes that build lasting
            automation skills within your team. Not just a handover document.
          </p>
          <div className="btn-group mt-3">
            <Link to="/contact" className="btn btn-accent btn-lg">
              Enquire About Training
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
            <span className="badge badge-primary">Our Programmes</span>
            <h2 className="mt-2">Training & Workshop Catalogue</h2>
            <p className="text-muted">
              All programmes are customised to your team&apos;s tech stack and
              skill level.
            </p>
          </div>
          <div className="service-offerings">
            <div className="offering-card">
              <h3>
                <SiteIcon name="graduation-cap" /> Test Automation Fundamentals
              </h3>
              <p>
                A comprehensive introduction to test automation for teams
                transitioning from manual to automated testing.
              </p>
              <ul>
                <li>Automation mindset and when to automate</li>
                <li>Test pyramid and automation strategy basics</li>
                <li>
                  Introduction to chosen framework (Playwright/Cypress/Selenium)
                </li>
                <li>Writing your first automated test suite</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="layers" /> Framework Design Workshop
              </h3>
              <p>
                An advanced workshop on building maintainable, scalable
                automation frameworks from scratch.
              </p>
              <ul>
                <li>Page Object Model and design patterns</li>
                <li>Data-driven and configuration management</li>
                <li>Custom reporting and logging</li>
                <li>Parallel execution and CI/CD integration</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="plug" /> API Testing Masterclass
              </h3>
              <p>
                Deep dive into API test automation covering REST, GraphQL,
                contract testing, and performance.
              </p>
              <ul>
                <li>API testing fundamentals and tools</li>
                <li>RestAssured / Supertest hands-on</li>
                <li>Contract testing with Pact</li>
                <li>API performance testing with k6</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="refresh-cw" /> CI/CD for Testers
              </h3>
              <p>
                Practical workshop on integrating tests into CI/CD pipelines and
                understanding DevOps workflows.
              </p>
              <ul>
                <li>Pipeline fundamentals (GitHub Actions / Jenkins)</li>
                <li>Running tests in Docker containers</li>
                <li>Quality gates and blocking deployments</li>
                <li>Test reporting and notifications</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="smartphone" /> Mobile Test Automation
              </h3>
              <p>
                Hands-on training for mobile test automation across iOS and
                Android platforms.
              </p>
              <ul>
                <li>Appium setup and architecture</li>
                <li>Cross-platform test strategies</li>
                <li>Device farms and cloud testing</li>
                <li>Mobile-specific challenges and patterns</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="users" /> Quality Culture Workshop
              </h3>
              <p>
                For engineering leaders. How to build a culture of quality
                ownership across development and testing teams.
              </p>
              <ul>
                <li>Shift-left and shift-right strategies</li>
                <li>Quality metrics that matter</li>
                <li>Building a testing community of practice</li>
                <li>Hiring and growing QA engineers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <h2>Delivery Formats</h2>
            <p className="text-muted">
              We adapt to your team&apos;s needs and schedule
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="monitor" />
              </div>
              <div>
                <h4>On-Site Workshops</h4>
                <p>
                  Immersive 1–3 day workshops at your office with hands-on
                  exercises using your actual codebase.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="globe" />
              </div>
              <div>
                <h4>Remote Training</h4>
                <p>
                  Live virtual workshops with screen sharing, breakout rooms,
                  and collaborative coding exercises.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="handshake" />
              </div>
              <div>
                <h4>Embedded Mentoring</h4>
                <p>
                  Our engineers pair with your team for 2–8 weeks, coaching
                  through real project work.
                </p>
              </div>
            </div>
            <div className="feature-item">
              <div className="feature-icon">
                <SiteIcon name="book-open" />
              </div>
              <div>
                <h4>Custom Curriculum</h4>
                <p>
                  We design bespoke programmes based on your team assessment,
                  tech stack, and learning objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Invest in Your Team&apos;s Skills</h2>
            <p>
              Contact us to discuss a training programme tailored to your
              team&apos;s needs and objectives.
            </p>
            <Link to="/contact" className="btn btn-white btn-lg">
              Enquire About Training →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
