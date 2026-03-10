/* ============================================
   BOSCH TECHNOLOGIES — Proposal PDF Generator
   Generates a branded PDF of the client proposal
   using jsPDF (same style as the maturity assessment)
   ============================================ */

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

  // --- Helper: highlight box ---
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

  // --- Helper: table ---
  function table(headers, rows, footerRow) {
    var cols = headers ? headers.length : (rows[0] ? rows[0].length : 2);
    var colW = contentW / cols;
    var rowH = 8;

    // Header
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

    // Body
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

    // Footer
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

  // --- Helper: start a new page ---
  function newPage() {
    doc.addPage();
    y = 20;
  }

  // ==========================================
  //  PAGE 1: Header
  // ==========================================
  var headerH = 60;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, 'F');

  if (logoDataUrl) {
    var logoH = 28;
    var logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont(undefined, 'bold');
  doc.text('Quality Engineering & Testing Transformation', pageWidth / 2, 38, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Prepared for TooMuchWifi by Bosch Technologies', pageWidth / 2, 46, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(new Date().toLocaleDateString('en-GB'), pageWidth / 2, 53, { align: 'center' });

  y = headerH + 10;

  // ==========================================
  //  Objective
  // ==========================================
  heading('Objective');
  paragraph('Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.');
  paragraph('The proposal outlines four engagement options depending on the level of support required.');

  // ==========================================
  //  Option 1
  // ==========================================
  heading('Option 1: Test Strategy Creation Only');

  subheading('Scope');
  paragraph("Development of a comprehensive Quality Engineering and Test Strategy aligned to the client's architecture, development practices, and delivery pipeline.");

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
  highlightBox('R240,000');

  // ==========================================
  //  Option 2 (new page)
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
  highlightBox('R2,310,000');

  // ==========================================
  //  Option 3 (new page)
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
  //  Option 4 (new page)
  // ==========================================
  newPage();
  heading('Option 4: Test Strategy + Recruitment of a Quality Engineering Team');

  subheading('Scope');
  paragraph('Creation of the test strategy and recruitment of a permanent Quality Engineering team for the client.');

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
      ['QA Lead', 'R120,000'],
      ['Automation Engineer', 'R90,000'],
      ['QA Analyst', 'R70,000']
    ],
    null
  );

  subheading('Example Recruitment Cost (4 hires)');
  paragraph('1 Lead Quality Engineer, 2 Quality Automation Engineers, 1 Quality Engineer');
  highlightBox('Total Investment: R520,000');

  // ==========================================
  //  Recommendation (new page)
  // ==========================================
  newPage();
  heading('Recommended Engagement');
  paragraph('For organisations with no current quality function, we recommend:');
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
  heading('Next Steps');
  var steps = ['Discovery — Initial discovery session', 'Agreement — Agreement on engagement option', 'Kick-off — Kick-off workshop', 'Delivery — Delivery roadmap execution'];
  var stepW = contentW / 4;
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
    doc.text(parts[1], sx + stepW / 2, y + 13, { align: 'center' });
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
  doc.save('Bosch-Technologies-Proposal-TooMuchWifi.pdf');
}
