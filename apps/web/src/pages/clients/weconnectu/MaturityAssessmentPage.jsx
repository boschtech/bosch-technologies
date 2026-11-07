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
} from "@/lib/pdf/clients/weconnectu-maturity-assessment.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Maturity Assessment Results"}
          </span>
          <h1>{"QE Maturity Assessment"}</h1>
          <p>
            {"Prepared for "}
            <strong>{"WeconnectU"}</strong>
            {" by Bosch Technologies"}
          </p>
          <Link
            className={"btn btn-outline"}
            style={{ marginTop: "16px" }}
            to={"/clients/weconnectu/"}
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
                  <span className={"score-value"}>{"2.0"}</span>
                </div>
                <h2>{"Level 2: Managed"}</h2>
                <p>
                  {
                    "\n              Some processes exist but are inconsistently applied. \n              Basic automation covers critical paths but is fragile.\n            "
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
                      " Establish formal test case management in a dedicated tool. Create a basic test strategy document. Implement a defect tracking workflow with severity classification.\n              "
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
                      " Prioritise automating critical regression paths. Build a simple, maintainable framework using industry-standard tools. Focus on API tests before UI automation.\n              "
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
                      {"2.2 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "44%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Integrate automated tests into CI/CD pipelines. Implement environment provisioning scripts. Establish basic test data management practices.\n              "
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
                      " Implement automated test reporting with trend visualisation. Track code coverage metrics. Create dashboards for test execution status and defect trends.\n              "
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
                      {"2.2 / 5.0"}
                    </span>
                  </div>
                  <div className={"score-bar"}>
                    <div
                      className={"score-fill"}
                      style={{ width: "44%", background: "#c0392b" }}
                    ></div>
                  </div>
                  <div className={"recommendation"}>
                    <strong>{"Recommendation:"}</strong>
                    {
                      " Implement structured knowledge sharing sessions. Train developers on testing fundamentals. Begin shift-left initiatives by involving QE earlier in the development process.\n              "
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
                  to={"/clients/weconnectu/improvement-engagement"}
                >
                  {"View Improvement Options →"}
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
                      {"Review the Improvement Engagement options"}
                    </strong>
                    {" to see which approach best fits your needs"}
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
                    to={"/clients/weconnectu/improvement-engagement"}
                  >
                    {"View Improvement Options"}
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

export default function MaturityAssessmentPage() {
  return (
    <ClientGate slug="weconnectu">
      <ClientDocument
        title={"QE Maturity Assessment — WeconnectU — Bosch Technologies"}
        initialize={mountChart}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
