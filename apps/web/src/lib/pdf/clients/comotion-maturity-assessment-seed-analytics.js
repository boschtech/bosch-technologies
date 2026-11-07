import { jsPDF } from "jspdf";
import Chart from "chart.js/auto";

export function mountChart() {
  // Render Radar Chart
  const ctx = document.getElementById("radar-chart");
  if (ctx) {
    const isMobile = window.innerWidth < 768;
    const chart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          ["Process &", "Governance"],
          ["Automation Coverage", "& Effectiveness"],
          ["Tooling &", "Infrastructure"],
          ["Reporting &", "Observability"],
          ["Skills &", "Culture"],
        ],
        datasets: [
          {
            label: "Seed Analytics Score",
            data: [2.0, 1.0, 1.5, 1.3, 1.8],
            backgroundColor: "rgba(184, 150, 28, 0.25)",
            borderColor: "#b8961c",
            borderWidth: 2,
            pointBackgroundColor: "#b8961c",
            pointBorderColor: "#111111",
            pointBorderWidth: 2,
            pointRadius: isMobile ? 4 : 6,
          },
          {
            label: "Target (Level 4)",
            data: [4, 4, 4, 4, 4],
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        layout: { padding: isMobile ? 10 : 20 },
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
              stepSize: 1,
              font: { size: isMobile ? 8 : 11 },
              color: "#666666",
              backdropColor: "transparent",
            },
            grid: { color: "rgba(255, 255, 255, 0.1)" },
            angleLines: { color: "rgba(255, 255, 255, 0.1)" },
            pointLabels: {
              font: { size: isMobile ? 9 : 12, weight: "600" },
              color: "#ffffff",
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#cccccc",
              font: { size: 11 },
              usePointStyle: true,
              padding: 20,
            },
          },
        },
      },
    });
    return () => chart.destroy();
  }
}

