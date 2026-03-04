/* ============================================
   BOSCH TECHNOLOGIES — Assessment Engine
   Multi-step form, scoring, Chart.js radar,
   jsPDF report, email gate
   ============================================ */

class MaturityAssessment {
  constructor() {
    this.currentStep = 0;
    this.totalSteps = ASSESSMENT_DIMENSIONS.length;
    this.answers = {};
    this.userEmail = '';
    this.userName = '';
    this.userCompany = '';

    this.init();
  }

  init() {
    this.renderSections();
    this.showStep(0);
    this.updateProgress();
    // Re-initialize Lucide icons for dynamically rendered content
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // --- Render all question sections dynamically ---
  renderSections() {
    const wrapper = document.getElementById('assessment-sections');
    if (!wrapper) return;

    let questionNum = 0;
    ASSESSMENT_DIMENSIONS.forEach((dim, idx) => {
      const section = document.createElement('div');
      section.className = 'assessment-section';
      section.id = `step-${idx}`;

      let questionsHTML = '';
      dim.questions.forEach(q => {
        questionNum++;
        let optionsHTML = '';
        q.options.forEach(opt => {
          optionsHTML += `
            <label class="radio-option" data-question="${q.id}" data-value="${opt.value}">
              <input type="radio" name="${q.id}" value="${opt.value}">
              <span>${opt.label}</span>
            </label>
          `;
        });

        questionsHTML += `
          <div class="question-block" data-question-id="${q.id}">
            <h4>${questionNum}. ${q.text}</h4>
            <div class="radio-group">
              ${optionsHTML}
            </div>
            <div class="question-error" style="display: none;">Please select an answer</div>
          </div>
        `;
      });

      section.innerHTML = `
        <h2><i data-lucide="${dim.icon}"></i> ${dim.title}</h2>
        <p class="section-desc">${dim.description}</p>
        ${questionsHTML}
        <div class="assessment-nav">
          ${idx > 0 ? '<button class="btn btn-outline" onclick="assessment.prevStep()">← Previous</button>' : '<div></div>'}
          ${idx < this.totalSteps - 1
            ? '<button class="btn btn-primary" onclick="assessment.nextStep()">Next →</button>'
            : '<button class="btn btn-accent btn-lg" onclick="assessment.showEmailGate()">See My Results →</button>'
          }
        </div>
      `;

      wrapper.appendChild(section);
    });

    // Bind radio selection styling
    document.querySelectorAll('.radio-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        const label = e.currentTarget;
        const questionId = label.dataset.question;
        const value = parseInt(label.dataset.value);

        // Remove selected from siblings
        label.closest('.radio-group').querySelectorAll('.radio-option').forEach(o => o.classList.remove('selected'));
        label.classList.add('selected');

        // Store answer
        this.answers[questionId] = value;

        // Clear error if present
        const block = label.closest('.question-block');
        if (block) {
          block.classList.remove('has-error');
          const err = block.querySelector('.question-error');
          if (err) err.style.display = 'none';
        }

        // Update answered count
        this.updateAnsweredCount();

        // Auto-scroll to next question or nav button
        const currentBlock = label.closest('.question-block');
        const nextBlock = currentBlock.nextElementSibling;
        if (nextBlock && nextBlock.classList.contains('question-block')) {
          setTimeout(() => {
            nextBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        } else {
          // Last question — scroll to the nav buttons
          const navBar = currentBlock.closest('.assessment-section').querySelector('.assessment-nav');
          if (navBar) {
            setTimeout(() => {
              navBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          }
        }
      });
    });
  }

  // --- Update answered question count ---
  updateAnsweredCount() {
    const totalQuestions = ASSESSMENT_DIMENSIONS.reduce((sum, dim) => sum + dim.questions.length, 0);
    const answeredCount = Object.keys(this.answers).length;
    const countEl = document.querySelector('.answered-count');
    if (countEl) {
      countEl.innerHTML = `<span class="count-num">${answeredCount}</span> of ${totalQuestions} answered`;
    }
  }

  // --- Navigation ---
  showStep(step) {
    document.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(`step-${step}`);
    if (target) {
      target.classList.add('active');
      this.currentStep = step;
      this.updateProgress();
      window.scrollTo({ top: document.getElementById('assessment-sections').offsetTop - 100, behavior: 'smooth' });
    }
  }

  nextStep() {
    if (!this.validateCurrentStep()) return;

    if (this.currentStep < this.totalSteps - 1) {
      this.showStep(this.currentStep + 1);
    }
  }

  validateCurrentStep() {
    const dim = ASSESSMENT_DIMENSIONS[this.currentStep];
    const unanswered = dim.questions.filter(q => !this.answers[q.id]);

    // Clear all previous errors in current step
    const currentSection = document.getElementById(`step-${this.currentStep}`);
    currentSection.querySelectorAll('.question-error').forEach(el => el.style.display = 'none');
    currentSection.querySelectorAll('.question-block').forEach(el => el.classList.remove('has-error'));

    if (unanswered.length > 0) {
      // Show error on each unanswered question
      unanswered.forEach(q => {
        const block = currentSection.querySelector(`[data-question-id="${q.id}"]`);
        if (block) {
          block.classList.add('has-error');
          block.querySelector('.question-error').style.display = 'block';
        }
      });

      // Scroll to first unanswered question
      const firstBlock = currentSection.querySelector(`[data-question-id="${unanswered[0].id}"]`);
      if (firstBlock) {
        firstBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return false;
    }
    return true;
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.showStep(this.currentStep - 1);
    }
  }

  updateProgress() {
    const progress = ((this.currentStep + 1) / (this.totalSteps + 1)) * 100; // +1 for results step
    const bar = document.querySelector('.progress-bar');
    if (bar) bar.style.width = `${progress}%`;

    const stepText = document.querySelector('.current-step');
    if (stepText) stepText.textContent = `Step ${this.currentStep + 1} of ${this.totalSteps}`;
  }

  // --- Email Gate ---
  showEmailGate() {
    if (!this.validateCurrentStep()) return;

    document.querySelectorAll('.assessment-section').forEach(s => s.classList.remove('active'));
    document.getElementById('email-gate').style.display = 'block';

    // Hide sticky progress on email gate
    const sticky = document.querySelector('.sticky-progress');
    if (sticky) sticky.style.display = 'none';

    const bar = document.querySelector('.progress-bar');
    if (bar) bar.style.width = '90%';

    window.scrollTo({ top: document.getElementById('email-gate').offsetTop - 100, behavior: 'smooth' });
  }

  submitEmail() {
    const nameInput = document.getElementById('gate-name');
    const emailInput = document.getElementById('gate-email');
    const companyInput = document.getElementById('gate-company');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Clear previous errors
    document.querySelectorAll('.gate-field-error').forEach(el => el.style.display = 'none');
    document.querySelectorAll('#email-gate input').forEach(el => el.style.borderColor = '#dee2e6');

    let hasError = false;

    if (!nameInput.value.trim()) {
      document.getElementById('gate-name-error').style.display = 'block';
      nameInput.style.borderColor = '#c0392b';
      hasError = true;
    }

    if (!emailInput.value.trim() || !emailPattern.test(emailInput.value)) {
      document.getElementById('gate-email-error').style.display = 'block';
      emailInput.style.borderColor = '#c0392b';
      hasError = true;
    }

    if (!companyInput.value.trim()) {
      document.getElementById('gate-company-error').style.display = 'block';
      companyInput.style.borderColor = '#c0392b';
      hasError = true;
    }

    if (hasError) {
      // Focus first field with error
      const firstErr = document.querySelector('#email-gate input[style*="#c0392b"]');
      if (firstErr) firstErr.focus();
      return;
    }

    this.userName = nameInput.value;
    this.userEmail = emailInput.value;
    this.userCompany = companyInput.value || '';

    // Send to backend (optional)
    this.sendResultsToServer();

    // Show results
    document.getElementById('email-gate').style.display = 'none';
    // Keep sticky progress hidden for results
    const sticky = document.querySelector('.sticky-progress');
    if (sticky) sticky.style.display = 'none';
    this.showResults();
  }

  // --- Scoring ---
  calculateScores() {
    const scores = {};

    ASSESSMENT_DIMENSIONS.forEach(dim => {
      const dimAnswers = dim.questions.map(q => this.answers[q.id] || 0);
      const avg = dimAnswers.reduce((a, b) => a + b, 0) / dimAnswers.length;
      scores[dim.id] = {
        score: Math.round(avg * 10) / 10,
        level: Math.round(avg),
        title: dim.title,
        icon: dim.icon
      };
    });

    const allScores = Object.values(scores).map(s => s.score);
    const overall = allScores.reduce((a, b) => a + b, 0) / allScores.length;
    const overallLevel = Math.round(overall);

    return { dimensions: scores, overall: Math.round(overall * 10) / 10, overallLevel };
  }

  // --- Show Results ---
  showResults() {
    const results = this.calculateScores();
    const resultsSection = document.getElementById('results-section');
    if (!resultsSection) return;

    const bar = document.querySelector('.progress-bar');
    if (bar) bar.style.width = '100%';

    const levelInfo = MATURITY_LEVELS[results.overallLevel];

    // Overall score
    document.getElementById('overall-score-value').textContent = results.overall.toFixed(1);
    document.getElementById('overall-level-name').textContent = `Level ${results.overallLevel}: ${levelInfo.name}`;
    document.getElementById('overall-level-desc').textContent = levelInfo.tagline;

    // Dimension results
    const dimContainer = document.getElementById('dimension-results');
    dimContainer.innerHTML = '';

    Object.entries(results.dimensions).forEach(([dimId, data]) => {
      const pct = (data.score / 5) * 100;
      const scoreClass = data.score < 2.5 ? 'score-low' : data.score < 3.5 ? 'score-mid' : 'score-high';
      const barColor = data.score < 2.5 ? '#c0392b' : data.score < 3.5 ? '#d4a017' : '#b8961c';
      const rec = RECOMMENDATIONS[dimId][data.level] || '';

      dimContainer.innerHTML += `
        <div class="dim-result">
          <div class="dim-result-header">
            <h3><i data-lucide="${data.icon}"></i> ${data.title}</h3>
            <span class="dim-score-badge ${scoreClass}">${data.score.toFixed(1)} / 5.0</span>
          </div>
          <div class="score-bar">
            <div class="score-fill" style="width: ${pct}%; background: ${barColor};"></div>
          </div>
          <div class="recommendation">
            <strong>Recommendation:</strong> ${rec}
          </div>
        </div>
      `;
    });

    // Render radar chart
    this.renderRadarChart(results);

    resultsSection.classList.add('active');
    if (typeof lucide !== 'undefined') lucide.createIcons();
    window.scrollTo({ top: resultsSection.offsetTop - 100, behavior: 'smooth' });
  }

  // --- Radar Chart (Chart.js) ---
  renderRadarChart(results) {
    const ctx = document.getElementById('radar-chart');
    if (!ctx) return;

    // Use shorter labels on mobile to prevent cutoff
    const isMobile = window.innerWidth < 768;
    const shortLabels = isMobile ? {
      'Test Process & Governance': 'Process',
      'Automation Coverage & Effectiveness': 'Automation',
      'Tooling & Infrastructure': 'Tooling',
      'Reporting & Observability': 'Reporting',
      'Team Skills & Culture': 'Skills'
    } : {
      'Test Process & Governance': 'Process &\nGovernance',
      'Automation Coverage & Effectiveness': 'Automation\nCoverage',
      'Tooling & Infrastructure': 'Tooling &\nInfrastructure',
      'Reporting & Observability': 'Reporting &\nObservability',
      'Team Skills & Culture': 'Skills &\nCulture'
    };

    const labels = Object.values(results.dimensions).map(d => shortLabels[d.title] || d.title);
    const data = Object.values(results.dimensions).map(d => d.score);

    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Your Score',
          data: data,
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
        layout: {
          padding: isMobile ? 10 : 20
        },
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
            pointLabels: {
              font: { size: isMobile ? 11 : 13, weight: '600' },
              color: '#ffffff',
              padding: isMobile ? 8 : 15
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.08)'
            },
            angleLines: {
              color: 'rgba(255, 255, 255, 0.08)'
            }
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: isMobile ? 16 : 24,
              font: { size: isMobile ? 11 : 13 },
              color: '#cccccc',
              usePointStyle: true,
              pointStyleWidth: 16
            }
          }
        }
      }
    });
  }

  // --- PDF Report ---
  async generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const results = this.calculateScores();
    const levelInfo = MATURITY_LEVELS[results.overallLevel];

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contactUrl = 'https://boschtechnologies.com/contact/';
    let y = 20;

    // Load logo as base64 (preserve aspect ratio)
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

    // Header
    const headerH = 66;
    doc.setFillColor(28, 28, 28);
    doc.rect(0, 0, pageWidth, headerH, 'F');

    // Logo centred in header (aspect-ratio preserved, bigger)
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
    doc.text(`Prepared for: ${this.userName}${this.userCompany ? ' — ' + this.userCompany : ''}  |  ${new Date().toLocaleDateString('en-GB')}`, pageWidth / 2, 56, { align: 'center' });

    y = headerH + 4;

    // --- Speed dial gauge (rendered via canvas → image) ---
    const gaugeDataUrl = this._renderGaugeToDataUrl(results.overall, 5);

    // Place gauge on the left
    const gaugeW = 60;
    const gaugeH = 35;
    doc.addImage(gaugeDataUrl, 'PNG', 18, y, gaugeW, gaugeH);

    // Level info to the right of gauge
    const infoX = 85;
    doc.setFontSize(15);
    doc.setTextColor(150, 121, 15);
    doc.setFont(undefined, 'bold');
    doc.text(`Level ${results.overallLevel}: ${levelInfo.name}`, infoX, y + 16);
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(108, 117, 125);
    doc.text(levelInfo.tagline, infoX, y + 24);

    y += gaugeH + 10;

    // --- Dimension Scores (use full page width) ---
    doc.setFontSize(15);
    doc.setTextColor(26, 26, 46);
    doc.setFont(undefined, 'bold');
    doc.text('Dimension Scores', 15, y);
    y += 9;

    // Calculate available space for dimensions (before CTA)
    const ctaH = 28;
    const ctaY = pageHeight - ctaH;
    const availableH = ctaY - y - 6;
    const dimEntries = Object.entries(results.dimensions);
    const dimSpacing = Math.min(availableH / dimEntries.length, 32);
    const barWidth = pageWidth - 30; // full width bars

    dimEntries.forEach(([dimId, data]) => {
      const rec = RECOMMENDATIONS[dimId][data.level] || '';
      const fillWidth = (data.score / 5) * barWidth;
      const barColor = data.score < 2.5 ? [192, 57, 43] : data.score < 3.5 ? [212, 160, 23] : [184, 150, 28];

      // Dimension name and score
      doc.setFontSize(10);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(26, 26, 46);
      doc.text(`${data.title}`, 15, y);
      doc.setTextColor(...barColor);
      doc.text(`${data.score.toFixed(1)} / 5.0`, pageWidth - 35, y);

      y += 6;

      // Full-width score bar
      doc.setFillColor(222, 226, 230);
      doc.roundedRect(15, y, barWidth, 4, 2, 2, 'F');
      doc.setFillColor(...barColor);
      doc.roundedRect(15, y, fillWidth, 4, 2, 2, 'F');

      y += 10;

      // Recommendation
      doc.setFontSize(8);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(73, 80, 87);
      const recLines = doc.splitTextToSize(`Recommendation: ${rec}`, pageWidth - 30);
      doc.text(recLines, 15, y);
      y += recLines.length * 4 + (dimSpacing - 18);
    });

    // CTA — "Ready to Level Up?" anchored to page bottom
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

    doc.save(`Bosch-Maturity-Assessment-${this.userName.replace(/\s+/g, '-')}.pdf`);
  }

  // --- Render modern gauge to a data URL ---
  _renderGaugeToDataUrl(score, max) {
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

    // --- Track (subtle light grey) ---
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, Math.PI, 2 * Math.PI, false);
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = arcW;
    ctx.lineCap = 'round';
    ctx.stroke();

    // --- Fill arc (single colour based on score) ---
    const endAngle = Math.PI + pct * Math.PI;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, Math.PI, endAngle, false);
    ctx.strokeStyle = scoreColor;
    ctx.lineWidth = arcW;
    ctx.lineCap = 'round';
    ctx.stroke();

    // --- Glow on the tip ---
    const tipX = cx + Math.cos(endAngle) * outerR;
    const tipY = cy + Math.sin(endAngle) * outerR;
    const glow = ctx.createRadialGradient(tipX, tipY, 0, tipX, tipY, arcW * 1.2);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.beginPath();
    ctx.arc(tipX, tipY, arcW * 1.2, 0, 2 * Math.PI);
    ctx.fillStyle = glow;
    ctx.fill();

    // --- Score text (bottom centre) — same colour as arc ---
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 52px sans-serif';
    ctx.fillStyle = scoreColor;
    ctx.fillText(`${score.toFixed(1)}`, cx, cy - 8);

    ctx.font = '600 18px sans-serif';
    ctx.fillStyle = '#6c757d';
    ctx.fillText(`out of ${max}`, cx, cy + 22);

    // --- Scale labels (warm gold) ---
    ctx.font = '600 14px sans-serif';
    ctx.fillStyle = '#b8961c';
    ctx.textAlign = 'center';
    ctx.fillText('0', cx - outerR - 4, cy + arcW + 10);
    ctx.fillText(String(max), cx + outerR + 4, cy + arcW + 10);

    return canvas.toDataURL('image/png');
  }

  // --- Send to Server (optional PHP backend) ---
  async sendResultsToServer() {
    try {
      const results = this.calculateScores();
      const payload = new FormData();
      payload.append('name', this.userName);
      payload.append('email', this.userEmail);
      payload.append('company', this.userCompany);
      payload.append('overall_score', results.overall);
      payload.append('overall_level', results.overallLevel);
      payload.append('dimensions', JSON.stringify(results.dimensions));
      payload.append('answers', JSON.stringify(this.answers));

      await fetch('/api/submit-assessment.php', {
        method: 'POST',
        body: payload
      });
    } catch (e) {
      // Silently fail — results are shown client-side regardless
      console.log('Server submission skipped:', e.message);
    }
  }
}

// --- Initialize ---
let assessment;
if (document.getElementById('assessment-sections')) {
  assessment = new MaturityAssessment();
}
