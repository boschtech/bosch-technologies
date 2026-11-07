import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { generateImprovementEngagementPDF } from "@/lib/pdf/clients/comotion-proposal.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Confidential Proposal"}
          </span>
          <h1>{"Quality Engineering Improvement"}</h1>
          <p>
            {"Prepared for "}
            <strong>{"Comotion"}</strong>
            {" — covering "}
            <strong>{"Comotion AI"}</strong>
            {" and "}
            <strong>{"Seed Analytics"}</strong>
            {" — by Bosch Technologies"}
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
        <div className={"container proposal-content"}>
          <div className={"proposal-option-card"}>
            <h2>{"Quality Engineering Improvement"}</h2>
            <h3>{"Objective"}</h3>
            <p>
              {
                "Stand up a single, shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, combining strategy creation with hands-on implementation: governed, requirements-to-release quality for Comotion AI's AI-assisted development practice, and a test management system plus CI/CD automation foundation for Seed Analytics."
              }
            </p>
            <h3>{"Scope"}</h3>
            <p>
              {
                "Development of a single Quality Engineering Test Strategy covering both Comotion AI and Seed Analytics, followed immediately by hands-on implementation of that strategy across both entities."
              }
            </p>
            <h3>{"Activities"}</h3>
            <ul>
              <li>
                {
                  "Stakeholder interviews across both entities (Engineering, Product, Leadership)"
                }
              </li>
              <li>
                {
                  "Review of Comotion AI's existing unit, component, and Playwright end-to-end tests, and its AI-assisted test creation practice"
                }
              </li>
              <li>
                {
                  "Review of Seed Analytics' delivery process, documented test cases, and pipeline"
                }
              </li>
              <li>
                {
                  "Architecture review of Comotion AI's stack (Python, TypeScript, Next.js, PostgreSQL)"
                }
              </li>
              <li>{"Risk assessment for both entities"}</li>
              <li>{"Quality maturity assessment validation"}</li>
              <li>
                {
                  "Define requirements-to-release quality gates for Comotion AI, including governance of AI-generated tests"
                }
              </li>
              <li>
                {
                  "Test management system selection and automation framework roadmap for Seed Analytics"
                }
              </li>
              <li>{"CI/CD quality gate recommendations for both entities"}</li>
              <li>{"Release readiness scorecard framework"}</li>
              <li>
                {
                  "Embed quality from requirements through release readiness at Comotion AI, increase automated coverage, and mature CI/CD quality gates"
                }
              </li>
              <li>
                {
                  "Stand up a test management system at Seed Analytics and migrate documented test cases into it"
                }
              </li>
              <li>
                {
                  "Build an initial CI/CD automation framework at Seed Analytics (Playwright, consistent with the group's existing standard) and integrate it as a blocking pipeline gate"
                }
              </li>
              <li>
                {
                  "Group-wide test reporting dashboards and release readiness metrics"
                }
              </li>
            </ul>
            <h3>{"Deliverables"}</h3>
            <ul>
              <li>
                {
                  "Group Quality Engineering Test Strategy document, with a Comotion AI annex and a Seed Analytics annex"
                }
              </li>
              <li>
                {
                  "AI-assisted test governance framework, embedded and operating for Comotion AI"
                }
              </li>
              <li>
                {
                  "Test management system implemented and populated for Seed Analytics"
                }
              </li>
              <li>
                {"CI/CD-integrated automation framework for Seed Analytics"}
              </li>
              <li>
                {
                  "Group-wide test reporting dashboards and release readiness scorecard"
                }
              </li>
              <li>{"6 to 12 month quality roadmap per entity"}</li>
            </ul>
            <h3>{"Duration"}</h3>
            <p>{"12 months"}</p>
            <h3>{"Monthly Investment"}</h3>
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
                {"R150,000 per month"}
              </span>
            </div>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Business Benefits"}</h2>
            <ul>
              <li>{"A measurable release readiness signal for Comotion AI"}</li>
              <li>
                {
                  "An automated regression safety net for Seed Analytics where none exists today"
                }
              </li>
              <li>
                {
                  "Governed, trustworthy AI-assisted test creation at Comotion AI"
                }
              </li>
              <li>
                {
                  "Centralised, searchable test case management at Seed Analytics"
                }
              </li>
              <li>{"Group-wide quality metrics and reporting"}</li>
              <li>
                {
                  "Reduced production defects and faster, safer releases across both entities"
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-section"}>
            <h2>{"Engagement Model"}</h2>
            <ul>
              <li>{"Remote-first delivery across both entities"}</li>
              <li>{"Flexible scope to match each entity's evolving needs"}</li>
              <li>{"Monthly reporting and governance at the group level"}</li>
              <li>
                {
                  "Close collaboration with engineering leadership at Comotion AI and Seed Analytics"
                }
              </li>
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
                <p>{"Initial discovery session with both entities"}</p>
              </div>
              <div className={"process-step"}>
                <h4>{"Agreement"}</h4>
                <p>{"Agreement to proceed"}</p>
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
              to={"/clients/comotion/"}
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
    <ClientGate slug="comotion">
      <ClientDocument
        title={
          "Quality Engineering Improvement — Comotion — Bosch Technologies"
        }
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
