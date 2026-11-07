import { jsPDF } from "jspdf";
import { MATURITY_LEVELS, RECOMMENDATIONS } from "../assessment-data";

export async function generateAssessmentReport({ results, name, company }) {
  const doc = new jsPDF("p", "mm", "a4");
  const levelInfo = MATURITY_LEVELS[results.overallLevel];

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const contactUrl = "https://boschtechnologies.com/contact/";
  let y = 20;

  // Load logo as base64 (preserve aspect ratio)
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
    const ctx = canvas.getContext("2d");
    ctx.drawImage(logoImg, 0, 0);
    logoDataUrl = canvas.toDataURL("image/png");
  } catch (e) {
    console.log("Logo load skipped:", e.message);
  }

  // Header
  const headerH = 66;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, "F");

  // Logo centred in header (aspect-ratio preserved, bigger)
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
    `Prepared for: ${name}${company ? " — " + company : ""}  |  ${new Date().toLocaleDateString("en-GB")}`,
    pageWidth / 2,
    56,
    { align: "center" },
  );

  y = headerH + 4;

  // --- Speed dial gauge (rendered via canvas → image) ---
  const gaugeDataUrl = renderGaugeToDataUrl(results.overall, 5);

  // Place gauge on the left
  const gaugeW = 60;
  const gaugeH = 35;
  doc.addImage(gaugeDataUrl, "PNG", 18, y, gaugeW, gaugeH);

  // Level info to the right of gauge
  const infoX = 85;
  doc.setFontSize(15);
  doc.setTextColor(150, 121, 15);
  doc.setFont(undefined, "bold");
  doc.text(`Level ${results.overallLevel}: ${levelInfo.name}`, infoX, y + 16);
  doc.setFontSize(9);
  doc.setFont(undefined, "normal");
  doc.setTextColor(108, 117, 125);
  doc.text(levelInfo.tagline, infoX, y + 24);

  y += gaugeH + 10;

  // --- Dimension Scores (use full page width) ---
  doc.setFontSize(15);
  doc.setTextColor(26, 26, 46);
  doc.setFont(undefined, "bold");
  doc.text("Dimension Scores", 15, y);
  y += 9;

  // Calculate available space for dimensions (before CTA)
  const ctaH = 28;
  const ctaY = pageHeight - ctaH;
  const availableH = ctaY - y - 6;
  const dimEntries = Object.entries(results.dimensions);
  const dimSpacing = Math.min(availableH / dimEntries.length, 32);
  const barWidth = pageWidth - 30; // full width bars

  dimEntries.forEach(([dimId, data]) => {
    const rec = RECOMMENDATIONS[dimId][data.level] || "";
    const fillWidth = (data.score / 5) * barWidth;
    const barColor =
      data.score < 2.5
        ? [192, 57, 43]
        : data.score < 3.5
          ? [212, 160, 23]
          : [184, 150, 28];

    // Dimension name and score
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.setTextColor(26, 26, 46);
    doc.text(`${data.title}`, 15, y);
    doc.setTextColor(...barColor);
    doc.text(`${data.score.toFixed(1)} / 5.0`, pageWidth - 35, y);

    y += 6;

    // Full-width score bar
    doc.setFillColor(222, 226, 230);
    doc.roundedRect(15, y, barWidth, 4, 2, 2, "F");
    doc.setFillColor(...barColor);
    doc.roundedRect(15, y, fillWidth, 4, 2, 2, "F");

    y += 10;

    // Recommendation
    doc.setFontSize(8);
    doc.setFont(undefined, "normal");
    doc.setTextColor(73, 80, 87);
    const recLines = doc.splitTextToSize(
      `Recommendation: ${rec}`,
      pageWidth - 30,
    );
    doc.text(recLines, 15, y);
    y += recLines.length * 4 + (dimSpacing - 18);
  });

  // CTA — "Ready to Level Up?" anchored to page bottom
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
  // Clickable link text
  doc.setTextColor(184, 150, 28);
  doc.setFontSize(9);
  doc.setFont(undefined, "bold");
  const linkText = "Click here to book a consultation";
  doc.text(linkText, 15, ctaY + 24);
  const linkW = doc.getTextWidth(linkText);
  doc.link(15, ctaY + 21, linkW, 5, { url: contactUrl });

  doc.save(`Bosch-Maturity-Assessment-${name.replace(/\s+/g, "-")}.pdf`);
}

// --- Render modern gauge to a data URL ---
export function renderGaugeToDataUrl(score, max) {
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

  // Score-based colour
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

  // --- Track (subtle light grey) ---
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, Math.PI, 2 * Math.PI, false);
  ctx.strokeStyle = "#e9ecef";
  ctx.lineWidth = arcW;
  ctx.lineCap = "round";
  ctx.stroke();

  // --- Fill arc (single colour based on score) ---
  const endAngle = Math.PI + pct * Math.PI;
  ctx.beginPath();
  ctx.arc(cx, cy, outerR, Math.PI, endAngle, false);
  ctx.strokeStyle = scoreColor;
  ctx.lineWidth = arcW;
  ctx.lineCap = "round";
  ctx.stroke();

  // --- Glow on the tip ---
  const tipX = cx + Math.cos(endAngle) * outerR;
  const tipY = cy + Math.sin(endAngle) * outerR;
  const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, arcW * 1.2);
  glow.addColorStop(0, "rgba(255, 255, 255, 0.35)");
  glow.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.beginPath();
  ctx.arc(tipX, tipY, arcW * 1.2, 0, 2 * Math.PI);
  ctx.fillStyle = glow;
  ctx.fill();

  // --- Score text (bottom centre) — same colour as arc ---
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 52px sans-serif";
  ctx.fillStyle = scoreColor;
  ctx.fillText(`${score.toFixed(1)}`, cx, cy - 8);

  ctx.font = "600 18px sans-serif";
  ctx.fillStyle = "#6c757d";
  ctx.fillText(`out of ${max}`, cx, cy + 22);

  // --- Scale labels (warm gold) ---
  ctx.font = "600 14px sans-serif";
  ctx.fillStyle = "#b8961c";
  ctx.textAlign = "center";
  ctx.fillText("0", cx - outerR - 4, cy + arcW + 10);
  ctx.fillText(String(max), cx + outerR + 4, cy + arcW + 10);

  return canvas.toDataURL("image/png");
}
