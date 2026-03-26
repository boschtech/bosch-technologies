<?php
/**
 * Private Client Maturity Assessment Results — WeConnectU
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
  <title>QE Maturity Assessment — WeConnectU — Bosch Technologies</title>
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
      <h1>Client Maturity Assessment</h1>
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
          <button type="submit" class="btn btn-accent btn-lg" style="width: 100%; justify-content: center;">View Assessment →</button>
        </form>
      </div>
    </div>
  </section>

<?php else: ?>

  <!-- Hero -->
  <section class="service-hero" style="padding-bottom: 24px;">
    <div class="container">
      <span class="badge badge-accent">Maturity Assessment Results</span>
      <h1>QE Maturity Assessment</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
      <a href="/clients/weconnectu/" class="btn btn-outline" style="margin-top: 16px;">← Back to Assessment Report</a>
    </div>
  </section>

  <!-- Results Section -->
  <section class="section" style="padding-top: 0;">
    <div class="container">
      <div class="assessment-wrapper">

        <!-- Results Display -->
        <div class="results-section active">
          
          <!-- Overall Score -->
          <div class="overall-score">
            <div class="score-circle">
              <span class="score-value">2.0</span>
            </div>
            <h2>Level 2: Managed</h2>
            <p>Some processes exist but are inconsistently applied. Basic automation covers critical paths but is fragile.</p>
          </div>

          <!-- Radar Chart -->
          <div class="chart-container">
            <canvas id="radar-chart"></canvas>
          </div>

          <!-- Dimension Breakdowns -->
          <h3 class="mb-3">Dimension Breakdown & Recommendations</h3>
          <div class="dimension-results">
            
            <!-- Test Process & Governance -->
            <div class="dim-result">
              <div class="dim-result-header">
                <h3><i data-lucide="clipboard-list"></i> Test Process & Governance</h3>
                <span class="dim-score-badge score-low">2.0 / 5.0</span>
              </div>
              <div class="score-bar">
                <div class="score-fill" style="width: 40%; background: #c0392b;"></div>
              </div>
              <div class="recommendation">
                <strong>Recommendation:</strong> Establish formal test case management in a dedicated tool. Create a basic test strategy document. Implement a defect tracking workflow with severity classification.
              </div>
            </div>

            <!-- Automation Coverage & Effectiveness -->
            <div class="dim-result">
              <div class="dim-result-header">
                <h3><i data-lucide="settings"></i> Automation Coverage & Effectiveness</h3>
                <span class="dim-score-badge score-low">1.8 / 5.0</span>
              </div>
              <div class="score-bar">
                <div class="score-fill" style="width: 36%; background: #c0392b;"></div>
              </div>
              <div class="recommendation">
                <strong>Recommendation:</strong> Prioritise automating critical regression paths. Build a simple, maintainable framework using industry-standard tools. Focus on API tests before UI automation.
              </div>
            </div>

            <!-- Tooling & Infrastructure -->
            <div class="dim-result">
              <div class="dim-result-header">
                <h3><i data-lucide="wrench"></i> Tooling & Infrastructure</h3>
                <span class="dim-score-badge score-low">2.2 / 5.0</span>
              </div>
              <div class="score-bar">
                <div class="score-fill" style="width: 44%; background: #c0392b;"></div>
              </div>
              <div class="recommendation">
                <strong>Recommendation:</strong> Integrate automated tests into CI/CD pipelines. Implement environment provisioning scripts. Establish basic test data management practices.
              </div>
            </div>

            <!-- Reporting & Observability -->
            <div class="dim-result">
              <div class="dim-result-header">
                <h3><i data-lucide="bar-chart-3"></i> Reporting & Observability</h3>
                <span class="dim-score-badge score-low">1.8 / 5.0</span>
              </div>
              <div class="score-bar">
                <div class="score-fill" style="width: 36%; background: #c0392b;"></div>
              </div>
              <div class="recommendation">
                <strong>Recommendation:</strong> Implement automated test reporting with trend visualisation. Track code coverage metrics. Create dashboards for test execution status and defect trends.
              </div>
            </div>

            <!-- Team Skills & Culture -->
            <div class="dim-result">
              <div class="dim-result-header">
                <h3><i data-lucide="users"></i> Team Skills & Culture</h3>
                <span class="dim-score-badge score-low">2.2 / 5.0</span>
              </div>
              <div class="score-bar">
                <div class="score-fill" style="width: 44%; background: #c0392b;"></div>
              </div>
              <div class="recommendation">
                <strong>Recommendation:</strong> Implement structured knowledge sharing sessions. Train developers on testing fundamentals. Begin shift-left initiatives by involving QE earlier in the development process.
              </div>
            </div>

          </div>

          <!-- Actions -->
          <div class="results-actions">
            <button class="btn btn-primary btn-lg" onclick="generateMaturityPDF()"><i data-lucide="file-text"></i> Download PDF Report</button>
            <a href="/clients/weconnectu/improvement-engagement.php" class="btn btn-accent btn-lg">View Improvement Options →</a>
          </div>

          <!-- What's Next -->
          <div style="margin-top: 48px; padding: 32px; background: var(--gray-100); border-radius: 16px;">
            <h3>What's Next?</h3>
            <p>Your assessment provides a snapshot of where you stand today. To build a roadmap for improvement:</p>
            <ul style="list-style: none; margin-top: 16px;">
              <li style="padding: 8px 0; font-size: 0.95rem;">→ <strong>Review the Improvement Engagement options</strong> to see which approach best fits your needs</li>
              <li style="padding: 8px 0; font-size: 0.95rem;">→ <strong>Explore our maturity model</strong> to understand what each level looks like in detail</li>
              <li style="padding: 8px 0; font-size: 0.95rem;">→ <strong>Book a consultation</strong> to discuss priority actions and next steps</li>
            </ul>
            <div class="btn-group mt-3">
              <a href="/clients/weconnectu/improvement-engagement.php" class="btn btn-primary">View Improvement Options</a>
              <a href="/maturity-model/" class="btn btn-outline">View Maturity Model</a>
            </div>
          </div>
        </div>

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

  <!-- CDN Libraries -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

  <!-- App Scripts -->
  <script src="https://unpkg.com/lucide@latest"></script>
  <script src="/js/main.js"></script>
  <script>
    lucide.createIcons();

    <?php if ($authenticated): ?>
    // Render Radar Chart
    const ctx = document.getElementById('radar-chart');
    if (ctx) {
      const isMobile = window.innerWidth < 768;
      new Chart(ctx, {
        type: 'radar',
        data: {
          labels: [
            ['Process &', 'Governance'],
            ['Automation Coverage', '& Effectiveness'],
            ['Tooling &', 'Infrastructure'],
            ['Reporting &', 'Observability'],
            ['Skills &', 'Culture']
          ],
          datasets: [{
            label: 'WeConnectU Score',
            data: [2.0, 1.8, 2.2, 1.8, 2.2],
            backgroundColor: 'rgba(184, 150, 28, 0.25)',
            borderColor: '#b8961c',
            borderWidth: 2,
            pointBackgroundColor: '#b8961c',
            pointBorderColor: '#111111',
            pointBorderWidth: 2,
            pointRadius: isMobile ? 4 : 6
          }, {
            label: 'Target (Level 4)',
            data: [4, 4, 4, 4, 4],
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: { padding: isMobile ? 10 : 20 },
          scales: {
            r: {
              beginAtZero: true,
              max: 5,
              min: 0,
              ticks: {
                stepSize: 1,
                font: { size: isMobile ? 8 : 11 },
                color: '#666666',
                backdropColor: 'transparent'
              },
              grid: { color: 'rgba(255, 255, 255, 0.1)' },
              angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
              pointLabels: {
                font: { size: isMobile ? 9 : 12, weight: '600' },
                color: '#ffffff'
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#cccccc',
                font: { size: 11 },
                usePointStyle: true,
                padding: 20
              }
            }
          }
        }
      });
    }

    // PDF Generation
    async function generateMaturityPDF() {
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

      function paragraph(text) {
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...grey);
        const lines = doc.splitTextToSize(text, contentW);
        checkPage(lines.length * 4 + 2);
        doc.text(lines, marginL, y);
        y += lines.length * 4 + 3;
      }

      // Header
      const headerH = 60;
      doc.setFillColor(28, 28, 28);
      doc.rect(0, 0, pageWidth, headerH, 'F');

      if (logoDataUrl) {
        const logoH = 28;
        const logoW = logoH * logoAspect;
        doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
      }

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text('QE Maturity Assessment', pageWidth / 2, 38, { align: 'center' });
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(200, 200, 200);
      doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 46, { align: 'center' });
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('27 March 2026', pageWidth / 2, 53, { align: 'center' });

      y = headerH + 10;

      // Overall Score
      heading('Overall Maturity Score');
      checkPage(20);
      doc.setFillColor(...gold);
      doc.roundedRect(marginL, y - 1, contentW, 16, 3, 3, 'F');
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('Level 2: Managed — Score: 2.0 / 5.0', pageWidth / 2, y + 9, { align: 'center' });
      y += 22;

      paragraph('Some processes exist but are inconsistently applied. Basic automation covers critical paths but is fragile.');

      // Dimension Scores
      heading('Dimension Breakdown');
      const dimensions = [
        { name: 'Test Process & Governance', score: 2.0, rec: 'Establish formal test case management. Create a basic test strategy document.' },
        { name: 'Automation Coverage & Effectiveness', score: 1.8, rec: 'Prioritise automating critical regression paths. Focus on API tests before UI automation.' },
        { name: 'Tooling & Infrastructure', score: 2.2, rec: 'Integrate automated tests into CI/CD pipelines. Implement environment provisioning scripts.' },
        { name: 'Reporting & Observability', score: 1.8, rec: 'Implement automated test reporting with trend visualisation. Track code coverage metrics.' },
        { name: 'Team Skills & Culture', score: 2.2, rec: 'Implement structured knowledge sharing sessions. Begin shift-left initiatives.' }
      ];

      dimensions.forEach(dim => {
        checkPage(20);
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...dark);
        doc.text(dim.name, marginL, y);
        doc.setTextColor(...gold);
        doc.text(dim.score.toFixed(1) + ' / 5.0', pageWidth - marginR, y, { align: 'right' });
        y += 5;

        // Score bar
        const barWidth = contentW;
        const fillWidth = (dim.score / 5) * barWidth;
        doc.setFillColor(230, 230, 230);
        doc.roundedRect(marginL, y, barWidth, 4, 1, 1, 'F');
        doc.setFillColor(192, 57, 43);
        doc.roundedRect(marginL, y, fillWidth, 4, 1, 1, 'F');
        y += 7;

        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...grey);
        const recLines = doc.splitTextToSize('Recommendation: ' + dim.rec, contentW);
        doc.text(recLines, marginL, y);
        y += recLines.length * 3.5 + 6;
      });

      // Save
      doc.save('WeConnectU-QE-Maturity-Assessment.pdf');
    }
    <?php endif; ?>
  </script>
</body>
</html>
