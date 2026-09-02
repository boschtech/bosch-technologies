# Bosch Technologies

Marketing and lead-generation website for **Bosch Technologies**, a South African software quality engineering consultancy specialising in automation test strategy, quality engineering, and team enablement.

Production site: `boschtechnologies.com`

## What this site does

The site serves four purposes:

1. **Markets the consultancy** — service pages describing automation test strategy, quality engineering, and training offerings.
2. **Generates and captures leads** — a free, interactive Test Automation Maturity Assessment that scores a visitor's testing practices and emails their details and results through as a qualified lead.
3. **Builds credibility** — a technical portfolio page and a client testimonials page with a self-service submission and approval workflow.
4. **Delivers private client documents** — password-gated proposal and assessment pages served per client, each with a branded PDF export.

## Tech stack

Deliberately dependency-free. There is **no build step, no package manager, and no framework**.

- Static HTML, CSS, and vanilla JavaScript
- PHP for form handling and the client proposal gates (targets PHP 7.4+, runs on Hostinger shared hosting)
- Data persisted to flat files (`data/testimonials.json`, `data/leads.csv`) — no database
- Third-party libraries loaded from CDN at runtime:
  - [Chart.js 4.4.1](https://www.chartjs.org/) — radar charts for assessment results
  - [jsPDF 2.5.1](https://github.com/parallax/jsPDF) — client-side PDF generation
  - [Lucide](https://lucide.dev/) — icons
  - Mermaid — architecture diagrams on the portfolio page
  - Google Fonts (Inter)
- [FPDF](http://www.fpdf.org/) is vendored under `api/lib/` for server-side PDF conversion

Editing a file and uploading it is the entire deployment process.

## Running locally

PHP's built-in server is enough for everything except email sending:

```bash
php -S localhost:8000
```

Then open http://localhost:8000.

Notes:
- Form submissions call PHP's `mail()`, which will fail locally. The endpoint still writes to `data/leads.csv`, so you can verify capture logic without a mail server.
- Client proposal pages use PHP sessions, so they must be served through PHP rather than opened as files.
- Everything else (assessment scoring, charts, PDF export) runs entirely in the browser and works offline apart from the CDN scripts.

## Directory structure

```
/                        Home page (index.html)
/assessment/             Interactive maturity assessment tool
/maturity-model/         Explains the 5 levels and 5 dimensions
/services/               Three service detail pages
/portfolio/              Technical portfolio with architecture diagrams
/testimonials/           Client testimonials + submission form
/contact/                Contact form and details
/clients/                Password-gated per-client proposal pages
/api/                    PHP endpoints
/api/lib/                Vendored FPDF library
/css/styles.css          Entire design system, single stylesheet
/js/                     Front-end scripts
/data/                   Flat-file storage (testimonials, lead CSV)
/assets/images/          Logo, favicons, hero video
/proposals/              Working proposal drafts (git-ignored)
```

## The maturity assessment

The lead magnet, and the most involved part of the site.

**Structure:** 5 dimensions × 4 questions = 20 questions. Each answer scores 1–5.

The five dimensions are Test Process & Governance, Automation Coverage & Effectiveness, Tooling & Infrastructure, Reporting & Observability, and Team Skills & Culture.

**Scoring:** each dimension is the mean of its 4 answers; the overall score is the mean of the 5 dimension scores. Scores map onto five maturity levels — 1 Initial, 2 Managed, 3 Defined, 4 Measured, 5 Optimising.

**Flow:** the visitor answers all 20 questions, hits an email gate requiring name, email, and company, and then sees their results — an overall score, a radar chart plotted against a Level 4 target, and a per-dimension recommendation. Results can be downloaded as a PDF.

**Lead capture:** submitting the gate posts scores and contact details to `api/submit-assessment.php`, which emails them through and appends a row to `data/leads.csv`.

Relevant files:
- `js/assessment-questions.js` — all questions, answer options, per-level recommendations, and level definitions. **Edit content here.**
- `js/assessment.js` — step navigation, validation, scoring, radar chart, PDF export.
- `assessment/index.html` — page shell and results markup.

## Forms and API

All three public forms post to the same endpoint, distinguished by a `form_type` hidden field.

### `api/submit-assessment.php`

| `form_type` | Source | Behaviour |
|---|---|---|
| `assessment` | Assessment email gate | Emails scores + contact details, logs to CSV |
| `contact` | Contact page | Emails the enquiry |
| `testimonial` | Testimonials page | Handles uploads, appends to `testimonials.json`, emails a notification |

All submissions are sanitised, validated (name and a well-formed email are required), and appended to `data/leads.csv` as a backup. The recipient address is set in the `$to_email` variable at the top of the file.

### `api/convert-to-pdf.php`

Converts uploaded testimonial reference letters to PDF using FPDF. PDFs pass through unchanged; PNG/JPG are wrapped in a page; TXT and DOCX have their text extracted and re-rendered. Legacy `.doc` support is best-effort ASCII extraction.

### `api/manage-testimonial.php`

Admin-only CRUD over `data/testimonials.json`, authenticated by a secret key passed as a query parameter. Supports `list`, `approve`, `reject`, `delete`, `set-logo`, and `set-reference`.

```bash
curl "https://boschtechnologies.com/api/manage-testimonial.php?key=YOUR_KEY&action=list"
curl "https://boschtechnologies.com/api/manage-testimonial.php?key=YOUR_KEY&action=approve&id=some-id"
```

## Testimonial workflow

1. A client submits the form on `/testimonials/`, optionally attaching a company logo and a reference letter.
2. The logo is saved to `assets/images/client-logos/`; the reference letter is converted to PDF and saved to `testimonials/references/`.
3. An entry is appended to `data/testimonials.json` with `approved: false`, and an email notification is sent.
4. You approve it via `api/manage-testimonial.php`.
5. The testimonials page fetches the JSON client-side and renders **only** entries where `approved` is `true`.

Nothing appears publicly until it is explicitly approved.

## Client proposal pages

Each client gets a directory under `clients/`. Pages are gated behind a per-client access code held in an `$access_code` variable at the top of each file, with the unlocked state stored in a PHP session. All are marked `noindex, nofollow`.

Current clients:

- `clients/weconnectu/` — assessment report (`index.php`), maturity assessment results (`maturity-assessment.php`), and two proposals: `improvement-engagement.php` (four engagement options) and `alternative-engagement.php` (test strategy implementation plus QA recruitment).
- `clients/toomuchiwifi/` — proposal page.

Each proposal page embeds its own jsPDF generator so the client can download a branded PDF of exactly what they are reading. These generators lay out pages manually in millimetres, so when adding content be aware that sections can spill onto the next page — check the output rather than assuming.

**To add a client:** copy an existing directory, change `$access_code` and the session key (e.g. `client_<name>_auth`), replace the content blocks, and rename the PDF generator function and its output filename.

## Design system

`css/styles.css` holds the entire design system — there are no per-page stylesheets, only occasional inline overrides and one page-local `<style>` block on the portfolio page.

The theme is dark (`#000` / `#111` surfaces) with a gold primary (`#b8961c`). Reusable building blocks include `.btn` variants, `.badge`, `.section`, `.container`, `.proposal-option-card`, `.proposal-table`, and `.process-steps`.

Breakpoints are 992px and 768px. Note that inline `grid-template-columns` overrides beat the responsive rules in the stylesheet — prefer `repeat(auto-fit, minmax(...))` over a hardcoded column count, and wrap wide tables in a container with `overflow-x: auto`.

## Deployment

Upload the repository contents to the web root. There is nothing to compile or install.

Requirements: PHP 7.4+ with `mail()` enabled, plus the `zip` extension if DOCX reference-letter conversion is needed. The `data/`, `testimonials/references/`, and `assets/images/client-logos/` directories must be writable.

`proposals/` is git-ignored and holds local working drafts; it is not part of the deployed site.

## Configuration

Values that are hardcoded and need changing per environment:

| Setting | Location |
|---|---|
| Notification recipient | `$to_email` in `api/submit-assessment.php` |
| Testimonial admin key | `$admin_key` in `api/manage-testimonial.php` |
| Client access codes | `$access_code` in each `clients/*/*.php` |

## Security notes

Known weaknesses in the current setup, listed so they are not mistaken for intentional design:

- **Secrets are committed to the repository.** The testimonial admin key and every client access code are plain-text literals in tracked PHP files. Anyone with repository access has them. They should move to environment variables or an untracked config file, and should be rotated if the repository is ever shared or made public.
- **`data/leads.csv` sits inside the web root.** Unless the host blocks it, captured names, emails, and companies are downloadable at `/data/leads.csv`. It should be moved outside the web root or blocked at the server level.
- **The admin key travels as a URL query parameter**, so it lands in server access logs and browser history.
- **The form handler sends `Access-Control-Allow-Origin: *`**, so any origin can post to it.
- **Client access codes are shared across all pages for a given client** and are transmitted as a normal form POST — adequate for gating a commercial proposal, but not real authentication. Do not put anything genuinely sensitive behind them.
