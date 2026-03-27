/* ============================================
   BOSCH TECHNOLOGIES — Proposal PDF Generator
   WeConnectU: QE Process Discovery & Improvement
   ============================================ */

// Assessment Report PDF Generator
async function generateAssessmentReportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginL = 15;
  const marginR = 15;
  const contentW = pageWidth - marginL - marginR;
  const bottomMargin = 20;
  let y = 0;

  // Colours
  const gold = [184, 150, 28];
  const dark = [26, 26, 46];
  const grey = [108, 117, 125];
  const red = [192, 57, 43];
  const orange = [243, 156, 18];

  // --- Load logo ---
  let logoDataUrl = null;
  let logoAspect = 1;
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
      logoImg.src = '/assets/images/logo.png';
    });
    logoAspect = logoImg.naturalWidth / logoImg.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = logoImg.naturalWidth;
    canvas.height = logoImg.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(logoImg, 0, 0);
    logoDataUrl = canvas.toDataURL('image/png');
  } catch (e) {
    console.log('Logo load skipped:', e.message);
  }

  // Helpers
  function checkPage(needed) {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
    }
  }

  function heading(text, size) {
    size = size || 14;
    checkPage(14);
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(text, marginL, y);
    y += size === 14 ? 8 : 7;
  }

  function subheading(text) {
    checkPage(10);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...gold);
    doc.text(text, marginL, y);
    y += 6;
  }

  function paragraph(text) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 4 + 2);
    doc.text(lines, marginL, y);
    y += lines.length * 4 + 3;
  }

  function bulletList(items) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    items.forEach(function(item) {
      const lines = doc.splitTextToSize(item, contentW - 8);
      checkPage(lines.length * 4 + 2);
      doc.text('•', marginL + 2, y);
      doc.text(lines, marginL + 8, y);
      y += lines.length * 4 + 1.5;
    });
    y += 2;
  }

  function newPage() {
    doc.addPage();
    y = 20;
  }

  // ==========================================
  //  Header
  // ==========================================
  const headerH = 68;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, 'F');

  if (logoDataUrl) {
    const logoH = 28;
    const logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  const titleLines = doc.splitTextToSize('Quality Engineering Assessment: Findings & Improvement Opportunities', pageWidth - 40);
  doc.text(titleLines, pageWidth / 2, 36, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 54, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('27 March 2026', pageWidth / 2, 62, { align: 'center' });

  y = headerH + 10;

  // ==========================================
  //  Executive Summary
  // ==========================================
  heading('Executive Summary');

  subheading('Current State');
  bulletList([
    'Quality Engineering practices are largely manual and reactive.',
    'Limited integration between testing and delivery pipelines. Small amount of Unit Test within the CICD pipelines.',
    'Quality risks are identified late in the development lifecycle.',
    'Testing is heavily dependent on Quality Engineers with a lot of domain knowledge.',
    'No structured onboarding and upskilling programs for new employees.'
  ]);

  subheading('Business Impact');
  bulletList([
    'Slower release cycles impacting time-to-market.',
    'Increased production risk due to late defect detection.',
    'Higher cost of rework and defect resolution.',
    'Very high risk of Intellectual Property loss if any of the Quality Engineers leave the company.'
  ]);

  subheading('Recommendation');
  bulletList([
    'Implement a structured Quality Engineering Test Strategy.',
    'Focus on automation testing, shift-left testing, and CI/CD integration.',
    'Continuous upskilling of Development and Quality Engineers on domain knowledge.'
  ]);

  // ==========================================
  //  Current State Overview
  // ==========================================
  newPage();
  heading('Current State Overview');

  subheading('Test Strategy');
  bulletList([
    'Heavily dependence on manual testing with domain experts.',
    'Regression testing efforts are a lot hence the team identified a resource capacity issue.',
    'Development Test Environment (DTA) creates inconsistency in testing specific features.'
  ]);

  subheading('Automation');
  bulletList([
    'Developers started writing unit tests. The code coverage is very low.',
    'There is no integration tests.',
    'There are some Selenium UI automation tests but this is not integrated into the CICD pipelines.'
  ]);

  subheading('CI/CD Integration');
  bulletList([
    'Only a low percentage of Unit tests are integrated into delivery pipelines, nothing else.'
  ]);

  subheading('Environments');
  bulletList([
    'Staging environment is closely aligned with the Production environment.',
    'The DEV environment can become inconsistent when features are deployed by multiple teams.'
  ]);

  subheading('Test Data');
  bulletList([
    'Manual and not centrally managed.'
  ]);

  // ==========================================
  //  Key Findings
  // ==========================================
  heading('Key Findings');
  bulletList([
    'Limited automation is creating a regression bottleneck.',
    'Testing occurs late in the lifecycle, increasing defect leakage risk.',
    'Lack of standardised QE Test Strategy.',
    'Manual regression cycles are slowing release velocity.',
    'Limited visibility into quality metrics and reporting. Only manual test cases on the test management tool.'
  ]);

  // ==========================================
  //  Business Impact
  // ==========================================
  heading('Business Impact');
  bulletList([
    'Regression cycles delay releases by multiple days per cycle.',
    'Late defect detection significantly increases cost of fixes.',
    'Lack of automation limits scalability of delivery.',
    'Inconsistent environments increase production risk.',
    'Reduced confidence in release quality, because with manual testing it becomes impossible to do regression testing for every release.'
  ]);

  // ==========================================
  //  High-level QE Skills Assessment
  // ==========================================
  heading('High-level QE Skills Assessment');
  paragraph('The current Quality Engineering capability is heavily reliant on manual testing, despite the team possessing strong domain expertise. While one Quality Engineer has implemented UI automation using Selenium and Java, these tests are executed locally and are not integrated into the CI/CD pipeline, limiting their effectiveness as quality gates.');
  paragraph('This over-reliance on manual processes, combined with concentrated domain knowledge, introduces significant business risk. The potential loss of key individuals would result in a substantial loss of intellectual property and continuity challenges. Furthermore, existing resource and time constraints make it difficult for the team to onboard and upskill new Quality Engineers effectively.');
  paragraph('Introducing a robust automation strategy, specifically by integrating automated tests into the CI/CD pipeline as enforceable quality gates, will reduce this dependency on individuals, improve scalability, and significantly mitigate operational risk.');

  // ==========================================
  //  Target State Vision
  // ==========================================
  newPage();
  heading('Target State Vision');
  bulletList([
    'Automated regression fully integrated into CI/CD pipelines.',
    'Shift-left testing embedded within development workflows.',
    'Stable, production-like environments.',
    'Scalable and reusable automation frameworks.',
    'Real-time quality metrics and visibility.'
  ]);

  // ==========================================
  //  Gap Analysis
  // ==========================================
  heading('Gap Analysis');

  // Table
  const tableHeaders = ['Area', 'Current State', 'Target State', 'Gap'];
  const tableRows = [
    ['Automation', 'Limited', 'CI/CD Integrated', 'High'],
    ['Test Strategy', 'Informal', 'Standardised', 'Medium'],
    ['Environments', 'Unstable', 'Reliable', 'High'],
    ['Test Data', 'Manual', 'Managed', 'Medium']
  ];

  const colW = contentW / 4;
  const rowH = 8;

  // Header row
  checkPage(rowH * (tableRows.length + 1) + 10);
  doc.setFillColor(28, 28, 28);
  doc.rect(marginL, y, contentW, rowH, 'F');
  doc.setFontSize(8);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  tableHeaders.forEach((h, i) => {
    doc.text(h, marginL + i * colW + 4, y + 5.5);
  });
  y += rowH;

  // Body rows
  tableRows.forEach((row, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(marginL, y, contentW, rowH, 'F');
    }
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...dark);
    row.forEach((cell, i) => {
      if (i === 3) {
        // Gap column - color coded
        if (cell === 'High') {
          doc.setTextColor(...red);
          doc.setFont(undefined, 'bold');
        } else if (cell === 'Medium') {
          doc.setTextColor(...orange);
          doc.setFont(undefined, 'bold');
        }
      }
      doc.text(cell, marginL + i * colW + 4, y + 5.5);
      doc.setTextColor(...dark);
      doc.setFont(undefined, 'normal');
    });
    y += rowH;
  });
  y += 10;

  // ==========================================
  //  Footer CTA
  // ==========================================
  const ctaH = 24;
  const ctaY = pageHeight - ctaH;
  if (y > ctaY - 10) {
    doc.addPage();
  }
  doc.setFillColor(28, 28, 28);
  doc.rect(0, pageHeight - ctaH, pageWidth, ctaH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Transform Your QE Practice?', marginL, pageHeight - ctaH + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Contact Bosch Technologies to discuss improvement engagement options.', marginL, pageHeight - ctaH + 15);
  doc.setTextColor(...gold);
  doc.setFont(undefined, 'bold');
  doc.text('boschtechnologies.com/contact', marginL, pageHeight - ctaH + 21);

  // Save
  doc.save('WeConnectU-QE-Assessment-Report.pdf');
}

