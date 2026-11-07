import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import Chart from "chart.js/auto";

vi.mock("chart.js/auto", () => ({
  default: vi.fn(function () {
    this.destroy = vi.fn();
  }),
}));

const pages = import.meta.glob("../../src/pages/clients/*/*.jsx");
const generators = import.meta.glob("../../src/lib/pdf/clients/*.js");
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
const root = resolve("../..");
afterEach(() => vi.unstubAllGlobals());

describe("client route content matches authenticated original HTML", () => {
  it.each(cases)("%s/%s", async (slug, filename, page) => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        json: async () => ({ authenticated: true }),
      })),
    );
    const original = readFileSync(
      resolve(root, `clients/${slug}/${filename}.php`),
      "utf8",
    );
    const content = original
      .split("<?php else: ?>")[1]
      .split("<?php endif; ?>")[0];
    const expected = new DOMParser().parseFromString(content, "text/html");
    const Page = (await pages[`../../src/pages/clients/${slug}/${page}.jsx`]())
      .default;
    const { container, unmount } = render(
      <MemoryRouter>
        <Page />
      </MemoryRouter>,
    );
    await screen.findByRole("heading", {
      level: 1,
      name: expected.querySelector("h1").textContent,
    });
    expect(normalize(container.textContent)).toBe(
      normalize(expected.body.textContent),
    );
    expect(
      [...container.querySelectorAll("a")].map((a) => a.getAttribute("href")),
    ).toEqual(
      [...expected.querySelectorAll("a")].map((a) =>
        a.getAttribute("href").replace(/\.(php|html)(?=$|[?#])/, ""),
      ),
    );
    expect(container.querySelectorAll("button")).toHaveLength(
      expected.querySelectorAll("button").length,
    );
    expect(container.querySelectorAll("table")).toHaveLength(
      expected.querySelectorAll("table").length,
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
    const actions = [...expected.querySelectorAll("button[onclick]")];
    for (let i = 0; i < actions.length; i++) {
      const functionName = actions[i]
        .getAttribute("onclick")
        .match(/^(\w+)\(/)[1];
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
