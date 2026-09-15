<?php
/**
 * Private Client Service Agreement — WeConnectU
 * Password-protected. Only accessible with the correct access code.
 *
 * Unlike the proposal pages, this page does NOT render the contract's legal
 * text as static HTML. It shows a brief commercial summary and a form for
 * the variable fields (registration numbers, addresses, signatories), and
 * the full legal document is only produced as a generated PDF.
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
  <title>Service Agreement — WeConnectU — Bosch Technologies</title>
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
      <h1>Client Document</h1>
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
          <button type="submit" class="btn btn-accent btn-lg" style="width: 100%; justify-content: center;">View Document →</button>
        </form>
      </div>
    </div>
  </section>

<?php else: ?>

  <!-- Hero -->
  <section class="service-hero" style="padding-bottom: 24px;">
    <div class="container">
      <span class="badge badge-accent">Confidential Document</span>
      <h1>Master Services Agreement</h1>
      <p>Prepared for <strong>WeConnectU</strong> by Bosch Technologies</p>
      <a href="/clients/weconnectu/alternative-engagement.php" class="btn btn-outline" style="margin-top: 16px;">← Back to Proposal</a>
    </div>
  </section>

  <!-- Content -->
  <section class="section" style="padding-top: 0;">
    <div class="container proposal-content">

      <!-- Overview -->
      <div class="proposal-option-card">
        <h2>Overview</h2>
        <p>This is the service agreement for the Test Strategy Implementation &amp; Quality Assurance Recruitment engagement. The full legal terms and conditions are only available in the downloadable PDF below &mdash; this page summarises the key commercial terms.</p>
        <ul>
          <li><strong>Term:</strong> 6 months from the Effective Date</li>
          <li><strong>Fee:</strong> R100,000 per month, inclusive of VAT (R600,000 total)</li>
          <li><strong>Invoicing:</strong> On the 25th of each month (or the preceding Friday if the 25th falls on a weekend)</li>
          <li><strong>Payment Terms:</strong> Within 5 days of invoice date, by EFT</li>
          <li><strong>Working Arrangement:</strong> Remote and non-exclusive</li>
          <li><strong>Included:</strong> Recruitment, training, and upskilling of a permanent Quality Assurance Engineer</li>
        </ul>
      </div>

      <!-- Fill-in Details -->
      <div class="proposal-option-card">
        <h2>Complete the Details Below</h2>
        <p class="text-muted">Any field left blank will appear as a blank underlined line in the PDF, ready to be completed by hand. Fields you complete here will be filled in automatically when the PDF is generated.</p>

        <h3>The Service Provider</h3>
        <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 12px;">Bosch Technologies &middot; Reg. No. 2013/003965/07 &middot; 83 Vredeveld Street, Burgundy, Brackenfell, Western Cape, 7560</p>
        <div class="form-group">
          <label for="sp-full-name">Full Registered Name</label>
          <input type="text" id="sp-full-name" placeholder="e.g. Bosch Technologies (Pty) Ltd">
        </div>
        <div class="form-group">
          <label for="sp-rep">Represented By (Name &amp; Title)</label>
          <input type="text" id="sp-rep" placeholder="e.g. Garth Bosch, Founder">
        </div>

        <h3>The Client</h3>
        <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 12px;">WeConnectU &middot; Reg. No. 2017/012125/07 &middot; 65 Kara Place, Olive Grove Business Park, Somerset West, Western Cape, 7130</p>
        <div class="form-group">
          <label for="client-full-name">Full Registered Name</label>
          <input type="text" id="client-full-name" placeholder="e.g. WeConnectU (Pty) Ltd">
        </div>
        <div class="form-group">
          <label for="client-rep">Represented By (Name &amp; Title)</label>
          <input type="text" id="client-rep" placeholder="Authorised signatory name & title">
        </div>

        <h3>Agreement Details</h3>
        <div class="form-group">
          <label for="effective-date">Effective Date</label>
          <input type="date" id="effective-date">
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="generateServiceAgreementPDF()" class="btn btn-primary btn-lg"><i data-lucide="file-text"></i> Download Service Agreement (PDF)</button>
        <a href="/clients/weconnectu/alternative-engagement.php" class="btn btn-outline btn-lg">← Back to Proposal</a>
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
  <script>
  async function loadLogo(src, targetH) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = src; });
      const aspect = img.naturalWidth / img.naturalHeight;
      const targetW = Math.round(targetH * aspect);
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, targetW, targetH);
      return { dataUrl: canvas.toDataURL('image/png'), aspect };
    } catch (e) {
      console.log('Logo skipped:', src);
      return null;
    }
  }

  function fieldVal(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
  }

  async function generateServiceAgreementPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginL = 15;
    const contentW = pageWidth - marginL - 15;
    const bottomMargin = 20;
    let y = 0;

    const gold = [184, 150, 28];
    const dark = [26, 26, 46];
    const grey = [108, 117, 125];
    const lightGrey = [160, 160, 160];

    // Fixed, known facts (not editable on-page since they are already known)
    const SP_REG = '2013/003965/07';
    const SP_ADDRESS = '83 Vredeveld Street, Burgundy, Brackenfell, Western Cape, 7560';
    const CLIENT_REG = '2017/012125/07';
    const CLIENT_ADDRESS = '65 Kara Place, Olive Grove Business Park, Somerset West, Western Cape, 7130';

    // Collected field values
    const sp = {
      name: fieldVal('sp-full-name'),
      rep: fieldVal('sp-rep'),
    };
    const client = {
      name: fieldVal('client-full-name'),
      rep: fieldVal('client-rep'),
    };
    const effectiveDate = formatDate(fieldVal('effective-date'));

    // Load both logos (downscaled to keep the PDF small)
    const boschLogo = await loadLogo('/assets/images/logo.png', 340);
    const wcuLogo = await loadLogo('/assets/images/client-logos/weconnectu-logo.png', 340);

    function checkPage(needed) {
      if (y + needed > pageHeight - bottomMargin) { doc.addPage(); y = 20; }
    }

    function heading(text) {
      checkPage(14);
      doc.setFontSize(13);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...dark);
      doc.text(text, marginL, y);
      y += 7;
    }

    function subheading(text) {
      checkPage(10);
      doc.setFontSize(10.5);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...gold);
      doc.text(text, marginL, y);
      y += 5.5;
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

    function bulletList(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...grey);
      items.forEach(item => {
        const lines = doc.splitTextToSize(item, contentW - 8);
        checkPage(lines.length * 4 + 2);
        doc.text('•', marginL + 2, y);
        doc.text(lines, marginL + 8, y);
        y += lines.length * 4 + 1.5;
      });
      y += 2;
    }

    // Numbered legal sub-clauses (e.g. "6.1 ..."); items already include their own numbering
    function clauseItems(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...grey);
      items.forEach(item => {
        const lines = doc.splitTextToSize(item, contentW);
        checkPage(lines.length * 4 + 2);
        doc.text(lines, marginL, y);
        y += lines.length * 4 + 2;
      });
      y += 2;
    }

    // A label/value row; draws a blank underlined line if value is empty
    function fieldRow(label, value) {
      checkPage(9);
      const labelText = label + ': ';
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...dark);
      doc.text(labelText, marginL, y);
      const labelW = doc.getTextWidth(labelText);
      if (value) {
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...grey);
        const lines = doc.splitTextToSize(value, contentW - labelW);
        doc.text(lines, marginL + labelW, y);
        y += lines.length * 5;
      } else {
        doc.setDrawColor(...lightGrey);
        doc.line(marginL + labelW, y - 1, marginL + contentW, y - 1);
        y += 5;
      }
    }

    function table(headers, rows, footerRow) {
      const cols = headers ? headers.length : rows[0].length;
      const colW = contentW / cols;
      const rowH = 8;
      if (headers) {
        checkPage(rowH + 2);
        doc.setFillColor(28, 28, 28);
        doc.rect(marginL, y, contentW, rowH, 'F');
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        headers.forEach((h, i) => doc.text(h, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      }
      rows.forEach((row, idx) => {
        checkPage(rowH + 2);
        if (idx % 2 === 0) {
          doc.setFillColor(245, 245, 245);
          doc.rect(marginL, y, contentW, rowH, 'F');
        }
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...dark);
        row.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      });
      if (footerRow) {
        checkPage(rowH + 2);
        doc.setFillColor(28, 28, 28);
        doc.rect(marginL, y, contentW, rowH, 'F');
        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...gold);
        footerRow.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      }
      y += 4;
    }

    function newPage() { doc.addPage(); y = 20; }

    // --- Letterhead (both logos) ---
    const headerH = 42;
    doc.setFillColor(28, 28, 28);
    doc.rect(0, 0, pageWidth, headerH, 'F');
    const logoH = 14;
    if (boschLogo) {
      doc.addImage(boschLogo.dataUrl, 'PNG', marginL, 6, logoH * boschLogo.aspect, logoH);
    }
    if (wcuLogo) {
      const w = logoH * wcuLogo.aspect;
      doc.addImage(wcuLogo.dataUrl, 'PNG', pageWidth - marginL - w, 6, w, logoH);
    }
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.text('MASTER SERVICES AGREEMENT', pageWidth / 2, 28, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(200, 200, 200);
    doc.text('Test Strategy Implementation & Quality Assurance Recruitment Engagement', pageWidth / 2, 35, { align: 'center' });
    y = headerH + 10;

    // --- Parties ---
    heading('The Service Provider');
    fieldRow('Bosch Technologies', sp.name);
    fieldRow('Registration No', SP_REG);
    fieldRow('Address', SP_ADDRESS);
    fieldRow('Represented by', sp.rep);
    paragraph('Email: admin@boschtechnologies.com');
    paragraph('("Bosch Technologies" or "the Service Provider")');

    heading('The Client');
    fieldRow('WeConnectU', client.name);
    fieldRow('Registration No', CLIENT_REG);
    fieldRow('Address', CLIENT_ADDRESS);
    fieldRow('Represented by', client.rep);
    paragraph('Tel: +27 86 999 0756');
    paragraph('("WeConnectU" or "the Client")');

    paragraph('Bosch Technologies and WeConnectU are each referred to individually as a "Party" and collectively as the "Parties".');
    fieldRow('Effective Date', effectiveDate);

    // --- 1. Background ---
    heading('1. Background');
    clauseItems([
      '1.1 The Client wishes to establish a structured software test strategy, implement automation test frameworks, and build a permanent, in-house Quality Assurance capability.',
      '1.2 The Service Provider is a quality engineering consultancy that specialises in automation test strategy, test framework implementation, and quality engineering enablement.',
      '1.3 The Client has engaged the Service Provider to design and implement a test strategy, stand up automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer at the Client to take ownership of the capability at the end of the engagement.',
      '1.4 The Parties wish to record the terms on which these services will be provided in this Agreement.'
    ]);

    // --- 2. Definitions ---
    heading('2. Definitions and Interpretation');
    clauseItems([
      '2.1 "Deliverables" means the test strategy document, automation test frameworks, documentation, and other work product produced by the Service Provider under this Agreement, as further described in Schedule A.',
      '2.2 "Key Consultant" means Garth Bosch, the individual through whom the Service Provider will principally perform the Services.',
      '2.3 "Permanent Hire" means the Quality Assurance Engineer recruited by the Service Provider under clause 6 to be permanently employed by the Client.',
      '2.4 "Services" means the services described in Schedule A.',
      '2.5 "Term" means the period described in clause 4.',
      '2.6 Clause headings are for convenience only and do not affect interpretation. A reference to a statute includes any amendment or re-enactment of it.'
    ]);

    // --- 3. Scope ---
    heading('3. Scope of Services');
    paragraph('The Service Provider shall provide the following Services to the Client during the Term, as more fully described in Schedule A:');
    bulletList([
      'Design and implementation of a comprehensive quality engineering test strategy tailored to the Client;',
      'Set-up and configuration of automation test frameworks and supporting tooling;',
      'Ongoing leadership of quality assurance initiatives during the Term; and',
      'Recruitment, training, and upskilling of a Permanent Hire to take over the test strategy and automation frameworks at the end of the Term, in accordance with clauses 6 and 7.'
    ]);

    // --- 4. Term ---
    heading('4. Term');
    clauseItems([
      '4.1 This Agreement commences on the Effective Date and continues for a fixed period of six (6) months (the "Term"), unless terminated earlier in accordance with clause 14.',
      '4.2 The Parties may agree in writing to extend or renew the Term on the same or varied terms.'
    ]);

    // --- 5. Fees ---
    heading('5. Fees and Payment');
    fieldRow('Monthly Fee', 'R100,000.00 (one hundred thousand Rand) per month, inclusive of VAT');
    fieldRow('Total Contract Value', 'R600,000.00 (six hundred thousand Rand) over the 6-month Term, inclusive of VAT');
    fieldRow('Invoicing', 'On the 25th day of each month of the Term. Where the 25th falls on a Saturday or Sunday, the invoice shall be issued on the preceding Friday.');
    fieldRow('Payment Terms', 'Payable within 5 days of invoice date, by electronic funds transfer to the bank account nominated by the Service Provider.');
    fieldRow('Expenses', 'No travel, accommodation, or third-party tooling expenses are included unless separately agreed in writing in advance.');
    y += 2;
    paragraph("The Permanent Hire's recruitment under clause 6 is included in the Monthly Fee and carries no separate placement fee, provided the recruitment is completed within the Term.");

    // --- 6. Recruitment ---
    heading('6. Recruitment of the Permanent Hire');
    clauseItems([
      '6.1 The Service Provider shall identify, screen, and recruit a Quality Assurance Engineer to be employed permanently and directly by the Client (the Permanent Hire), with recruitment to be substantially completed before the end of the Term.',
      '6.2 The employment relationship, remuneration, benefits, and employment contract between the Client and the Permanent Hire are matters solely between the Client and that individual. The Service Provider is not a party to, and accepts no liability arising from, that employment relationship.',
      "6.3 The Client remains responsible for final selection and hiring decisions. The Service Provider's role is to source, screen, and recommend candidates and to support the interview process.",
      "6.4 If recruitment of the Permanent Hire is delayed due to the Client's unavailability for interviews, the Client's rejection of suitably qualified candidates presented by the Service Provider, or a shortage of suitably qualified candidates in the market despite the Service Provider's reasonable efforts, such delay shall not constitute a breach of this Agreement by the Service Provider. In that event, the Parties shall discuss in good faith a reasonable extension of the recruitment timeline."
    ]);

    // --- 7. Training ---
    heading('7. Training, Upskilling and Knowledge Transfer');
    clauseItems([
      '7.1 The Service Provider shall train and mentor the Permanent Hire (once appointed) on the test strategy, automation frameworks, and associated processes and tooling developed under this Agreement.',
      '7.2 The Service Provider shall prepare a transition plan and supporting documentation sufficient to enable the Permanent Hire to independently operate and evolve the test strategy and automation frameworks after the end of the Term.',
      '7.3 Knowledge transfer is deemed complete upon delivery of the documentation referred to in clause 7.2 and joint sign-off by both Parties of the transition checklist in Schedule A.'
    ]);

    // --- 8. Working Arrangements ---
    heading('8. Working Arrangements and Non-Exclusivity');
    clauseItems([
      "8.1 Location. The Key Consultant may perform the Services from any location of his choosing and is not required to work on-site at the Client's premises, save where the Parties agree that a specific activity requires an on-site presence.",
      "8.2 Non-Exclusivity. This engagement is non-exclusive. The Service Provider (including the Key Consultant) is free to provide services to other clients during the Term, provided this does not materially impair the Service Provider's ability to perform its obligations under this Agreement.",
      '8.3 Effort Commitment. Notwithstanding clause 8.2, the Service Provider shall dedicate sufficient time and attention to the Client to deliver the Services in accordance with the timelines agreed under Schedule A.',
      "8.4 Key Person. The Service Provider shall ensure that the Services are principally performed by the Key Consultant, and shall not substitute the Key Consultant for another individual without the Client's prior written consent (not to be unreasonably withheld), save where substitution is necessary due to the Key Consultant's illness, incapacity, or unavailability arising from circumstances beyond the Service Provider's reasonable control."
    ]);

    // --- 9. Independent Contractor ---
    heading('9. Independent Contractor Status');
    clauseItems([
      '9.1 The Service Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship between the Parties, or between the Client and the Key Consultant.',
      "9.2 The Service Provider is solely responsible for its own tax, statutory, and regulatory obligations (including income tax, VAT, and any applicable South African Revenue Service filings) arising from amounts received under this Agreement. The Client shall not withhold employees' tax (PAYE), make UIF or Skills Development Levy contributions, or provide employee benefits in respect of the Service Provider or the Key Consultant.",
      '9.3 The Service Provider has the right to determine the manner, method, and means by which the Services are performed, subject to the deliverables and timelines agreed under Schedule A.'
    ]);

    // --- 10. IP ---
    heading('10. Intellectual Property');
    clauseItems([
      '10.1 Subject to clause 10.2 and full payment of all Fees due under this Agreement, all Deliverables created specifically for the Client under this Agreement (including the test strategy document and any bespoke automation test scripts) shall vest in and become the property of the Client upon creation.',
      '10.2 The Service Provider retains ownership of all pre-existing tools, templates, methodologies, frameworks, and know-how that it owned or developed prior to, or independently of, this Agreement ("Background IP"), and grants the Client a perpetual, royalty-free, non-exclusive licence to use any Background IP incorporated into the Deliverables for the Client\'s internal business purposes.',
      "10.3 Nothing in this Agreement transfers ownership of any third-party or open-source software, tools, or licences used in delivering the Services; the Client's use of such items remains subject to their respective licence terms."
    ]);

    // --- 11. Confidentiality ---
    heading('11. Confidentiality');
    clauseItems([
      '11.1 Each Party shall keep confidential all non-public information disclosed by the other Party in connection with this Agreement and shall use it only for the purposes of this Agreement.',
      '11.2 This obligation does not apply to information that is public, was already known to the receiving Party, is independently developed, or must be disclosed by law or regulation.',
      '11.3 This clause survives termination or expiry of this Agreement for a period of three (3) years.'
    ]);

    // --- 12. Data Protection ---
    heading('12. Data Protection');
    clauseItems([
      '12.1 To the extent the Service Provider processes any personal information on behalf of the Client in the course of performing the Services (including candidate personal information gathered during recruitment under clause 6), it shall do so in accordance with the Protection of Personal Information Act 4 of 2013 ("POPIA") and only for the purposes of this Agreement.',
      '12.2 Each Party shall implement reasonable technical and organisational measures to safeguard personal information in its possession or control against loss, unauthorised access, or disclosure.'
    ]);

    // --- 13. Warranties ---
    heading('13. Warranties');
    clauseItems([
      '13.1 The Service Provider warrants that it shall perform the Services with reasonable skill, care, and diligence consistent with generally accepted industry standards for quality engineering consulting.',
      '13.2 Save as expressly stated in this Agreement, all other warranties, conditions, or representations, whether express or implied by law, are excluded to the maximum extent permitted by law.'
    ]);

    // --- 14. Termination ---
    heading('14. Termination');
    clauseItems([
      "14.1 For Convenience. Either Party may terminate this Agreement by giving the other Party not less than thirty (30) days' prior written notice.",
      '14.2 For Cause. Either Party may terminate this Agreement with immediate effect on written notice if the other Party commits a material breach of this Agreement that is not remedied within fourteen (14) days of receiving written notice of the breach.',
      "14.3 Effect of Termination. On termination, the Client shall pay the Service Provider for Services properly performed and Fees accrued up to the effective date of termination, on a pro-rata basis for any partial month. If this Agreement is terminated before the Permanent Hire's recruitment and knowledge transfer under clauses 6 and 7 are complete, the Parties shall discuss in good faith a reasonable arrangement to complete or hand over that process.",
      '14.4 Clauses 9, 10, 11, 12, 15, 16, 18, and 19 survive termination or expiry of this Agreement.'
    ]);

    // --- 15. Limitation of Liability ---
    heading('15. Limitation of Liability');
    clauseItems([
      '15.1 Neither Party shall be liable to the other for any indirect, special, or consequential loss, or loss of profits, revenue, or business opportunity, arising out of or in connection with this Agreement.',
      "15.2 The Service Provider's aggregate liability arising out of or in connection with this Agreement, whether in contract, delict, or otherwise, shall not exceed the total Fees paid by the Client under this Agreement in the six (6) months preceding the event giving rise to the claim.",
      '15.3 Nothing in this Agreement limits liability for gross negligence, wilful misconduct, or fraud, to the extent such limitation is not permitted by law.'
    ]);

    // --- 16. Non-Solicitation ---
    heading('16. Non-Solicitation');
    paragraph("Neither Party shall, during the Term and for twelve (12) months thereafter, directly solicit for employment any employee or contractor of the other Party who was materially involved in the performance of this Agreement, without that Party's prior written consent. This clause does not restrict the Client's right to permanently employ the Permanent Hire recruited under clause 6, which is the intended and agreed purpose of this Agreement.");

    // --- 17. Force Majeure ---
    heading('17. Force Majeure');
    paragraph('Neither Party shall be liable for any delay or failure to perform its obligations (other than payment obligations) resulting from causes beyond its reasonable control, including acts of God, load-shedding or extended power outages, internet or telecommunications failures, or governmental action, provided the affected Party notifies the other Party promptly and uses reasonable efforts to mitigate the impact.');

    // --- 18. Governing Law ---
    heading('18. Governing Law and Dispute Resolution');
    clauseItems([
      '18.1 This Agreement is governed by the laws of the Republic of South Africa.',
      '18.2 The Parties shall first attempt to resolve any dispute arising out of this Agreement through good-faith negotiation between senior representatives. If unresolved within thirty (30) days, either Party may refer the dispute to the courts of South Africa having jurisdiction, or to mediation/arbitration if the Parties so agree in writing.'
    ]);

    // --- 19. General ---
    heading('19. General');
    clauseItems([
      '19.1 Entire Agreement. This Agreement, including its Schedules, constitutes the entire agreement between the Parties regarding its subject matter and supersedes all prior discussions, proposals, and understandings, save to the extent expressly incorporated by reference.',
      '19.2 Amendment. No amendment or variation of this Agreement is effective unless in writing and signed by authorised representatives of both Parties.',
      "19.3 Assignment. Neither Party may assign or delegate its rights or obligations under this Agreement without the other Party's prior written consent, save that the Service Provider may subcontract elements of the Services with the Client's prior written consent, not to be unreasonably withheld.",
      '19.4 Notices. Notices under this Agreement must be given in writing and delivered by email to the representatives named on the signature page, or such other address as either Party notifies to the other.',
      '19.5 Severability. If any provision of this Agreement is found invalid or unenforceable, the remaining provisions continue in full force and effect.',
      '19.6 Counterparts. This Agreement may be signed in counterparts (including electronically), each of which is deemed an original, and together constitute one agreement.'
    ]);

    // --- Schedule A ---
    newPage();
    heading('Schedule A — Services, Deliverables & Key Terms');
    subheading('A.1 Scope of Work');
    bulletList([
      'Design and implement a comprehensive test strategy;',
      'Set up all automation test frameworks;',
      'Lead quality assurance initiatives throughout the Term;',
      'Recruit, train, and upskill the Permanent Hire to take over at the end of the Term.'
    ]);
    subheading('A.2 Deliverables');
    bulletList([
      "Comprehensive test strategy document aligned with the Client's needs;",
      'Automated test framework implementation (tools, infrastructure, processes);',
      'Training and mentoring records for the Permanent Hire;',
      'Documentation and best practices guides;',
      'Transition plan and signed-off knowledge transfer checklist.'
    ]);
    subheading('A.3 Key Terms');
    bulletList([
      'Garth has the flexibility to work from anywhere and is not limited to working exclusively for the Client (see clause 8);',
      'Before the end of the 6-month engagement, the Service Provider will recruit a permanent Quality Assurance Engineer for the Client (see clause 6);',
      'Full upskilling and handover of the test strategy and automation frameworks to the Permanent Hire (see clause 7).'
    ]);

    // --- Schedule B ---
    heading('Schedule B — Fees & Payment Schedule');
    table(['Month', '1', '2', '3', '4', '5', '6', 'Total'], [
      ['Fee (incl. VAT)', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R600,000']
    ], null);

    // --- Signatures ---
    newPage();
    heading('Signatures');
    paragraph('Signed by the duly authorised representatives of the Parties:');

    const sigColW = (contentW - 10) / 2;
    const sigStartY = y + 4;

    if (boschLogo) {
      const h = 9, w = h * boschLogo.aspect;
      doc.addImage(boschLogo.dataUrl, 'PNG', marginL, sigStartY, w, h);
    }
    if (wcuLogo) {
      const h = 9, w = h * wcuLogo.aspect;
      doc.addImage(wcuLogo.dataUrl, 'PNG', marginL + sigColW + 10, sigStartY, w, h);
    }
    y = sigStartY + 15;

    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...dark);
    doc.text('For and on behalf of the Service Provider', marginL, y);
    doc.text('For and on behalf of the Client', marginL + sigColW + 10, y);
    y += 12;

    doc.setDrawColor(...lightGrey);
    doc.line(marginL, y, marginL + sigColW, y);
    doc.line(marginL + sigColW + 10, y, marginL + sigColW + 10 + sigColW, y);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...grey);
    doc.text('Signature', marginL, y + 4);
    doc.text('Signature', marginL + sigColW + 10, y + 4);
    y += 12;

    function sigField(label, leftValue, rightValue) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...dark);
      const labelText = label + ': ';
      const labelW = doc.getTextWidth(labelText);
      doc.text(labelText, marginL, y);
      doc.text(labelText, marginL + sigColW + 10, y);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...grey);
      if (leftValue) {
        doc.text(leftValue, marginL + labelW, y);
      } else {
        doc.setDrawColor(...lightGrey);
        doc.line(marginL + labelW, y - 1, marginL + sigColW, y - 1);
      }
      if (rightValue) {
        doc.text(rightValue, marginL + sigColW + 10 + labelW, y);
      } else {
        doc.setDrawColor(...lightGrey);
        doc.line(marginL + sigColW + 10 + labelW, y - 1, marginL + sigColW + 10 + sigColW, y - 1);
      }
      y += 9;
    }

    sigField('Full Name & Title', sp.rep, client.rep);
    sigField('Date', '', '');

    doc.save('WeConnectU-Master-Services-Agreement.pdf');
  }
  </script>
  <?php endif; ?>
</body>
</html>
