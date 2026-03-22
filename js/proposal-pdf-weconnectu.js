/* ============================================
   BOSCH TECHNOLOGIES — Proposal PDF Generator
   WeConnectU: QE Process Discovery & Improvement
   ============================================ */

async function generateProposalPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginL = 15;
  const marginR = 15;
  const contentW = pageWidth - marginL - marginR;
  const contactUrl = 'https://boschtechnologies.com/contact/';
  const bottomMargin = 20;
  let y = 0;

  // Colours
  const gold = [184, 150, 28];
  const dark = [26, 26, 46];
  const grey = [108, 117, 125];
  const white = [255, 255, 255];
  const lightBg = [245, 245, 245];

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

  // --- Helper: check for page break ---
  function checkPage(needed) {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      y = 20;
    }
  }

  // --- Helper: section heading ---
  function heading(text, size) {
    size = size || 14;
    checkPage(14);
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(text, marginL, y);
    y += size === 14 ? 8 : 7;
  }

  // --- Helper: wrapped heading (for long titles) ---
  function wrappedHeading(text, size) {
    size = size || 14;
    doc.setFontSize(size);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    var lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 6 + 4);
    doc.text(lines, marginL, y);
    y += lines.length * 6 + 4;
  }

  // --- Helper: sub-heading ---
  function subheading(text) {
    checkPage(10);
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...gold);
    doc.text(text, marginL, y);
    y += 6;
  }

  // --- Helper: paragraph ---
  function paragraph(text) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    const lines = doc.splitTextToSize(text, contentW);
    checkPage(lines.length * 4 + 2);
    doc.text(lines, marginL, y);
    y += lines.length * 4 + 3;
  }

  // --- Helper: bullet list ---
  function bulletList(items) {
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    items.forEach(function(item) {
      const lines = doc.splitTextToSize(item, contentW - 8);
      checkPage(lines.length * 4 + 2);
      doc.text('•', marginL + 2, y);
      doc.text(lines, marginL + 8, y);
      y += lines.length * 4 + 1.5;
    });
    y += 2;
  }

  // --- Helper: start a new page ---
  function newPage() {
    doc.addPage();
    y = 20;
  }

  // ==========================================
  //  PAGE 1: Header
  // ==========================================
  var headerH = 68;
  doc.setFillColor(28, 28, 28);
  doc.rect(0, 0, pageWidth, headerH, 'F');

  if (logoDataUrl) {
    var logoH = 28;
    var logoW = logoH * logoAspect;
    doc.addImage(logoDataUrl, 'PNG', (pageWidth - logoW) / 2, 3, logoW, logoH);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont(undefined, 'bold');
  var titleLines = doc.splitTextToSize('Quality Engineering Process Discovery, Skill Assessment & Improvement Proposal', pageWidth - 40);
  doc.text(titleLines, pageWidth / 2, 36, { align: 'center' });

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Prepared for WeConnectU by Bosch Technologies', pageWidth / 2, 54, { align: 'center' });
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(new Date().toLocaleDateString('en-GB'), pageWidth / 2, 62, { align: 'center' });

  y = headerH + 10;

  // ==========================================
  //  Section 1: Understand QE Process & Skill Level
  // ==========================================
  wrappedHeading('Understand Quality Engineering Process & Assess Skill Level');

  subheading('Objective');
  paragraph("Gain a thorough understanding of the current Quality Engineering processes in place and conduct a high-level assessment of the QE team's skill levels. This discovery phase will provide the foundation for identifying gaps, strengths, and areas of improvement.");

  subheading('Activities');
  bulletList([
    'Meeting the Team — Introductory sessions with the Quality Engineering team members to understand roles, responsibilities, and current ways of working.',
    'Stakeholder Engagement — Conduct 1-hour meetings over 5 consecutive days with important stakeholders across Engineering, Product, and Leadership to gather insights into the current QE process, challenges, and expectations.'
  ]);

  subheading('Outcomes');
  bulletList([
    'A comprehensive report detailing all findings from the Quality Engineering Process Discovery.',
    'A High-level Measure of QE Skill Levels across the team, highlighting current capabilities, skill gaps, and recommendations.'
  ]);

  subheading('Investment');
  checkPage(14);
  doc.setFillColor(...gold);
  doc.roundedRect(marginL, y - 1, contentW, 12, 3, 3, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('R7,000', pageWidth / 2, y + 6, { align: 'center' });
  y += 16;

  // ==========================================
  //  Section 2: Improvement Engagement
  // ==========================================
  newPage();
  wrappedHeading('Improvement Engagement');

  subheading('Overview');
  paragraph('Detailed information regarding the Improvement Engagement will be provided after the Quality Engineering Process Discovery and High-level Measure of QE Skill Level engagement (Section 1) has been concluded.');
  paragraph('The findings and recommendations from the discovery phase will directly inform the scope, activities, and investment required for the improvement engagement, ensuring a tailored approach that addresses the specific needs identified during the assessment.');

  // ==========================================
  //  Next Steps
  // ==========================================
  y += 6;
  heading('Next Steps');
  var steps = [
    'Discovery — 5-day stakeholder engagement and team assessment',
    'Report — Delivery of QE Process and Skill Level findings',
    'Improvement — Tailored improvement engagement proposal'
  ];
  var stepW = contentW / 3;
  checkPage(24);
  steps.forEach(function(step, i) {
    var parts = step.split(' — ');
    var sx = marginL + i * stepW;
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(sx + 1, y, stepW - 2, 20, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text(parts[0], sx + stepW / 2, y + 7, { align: 'center' });
    doc.setFontSize(7);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...grey);
    var descLines = doc.splitTextToSize(parts[1], stepW - 8);
    doc.text(descLines, sx + stepW / 2, y + 13, { align: 'center' });
  });
  y += 28;

  // ==========================================
  //  CTA Footer
  // ==========================================
  var ctaH = 24;
  var ctaY = pageHeight - ctaH;
  if (y > ctaY - 10) {
    doc.addPage();
    ctaY = pageHeight - ctaH;
  }
  doc.setFillColor(28, 28, 28);
  doc.rect(0, ctaY, pageWidth, ctaH, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('Ready to Get Started?', marginL, ctaY + 9);
  doc.setFontSize(8);
  doc.setFont(undefined, 'normal');
  doc.setTextColor(200, 200, 200);
  doc.text('Contact Bosch Technologies to discuss the best engagement option for your team.', marginL, ctaY + 15);
  doc.setTextColor(...gold);
  doc.setFont(undefined, 'bold');
  var linkText = 'boschtechnologies.com/contact';
  doc.text(linkText, marginL, ctaY + 21);
  var linkW = doc.getTextWidth(linkText);
  doc.link(marginL, ctaY + 18, linkW, 5, { url: contactUrl });

  // --- Save ---
  doc.save('Bosch-Technologies-Proposal-WeConnectU.pdf');
}
