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
} from "@/lib/pdf/clients/comotion-maturity-assessment-comotion-ai.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Maturity Assessment Results"}
          </span>
          <h1>{"QE Maturity Assessment — Comotion AI"}</h1>
          <p>
            {"Prepared for "}
            <strong>{"Comotion AI"}</strong>
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
                  <span className={"score-value"}>{"2.7"}</span>
                </div>
                <h2>{"Level 3: Defined"}</h2>
                <p>
                  {
                    "\n              Standardised processes and solid automation foundation.\n            "
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
                    <span className={"dim-score-badge score-high"}>
                      {"3.5 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "70%", background: "#b8961c" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Optimise execution speed with test selection intelligence. Explore visual regression and contract testing.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <Wrench aria-hidden="true" size={20} />
                      {" Tooling & Infrastructure"}
                    </h3>
                    <span className={"dim-score-badge score-high"}>
                      {"3.5 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "70%", background: "#b8961c" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Move to ephemeral environments per PR. Implement synthetic test data generation and production-like staging.\n              "
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
                      " Set up a dashboard showing pass rates, flakiness trends, and coverage. Track these metrics over time.\n              "
                    }
                  </div>
                </div>

                <div className={"dim-result"}>
                  <div className={"dim-result-header"}>
                    <h3>
                      <Users aria-hidden="true" size={20} />
                      {" Team Skills & Culture"}
                    </h3>
                    <span className={"dim-score-badge score-mid"}>
                      {"2.5 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "50%", background: "#d4a017" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Implement a testing community of practice. Begin TDD/BDD adoption with willing teams as pilots.\n              "
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

export default function MaturityAssessmentComotionAiPage() {
  return (
    <ClientGate slug="comotion">
      <ClientDocument
        title={"QE Maturity Assessment — Comotion AI — Bosch Technologies"}
        initialize={mountChart}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
