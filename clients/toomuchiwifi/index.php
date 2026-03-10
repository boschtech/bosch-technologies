<?php
/**
 * Private Client Proposal Page — TooMuchWifi
 * Password-protected. Only accessible with the correct access code.
 */
session_start();

// ⚠️ Set the client's access code here
$access_code = 'TMW-2026-BT-PROD-CODE-001';

$authenticated = false;
$error = '';

if (isset($_SESSION['client_toomuchiwifi_auth']) && $_SESSION['client_toomuchiwifi_auth'] === true) {
    $authenticated = true;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['access_code'])) {
    if ($_POST['access_code'] === $access_code) {
        $_SESSION['client_toomuchiwifi_auth'] = true;
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
  <title>Proposal for TooMuchWifi — Bosch Technologies</title>
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
      <h1>Quality Engineering &amp; Testing Transformation</h1>
      <p>Prepared for <strong>TooMuchWifi</strong> by Bosch Technologies</p>
    </div>
  </section>

  <!-- Proposal Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Objective -->
      <div class="proposal-section">
        <h2>Objective</h2>
        <p>Establish a structured Quality Engineering capability that enables reliable software delivery, improved release confidence, and reduced production defects.</p>
        <p>The proposal outlines four engagement options depending on the level of support required.</p>
      </div>

      <!-- Option 1 -->
      <div class="proposal-option-card">
        <h2>Option 1: Test Strategy Creation Only</h2>

        <h3>Scope</h3>
        <p>Development of a comprehensive Quality Engineering and Test Strategy aligned to the client's architecture, development practices, and delivery pipeline.</p>

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
            <tr><td>Training &amp; Coaching</td><td>R180,000</td></tr>
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
        <p>Creation of the test strategy and recruitment of a permanent Quality Engineering team for the client.</p>

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
            <tr><td>QA Lead</td><td>R120,000</td></tr>
            <tr><td>Automation Engineer</td><td>R90,000</td></tr>
            <tr><td>QA Analyst</td><td>R70,000</td></tr>
          </tbody>
        </table>

        <h3>Example Recruitment Cost (4 hires)</h3>
        <p>1 Lead Quality Engineer, 2 Quality Automation Engineers, 1 Quality Engineer</p>
        <div class="proposal-highlight">Total Investment: R520,000</div>
      </div>

      <!-- Recommendation -->
      <div class="proposal-section">
        <h2>Recommended Engagement</h2>
        <p>For organisations with no current quality function, we recommend:</p>
        <div class="proposal-recommendation">
          <h3>Option 2: Strategy + Implementation Team</h3>
          <p>This approach ensures the strategy is not only defined but successfully embedded into the engineering culture and delivery pipeline.</p>
        </div>
      </div>

      <!-- Business Benefits -->
      <div class="proposal-section">
        <h2>Business Benefits</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="shield-check"></i></div>
            <div>
              <h4>Reduced Production Defects</h4>
              <p>Catch bugs earlier in the pipeline before they reach production, reducing costly hotfixes and downtime.</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="rocket"></i></div>
            <div>
              <h4>Faster &amp; Safer Releases</h4>
              <p>Ship with confidence through automated quality gates and comprehensive regression coverage.</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="trending-up"></i></div>
            <div>
              <h4>Improved Engineering Productivity</h4>
              <p>Free your developers from manual testing so they can focus on building features that matter.</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="settings"></i></div>
            <div>
              <h4>Automation-Driven Testing</h4>
              <p>Scalable test automation frameworks that grow with your product and reduce repetitive effort.</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="bar-chart-3"></i></div>
            <div>
              <h4>Clear Quality Metrics &amp; Reporting</h4>
              <p>Real-time dashboards and reporting that give leadership full visibility into release readiness.</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon"><i data-lucide="layers"></i></div>
            <div>
              <h4>Scalable Engineering Processes</h4>
              <p>Establish repeatable, scalable quality processes that support team and product growth.</p>
            </div>
          </div>
        </div>
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
  <script src="/js/proposal-pdf.js"></script>
  <?php endif; ?>
</body>
</html>
