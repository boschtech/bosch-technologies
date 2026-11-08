import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createCanvas, Image as CanvasImage } from "@napi-rs/canvas";
import { jsPDF } from "jspdf";
import mammoth from "mammoth";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// These generators were originally ported verbatim from legacy PHP/vanilla-JS
// sources (since removed from the repository) and verified byte-for-byte
// identical to that source's output at the time of migration. The frozen
// fixtures under tests/__snapshots__/client-documents/ capture that verified
// output, so this suite continues to guard against accidental regressions
// in the ported generators without depending on the removed legacy files.
const root = resolve("../..");
const names = [
  "weconnectu-proposal",
  "weconnectu-improvement-engagement",
  "weconnectu-alternative-engagement",
  "weconnectu-maturity-assessment",
  "weconnectu-service-agreement",
  "comotion-proposal",
  "comotion-maturity-assessment-comotion-ai",
  "comotion-maturity-assessment-seed-analytics",
  "toomuchiwifi-proposal",
];
const functionsByName = {
  "weconnectu-proposal": ["generateAssessmentReportPDF", "generateProposalPDF"],
  "weconnectu-improvement-engagement": ["generateImprovementEngagementPDF"],
  "weconnectu-alternative-engagement": ["generateAlternativeEngagementPDF"],
  "weconnectu-maturity-assessment": ["generateMaturityPDF"],
  "weconnectu-service-agreement": [
    "generateServiceAgreementPDF",
    "generateServiceAgreementDOCX",
  ],
  "comotion-proposal": [
    "generateAssessmentReportPDF",
    "generateImprovementEngagementPDF",
  ],
  "comotion-maturity-assessment-comotion-ai": ["generateMaturityPDF"],
  "comotion-maturity-assessment-seed-analytics": ["generateMaturityPDF"],
  "toomuchiwifi-proposal": ["generateProposalPDF"],
};

const modules = import.meta.glob("../../src/lib/pdf/clients/*.js");
let capturedPdf;
let capturedBlob;
const canvasStore = new WeakMap();

function nativeCanvas(element) {
  let canvas = canvasStore.get(element);
  if (
    !canvas ||
    canvas.width !== element.width ||
    canvas.height !== element.height
  ) {
    canvas = createCanvas(element.width || 300, element.height || 150);
    canvasStore.set(element, canvas);
  }
  return canvas;
}

// Resolves the same `/images/...`-style paths the ported generators request
// against apps/web/public, matching how Vite serves that directory at the
// site root in both dev and the production build.
class LocalImage extends CanvasImage {
  set src(value) {
    super.src = readFileSync(
      resolve(root, "apps/web/public", value.replace(/^\//, "")),
    );
  }
}

async function pdfText(data) {
  const task = getDocument({
    data: new Uint8Array(data),
    useSystemFonts: true,
  });
  const pdf = await task.promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const content = await (await pdf.getPage(i)).getTextContent();
    pages.push(
      content.items.map((item) => ({
        text: item.str,
        transform: item.transform,
      })),
    );
  }
  await task.destroy();
  return pages;
}

function blobBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(Buffer.from(reader.result));
    reader.onerror = reject;
    reader.readAsArrayBuffer(blob);
  });
}

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
    function () {
      return nativeCanvas(this).getContext("2d");
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockImplementation(
    function () {
      return nativeCanvas(this).toDataURL("image/png");
    },
  );
  vi.stubGlobal("Image", LocalImage);
  // Capture the real jsPDF output rather than invoking a browser download.
  jsPDF.API.save = function () {
    capturedPdf = this.output("arraybuffer");
  };
  URL.createObjectURL = (blob) => {
    capturedBlob = blob;
    return "blob:test-document";
  };
  URL.revokeObjectURL = () => {};
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
  document.body.innerHTML =
    '<input id="effective-date" type="date"><canvas id="radar-chart"></canvas>';
});

afterAll(() => vi.unstubAllGlobals());

describe("client PDF/DOCX generators match their frozen fixtures", () => {
  for (const name of names) {
    for (const fn of functionsByName[name]) {
      for (const date of name === "weconnectu-service-agreement"
        ? ["", "2026-11-07"]
        : [""]) {
        it(`${name}: ${fn}${date ? ` (effective ${date})` : ""}`, async () => {
          document.getElementById("effective-date").value = date;
          const port = await modules[`../../src/lib/pdf/clients/${name}.js`]();
          const suffix = date ? `-${date}` : "";
          if (fn.endsWith("DOCX")) {
            await port[fn]();
            const actual = await mammoth.extractRawText({
              buffer: await blobBuffer(capturedBlob),
            });
            expect(actual.value).toContain("Daniël Van Der Merwe");
            expect(actual.value).toContain("R600,000");
            if (date) expect(actual.value).toContain("7 November 2026");
            await expect(actual.value).toMatchFileSnapshot(
              `../__snapshots__/client-documents/${name}-${fn}${suffix}.docx.txt`,
            );
          } else {
            await port[fn]();
            const actual = await pdfText(capturedPdf);
            expect(
              actual.flat().some((item) => item.text.includes("Bosch")),
            ).toBe(true);
            if (date) {
              expect(
                actual
                  .flat()
                  .some((item) => item.text.includes("7 November 2026")),
              ).toBe(true);
            }
            await expect(JSON.stringify(actual, null, 2)).toMatchFileSnapshot(
              `../__snapshots__/client-documents/${name}-${fn}${suffix}.pdf.json`,
            );
          }
        }, 30000);
      }
    }
  }
});

describe("comotion improvement engagement PDF layout", () => {
  it("keeps Monthly Investment on page 1 with Duration (no stranded page)", async () => {
    const port = await modules["../../src/lib/pdf/clients/comotion-proposal.js"]();
    await port.generateImprovementEngagementPDF();
    const pages = await pdfText(capturedPdf);
    const pageOf = (text) =>
      pages.findIndex((items) => items.some((item) => item.text.includes(text))) + 1;
    expect(pageOf("Duration")).toBe(1);
    expect(pageOf("Monthly Investment")).toBe(1);
    expect(pageOf("R150,000 per month")).toBe(1);
    expect(pageOf("Business Benefits")).toBe(2);
    expect(pages).toHaveLength(2);
  }, 30000);
});
