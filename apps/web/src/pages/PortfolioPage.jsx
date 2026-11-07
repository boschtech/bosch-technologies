import { Link } from "react-router-dom";
import SiteIcon from "@/components/SiteIcon";
import PageMeta from "@/components/PageMeta";
import "@/styles/portfolio.css";
import MermaidDiagram from "@/components/MermaidDiagram";

export default function PortfolioPage() {
  return (
    <>
      <PageMeta title="Portfolio \u2014 Bosch Technologies" />
      <section className="service-hero">
        <div className="container">
          <span className="badge badge-accent">Portfolio</span>
          <h1>Demo Application</h1>
          <p>
            A demo application demonstrating a micro-frontend architecture
            powered by microservices engineered with quality at its core. A
            modern React 19 micro-frontend powered by two Spring Boot services,
            integrated through consumer-driven contracts, backed by layered
            testing (unit, component, and end-to-end), and continuously deployed
            through a CI/CD quality gated pipeline.
          </p>
          <div className="btn-group mt-3" style={{ justifyContent: "center" }}>
            <a href="#demo" className="btn btn-accent btn-lg">
              Watch the Demo →
            </a>
            <a href="#architecture" className="btn btn-white">
              See the Architecture
            </a>
            <a href="#projects" className="btn btn-outline">
              Browse the Code
            </a>
          </div>
          <div className="portfolio-kpis">
            <div className="portfolio-kpi">
              <div className="n">3</div>
              <div className="l">Independently deployed services</div>
            </div>
            <div className="portfolio-kpi">
              <div className="n">5</div>
              <div className="l">CI quality-gate stages</div>
            </div>
            <div className="portfolio-kpi">
              <div className="n">4</div>
              <div className="l">Pact contracts verified</div>
            </div>
            <div className="portfolio-kpi">
              <div className="n">7</div>
              <div className="l">Gates per service</div>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">System Design</span>
            <h2 className="mt-2">Architecture At A Glance</h2>
            <p className="text-muted">
              Three independently deployable units, one coherent platform.
            </p>
          </div>

          <MermaidDiagram />
          <div className="arch-diagram">
            <div className="arch-tier">
              <div className="arch-node arch-node--user">
                <div className="arch-node-icon">
                  <SiteIcon name="user" />
                </div>
                <strong>End User</strong>
                <span>Browses products &amp; places orders</span>
              </div>
            </div>
            <div className="arch-arrow">
              <span>HTTPS</span>
            </div>

            <div className="arch-tier">
              <div className="arch-node arch-node--primary">
                <div className="arch-node-icon">
                  <SiteIcon name="monitor" />
                </div>
                <strong>Micro Frontend</strong>
                <span>React 19 SPA</span>
              </div>
            </div>
            <div className="arch-arrow">
              <span>JSON / HTTPS</span>
            </div>

            <div className="arch-tier">
              <div className="arch-node">
                <div className="arch-node-icon">
                  <SiteIcon name="coffee" />
                </div>
                <strong>Product Service</strong>
                <span>Spring Boot REST API</span>
              </div>
              <div className="arch-rel">
                <span>validates IDs</span>
              </div>
              <div className="arch-node">
                <div className="arch-node-icon">
                  <SiteIcon name="package" />
                </div>
                <strong>Order Service</strong>
                <span>Spring Boot REST API</span>
              </div>
            </div>
            <div className="arch-arrow">
              <span>Deployed to</span>
            </div>

            <div className="arch-tier">
              <div className="arch-node arch-node--infra">
                <div className="arch-node-icon">
                  <SiteIcon name="cloud" />
                </div>
                <strong>Render.com</strong>
                <span>Static + Docker hosting</span>
              </div>
              <div className="arch-rel"></div>
              <div className="arch-node arch-node--infra">
                <div className="arch-node-icon">
                  <SiteIcon name="git-branch" />
                </div>
                <strong>GitHub Actions</strong>
                <span>CI / CD pipeline</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">The Build</span>
            <h2 className="mt-2">The Three (Plus One) Repos</h2>
            <p className="text-muted">
              Each service stands alone, is CI-gated on its own repo, and
              deploys independently.
            </p>
          </div>
          <div className="projects-grid">
            <div className="service-card project-card">
              <div className="icon">
                <SiteIcon name="monitor" />
              </div>
              <h3>Micro Frontend</h3>
              <p>
                React 19 SPA with feature modules for dashboard, products and
                orders — each designed to be extractable as its own MFE.
              </p>
              <div className="tags">
                <span className="tag">React 19</span>
                <span className="tag">Vite 6</span>
                <span className="tag">TanStack Query</span>
                <span className="tag">Tailwind 4</span>
                <span className="tag">TypeScript</span>
              </div>
              <div className="card-links">
                <a
                  href="https://github.com/boschtech/micro-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://micro-frontend-vm5b.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site
                </a>
              </div>
            </div>

            <div className="service-card project-card">
              <div className="icon">
                <SiteIcon name="coffee" />
              </div>
              <h3>Product Service</h3>
              <p>
                Spring Boot REST API for the product catalog. CORS-configured
                for MFE consumption and exposing Actuator health endpoints.
              </p>
              <div className="tags">
                <span className="tag">Java 17</span>
                <span className="tag">Spring Boot 3.2</span>
                <span className="tag">JaCoCo</span>
                <span className="tag">Pact</span>
              </div>
              <div className="card-links">
                <a
                  href="https://github.com/boschtech/product-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://product-service-ua20.onrender.com/actuator/health"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Health check
                </a>
              </div>
            </div>

            <div className="service-card project-card">
              <div className="icon">
                <SiteIcon name="package" />
              </div>
              <h3>Order Service</h3>
              <p>
                Spring Boot REST API for order management. Validates products
                via the Product Service and mirrors its quality gates.
              </p>
              <div className="tags">
                <span className="tag">Java 17</span>
                <span className="tag">Spring Boot 3.2</span>
                <span className="tag">JaCoCo</span>
                <span className="tag">Pact</span>
              </div>
              <div className="card-links">
                <a
                  href="https://github.com/boschtech/order-service"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://order-service-7342.onrender.com/actuator/health"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Health check
                </a>
              </div>
            </div>

            <div className="service-card project-card">
              <div className="icon">
                <SiteIcon name="drama" />
              </div>
              <h3>UI Automation</h3>
              <p>
                End-to-end Playwright suite exercising the full stack. Tagged
                specs keep each service&apos;s CI fast while covering its own
                flows.
              </p>
              <div className="tags">
                <span className="tag">Playwright 1.52</span>
                <span className="tag">TypeScript</span>
                <span className="tag">GitHub Pages</span>
              </div>
              <div className="card-links">
                <a
                  href="https://github.com/boschtech/ui-playwright-automation"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                <a
                  href="https://boschtech.github.io/ui-playwright-automation/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Latest report
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="quality" className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">Quality Gates</span>
            <h2 className="mt-2">Every Change, Every Merge</h2>
            <p className="text-muted">
              Five CI stages, seven gates per service. A red check blocks the
              PR.
            </p>
          </div>
          <div className="service-offerings">
            <div className="offering-card">
              <h3>
                <SiteIcon name="search" /> Static Analysis
              </h3>
              <p>Lint and type correctness enforced on every commit.</p>
              <ul>
                <li>ESLint 9 (MFE)</li>
                <li>
                  TypeScript strict (<code>tsc --noEmit</code>)
                </li>
                <li>Spring Jakarta Validation</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="flask-conical" /> Unit &amp; Coverage
              </h3>
              <p>
                Fast unit feedback with coverage artifacts retained per run.
              </p>
              <ul>
                <li>
                  Vitest + <code>@vitest/coverage-v8</code>
                </li>
                <li>JUnit 5 + JaCoCo</li>
                <li>Coverage artifacts uploaded on every run</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="puzzle" /> Component Tests
              </h3>
              <p>In-isolation component validation across the stack.</p>
              <ul>
                <li>React Testing Library (MFE)</li>
                <li>Spring Boot HTTP tests (services)</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="file-text" /> Consumer-Driven Contracts
              </h3>
              <p>Guaranteed inter-service compatibility via Pact.</p>
              <ul>
                <li>Pact 4.6 — 4 contracts, both directions</li>
                <li>Consumer generation + provider verification</li>
                <li>Cross-repo checkout in CI</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="drama" /> End-to-End
              </h3>
              <p>User-level flows verified against the real stack.</p>
              <ul>
                <li>Playwright against the full stack</li>
                <li>
                  Tagged: <code>@product-service</code>,{" "}
                  <code>@order-service</code>
                </li>
                <li>HTML report auto-published to GitHub Pages</li>
              </ul>
            </div>
            <div className="offering-card">
              <h3>
                <SiteIcon name="rocket" /> Deploy &amp; Health
              </h3>
              <p>Green main ships — with health verification post-deploy.</p>
              <ul>
                <li>Render.com auto-deploy on green main</li>
                <li>
                  Spring Actuator <code>/actuator/health</code> gate
                </li>
                <li>Build artifacts retained for audit</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pipeline" className="section section-gray">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-accent">The Pipeline</span>
            <h2 className="mt-2">The Pipeline That Proves It</h2>
            <p className="text-muted">
              Each merge runs through the full chain. Any red stage blocks the
              PR.
            </p>
          </div>

          <div className="pipeline">
            <div className="pipeline-step">
              <div className="pipeline-num">1</div>
              <div className="pipeline-icon">
                <SiteIcon name="search" />
              </div>
              <div className="pipeline-name">Lint + Typecheck</div>
            </div>
            <div className="pipeline-sep"></div>

            <div className="pipeline-step">
              <div className="pipeline-num">2</div>
              <div className="pipeline-icon">
                <SiteIcon name="flask-conical" />
              </div>
              <div className="pipeline-name">
                Unit Tests<small>+ Coverage</small>
              </div>
            </div>
            <div className="pipeline-sep"></div>

            <div className="pipeline-fork">
              <div className="pipeline-step">
                <div className="pipeline-num">3</div>
                <div className="pipeline-icon">
                  <SiteIcon name="puzzle" />
                </div>
                <div className="pipeline-name">Component Tests</div>
              </div>
              <div className="pipeline-step">
                <div className="pipeline-num">4</div>
                <div className="pipeline-icon">
                  <SiteIcon name="file-text" />
                </div>
                <div className="pipeline-name">
                  Contract Tests<small>Pact</small>
                </div>
              </div>
            </div>
            <div className="pipeline-sep"></div>

            <div className="pipeline-step">
              <div className="pipeline-num">5</div>
              <div className="pipeline-icon">
                <SiteIcon name="layers" />
              </div>
              <div className="pipeline-name">Build</div>
            </div>
            <div className="pipeline-sep"></div>

            <div className="pipeline-step">
              <div className="pipeline-num">6</div>
              <div className="pipeline-icon">
                <SiteIcon name="drama" />
              </div>
              <div className="pipeline-name">Playwright E2E</div>
            </div>
            <div className="pipeline-sep"></div>

            <div className="pipeline-step pipeline-step--final">
              <div className="pipeline-num">7</div>
              <div className="pipeline-icon">
                <SiteIcon name="rocket" />
              </div>
              <div className="pipeline-name">
                Deploy<small>Render.com</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="section">
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge badge-primary">Demo</span>
            <h2 className="mt-2">Recorded Walkthrough</h2>
            <p className="text-muted">
              A five-minute demo covering the architecture, a live feature flow,
              and a PR going through every quality gate.
            </p>
          </div>
          <div className="demo">
            <div className="demo-placeholder">
              <div className="demo-icon">
                <SiteIcon name="clapperboard" />
              </div>
              <h4>Add your recording here</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-banner">
            <h2>Interested In A Similar Build?</h2>
            <p>
              Want a deeper dive into how the gates were put together, or a
              tailored engagement for your team? Let&apos;s talk.
            </p>
            <div className="btn-group" style={{ justifyContent: "center" }}>
              <Link to="/contact" className="btn btn-white btn-lg">
                Book a Consultation
              </Link>
              <Link
                to="/assessment"
                className="btn btn-outline"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                Take Free Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
