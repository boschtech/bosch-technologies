import ClientGate from "@/components/ClientGate";
import ClientDocument, { useClientDownload } from "@/components/ClientDocument";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import {
  generateServiceAgreementDOCX,
  generateServiceAgreementPDF,
} from "@/lib/pdf/clients/weconnectu-service-agreement.js";

function Content() {
  const download = useClientDownload();
  return (
    <>
      <section className={"service-hero"} style={{ paddingBottom: "24px" }}>
        <div className={"container"}>
          <span className={"badge badge-accent"}>
            {"Confidential Document"}
          </span>
          <h1>{"Master Services Agreement"}</h1>
          <p>
            {"Prepared for "}
            <strong>{"WeconnectU"}</strong>
            {" by Bosch Technologies"}
          </p>
          <Link
            className={"btn btn-outline"}
            style={{ marginTop: "16px" }}
            to={"/clients/weconnectu/alternative-engagement"}
          >
            {"← Back to Proposal"}
          </Link>
        </div>
      </section>

      <section className={"section"} style={{ paddingTop: "0" }}>
        <div className={"container proposal-content"}>
          <div className={"proposal-option-card"}>
            <h2>{"Overview"}</h2>
            <p>
              {
                "This is the service agreement for the Test Strategy Implementation & Quality Assurance Recruitment engagement. The full legal terms and conditions are only available in the downloadable PDF or Word document below — this page summarises the key commercial terms."
              }
            </p>
            <ul>
              <li>
                <strong>{"Term:"}</strong>
                {" 6 months from the Effective Date"}
              </li>
              <li>
                <strong>{"Fee:"}</strong>
                {" R100,000 per month, inclusive of VAT (R600,000 total)"}
              </li>
              <li>
                <strong>{"Invoicing:"}</strong>
                {
                  " On the 25th of each month (or the preceding Friday if the 25th falls on a weekend)"
                }
              </li>
              <li>
                <strong>{"Payment Terms:"}</strong>
                {" Within 5 days of invoice date, by EFT"}
              </li>
              <li>
                <strong>{"Working Arrangement:"}</strong>
                {" Remote and non-exclusive"}
              </li>
              <li>
                <strong>{"Included:"}</strong>
                {
                  " Recruitment, training, and upskilling of a permanent Quality Assurance Engineer, plus upskilling of the existing 2 Quality Assurance Testers"
                }
              </li>
              <li>
                <strong>{"Success Measures:"}</strong>
                {
                  " Quality Engineer hired, automation test frameworks implemented, quality gates implemented in the deployment pipelines, and upskilling of the Quality Engineer and existing QA Testers"
                }
              </li>
            </ul>
          </div>

          <div className={"proposal-option-card"}>
            <h2>{"Agreement Details"}</h2>
            <p className={"text-muted"}>
              {
                "Select the Effective Date below. If left blank, it will appear as a blank underlined line in the downloaded document, ready to be completed by hand."
              }
            </p>
            <h3>{"The Service Provider"}</h3>
            <p
              className={"text-muted"}
              style={{ fontSize: "0.85rem", marginBottom: "12px" }}
            >
              {
                "Bosch Technologies (Pty) Ltd · Reg. No. 2013/003965/07 · 83 Vredeveld Street, Burgundy, Brackenfell, Western Cape, 7560 · Represented by Garth Bosch, Founder"
              }
            </p>
            <h3>{"The Client"}</h3>
            <p
              className={"text-muted"}
              style={{ fontSize: "0.85rem", marginBottom: "12px" }}
            >
              {
                "WeconnectU (Pty) Ltd · Reg. No. 2017/012125/07 · 65 Kara Place, Olive Grove Business Park, Somerset West, Western Cape, 7130 · Represented by Daniël Van Der Merwe, Director"
              }
            </p>
            <div className={"form-group"}>
              <label htmlFor={"effective-date"}>{"Effective Date"}</label>
              <input type={"date"} id={"effective-date"} />
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
              onClick={() => download(generateServiceAgreementPDF)}
              className={"btn btn-primary btn-lg"}
            >
              <FileText aria-hidden="true" size={20} />
              {" Download Service Agreement (PDF)"}
            </button>
            <button
              type={"button"}
              onClick={() => download(generateServiceAgreementDOCX)}
              className={"btn btn-outline btn-lg"}
            >
              <FileText aria-hidden="true" size={20} />
              {" Download Service Agreement (Word)"}
            </button>
            <Link
              className={"btn btn-outline btn-lg"}
              to={"/clients/weconnectu/alternative-engagement"}
            >
              {"← Back to Proposal"}
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

export default function ServiceAgreementPage() {
  return (
    <ClientGate slug="weconnectu" document>
      <ClientDocument
        title={"Service Agreement — WeconnectU — Bosch Technologies"}
      >
        <Content />
      </ClientDocument>
    </ClientGate>
  );
}
