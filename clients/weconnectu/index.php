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
        <div class="proposal-highlight">R240,000</div>
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
          <li>2 Automation Engineers</li>
          <li>1 QA Analyst</li>
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
            <tr><td>Quality Automation Engineer (x2)</td><td>R95,000 each</td></tr>
            <tr><td>Quality Engineer</td><td>R75,000</td></tr>
          </tbody>
          <tfoot>
            <tr><td><strong>Total Monthly Cost</strong></td><td><strong>R385,000 per month</strong></td></tr>
          </tfoot>
        </table>

        <h3>Estimated 6-Month Investment</h3>
        <div class="proposal-highlight">R2,310,000</div>
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
          <tfoot>
            <tr><td><strong>Total Investment</strong></td><td><strong>R420,000</strong></td></tr>
          </tfoot>
        </table>
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
        <div class="proposal-highlight">Total Investment: R520,000</div>
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
