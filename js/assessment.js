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
  }

  // --- Render all question sections dynamically ---
  renderSections() {
    const wrapper = document.getElementById('assessment-sections');
    if (!wrapper) return;

    ASSESSMENT_DIMENSIONS.forEach((dim, idx) => {
      const section = document.createElement('div');
      section.className = 'assessment-section';
      section.id = `step-${idx}`;

      let questionsHTML = '';
      dim.questions.forEach(q => {
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
          <div class="question-block">
            <h4>${q.text}</h4>
            <div class="radio-group">
              ${optionsHTML}
            </div>
          </div>
        `;
      });

      section.innerHTML = `
        <h2>${dim.icon} ${dim.title}</h2>
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

        // Update answered count
        this.updateAnsweredCount();
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
    // Validate current step has all questions answered
    const dim = ASSESSMENT_DIMENSIONS[this.currentStep];
    const unanswered = dim.questions.filter(q => !this.answers[q.id]);
    if (unanswered.length > 0) {
      alert(`Please answer all ${dim.questions.length} questions before proceeding.`);
      return;
    }

    if (this.currentStep < this.totalSteps - 1) {
      this.showStep(this.currentStep + 1);
    }
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
    // Validate last step
    const dim = ASSESSMENT_DIMENSIONS[this.currentStep];
    const unanswered = dim.questions.filter(q => !this.answers[q.id]);
    if (unanswered.length > 0) {
      alert(`Please answer all ${dim.questions.length} questions before proceeding.`);
      return;
    }

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

    if (!nameInput.value || !emailInput.value) {
      alert('Please enter your name and email to see your results.');
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
            <h3>${data.icon} ${data.title}</h3>
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
    window.scrollTo({ top: resultsSection.offsetTop - 100, behavior: 'smooth' });
  }

  // --- Radar Chart (Chart.js) ---
  renderRadarChart(results) {
    const ctx = document.getElementById('radar-chart');
    if (!ctx) return;

    // Use shorter labels to prevent cutoff
    const shortLabels = {
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
          pointRadius: 6
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
        layout: {
          padding: 20
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: {
              stepSize: 1,
              font: { size: 11 },
              color: '#666666',
              backdropColor: 'transparent'
            },
            pointLabels: {
              font: { size: 13, weight: '600' },
              color: '#ffffff',
              padding: 15
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
              padding: 24,
              font: { size: 13 },
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
    let y = 20;

    // Header
    doc.setFillColor(28, 28, 28);
    doc.rect(0, 0, pageWidth, 50, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text('Test Automation Maturity Assessment', 20, 25);
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text(`Prepared for: ${this.userName}${this.userCompany ? ' — ' + this.userCompany : ''}`, 20, 35);
    doc.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, 20, 43);

    y = 65;

    // Overall Score
    doc.setTextColor(26, 26, 46);
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Overall Maturity Score', 20, y);
    y += 10;

    doc.setFontSize(36);
    doc.setTextColor(184, 150, 28);
    doc.text(`${results.overall.toFixed(1)} / 5.0`, 20, y + 5);

    doc.setFontSize(14);
    doc.setTextColor(150, 121, 15);
    doc.text(`Level ${results.overallLevel}: ${levelInfo.name}`, 80, y - 2);
    doc.setFontSize(10);
    doc.setTextColor(108, 117, 125);
    doc.text(levelInfo.tagline, 80, y + 5);

    y += 25;

    // Dimension Scores
    doc.setFontSize(16);
    doc.setTextColor(26, 26, 46);
    doc.setFont(undefined, 'bold');
    doc.text('Dimension Scores', 20, y);
    y += 10;

    Object.entries(results.dimensions).forEach(([dimId, data]) => {
      if (y > 250) {
        doc.addPage();
        y = 20;
      }

      const rec = RECOMMENDATIONS[dimId][data.level] || '';
      const barWidth = 100;
      const fillWidth = (data.score / 5) * barWidth;
      const barColor = data.score < 2.5 ? [192, 57, 43] : data.score < 3.5 ? [212, 160, 23] : [184, 150, 28];

      // Dimension name and score
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(26, 26, 46);
      doc.text(`${data.title}`, 20, y);
      doc.setTextColor(...barColor);
      doc.text(`${data.score.toFixed(1)} / 5.0`, 160, y);

      y += 5;

      // Score bar
      doc.setFillColor(222, 226, 230);
      doc.roundedRect(20, y, barWidth, 4, 2, 2, 'F');
      doc.setFillColor(...barColor);
      doc.roundedRect(20, y, fillWidth, 4, 2, 2, 'F');

      y += 10;

      // Recommendation
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(73, 80, 87);
      const recLines = doc.splitTextToSize(`Recommendation: ${rec}`, pageWidth - 40);
      doc.text(recLines, 20, y);
      y += recLines.length * 5 + 8;
    });

    // CTA
    if (y > 240) {
      doc.addPage();
      y = 20;
    }

    y += 10;
    doc.setFillColor(184, 150, 28);
    doc.roundedRect(15, y, pageWidth - 30, 30, 5, 5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Ready to Level Up?', 20, y + 12);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Book a free consultation with Bosch Technologies to build your improvement roadmap.', 20, y + 22);

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text('Bosch Technologies — boschtechnologies.com', 20, 290);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 35, 290);
    }

    doc.save(`Bosch-Maturity-Assessment-${this.userName.replace(/\s+/g, '-')}.pdf`);
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

// --- Initialize on page load ---
let assessment;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('assessment-sections')) {
    assessment = new MaturityAssessment();
  }
});
