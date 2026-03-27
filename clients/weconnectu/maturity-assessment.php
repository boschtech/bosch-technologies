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
            <p>
              Some processes exist but are inconsistently applied. 
              Basic automation covers critical paths but is fragile.
            </p>
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

    // PDF Generation - matches Bosch-Maturity-Assessment style
    async function generateMaturityPDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF('p', 'mm', 'a4');

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const contactUrl = 'https://boschtechnologies.com/contact/';
      let y = 20;

      // WeConnectU assessment data
      const overallScore = 2.0;
      const overallLevel = 2;
      const levelName = 'Managed';
      const levelTagline = 'Some processes exist but are inconsistently applied. Basic automation covers critical paths but is fragile.';

      const dimensions = [
        { name: 'Test Process & Governance', score: 2.0, rec: 'Establish formal test case management in a dedicated tool. Create a basic test strategy document. Implement a defect tracking workflow with severity classification.' },
        { name: 'Automation Coverage & Effectiveness', score: 1.8, rec: 'Prioritise automating critical regression paths. Build a simple, maintainable framework using industry-standard tools. Focus on API tests before UI automation.' },
        { name: 'Tooling & Infrastructure', score: 2.2, rec: 'Integrate automated tests into CI/CD pipelines. Implement environment provisioning scripts. Establish basic test data management practices.' },
        { name: 'Reporting & Observability', score: 1.8, rec: 'Implement automated test reporting with trend visualisation. Track code coverage metrics. Create dashboards for test execution status and defect trends.' },
        { name: 'Team Skills & Culture', score: 2.2, rec: 'Implement structured knowledge sharing sessions. Train developers on testing fundamentals. Begin shift-left initiatives by involving QE earlier in the development process.' }
      ];

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
        canvas.getContext('2d').drawImage(logoImg, 0, 0);
        logoDataUrl = canvas.toDataURL('image/png');
      } catch (e) {
        console.log('Logo load skipped:', e.message);
      }

      // --- Render gauge to data URL ---
      function renderGaugeToDataUrl(score, max) {
        const size = 400;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size * 0.62;
        const ctx = canvas.getContext('2d');

        const cx = size / 2;
        const cy = size * 0.48;
        const outerR = size * 0.4;
        const arcW = 24;
        const pct = Math.min(score / max, 1);

        // Score-based colour
        const scoreColor = score < 1.5 ? '#c0392b'
          : score < 2.5 ? '#e67e22'
          : score < 3.5 ? '#d4a017'
          : score < 4.5 ? '#b8961c'
          : '#27ae60';

        // Track (subtle light grey)
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, Math.PI, 2 * Math.PI, false);
        ctx.strokeStyle = '#e9ecef';
        ctx.lineWidth = arcW;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Fill arc
        const endAngle = Math.PI + pct * Math.PI;
        ctx.beginPath();
        ctx.arc(cx, cy, outerR, Math.PI, endAngle, false);
        ctx.strokeStyle = scoreColor;
        ctx.lineWidth = arcW;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Glow on the tip
        const tipX = cx + Math.cos(endAngle) * outerR;
        const tipY = cy + Math.sin(endAngle) * outerR;
        const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, arcW * 1.2);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.beginPath();
        ctx.arc(tipX, tipY, arcW * 1.2, 0, 2 * Math.PI);
        ctx.fillStyle = glow;
        ctx.fill();

        // Score text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = 'bold 52px sans-serif';
        ctx.fillStyle = scoreColor;
        ctx.fillText(score.toFixed(1), cx, cy - 8);

        ctx.font = '600 18px sans-serif';
        ctx.fillStyle = '#6c757d';
        ctx.fillText('out of ' + max, cx, cy + 22);

        // Scale labels
        ctx.font = '600 14px sans-serif';
        ctx.fillStyle = '#b8961c';
        ctx.textAlign = 'center';
        ctx.fillText('0', cx - outerR - 4, cy + arcW + 10);
        ctx.fillText(String(max), cx + outerR + 4, cy + arcW + 10);

        return canvas.toDataURL('image/png');
      }

      // --- Header ---
      const headerH = 66;
      doc.setFillColor(28, 28, 28);
      doc.rect(0, 0, pageWidth, headerH, 'F');

      // Logo centred in header
      if (logoDataUrl) {
        const logoH = 32;
        const logoW = logoH * logoAspect;
        doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
      }

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Test Automation Maturity Assessment', pageWidth / 2, 40, { align: 'center' });
      doc.setFontSize(14);
      doc.text('Overall Maturity Score', pageWidth / 2, 48, { align: 'center' });
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.text('Prepared for: WeConnectU  |  27 March 2026', pageWidth / 2, 56, { align: 'center' });

      y = headerH + 4;

      // --- Speed dial gauge ---
      const gaugeDataUrl = renderGaugeToDataUrl(overallScore, 5);
      const gaugeW = 60;
      const gaugeH = 35;
      doc.addImage(gaugeDataUrl, 'PNG', 18, y, gaugeW, gaugeH);

      // Level info to the right of gauge
      const infoX = 85;
      doc.setFontSize(15);
      doc.setTextColor(150, 121, 15);
      doc.setFont(undefined, 'bold');
      doc.text('Level ' + overallLevel + ': ' + levelName, infoX, y + 16);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(108, 117, 125);
      doc.text(levelTagline.substring(0, 80) + '...', infoX, y + 24);

      y += gaugeH + 10;

      // --- Dimension Scores ---
      doc.setFontSize(13);
      doc.setTextColor(26, 26, 46);
      doc.setFont(undefined, 'bold');
      doc.text('Dimension Scores', 15, y);
      y += 8;

      const barWidth = pageWidth - 30;
      const ctaH = 28;
      const ctaY = pageHeight - ctaH;

      dimensions.forEach((dim, idx) => {
        const fillWidth = (dim.score / 5) * barWidth;
        const barColor = dim.score < 2.5 ? [192, 57, 43] : dim.score < 3.5 ? [212, 160, 23] : [184, 150, 28];

        // Check if we need a new page
        if (y > ctaY - 35) {
          // Add CTA to current page first
          doc.setFillColor(0, 0, 0);
          doc.rect(0, ctaY, pageWidth, ctaH, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(14);
          doc.setFont(undefined, 'bold');
          doc.text('Ready to Level Up?', 15, ctaY + 10);
          doc.setFontSize(9);
          doc.setFont(undefined, 'normal');
          doc.setTextColor(200, 200, 200);
          doc.text('Book a free consultation with Bosch Technologies to build your improvement roadmap.', 15, ctaY + 17);
          doc.setTextColor(184, 150, 28);
          doc.setFont(undefined, 'bold');
          doc.text('boschtechnologies.com/contact', 15, ctaY + 24);
          
          doc.addPage();
          y = 20;
        }

        // Dimension name and score
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(26, 26, 46);
        doc.text(dim.name, 15, y);
        doc.setTextColor(...barColor);
        doc.text(dim.score.toFixed(1) + ' / 5.0', pageWidth - 15, y, { align: 'right' });

        y += 5;

        // Full-width score bar
        doc.setFillColor(222, 226, 230);
        doc.roundedRect(15, y, barWidth, 4, 2, 2, 'F');
        doc.setFillColor(...barColor);
        doc.roundedRect(15, y, fillWidth, 4, 2, 2, 'F');

        y += 8;

        // Recommendation (shortened)
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(73, 80, 87);
        const shortRec = dim.rec.length > 120 ? dim.rec.substring(0, 120) + '...' : dim.rec;
        const recLines = doc.splitTextToSize('Recommendation: ' + shortRec, pageWidth - 30);
        doc.text(recLines, 15, y);
        y += recLines.length * 3.5 + 6;
      });

      // --- CTA Footer ---
      doc.setFillColor(0, 0, 0);
      doc.rect(0, ctaY, pageWidth, ctaH, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('Ready to Level Up?', 15, ctaY + 10);
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(200, 200, 200);
      doc.text('Book a free consultation with Bosch Technologies to build your improvement roadmap.', 15, ctaY + 17);
      // Clickable link text
      doc.setTextColor(184, 150, 28);
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      const linkText = 'Click here to book a consultation';
      doc.text(linkText, 15, ctaY + 24);
      const linkW = doc.getTextWidth(linkText);
      doc.link(15, ctaY + 21, linkW, 5, { url: contactUrl });

      doc.save('Bosch-Maturity-Assessment-WeConnectU.pdf');
    }
    <?php endif; ?>
  </script>
</body>
</html>
