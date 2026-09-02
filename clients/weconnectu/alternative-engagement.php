<?php
/**
 * Private Client Proposal Page — WeConnectU Alternative Engagement
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
  <title>Alternative Engagement — WeConnectU — Bosch Technologies</title>
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
      <h1>Alternative Engagement: Test Strategy Implementation &amp; QA Recruitment</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
      <a href="/clients/weconnectu/" class="btn btn-outline" style="margin-top: 16px;">← Back to Assessment Report</a>
    </div>
  </section>

  <!-- Proposal Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Overview -->
      <div class="proposal-option-card">
        <h2>Overview</h2>

        <h3>Objective</h3>
        <p>Strengthen WeConnectU's Quality Assurance capability through hands-on implementation and the permanent placement of a dedicated Quality Assurance Engineer.</p>
        <p>This proposal presents two independent options. They can be taken separately, or Option 1 can be taken as the complete end-to-end solution, as it already includes recruitment of the permanent resource.</p>
      </div>

      <!-- Option 1 -->
      <div class="proposal-option-card">
        <h2>Option 1: Test Strategy Implementation &amp; Recruitment</h2>

        <h3>Scope</h3>
        <p>Garth (Bosch Technologies) will work directly with WeConnectU to design and implement the test strategy, stand up all automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer to take ownership at the end of the engagement.</p>
        <ul>
          <li>Design and implement a comprehensive test strategy</li>
          <li>Set up all automation test frameworks</li>
          <li>Lead quality assurance initiatives</li>
          <li>Recruit, train and upskill the newly recruited team member to take over at engagement end</li>
        </ul>

        <h3>Deliverables</h3>
        <ul>
          <li>Comprehensive test strategy document aligned with WeConnectU's needs</li>
          <li>Automated test frameworks implementation (tools, infrastructure, processes)</li>
          <li>Training and mentoring of the permanent Quality Assurance Engineering resource</li>
          <li>Documentation and best practices guides</li>
          <li>Transition plan and knowledge transfer completion</li>
        </ul>

        <h3>Key Terms</h3>
        <ul>
          <li><strong>Flexibility:</strong> Garth has the flexibility to work from anywhere and is not limited to working exclusively for WeConnectU.</li>
          <li><strong>Recruitment &amp; Transition:</strong> Before the end of the 6-month engagement, Bosch Technologies will recruit a permanent Quality Assurance Engineer for WeConnectU.</li>
          <li><strong>Knowledge Transfer:</strong> Full upskilling and handover of the test strategy and automation frameworks to the recruited permanent team member.</li>
        </ul>

        <h3>Duration</h3>
        <p>6 months</p>

        <h3>Investment</h3>
        <table class="proposal-table">
          <tbody>
            <tr><td>Monthly Fee</td><td>R100,000 per month</td></tr>
            <tr><td>Engagement Length</td><td>6 months</td></tr>
          </tbody>
        </table>

        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center; margin-top: 16px;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R600,000</span>
        </div>
      </div>

      <!-- Option 2 -->
      <div class="proposal-option-card">
        <h2>Option 2: Quality Assurance Engineer Recruitment Only</h2>

        <h3>Scope</h3>
        <p>Bosch Technologies will run a dedicated recruitment process to identify, assess and place a Quality Assurance Engineer who will be permanently employed by WeConnectU.</p>

        <h3>Position Details</h3>
        <ul>
          <li><strong>Role:</strong> Quality Assurance Engineer</li>
          <li><strong>Employment Type:</strong> Permanent, full-time at WeConnectU</li>
          <li><strong>Remuneration:</strong> Maximum of R80,000 per month</li>
          <li><strong>Benefits:</strong> Full WeConnectU employee benefits package</li>
        </ul>

        <h3>Assessment &amp; Tooling</h3>
        <ul>
          <li><strong>Technical Assessment Tool:</strong> Bosch Technologies' own HackerRank platform</li>
          <li><strong>Assessment Coverage:</strong> Technical QA competencies and AI usage proficiency</li>
          <li><strong>ATS Integration:</strong> HackerRank is integrated with WeConnectU's ATS (Workable) so candidate results are tracked in one place</li>
        </ul>

        <h3>Timeline</h3>
        <p>Approximately 45 days</p>

        <h3>Investment</h3>
        <p class="text-muted">Placement fee is payable only once the successful candidate signs the offer letter.</p>
        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center; margin-top: 16px;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R144,000</span>
        </div>
      </div>

      <!-- Investment Summary -->
      <div class="proposal-option-card">
        <h2>Investment Summary</h2>
        <table class="proposal-table">
          <thead>
            <tr><th>Option</th><th>Cost</th><th>Duration</th></tr>
          </thead>
          <tbody>
            <tr><td>Option 1 — Test Strategy Implementation &amp; Recruitment (Garth)</td><td>R100,000/month × 6 months = <strong>R600,000</strong></td><td>6 months</td></tr>
            <tr><td>Option 2 — Quality Assurance Engineer Recruitment Only</td><td><strong>R144,000</strong> on offer acceptance</td><td>~45 days</td></tr>
          </tbody>
        </table>
      </div>

      <!-- Value Proposition -->
      <div class="proposal-option-card" style="border-color: var(--accent); background: rgba(184, 150, 28, 0.05);">
        <h2>Why This Works</h2>
        <ul>
          <li><strong>Immediate quality improvement</strong> — expert-led test strategy and automation setup from day one</li>
          <li><strong>Sustainable capability</strong> — internal QA expertise built through direct mentoring and knowledge transfer</li>
          <li><strong>Permanent resource</strong> — a vetted Quality Assurance Engineer trained by the person who built the frameworks</li>
          <li><strong>Assessment rigour</strong> — HackerRank technical screening including AI usage, integrated with Workable</li>
          <li><strong>Flexibility</strong> — engagement structure optimises cost while internal capacity is built</li>
        </ul>
      </div>

      <!-- Engagement Model -->
      <div class="proposal-section">
        <h2>Engagement Model</h2>
        <ul>
          <li>Remote-first delivery, with the flexibility to work from anywhere</li>
          <li>Non-exclusive engagement for the duration of Option 1</li>
          <li>Monthly reporting and governance</li>
          <li>Close collaboration with engineering leadership</li>
        </ul>
      </div>

      <!-- Next Steps -->
      <div class="proposal-section">
        <h2>Next Steps</h2>
        <div class="process-steps" style="grid-template-columns: repeat(4, 1fr);">
          <div class="process-step">
            <h4>Review</h4>
            <p>Review and discuss the proposal details</p>
          </div>
          <div class="process-step">
            <h4>Agreement</h4>
            <p>Confirm option, timeline and start date</p>
          </div>
          <div class="process-step">
            <h4>Contracting</h4>
            <p>Finalise terms and conditions</p>
          </div>
          <div class="process-step">
            <h4>Kick-off</h4>
            <p>Start test strategy and recruitment</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="generateAlternativeEngagementPDF()" class="btn btn-primary btn-lg"><i data-lucide="file-text"></i> Download PDF Report</button>
        <a href="/clients/weconnectu/improvement-engagement.php" class="btn btn-outline btn-lg">View Improvement Engagement Options</a>
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
  async function generateAlternativeEngagementPDF() {
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
    doc.text('Alternative Engagement Proposal', pageWidth / 2, 38, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 46, { align: 'center' });
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text('2 September 2026', pageWidth / 2, 53, { align: 'center' });
    y = headerH + 10;

    // Overview
    heading('Overview');
    subheading('Objective');
    paragraph("Strengthen WeConnectU's Quality Assurance capability through hands-on implementation and the permanent placement of a dedicated Quality Assurance Engineer.");
    paragraph('This proposal presents two independent options. They can be taken separately, or Option 1 can be taken as the complete end-to-end solution, as it already includes recruitment of the permanent resource.');

    // Option 1
    heading('Option 1: Test Strategy Implementation & Recruitment');
    subheading('Scope');
    paragraph('Garth (Bosch Technologies) will work directly with WeConnectU to design and implement the test strategy, stand up all automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer to take ownership at the end of the engagement.');
    bulletList(['Design and implement a comprehensive test strategy', 'Set up all automation test frameworks', 'Lead quality assurance initiatives', 'Recruit, train and upskill the newly recruited team member to take over at engagement end']);
    subheading('Deliverables');
    bulletList(["Comprehensive test strategy document aligned with WeConnectU's needs", 'Automated test frameworks implementation (tools, infrastructure, processes)', 'Training and mentoring of the permanent Quality Assurance Engineering resource', 'Documentation and best practices guides', 'Transition plan and knowledge transfer completion']);
    subheading('Key Terms');
    bulletList(['Flexibility: Garth has the flexibility to work from anywhere and is not limited to working exclusively for WeConnectU.', 'Recruitment & Transition: Before the end of the 6-month engagement, Bosch Technologies will recruit a permanent Quality Assurance Engineer for WeConnectU.', 'Knowledge Transfer: Full upskilling and handover of the test strategy and automation frameworks to the recruited permanent team member.']);
    subheading('Duration');
    paragraph('6 months');
    subheading('Investment');
    table(null, [['Monthly Fee', 'R100,000 per month'], ['Engagement Length', '6 months']], null);
    highlightBox('Total Investment: R600,000');

    // Option 2
    newPage();
    heading('Option 2: Quality Assurance Engineer Recruitment Only');
    subheading('Scope');
    paragraph('Bosch Technologies will run a dedicated recruitment process to identify, assess and place a Quality Assurance Engineer who will be permanently employed by WeConnectU.');
    subheading('Position Details');
    bulletList(['Role: Quality Assurance Engineer', 'Employment Type: Permanent, full-time at WeConnectU', 'Remuneration: Maximum of R80,000 per month', 'Benefits: Full WeConnectU employee benefits package']);
    subheading('Assessment & Tooling');
    bulletList(["Technical Assessment Tool: Bosch Technologies' own HackerRank platform", 'Assessment Coverage: Technical QA competencies and AI usage proficiency', "ATS Integration: HackerRank is integrated with WeConnectU's ATS (Workable) so candidate results are tracked in one place"]);
    subheading('Timeline');
    paragraph('Approximately 45 days');
    subheading('Investment');
    paragraph('Placement fee is payable only once the successful candidate signs the offer letter.');
    highlightBox('Total Investment: R144,000');

    // Investment Summary
    newPage();
    heading('Investment Summary');
    table(['Option', 'Cost', 'Duration'], [
      ['Option 1 - Strategy & Recruitment', 'R600,000', '6 months'],
      ['Option 2 - Recruitment Only', 'R144,000', '~45 days']
    ], null);

    // Why This Works
    heading('Why This Works');
    bulletList([
      'Immediate quality improvement - expert-led test strategy and automation setup from day one',
      'Sustainable capability - internal QA expertise built through direct mentoring and knowledge transfer',
      'Permanent resource - a vetted Quality Assurance Engineer trained by the person who built the frameworks',
      'Assessment rigour - HackerRank technical screening including AI usage, integrated with Workable',
      'Flexibility - engagement structure optimises cost while internal capacity is built'
    ]);

    // Engagement Model
    heading('Engagement Model');
    bulletList(['Remote-first delivery, with the flexibility to work from anywhere', 'Non-exclusive engagement for the duration of Option 1', 'Monthly reporting and governance', 'Close collaboration with engineering leadership']);

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

    doc.save('WeConnectU-Alternative-Engagement-Proposal.pdf');
  }
  </script>
  <?php endif; ?>
</body>
</html>
