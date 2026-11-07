import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { BarChart3, FileText } from "lucide-react";
import { generateAssessmentReportPDF } from "@/lib/pdf/clients/comotion-proposal.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Confidential Assessment Report"}
          </span>
          <h1>
            {
              "Quality Engineering Assessment: Findings & Improvement Opportunities"
            }
          </h1>
          <p>
            {"Prepared for "}
            <strong>{"Comotion"}</strong>
            {" — covering "}
            <strong>{"Comotion AI"}</strong>
            {" and "}
            <strong>{"Seed Analytics"}</strong>
            {" — by Bosch Technologies"}
          </p>
          <p className={"text-muted"}>{"5 November 2026"}</p>
        </div>
      </section>

      <section className={"section"} style={{ paddingTop: "0" }}>
        <div className={"container proposal-content"}>
          <div className={"proposal-option-card"}>
            <h2>{"Executive Summary"}</h2>
            <h3>{"Current State"}</h3>
            <ul>
              <li>
                {
                  "Comotion AI builds its product and much of its test suite with heavy AI assistance (Python, TypeScript, Next.js, PostgreSQL), and already has unit, component, and Playwright end-to-end tests — but no dedicated Quality Engineer owns quality from requirements through release readiness."
                }
              </li>
              <li>
                {
                  "Seed Analytics has strict delivery processes, but very little quality embedded within them: test cases are written but kept outside any test management system, and there is no test automation in the delivery pipeline."
                }
              </li>
              <li>
                {
                  "Across both entities, quality is largely invisible to leadership — neither can currently measure or report on release readiness."
                }
              </li>
              <li>
                {
                  "Reporting & Observability is the weakest dimension for both entities (1.8/5.0 for Comotion AI, 1.3/5.0 for Seed Analytics), meaning decisions are made with little real-time quality data."
                }
              </li>
            </ul>
            <h3>{"Business Impact"}</h3>
            <ul>
              <li>
                {
                  "Without a dedicated QE function, Comotion AI cannot objectively confirm that AI-generated code and AI-generated tests meet an agreed quality bar before release."
                }
              </li>
              <li>
                {
                  "Seed Analytics carries full regression risk on every release, since no automated safety net exists in the pipeline."
                }
              </li>
              <li>
                {
                  "Test case knowledge at Seed Analytics lives in documents rather than a searchable system, creating risk of coverage gaps and duplicated effort."
                }
              </li>
              <li>
                {
                  "Neither entity can currently produce a release readiness scorecard, slowing confident, data-driven release decisions at the group level."
                }
              </li>
            </ul>
            <h3>{"Recommendation"}</h3>
            <ul>
              <li>
                {
                  "Stand up a shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, with a strategy tailored to each entity's starting point."
                }
              </li>
              <li>
                {
                  "For Comotion AI: embed quality from the requirements stage, govern and extend the existing AI-assisted testing practice, increase coverage, and mature CI/CD quality gates to produce a measurable release readiness signal."
                }
              </li>
              <li>
                {
                  "For Seed Analytics: introduce a test management system to formalise existing test cases, and build a CI/CD test automation foundation from the ground up."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Current State Overview — Comotion AI"}</h2>
            <h3>{"Test Strategy"}</h3>
            <ul>
              <li>
                {
                  "Development and test creation are heavily AI-assisted across the stack (Python, TypeScript, Next.js, PostgreSQL, GitHub), with unit, component, and Playwright end-to-end tests already in place."
                }
              </li>
              <li>
                {
                  "There is no Quality Engineer to own quality end-to-end, so requirements coverage, test design quality, and release readiness are not formally governed."
                }
              </li>
              <li>
                {
                  "Quality decisions currently rely on engineering judgement rather than a defined, measurable process."
                }
              </li>
            </ul>
            <h3>{"Automation"}</h3>
            <ul>
              <li>
                {
                  "Automation Coverage & Effectiveness scored 3.5 / 5.0 — the strongest dimension, reflecting good existing unit, component, and Playwright end-to-end coverage."
                }
              </li>
              <li>
                {
                  "Without governance, there is a risk that AI-generated tests accumulate without a clear view of what they actually cover or how reliable they are."
                }
              </li>
            </ul>
            <h3>{"Tooling & Infrastructure"}</h3>
            <ul>
              <li>
                {
                  "Scored 3.5 / 5.0. The modern stack provides a solid foundation, but production-like staging and synthetic test data practices are not yet in place."
                }
              </li>
            </ul>
            <h3>{"Reporting & Observability"}</h3>
            <ul>
              <li>
                {
                  "The weakest dimension at 1.8 / 5.0. There is no dashboard for pass rates, flakiness, or coverage trends, so release readiness cannot currently be measured objectively."
                }
              </li>
            </ul>
            <h3>{"Team & Process"}</h3>
            <ul>
              <li>
                {
                  "Test Process & Governance scored 2.0 / 5.0 and Team Skills & Culture 2.5 / 5.0. Practices exist informally but are not standardised, and there is no shared testing community of practice to govern the growing use of AI in test creation."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Current State Overview — Seed Analytics"}</h2>
            <h3>{"Test Strategy"}</h3>
            <ul>
              <li>
                {
                  "Delivery processes are strict and well defined, but quality is not embedded within them. Test cases are written manually but kept outside of any test management system."
                }
              </li>
              <li>
                {
                  "Test Process & Governance scored 2.0 / 5.0 — the same score as Comotion AI, but for a different reason: process discipline exists, while the testing substance within it does not."
                }
              </li>
            </ul>
            <h3>{"Automation"}</h3>
            <ul>
              <li>
                {
                  "Automation Coverage & Effectiveness is the weakest dimension at 1.0 / 5.0. There are currently no automated tests in the delivery pipeline."
                }
              </li>
            </ul>
            <h3>{"Tooling & Infrastructure"}</h3>
            <ul>
              <li>
                {
                  "Scored 1.5 / 5.0. No CI/CD quality gates exist, and there is no consistent, containerised test environment strategy."
                }
              </li>
            </ul>
            <h3>{"Reporting & Observability"}</h3>
            <ul>
              <li>
                {
                  "Scored 1.3 / 5.0. No automated reporting exists, so quality status is not visible to the wider team or leadership."
                }
              </li>
            </ul>
            <h3>{"Team & Process"}</h3>
            <ul>
              <li>
                {
                  "Team Skills & Culture scored 1.8 / 5.0. Manual testers would benefit from pairing with engineers and basic automation training to begin building in-house automation capability."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Key Findings"}</h2>
            <ul>
              <li>
                {
                  "Comotion AI has a solid automation foundation but no one accountable for quality from requirements through release."
                }
              </li>
              <li>
                {
                  "Seed Analytics has no automated regression safety net, leaving every release fully dependent on manual effort."
                }
              </li>
              <li>
                {
                  "Test case knowledge at Seed Analytics is undocumented in any shared system, creating duplication and coverage-gap risk."
                }
              </li>
              <li>
                {
                  "Neither entity can currently produce a release readiness scorecard or quality trend reporting."
                }
              </li>
              <li>
                {
                  "Governance over AI-generated tests at Comotion AI is informal, risking unmanaged growth of the test suite."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Business Impact"}</h2>
            <ul>
              <li>
                {
                  "Release decisions for both entities are made without objective quality data."
                }
              </li>
              <li>
                {
                  "Seed Analytics' lack of automation increases regression cost and risk with every release cycle."
                }
              </li>
              <li>
                {
                  "Comotion AI risks false confidence in AI-generated code if AI-generated tests are not independently governed."
                }
              </li>
              <li>
                {
                  "Group-wide reporting on quality and release readiness is not currently possible."
                }
              </li>
              <li>
                {
                  "Both entities face scaling risk: Comotion AI's test suite will keep growing with AI assistance, and Seed Analytics has no automation base to build on."
                }
              </li>
            </ul>
          </div>

          <div
            className={"proposal-option-card"}
            style={{ textAlign: "center" }}
          >
            <h2>{"QE Maturity Position"}</h2>
            <p>
              {
                "View the detailed maturity assessment results for each entity, including scores across all 5 dimensions, radar chart visualisation, and specific recommendations."
              }
            </p>
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                className={"btn btn-primary btn-lg"}
                to={"/clients/comotion/maturity-assessment-comotion-ai"}
              >
                <BarChart3 aria-hidden="true" size={20} />
                {" Comotion AI Results →"}
              </Link>
              <Link
                className={"btn btn-primary btn-lg"}
                to={"/clients/comotion/maturity-assessment-seed-analytics"}
              >
                <BarChart3 aria-hidden="true" size={20} />
                {" Seed Analytics Results →"}
              </Link>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"High-level QE Skills Assessment"}</h2>
            <p>
              {
                'Comotion AI\'s engineering team is clearly comfortable using AI to accelerate both feature development and test creation, and this has produced a genuinely useful base of unit, component, and end-to-end tests. However, without a dedicated Quality Engineer, no one is accountable for whether that AI-generated test suite actually reflects requirements, how reliable it is, or whether it provides enough confidence to call a release "ready". As the codebase and AI usage grow, this gap will widen rather than close on its own.'
              }
            </p>
            <p>
              {
                "Seed Analytics presents the opposite profile: a disciplined delivery process with almost no testing substance behind it. Test cases are written diligently but are not stored anywhere searchable or reportable, and there is no automation protecting the pipeline from regressions. This leaves the team fully reliant on manual effort for every release, with no scalable way to increase release frequency without proportionally increasing manual testing effort."
              }
            </p>
            <p>
              {
                "A shared Quality Engineering capability — tailored to each entity's starting point — would give Comotion AI the governance and measurement it currently lacks, and give Seed Analytics the foundational tooling and automation it has not yet built. Over time, this also allows the group to report on quality and release readiness consistently across both entities."
              }
            </p>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Target State Vision"}</h2>
            <ul>
              <li>
                {
                  "A shared Quality Engineering function with clear ownership of quality across both entities."
                }
              </li>
              <li>
                {
                  "Comotion AI: quality embedded from the requirements stage through release readiness, governed AI-assisted test creation, increased coverage, and CI/CD quality gates producing a measurable release readiness signal."
                }
              </li>
              <li>
                {
                  "Seed Analytics: all test cases held in a test management system, with a CI/CD automation foundation (built on the group's existing Playwright standard) acting as a regression safety net."
                }
              </li>
              <li>
                {
                  "Group-wide quality metrics and release readiness reporting, visible to engineering and leadership."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Gap Analysis — Comotion AI"}</h2>
            <table className={"proposal-table"}>
              <thead>
                <tr>
                  <th>{"Area"}</th>
                  <th>{"Current State"}</th>
                  <th>{"Target State"}</th>
                  <th>{"Gap"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Quality Ownership"}</td>
                  <td>{"No dedicated QE"}</td>
                  <td>{"Embedded QE from requirements to release"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Test Governance"}</td>
                  <td>{"Informal, ungoverned AI test growth"}</td>
                  <td>{"Governed AI-assisted testing practice"}</td>
                  <td>
                    <span style={{ color: "#f39c12", fontWeight: "600" }}>
                      {"Medium"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Coverage"}</td>
                  <td>{"Good foundation (unit/component/E2E)"}</td>
                  <td>{"Increased, requirement-linked coverage"}</td>
                  <td>
                    <span style={{ color: "#f39c12", fontWeight: "600" }}>
                      {"Medium"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Reporting"}</td>
                  <td>{"No dashboards or trend data"}</td>
                  <td>{"Real-time release readiness scorecard"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Gap Analysis — Seed Analytics"}</h2>
            <table className={"proposal-table"}>
              <thead>
                <tr>
                  <th>{"Area"}</th>
                  <th>{"Current State"}</th>
                  <th>{"Target State"}</th>
                  <th>{"Gap"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Automation"}</td>
                  <td>{"None in pipeline"}</td>
                  <td>{"CI/CD-integrated automation"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Test Management"}</td>
                  <td>{"Documents, no test management system"}</td>
                  <td>{"Centralised test management system"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Process"}</td>
                  <td>{"Strict delivery process, low quality substance"}</td>
                  <td>{"Quality embedded within existing process"}</td>
                  <td>
                    <span style={{ color: "#f39c12", fontWeight: "600" }}>
                      {"Medium"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Reporting"}</td>
                  <td>{"No automated reporting"}</td>
                  <td>{"Automated test reporting & visibility"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className={"proposal-option-card"}
            style={{
              borderColor: "var(--accent)",
              background: "rgba(184, 150, 28, 0.05)",
              textAlign: "center",
            }}
          >
            <h2>{"Ready to Build a Shared QE Capability?"}</h2>
            <p>
              {
                "Based on our assessment findings, we have prepared a Quality Engineering Improvement proposal tailored to the needs of both Comotion AI and Seed Analytics."
              }
            </p>
            <div style={{ marginTop: "16px" }}>
              <Link
                className={"btn btn-accent btn-lg"}
                to={"/clients/comotion/improvement-engagement"}
              >
                {"View Quality Engineering Improvement Proposal →"}
              </Link>
            </div>
          </div>

          <div
            className={"proposal-section text-center"}
            style={{
              paddingTop: "20px",
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              type={"button"}
              onClick={() => download(generateAssessmentReportPDF)}
              className={"btn btn-primary btn-lg"}
            >
              <FileText aria-hidden="true" size={20} />
              {" Download PDF Report"}
            </button>
            <Link className={"btn btn-accent btn-lg"} to={"/contact/"}>
              {"Get in Touch to Discuss →"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AssessmentReportPage() {
  return (
    <ClientGate slug="comotion">
      <ClientDocument title={"Proposal for Comotion — Bosch Technologies"}>
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
