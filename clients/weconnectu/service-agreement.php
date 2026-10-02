<?php
/**
 * Private Client Service Agreement — WeConnectU
 * Password-protected. Only accessible with the correct access code.
 *
 * Unlike the proposal pages, this page does NOT render the contract's legal
 * text as static HTML. It shows a brief commercial summary and a form for
 * the variable fields (registration numbers, addresses, signatories), and
 * the full legal document is only produced as a generated PDF or Word document.
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
        <p>This is the service agreement for the Test Strategy Implementation &amp; Quality Assurance Recruitment engagement. The full legal terms and conditions are only available in the downloadable PDF or Word document below &mdash; this page summarises the key commercial terms.</p>
        <ul>
          <li><strong>Term:</strong> 6 months from the Effective Date</li>
          <li><strong>Fee:</strong> R100,000 per month, inclusive of VAT (R600,000 total)</li>
          <li><strong>Invoicing:</strong> On the 25th of each month (or the preceding Friday if the 25th falls on a weekend)</li>
          <li><strong>Payment Terms:</strong> Within 5 days of invoice date, by EFT</li>
          <li><strong>Working Arrangement:</strong> Remote and non-exclusive</li>
          <li><strong>Included:</strong> Recruitment, training, and upskilling of a permanent Quality Assurance Engineer, plus upskilling of the existing 2 Quality Assurance Testers</li>
          <li><strong>Success Measures:</strong> Quality Engineer hired, automation test frameworks implemented, quality gates implemented in the deployment pipelines, and upskilling of the Quality Engineer and existing QA Testers</li>
        </ul>
      </div>

      <!-- Fill-in Details -->
      <div class="proposal-option-card">
        <h2>Agreement Details</h2>
        <p class="text-muted">Select the Effective Date below. If left blank, it will appear as a blank underlined line in the downloaded document, ready to be completed by hand.</p>

        <h3>The Service Provider</h3>
        <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 12px;">Bosch Technologies (Pty) Ltd &middot; Reg. No. 2013/003965/07 &middot; 83 Vredeveld Street, Burgundy, Brackenfell, Western Cape, 7560 &middot; Represented by Garth Bosch, Founder</p>

        <h3>The Client</h3>
        <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 12px;">WeConnectU (Pty) Ltd &middot; Reg. No. 2017/012125/07 &middot; 65 Kara Place, Olive Grove Business Park, Somerset West, Western Cape, 7130 &middot; Represented by Dani&euml;l Van Der Merwe, Director</p>

        <div class="form-group">
          <label for="effective-date">Effective Date</label>
          <input type="date" id="effective-date">
        </div>
      </div>

      <!-- CTA -->
      <div class="proposal-section text-center" style="padding-top: 20px; display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
        <button type="button" onclick="generateServiceAgreementPDF()" class="btn btn-primary btn-lg"><i data-lucide="file-text"></i> Download Service Agreement (PDF)</button>
        <button type="button" onclick="generateServiceAgreementDOCX()" class="btn btn-outline btn-lg"><i data-lucide="file-text"></i> Download Service Agreement (Word)</button>
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
  <script src="https://cdn.jsdelivr.net/npm/docx@9.5.1/dist/index.iife.js"></script>
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

  function splitNameTitle(str) {
    if (!str) return { name: '', title: '' };
    const idx = str.indexOf(',');
    if (idx === -1) return { name: str.trim(), title: '' };
    return { name: str.slice(0, idx).trim(), title: str.slice(idx + 1).trim() };
  }

  // Fixed, known facts (not editable on-page since they are already known). Shared by
  // both the PDF and Word generators so the two formats can never drift out of sync.
  const SP_REG = '2013/003965/07';
  const SP_ADDRESS = '83 Vredeveld Street, Burgundy, Brackenfell, Western Cape, 7560';
  const CLIENT_REG = '2017/012125/07';
  const CLIENT_ADDRESS = '65 Kara Place, Olive Grove Business Park, Somerset West, Western Cape, 7130';

  // Effective Date is the only on-page input; party details are fixed. Shared by both generators.
  function collectFormData() {
    return {
      sp: { name: 'Bosch Technologies (Pty) Ltd', rep: 'Garth Bosch, Founder' },
      client: { name: 'WeConnectU (Pty) Ltd', rep: 'Daniël Van Der Merwe, Director' },
      effectiveDate: formatDate(fieldVal('effective-date')),
    };
  }

  // Shared agreement content: both the PDF and Word generators render these blocks,
  // so the two formats always contain identical text.
  const AGREEMENT_TITLE = 'MASTER SERVICES AGREEMENT';
  const AGREEMENT_SUBTITLE = 'Test Strategy Implementation & Quality Assurance Recruitment Engagement';

  function partiesBlocks({ sp, client, effectiveDate }) {
    return [
      { type: 'heading', args: 'The Service Provider' },
      { type: 'fieldRow', args: ['Bosch Technologies', sp.name] },
      { type: 'fieldRow', args: ['Registration No', SP_REG] },
      { type: 'fieldRow', args: ['Address', SP_ADDRESS] },
      { type: 'fieldRow', args: ['Represented by', sp.rep] },
      { type: 'paragraph', args: 'Email: garth@boschtechnologies.com' },
      { type: 'paragraph', args: '("Bosch Technologies" or "the Service Provider")' },
      { type: 'heading', args: 'The Client' },
      { type: 'fieldRow', args: ['WeConnectU', client.name] },
      { type: 'fieldRow', args: ['Registration No', CLIENT_REG] },
      { type: 'fieldRow', args: ['Address', CLIENT_ADDRESS] },
      { type: 'fieldRow', args: ['Represented by', client.rep] },
      { type: 'paragraph', args: 'Email: danie@weconnectu.co.za' },
      { type: 'paragraph', args: '("WeConnectU" or "the Client")' },
      { type: 'paragraph', args: 'Bosch Technologies and WeConnectU are each referred to individually as a "Party" and collectively as the "Parties".' },
      { type: 'fieldRow', args: ['Effective Date', effectiveDate] },
      { type: 'paragraph', args: '("Effective Date")' }
    ];
  }

  const CLAUSES = [
  // --- 1. Background ---
  { title: '1. Background', blocks: [
    { type: 'clauseItems', args: [
      '1.1 The Client wishes to establish a structured software test strategy, implement automation test frameworks, and build a permanent, in-house Quality Assurance capability.',
      '1.2 The Service Provider is a quality engineering consultancy that specialises in automation test strategy, test framework implementation, and quality engineering enablement.',
      '1.3 The Client has engaged the Service Provider to design and implement a test strategy, stand up automation test frameworks, and recruit and upskill a permanent Quality Assurance Engineer at the Client to take ownership of the capability at the end of the engagement.',
      '1.4 The Parties wish to record the terms on which these services will be provided in this Agreement.'
    ] }
  ] },

  // --- 2. Definitions ---
  { title: '2. Definitions and Interpretation', blocks: [
    { type: 'clauseItems', args: [
      '2.1 "Effective Date" means the date specified as such on the first page of this Agreement, being the date on which this Agreement comes into force and from which the Term commences in accordance with clause 4.',
      '2.2 "Deliverables" means the test strategy document, automation test frameworks, documentation, and other work product produced by the Service Provider under this Agreement, as further described in Schedule A.',
      '2.3 "Key Consultant" means Garth Bosch, the individual through whom the Service Provider will principally perform the Services.',
      '2.4 "Permanent Hire" means the Quality Assurance Engineer recruited by the Service Provider under clause 6 to be permanently employed by the Client.',
      '2.5 "Existing QA Testers" means the two Quality Assurance Testers employed by the Client as at the Effective Date, who will receive training and upskilling from the Service Provider in accordance with clause 7.',
      '2.6 "Services" means the services described in Schedule A.',
      '2.7 "Term" means the period described in clause 4.',
      '2.8 Clause headings are for convenience only and do not affect interpretation. A reference to a statute includes any amendment or re-enactment of it.'
    ] }
  ] },

  // --- 3. Scope ---
  { title: '3. Scope of Services', blocks: [
    { type: 'paragraph', args: 'The Service Provider shall provide the following Services to the Client during the Term, as more fully described in Schedule A:' },
    { type: 'bulletList', args: [
      'Design and implementation of a comprehensive quality engineering test strategy tailored to the Client;',
      'Set-up and configuration of automation test frameworks and supporting tooling;',
      'Ongoing leadership of quality assurance initiatives during the Term;',
      'Recruitment, training, and upskilling of a Permanent Hire to take over the test strategy and automation frameworks at the end of the Term, in accordance with clauses 6 and 7; and',
      'Training and upskilling of the Existing QA Testers on the test strategy and automation frameworks, in accordance with clause 7.'
    ] }
  ] },

  // --- 4. Term ---
  { title: '4. Term', blocks: [
    { type: 'clauseItems', args: [
      '4.1 This Agreement commences on the Effective Date and continues for a fixed period of six (6) months (the "Term"), unless terminated earlier in accordance with clause 15.',
      '4.2 The Parties may agree in writing to extend or renew the Term on the same or varied terms.'
    ] }
  ] },

  // --- 5. Fees ---
  { title: '5. Fees and Payment', blocks: [
    { type: 'feeTable', args: [
      ['Monthly Fee', 'R100,000.00 (one hundred thousand Rand) per month, inclusive of VAT'],
      ['Total Contract Value', 'R600,000.00 (six hundred thousand Rand) over the 6-month Term, inclusive of VAT'],
      ['Invoicing', 'On the 25th day of each month of the Term. Where the 25th falls on a Saturday or Sunday, the invoice shall be issued on the preceding Friday.'],
      ['Payment Terms', 'Payable within 5 days of invoice date, by electronic funds transfer to the bank account nominated by the Service Provider.'],
      ['Expenses', 'No travel, accommodation, or third-party tooling expenses are included unless separately agreed in writing in advance.']
    ] },
    { type: 'gap', args: 2 },
    { type: 'paragraph', args: "The Permanent Hire's recruitment under clause 6 is included in the Monthly Fee and carries no separate placement fee, provided the recruitment is completed within the Term." }
  ] },

  // --- 6. Recruitment ---
  { title: '6. Recruitment of the Permanent Hire', blocks: [
    { type: 'clauseItems', args: [
      '6.1 The Service Provider shall identify, screen, and recruit a Quality Assurance Engineer to be employed permanently and directly by the Client (the Permanent Hire), with recruitment to be substantially completed before the end of the Term.',
      '6.2 The employment relationship, remuneration, benefits, and employment contract between the Client and the Permanent Hire are matters solely between the Client and that individual. The Service Provider is not a party to, and accepts no liability arising from, that employment relationship.',
      "6.3 The Client remains responsible for final selection and hiring decisions. The Service Provider's role is to source, screen, and recommend candidates and to support the interview process.",
      "6.4 If recruitment of the Permanent Hire is delayed due to the Client's unavailability for interviews, the Client's rejection of suitably qualified candidates presented by the Service Provider, or a shortage of suitably qualified candidates in the market despite the Service Provider's reasonable efforts, such delay shall not constitute a breach of this Agreement by the Service Provider. In that event, the Parties shall discuss in good faith a reasonable extension of the recruitment timeline."
    ] }
  ] },

  // --- 7. Training ---
  { title: '7. Training, Upskilling and Knowledge Transfer', blocks: [
    { type: 'clauseItems', args: [
      '7.1 The Service Provider shall train and mentor the Permanent Hire (once appointed) and the Existing QA Testers on the test strategy, automation frameworks, and associated processes and tooling developed under this Agreement.',
      '7.2 The Service Provider shall prepare a transition plan and supporting documentation sufficient to enable the Permanent Hire and the Existing QA Testers to independently operate and evolve the test strategy and automation frameworks after the end of the Term.',
      '7.3 Knowledge transfer is deemed complete upon delivery of the documentation referred to in clause 7.2 and joint sign-off by both Parties of the transition checklist in Schedule A.'
    ] }
  ] },

  // --- 8. Success Measures ---
  { title: '8. Success Measures', blocks: [
    { type: 'clauseItems', args: [
      "8.1 The success of the engagement will be assessed against the following measures: (a) the hiring of a Quality Engineer (the Permanent Hire) by the Client; (b) the implementation of automation test frameworks; (c) the implementation of quality gates within the Client's deployment pipelines; and (d) the upskilling of the Permanent Hire and the Existing QA Testers.",
      '8.2 The success measures set out in clause 8.1 describe the intended outcomes of the engagement and do not, of themselves, create payment obligations, warranties, or conditions precedent beyond those expressly set out elsewhere in this Agreement.'
    ] }
  ] },

  // --- 9. Working Arrangements ---
  { title: '9. Working Arrangements and Non-Exclusivity', blocks: [
    { type: 'clauseItems', args: [
      "9.1 Location. The Key Consultant may perform the Services from any location of his choosing and is not required to work on-site at the Client's premises, save where the Parties agree that a specific activity requires an on-site presence.",
      "9.2 Non-Exclusivity. This engagement is non-exclusive. The Service Provider (including the Key Consultant) is free to provide services to other clients during the Term, provided this does not materially impair the Service Provider's ability to perform its obligations under this Agreement.",
      '9.3 Effort Commitment. Notwithstanding clause 9.2, the Service Provider shall dedicate sufficient time and attention to the Client to deliver the Services in accordance with the timelines agreed under Schedule A.',
      "9.4 Key Person. The Service Provider shall ensure that the Services are principally performed by the Key Consultant, and shall not substitute the Key Consultant for another individual without the Client's prior written consent (not to be unreasonably withheld), save where substitution is necessary due to the Key Consultant's illness, incapacity, or unavailability arising from circumstances beyond the Service Provider's reasonable control."
    ] }
  ] },

  // --- 10. Independent Contractor ---
  { title: '10. Independent Contractor Status', blocks: [
    { type: 'clauseItems', args: [
      '10.1 The Service Provider is an independent contractor. Nothing in this Agreement creates an employment, partnership, joint venture, or agency relationship between the Parties, or between the Client and the Key Consultant.',
      "10.2 The Service Provider is solely responsible for its own tax, statutory, and regulatory obligations (including income tax, VAT, and any applicable South African Revenue Service filings) arising from amounts received under this Agreement. The Client shall not withhold employees' tax (PAYE), make UIF or Skills Development Levy contributions, or provide employee benefits in respect of the Service Provider or the Key Consultant.",
      '10.3 The Service Provider has the right to determine the manner, method, and means by which the Services are performed, subject to the deliverables and timelines agreed under Schedule A.'
    ] }
  ] },

  // --- 11. IP ---
  { title: '11. Intellectual Property', blocks: [
    { type: 'clauseItems', args: [
      '11.1 Subject to clause 11.2 and full payment of all Fees due under this Agreement, all Deliverables created specifically for the Client under this Agreement (including the test strategy document and any bespoke automation test scripts) shall vest in and become the property of the Client upon creation.',
      '11.2 The Service Provider retains ownership of all pre-existing tools, templates, methodologies, frameworks, and know-how that it owned or developed prior to, or independently of, this Agreement ("Background IP"), and grants the Client a perpetual, royalty-free, non-exclusive licence to use any Background IP incorporated into the Deliverables for the Client\'s internal business purposes.',
      "11.3 Nothing in this Agreement transfers ownership of any third-party or open-source software, tools, or licences used in delivering the Services; the Client's use of such items remains subject to their respective licence terms."
    ] }
  ] },

  // --- 12. Confidentiality ---
  { title: '12. Confidentiality', blocks: [
    { type: 'clauseItems', args: [
      '12.1 Each Party shall keep confidential all non-public information disclosed by the other Party in connection with this Agreement and shall use it only for the purposes of this Agreement.',
      '12.2 This obligation does not apply to information that is public, was already known to the receiving Party, is independently developed, or must be disclosed by law or regulation.',
      '12.3 This clause survives termination or expiry of this Agreement for a period of three (3) years.'
    ] }
  ] },

  // --- 13. Data Protection ---
  { title: '13. Data Protection', blocks: [
    { type: 'clauseItems', args: [
      '13.1 To the extent the Service Provider processes any personal information on behalf of the Client in the course of performing the Services (including candidate personal information gathered during recruitment under clause 6), it shall do so in accordance with the Protection of Personal Information Act 4 of 2013 ("POPIA") and only for the purposes of this Agreement.',
      '13.2 Each Party shall implement reasonable technical and organisational measures to safeguard personal information in its possession or control against loss, unauthorised access, or disclosure.'
    ] }
  ] },

  // --- 14. Warranties ---
  { title: '14. Warranties', blocks: [
    { type: 'clauseItems', args: [
      '14.1 The Service Provider warrants that it shall perform the Services with reasonable skill, care, and diligence consistent with generally accepted industry standards for quality engineering consulting.',
      '14.2 Save as expressly stated in this Agreement, all other warranties, conditions, or representations, whether express or implied by law, are excluded to the maximum extent permitted by law.'
    ] }
  ] },

  // --- 15. Termination ---
  { title: '15. Termination', blocks: [
    { type: 'clauseItems', args: [
      "15.1 For Convenience. Either Party may terminate this Agreement by giving the other Party not less than thirty (30) days' prior written notice.",
      '15.2 For Cause. Either Party may terminate this Agreement with immediate effect on written notice if the other Party commits a material breach of this Agreement that is not remedied within fourteen (14) days of receiving written notice of the breach.',
      "15.3 Effect of Termination. On termination, the Client shall pay the Service Provider for Services properly performed and Fees accrued up to the effective date of termination, on a pro-rata basis for any partial month. If this Agreement is terminated before the Permanent Hire's recruitment and knowledge transfer under clauses 6 and 7 are complete, the Parties shall discuss in good faith a reasonable arrangement to complete or hand over that process.",
      '15.4 Clauses 10, 11, 12, 13, 16, 17, 19, and 20 survive termination or expiry of this Agreement.'
    ] }
  ] },

  // --- 16. Limitation of Liability ---
  { title: '16. Limitation of Liability', blocks: [
    { type: 'clauseItems', args: [
      '16.1 Neither Party shall be liable to the other for any indirect, special, or consequential loss, or loss of profits, revenue, or business opportunity, arising out of or in connection with this Agreement.',
      "16.2 The Service Provider's aggregate liability arising out of or in connection with this Agreement, whether in contract, delict, or otherwise, shall not exceed the total Fees paid by the Client under this Agreement in the six (6) months preceding the event giving rise to the claim.",
      '16.3 Nothing in this Agreement limits liability for gross negligence, wilful misconduct, or fraud, to the extent such limitation is not permitted by law.'
    ] }
  ] },

  // --- 17. Non-Solicitation ---
  { title: '17. Non-Solicitation', blocks: [
    { type: 'paragraph', args: "Neither Party shall, during the Term and for twelve (12) months thereafter, directly solicit for employment any employee or contractor of the other Party who was materially involved in the performance of this Agreement, without that Party's prior written consent. This clause does not restrict the Client's right to permanently employ the Permanent Hire recruited under clause 6, which is the intended and agreed purpose of this Agreement." }
  ] },

  // --- 18. Force Majeure ---
  { title: '18. Force Majeure', blocks: [
    { type: 'paragraph', args: 'Neither Party shall be liable for any delay or failure to perform its obligations (other than payment obligations) resulting from causes beyond its reasonable control, including acts of God, load-shedding or extended power outages, internet or telecommunications failures, or governmental action, provided the affected Party notifies the other Party promptly and uses reasonable efforts to mitigate the impact.' }
  ] },

  // --- 19. Governing Law ---
  { title: '19. Governing Law and Dispute Resolution', blocks: [
    { type: 'clauseItems', args: [
      '19.1 This Agreement is governed by the laws of the Republic of South Africa.',
      '19.2 The Parties shall first attempt to resolve any dispute arising out of this Agreement through good-faith negotiation between senior representatives. If unresolved within thirty (30) days, either Party may refer the dispute to the courts of South Africa having jurisdiction, or to mediation/arbitration if the Parties so agree in writing.'
    ] }
  ] },

  // --- 20. General ---
  { title: '20. General', blocks: [
    { type: 'clauseItems', args: [
      '20.1 Entire Agreement. This Agreement, including its Schedules, constitutes the entire agreement between the Parties regarding its subject matter and supersedes all prior discussions, proposals, and understandings, save to the extent expressly incorporated by reference.',
      '20.2 Amendment. No amendment or variation of this Agreement is effective unless in writing and signed by authorised representatives of both Parties.',
      "20.3 Assignment. Neither Party may assign or delegate its rights or obligations under this Agreement without the other Party's prior written consent, save that the Service Provider may subcontract elements of the Services with the Client's prior written consent, not to be unreasonably withheld.",
      '20.4 Notices. Notices under this Agreement must be given in writing and delivered by email to the representatives named on the signature page, or such other address as either Party notifies to the other.',
      '20.5 Severability. If any provision of this Agreement is found invalid or unenforceable, the remaining provisions continue in full force and effect.',
      '20.6 Counterparts. This Agreement may be signed in counterparts (including electronically), each of which is deemed an original, and together constitute one agreement.',
      '20.7 Electronic Signature. The Parties consent to conclude and sign this Agreement by electronic means. An electronic signature applied by either Party constitutes a valid and binding signature for the purposes of this Agreement, as contemplated in section 13 of the Electronic Communications and Transactions Act 25 of 2002 ("ECTA"), and this Agreement is not a transaction excluded from the use of an electronic signature under Schedule 2 of ECTA.'
    ] }
  ] }
  ];

  const SCHEDULES = [
    { type: 'heading', args: 'Schedule A — Services, Deliverables & Key Terms', pageBreakBefore: true },
    { type: 'subheading', args: 'A.1 Scope of Work' },
    { type: 'bulletList', args: [
      'Design and implement a comprehensive test strategy;',
      'Set up all automation test frameworks;',
      'Lead quality assurance initiatives throughout the Term;',
      'Recruit, train, and upskill the Permanent Hire to take over at the end of the Term;',
      'Train and upskill the Existing QA Testers alongside the Permanent Hire.'
    ] },
    { type: 'subheading', args: 'A.2 Deliverables' },
    { type: 'bulletList', args: [
      "Comprehensive test strategy document aligned with the Client's needs;",
      'Automated test framework implementation (tools, infrastructure, processes);',
      'Training and mentoring records for the Permanent Hire and the Existing QA Testers;',
      'Documentation and best practices guides;',
      'Transition plan and signed-off knowledge transfer checklist.'
    ] },
    { type: 'subheading', args: 'A.3 Key Terms' },
    { type: 'bulletList', args: [
      'Garth has the flexibility to work from anywhere and is not limited to working exclusively for the Client (see clause 9);',
      'Before the end of the 6-month engagement, the Service Provider will recruit a permanent Quality Assurance Engineer for the Client (see clause 6);',
      'Full upskilling and handover of the test strategy and automation frameworks to the Permanent Hire and the Existing QA Testers (see clause 7).'
    ] },
    { type: 'subheading', args: 'A.4 Success Measures' },
    { type: 'bulletList', args: [
      'Hiring of a Quality Engineer (the Permanent Hire);',
      'Implementation of automation test frameworks;',
      "Implementation of quality gates in the Client's deployment pipelines;",
      'Upskilling of the Permanent Hire and the Existing QA Testers (see clause 8).'
    ] },
    { type: 'subheading', args: 'A.5 Transition Checklist' },
    { type: 'paragraph', args: 'The following checklist must be completed and jointly signed off by the Parties in accordance with clause 7.3 to confirm that knowledge transfer is complete:' },
    { type: 'checklist', args: [
      'Test strategy document reviewed and understood by the Permanent Hire and the Existing QA Testers;',
      'Automation test framework architecture and codebase walked through;',
      'CI/CD pipeline integration and quality gates explained and demonstrated;',
      'Test data management processes and tooling handed over;',
      'Outstanding defects and automation backlog reviewed;',
      'Access credentials, licences, and tooling ownership transferred to the Client;',
      'Documentation and best practices guides confirmed as accessible to the Client;',
      'Transition checklist signed off by the Service Provider and the Client.'
    ] },
    { type: 'subheading', args: 'A.6 Engagement Timeline (6 Months)' },
    { type: 'paragraph', args: 'The indicative timeline referred to in clauses 9.3 and 10.3 is as follows:' },
    { type: 'feeTable', args: [
      ['Month 1', 'Discovery, current-state assessment, and design of the test strategy.'],
      ['Month 2', 'Automation framework architecture and tooling set-up; recruitment of the Permanent Hire commences.'],
      ['Month 3', 'Automation framework implementation and CI/CD quality gate design; recruitment interviews continue.'],
      ['Month 4', 'Quality gates implemented in the deployment pipelines; upskilling of the Existing QA Testers begins.'],
      ['Month 5', 'Onboarding, training, and upskilling of the Permanent Hire; continued upskilling of the Existing QA Testers.'],
      ['Month 6', 'Completion of knowledge transfer, joint sign-off of the transition checklist, and handover to the Client.']
    ] },
    { type: 'heading', args: 'Schedule B — Fees & Payment Schedule' },
    { type: 'scheduleBTable', args: {
      headers: ['Month', '1', '2', '3', '4', '5', '6', 'Total'],
      rows: [['Fee (incl. VAT)', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R100,000', 'R600,000']]
    } }
  ];

  const SIGNATURE_INTRO = [
    'Signed by the duly authorised representatives of the Parties:',
    'This Agreement may be signed by electronic signature. Such a signature is valid and binding in accordance with section 13 of the Electronic Communications and Transactions Act 25 of 2002 ("ECTA") (see clause 20.7).'
  ];

  async function generateServiceAgreementPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', compress: true });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginL = 15;
    const contentW = pageWidth - marginL - 15;
    const bottomMargin = 20;
    let y = 0;

    // All text, underlines, and blank fillable lines use pure black.
    const dark = [0, 0, 0];

    const formData = collectFormData();
    const { sp, client } = formData;

    // Load both logos (downscaled to keep the PDF small)
    const boschLogo = await loadLogo('/assets/images/logo.png', 340);
    const wcuLogo = await loadLogo('/assets/images/client-logos/weconnectu-logo.png', 340);

    function checkPage(needed) {
      if (y + needed > pageHeight - bottomMargin) { doc.addPage(); y = 20; }
    }

    // Fixed height consumed by heading(): 6mm space-before + 3mm text-to-rule gap + 6mm space-after.
    // Kept in sync with heading()'s own y increments so clauseSection() can pre-measure sections.
    const HEADING_H = 15;

    function heading(text) {
      checkPage(22);
      y += 6;
      doc.setFontSize(13);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...dark);
      doc.text(text, marginL, y);
      y += 3;
      doc.setDrawColor(...dark);
      doc.setLineWidth(0.3);
      doc.line(marginL, y, pageWidth - marginL, y);
      y += 6;
    }

    function subheading(text) {
      checkPage(10);
      doc.setFontSize(10.5);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(...dark);
      doc.text(text, marginL, y);
      y += 5.5;
    }

    function paragraph(text) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      const lines = doc.splitTextToSize(text, contentW);
      checkPage(lines.length * 4 + 2);
      doc.text(lines, marginL, y);
      y += lines.length * 4 + 3;
    }

    function bulletList(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      items.forEach(item => {
        const lines = doc.splitTextToSize(item, contentW - 8);
        checkPage(lines.length * 4 + 2);
        doc.text('•', marginL + 2, y);
        doc.text(lines, marginL + 8, y);
        y += lines.length * 4 + 1.5;
      });
      y += 2;
    }

    // A checkbox-style list for items that must be physically ticked off once complete
    // (e.g. a sign-off checklist). Draws a real square box via vector lines, rather than
    // relying on a Unicode checkbox glyph that the PDF's standard font may not support.
    function checklist(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      const boxSize = 3.2;
      items.forEach(item => {
        const lines = doc.splitTextToSize(item, contentW - 10);
        checkPage(lines.length * 4 + 2);
        doc.setDrawColor(...dark);
        doc.setLineWidth(0.3);
        doc.rect(marginL + 1, y - boxSize + 0.5, boxSize, boxSize);
        doc.text(lines, marginL + 9, y);
        y += lines.length * 4 + 2.5;
      });
      y += 2;
    }

    // Numbered legal sub-clauses (e.g. "6.1 The Service Provider shall..."). Uses a hanging
    // indent: the "X.Y " number prefix sits in its own column, and every wrapped line
    // (including continuation lines) aligns under the text, not under the number.
    function clauseItems(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(...dark);
      items.forEach(item => {
        const match = item.match(/^(\d+\.\d+)\s+(.*)$/s);
        const prefix = match ? match[1] + ' ' : '';
        const body = match ? match[2] : item;
        const indent = prefix ? doc.getTextWidth(prefix) : 0;
        const lines = doc.splitTextToSize(body, contentW - indent);
        checkPage(lines.length * 4 + 2);
        if (prefix) doc.text(prefix, marginL, y);
        doc.text(lines, marginL + indent, y);
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
        doc.setTextColor(...dark);
        const lines = doc.splitTextToSize(value, contentW - labelW);
        doc.text(lines, marginL + labelW, y);
        y += lines.length * 5;
      } else {
        doc.setDrawColor(...dark);
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
        doc.setTextColor(255, 255, 255);
        footerRow.forEach((cell, i) => doc.text(cell, marginL + i * colW + 4, y + 5.5));
        y += rowH;
      }
      y += 4;
    }

    function newPage() { doc.addPage(); y = 20; }

    // --- Measurement helpers (mirror the render functions' arithmetic exactly, without drawing) ---
    function measureParagraph(text) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      const lines = doc.splitTextToSize(text, contentW);
      return lines.length * 4 + 3;
    }
    function measureBulletList(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      let h = 0;
      items.forEach(item => { h += doc.splitTextToSize(item, contentW - 8).length * 4 + 1.5; });
      return h + 2;
    }
    function measureClauseItems(items) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'normal');
      let h = 0;
      items.forEach(item => {
        const match = item.match(/^(\d+\.\d+)\s+(.*)$/s);
        const prefix = match ? match[1] + ' ' : '';
        const body = match ? match[2] : item;
        const indent = prefix ? doc.getTextWidth(prefix) : 0;
        h += doc.splitTextToSize(body, contentW - indent).length * 4 + 2;
      });
      return h + 2;
    }
    function measureFieldRow(label, value) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      const labelW = doc.getTextWidth(label + ': ');
      if (!value) return 5;
      doc.setFont(undefined, 'normal');
      return doc.splitTextToSize(value, contentW - labelW).length * 5;
    }

    // Bordered fee table: bold label column (~30%) + wrapping value column, light grey
    // row shading and grid lines. Row height auto-grows to fit the wrapped value text.
    const FEE_LABEL_FRACTION = 0.3;
    const FEE_PAD = 4;
    const FEE_LINE_H = 4.6;
    function computeFeeRowHeights(rows) {
      const labelColW = contentW * FEE_LABEL_FRACTION;
      const valueColW = contentW - labelColW;
      doc.setFontSize(9);
      return rows.map(([label, value]) => {
        doc.setFont(undefined, 'bold');
        const labelLines = doc.splitTextToSize(label, labelColW - FEE_PAD * 2);
        doc.setFont(undefined, 'normal');
        const valueLines = doc.splitTextToSize(value, valueColW - FEE_PAD * 2);
        const lineCount = Math.max(labelLines.length, valueLines.length);
        return { h: Math.max(lineCount * FEE_LINE_H + FEE_PAD * 2, 14), labelLines, valueLines };
      });
    }
    function measureFeeTable(rows) {
      return computeFeeRowHeights(rows).reduce((s, r) => s + r.h, 0) + 4;
    }
    function feeTable(rows) {
      const labelColW = contentW * FEE_LABEL_FRACTION;
      const rowHeights = computeFeeRowHeights(rows);
      // Self-paginating: ensure the whole table fits on the current page (or starts a
      // fresh one) even when called directly (e.g. from Schedule A) rather than only via
      // clauseSection(), which otherwise pre-checks this for callers inside numbered clauses.
      checkPage(rowHeights.reduce((s, r) => s + r.h, 0) + 4);
      const tableTop = y;
      let ry = y;
      const leftX = marginL;
      doc.setDrawColor(...dark);
      doc.setLineWidth(0.3);
      rowHeights.forEach(({ h, labelLines, valueLines }) => {
        doc.setFillColor(248, 248, 248);
        doc.rect(leftX, ry, contentW, h, 'F');
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...dark);
        doc.text(labelLines, leftX + FEE_PAD, ry + FEE_PAD + 3.2);
        doc.setFont(undefined, 'normal');
        doc.text(valueLines, leftX + labelColW + FEE_PAD, ry + FEE_PAD + 3.2);
        doc.line(leftX, ry, leftX + contentW, ry);
        ry += h;
      });
      doc.line(leftX, ry, leftX + contentW, ry);
      doc.line(leftX, tableTop, leftX, ry);
      doc.line(leftX + labelColW, tableTop, leftX + labelColW, ry);
      doc.line(leftX + contentW, tableTop, leftX + contentW, ry);
      y = ry + 4;
    }

    // Renders a numbered clause as a single unit: if the whole section (heading + body)
    // doesn't fit in the remaining space on the current page, it starts on a fresh page
    // instead of splitting mid-clause.
    function clauseSection(title, blocks) {
      let estH = HEADING_H;
      blocks.forEach(b => {
        if (b.type === 'clauseItems') estH += measureClauseItems(b.args);
        else if (b.type === 'paragraph') estH += measureParagraph(b.args);
        else if (b.type === 'bulletList') estH += measureBulletList(b.args);
        else if (b.type === 'fieldRow') estH += measureFieldRow(b.args[0], b.args[1]);
        else if (b.type === 'feeTable') estH += measureFeeTable(b.args);
        else if (b.type === 'gap') estH += b.args;
      });
      const maxPageContent = pageHeight - bottomMargin - 20;
      if (estH <= maxPageContent) checkPage(estH);
      heading(title);
      blocks.forEach(renderBlock);
    }

    function renderBlock(b) {
      if (b.pageBreakBefore) newPage();
      if (b.type === 'heading') heading(b.args);
      else if (b.type === 'subheading') subheading(b.args);
      else if (b.type === 'paragraph') paragraph(b.args);
      else if (b.type === 'bulletList') bulletList(b.args);
      else if (b.type === 'clauseItems') clauseItems(b.args);
      else if (b.type === 'checklist') checklist(b.args);
      else if (b.type === 'fieldRow') fieldRow(b.args[0], b.args[1]);
      else if (b.type === 'feeTable') feeTable(b.args);
      else if (b.type === 'scheduleBTable') table(b.args.headers, b.args.rows, null);
      else if (b.type === 'gap') y += b.args;
    }

    // --- Letterhead (both logos, white background) ---
    const headerH = 56;
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, headerH, 'F');
    const boschLogoH = 24;
    const wcuLogoH = 15;
    const logoCenterY = 22;
    if (boschLogo) {
      doc.addImage(boschLogo.dataUrl, 'PNG', marginL, logoCenterY - boschLogoH / 2, boschLogoH * boschLogo.aspect, boschLogoH);
    }
    if (wcuLogo) {
      const w = wcuLogoH * wcuLogo.aspect;
      doc.addImage(wcuLogo.dataUrl, 'PNG', pageWidth - marginL - w, logoCenterY - wcuLogoH / 2, w, wcuLogoH);
    }
    doc.setTextColor(...dark);
    doc.setFontSize(15);
    doc.setFont(undefined, 'bold');
    doc.text(AGREEMENT_TITLE, pageWidth / 2, 42, { align: 'center' });
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...dark);
    doc.text(AGREEMENT_SUBTITLE, pageWidth / 2, 49, { align: 'center' });
    doc.setDrawColor(...dark);
    doc.setLineWidth(0.6);
    doc.line(0, headerH, pageWidth, headerH);
    y = headerH + 10;

    partiesBlocks(formData).forEach(renderBlock);
    CLAUSES.forEach(c => clauseSection(c.title, c.blocks));
    SCHEDULES.forEach(renderBlock);

    // --- Signatures ---
    newPage();
    heading('Signatures');
    SIGNATURE_INTRO.forEach(t => paragraph(t));
    y += 4;

    const spSplit = splitNameTitle(sp.rep);
    const clientSplit = splitNameTitle(client.rep);

    const colW = contentW / 2;
    const leftX = marginL;
    const rightX = marginL + colW;
    // Signature/Name/Title/Date rows all share the logo row's height; only the
    // "Service Provider"/"Client" label row keeps its own (smaller) height.
    const SIG_LOGO_H = 22;
    const sigRows = [
      { h: SIG_LOGO_H, type: 'logo' },
      { h: 9, type: 'label', left: 'Service Provider', right: 'Client' },
      { h: SIG_LOGO_H, type: 'signature' },
      { h: SIG_LOGO_H, type: 'field', label: 'Name', leftVal: spSplit.name, rightVal: clientSplit.name },
      { h: SIG_LOGO_H, type: 'field', label: 'Title', leftVal: spSplit.title, rightVal: clientSplit.title },
      { h: SIG_LOGO_H, type: 'field', label: 'Date', leftVal: '', rightVal: '', noBlankLine: true }
    ];

    const tableTop = y;
    let ry = y;
    doc.setDrawColor(...dark);
    doc.setLineWidth(0.4);

    sigRows.forEach(row => {
      doc.line(leftX, ry, rightX + colW, ry);
      if (row.type === 'logo') {
        if (boschLogo) {
          const h = 17, w = h * boschLogo.aspect;
          doc.addImage(boschLogo.dataUrl, 'PNG', leftX + (colW - w) / 2, ry + (row.h - h) / 2, w, h);
        }
        if (wcuLogo) {
          const h = 11, w = h * wcuLogo.aspect;
          doc.addImage(wcuLogo.dataUrl, 'PNG', rightX + (colW - w) / 2, ry + (row.h - h) / 2, w, h);
        }
      } else if (row.type === 'label') {
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...dark);
        doc.text(row.left, leftX + colW / 2, ry + row.h / 2 + 1.5, { align: 'center' });
        doc.text(row.right, rightX + colW / 2, ry + row.h / 2 + 1.5, { align: 'center' });
      } else if (row.type === 'signature') {
        doc.setFontSize(8);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...dark);
        doc.text('Signature', leftX + 4, ry + 5);
        doc.text('Signature', rightX + 4, ry + 5);
      } else if (row.type === 'field') {
        const midY = ry + row.h / 2 + 1.5;
        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...dark);
        doc.text(row.label + ':', leftX + 4, midY);
        doc.text(row.label + ':', rightX + 4, midY);
        const lw = doc.getTextWidth(row.label + ': ');
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...dark);
        if (row.leftVal) {
          doc.text(row.leftVal, leftX + 4 + lw, midY);
        } else if (!row.noBlankLine) {
          doc.line(leftX + 4 + lw, midY - 1, leftX + colW - 4, midY - 1);
        }
        if (row.rightVal) {
          doc.text(row.rightVal, rightX + 4 + lw, midY);
        } else if (!row.noBlankLine) {
          doc.line(rightX + 4 + lw, midY - 1, rightX + colW - 4, midY - 1);
        }
      }
      ry += row.h;
    });

    doc.setDrawColor(...dark);
    doc.setLineWidth(0.4);
    doc.line(leftX, ry, rightX + colW, ry);
    doc.line(leftX, tableTop, leftX, ry);
    doc.line(rightX, tableTop, rightX, ry);
    doc.line(rightX + colW, tableTop, rightX + colW, ry);
    y = ry + 6;

    doc.save('WeConnectU-Master-Services-Agreement.pdf');
  }

  // ===================== WORD (.docx) GENERATION =====================
  // Renders the same shared content blocks as the PDF. Every size, gap, indent and border
  // below is the PDF's millimetre value converted to Word units, so the layouts line up.

  function dataUrlToUint8Array(dataUrl) {
    const base64 = dataUrl.split(',')[1];
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function generateServiceAgreementDOCX() {
    const {
      Document, Packer, Paragraph, TextRun, Tab, AlignmentType, BorderStyle, Table, TableRow, TableCell,
      WidthType, ImageRun, TabStopType, VerticalAlign, ShadingType, HeightRule, TableLayoutType, SectionType
    } = window.docx;

    const formData = collectFormData();
    const { sp, client } = formData;

    const boschLogo = await loadLogo('/assets/images/logo.png', 340);
    const wcuLogo = await loadLogo('/assets/images/client-logos/weconnectu-logo.png', 340);
    const boschLogoBytes = boschLogo ? dataUrlToUint8Array(boschLogo.dataUrl) : null;
    const wcuLogoBytes = wcuLogo ? dataUrlToUint8Array(wcuLogo.dataUrl) : null;

    // jsPDF measures clause-number widths exactly as the PDF does (Helvetica == Arial metrics).
    const measure = new window.jspdf.jsPDF({ unit: 'mm', format: 'a4' });
    measure.setFontSize(9);
    measure.setFont(undefined, 'normal');

    const mm = v => Math.round(v * 1440 / 25.4); // mm -> twips
    const px = v => Math.round(v * 96 / 25.4);   // mm -> image pixels
    const CONTENT_W = mm(180);
    const HALF_W = Math.floor(CONTENT_W / 2);

    // PDF positions are text baselines; Word lines sit their baseline one font-descent above
    // the line box bottom. These descents (mm) convert between the two.
    const DESC_9 = 0.67, DESC_13 = 0.97;
    const LINE = 4;              // PDF body line pitch
    const HEADING_BEFORE = 4.8;  // with HEADING_LINE, puts the heading baseline 6mm below the previous block
    const HEADING_LINE = 5.5;
    const TABLE_TYPES = ['feeTable', 'scheduleBTable', 'signatureTable'];

    const border = widthMm => ({ style: BorderStyle.SINGLE, size: Math.round(widthMm / 25.4 * 72 * 8), color: '000000' });
    const NONE = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
    const allBorders = b => ({ top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b });
    const shade = fill => ({ type: ShadingType.CLEAR, color: 'auto', fill });

    function keepOpts(keep, i, n) {
      if (!keep) return {};
      return { keepLines: true, keepNext: keep === 'all' || i < n - 1 };
    }

    function run(text, o = {}) {
      const content = text === '\t' ? { children: [new Tab()] } : { text };
      return new TextRun({ ...content, font: 'Arial', size: Math.round((o.pt || 9) * 2), bold: o.bold, color: o.color, underline: o.underline ? {} : undefined });
    }

    // Exact line pitch so each baseline lands where the PDF draws it.
    function para(children, o = {}) {
      return new Paragraph({
        ...(o.keepProps || {}),
        alignment: o.align,
        indent: o.indent,
        tabStops: o.tabStops,
        border: o.border,
        pageBreakBefore: o.pageBreakBefore,
        spacing: { before: mm(o.before || 0), after: mm(o.after || 0), line: mm(o.line || LINE), lineRule: 'exact' },
        children
      });
    }

    // PDF heading(): 13pt bold, 0.3mm rule 3mm below the baseline, next baseline 6mm below the rule.
    function headingPara(text, o) {
      return para([run(text, { pt: 13, bold: true })], {
        keepProps: { keepNext: true, keepLines: true },
        pageBreakBefore: o.pageBreakBefore,
        before: HEADING_BEFORE + o.before,
        line: HEADING_LINE,
        after: o.beforeTable ? 5.7 : 2.4,
        border: { bottom: { ...border(0.3), space: 6 } }
      });
    }

    // PDF subheading(): 10.5pt bold, next baseline 5.5mm below.
    function subheadingPara(text, o) {
      return para([run(text, { pt: 10.5, bold: true })], {
        keepProps: { keepNext: true, keepLines: true },
        before: o.before,
        line: 4.1,
        after: 1.4
      });
    }

    // gap = PDF space after each item; endGap = extra space the PDF adds after the whole list.
    function listParas(items, o, gap, endGap, make) {
      return items.map((item, i) => {
        const last = i === items.length - 1;
        const p = make(item);
        return para(p.children, {
          indent: p.indent,
          tabStops: p.tabStops,
          keepProps: keepOpts(o.keep, i, items.length),
          before: i === 0 ? o.before : 0,
          after: last ? gap + endGap + o.extraAfter : gap
        });
      });
    }

    const hanging = (textMm, markerMm) => ({
      indent: { left: mm(textMm), hanging: mm(textMm - markerMm) },
      tabStops: [{ type: TabStopType.LEFT, position: mm(textMm) }]
    });

    function clauseItem(item) {
      const match = item.match(/^(\d+\.\d+)\s+(.*)$/s);
      if (!match) return { children: [run(item)] };
      const [, prefix, body] = match;
      return { ...hanging(measure.getTextWidth(prefix + ' '), 0), children: [run(prefix), run('\t'), run(body)] };
    }

    function fieldRow([label, value]) {
      const children = [run(label + ': ', { bold: true })];
      if (value) children.push(run(value));
      else children.push(run('\t', { underline: true }));
      return { children, tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W }] };
    }

    // PDF feeTable(): 30% bold label column, 4mm padding, 4.6mm line pitch, 14mm minimum row.
    function feeTableObj(rows, o) {
      const labelW = Math.round(CONTENT_W * 0.3);
      const widths = [labelW, CONTENT_W - labelW];
      const cell = (w, r, i) => new TableCell({
        width: { size: w, type: WidthType.DXA },
        shading: shade('F8F8F8'),
        margins: { top: mm(3.27), bottom: mm(4.73), left: mm(4), right: mm(4) },
        children: [para([r], { keepProps: keepOpts(o.keep, i, rows.length), line: 4.6 })]
      });
      return new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: widths,
        layout: TableLayoutType.FIXED,
        borders: allBorders(border(0.3)),
        rows: rows.map(([label, value], i) => new TableRow({
          cantSplit: true,
          height: { value: mm(14), rule: HeightRule.ATLEAST },
          children: [cell(widths[0], run(label, { bold: true }), i), cell(widths[1], run(value), i)]
        }))
      });
    }

    // PDF table(): 8mm rows, dark header, alternate row shading, no grid lines, 8pt text.
    function scheduleBTableObj({ headers, rows }) {
      const colW = Math.floor(CONTENT_W / headers.length);
      const mkRow = (cells, o) => new TableRow({
        cantSplit: true,
        height: { value: mm(8), rule: HeightRule.EXACT },
        children: cells.map(c => new TableCell({
          width: { size: colW, type: WidthType.DXA },
          shading: o.fill ? shade(o.fill) : undefined,
          margins: { top: mm(2.1), bottom: 0, left: mm(4), right: 0 },
          children: [para([run(c, { pt: 8, bold: o.bold, color: o.color })], { keepProps: o.keepProps })]
        }))
      });
      return new Table({
        width: { size: colW * headers.length, type: WidthType.DXA },
        columnWidths: headers.map(() => colW),
        layout: TableLayoutType.FIXED,
        borders: allBorders(NONE),
        rows: [
          mkRow(headers, { fill: '1C1C1C', bold: true, color: 'FFFFFF', keepProps: { keepNext: true } }),
          ...rows.map((r, idx) => mkRow(r, { fill: idx % 2 === 0 ? 'F5F5F5' : undefined }))
        ]
      });
    }

    // PDF signature grid: 0.4mm lines, 22mm rows (9mm label row), 4mm cell padding.
    function signatureTableObj() {
      const spSplit = splitNameTitle(sp.rep);
      const clientSplit = splitNameTitle(client.rep);
      const keepRow = { keepNext: true, keepLines: true };
      const cell = (children, top) => new TableCell({
        width: { size: HALF_W, type: WidthType.DXA },
        verticalAlign: top ? VerticalAlign.TOP : VerticalAlign.CENTER,
        margins: { top: top ? mm(1.6) : 0, bottom: 0, left: mm(4), right: mm(4) },
        children
      });
      const row = (h, left, right, top) => new TableRow({
        cantSplit: true,
        height: { value: mm(h), rule: HeightRule.EXACT },
        children: [cell(left, top), cell(right, top)]
      });
      const logoPara = (logo, bytes, hMm) => new Paragraph({
        ...keepRow,
        alignment: AlignmentType.CENTER,
        children: bytes ? [new ImageRun({ data: bytes, type: 'png', transformation: { width: px(hMm * logo.aspect), height: px(hMm) } })] : []
      });
      const textPara = (children, o = {}) => para(children, { keepProps: o.last ? { keepLines: true } : keepRow, align: o.align, tabStops: o.tabStops });
      const field = (label, val, o = {}) => textPara(
        [run(label + ': ', { bold: true }), ...(val ? [run(val)] : o.noBlankLine ? [] : [run('\t', { underline: true })])],
        { tabStops: [{ type: TabStopType.RIGHT, position: HALF_W - mm(8) }], last: o.last }
      );
      const label = text => textPara([run(text, { bold: true })], { align: AlignmentType.CENTER });
      const sigLabel = () => textPara([run('Signature', { pt: 8 })]);
      return new Table({
        width: { size: HALF_W * 2, type: WidthType.DXA },
        columnWidths: [HALF_W, HALF_W],
        layout: TableLayoutType.FIXED,
        borders: allBorders(border(0.4)),
        rows: [
          row(22, [logoPara(boschLogo, boschLogoBytes, 17)], [logoPara(wcuLogo, wcuLogoBytes, 11)]),
          row(9, [label('Service Provider')], [label('Client')]),
          row(22, [sigLabel()], [sigLabel()], true),
          row(22, [field('Name', spSplit.name)], [field('Name', clientSplit.name)]),
          row(22, [field('Title', spSplit.title)], [field('Title', clientSplit.title)]),
          row(22, [field('Date', '', { noBlankLine: true, last: true })], [field('Date', '', { noBlankLine: true, last: true })])
        ]
      });
    }

    function blockParas(b, o) {
      switch (b.type) {
        case 'heading': return [headingPara(b.args, { ...o, pageBreakBefore: b.pageBreakBefore })];
        case 'subheading': return [subheadingPara(b.args, o)];
        case 'paragraph': return listParas([b.args], o, 3, 0, t => ({ children: [run(t)] }));
        case 'clauseItems': return listParas(b.args, o, 2, 2, clauseItem);
        case 'bulletList': return listParas(b.args, o, 1.5, 2, t => ({ ...hanging(8, 2), children: [run('•'), run('\t'), run(t)] }));
        case 'checklist': return listParas(b.args, o, 2.5, 2, t => ({
          ...hanging(9, 1),
          children: [new TextRun({ text: '☐', size: 20, font: 'Segoe UI Symbol' }), run('\t'), run(t)]
        }));
        case 'fieldRow': return listParas([b.args], o, 1, 0, fieldRow);
        case 'feeTable': return [feeTableObj(b.args, o)];
        case 'scheduleBTable': return [scheduleBTableObj(b.args)];
        case 'signatureTable': return [signatureTableObj()];
      }
      return [];
    }

    // Lays out a run of blocks, converting the PDF's inter-block gaps into Word spacing.
    // keepChain ties every block to the next so the run never splits across pages.
    function renderBlocks(blocks, keepChain) {
      const content = [];
      const gapBefore = [];
      let gap = 0;
      blocks.forEach(b => {
        if (b.type === 'gap') { gap += b.args; return; }
        content.push(b);
        gapBefore.push(gap);
        gap = 0;
      });
      return content.flatMap((b, i) => {
        const prevTable = i > 0 && TABLE_TYPES.includes(content[i - 1].type);
        const nextTable = i < content.length - 1 && TABLE_TYPES.includes(content[i + 1].type);
        return blockParas(b, {
          keep: keepChain ? (i < content.length - 1 ? 'all' : 'allButLast') : undefined,
          before: gapBefore[i] + (prevTable ? DESC_9 : 0),
          // The PDF starts a table at the next text baseline; Word starts it at the line box bottom.
          extraAfter: nextTable ? LINE - DESC_9 + gapBefore[i + 1] : 0,
          beforeTable: nextTable
        });
      });
    }

    // --- Letterhead: logos centred 22mm from the top, title baseline 42mm, subtitle 49mm,
    // 0.6mm full-width rule at 56mm, first heading baseline at 72mm. ---
    const letterhead = [
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [HALF_W, CONTENT_W - HALF_W],
        layout: TableLayoutType.FIXED,
        borders: allBorders(NONE),
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
        rows: [new TableRow({
          height: { value: mm(24), rule: HeightRule.ATLEAST },
          children: [
            new TableCell({
              width: { size: HALF_W, type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ children: boschLogoBytes ? [new ImageRun({ data: boschLogoBytes, type: 'png', transformation: { width: px(24 * boschLogo.aspect), height: px(24) } })] : [] })]
            }),
            new TableCell({
              width: { size: CONTENT_W - HALF_W, type: WidthType.DXA },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: wcuLogoBytes ? [new ImageRun({ data: wcuLogoBytes, type: 'png', transformation: { width: px(15 * wcuLogo.aspect), height: px(15) } })] : [] })]
            })
          ]
        })]
      }),
      para([run(AGREEMENT_TITLE, { pt: 15, bold: true })], { align: AlignmentType.CENTER, before: 3.1, line: 6 }),
      para([run(AGREEMENT_SUBTITLE)], {
        align: AlignmentType.CENTER,
        before: 2.55,
        after: 5.67,
        indent: { left: -mm(15), right: -mm(15) },
        border: { bottom: { ...border(0.6), space: 18 } }
      })
    ];

    const body = [
      ...renderBlocks(partiesBlocks(formData)),
      ...CLAUSES.flatMap(c => renderBlocks([{ type: 'heading', args: c.title }, ...c.blocks], true)),
      ...renderBlocks(SCHEDULES),
      ...renderBlocks([
        { type: 'heading', args: 'Signatures', pageBreakBefore: true },
        ...SIGNATURE_INTRO.map(t => ({ type: 'paragraph', args: t })),
        { type: 'gap', args: 4 },
        { type: 'signatureTable' }
      ])
    ];

    // Page 1 uses a 10mm top margin for the letterhead (as the PDF draws it from the page top);
    // the continuous section switches later pages to the PDF's 20mm top margin.
    const page = top => ({
      size: { width: 11906, height: 16838 },
      margin: { top: mm(top), bottom: mm(20), left: mm(15), right: mm(15) }
    });
    const docxDocument = new Document({
      styles: {
        // 1pt default so the empty paragraph Word needs for the section break takes no visible space.
        default: { document: { run: { font: 'Arial', size: 2 }, paragraph: { spacing: { before: 0, after: 0 } } } }
      },
      sections: [
        { properties: { page: page(10) }, children: letterhead },
        { properties: { type: SectionType.CONTINUOUS, page: page(20) }, children: body }
      ]
    });

    const blob = await Packer.toBlob(docxDocument);
    downloadBlob(blob, 'WeConnectU-Master-Services-Agreement.docx');
  }
  </script>
  <?php endif; ?>
</body>
</html>
