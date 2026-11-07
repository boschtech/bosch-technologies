import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Chart from "chart.js/auto";

vi.mock("chart.js/auto", () => ({
  default: vi.fn(function () {
    this.destroy = vi.fn();
  }),
}));

// These pages were originally ported verbatim from legacy PHP sources (since
// removed from the repository) and verified to match that source's rendered
// HTML exactly at migration time. The frozen fixtures under
// tests/__snapshots__/client-pages/ capture that verified output, so this
// suite continues to guard against regressions without depending on the
// removed legacy files.
const pages = import.meta.glob("../../src/pages/clients/*/*.jsx");
const generators = import.meta.glob("../../src/lib/pdf/clients/*.js");
const fixtures = import.meta.glob("../__snapshots__/client-pages/*.json", {
  eager: true,
  import: "default",
});
const cases = [
  ["weconnectu", "index", "AssessmentReportPage"],
  ["weconnectu", "improvement-engagement", "ImprovementEngagementPage"],
  ["weconnectu", "alternative-engagement", "AlternativeEngagementPage"],
  ["weconnectu", "maturity-assessment", "MaturityAssessmentPage"],
  ["weconnectu", "service-agreement", "ServiceAgreementPage"],
  ["comotion", "index", "AssessmentReportPage"],
  ["comotion", "improvement-engagement", "ImprovementEngagementPage"],
  [
    "comotion",
    "maturity-assessment-comotion-ai",
    "MaturityAssessmentComotionAiPage",
  ],
  [
    "comotion",
    "maturity-assessment-seed-analytics",
    "MaturityAssessmentSeedAnalyticsPage",
  ],
  ["toomuchiwifi", "index", "ProposalPage"],
];
const normalize = (text) => text.replace(/\s+/g, "");
afterEach(() => vi.unstubAllGlobals());

describe("client route content matches frozen fixture HTML", () => {
  it.each(cases)("%s/%s", async (slug, filename, page) => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ authenticated: true }),
      })),
    );
    const expected =
      fixtures[`../__snapshots__/client-pages/${slug}-${filename}.json`];
    const Page = (await pages[`../../src/pages/clients/${slug}/${page}.jsx`]())
      .default;
    const { container, unmount } = render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );
    await screen.findByRole("heading", {
      level: 1,
      name: expected.headingText,
    });
    expect(normalize(container.textContent)).toBe(normalize(expected.bodyText));
    expect(
      [...container.querySelectorAll("a")].map((a) => a.getAttribute("href")),
    ).toEqual(expected.linkHrefs);
    expect(container.querySelectorAll("button")).toHaveLength(
      expected.buttonCount,
    );
    expect(container.querySelectorAll("table")).toHaveLength(
      expected.tableCount,
    );
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, nofollow",
    );
    const moduleName =
      filename === "index" ||
      (slug === "comotion" && filename === "improvement-engagement")
        ? `${slug}-proposal`
        : `${slug}-${filename}`;
    const module =
      await generators[`../../src/lib/pdf/clients/${moduleName}.js`]();
    for (let i = 0; i < expected.actionFunctionNames.length; i++) {
      const functionName = expected.actionFunctionNames[i];
      const generate = vi.spyOn(module, functionName).mockResolvedValue();
      fireEvent.click(container.querySelectorAll("button")[i]);
      await waitFor(() => expect(generate).toHaveBeenCalledOnce());
      await waitFor(() =>
        expect(screen.queryByRole("status")).not.toBeInTheDocument(),
      );
      generate.mockRestore();
    }
    if (filename.startsWith("maturity-assessment")) {
      expect(Chart).toHaveBeenCalledWith(
        container.querySelector("#radar-chart"),
        expect.objectContaining({ type: "radar" }),
      );
      const chart = Chart.mock.instances.at(-1);
      unmount();
      expect(chart.destroy).toHaveBeenCalledOnce();
    }
  });
});
