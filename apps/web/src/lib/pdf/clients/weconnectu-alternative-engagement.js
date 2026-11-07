import { jsPDF } from "jspdf";

export async function generateAlternativeEngagementPDF() {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginL = 15;
  const contentW = pageWidth - marginL - 15;
  const bottomMargin = 20;
  let y = 0;

  const gold = [184, 150, 28];
  const dark = [26, 26, 46];
  const grey = [108, 117, 125];

  // Load logo
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
    // Downscale to roughly 300 DPI at the 28mm print height so the embedded
    // bitmap stays small — the source asset is ~2675x1569 and would otherwise
    // be embedded as a multi-megabyte uncompressed RGBA image.
    const targetH = 340;
    const targetW = Math.round(targetH * logoAspect);
    const canvas = document.createElement("canvas");
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(logoImg, 0, 0, targetW, targetH);
    logoDataUrl = canvas.toDataURL("image/png");
  } catch (e) {
    console.log("Logo skipped");
  }

  function checkPage(needed) {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
    }
  }

  function heading(text) {
    checkPage(14);
    doc.setFontSize(14);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...dark);
    doc.text(text, marginL, y);
    y += 8;
  }

  function subheading(text) {
    checkPage(10);
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.setTextColor(...gold);
    doc.text(text, marginL, y);
    y += 6;
  }

  function paragraph(text) {
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(...grey);
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 4 + 2);
    doc.text(lines, marginL, y);
    y += lines.length * 4 + 3;
  }

  function bulletList(items) {
    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(...grey);
    items.forEach((item) => {
      const lines = doc.splitTextToSize(item, contentW - 8);
      checkPage(lines.length * 4 + 2);
      doc.text("•", marginL + 2, y);
      doc.text(lines, marginL + 8, y);
      y += lines.length * 4 + 1.5;
    });
    y += 2;
  }

  function highlightBox(text) {
    checkPage(14);
    doc.setFillColor(...gold);
    doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, "F");
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(text, pageWidth / 2, y + 6, { align: "center" });
    y += 16;
  }

  function table(headers, rows, footerRow) {
    const cols = headers ? headers.length : rows[0].length;
    const colW = contentW / cols;
    const rowH = 8;
    if (headers) {
      checkPage(rowH + 2);
      doc.setFillColor(28, 28, 28);
      doc.rect(marginL, y, contentW, rowH, "F");
      doc.setFontSize(8);
      doc.setFont(undefined, "bold");
      doc.setTextColor(255, 255, 255);
      headers.forEach((h, i) => doc.text(h, marginL + i * colW + 4, y + 5.5));
      y += rowH;
    }
    rows.forEach((row, idx) => {
      checkPage(rowH + 2);
      if (idx % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(marginL, y, contentW, rowH, "F");
      }
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");
      doc.setTextColor(...dark);
      row.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
      y += rowH;
    });
    if (footerRow) {
      checkPage(rowH + 2);
      doc.setFillColor(28, 28, 28);
      doc.rect(marginL, y, contentW, rowH, "F");
      doc.setFontSize(8);
      doc.setFont(undefined, "bold");
      doc.setTextColor(...gold);
      footerRow.forEach((cell, i) =>
        doc.text(cell, marginL + i * colW + 4, y + 5.5),
      );
      y += rowH;
    }
    y += 4;
  }

  function newPage() {
    doc.addPage();
    y = 20;
  }

  // Header
  const headerH = 60;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, "F");
  if (logoDataUrl) {
    const logoH = 28,
      logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, "PNG", (pageWidth - logoW) / 2, 3, logoW, logoH);
  }
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, "bold");
  doc.text("Alternative Engagement Proposal", pageWidth / 2, 38, {
    align: "center",
  });
  doc.setFontSize(10);
  doc.setFont(undefined, "normal");
  doc.setTextColor(200, 200, 200);
  doc.text("Prepared for WeconnectU by Bosch Technologies", pageWidth / 2, 46, {
    align: "center",
  });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("2 September 2026", pageWidth / 2, 53, { align: "center" });
  y = headerH + 10;

  // Overview
  heading("Overview");
  subheading("Objective");
  paragraph(
    "Strengthen WeconnectU's Quality Assurance capability through hands-on implementation and the permanent placement of a dedicated Quality Assurance Engineer.",
  );
  paragraph(
    "This proposal presents two independent options. They can be taken separately, or Option 1 can be taken as the complete end-to-end solution, as it already includes recruitment of the permanent resource.",
  );

  // Option 1
  heading("Option 1: Test Strategy Implementation & Recruitment");
  subheading("Scope");
  paragraph(
    "Garth (Bosch Technologies) will work directly with WeconnectU to design and implement the test strategy, stand up all automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer to take ownership at the end of the engagement.",
  );
  bulletList([
    "Design and implement a comprehensive test strategy",
    "Set up all automation test frameworks",
    "Lead quality assurance initiatives",
    "Recruit, train and upskill the newly recruited team member to take over at engagement end",
  ]);
  subheading("Deliverables");
  bulletList([
    "Comprehensive test strategy document aligned with WeconnectU's needs",
    "Automated test frameworks implementation (tools, infrastructure, processes)",
    "Training and mentoring of the permanent Quality Assurance Engineering resource",
    "Documentation and best practices guides",
    "Transition plan and knowledge transfer completion",
  ]);
  subheading("Key Terms");
  bulletList([
    "Flexibility: Garth has the flexibility to work from anywhere and is not limited to working exclusively for WeconnectU.",
    "Recruitment & Transition: Before the end of the 6-month engagement, Bosch Technologies will recruit a permanent Quality Assurance Engineer for WeconnectU.",
    "Knowledge Transfer: Full upskilling and handover of the test strategy and automation frameworks to the recruited permanent team member.",
  ]);
  subheading("Duration & Investment");
  paragraph("6-month engagement at a monthly fee of R100,000 per month.");
  highlightBox("Total Investment: R600,000");

  // Option 2
  newPage();
  heading("Option 2: Quality Assurance Engineer Recruitment Only");
  subheading("Scope");
  paragraph(
    "Bosch Technologies will run a dedicated recruitment process to identify, assess and place a Quality Assurance Engineer who will be permanently employed by WeconnectU.",
  );
  subheading("Position Details");
  bulletList([
    "Role: Quality Assurance Engineer",
    "Employment Type: Permanent, full-time at WeconnectU",
    "Remuneration: Maximum of R80,000 per month",
    "Benefits: Full WeconnectU employee benefits package",
  ]);
  subheading("Assessment & Tooling");
  bulletList([
    "Technical Assessment Tool: Bosch Technologies' own HackerRank platform",
    "Assessment Coverage: Based on WeconnectU's Job Description, Technical QA competencies and AI usage proficiency",
    "ATS Integration: HackerRank is integrated with WeconnectU's ATS (Workable) so candidate results are tracked in one place",
  ]);
  subheading("Timeline");
  paragraph("Approximately 45 days");
  subheading("Investment");
  paragraph(
    "Placement fee is payable only once the successful candidate signs the offer letter.",
  );
  highlightBox("Total Investment: R144,000");

  // Investment Summary
  newPage();
  heading("Investment Summary");
  table(
    ["Option", "Cost", "Duration"],
    [
      ["Option 1 - Strategy & Recruitment", "R600,000", "6 months"],
      ["Option 2 - Recruitment Only", "R144,000", "~45 days"],
    ],
    null,
  );

  // Why This Works
  heading("Why This Works");
  bulletList([
    "Immediate quality improvement - expert-led test strategy and automation setup from day one",
    "Sustainable capability - internal QA expertise built through direct mentoring and knowledge transfer",
    "Permanent resource - a vetted Quality Assurance Engineer trained by the person who built the frameworks",
    "Assessment rigour - HackerRank technical screening including AI usage, integrated with Workable",
    "Flexibility - engagement structure optimises cost while internal capacity is built",
  ]);

  // Engagement Model
  heading("Engagement Model");
  bulletList([
    "Remote-first delivery, with the flexibility to work from anywhere",
    "Non-exclusive engagement for the duration of Option 1",
    "Monthly reporting and governance",
    "Close collaboration with engineering leadership",
  ]);

  // Footer CTA
  const ctaH = 24;
  if (y > pageHeight - ctaH - 10) doc.addPage();
  doc.setFillColor(28, 28, 28);
  doc.rect(0, pageHeight - ctaH, pageWidth, ctaH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, "bold");
  doc.text("Ready to Get Started?", marginL, pageHeight - ctaH + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, "normal");
  doc.setTextColor(200, 200, 200);
  doc.text(
    "Contact Bosch Technologies to discuss the best engagement option for your team.",
    marginL,
    pageHeight - ctaH + 15,
  );
  doc.setTextColor(...gold);
  doc.setFont(undefined, "bold");
  doc.text("boschtechnologies.com/contact", marginL, pageHeight - ctaH + 21);

  doc.save("WeconnectU-Alternative-Engagement-Proposal.pdf");
}
