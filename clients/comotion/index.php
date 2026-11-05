<?php
/**
 * Private Client Proposal Page — Comotion (Comotion AI & Seed Analytics)
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
  <title>Proposal for Comotion — Bosch Technologies</title>
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
      <p>Prepared for <strong>Comotion</strong> — covering <strong>Comotion AI</strong> and <strong>Seed Analytics</strong> — by Bosch Technologies</p>
      <p class="text-muted">5 November 2026</p>
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
          <li>Comotion AI builds its product and much of its test suite with heavy AI assistance (Python, TypeScript, Next.js, PostgreSQL), and already has unit, component, and Playwright end-to-end tests — but no dedicated Quality Engineer owns quality from requirements through release readiness.</li>
          <li>Seed Analytics has strict delivery processes, but very little quality embedded within them: test cases are written but kept outside any test management system, and there is no test automation in the delivery pipeline.</li>
          <li>Across both entities, quality is largely invisible to leadership — neither can currently measure or report on release readiness.</li>
          <li>Reporting & Observability is the weakest dimension for both entities (1.8/5.0 for Comotion AI, 1.3/5.0 for Seed Analytics), meaning decisions are made with little real-time quality data.</li>
        </ul>

        <h3>Business Impact</h3>
        <ul>
          <li>Without a dedicated QE function, Comotion AI cannot objectively confirm that AI-generated code and AI-generated tests meet an agreed quality bar before release.</li>
          <li>Seed Analytics carries full regression risk on every release, since no automated safety net exists in the pipeline.</li>
          <li>Test case knowledge at Seed Analytics lives in documents rather than a searchable system, creating risk of coverage gaps and duplicated effort.</li>
          <li>Neither entity can currently produce a release readiness scorecard, slowing confident, data-driven release decisions at the group level.</li>
        </ul>

        <h3>Recommendation</h3>
        <ul>
          <li>Stand up a shared Quality Engineering capability that serves both Comotion AI and Seed Analytics, with a strategy tailored to each entity's starting point.</li>
          <li>For Comotion AI: embed quality from the requirements stage, govern and extend the existing AI-assisted testing practice, increase coverage, and mature CI/CD quality gates to produce a measurable release readiness signal.</li>
          <li>For Seed Analytics: introduce a test management system to formalise existing test cases, and build a CI/CD test automation foundation from the ground up.</li>
        </ul>
      </div>

      <!-- Current State Overview: Comotion AI -->
      <div class="proposal-option-card">
        <h2>Current State Overview — Comotion AI</h2>

        <h3>Test Strategy</h3>
        <ul>
          <li>Development and test creation are heavily AI-assisted across the stack (Python, TypeScript, Next.js, PostgreSQL, GitHub), with unit, component, and Playwright end-to-end tests already in place.</li>
          <li>There is no Quality Engineer to own quality end-to-end, so requirements coverage, test design quality, and release readiness are not formally governed.</li>
          <li>Quality decisions currently rely on engineering judgement rather than a defined, measurable process.</li>
        </ul>

        <h3>Automation</h3>
        <ul>
          <li>Automation Coverage & Effectiveness scored 3.5 / 5.0 — the strongest dimension, reflecting good existing unit, component, and Playwright end-to-end coverage.</li>
          <li>Without governance, there is a risk that AI-generated tests accumulate without a clear view of what they actually cover or how reliable they are.</li>
        </ul>

        <h3>Tooling & Infrastructure</h3>
        <ul>
          <li>Scored 3.5 / 5.0. The modern stack provides a solid foundation, but production-like staging and synthetic test data practices are not yet in place.</li>
        </ul>

        <h3>Reporting & Observability</h3>
        <ul>
          <li>The weakest dimension at 1.8 / 5.0. There is no dashboard for pass rates, flakiness, or coverage trends, so release readiness cannot currently be measured objectively.</li>
        </ul>

        <h3>Team & Process</h3>
        <ul>
          <li>Test Process & Governance scored 2.0 / 5.0 and Team Skills & Culture 2.5 / 5.0. Practices exist informally but are not standardised, and there is no shared testing community of practice to govern the growing use of AI in test creation.</li>
        </ul>
      </div>

      <!-- Current State Overview: Seed Analytics -->
      <div class="proposal-option-card">
        <h2>Current State Overview — Seed Analytics</h2>

        <h3>Test Strategy</h3>
        <ul>
          <li>Delivery processes are strict and well defined, but quality is not embedded within them. Test cases are written manually but kept outside of any test management system.</li>
          <li>Test Process & Governance scored 2.0 / 5.0 — the same score as Comotion AI, but for a different reason: process discipline exists, while the testing substance within it does not.</li>
        </ul>

        <h3>Automation</h3>
        <ul>
          <li>Automation Coverage & Effectiveness is the weakest dimension at 1.0 / 5.0. There are currently no automated tests in the delivery pipeline.</li>
        </ul>

        <h3>Tooling & Infrastructure</h3>
        <ul>
          <li>Scored 1.5 / 5.0. No CI/CD quality gates exist, and there is no consistent, containerised test environment strategy.</li>
        </ul>

        <h3>Reporting & Observability</h3>
        <ul>
          <li>Scored 1.3 / 5.0. No automated reporting exists, so quality status is not visible to the wider team or leadership.</li>
        </ul>

        <h3>Team & Process</h3>
        <ul>
          <li>Team Skills & Culture scored 1.8 / 5.0. Manual testers would benefit from pairing with engineers and basic automation training to begin building in-house automation capability.</li>
        </ul>
      </div>

      <!-- Key Findings -->
      <div class="proposal-option-card">
        <h2>Key Findings</h2>
        <ul>
          <li>Comotion AI has a solid automation foundation but no one accountable for quality from requirements through release.</li>
          <li>Seed Analytics has no automated regression safety net, leaving every release fully dependent on manual effort.</li>
          <li>Test case knowledge at Seed Analytics is undocumented in any shared system, creating duplication and coverage-gap risk.</li>
          <li>Neither entity can currently produce a release readiness scorecard or quality trend reporting.</li>
          <li>Governance over AI-generated tests at Comotion AI is informal, risking unmanaged growth of the test suite.</li>
        </ul>
      </div>

      <!-- Business Impact -->
      <div class="proposal-option-card">
        <h2>Business Impact</h2>
        <ul>
          <li>Release decisions for both entities are made without objective quality data.</li>
          <li>Seed Analytics' lack of automation increases regression cost and risk with every release cycle.</li>
          <li>Comotion AI risks false confidence in AI-generated code if AI-generated tests are not independently governed.</li>
          <li>Group-wide reporting on quality and release readiness is not currently possible.</li>
          <li>Both entities face scaling risk: Comotion AI's test suite will keep growing with AI assistance, and Seed Analytics has no automation base to build on.</li>
        </ul>
      </div>

      <!-- QE Maturity Position -->
      <div class="proposal-option-card" style="text-align: center;">
        <h2>QE Maturity Position</h2>
        <p>View the detailed maturity assessment results for each entity, including scores across all 5 dimensions, radar chart visualisation, and specific recommendations.</p>
        <div style="margin-top: 16px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
          <a href="/clients/comotion/maturity-assessment-comotion-ai.php" class="btn btn-primary btn-lg"><i data-lucide="bar-chart-3"></i> Comotion AI Results →</a>
          <a href="/clients/comotion/maturity-assessment-seed-analytics.php" class="btn btn-primary btn-lg"><i data-lucide="bar-chart-3"></i> Seed Analytics Results →</a>
        </div>
      </div>

      <!-- High-level QE Skills Assessment -->
      <div class="proposal-option-card">
        <h2>High-level QE Skills Assessment</h2>
        <p>Comotion AI's engineering team is clearly comfortable using AI to accelerate both feature development and test creation, and this has produced a genuinely useful base of unit, component, and end-to-end tests. However, without a dedicated Quality Engineer, no one is accountable for whether that AI-generated test suite actually reflects requirements, how reliable it is, or whether it provides enough confidence to call a release "ready". As the codebase and AI usage grow, this gap will widen rather than close on its own.</p>
        <p>Seed Analytics presents the opposite profile: a disciplined delivery process with almost no testing substance behind it. Test cases are written diligently but are not stored anywhere searchable or reportable, and there is no automation protecting the pipeline from regressions. This leaves the team fully reliant on manual effort for every release, with no scalable way to increase release frequency without proportionally increasing manual testing effort.</p>
        <p>A shared Quality Engineering capability — tailored to each entity's starting point — would give Comotion AI the governance and measurement it currently lacks, and give Seed Analytics the foundational tooling and automation it has not yet built. Over time, this also allows the group to report on quality and release readiness consistently across both entities.</p>
      </div>

      <!-- Target State Vision -->
      <div class="proposal-option-card">
        <h2>Target State Vision</h2>
        <ul>
          <li>A shared Quality Engineering function with clear ownership of quality across both entities.</li>
          <li>Comotion AI: quality embedded from the requirements stage through release readiness, governed AI-assisted test creation, increased coverage, and CI/CD quality gates producing a measurable release readiness signal.</li>
          <li>Seed Analytics: all test cases held in a test management system, with a CI/CD automation foundation (built on the group's existing Playwright standard) acting as a regression safety net.</li>
          <li>Group-wide quality metrics and release readiness reporting, visible to engineering and leadership.</li>
        </ul>
      </div>

      <!-- Gap Analysis: Comotion AI -->
      <div class="proposal-option-card">
        <h2>Gap Analysis — Comotion AI</h2>
        <table class="proposal-table">
          <thead>
            <tr><th>Area</th><th>Current State</th><th>Target State</th><th>Gap</th></tr>
          </thead>
          <tbody>
            <tr><td>Quality Ownership</td><td>No dedicated QE</td><td>Embedded QE from requirements to release</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
            <tr><td>Test Governance</td><td>Informal, ungoverned AI test growth</td><td>Governed AI-assisted testing practice</td><td><span style="color: #f39c12; font-weight: 600;">Medium</span></td></tr>
            <tr><td>Coverage</td><td>Good foundation (unit/component/E2E)</td><td>Increased, requirement-linked coverage</td><td><span style="color: #f39c12; font-weight: 600;">Medium</span></td></tr>
            <tr><td>Reporting</td><td>No dashboards or trend data</td><td>Real-time release readiness scorecard</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Gap Analysis: Seed Analytics -->
      <div class="proposal-option-card">
        <h2>Gap Analysis — Seed Analytics</h2>
        <table class="proposal-table">
          <thead>
            <tr><th>Area</th><th>Current State</th><th>Target State</th><th>Gap</th></tr>
          </thead>
          <tbody>
            <tr><td>Automation</td><td>None in pipeline</td><td>CI/CD-integrated automation</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
            <tr><td>Test Management</td><td>Documents, no test management system</td><td>Centralised test management system</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
            <tr><td>Process</td><td>Strict delivery process, low quality substance</td><td>Quality embedded within existing process</td><td><span style="color: #f39c12; font-weight: 600;">Medium</span></td></tr>
            <tr><td>Reporting</td><td>No automated reporting</td><td>Automated test reporting & visibility</td><td><span style="color: #c0392b; font-weight: 600;">High</span></td></tr>
          </tbody>
        </table>
      </div>

      <!-- Link to Improvement Engagement -->
      <div class="proposal-option-card" style="border-color: var(--accent); background: rgba(184, 150, 28, 0.05); text-align: center;">
        <h2>Ready to Build a Shared QE Capability?</h2>
        <p>Based on our assessment findings, we have prepared a detailed Improvement Engagement proposal with options tailored to the needs of both Comotion AI and Seed Analytics.</p>
        <div style="margin-top: 16px;">
          <a href="/clients/comotion/improvement-engagement.php" class="btn btn-accent btn-lg">View Improvement Engagement Options →</a>
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="generateAssessmentReportPDF()" class="btn btn-primary btn-lg"><i data-lucide="file-text"></i> Download PDF Report</button>
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
