<?php
/**
 * Private Client Proposal Page — WeConnectU
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
  <title>Proposal for WeConnectU — Bosch Technologies</title>
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
      <h1>Quality Engineering Process Discovery, Skill Assessment & Improvement Proposal</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
    </div>
  </section>

  <!-- Proposal Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Section 1: Understand Quality Engineering Process and High-level Measure of QE Skill Level -->
      <div class="proposal-option-card">
        <h2>Understand Quality Engineering Process & Assess Skill Level</h2>

        <h3>Objective</h3>
        <p>Gain a thorough understanding of the current Quality Engineering processes in place and conduct a high-level assessment of the QE team's skill levels. This discovery phase will provide the foundation for identifying gaps, strengths, and areas of improvement.</p>

        <h3>Activities</h3>
        <ul>
          <li><strong>Meeting the Team</strong> — Introductory sessions with the Quality Engineering team members to understand roles, responsibilities, and current ways of working.</li>
          <li><strong>Stakeholder Engagement</strong> — Conduct 1-hour meetings over 5 consecutive days with important stakeholders across Engineering, Product, and Leadership to gather insights into the current QE process, challenges, and expectations.</li>
        </ul>

        <h3>Outcomes</h3>
        <ul>
          <li>A comprehensive report detailing all findings from the Quality Engineering Process Discovery.</li>
          <li>A High-level Measure of QE Skill Levels across the team, highlighting current capabilities, skill gaps, and recommendations.</li>
        </ul>

        <h3>Investment</h3>
        <div class="proposal-highlight">R7,000</div>
      </div>

      <!-- Section 2: Improvement Engagement -->
      <div class="proposal-option-card">
        <h2>Improvement Engagement</h2>

        <h3>Overview</h3>
        <p>Detailed information regarding the Improvement Engagement will be provided after the Quality Engineering Process & Assess Skill Level engagement has been concluded.</p>
        <p>The findings and recommendations from the discovery phase will directly inform the scope, activities, and investment required for the improvement engagement, ensuring a tailored approach that addresses the specific needs identified during the assessment.</p>
      </div>

      <!-- Next Steps -->
      <div class="proposal-section">
        <h2>Next Steps</h2>
        <div class="process-steps" style="grid-template-columns: repeat(3, 1fr);">
          <div class="process-step">
            <h4>Discovery</h4>
            <p>5-day stakeholder engagement and team assessment</p>
          </div>
          <div class="process-step">
            <h4>Report</h4>
            <p>Delivery of QE Process and Skill Level findings</p>
          </div>
          <div class="process-step">
            <h4>Improvement</h4>
            <p>Tailored improvement engagement proposal</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button onclick="generateProposalPDF()" class="btn btn-primary btn-lg"><i data-lucide="download"></i> Download PDF</button>
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
  <script src="/js/proposal-pdf-weconnectu.js"></script>
  <?php endif; ?>
</body>
</html>
