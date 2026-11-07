/* ============================================
   BOSCH TECHNOLOGIES — Proposal PDF Generator
   Comotion: Comotion AI & Seed Analytics
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
  doc.text('Prepared for Comotion (Comotion AI & Seed Analytics) by Bosch Technologies', pageWidth / 2, 54, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('5 November 2026', pageWidth / 2, 62, { align: 'center' });

  y = headerH + 10;

  // ==========================================
  //  Executive Summary
  // ==========================================
  heading('Executive Summary');

  subheading('Current State');
  bulletList([
    "Comotion AI builds its product and much of its test suite with heavy AI assistance (Python, TypeScript, Next.js, PostgreSQL), and already has unit, component, and Playwright end-to-end tests — but no dedicated Quality Engineer owns quality from requirements through release readiness.",
    'Seed Analytics has strict delivery processes, but very little quality embedded within them: test cases are written but kept outside any test management system, and there is no test automation in the delivery pipeline.',
    'Across both entities, quality is largely invisible to leadership — neither can currently measure or report on release readiness.',
    'Reporting & Observability is the weakest dimension for both entities (1.8/5.0 for Comotion AI, 1.3/5.0 for Seed Analytics), meaning decisions are made with little real-time quality data.'
  ]);

  subheading('Business Impact');
  bulletList([
    'Without a dedicated QE function, Comotion AI cannot objectively confirm that AI-generated code and AI-generated tests meet an agreed quality bar before release.',
    'Seed Analytics carries full regression risk on every release, since no automated safety net exists in the pipeline.',
    'Test case knowledge at Seed Analytics lives in documents rather than a searchable system, creating risk of coverage gaps and duplicated effort.',
    'Neither entity can currently produce a release readiness scorecard, slowing confident, data-driven release decisions at the group level.'
  ]);

  subheading('Recommendation');
  bulletList([
    "Stand up a shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, with a strategy tailored to each entity's starting point.",
    'For Comotion AI: embed quality from the requirements stage, govern and extend the existing AI-assisted testing practice, increase coverage, and mature CI/CD quality gates to produce a measurable release readiness signal.',
    'For Seed Analytics: introduce a test management system to formalise existing test cases, and build a CI/CD test automation foundation from the ground up.'
  ]);

  // ==========================================
  //  Current State Overview: Comotion AI
  // ==========================================
  newPage();
  heading('Current State Overview — Comotion AI');

  subheading('Test Strategy');
  bulletList([
    'Development and test creation are heavily AI-assisted across the stack (Python, TypeScript, Next.js, PostgreSQL, GitHub), with unit, component, and Playwright end-to-end tests already in place.',
    'There is no Quality Engineer to own quality end-to-end, so requirements coverage, test design quality, and release readiness are not formally governed.',
    'Quality decisions currently rely on engineering judgement rather than a defined, measurable process.'
  ]);

  subheading('Automation');
  bulletList([
    'Automation Coverage & Effectiveness scored 3.5 / 5.0 — the strongest dimension, reflecting good existing unit, component, and Playwright end-to-end coverage.',
    'Without governance, there is a risk that AI-generated tests accumulate without a clear view of what they actually cover or how reliable they are.'
  ]);

  subheading('Tooling & Infrastructure');
  bulletList([
    'Scored 3.5 / 5.0. The modern stack provides a solid foundation, but production-like staging and synthetic test data practices are not yet in place.'
  ]);

  subheading('Reporting & Observability');
  bulletList([
    'The weakest dimension at 1.8 / 5.0. There is no dashboard for pass rates, flakiness, or coverage trends, so release readiness cannot currently be measured objectively.'
  ]);

  subheading('Team & Process');
  bulletList([
    'Test Process & Governance scored 2.0 / 5.0 and Team Skills & Culture 2.5 / 5.0. Practices exist informally but are not standardised, and there is no shared testing community of practice to govern the growing use of AI in test creation.'
  ]);

  // ==========================================
  //  Current State Overview: Seed Analytics
  // ==========================================
  newPage();
  heading('Current State Overview — Seed Analytics');

  subheading('Test Strategy');
  bulletList([
    'Delivery processes are strict and well defined, but quality is not embedded within them. Test cases are written manually but kept outside of any test management system.',
    'Test Process & Governance scored 2.0 / 5.0 — the same score as Comotion AI, but for a different reason: process discipline exists, while the testing substance within it does not.'
  ]);

  subheading('Automation');
  bulletList([
    'Automation Coverage & Effectiveness is the weakest dimension at 1.0 / 5.0. There are currently no automated tests in the delivery pipeline.'
  ]);

  subheading('Tooling & Infrastructure');
  bulletList([
    'Scored 1.5 / 5.0. No CI/CD quality gates exist, and there is no consistent, containerised test environment strategy.'
  ]);

  subheading('Reporting & Observability');
  bulletList([
    'Scored 1.3 / 5.0. No automated reporting exists, so quality status is not visible to the wider team or leadership.'
  ]);

  subheading('Team & Process');
  bulletList([
    'Team Skills & Culture scored 1.8 / 5.0. Manual testers would benefit from pairing with engineers and basic automation training to begin building in-house automation capability.'
  ]);

  // ==========================================
  //  Key Findings
  // ==========================================
  heading('Key Findings');
  bulletList([
    'Comotion AI has a solid automation foundation but no one accountable for quality from requirements through release.',
    'Seed Analytics has no automated regression safety net, leaving every release fully dependent on manual effort.',
    'Test case knowledge at Seed Analytics is undocumented in any shared system, creating duplication and coverage-gap risk.',
    'Neither entity can currently produce a release readiness scorecard or quality trend reporting.',
    'Governance over AI-generated tests at Comotion AI is informal, risking unmanaged growth of the test suite.'
  ]);

  // ==========================================
  //  Business Impact
  // ==========================================
  heading('Business Impact');
  bulletList([
    'Release decisions for both entities are made without objective quality data.',
    "Seed Analytics' lack of automation increases regression cost and risk with every release cycle.",
    'Comotion AI risks false confidence in AI-generated code if AI-generated tests are not independently governed.',
    'Group-wide reporting on quality and release readiness is not currently possible.',
    "Both entities face scaling risk: Comotion AI's test suite will keep growing with AI assistance, and Seed Analytics has no automation base to build on."
  ]);

  // ==========================================
  //  High-level QE Skills Assessment
  // ==========================================
  heading('High-level QE Skills Assessment');
  paragraph('Comotion AI\'s engineering team is clearly comfortable using AI to accelerate both feature development and test creation, and this has produced a genuinely useful base of unit, component, and end-to-end tests. However, without a dedicated Quality Engineer, no one is accountable for whether that AI-generated test suite actually reflects requirements, how reliable it is, or whether it provides enough confidence to call a release "ready". As the codebase and AI usage grow, this gap will widen rather than close on its own.');
  paragraph('Seed Analytics presents the opposite profile: a disciplined delivery process with almost no testing substance behind it. Test cases are written diligently but are not stored anywhere searchable or reportable, and there is no automation protecting the pipeline from regressions. This leaves the team fully reliant on manual effort for every release, with no scalable way to increase release frequency without proportionally increasing manual testing effort.');
  paragraph("A shared Quality Engineering capability — tailored to each entity's starting point — would give Comotion AI the governance and measurement it currently lacks, and give Seed Analytics the foundational tooling and automation it has not yet built. Over time, this also allows the group to report on quality and release readiness consistently across both entities.");

  // ==========================================
  //  Target State Vision
  // ==========================================
  newPage();
  heading('Target State Vision');
  bulletList([
    'A shared Quality Engineering function with clear ownership of quality across both entities.',
    'Comotion AI: quality embedded from the requirements stage through release readiness, governed AI-assisted test creation, increased coverage, and CI/CD quality gates producing a measurable release readiness signal.',
    "Seed Analytics: all test cases held in a test management system, with a CI/CD automation foundation (built on the group's existing Playwright standard) acting as a regression safety net.",
    'Group-wide quality metrics and release readiness reporting, visible to engineering and leadership.'
  ]);

  // ==========================================
  //  Gap Analysis: Comotion AI
  // ==========================================
  heading('Gap Analysis — Comotion AI');

  function gapTable(rows) {
    const tableHeaders = ['Area', 'Current State', 'Target State', 'Gap'];
    const colW = contentW / 4;
    const rowH = 8;

    checkPage(rowH * (rows.length + 1) + 10);
    doc.setFillColor(28, 28, 28);
    doc.rect(marginL, y, contentW, rowH, 'F');
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    tableHeaders.forEach((h, i) => {
      doc.text(h, marginL + i * colW + 4, y + 5.5);
    });
    y += rowH;

    rows.forEach((row, idx) => {
      if (idx % 2 === 0) {
        doc.setFillColor(245, 245, 245);
        doc.rect(marginL, y, contentW, rowH, 'F');
      }
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      row.forEach((cell, i) => {
        if (i === 3) {
          if (cell === 'High') {
            doc.setTextColor(...red);
            doc.setFont(undefined, 'bold');
          } else if (cell === 'Medium') {
            doc.setTextColor(...orange);
            doc.setFont(undefined, 'bold');
          }
        }
        const cellLines = doc.splitTextToSize(cell, colW - 6);
        doc.text(cellLines[0], marginL + i * colW + 4, y + 5.5);
        doc.setTextColor(...dark);
        doc.setFont(undefined, 'normal');
      });
      y += rowH;
    });
    y += 10;
  }

  gapTable([
    ['Quality Ownership', 'No dedicated QE', 'Embedded QE, req. to release', 'High'],
    ['Test Governance', 'Informal AI test growth', 'Governed AI-assisted testing', 'Medium'],
    ['Coverage', 'Good unit/component/E2E', 'Requirement-linked coverage', 'Medium'],
    ['Reporting', 'No dashboards/trend data', 'Release readiness scorecard', 'High']
  ]);

  // ==========================================
  //  Gap Analysis: Seed Analytics
  // ==========================================
  heading('Gap Analysis — Seed Analytics');
  gapTable([
    ['Automation', 'None in pipeline', 'CI/CD-integrated automation', 'High'],
    ['Test Management', 'Documents, no TMS', 'Centralised test mgmt system', 'High'],
    ['Process', 'Strict process, low quality', 'Quality embedded in process', 'Medium'],
    ['Reporting', 'No automated reporting', 'Automated reporting & visibility', 'High']
  ]);

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
  doc.text('Ready to Build a Shared QE Capability?', marginL, pageHeight - ctaH + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Contact Bosch Technologies to discuss improvement engagement options.', marginL, pageHeight - ctaH + 15);
  doc.setTextColor(...gold);
  doc.setFont(undefined, 'bold');
  doc.text('boschtechnologies.com/contact', marginL, pageHeight - ctaH + 21);

  // Save
  doc.save('Comotion-QE-Assessment-Report.pdf');
}

// Improvement Engagement PDF Generator
async function generateImprovementEngagementPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

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
    canvas.getContext('2d').drawImage(logoImg, 0, 0);
    logoDataUrl = canvas.toDataURL('image/png');
  } catch (e) { console.log('Logo skipped'); }

  function checkPage(needed) {
    if (y + needed > pageHeight - bottomMargin) { doc.addPage(); y = 20; }
  }

  function heading(text) {
    checkPage(14);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(text, marginL, y);
    y += 8;
  }

  function wrappedHeading(text) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 7 + 4);
    doc.text(lines, marginL, y);
    y += lines.length * 7 + 4;
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
    items.forEach(item => {
      const lines = doc.splitTextToSize(item, contentW - 8);
      checkPage(lines.length * 4 + 2);
      doc.text('•', marginL + 2, y);
      doc.text(lines, marginL + 8, y);
      y += lines.length * 4 + 1.5;
    });
    y += 2;
  }

  function highlightBox(text) {
    checkPage(14);
    doc.setFillColor(...gold);
    doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(255, 255, 255);
    doc.text(text, pageWidth / 2, y + 6, { align: 'center' });
    y += 16;
  }

  function newPage() { doc.addPage(); y = 20; }

  // Header
  const headerH = 60;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, 'F');
  if (logoDataUrl) {
    const logoH = 28, logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
  }
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Quality Engineering Improvement', pageWidth / 2, 38, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Prepared for Comotion (Comotion AI & Seed Analytics) by Bosch Technologies', pageWidth / 2, 46, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('5 November 2026', pageWidth / 2, 53, { align: 'center' });
  y = headerH + 10;

  // Objective
  wrappedHeading('Quality Engineering Improvement');
  subheading('Objective');
  paragraph("Stand up a single, shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, combining strategy creation with hands-on implementation: governed, requirements-to-release quality for Comotion AI's AI-assisted development practice, and a test management system plus CI/CD automation foundation for Seed Analytics.");

  // Scope, Activities, Deliverables
  subheading('Scope');
  paragraph('Development of a single Quality Engineering Test Strategy covering both Comotion AI and Seed Analytics, followed immediately by hands-on implementation of that strategy across both entities.');
  subheading('Activities');
  bulletList([
    'Stakeholder interviews across both entities (Engineering, Product, Leadership)',
    "Review of Comotion AI's existing unit, component, and Playwright end-to-end tests, and its AI-assisted test creation practice",
    "Review of Seed Analytics' delivery process, documented test cases, and pipeline",
    "Architecture review of Comotion AI's stack (Python, TypeScript, Next.js, PostgreSQL)",
    'Risk assessment for both entities',
    'Quality maturity assessment validation',
    'Define requirements-to-release quality gates for Comotion AI, including governance of AI-generated tests',
    'Test management system selection and automation framework roadmap for Seed Analytics',
    'CI/CD quality gate recommendations for both entities',
    'Release readiness scorecard framework',
    'Embed quality from requirements through release readiness at Comotion AI, increase automated coverage, and mature CI/CD quality gates',
    'Stand up a test management system at Seed Analytics and migrate documented test cases into it',
    "Build an initial CI/CD automation framework at Seed Analytics (Playwright, consistent with the group's existing standard) and integrate it as a blocking pipeline gate",
    'Group-wide test reporting dashboards and release readiness metrics'
  ]);
  subheading('Deliverables');
  bulletList([
    'Group Quality Engineering Test Strategy document, with a Comotion AI annex and a Seed Analytics annex',
    'AI-assisted test governance framework, embedded and operating for Comotion AI',
    'Test management system implemented and populated for Seed Analytics',
    'CI/CD-integrated automation framework for Seed Analytics',
    'Group-wide test reporting dashboards and release readiness scorecard',
    '6 to 12 month quality roadmap per entity'
  ]);
  subheading('Duration');
  paragraph('Initial implementation: 6 months, continuing on a monthly basis thereafter');
  subheading('Monthly Investment');
  highlightBox('R150,000 per month');

  // Business Benefits
  newPage();
  heading('Business Benefits');
  bulletList([
    'A measurable release readiness signal for Comotion AI',
    'An automated regression safety net for Seed Analytics where none exists today',
    'Governed, trustworthy AI-assisted test creation at Comotion AI',
    'Centralised, searchable test case management at Seed Analytics',
    'Group-wide quality metrics and reporting',
    'Reduced production defects and faster, safer releases across both entities'
  ]);

  // Engagement Model
  heading('Engagement Model');
  bulletList([
    'Remote-first delivery across both entities',
    "Flexible scope to match each entity's evolving needs",
    'Monthly reporting and governance at the group level',
    'Close collaboration with engineering leadership at Comotion AI and Seed Analytics'
  ]);

  // Footer CTA
  const ctaH = 24;
  if (y > pageHeight - ctaH - 10) doc.addPage();
  doc.setFillColor(28, 28, 28);
  doc.rect(0, pageHeight - ctaH, pageWidth, ctaH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Get Started?', marginL, pageHeight - ctaH + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Contact Bosch Technologies to discuss the best engagement option for your group.', marginL, pageHeight - ctaH + 15);
  doc.setTextColor(...gold);
  doc.setFont(undefined, 'bold');
  doc.text('boschtechnologies.com/contact', marginL, pageHeight - ctaH + 21);

  doc.save('Comotion-Quality-Engineering-Improvement.pdf');
}
