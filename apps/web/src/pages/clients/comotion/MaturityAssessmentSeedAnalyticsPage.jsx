import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import {
  BarChart3,
  ClipboardList,
  FileText,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import {
  generateMaturityPDF,
  mountChart,
} from "@/lib/pdf/clients/comotion-maturity-assessment-seed-analytics.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Maturity Assessment Results"}
          </span>
          <h1>{"QE Maturity Assessment — Seed Analytics"}</h1>
          <p>
            {"Prepared for "}
            <strong>{"Seed Analytics"}</strong>
            {" by Bosch Technologies"}
          </p>
          <Link
            className={"btn btn-outline"}
            style={{ marginTop: "16px" }}
            to={"/clients/comotion/"}
          >
            {"← Back to Assessment Report"}
          </Link>
        </div>
      </section>

      <section className={"section"} style={{ paddingTop: "0" }}>
        <div className={"container"}>
          <div className={"assessment-wrapper"}>
            <div className={"results-section active"}>
              <div className={"overall-score"}>
                <div className={"score-circle"}>
                  <span className={"score-value"}>{"1.5"}</span>
                </div>
                <h2>{"Level 2: Managed"}</h2>
                <p>
                  {
                    "\n              Some structure in place but inconsistently applied.\n            "
                  }
                </p>
              </div>

              <div className={"chart-container"}>
                <canvas id={"radar-chart"}></canvas>
              </div>

              <h3 className={"mb-3"}>
                {"Dimension Breakdown & Recommendations"}
              </h3>
              <div className={"dimension-results"}>
                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <ClipboardList aria-hidden="true" size={20} />
                      {" Test Process & Governance"}
                    </h3>
                    <span className={"dim-score-badge score-low"}>
                      {"2.0 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "40%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Standardise your test case format and introduce a lightweight test management tool. Begin tracking defect metrics.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <Settings aria-hidden="true" size={20} />
                      {" Automation Coverage & Effectiveness"}
                    </h3>
                    <span className={"dim-score-badge score-low"}>
                      {"1.0 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "20%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Begin with automating your most critical smoke tests. Choose a modern framework (Playwright or Cypress) and start small.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <Wrench aria-hidden="true" size={20} />
                      {" Tooling & Infrastructure"}
                    </h3>
                    <span className={"dim-score-badge score-low"}>
                      {"1.5 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "30%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Make test results a blocking gate in your pipeline. Introduce Docker for consistent test environments.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <BarChart3 aria-hidden="true" size={20} />
                      {" Reporting & Observability"}
                    </h3>
                    <span className={"dim-score-badge score-low"}>
                      {"1.3 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "26%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Start with automated test reports (e.g., Allure or ExtentReports). Make results visible to the whole team.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <Users aria-hidden="true" size={20} />
                      {" Team Skills & Culture"}
                    </h3>
                    <span className={"dim-score-badge score-low"}>
                      {"1.8 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "36%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Introduce pair testing sessions. Provide basic automation training for manual testers.\n              "
                    }
                  </div>
                </div>
              </div>

              <div className={"results-actions"}>
                <button
                  className={"btn btn-primary btn-lg"}
                  onClick={() => download(generateMaturityPDF)}
                >
                  <FileText aria-hidden="true" size={20} />
                  {" Download PDF Report"}
                </button>
                <Link
                  className={"btn btn-accent btn-lg"}
                  to={"/clients/comotion/improvement-engagement"}
                >
                  {"View Improvement Proposal →"}
                </Link>
              </div>

              <div
                style={{
                  marginTop: "48px",
                  padding: "32px",
                  background: "var(--gray-100)",
                  borderRadius: "16px",
                }}
              >
                <h3>{"What's Next?"}</h3>
                <p>
                  {
                    "Your assessment provides a snapshot of where you stand today. To build a roadmap for improvement:"
                  }
                </p>
                <ul style={{ listStyle: "none", marginTop: "16px" }}>
                  <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
                    {"→ "}
                    <strong>
                      {"Review the Quality Engineering Improvement proposal"}
                    </strong>
                    {" to see the recommended approach"}
                  </li>
                  <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
                    {"→ "}
                    <strong>{"Explore our maturity model"}</strong>
                    {" to understand what each level looks like in detail"}
                  </li>
                  <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
                    {"→ "}
                    <strong>{"Book a consultation"}</strong>
                    {" to discuss priority actions and next steps"}
                  </li>
                </ul>
                <div className={"btn-group mt-3"}>
                  <Link
                    className={"btn btn-primary"}
                    to={"/clients/comotion/improvement-engagement"}
                  >
                    {"View Improvement Proposal"}
                  </Link>
                  <Link className={"btn btn-outline"} to={"/maturity-model/"}>
                    {"View Maturity Model"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function MaturityAssessmentSeedAnalyticsPage() {
  return (
    <ClientGate slug="comotion">
      <ClientDocument
        title={"QE Maturity Assessment — Seed Analytics — Bosch Technologies"}
        initialize={mountChart}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
