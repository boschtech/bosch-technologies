<?php
/**
 * Private Client Proposal Page — WeConnectU Improvement Engagement
 * Password-protected. Only accessible with the correct access code.
 */
session_start();

// ⚠️ Set the client's access code here
$access_code = 'WCU-2026-BT-PROD-CODE-001';

$authenticated = false;
$error = '';

if (isset($_SESSION['client_weconnectu_auth']) && $_SESSION['client_weconnectu_auth'] === true) {
    $authenticated = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['access_code'])) {
    if ($_POST['access_code'] === $access_code) {
        $_SESSION['client_weconnectu_auth'] = true;
        $authenticated = true;
    } else {
        $error = 'Invalid access code. Please try again.';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Improvement Engagement — WeConnectU — Bosch Technologies</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon-32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon-16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/apple-touch-icon.png">
</head>
<body>

  <!-- Navigation -->
  <nav class="navbar">
    <div class="container">
      <a href="/" class="nav-logo"><img src="/assets/images/logo.png" alt="Bosch Technologies" class="logo-img"></a>
      <ul class="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/services/automation-test-strategy.html">Services</a></li>
        <li><a href="/contact/">Contact</a></li>
      </ul>
      <button class="nav-toggle" aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>

<?php if (!$authenticated): ?>

  <!-- Access Gate -->
  <section class="service-hero">
    <div class="container">
      <span class="badge badge-accent">Private Document</span>
      <h1>Client Proposal</h1>
      <p>This document is confidential and intended for authorised recipients only.</p>
    </div>
  </section>

  <section class="section">
    <div class="container" style="max-width: 480px;">
      <div style="background: #111111; border: 1px solid #1a1a1a; border-radius: 16px; padding: 40px;">
        <h2 style="margin-bottom: 8px; text-align: center;">Enter Access Code</h2>
        <p class="text-muted" style="text-align: center; margin-bottom: 24px;">Please enter the access code provided to you by Bosch Technologies.</p>
        <?php if ($error): ?>
          <div style="padding: 12px 16px; background: rgba(192,57,43,0.08); border: 1px solid #c0392b; border-radius: 6px; color: #c0392b; font-weight: 600; font-size: 0.9rem; margin-bottom: 20px;"><?php echo $error; ?></div>
        <?php endif; ?>
        <form method="POST" class="contact-form">
          <div class="form-group">
            <label for="access_code">Access Code</label>
            <input type="password" id="access_code" name="access_code" required placeholder="Enter your access code" autofocus>
          </div>
          <button type="submit" class="btn btn-accent btn-lg" style="width: 100%; justify-content: center;">View Proposal →</button>
        </form>
      </div>
    </div>
  </section>

<?php else: ?>

  <!-- Proposal Hero -->
  <section class="service-hero" style="padding-bottom: 24px;">
    <div class="container">
      <span class="badge badge-accent">Confidential Proposal</span>
      <h1>Improvement Engagement</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
      <a href="/clients/weconnectu/" class="btn btn-outline" style="margin-top: 16px;">← Back to Assessment Report</a>
    </div>
  </section>

  <!-- Proposal Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Improvement Engagement Overview -->
      <div class="proposal-option-card">
        <h2>Improvement Engagement</h2>

        <h3>Objective</h3>
        <p>Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.</p>
        <p>The proposal outlines four engagement options depending on the level of support required.</p>
      </div>

      <!-- Option 1 -->
      <div class="proposal-option-card">
        <h2>Option 1: Test Strategy Creation Only</h2>

        <h3>Scope</h3>
        <p>Development of a comprehensive Quality Engineering and Test Strategy aligned to WeConnectU's architecture, development practices, and delivery pipeline.</p>

        <h3>Activities</h3>
        <ul>
          <li>Stakeholder interviews (Engineering, Product, Leadership)</li>
          <li>Review of current SDLC and release processes</li>
          <li>Architecture review</li>
          <li>Risk assessment</li>
          <li>Quality maturity assessment</li>
          <li>Define testing pyramid and automation strategy</li>
          <li>Define environments and test data strategy</li>
          <li>CI/CD quality gate recommendations</li>
          <li>Test reporting and metrics framework</li>
        </ul>

        <h3>Deliverables</h3>
        <ul>
          <li>Quality Engineering Test Strategy Document</li>
          <li>Automation framework recommendations</li>
          <li>Tooling recommendations</li>
          <li>Test environment strategy</li>
          <li>Release quality gate framework</li>
          <li>6 to 12 month quality roadmap</li>
        </ul>

        <h3>Duration</h3>
        <p>3 to 4 weeks</p>

        <h3>Investment</h3>
        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R240,000</span>
        </div>
      </div>

      <!-- Option 2 -->
      <div class="proposal-option-card">
        <h2>Option 2: Test Strategy + Quality Engineering Implementation Team</h2>

        <h3>Scope</h3>
        <p>Creation of the test strategy and deployment of a Quality Engineering team to implement it.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Automation framework implementation</li>
          <li>CI/CD integration</li>
          <li>API testing framework</li>
          <li>UI automation framework</li>
          <li>Test reporting dashboards</li>
          <li>Integration test strategy</li>
          <li>Quality engineering process implementation</li>
          <li>Mentoring development teams</li>
        </ul>

        <h3>Suggested Team</h3>
        <ul>
          <li>1 Quality Engineering Lead</li>
          <li>1 Quality Automation Engineer</li>
          <li>1 Quality Engineer</li>
        </ul>

        <h3>Duration</h3>
        <p>Initial implementation: 4 to 6 months</p>

        <h3>Monthly Investment</h3>
        <table class="proposal-table">
          <thead>
            <tr><th>Role</th><th>Monthly Cost</th></tr>
          </thead>
          <tbody>
            <tr><td>Quality Engineering Lead</td><td>R120,000</td></tr>
            <tr><td>Quality Automation Engineer</td><td>R95,000</td></tr>
            <tr><td>Quality Engineer</td><td>R75,000</td></tr>
          </tbody>
          <tfoot>
            <tr><td><strong>Total Monthly Cost</strong></td><td><strong>R290,000 per month</strong></td></tr>
          </tfoot>
        </table>

        <h3>Estimated 6-Month Investment</h3>
        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R1,740,000</span>
        </div>
      </div>

      <!-- Option 3 -->
      <div class="proposal-option-card">
        <h2>Option 3: Test Strategy + Upskill Existing Team</h2>

        <h3>Scope</h3>
        <p>Create the test strategy and train existing developers or testers to adopt Quality Engineering practices.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Quality engineering workshops</li>
          <li>Automation training</li>
          <li>CI/CD testing integration</li>
          <li>Coaching during implementation</li>
          <li>Code review for automation</li>
          <li>Testing best practices training</li>
        </ul>

        <h3>Deliverables</h3>
        <ul>
          <li>Test Strategy</li>
          <li>Training sessions</li>
          <li>Automation framework templates</li>
          <li>3 months of coaching support</li>
        </ul>

        <h3>Duration</h3>
        <p>8 to 10 weeks</p>

        <h3>Investment</h3>
        <table class="proposal-table">
          <tbody>
            <tr><td>Strategy Creation</td><td>R240,000</td></tr>
            <tr><td>Training & Coaching</td><td>R180,000</td></tr>
          </tbody>
        </table>

        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center; margin-top: 16px;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R420,000</span>
        </div>
      </div>

      <!-- Option 4 -->
      <div class="proposal-option-card">
        <h2>Option 4: Test Strategy + Recruitment of a Quality Engineering Team</h2>

        <h3>Scope</h3>
        <p>Creation of the test strategy and recruitment of a permanent Quality Engineering team for WeConnectU.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Define QA organisational structure</li>
          <li>Define job descriptions</li>
          <li>Candidate screening and technical interviews</li>
          <li>Hiring recommendations</li>
          <li>Onboarding guidance</li>
        </ul>

        <h3>Suggested Team Structure</h3>
        <ul>
          <li>Quality Engineering Lead</li>
          <li>Quality Automation Engineers</li>
          <li>Quality Engineer</li>
        </ul>

        <h3>Recruitment Fees</h3>
        <table class="proposal-table">
          <thead>
            <tr><th>Role</th><th>Placement Fee</th></tr>
          </thead>
          <tbody>
            <tr><td>Lead Quality Engineer</td><td>R120,000</td></tr>
            <tr><td>Quality Automation Engineer</td><td>R90,000</td></tr>
            <tr><td>Quality Engineer</td><td>R70,000</td></tr>
          </tbody>
        </table>

        <h3>Example Recruitment Cost (3 hires)</h3>
        <p>1 Lead Quality Engineer, 1 Quality Automation Engineer, 1 Quality Engineer</p>
        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center; margin-top: 16px;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R520,000</span>
        </div>
      </div>

      <!-- Recommended Engagement -->
      <div class="proposal-option-card" style="border-color: var(--accent); background: rgba(184, 150, 28, 0.05);">
        <h2>Recommended Engagement</h2>
        <p>For organisations with limited current quality function, we recommend:</p>
        <div class="proposal-highlight" style="margin-top: 16px;">Option 2: Strategy + Implementation Team</div>
        <p style="margin-top: 16px;">This approach ensures the strategy is not only defined but successfully embedded into the engineering culture and delivery pipeline.</p>
      </div>

      <!-- Business Benefits -->
      <div class="proposal-section">
        <h2>Business Benefits</h2>
        <ul>
          <li>Reduced production defects</li>
          <li>Faster and safer releases</li>
          <li>Improved engineering productivity</li>
          <li>Automation-driven testing</li>
          <li>Clear quality metrics and reporting</li>
          <li>Scalable engineering processes</li>
        </ul>
      </div>

      <!-- Engagement Model -->
      <div class="proposal-section">
        <h2>Engagement Model</h2>
        <ul>
          <li>Remote-first delivery</li>
          <li>Flexible scaling of engineering resources</li>
          <li>Monthly reporting and governance</li>
          <li>Close collaboration with engineering leadership</li>
        </ul>
      </div>

      <!-- Next Steps -->
      <div class="proposal-section">
        <h2>Next Steps</h2>
        <div class="process-steps" style="grid-template-columns: repeat(4, 1fr);">
          <div class="process-step">
            <h4>Discovery</h4>
            <p>Initial discovery session</p>
          </div>
          <div class="process-step">
            <h4>Agreement</h4>
            <p>Agreement on engagement option</p>
          </div>
          <div class="process-step">
            <h4>Kick-off</h4>
            <p>Kick-off workshop</p>
          </div>
          <div class="process-step">
            <h4>Delivery</h4>
            <p>Delivery roadmap execution</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="generateImprovementEngagementPDF()" class="btn btn-primary btn-lg"><i data-lucide="file-text"></i> Download PDF Report</button>
        <a href="/clients/weconnectu/" class="btn btn-outline btn-lg">← Back to Assessment Report</a>
        <a href="/contact/" class="btn btn-accent btn-lg">Get in Touch to Discuss →</a>
      </div>

    </div>
  </section>

<?php endif; ?>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="/" class="nav-logo"><img src="/assets/images/logo.png" alt="Bosch Technologies" class="logo-img"></a>
          <p>Helping software teams ship faster with fewer defects through smart automation and expert quality engineering.</p>
        </div>
        <div>
          <h4>Services</h4>
          <ul>
            <li><a href="/services/automation-test-strategy.html">Automation Test Strategy</a></li>
            <li><a href="/services/quality-engineering.html">Quality Engineering</a></li>
            <li><a href="/services/training.html">Training & Enablement</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="/maturity-model/">Maturity Model</a></li>
            <li><a href="/assessment/">Free Assessment</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="/contact/">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Bosch Technologies. All rights reserved. This document is confidential.</p>
      </div>
    </div>
  </footer>

  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="/js/main.js"></script>
  <script>lucide.createIcons();</script>
  <?php if ($authenticated): ?>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
  <script>
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

    function table(headers, rows, footerRow) {
      const cols = headers ? headers.length : rows[0].length;
      const colW = contentW / cols;
      const rowH = 8;
      if (headers) {
        checkPage(rowH + 2);
        doc.setFillColor(28, 28, 28);
        doc.rect(marginL, y, contentW, rowH, 'F');
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        headers.forEach((h, i) => doc.text(h, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      }
      rows.forEach((row, idx) => {
        checkPage(rowH + 2);
        if (idx % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(marginL, y, contentW, rowH, 'F');
        }
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...dark);
        row.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      });
      if (footerRow) {
        checkPage(rowH + 2);
        doc.setFillColor(28, 28, 28);
        doc.rect(marginL, y, contentW, rowH, 'F');
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...gold);
        footerRow.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      }
      y += 4;
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
    doc.text('Improvement Engagement Proposal', pageWidth / 2, 38, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 46, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('27 March 2026', pageWidth / 2, 53, { align: 'center' });
    y = headerH + 10;

    // Objective
    heading('Improvement Engagement');
    subheading('Objective');
    paragraph('Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.');
    paragraph('The proposal outlines four engagement options depending on the level of support required.');

    // Option 1
    heading('Option 1: Test Strategy Creation Only');
    subheading('Scope');
    paragraph("Development of a comprehensive Quality Engineering and Test Strategy aligned to WeConnectU's architecture, development practices, and delivery pipeline.");
    subheading('Activities');
    bulletList(['Stakeholder interviews (Engineering, Product, Leadership)', 'Review of current SDLC and release processes', 'Architecture review', 'Risk assessment', 'Quality maturity assessment', 'Define testing pyramid and automation strategy', 'Define environments and test data strategy', 'CI/CD quality gate recommendations', 'Test reporting and metrics framework']);
    subheading('Deliverables');
    bulletList(['Quality Engineering Test Strategy Document', 'Automation framework recommendations', 'Tooling recommendations', 'Test environment strategy', 'Release quality gate framework', '6 to 12 month quality roadmap']);
    subheading('Duration');
    paragraph('3 to 4 weeks');
    subheading('Investment');
    highlightBox('R240,000');

    // Option 2
    newPage();
    heading('Option 2: Test Strategy + QE Implementation Team');
    subheading('Scope');
    paragraph('Creation of the test strategy and deployment of a Quality Engineering team to implement it.');
    subheading('Activities');
    paragraph('Everything in Option 1 plus:');
    bulletList(['Automation framework implementation', 'CI/CD integration', 'API testing framework', 'UI automation framework', 'Test reporting dashboards', 'Integration test strategy', 'Quality engineering process implementation', 'Mentoring development teams']);
    subheading('Suggested Team');
    bulletList(['1 Quality Engineering Lead', '1 Quality Automation Engineer', '1 Quality Engineer']);
    subheading('Duration');
    paragraph('Initial implementation: 4 to 6 months');
    subheading('Monthly Investment');
    table(['Role', 'Monthly Cost'], [['Quality Engineering Lead', 'R120,000'], ['Quality Automation Engineer', 'R95,000'], ['Quality Engineer', 'R75,000']], ['Total Monthly Cost', 'R290,000 per month']);
    subheading('Estimated 6-Month Investment');
    highlightBox('R1,740,000');

    // Option 3
    newPage();
    heading('Option 3: Test Strategy + Upskill Existing Team');
    subheading('Scope');
    paragraph('Create the test strategy and train existing developers or testers to adopt Quality Engineering practices.');
    subheading('Activities');
    paragraph('Everything in Option 1 plus:');
    bulletList(['Quality engineering workshops', 'Automation training', 'CI/CD testing integration', 'Coaching during implementation', 'Code review for automation', 'Testing best practices training']);
    subheading('Deliverables');
    bulletList(['Test Strategy', 'Training sessions', 'Automation framework templates', '3 months of coaching support']);
    subheading('Duration');
    paragraph('8 to 10 weeks');
    subheading('Investment');
    table(null, [['Strategy Creation', 'R240,000'], ['Training & Coaching', 'R180,000']], null);
    subheading('Total Investment');
    highlightBox('R420,000');

    // Option 4
    newPage();
    heading('Option 4: Test Strategy + Recruitment');
    subheading('Scope');
    paragraph('Creation of the test strategy and recruitment of a permanent Quality Engineering team for WeConnectU.');
    subheading('Activities');
    paragraph('Everything in Option 1 plus:');
    bulletList(['Define QA organisational structure', 'Define job descriptions', 'Candidate screening and technical interviews', 'Hiring recommendations', 'Onboarding guidance']);
    subheading('Suggested Team Structure');
    bulletList(['Quality Engineering Lead', 'Quality Automation Engineers', 'Quality Engineer']);
    subheading('Recruitment Fees');
    table(['Role', 'Placement Fee'], [['Lead Quality Engineer', 'R120,000'], ['Quality Automation Engineer', 'R90,000'], ['Quality Engineer', 'R70,000']], null);
    subheading('Example Recruitment Cost (3 hires)');
    paragraph('1 Lead Quality Engineer, 1 Quality Automation Engineer, 1 Quality Engineer');
    highlightBox('Total Investment: R520,000');

    // Recommendation
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

    // Business Benefits
    heading('Business Benefits');
    bulletList(['Reduced production defects', 'Faster and safer releases', 'Improved engineering productivity', 'Automation-driven testing', 'Clear quality metrics and reporting', 'Scalable engineering processes']);

    // Engagement Model
    heading('Engagement Model');
    bulletList(['Remote-first delivery', 'Flexible scaling of engineering resources', 'Monthly reporting and governance', 'Close collaboration with engineering leadership']);

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
    doc.text('Contact Bosch Technologies to discuss the best engagement option for your team.', marginL, pageHeight - ctaH + 15);
    doc.setTextColor(...gold);
    doc.setFont(undefined, 'bold');
    doc.text('boschtechnologies.com/contact', marginL, pageHeight - ctaH + 21);

    doc.save('WeConnectU-Improvement-Engagement-Proposal.pdf');
  }
  </script>
  <?php endif; ?>
</body>
</html>
