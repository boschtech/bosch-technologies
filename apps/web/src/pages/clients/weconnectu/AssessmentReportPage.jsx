import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { BarChart3, FileText } from "lucide-react";
import { generateAssessmentReportPDF } from "@/lib/pdf/clients/weconnectu-proposal.js";

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
            <strong>{"WeconnectU"}</strong>
            {" by Bosch Technologies"}
          </p>
          <p className={"text-muted"}>{"27 March 2026"}</p>
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
                  "Quality Engineering practices are largely manual and reactive."
                }
              </li>
              <li>
                {
                  "Limited integration between testing and delivery pipelines. Small amount of Unit Test within the CICD pipelines."
                }
              </li>
              <li>
                {
                  "Quality risks are identified late in the development lifecycle."
                }
              </li>
              <li>
                {
                  "Testing is heavily dependent on Quality Engineers with a lot of domain knowledge."
                }
              </li>
              <li>
                {
                  "No structured onboarding and upskilling programs for new employees."
                }
              </li>
            </ul>
            <h3>{"Business Impact"}</h3>
            <ul>
              <li>{"Slower release cycles impacting time-to-market."}</li>
              <li>
                {"Increased production risk due to late defect detection."}
              </li>
              <li>{"Higher cost of rework and defect resolution."}</li>
              <li>
                {
                  "Very high risk of Intellectual Property loss if any of the Quality Engineers leave the company."
                }
              </li>
            </ul>
            <h3>{"Recommendation"}</h3>
            <ul>
              <li>
                {"Implement a structured Quality Engineering Test Strategy."}
              </li>
              <li>
                {
                  "Focus on automation testing, shift-left testing, and CI/CD integration."
                }
              </li>
              <li>
                {
                  "Continuous upskilling of Development and Quality Engineers on domain knowledge."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Current State Overview"}</h2>
            <h3>{"Test Strategy"}</h3>
            <ul>
              <li>
                {"Heavily dependence on manual testing with domain experts."}
              </li>
              <li>
                {
                  "Regression testing efforts are a lot hence the team identified a resource capacity issue."
                }
              </li>
              <li>
                {
                  "Development Test Environment (DTA) creates inconsistency in testing specific features."
                }
              </li>
            </ul>
            <h3>{"Automation"}</h3>
            <ul>
              <li>
                {
                  "Developers started writing unit tests. The code coverage is very low."
                }
              </li>
              <li>{"There is no integration tests."}</li>
              <li>
                {
                  "There are some Selenium UI automation tests but this is not integrated into the CICD pipelines."
                }
              </li>
            </ul>
            <h3>{"CI/CD Integration"}</h3>
            <ul>
              <li>
                {
                  "Only a low percentage of Unit tests are integrated into delivery pipelines, nothing else."
                }
              </li>
            </ul>
            <h3>{"Environments"}</h3>
            <ul>
              <li>
                {
                  "Staging environment is closely aligned with the Production environment."
                }
              </li>
              <li>
                {
                  "The DEV environment can become inconsistent when features are deployed by multiple teams."
                }
              </li>
            </ul>
            <h3>{"Test Data"}</h3>
            <ul>
              <li>{"Manual and not centrally managed."}</li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Key Findings"}</h2>
            <ul>
              <li>
                {"Limited automation is creating a regression bottleneck."}
              </li>
              <li>
                {
                  "Testing occurs late in the lifecycle, increasing defect leakage risk."
                }
              </li>
              <li>{"Lack of standardised QE Test Strategy."}</li>
              <li>
                {"Manual regression cycles are slowing release velocity."}
              </li>
              <li>
                {
                  "Limited visibility into quality metrics and reporting. Only manual test cases on the test management tool."
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Business Impact"}</h2>
            <ul>
              <li>
                {"Regression cycles delay releases by multiple days per cycle."}
              </li>
              <li>
                {"Late defect detection significantly increases cost of fixes."}
              </li>
              <li>{"Lack of automation limits scalability of delivery."}</li>
              <li>{"Inconsistent environments increase production risk."}</li>
              <li>
                {
                  "Reduced confidence in release quality, because with manual testing it becomes impossible to do regression testing for every release."
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
                "View the detailed maturity assessment results including scores across all 5 dimensions, radar chart visualisation, and specific recommendations."
              }
            </p>
            <Link
              className={"btn btn-primary btn-lg"}
              style={{ marginTop: "16px" }}
              to={"/clients/weconnectu/maturity-assessment"}
            >
              <BarChart3 aria-hidden="true" size={20} />
              {" View Maturity Assessment Results →"}
            </Link>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"High-level QE Skills Assessment"}</h2>
            <p>
              {
                "The current Quality Engineering capability is heavily reliant on manual testing, despite the team possessing strong domain expertise. While one Quality Engineer has implemented UI automation using Selenium and Java, these tests are executed locally and are not integrated into the CI/CD pipeline, limiting their effectiveness as quality gates."
              }
            </p>
            <p>
              {
                "This over-reliance on manual processes, combined with concentrated domain knowledge, introduces significant business risk. The potential loss of key individuals would result in a substantial loss of intellectual property and continuity challenges. Furthermore, existing resource and time constraints make it difficult for the team to onboard and upskill new Quality Engineers effectively."
              }
            </p>
            <p>
              {
                "Introducing a robust automation strategy, specifically by integrating automated tests into the CI/CD pipeline as enforceable quality gates, will reduce this dependency on individuals, improve scalability, and significantly mitigate operational risk."
              }
            </p>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Target State Vision"}</h2>
            <ul>
              <li>
                {"Automated regression fully integrated into CI/CD pipelines."}
              </li>
              <li>
                {"Shift-left testing embedded within development workflows."}
              </li>
              <li>{"Stable, production-like environments."}</li>
              <li>{"Scalable and reusable automation frameworks."}</li>
              <li>{"Real-time quality metrics and visibility."}</li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Gap Analysis"}</h2>
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
                  <td>{"Limited"}</td>
                  <td>{"CI/CD Integrated"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Test Strategy"}</td>
                  <td>{"Informal"}</td>
                  <td>{"Standardised"}</td>
                  <td>
                    <span style={{ color: "#f39c12", fontWeight: "600" }}>
                      {"Medium"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Environments"}</td>
                  <td>{"Unstable"}</td>
                  <td>{"Reliable"}</td>
                  <td>
                    <span style={{ color: "#c0392b", fontWeight: "600" }}>
                      {"High"}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>{"Test Data"}</td>
                  <td>{"Manual"}</td>
                  <td>{"Managed"}</td>
                  <td>
                    <span style={{ color: "#f39c12", fontWeight: "600" }}>
                      {"Medium"}
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
            <h2>{"Ready to Transform Your QE Practice?"}</h2>
            <p>
              {
                "Based on our assessment findings, we have prepared a detailed Improvement Engagement proposal with multiple options tailored to WeconnectU's needs."
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
                className={"btn btn-accent btn-lg"}
                to={"/clients/weconnectu/improvement-engagement"}
              >
                {"View Improvement Engagement Options →"}
              </Link>
              <Link
                className={"btn btn-outline btn-lg"}
                to={"/clients/weconnectu/alternative-engagement"}
              >
                {"View Alternative Engagement Proposal →"}
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
    <ClientGate slug="weconnectu">
      <ClientDocument title={"Proposal for WeconnectU — Bosch Technologies"}>
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
