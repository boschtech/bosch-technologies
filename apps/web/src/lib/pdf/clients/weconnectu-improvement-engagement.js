import { jsPDF } from "jspdf";

export async function generateImprovementEngagementPDF() {
  const doc = new jsPDF("p", "mm", "a4");

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
    const canvas = document.createElement("canvas");
    canvas.width = logoImg.naturalWidth;
    canvas.height = logoImg.naturalHeight;
    canvas.getContext("2d").drawImage(logoImg, 0, 0);
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
  doc.text("Improvement Engagement Proposal", pageWidth / 2, 38, {
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
  doc.text("27 March 2026", pageWidth / 2, 53, { align: "center" });
  y = headerH + 10;

  // Objective
  heading("Improvement Engagement");
  subheading("Objective");
  paragraph(
    "Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.",
  );
  paragraph(
    "The proposal outlines four engagement options depending on the level of support required.",
  );

  // Option 1
  heading("Option 1: Test Strategy Creation Only");
  subheading("Scope");
  paragraph(
    "Development of a comprehensive Quality Engineering and Test Strategy aligned to WeconnectU's architecture, development practices, and delivery pipeline.",
  );
  subheading("Activities");
  bulletList([
    "Stakeholder interviews (Engineering, Product, Leadership)",
    "Review of current SDLC and release processes",
    "Architecture review",
    "Risk assessment",
    "Quality maturity assessment",
    "Define testing pyramid and automation strategy",
    "Define environments and test data strategy",
    "CI/CD quality gate recommendations",
    "Test reporting and metrics framework",
  ]);
  subheading("Deliverables");
  bulletList([
    "Quality Engineering Test Strategy Document",
    "Automation framework recommendations",
    "Tooling recommendations",
    "Test environment strategy",
    "Release quality gate framework",
    "6 to 12 month quality roadmap",
  ]);
  subheading("Duration");
  paragraph("3 to 4 weeks");
  subheading("Investment");
  highlightBox("R240,000");

  // Option 2
  newPage();
  heading("Option 2: Test Strategy + QE Implementation Team");
  subheading("Scope");
  paragraph(
    "Creation of the test strategy and deployment of a Quality Engineering team to implement it.",
  );
  subheading("Activities");
  paragraph("Everything in Option 1 plus:");
  bulletList([
    "Automation framework implementation",
    "CI/CD integration",
    "API testing framework",
    "UI automation framework",
    "Test reporting dashboards",
    "Integration test strategy",
    "Quality engineering process implementation",
    "Mentoring development teams",
  ]);
  subheading("Suggested Team");
  bulletList([
    "1 Quality Engineering Lead",
    "1 Quality Automation Engineer",
    "1 Quality Engineer",
  ]);
  subheading("Duration");
  paragraph("Initial implementation: 4 to 6 months");
  subheading("Monthly Investment");
  table(
    ["Role", "Monthly Cost"],
    [
      ["Quality Engineering Lead", "R120,000"],
      ["Quality Automation Engineer", "R95,000"],
      ["Quality Engineer", "R75,000"],
    ],
    ["Total Monthly Cost", "R290,000 per month"],
  );
  subheading("Estimated 6-Month Investment");
  highlightBox("R1,740,000");

  // Option 3
  newPage();
  heading("Option 3: Test Strategy + Upskill Existing Team");
  subheading("Scope");
  paragraph(
    "Create the test strategy and train existing developers or testers to adopt Quality Engineering practices.",
  );
  subheading("Activities");
  paragraph("Everything in Option 1 plus:");
  bulletList([
    "Quality engineering workshops",
    "Automation training",
    "CI/CD testing integration",
    "Coaching during implementation",
    "Code review for automation",
    "Testing best practices training",
  ]);
  subheading("Deliverables");
  bulletList([
    "Test Strategy",
    "Training sessions",
    "Automation framework templates",
    "3 months of coaching support",
  ]);
  subheading("Duration");
  paragraph("8 to 10 weeks");
  subheading("Investment");
  table(
    null,
    [
      ["Strategy Creation", "R240,000"],
      ["Training & Coaching", "R180,000"],
    ],
    null,
  );
  subheading("Total Investment");
  highlightBox("R420,000");

  // Option 4
  newPage();
  heading("Option 4: Test Strategy + Recruitment");
  subheading("Scope");
  paragraph(
    "Creation of the test strategy and recruitment of a permanent Quality Engineering team for WeconnectU.",
  );
  subheading("Activities");
  paragraph("Everything in Option 1 plus:");
  bulletList([
    "Define QA organisational structure",
    "Define job descriptions",
    "Candidate screening and technical interviews",
    "Hiring recommendations",
    "Onboarding guidance",
  ]);
  subheading("Suggested Team Structure");
  bulletList([
    "Quality Engineering Lead",
    "Quality Automation Engineers",
    "Quality Engineer",
  ]);
  subheading("Recruitment Fees");
  table(
    ["Role", "Placement Fee"],
    [
      ["Lead Quality Engineer", "R120,000"],
      ["Quality Automation Engineer", "R90,000"],
      ["Quality Engineer", "R70,000"],
    ],
    null,
  );
  subheading("Example Recruitment Cost (3 hires)");
  paragraph(
    "1 Lead Quality Engineer, 1 Quality Automation Engineer, 1 Quality Engineer",
  );
  highlightBox("Total Investment: R520,000");

  // Recommendation
  newPage();
  heading("Recommended Engagement");
  paragraph(
    "For organisations with limited current quality function, we recommend:",
  );
  checkPage(20);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(marginL, y - 1, contentW, 18, 3, 3, "F");
  doc.setFontSize(11);
  doc.setFont(undefined, "bold");
  doc.setTextColor(...gold);
  doc.text("Option 2: Strategy + Implementation Team", marginL + 6, y + 5);
  doc.setFontSize(8);
  doc.setFont(undefined, "normal");
  doc.setTextColor(...grey);
  doc.text(
    "This approach ensures the strategy is not only defined but successfully embedded",
    marginL + 6,
    y + 11,
  );
  doc.text(
    "into the engineering culture and delivery pipeline.",
    marginL + 6,
    y + 15,
  );
  y += 24;

  // Business Benefits
  heading("Business Benefits");
  bulletList([
    "Reduced production defects",
    "Faster and safer releases",
    "Improved engineering productivity",
    "Automation-driven testing",
    "Clear quality metrics and reporting",
    "Scalable engineering processes",
  ]);

  // Engagement Model
  heading("Engagement Model");
  bulletList([
    "Remote-first delivery",
    "Flexible scaling of engineering resources",
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

  doc.save("WeconnectU-Improvement-Engagement-Proposal.pdf");
}
