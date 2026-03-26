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
      <span class="badge badge-accent">Confidential Assessment Report</span>
      <h1>Quality Engineering Assessment: Findings & Improvement Opportunities</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
      <p class="text-muted">27 March 2026</p>
    </div>
  </section>

  <!-- Assessment Report Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Executive Summary -->
      <div class="proposal-option-card">
        <h2>Executive Summary</h2>

        <h3>Current State</h3>
        <ul>
          <li>Quality Engineering practices are largely manual and reactive.</li>
          <li>Limited integration between testing and delivery pipelines. Small amount of Unit Test within the CICD pipelines.</li>
          <li>Quality risks are identified late in the development lifecycle.</li>
          <li>Testing is heavily dependent on Quality Engineers with a lot of domain knowledge.</li>
          <li>No structured onboarding and upskilling programs for new employees.</li>
        </ul>

        <h3>Business Impact</h3>
        <ul>
          <li>Slower release cycles impacting time-to-market.</li>
          <li>Increased production risk due to late defect detection.</li>
          <li>Higher cost of rework and defect resolution.</li>
          <li>Very high risk of Intellectual Property loss if any of the Quality Engineers leave the company.</li>
        </ul>

        <h3>Recommendation</h3>
        <ul>
          <li>Implement a structured Quality Engineering Test Strategy.</li>
          <li>Focus on automation testing, shift-left testing, and CI/CD integration.</li>
          <li>Continuous upskilling of Development and Quality Engineers on domain knowledge.</li>
        </ul>
      </div>

      <!-- Engagement Objectives -->
      <div class="proposal-option-card">
        <h2>Engagement Objectives</h2>
        <ul>
          <li>Assess current QE processes, tools, and capabilities.</li>
          <li>Identify risks impacting delivery speed and product quality.</li>
          <li>Define a scalable and modern QE operating model.</li>
          <li>Provide a practical roadmap for transformation.</li>
        </ul>
      </div>

      <!-- Current State Overview -->
      <div class="proposal-option-card">
        <h2>Current State Overview</h2>

        <h3>Test Strategy</h3>
        <ul>
          <li>Heavily dependence on manual testing with domain experts.</li>
          <li>Regression testing efforts are a lot hence the team identified a resource capacity issue.</li>
          <li>Development Test Environment (DTA) creates inconsistency in testing specific features.</li>
        </ul>

        <h3>Automation</h3>
        <ul>
          <li>Developers started writing unit tests. The code coverage is very low.</li>
          <li>There is no integration tests.</li>
          <li>There are some Selenium UI automation tests but this is not integrated into the CICD pipelines.</li>
        </ul>

        <h3>CI/CD Integration</h3>
        <ul>
          <li>Only a low percentage of Unit tests are integrated into delivery pipelines, nothing else.</li>
        </ul>

        <h3>Environments</h3>
        <ul>
          <li>Staging environment is closely aligned with the Production environment.</li>
          <li>The DEV environment can become inconsistent when features are deployed by multiple teams.</li>
        </ul>

        <h3>Test Data</h3>
        <ul>
          <li>Manual and not centrally managed.</li>
        </ul>
      </div>

      <!-- Key Findings -->
      <div class="proposal-option-card">
        <h2>Key Findings</h2>
        <ul>
          <li>Limited automation is creating a regression bottleneck.</li>
          <li>Testing occurs late in the lifecycle, increasing defect leakage risk.</li>
          <li>Lack of standardised QE Test Strategy.</li>
          <li>Manual regression cycles are slowing release velocity.</li>
          <li>Limited visibility into quality metrics and reporting. Only manual test cases on the test management tool.</li>
        </ul>
      </div>

      <!-- Business Impact -->
      <div class="proposal-option-card">
        <h2>Business Impact</h2>
        <ul>
          <li>Regression cycles delay releases by multiple days per cycle.</li>
          <li>Late defect detection significantly increases cost of fixes.</li>
          <li>Lack of automation limits scalability of delivery.</li>
          <li>Inconsistent environments increase production risk.</li>
          <li>Reduced confidence in release quality, because with manual testing it becomes impossible to do regression testing for every release.</li>
        </ul>
      </div>

      <!-- QE Maturity Position -->
      <div class="proposal-option-card">
        <h2>QE Maturity Position</h2>
        <p class="text-muted">Refer to the <strong>Bosch-Maturity-Assessment-WeConnectU.pdf</strong> for detailed maturity assessment data.</p>
      </div>

      <!-- Target State Vision -->
      <div class="proposal-option-card">
        <h2>Target State Vision</h2>
        <ul>
          <li>Automated regression fully integrated into CI/CD pipelines.</li>
          <li>Shift-left testing embedded within development workflows.</li>
          <li>Stable, production-like environments.</li>
          <li>Scalable and reusable automation frameworks.</li>
          <li>Real-time quality metrics and visibility.</li>
        </ul>
      </div>

      <!-- Gap Analysis -->
      <div class="proposal-option-card">
        <h2>Gap Analysis</h2>
        <table class="proposal-table">
          <thead>
            <tr><th>Area</th><th>Current State</th><th>Target State</th><th>Gap</th></tr>
          </thead>
          <tbody>
            <tr><td>Automation</td><td>Limited</td><td>CI/CD Integrated</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
            <tr><td>Test Strategy</td><td>Informal</td><td>Standardised</td><td><span style="color: #f39c12; font-weight: 600;">Medium</span></td></tr>
            <tr><td>Environments</td><td>Unstable</td><td>Reliable</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
            <tr><td>Test Data</td><td>Manual</td><td>Managed</td><td><span style="color: #f39c12; font-weight: 600;">Medium</span></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Link to Improvement Engagement -->
      <div class="proposal-option-card" style="border-color: var(--accent); background: rgba(184, 150, 28, 0.05); text-align: center;">
        <h2>Ready to Transform Your QE Practice?</h2>
        <p>Based on our assessment findings, we have prepared a detailed Improvement Engagement proposal with multiple options tailored to WeConnectU's needs.</p>
        <a href="/clients/weconnectu/improvement-engagement.php" class="btn btn-accent btn-lg" style="margin-top: 16px;">View Improvement Engagement Options →</a>
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
