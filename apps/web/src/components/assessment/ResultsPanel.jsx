import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import SiteIcon from "@/components/SiteIcon";
import { MATURITY_LEVELS, RECOMMENDATIONS } from "@/lib/assessment-data";

export default function ResultsPanel({ results, details }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const level = MATURITY_LEVELS[results.overallLevel];
  const chartData = Object.values(results.dimensions).map((dimension) => ({
    title: dimension.title.replace("Test ", "").replace("Team ", ""),
    score: dimension.score,
    target: 4,
  }));
  async function download() {
    setDownloading(true);
    setError("");
    try {
      const { generateAssessmentReport } =
        await import("@/lib/pdf/assessment-report");
      await generateAssessmentReport({ results, ...details });
    } catch {
      setError("Unable to generate your PDF report. Please try again.");
    } finally {
      setDownloading(false);
    }
  }
  return (
    <div className="results-section active" id="results-section">
      <div className="overall-score">
        <div className="score-circle">
          <span className="score-value">{results.overall.toFixed(1)}</span>
        </div>
        <h2>
          Level {results.overallLevel}: {level.name}
        </h2>
        <p>{level.tagline}</p>
      </div>
      <div
        className="chart-container"
        role="img"
        aria-label="Radar chart of your five dimension scores compared with target Level 4"
      >
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={chartData} outerRadius="65%">
            <PolarGrid stroke="rgba(255,255,255,0.15)" />
            <PolarAngleAxis
              dataKey="title"
              tick={{ fill: "#ffffff", fontSize: 11 }}
            />
            <PolarRadiusAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tick={{ fill: "#999999", fontSize: 10 }}
            />
            <Radar
              name="Your Score"
              dataKey="score"
              stroke="#b8961c"
              fill="#b8961c"
              fillOpacity={0.25}
              strokeWidth={2}
            />
            <Radar
              name="Target (Level 4)"
              dataKey="target"
              stroke="rgba(255,255,255,0.4)"
              fillOpacity={0.03}
              strokeDasharray="5 5"
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <h3 className="mb-3">Dimension Breakdown &amp; Recommendations</h3>
      <div className="dimension-results">
        {Object.entries(results.dimensions).map(([id, dimension]) => {
          const category =
            dimension.score < 2.5
              ? "low"
              : dimension.score < 3.5
                ? "mid"
                : "high";
          const color =
            category === "low"
              ? "#c0392b"
              : category === "mid"
                ? "#d4a017"
                : "#b8961c";
          return (
            <div className="dim-result" key={id}>
              <div className="dim-result-header">
                <h3>
                  <SiteIcon name={dimension.icon} /> {dimension.title}
                </h3>
                <span className={`dim-score-badge score-${category}`}>
                  {dimension.score.toFixed(1)} / 5.0
                </span>
              </div>
              <div className="score-bar">
                <div
                  className="score-fill"
                  style={{
                    width: `${(dimension.score / 5) * 100}%`,
                    background: color,
                  }}
                />
              </div>
              <div className="recommendation">
                <strong>Recommendation:</strong>{" "}
                {RECOMMENDATIONS[id][dimension.level]}
              </div>
            </div>
          );
        })}
      </div>
      <div className="results-actions">
        <button
          className="btn btn-primary btn-lg"
          onClick={download}
          disabled={downloading}
        >
          <SiteIcon name="file-text" />
          {downloading ? "Generating PDF..." : "Download PDF Report"}
        </button>
        <Link to="/contact" className="btn btn-accent btn-lg">
          Book a Consultation →
        </Link>
      </div>
      {error && (
        <p role="alert" style={{ color: "var(--danger)" }}>
          {error}
        </p>
      )}
      <div
        style={{
          marginTop: 48,
          padding: 32,
          background: "var(--gray-100)",
          borderRadius: 16,
        }}
      >
        <h3>What&apos;s Next?</h3>
        <p>
          Your assessment provides a snapshot of where you stand today. To build
          a roadmap for improvement:
        </p>
        <ul style={{ listStyle: "none", marginTop: 16 }}>
          <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
            → <strong>Book a free consultation</strong>. We&apos;ll review your
            results and discuss priority actions
          </li>
          <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
            → <strong>Explore our maturity model</strong>. Understand what each
            level looks like in detail
          </li>
          <li style={{ padding: "8px 0", fontSize: "0.95rem" }}>
            → <strong>Share with your team</strong>. Have different team members
            take the assessment to compare perspectives
          </li>
        </ul>
        <div className="btn-group mt-3">
          <Link to="/contact" className="btn btn-primary">
            Book Consultation
          </Link>
          <Link to="/maturity-model" className="btn btn-outline">
            View Maturity Model
          </Link>
        </div>
      </div>
    </div>
  );
}