// PDF Generation - matches Bosch-Maturity-Assessment style
export async function generateMaturityPDF() {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contactUrl = "https://boschtechnologies.com/contact/";
  let y = 20;

  // Seed Analytics assessment data
  const overallScore = 1.5;
  const overallLevel = 2;
  const levelName = "Managed";
  const levelTagline = "Some structure in place but inconsistently applied.";

  const dimensions = [
    {
      name: "Test Process & Governance",
      score: 2.0,
      rec: "Standardise your test case format and introduce a lightweight test management tool. Begin tracking defect metrics.",
    },
    {
      name: "Automation Coverage & Effectiveness",
      score: 1.0,
      rec: "Begin with automating your most critical smoke tests. Choose a modern framework (Playwright or Cypress) and start small.",
    },
    {
      name: "Tooling & Infrastructure",
      score: 1.5,
      rec: "Make test results a blocking gate in your pipeline. Introduce Docker for consistent test environments.",
    },
    {
      name: "Reporting & Observability",
      score: 1.3,
      rec: "Start with automated test reports (e.g., Allure or ExtentReports). Make results visible to the whole team.",
    },
    {
      name: "Team Skills & Culture",
      score: 1.8,
      rec: "Introduce pair testing sessions. Provide basic automation training for manual testers.",
    },
  ];

  // --- Load logo ---
  let logoDataUrl = null;
  let logoAspect = 1;
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
      logoImg.src = "/images/logo.png";
    });
    logoAspect = logoImg.naturalWidth / logoImg.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = logoImg.naturalWidth;
    canvas.height = logoImg.naturalHeight;
    canvas.getContext("2d").drawImage(logoImg, 0, 0);
    logoDataUrl = canvas.toDataURL("image/png");
  } catch (e) {
    console.log("Logo load skipped:", e.message);
  }

  // --- Render gauge to data URL ---
  function renderGaugeToDataUrl(score, max) {
    const size = 400;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size * 0.62;
    const ctx = canvas.getContext("2d");

    const cx = size / 2;
    const cy = size * 0.48;
    const outerR = size * 0.4;
    const arcW = 24;
    const pct = Math.min(score / max, 1);

    const scoreColor =
      score < 1.5
        ? "#c0392b"
        : score < 2.5
          ? "#e67e22"
          : score < 3.5
            ? "#d4a017"
            : score < 4.5
              ? "#b8961c"
              : "#27ae60";

    ctx.beginPath();
    ctx.arc(cx, cy, outerR, Math.PI, 2 * Math.PI, false);
    ctx.strokeStyle = "#e9ecef";
    ctx.lineWidth = arcW;
    ctx.lineCap = "round";
    ctx.stroke();

    const endAngle = Math.PI + pct * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, Math.PI, endAngle, false);
    ctx.strokeStyle = scoreColor;
    ctx.lineWidth = arcW;
    ctx.lineCap = "round";
    ctx.stroke();

    const tipX = cx + Math.cos(endAngle) * outerR;
    const tipY = cy + Math.sin(endAngle) * outerR;
    const glow = ctx.createRadialGradient(
      tipX,
      tipY,
      0,
      tipX,
      tipY,
      arcW * 1.2,
    );
    glow.addColorStop(0, "rgba(255, 255, 255, 0.35)");
    glow.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.beginPath();
    ctx.arc(tipX, tipY, arcW * 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = glow;
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 52px sans-serif";
    ctx.fillStyle = scoreColor;
    ctx.fillText(score.toFixed(1), cx, cy - 8);

    ctx.font = "600 18px sans-serif";
    ctx.fillStyle = "#6c757d";
    ctx.fillText("out of " + max, cx, cy + 22);

    ctx.font = "600 14px sans-serif";
    ctx.fillStyle = "#b8961c";
    ctx.textAlign = "center";
    ctx.fillText("0", cx - outerR - 4, cy + arcW + 10);
    ctx.fillText(String(max), cx + outerR + 4, cy + arcW + 10);

    return canvas.toDataURL("image/png");
  }

  // --- Header ---
  const headerH = 66;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, "F");

  if (logoDataUrl) {
    const logoH = 32;
    const logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, "PNG", (pageWidth - logoW) / 2, 3, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Test Automation Maturity Assessment", pageWidth / 2, 40, {
    align: "center",
  });
  doc.setFontSize(14);
  doc.text("Overall Maturity Score", pageWidth / 2, 48, { align: "center" });
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.text(
    "Prepared for: Seed Analytics  |  5 November 2026",
    pageWidth / 2,
    56,
    { align: "center" },
  );

  y = headerH + 4;

  // --- Speed dial gauge ---
  const gaugeDataUrl = renderGaugeToDataUrl(overallScore, 5);
  const gaugeW = 60;
  const gaugeH = 35;
  doc.addImage(gaugeDataUrl, "PNG", 18, y, gaugeW, gaugeH);

  const infoX = 85;
  const infoMaxWidth = pageWidth - infoX - 15;
  doc.setFontSize(15);
  doc.setTextColor(150, 121, 15);
  doc.setFont(undefined, "bold");
  doc.text("Level " + overallLevel + ": " + levelName, infoX, y + 16);
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.setTextColor(108, 117, 125);
  const taglineLines = doc.splitTextToSize(levelTagline, infoMaxWidth);
  doc.text(taglineLines, infoX, y + 24);

  y += gaugeH + (taglineLines.length > 1 ? taglineLines.length * 4 : 0) + 10;

  // --- Dimension Scores ---
  doc.setFontSize(13);
  doc.setTextColor(26, 26, 46);
  doc.setFont(undefined, "bold");
  doc.text("Dimension Scores", 15, y);
  y += 8;

  const barWidth = pageWidth - 30;
  const ctaH = 28;
  const ctaY = pageHeight - ctaH;

  dimensions.forEach((dim, idx) => {
    const fillWidth = (dim.score / 5) * barWidth;
    const barColor =
      dim.score < 2.5
        ? [192, 57, 43]
        : dim.score < 3.5
          ? [212, 160, 23]
          : [184, 150, 28];

    if (y > ctaY - 35) {
      doc.setFillColor(0, 0, 0);
      doc.rect(0, ctaY, pageWidth, ctaH, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text("Ready to Level Up?", 15, ctaY + 10);
      doc.setFontSize(9);
      doc.setFont(undefined, "normal");
      doc.setTextColor(200, 200, 200);
      doc.text(
        "Book a free consultation with Bosch Technologies to build your improvement roadmap.",
        15,
        ctaY + 17,
      );
      doc.setTextColor(184, 150, 28);
      doc.setFont(undefined, "bold");
      doc.text("boschtechnologies.com/contact", 15, ctaY + 24);

      doc.addPage();
      y = 20;
    }

    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(26, 26, 46);
    doc.text(dim.name, 15, y);
    doc.setTextColor(...barColor);
    doc.text(dim.score.toFixed(1) + " / 5.0", pageWidth - 15, y, {
      align: "right",
    });

    y += 5;

    doc.setFillColor(222, 226, 230);
    doc.roundedRect(15, y, barWidth, 4, 2, 2, "F");
    doc.setFillColor(...barColor);
    doc.roundedRect(15, y, fillWidth, 4, 2, 2, "F");

    y += 8;

    doc.setFontSize(8);
    doc.setFont(undefined, "normal");
    doc.setTextColor(73, 80, 87);
    const shortRec =
      dim.rec.length > 120 ? dim.rec.substring(0, 120) + "..." : dim.rec;
    const recLines = doc.splitTextToSize(
      "Recommendation: " + shortRec,
      pageWidth - 30,
    );
    doc.text(recLines, 15, y);
    y += recLines.length * 3.5 + 6;
  });

  // --- CTA Footer ---
  doc.setFillColor(0, 0, 0);
  doc.rect(0, ctaY, pageWidth, ctaH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont(undefined, "bold");
  doc.text("Ready to Level Up?", 15, ctaY + 10);
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.setTextColor(200, 200, 200);
  doc.text(
    "Book a free consultation with Bosch Technologies to build your improvement roadmap.",
    15,
    ctaY + 17,
  );
  doc.setTextColor(184, 150, 28);
  doc.setFontSize(9);
  doc.setFont(undefined, "bold");
  const linkText = "Click here to book a consultation";
  doc.text(linkText, 15, ctaY + 24);
  const linkW = doc.getTextWidth(linkText);
  doc.link(15, ctaY + 21, linkW, 5, { url: contactUrl });

  doc.save("Bosch-Maturity-Assessment-Seed-Analytics.pdf");
}
