<?php
/**
 * Private Client Proposal Page — Comotion Improvement Engagement
 * Password-protected. Only accessible with the correct access code.
 */
session_start();

// ⚠️ Set the client's access code here
$access_code = 'CMT-2026-BT-PROD-CODE-001';

$authenticated = false;
$error = '';

if (isset($_SESSION['client_comotion_auth']) && $_SESSION['client_comotion_auth'] === true) {
    $authenticated = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['access_code'])) {
    if ($_POST['access_code'] === $access_code) {
        $_SESSION['client_comotion_auth'] = true;
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
  <title>Improvement Engagement — Comotion — Bosch Technologies</title>
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
      <p>Prepared for <strong>Comotion</strong> — covering <strong>Comotion AI</strong> and <strong>Seed Analytics</strong> — by Bosch Technologies</p>
      <a href="/clients/comotion/" class="btn btn-outline" style="margin-top: 16px;">← Back to Assessment Report</a>
    </div>
  </section>

  <!-- Proposal Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Improvement Engagement Overview -->
      <div class="proposal-option-card">
        <h2>Improvement Engagement</h2>

        <h3>Objective</h3>
        <p>Stand up a single, shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, with a strategy and delivery plan tailored to each entity's starting point: governed, requirements-to-release quality for Comotion AI's AI-assisted development practice, and a test management system plus CI/CD automation foundation for Seed Analytics.</p>
        <p>The proposal outlines four engagement options depending on the level of support required.</p>
      </div>

      <!-- Option 1 -->
      <div class="proposal-option-card">
        <h2>Option 1: Shared Test Strategy Creation</h2>

        <h3>Scope</h3>
        <p>Development of a single Quality Engineering Test Strategy covering both Comotion AI and Seed Analytics, with a company-specific execution plan for each.</p>

        <h3>Activities</h3>
        <ul>
          <li>Stakeholder interviews across both entities (Engineering, Product, Leadership)</li>
          <li>Review of Comotion AI's existing unit, component, and Playwright end-to-end tests, and its AI-assisted test creation practice</li>
          <li>Review of Seed Analytics' delivery process, documented test cases, and pipeline</li>
          <li>Architecture review of Comotion AI's stack (Python, TypeScript, Next.js, PostgreSQL)</li>
          <li>Risk assessment for both entities</li>
          <li>Quality maturity assessment validation</li>
          <li>Define requirements-to-release quality gates for Comotion AI, including governance of AI-generated tests</li>
          <li>Test management system selection and automation framework roadmap for Seed Analytics</li>
          <li>CI/CD quality gate recommendations for both entities</li>
          <li>Release readiness scorecard framework</li>
        </ul>

        <h3>Deliverables</h3>
        <ul>
          <li>Group Quality Engineering Test Strategy document, with a Comotion AI annex and a Seed Analytics annex</li>
          <li>AI-assisted test governance framework for Comotion AI</li>
          <li>Test management system recommendation and automation framework for Seed Analytics</li>
          <li>Release readiness scorecard</li>
          <li>6 to 12 month quality roadmap per entity</li>
        </ul>

        <h3>Duration</h3>
        <p>4 to 5 weeks</p>

        <h3>Investment</h3>
        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R280,000</span>
        </div>
      </div>

      <!-- Option 2 -->
      <div class="proposal-option-card">
        <h2>Option 2: Test Strategy + Shared Quality Engineering Implementation Team</h2>

        <h3>Scope</h3>
        <p>Creation of the group test strategy and deployment of a shared Quality Engineering team to implement it across both entities.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Comotion AI: embed quality from requirements through release readiness, increase automated coverage, mature CI/CD quality gates, and govern the quality of AI-generated tests</li>
          <li>Seed Analytics: stand up a test management system and migrate documented test cases into it</li>
          <li>Seed Analytics: build an initial CI/CD automation framework (Playwright, consistent with the group's existing standard) and integrate it as a blocking pipeline gate</li>
          <li>Group-wide test reporting dashboards and release readiness metrics</li>
          <li>Mentoring of both engineering teams</li>
        </ul>

        <h3>Suggested Team</h3>
        <ul>
          <li>1 Quality Engineering Lead (group-wide)</li>
          <li>1 Quality Automation Engineer (primarily Seed Analytics automation build-out)</li>
          <li>1 Quality Engineer (primarily Comotion AI quality governance and coverage)</li>
        </ul>

        <h3>Duration</h3>
        <p>Initial implementation: 6 months</p>

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
        <h2>Option 3: Test Strategy + Upskill Existing Teams</h2>

        <h3>Scope</h3>
        <p>Create the group test strategy and train both existing teams to adopt the quality practices relevant to their starting point.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Comotion AI: workshops on embedding quality from requirements, governing AI-assisted test creation, and increasing coverage</li>
          <li>Seed Analytics: automation training for manual testers, and onboarding onto a new test management system</li>
          <li>CI/CD testing integration for Seed Analytics</li>
          <li>Coaching during implementation for both teams</li>
          <li>Code review for automation</li>
          <li>Testing best practices training</li>
        </ul>

        <h3>Deliverables</h3>
        <ul>
          <li>Group Test Strategy</li>
          <li>Training sessions for both teams</li>
          <li>Automation framework templates</li>
          <li>Test management system setup guidance for Seed Analytics</li>
          <li>3 months of coaching support</li>
        </ul>

        <h3>Duration</h3>
        <p>10 to 12 weeks</p>

        <h3>Investment</h3>
        <table class="proposal-table">
          <tbody>
            <tr><td>Strategy Creation</td><td>R280,000</td></tr>
            <tr><td>Training & Coaching</td><td>R220,000</td></tr>
          </tbody>
        </table>

        <div style="background: #1a1a1a; border: 2px solid #b8961c; border-radius: 8px; padding: 20px 32px; text-align: center; margin-top: 16px;">
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R500,000</span>
        </div>
      </div>

      <!-- Option 4 -->
      <div class="proposal-option-card">
        <h2>Option 4: Test Strategy + Recruitment of a Shared Quality Engineering Team</h2>

        <h3>Scope</h3>
        <p>Creation of the group test strategy and recruitment of a permanent Quality Engineering team serving both Comotion AI and Seed Analytics.</p>

        <h3>Activities</h3>
        <p>Everything in Option 1 plus:</p>
        <ul>
          <li>Define QE organisational structure for the group</li>
          <li>Define job descriptions</li>
          <li>Candidate screening and technical interviews</li>
          <li>Hiring recommendations</li>
          <li>Onboarding guidance covering both entities</li>
        </ul>

        <h3>Suggested Team Structure</h3>
        <ul>
          <li>Quality Engineering Lead</li>
          <li>Quality Automation Engineer</li>
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
          <span style="color: #b8961c; font-size: 1.5rem; font-weight: 700;">Total Investment: R280,000</span>
        </div>
      </div>

      <!-- Recommended Engagement -->
      <div class="proposal-option-card" style="border-color: var(--accent); background: rgba(184, 150, 28, 0.05);">
        <h2>Recommended Engagement</h2>
        <p>With Comotion AI needing governance embedded into an existing practice, and Seed Analytics needing automation and tooling built from scratch, we recommend:</p>
        <div class="proposal-highlight" style="margin-top: 16px;">Option 2: Strategy + Shared Implementation Team</div>
        <p style="margin-top: 16px;">This approach ensures the strategy is not only defined but successfully embedded into both engineering cultures and delivery pipelines, with one team accountable for quality across the group.</p>
      </div>

      <!-- Business Benefits -->
      <div class="proposal-section">
        <h2>Business Benefits</h2>
        <ul>
          <li>A measurable release readiness signal for Comotion AI</li>
          <li>An automated regression safety net for Seed Analytics where none exists today</li>
          <li>Governed, trustworthy AI-assisted test creation at Comotion AI</li>
          <li>Centralised, searchable test case management at Seed Analytics</li>
          <li>Group-wide quality metrics and reporting</li>
          <li>Reduced production defects and faster, safer releases across both entities</li>
        </ul>
      </div>

      <!-- Engagement Model -->
      <div class="proposal-section">
        <h2>Engagement Model</h2>
        <ul>
          <li>Remote-first delivery across both entities</li>
          <li>Flexible scaling of engineering resources as each entity's needs evolve</li>
          <li>Monthly reporting and governance at the group level</li>
          <li>Close collaboration with engineering leadership at Comotion AI and Seed Analytics</li>
        </ul>
      </div>

      <!-- Next Steps -->
      <div class="proposal-section">
        <h2>Next Steps</h2>
        <div class="process-steps" style="grid-template-columns: repeat(4, 1fr);">
          <div class="process-step">
            <h4>Discovery</h4>
            <p>Initial discovery session with both entities</p>
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
        <a href="/clients/comotion/" class="btn btn-outline btn-lg">← Back to Assessment Report</a>
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
  <script src="/js/proposal-pdf-comotion.js"></script>
  <?php endif; ?>
</body>
</html>
