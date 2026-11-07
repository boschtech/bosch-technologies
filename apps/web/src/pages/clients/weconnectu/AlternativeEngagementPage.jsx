import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { generateAlternativeEngagementPDF } from "@/lib/pdf/clients/weconnectu-alternative-engagement.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Confidential Proposal"}
          </span>
          <h1>
            {
              "Alternative Engagement: Test Strategy Implementation & QA Recruitment"
            }
          </h1>
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
        <div className={"container proposal-content"}>
          <div className={"proposal-option-card"}>
            <h2>{"Overview"}</h2>
            <h3>{"Objective"}</h3>
            <p>
              {
                "Strengthen WeconnectU's Quality Assurance capability through hands-on implementation and the permanent placement of a dedicated Quality Assurance Engineer."
              }
            </p>
            <p>
              {
                "This proposal presents two independent options. They can be taken separately, or Option 1 can be taken as the complete end-to-end solution, as it already includes recruitment of the permanent resource."
              }
            </p>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Option 1: Test Strategy Implementation & Recruitment"}</h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Garth (Bosch Technologies) will work directly with WeconnectU to design and implement the test strategy, stand up all automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer to take ownership at the end of the engagement."
              }
            </p>
            <ul>
              <li>{"Design and implement a comprehensive test strategy"}</li>
              <li>{"Set up all automation test frameworks"}</li>
              <li>{"Lead quality assurance initiatives"}</li>
              <li>
                {
                  "Recruit, train and upskill the newly recruited team member to take over at engagement end"
                }
              </li>
            </ul>
            <h3>{"Deliverables"}</h3>
            <ul>
              <li>
                {
                  "Comprehensive test strategy document aligned with WeconnectU's needs"
                }
              </li>
              <li>
                {
                  "Automated test frameworks implementation (tools, infrastructure, processes)"
                }
              </li>
              <li>
                {
                  "Training and mentoring of the permanent Quality Assurance Engineering resource"
                }
              </li>
              <li>{"Documentation and best practices guides"}</li>
              <li>{"Transition plan and knowledge transfer completion"}</li>
            </ul>
            <h3>{"Key Terms"}</h3>
            <ul>
              <li>
                <strong>{"Flexibility:"}</strong>
                {
                  " Garth has the flexibility to work from anywhere and is not limited to working exclusively for WeconnectU."
                }
              </li>
              <li>
                <strong>{"Recruitment & Transition:"}</strong>
                {
                  " Before the end of the 6-month engagement, Bosch Technologies will recruit a permanent Quality Assurance Engineer for WeconnectU."
                }
              </li>
              <li>
                <strong>{"Knowledge Transfer:"}</strong>
                {
                  " Full upskilling and handover of the test strategy and automation frameworks to the recruited permanent team member."
                }
              </li>
            </ul>
            <h3>{"Duration"}</h3>
            <p>{"6 months"}</p>
            <h3>{"Investment"}</h3>
            <table className={"proposal-table"}>
              <tbody>
                <tr>
                  <td>{"Monthly Fee"}</td>
                  <td>{"R100,000 per month"}</td>
                </tr>
                <tr>
                  <td>{"Engagement Length"}</td>
                  <td>{"6 months"}</td>
                </tr>
              </tbody>
            </table>
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #b8961c",
                borderRadius: "8px",
                padding: "20px 32px",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              <span
                style={{
                  color: "#b8961c",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {"Total Investment: R600,000"}
              </span>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Option 2: Quality Assurance Engineer Recruitment Only"}</h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Bosch Technologies will run a dedicated recruitment process to identify, assess and place a Quality Assurance Engineer who will be permanently employed by WeconnectU."
              }
            </p>
            <h3>{"Position Details"}</h3>
            <ul>
              <li>
                <strong>{"Role:"}</strong>
                {" Quality Assurance Engineer"}
              </li>
              <li>
                <strong>{"Employment Type:"}</strong>
                {" Permanent, full-time at WeconnectU"}
              </li>
              <li>
                <strong>{"Remuneration:"}</strong>
                {" Maximum of R80,000 per month"}
              </li>
              <li>
                <strong>{"Benefits:"}</strong>
                {" Full WeconnectU employee benefits package"}
              </li>
            </ul>
            <h3>{"Assessment & Tooling"}</h3>
            <ul>
              <li>
                <strong>{"Technical Assessment Tool:"}</strong>
                {" Bosch Technologies' own HackerRank platform"}
              </li>
              <li>
                <strong>{"Assessment Coverage:"}</strong>
                {
                  " Based on WeconnectU's Job Description, Technical QA competencies and AI usage proficiency"
                }
              </li>
              <li>
                <strong>{"ATS Integration:"}</strong>
                {
                  " HackerRank is integrated with WeconnectU's ATS (Workable) so candidate results are tracked in one place"
                }
              </li>
            </ul>
            <h3>{"Timeline"}</h3>
            <p>{"Approximately 45 days"}</p>
            <h3>{"Investment"}</h3>
            <p className={"text-muted"}>
              {
                "Placement fee is payable only once the successful candidate signs the offer letter."
              }
            </p>
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #b8961c",
                borderRadius: "8px",
                padding: "20px 32px",
                textAlign: "center",
                marginTop: "16px",
              }}
            >
              <span
                style={{
                  color: "#b8961c",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {"Total Investment: R144,000"}
              </span>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Investment Summary"}</h2>
            <div style={{ overflowX: "auto" }}>
              <table className={"proposal-table"} style={{ minWidth: "520px" }}>
                <thead>
                  <tr>
                    <th>{"Option"}</th>
                    <th>{"Cost"}</th>
                    <th>{"Duration"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {
                        "Option 1 — Test Strategy Implementation & Recruitment (Garth)"
                      }
                    </td>
                    <td>
                      {"R100,000/month × 6 months = "}
                      <strong>{"R600,000"}</strong>
                    </td>
                    <td>{"6 months"}</td>
                  </tr>
                  <tr>
                    <td>
                      {"Option 2 — Quality Assurance Engineer Recruitment Only"}
                    </td>
                    <td>
                      <strong>{"R144,000"}</strong>
                      {" on offer acceptance"}
                    </td>
                    <td>{"~45 days"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={"proposal-option-card"}
            style={{
              borderColor: "var(--accent)",
              background: "rgba(184, 150, 28, 0.05)",
            }}
          >
            <h2>{"Why This Works"}</h2>
            <ul>
              <li>
                <strong>{"Immediate quality improvement"}</strong>
                {
                  " — expert-led test strategy and automation setup from day one"
                }
              </li>
              <li>
                <strong>{"Sustainable capability"}</strong>
                {
                  " — internal QA expertise built through direct mentoring and knowledge transfer"
                }
              </li>
              <li>
                <strong>{"Permanent resource"}</strong>
                {
                  " — a vetted Quality Assurance Engineer trained by the person who built the frameworks"
                }
              </li>
              <li>
                <strong>{"Assessment rigour"}</strong>
                {
                  " — HackerRank technical screening including AI usage, integrated with Workable"
                }
              </li>
              <li>
                <strong>{"Flexibility"}</strong>
                {
                  " — engagement structure optimises cost while internal capacity is built"
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Engagement Model"}</h2>
            <ul>
              <li>
                {
                  "Remote-first delivery, with the flexibility to work from anywhere"
                }
              </li>
              <li>{"Non-exclusive engagement for the duration of Option 1"}</li>
              <li>{"Monthly reporting and governance"}</li>
              <li>{"Close collaboration with engineering leadership"}</li>
            </ul>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Next Steps"}</h2>
            <div
              className={"process-steps"}
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              }}
            >
              <div className={"process-step"}>
                <h4>{"Review"}</h4>
                <p>{"Review and discuss the proposal details"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Agreement"}</h4>
                <p>{"Confirm option, timeline and start date"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Contracting"}</h4>
                <p>{"Finalise terms and conditions"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Kick-off"}</h4>
                <p>{"Start engagement"}</p>
              </div>
            </div>
          </div>

          <div
            className={"proposal-option-card"}
            style={{
              borderColor: "var(--accent)",
              background: "rgba(184, 150, 28, 0.05)",
              textAlign: "center",
            }}
          >
            <h2>{"Ready to Proceed?"}</h2>
            <p>
              {
                "Option 1 has been accepted. The Master Services Agreement for this engagement is ready for review and signature."
              }
            </p>
            <Link
              className={"btn btn-accent btn-lg"}
              style={{ marginTop: "16px" }}
              to={"/clients/weconnectu/service-agreement"}
            >
              {"View Service Agreement →"}
            </Link>
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
              onClick={() => download(generateAlternativeEngagementPDF)}
              className={"btn btn-primary btn-lg"}
            >
              <FileText aria-hidden="true" size={20} />
              {" Download PDF Report"}
            </button>
            <Link
              className={"btn btn-outline btn-lg"}
              to={"/clients/weconnectu/improvement-engagement"}
            >
              {"View Improvement Engagement Options"}
            </Link>
            <Link className={"btn btn-accent btn-lg"} to={"/contact/"}>
              {"Get in Touch to Discuss →"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default function AlternativeEngagementPage() {
  return (
    <ClientGate slug="weconnectu">
      <ClientDocument
        title={"Alternative Engagement — WeconnectU — Bosch Technologies"}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
