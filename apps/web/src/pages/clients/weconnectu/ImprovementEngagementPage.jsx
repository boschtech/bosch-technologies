import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { generateImprovementEngagementPDF } from "@/lib/pdf/clients/weconnectu-improvement-engagement.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Confidential Proposal"}
          </span>
          <h1>{"Improvement Engagement"}</h1>
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
            <h2>{"Improvement Engagement"}</h2>
            <h3>{"Objective"}</h3>
            <p>
              {
                "Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects."
              }
            </p>
            <p>
              {
                "The proposal outlines four engagement options depending on the level of support required."
              }
            </p>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Option 1: Test Strategy Creation Only"}</h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Development of a comprehensive Quality Engineering and Test Strategy aligned to WeconnectU's architecture, development practices, and delivery pipeline."
              }
            </p>
            <h3>{"Activities"}</h3>
            <ul>
              <li>
                {"Stakeholder interviews (Engineering, Product, Leadership)"}
              </li>
              <li>{"Review of current SDLC and release processes"}</li>
              <li>{"Architecture review"}</li>
              <li>{"Risk assessment"}</li>
              <li>{"Quality maturity assessment"}</li>
              <li>{"Define testing pyramid and automation strategy"}</li>
              <li>{"Define environments and test data strategy"}</li>
              <li>{"CI/CD quality gate recommendations"}</li>
              <li>{"Test reporting and metrics framework"}</li>
            </ul>
            <h3>{"Deliverables"}</h3>
            <ul>
              <li>{"Quality Engineering Test Strategy Document"}</li>
              <li>{"Automation framework recommendations"}</li>
              <li>{"Tooling recommendations"}</li>
              <li>{"Test environment strategy"}</li>
              <li>{"Release quality gate framework"}</li>
              <li>{"6 to 12 month quality roadmap"}</li>
            </ul>
            <h3>{"Duration"}</h3>
            <p>{"3 to 4 weeks"}</p>
            <h3>{"Investment"}</h3>
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #b8961c",
                borderRadius: "8px",
                padding: "20px 32px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#b8961c",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {"Total Investment: R240,000"}
              </span>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>
              {
                "Option 2: Test Strategy + Quality Engineering Implementation Team"
              }
            </h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Creation of the test strategy and deployment of a Quality Engineering team to implement it."
              }
            </p>
            <h3>{"Activities"}</h3>
            <p>{"Everything in Option 1 plus:"}</p>
            <ul>
              <li>{"Automation framework implementation"}</li>
              <li>{"CI/CD integration"}</li>
              <li>{"API testing framework"}</li>
              <li>{"UI automation framework"}</li>
              <li>{"Test reporting dashboards"}</li>
              <li>{"Integration test strategy"}</li>
              <li>{"Quality engineering process implementation"}</li>
              <li>{"Mentoring development teams"}</li>
            </ul>
            <h3>{"Suggested Team"}</h3>
            <ul>
              <li>{"1 Quality Engineering Lead"}</li>
              <li>{"1 Quality Automation Engineer"}</li>
              <li>{"1 Quality Engineer"}</li>
            </ul>
            <h3>{"Duration"}</h3>
            <p>{"Initial implementation: 4 to 6 months"}</p>
            <h3>{"Monthly Investment"}</h3>
            <table className={"proposal-table"}>
              <thead>
                <tr>
                  <th>{"Role"}</th>
                  <th>{"Monthly Cost"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Quality Engineering Lead"}</td>
                  <td>{"R120,000"}</td>
                </tr>
                <tr>
                  <td>{"Quality Automation Engineer"}</td>
                  <td>{"R95,000"}</td>
                </tr>
                <tr>
                  <td>{"Quality Engineer"}</td>
                  <td>{"R75,000"}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>
                    <strong>{"Total Monthly Cost"}</strong>
                  </td>
                  <td>
                    <strong>{"R290,000 per month"}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <h3>{"Estimated 6-Month Investment"}</h3>
            <div
              style={{
                background: "#1a1a1a",
                border: "2px solid #b8961c",
                borderRadius: "8px",
                padding: "20px 32px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  color: "#b8961c",
                  fontSize: "1.5rem",
                  fontWeight: "700",
                }}
              >
                {"Total Investment: R1,740,000"}
              </span>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Option 3: Test Strategy + Upskill Existing Team"}</h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Create the test strategy and train existing developers or testers to adopt Quality Engineering practices."
              }
            </p>
            <h3>{"Activities"}</h3>
            <p>{"Everything in Option 1 plus:"}</p>
            <ul>
              <li>{"Quality engineering workshops"}</li>
              <li>{"Automation training"}</li>
              <li>{"CI/CD testing integration"}</li>
              <li>{"Coaching during implementation"}</li>
              <li>{"Code review for automation"}</li>
              <li>{"Testing best practices training"}</li>
            </ul>
            <h3>{"Deliverables"}</h3>
            <ul>
              <li>{"Test Strategy"}</li>
              <li>{"Training sessions"}</li>
              <li>{"Automation framework templates"}</li>
              <li>{"3 months of coaching support"}</li>
            </ul>
            <h3>{"Duration"}</h3>
            <p>{"8 to 10 weeks"}</p>
            <h3>{"Investment"}</h3>
            <table className={"proposal-table"}>
              <tbody>
                <tr>
                  <td>{"Strategy Creation"}</td>
                  <td>{"R240,000"}</td>
                </tr>
                <tr>
                  <td>{"Training & Coaching"}</td>
                  <td>{"R180,000"}</td>
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
                {"Total Investment: R420,000"}
              </span>
            </div>
          </div>

          <div className={"proposal-option-card"}>
            <h2>
              {
                "Option 4: Test Strategy + Recruitment of a Quality Engineering Team"
              }
            </h2>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Creation of the test strategy and recruitment of a permanent Quality Engineering team for WeconnectU."
              }
            </p>
            <h3>{"Activities"}</h3>
            <p>{"Everything in Option 1 plus:"}</p>
            <ul>
              <li>{"Define QA organisational structure"}</li>
              <li>{"Define job descriptions"}</li>
              <li>{"Candidate screening and technical interviews"}</li>
              <li>{"Hiring recommendations"}</li>
              <li>{"Onboarding guidance"}</li>
            </ul>
            <h3>{"Suggested Team Structure"}</h3>
            <ul>
              <li>{"Quality Engineering Lead"}</li>
              <li>{"Quality Automation Engineers"}</li>
              <li>{"Quality Engineer"}</li>
            </ul>
            <h3>{"Recruitment Fees"}</h3>
            <table className={"proposal-table"}>
              <thead>
                <tr>
                  <th>{"Role"}</th>
                  <th>{"Placement Fee"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{"Lead Quality Engineer"}</td>
                  <td>{"R120,000"}</td>
                </tr>
                <tr>
                  <td>{"Quality Automation Engineer"}</td>
                  <td>{"R90,000"}</td>
                </tr>
                <tr>
                  <td>{"Quality Engineer"}</td>
                  <td>{"R70,000"}</td>
                </tr>
              </tbody>
            </table>
            <h3>{"Example Recruitment Cost (3 hires)"}</h3>
            <p>
              {
                "1 Lead Quality Engineer, 1 Quality Automation Engineer, 1 Quality Engineer"
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
                {"Total Investment: R520,000"}
              </span>
            </div>
          </div>

          <div
            className={"proposal-option-card"}
            style={{
              borderColor: "var(--accent)",
              background: "rgba(184, 150, 28, 0.05)",
            }}
          >
            <h2>{"Recommended Engagement"}</h2>
            <p>
              {
                "For organisations with limited current quality function, we recommend:"
              }
            </p>
            <div className={"proposal-highlight"} style={{ marginTop: "16px" }}>
              {"Option 2: Strategy + Implementation Team"}
            </div>
            <p style={{ marginTop: "16px" }}>
              {
                "This approach ensures the strategy is not only defined but successfully embedded into the engineering culture and delivery pipeline."
              }
            </p>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Business Benefits"}</h2>
            <ul>
              <li>{"Reduced production defects"}</li>
              <li>{"Faster and safer releases"}</li>
              <li>{"Improved engineering productivity"}</li>
              <li>{"Automation-driven testing"}</li>
              <li>{"Clear quality metrics and reporting"}</li>
              <li>{"Scalable engineering processes"}</li>
            </ul>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Engagement Model"}</h2>
            <ul>
              <li>{"Remote-first delivery"}</li>
              <li>{"Flexible scaling of engineering resources"}</li>
              <li>{"Monthly reporting and governance"}</li>
              <li>{"Close collaboration with engineering leadership"}</li>
            </ul>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Next Steps"}</h2>
            <div
              className={"process-steps"}
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              <div className={"process-step"}>
                <h4>{"Discovery"}</h4>
                <p>{"Initial discovery session"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Agreement"}</h4>
                <p>{"Agreement on engagement option"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Kick-off"}</h4>
                <p>{"Kick-off workshop"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Delivery"}</h4>
                <p>{"Delivery roadmap execution"}</p>
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
            <h2>{"Looking for a Leaner Alternative?"}</h2>
            <p>
              {
                "We have also prepared an alternative engagement proposal covering a hands-on 6-month test strategy implementation with recruitment, or a standalone Quality Assurance Engineer placement."
              }
            </p>
            <Link
              className={"btn btn-accent btn-lg"}
              style={{ marginTop: "16px" }}
              to={"/clients/weconnectu/alternative-engagement"}
            >
              {"View Alternative Engagement Proposal →"}
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
              onClick={() => download(generateImprovementEngagementPDF)}
              className={"btn btn-primary btn-lg"}
            >
              <FileText aria-hidden="true" size={20} />
              {" Download PDF Report"}
            </button>
            <Link
              className={"btn btn-outline btn-lg"}
              to={"/clients/weconnectu/"}
            >
              {"← Back to Assessment Report"}
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

export default function ImprovementEngagementPage() {
  return (
    <ClientGate slug="weconnectu">
      <ClientDocument
        title={"Improvement Engagement — WeconnectU — Bosch Technologies"}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
