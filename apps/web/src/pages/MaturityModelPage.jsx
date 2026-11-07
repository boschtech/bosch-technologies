import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";

export default function MaturityModelPage() {
  return (
    <>
      <PageMeta title="Test Automation Maturity Model \u2014 Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Our Framework</span>
          <h1>Test Automation Maturity Model</h1>
          <p>
            A structured framework for assessing and improving your test
            automation practices across 5 key dimensions. From ad hoc to
            industry-leading.
          </p>
          <div className="btn-group mt-3">
            <Link to="/assessment" className="btn btn-accent btn-lg">
              Assess Your Level →
            </Link>
            <a href="#dimensions" className="btn btn-white">
              Explore Dimensions
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="container-narrow text-center mb-4">
            <h2>Why a Maturity Model?</h2>
            <p>
              Most teams know they need to improve their testing, but struggle
              to prioritise. Our maturity model gives you a clear picture of
              where you stand across 5 dimensions and a structured path forward.
              So you invest effort where it matters most.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">The Scale</span>
            <h2 className="mt-2">5 Maturity Levels</h2>
            <p className="text-muted">
              Each dimension is scored from Level 1 (Initial) to Level 5
              (Optimising)
            </p>
          </div>
          <div className="maturity-levels">
            <div className="maturity-level level-1">
              <div className="level-number">1</div>
              <div>
                <h3>Initial</h3>
                <p>
                  Testing is ad hoc and reactive. No formal processes, little to
                  no automation, and quality is an afterthought.
                </p>
                <ul className="level-traits">
                  <li>No test strategy</li>
                  <li>Manual testing only</li>
                  <li>No CI/CD integration</li>
                  <li>Verbal defect reporting</li>
                </ul>
              </div>
            </div>
            <div className="maturity-level level-2">
              <div className="level-number">2</div>
              <div>
                <h3>Managed</h3>
                <p>
                  Some processes exist but are inconsistently applied. Basic
                  automation covers critical paths but is fragile.
                </p>
                <ul className="level-traits">
                  <li>Basic test plans</li>
                  <li>10-30% automation</li>
                  <li>Flaky tests common</li>
                  <li>Spreadsheet tracking</li>
                </ul>
              </div>
            </div>
            <div className="maturity-level level-3">
              <div className="level-number">3</div>
              <div>
                <h3>Defined</h3>
                <p>
                  Standardised processes and frameworks are in place. Automation
                  is reliable and integrated into CI. Quality is part of the
                  SDLC.
                </p>
                <ul className="level-traits">
                  <li>Documented strategy</li>
                  <li>30-60% automation</li>
                  <li>CI/CD quality gates</li>
                  <li>Test management tools</li>
                </ul>
              </div>
            </div>
            <div className="maturity-level level-4">
              <div className="level-number">4</div>
              <div>
                <h3>Measured</h3>
                <p>
                  Metrics drive decisions. Pipelines are optimised, coverage is
                  comprehensive, and the team continuously improves based on
                  data.
                </p>
                <ul className="level-traits">
                  <li>Risk-based strategy</li>
                  <li>60-85% automation</li>
                  <li>Multi-stage pipelines</li>
                  <li>Real-time dashboards</li>
                </ul>
              </div>
            </div>
            <div className="maturity-level level-5">
              <div className="level-number">5</div>
              <div>
                <h3>Optimising</h3>
                <p>
                  Industry-leading practices with AI-native test creation and
                  maintenance, predictive analytics, and a culture of continuous
                  innovation. Many teams at this level retire their dedicated
                  test management system entirely, since AI keeps
                  version-controlled, in-repo test suites generated and
                  self-maintained without it.
                </p>
                <ul className="level-traits">
                  <li>Adaptive strategy</li>
                  <li>85%+ automation</li>
                  <li>AI-native test creation & self-healing</li>
                  <li>Predictive analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="dimensions">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">Assessment Areas</span>
            <h2 className="mt-2">5 Assessment Dimensions</h2>
            <p className="text-muted">
              Each dimension captures a critical aspect of test automation
              maturity
            </p>
          </div>
          <div className="dimensions-grid">
            <div className="dimension-card">
              <div className="dim-header">
                <div className="dim-icon dim-icon-1">
                  <SiteIcon name="clipboard-list" />
                </div>
                <h3>Test Process & Governance</h3>
              </div>
              <p>How structured and repeatable are your testing activities?</p>
              <ul>
                <li>Test case management approach</li>
                <li>Test planning and strategy maturity</li>
                <li>Defect management practices</li>
                <li>Process review and improvement cadence</li>
              </ul>
            </div>
            <div className="dimension-card">
              <div className="dim-header">
                <div className="dim-icon dim-icon-2">
                  <SiteIcon name="settings" />
                </div>
                <h3>Automation Coverage & Effectiveness</h3>
              </div>
              <p>
                What proportion of tests are automated, how reliable are they,
                and how much does AI drive their creation and upkeep?
              </p>
              <ul>
                <li>Regression automation percentage</li>
                <li>Test reliability and flakiness management</li>
                <li>Framework architecture quality</li>
                <li>AI-driven test creation & maintenance</li>
              </ul>
            </div>
            <div className="dimension-card">
              <div className="dim-header">
                <div className="dim-icon dim-icon-3">
                  <SiteIcon name="wrench" />
                </div>
                <h3>Tooling & Infrastructure</h3>
              </div>
              <p>
                How well integrated are your tools, CI/CD pipelines, and test
                environments?
              </p>
              <ul>
                <li>CI/CD pipeline integration depth</li>
                <li>Test environment management</li>
                <li>Tool ecosystem breadth</li>
                <li>Test data management practices</li>
              </ul>
            </div>
            <div className="dimension-card">
              <div className="dim-header">
                <div className="dim-icon dim-icon-4">
                  <SiteIcon name="bar-chart-3" />
                </div>
                <h3>Reporting & Observability</h3>
              </div>
              <p>
                How effectively do you measure, report, and act on quality
                metrics?
              </p>
              <ul>
                <li>Test result reporting maturity</li>
                <li>Coverage and quality metrics tracking</li>
                <li>Requirements traceability</li>
                <li>Root cause analysis speed</li>
              </ul>
            </div>
            <div className="dimension-card">
              <div className="dim-header">
                <div className="dim-icon dim-icon-5">
                  <SiteIcon name="users" />
                </div>
                <h3>Team Skills & Culture</h3>
              </div>
              <p>
                How does your team approach quality ownership, skills
                development, and collaboration?
              </p>
              <ul>
                <li>Quality ownership model</li>
                <li>Team automation skill level</li>
                <li>Knowledge sharing practices</li>
                <li>Shift-left adoption maturity</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <h2>How to Use This Model</h2>
          </div>
          <div className="process-steps">
            <div className="process-step">
              <h4>Assess</h4>
              <p>
                Take our free online assessment or work with us for an in-depth
                evaluation of your current maturity.
              </p>
            </div>
            <div className="process-step">
              <h4>Benchmark</h4>
              <p>
                Compare your scores across dimensions. Identify which areas are
                holding you back.
              </p>
            </div>
            <div className="process-step">
              <h4>Prioritise</h4>
              <p>
                Focus on the dimensions with the biggest gap between current and
                target level.
              </p>
            </div>
            <div className="process-step">
              <h4>Improve</h4>
              <p>
                Use our recommendations to build a phased improvement roadmap.
                Reassess quarterly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Find Out Where You Stand</h2>
            <p>
              Take our free 5-minute assessment and get your personalised
              maturity score with recommendations.
            </p>
            <Link to="/assessment" className="btn btn-white btn-lg">
              Start Free Assessment →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