// Original Proposal PDF Generator
async function generateProposalPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginL = 15;
  const marginR = 15;
  const contentW = pageWidth - marginL - marginR;
  const contactUrl = 'https://boschtechnologies.com/contact/';
  const bottomMargin = 20;
  let y = 0;

  // Colours
  const gold = [184, 150, 28];
  const dark = [26, 26, 46];
  const grey = [108, 117, 125];
  const white = [255, 255, 255];
  const lightBg = [245, 245, 245];

  // --- Load logo ---
  let logoDataUrl = null;
  let logoAspect = 1;
  try {
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    await new Promise((resolve, reject) => {
      logoImg.onload = resolve;
      logoImg.onerror = reject;
      logoImg.src = '/assets/images/logo.png';
    });
    logoAspect = logoImg.naturalWidth / logoImg.naturalHeight;
    const canvas = document.createElement('canvas');
    canvas.width = logoImg.naturalWidth;
    canvas.height = logoImg.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(logoImg, 0, 0);
    logoDataUrl = canvas.toDataURL('image/png');
  } catch (e) {
    console.log('Logo load skipped:', e.message);
  }

  // --- Helper: check for page break ---
  function checkPage(needed) {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
    }
  }

  // --- Helper: section heading ---
  function heading(text, size) {
    size = size || 14;
    checkPage(14);
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(text, marginL, y);
    y += size === 14 ? 8 : 7;
  }

  // --- Helper: wrapped heading (for long titles) ---
  function wrappedHeading(text, size) {
    size = size || 14;
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    var lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 6 + 4);
    doc.text(lines, marginL, y);
    y += lines.length * 6 + 4;
  }

  // --- Helper: sub-heading ---
  function subheading(text) {
    checkPage(10);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...gold);
    doc.text(text, marginL, y);
    y += 6;
  }

  // --- Helper: paragraph ---
  function paragraph(text) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 4 + 2);
    doc.text(lines, marginL, y);
    y += lines.length * 4 + 3;
  }

  // --- Helper: bullet list ---
  function bulletList(items) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    items.forEach(function(item) {
      const lines = doc.splitTextToSize(item, contentW - 8);
      checkPage(lines.length * 4 + 2);
      doc.text('•', marginL + 2, y);
      doc.text(lines, marginL + 8, y);
      y += lines.length * 4 + 1.5;
    });
    y += 2;
  }

  // --- Helper: start a new page ---
  function newPage() {
    doc.addPage();
    y = 20;
  }

  // ==========================================
  //  PAGE 1: Header
  // ==========================================
  var headerH = 68;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, 'F');

  if (logoDataUrl) {
    var logoH = 28;
    var logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  var titleLines = doc.splitTextToSize('Quality Engineering Process Discovery, Skill Assessment & Improvement Proposal', pageWidth - 40);
  doc.text(titleLines, pageWidth / 2, 36, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 54, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(new Date().toLocaleDateString('en-GB'), pageWidth / 2, 62, { align: 'center' });

  y = headerH + 10;

  // ==========================================
  //  Section 1: Understand QE Process & Skill Level
  // ==========================================
  wrappedHeading('Understand Quality Engineering Process & Assess Skill Level');

  subheading('Objective');
  paragraph("Gain a thorough understanding of the current Quality Engineering processes in place and conduct a high-level assessment of the QE team's skill levels. This discovery phase will provide the foundation for identifying gaps, strengths, and areas of improvement.");

  subheading('Activities');
  bulletList([
    'Meeting the Team — Introductory sessions with the Quality Engineering team members to understand roles, responsibilities, and current ways of working.',
    'Stakeholder Engagement — Conduct 1-hour meetings over 5 consecutive days with important stakeholders across Engineering, Product, and Leadership to gather insights into the current QE process, challenges, and expectations.'
  ]);

  subheading('Outcomes');
  bulletList([
    'A comprehensive report detailing all findings from the Quality Engineering Process Discovery.',
    'A High-level Measure of QE Skill Levels across the team, highlighting current capabilities, skill gaps, and recommendations.'
  ]);

  subheading('Investment');
  checkPage(14);
  doc.setFillColor(...gold);
  doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('R7,000', pageWidth / 2, y + 6, { align: 'center' });
  y += 16;

  // ==========================================
  //  Section 2: Improvement Engagement
  // ==========================================
  newPage();
  wrappedHeading('Improvement Engagement');

  subheading('Objective');
  paragraph('Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.');
  paragraph('The proposal outlines four engagement options depending on the level of support required.');

  // ==========================================
  //  Option 1
  // ==========================================
  y += 4;
  heading('Option 1: Test Strategy Creation Only');

  subheading('Scope');
  paragraph("Development of a comprehensive Quality Engineering and Test Strategy aligned to WeConnectU's architecture, development practices, and delivery pipeline.");

  subheading('Activities');
  bulletList([
    'Stakeholder interviews (Engineering, Product, Leadership)',
    'Review of current SDLC and release processes',
    'Architecture review',
    'Risk assessment',
    'Quality maturity assessment',
    'Define testing pyramid and automation strategy',
    'Define environments and test data strategy',
    'CI/CD quality gate recommendations',
    'Test reporting and metrics framework'
  ]);

  subheading('Deliverables');
  bulletList([
    'Quality Engineering Test Strategy Document',
    'Automation framework recommendations',
    'Tooling recommendations',
    'Test environment strategy',
    'Release quality gate framework',
    '6 to 12 month quality roadmap'
  ]);

  subheading('Duration');
  paragraph('3 to 4 weeks');

  subheading('Investment');
  checkPage(14);
  doc.setFillColor(...gold);
  doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('R240,000', pageWidth / 2, y + 6, { align: 'center' });
  y += 16;

  // ==========================================
  //  Option 2
  // ==========================================
  newPage();
  heading('Option 2: Test Strategy + Quality Engineering Implementation Team');

  subheading('Scope');
  paragraph('Creation of the test strategy and deployment of a Quality Engineering team to implement it.');

  subheading('Activities');
  paragraph('Everything in Option 1 plus:');
  bulletList([
    'Automation framework implementation',
    'CI/CD integration',
    'API testing framework',
    'UI automation framework',
    'Test reporting dashboards',
    'Integration test strategy',
    'Quality engineering process implementation',
    'Mentoring development teams'
  ]);

  subheading('Suggested Team');
  bulletList([
    '1 Quality Engineering Lead',
    '2 Automation Engineers',
    '1 QA Analyst'
  ]);

  subheading('Duration');
  paragraph('Initial implementation: 4 to 6 months');

  subheading('Monthly Investment');
  // Table helper
  function table(headers, rows, footerRow) {
    var cols = headers ? headers.length : (rows[0] ? rows[0].length : 2);
    var colW = contentW / cols;
    var rowH = 8;
    if (headers) {
      checkPage(rowH + 2);
      doc.setFillColor(28, 28, 28);
      doc.rect(marginL, y, contentW, rowH, 'F');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(255, 255, 255);
      headers.forEach(function(h, i) {
        doc.text(h, marginL + i * colW + 4, y + 5.5);
      });
      y += rowH;
    }
    rows.forEach(function(row, idx) {
      checkPage(rowH + 2);
      if (idx % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(marginL, y, contentW, rowH, 'F');
      }
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      row.forEach(function(cell, i) {
        doc.text(cell, marginL + i * colW + 4, y + 5.5);
      });
      y += rowH;
    });
    if (footerRow) {
      checkPage(rowH + 2);
      doc.setFillColor(28, 28, 28);
      doc.rect(marginL, y, contentW, rowH, 'F');
      doc.setFontSize(8);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...gold);
      footerRow.forEach(function(cell, i) {
        doc.text(cell, marginL + i * colW + 4, y + 5.5);
      });
      y += rowH;
    }
    y += 4;
  }

  table(
    ['Role', 'Monthly Cost'],
    [
      ['Quality Engineering Lead', 'R120,000'],
      ['Quality Automation Engineer (x2)', 'R95,000 each'],
      ['Quality Engineer', 'R75,000']
    ],
    ['Total Monthly Cost', 'R385,000 per month']
  );

  subheading('Estimated 6-Month Investment');
  checkPage(14);
  doc.setFillColor(...gold);
  doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('R2,310,000', pageWidth / 2, y + 6, { align: 'center' });
  y += 16;

  // ==========================================
  //  Option 3
  // ==========================================
  newPage();
  heading('Option 3: Test Strategy + Upskill Existing Team');

  subheading('Scope');
  paragraph('Create the test strategy and train existing developers or testers to adopt Quality Engineering practices.');

  subheading('Activities');
  paragraph('Everything in Option 1 plus:');
  bulletList([
    'Quality engineering workshops',
    'Automation training',
    'CI/CD testing integration',
    'Coaching during implementation',
    'Code review for automation',
    'Testing best practices training'
  ]);

  subheading('Deliverables');
  bulletList([
    'Test Strategy',
    'Training sessions',
    'Automation framework templates',
    '3 months of coaching support'
  ]);

  subheading('Duration');
  paragraph('8 to 10 weeks');

  subheading('Investment');
  table(
    null,
    [
      ['Strategy Creation', 'R240,000'],
      ['Training & Coaching', 'R180,000']
    ],
    ['Total Investment', 'R420,000']
  );

  // ==========================================
  //  Option 4
  // ==========================================
  newPage();
  heading('Option 4: Test Strategy + Recruitment of a Quality Engineering Team');

  subheading('Scope');
  paragraph('Creation of the test strategy and recruitment of a permanent Quality Engineering team for WeConnectU.');

  subheading('Activities');
  paragraph('Everything in Option 1 plus:');
  bulletList([
    'Define QA organisational structure',
    'Define job descriptions',
    'Candidate screening and technical interviews',
    'Hiring recommendations',
    'Onboarding guidance'
  ]);

  subheading('Suggested Team Structure');
  bulletList([
    'Quality Engineering Lead',
    'Quality Automation Engineers',
    'Quality Engineer'
  ]);

  subheading('Recruitment Fees');
  table(
    ['Role', 'Placement Fee'],
    [
      ['Lead Quality Engineer', 'R120,000'],
      ['Quality Automation Engineer', 'R90,000'],
      ['Quality Engineer', 'R70,000']
    ],
    null
  );

  subheading('Example Recruitment Cost (3 hires)');
  paragraph('1 Lead Quality Engineer, 1 Quality Automation Engineer, 1 Quality Engineer');
  checkPage(14);
  doc.setFillColor(...gold);
  doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Total Investment: R520,000', pageWidth / 2, y + 6, { align: 'center' });
  y += 16;

  // ==========================================
  //  Recommendation
  // ==========================================
  newPage();
  heading('Recommended Engagement');
  paragraph('For organisations with limited current quality function, we recommend:');
  checkPage(20);
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(marginL, y - 1, contentW, 18, 3, 3, 'F');
  doc.setFontSize(11);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...gold);
  doc.text('Option 2: Strategy + Implementation Team', marginL + 6, y + 5);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(...grey);
  doc.text('This approach ensures the strategy is not only defined but successfully embedded', marginL + 6, y + 11);
  doc.text('into the engineering culture and delivery pipeline.', marginL + 6, y + 15);
  y += 24;

  // ==========================================
  //  Business Benefits
  // ==========================================
  heading('Business Benefits');
  bulletList([
    'Reduced production defects',
    'Faster and safer releases',
    'Improved engineering productivity',
    'Automation-driven testing',
    'Clear quality metrics and reporting',
    'Scalable engineering processes'
  ]);

  // ==========================================
  //  Engagement Model
  // ==========================================
  heading('Engagement Model');
  bulletList([
    'Remote-first delivery',
    'Flexible scaling of engineering resources',
    'Monthly reporting and governance',
    'Close collaboration with engineering leadership'
  ]);

  // ==========================================
  //  Next Steps
  // ==========================================
  y += 6;
  heading('Next Steps');
  var steps = [
    'Discovery — 5-day stakeholder engagement and team assessment',
    'Report — Delivery of QE Process and Skill Level findings',
    'Improvement — Tailored improvement engagement proposal'
  ];
  var stepW = contentW / 3;
  checkPage(24);
  steps.forEach(function(step, i) {
    var parts = step.split(' — ');
    var sx = marginL + i * stepW;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(sx + 1, y, stepW - 2, 20, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(parts[0], sx + stepW / 2, y + 7, { align: 'center' });
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    var descLines = doc.splitTextToSize(parts[1], stepW - 8);
    doc.text(descLines, sx + stepW / 2, y + 13, { align: 'center' });
  });
  y += 28;

  // ==========================================
  //  CTA Footer
  // ==========================================
  var ctaH = 24;
  var ctaY = pageHeight - ctaH;
  if (y > ctaY - 10) {
    doc.addPage();
    ctaY = pageHeight - ctaH;
  }
  doc.setFillColor(28, 28, 28);
  doc.rect(0, ctaY, pageWidth, ctaH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Get Started?', marginL, ctaY + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Contact Bosch Technologies to discuss the best engagement option for your team.', marginL, ctaY + 15);
  doc.setTextColor(...gold);
  doc.setFont(undefined, 'bold');
  var linkText = 'boschtechnologies.com/contact';
  doc.text(linkText, marginL, ctaY + 21);
  var linkW = doc.getTextWidth(linkText);
  doc.link(marginL, ctaY + 18, linkW, 5, { url: contactUrl });

  // --- Save ---
  doc.save('Bosch-Technologies-Proposal-WeConnectU.pdf');
}
