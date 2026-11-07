import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import { createCanvas, Image as CanvasImage } from "@napi-rs/canvas";
import { jsPDF } from "jspdf";
import * as docx from "docx";
import mammoth from "mammoth";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { afterAll, beforeEach, describe, expect, it, vi } from "vitest";

// Original scripts run unchanged in a VM, with the same canvas/image inputs as
// the port. PDF text is compared page-by-page, including exact text coordinates;
// Word content is extracted independently with mammoth.
const root = resolve("../..");
// Optional absolute module path for one-off cross-version parity checks against
// the original CDN's jsPDF 2.5.1, without adding it to project dependencies.
const originalJsPDF = process.env.BOSCH_ORIGINAL_JSPDF
  ? createRequire(import.meta.url)(process.env.BOSCH_ORIGINAL_JSPDF).jsPDF
  : jsPDF;
const sources = {
  "weconnectu-proposal": [
    "js/proposal-pdf-weconnectu.js",
    ["generateAssessmentReportPDF", "generateProposalPDF"],
  ],
  "weconnectu-improvement-engagement": [
    "clients/weconnectu/improvement-engagement.php",
    ["generateImprovementEngagementPDF"],
  ],
  "weconnectu-alternative-engagement": [
    "clients/weconnectu/alternative-engagement.php",
    ["generateAlternativeEngagementPDF"],
  ],
  "weconnectu-maturity-assessment": [
    "clients/weconnectu/maturity-assessment.php",
    ["generateMaturityPDF"],
  ],
  "weconnectu-service-agreement": [
    "clients/weconnectu/service-agreement.php",
    ["generateServiceAgreementPDF", "generateServiceAgreementDOCX"],
  ],
  "comotion-proposal": [
    "js/proposal-pdf-comotion.js",
    ["generateAssessmentReportPDF", "generateImprovementEngagementPDF"],
  ],
  "comotion-maturity-assessment-comotion-ai": [
    "clients/comotion/maturity-assessment-comotion-ai.php",
    ["generateMaturityPDF"],
  ],
  "comotion-maturity-assessment-seed-analytics": [
    "clients/comotion/maturity-assessment-seed-analytics.php",
    ["generateMaturityPDF"],
  ],
  "toomuchiwifi-proposal": ["js/proposal-pdf.js", ["generateProposalPDF"]],
};

const modules = import.meta.glob("../../src/lib/pdf/clients/*.js");
let capturedPdf;
let capturedBlob;
let effectiveDate = "";
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

class LocalImage extends CanvasImage {
  set src(value) {
    const relative = value.replace(/^\/(?:assets\/)?images\//, "");
    super.src = readFileSync(resolve(root, "assets/images", relative));
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

function originalModule(path) {
  let code = readFileSync(resolve(root, path), "utf8");
  if (path.endsWith(".php")) {
    code = [...code.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)]
      .map((match) => match[1])
      .find((script) => script.includes("function generate"));
    code = code
      .replace(/<\?php[\s\S]*?\?>/g, "")
      .replace("lucide.createIcons();", "");
    // The browser mounts the chart separately. PDF text/layout does not depend
    // on the chart, and the generator's own gauge still uses a real canvas.
    if (code.includes("// Render Radar Chart"))
      code = code.slice(code.indexOf("// PDF Generation"));
  }
  const context = vm.createContext({
    window: { jspdf: { jsPDF: originalJsPDF }, docx },
    docx,
    document,
    Image: LocalImage,
    URL,
    console,
    atob,
    Uint8Array,
    Date,
    setTimeout,
  });
  vm.runInContext(code, context);
  return context;
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
  originalJsPDF.API.save = jsPDF.API.save;
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

describe("all client PDF and DOCX generators match original sources", () => {
  for (const [name, [source, functions]] of Object.entries(sources)) {
    for (const fn of functions) {
      for (const date of name === "weconnectu-service-agreement"
        ? ["", "2026-11-07"]
        : [""]) {
        it(`${name}: ${fn}${date ? ` (effective ${date})` : ""}`, async () => {
          effectiveDate = date;
          document.getElementById("effective-date").value = effectiveDate;
          const original = originalModule(source);
          const port = await modules[`../../src/lib/pdf/clients/${name}.js`]();
          if (fn.endsWith("DOCX")) {
            await original[fn]();
            const expected = await mammoth.extractRawText({
              buffer: await blobBuffer(capturedBlob),
            });
            await port[fn]();
            const actual = await mammoth.extractRawText({
              buffer: await blobBuffer(capturedBlob),
            });
            expect(actual.value).toBe(expected.value);
            expect(actual.value).toContain("Daniël Van Der Merwe");
            expect(actual.value).toContain("R600,000");
            if (date) expect(actual.value).toContain("7 November 2026");
          } else {
            await original[fn]();
            const expected = await pdfText(capturedPdf);
            await port[fn]();
            const actual = await pdfText(capturedPdf);
            expect(actual).toEqual(expected);
            expect(
              actual.flat().some((item) => item.text.includes("Bosch")),
            ).toBe(true);
            if (date)
              expect(
                actual
                  .flat()
                  .some((item) => item.text.includes("7 November 2026")),
              ).toBe(true);
          }
        }, 30000);
      }
    }
  }
});
