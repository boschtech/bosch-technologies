# Bosch Technologies

Marketing and lead-generation website for **Bosch Technologies**, a South African software quality engineering consultancy specialising in automation test strategy, quality engineering, and team enablement.

Production site: `boschtechnologies.com`

## What this site does

The site serves four purposes:

1. **Markets the consultancy** — service pages describing automation test strategy, quality engineering, and training offerings.
2. **Generates and captures leads** — a free, interactive Test Automation Maturity Assessment that scores a visitor's testing practices and emails their details and results through as a qualified lead.
3. **Builds credibility** — a technical portfolio page and a client testimonials page with a self-service submission and approval workflow.
4. **Delivers private client documents** — password-gated proposal and assessment pages served per client, each with a branded PDF (and in one case, Word) export.

## Tech stack

An npm-workspaces monorepo with two apps:

- **`apps/web`** — React 18, React Router 7, Vite, Tailwind CSS, and Radix UI primitives (shadcn/ui pattern). The pre-existing hand-authored design system (`apps/web/src/styles/legacy.css`) is kept as a global stylesheet rather than rewritten into Tailwind utilities, so the dark/gold visual design is unchanged; Tailwind is used for newer interactive pieces. Charting uses `recharts` (assessment radar chart) and `chart.js` (client maturity-assessment pages). PDF/DOCX generation uses `jspdf` and `docx`, all client-side.
- **`apps/server`** — Express. Replaces the former PHP endpoints: form handling and email (`nodemailer`), file uploads (`multer`), server-side PDF/DOCX text conversion (`pdf-lib`, `mammoth`), and session-based auth (`express-session`) for the testimonial admin and per-client proposal gates. In production it also serves `apps/web`'s built output and provides the SPA fallback for client-side routes.

No PHP, no CDN script tags, no flat-file-in-the-web-root storage. Secrets live in environment variables, not source.

## Getting started

Use Node 22 (`.nvmrc` pins this). If you use `nvm`:

```bash path=null start=null
nvm install
nvm use
npm ci
```

Copy `apps/server/.env.example` to `apps/server/.env` and fill in real values (SMTP credentials, session secrets, per-client access codes — see [Configuration](#configuration)). Then, from the repo root:

```bash path=null start=null
npm run dev
```

This starts the Express API on port 4000 and the Vite dev server on port 3000 concurrently; Vite proxies `/api` and `/uploads` to the API so the browser only ever talks to one origin. Open <http://localhost:3000>.

Without SMTP configured, form submissions return a 500 (matching the original PHP `mail()` failure behaviour) but still persist to `apps/server/data/leads.csv`/`testimonials.json`, so you can verify capture logic without a mail server. A local SMTP catcher (e.g. `npx maildev`, pointed at via `SMTP_HOST=localhost`/`SMTP_PORT=1025`) is the easiest way to exercise the full success path locally.

## Commands

Run from the repo root unless noted:

- `npm run dev` — Express + Vite dev servers, concurrently.
- `npm run build` — production build of `apps/web` (outputs to `dist/apps/web`).
- `npm start` — start the Express server only (`apps/server`); does not build or serve the frontend unless `apps/web` has already been built and copied alongside it (see [Deployment](#deployment)).
- `npm run lint` / `npm run lint:fix` — ESLint across both workspaces.
- `npm test` — all Vitest suites (web + server) once.
- `npm run test:coverage` — all suites with coverage gates enforced (currently 60% per workspace; raise as coverage grows).
- `npm run package:hostinger` — build `apps/web`, then assemble and validate a deployable release archive (see [Deployment](#deployment)).

Workspace-scoped equivalents exist too, e.g. `npm run test:coverage --workspace apps/web`.

## Directory structure

```
apps/web/                       React/Vite frontend
  src/pages/                    Marketing pages, assessment tool, testimonials, contact
  src/pages/clients/<slug>/     Per-client proposal pages (gated)
  src/components/               Header, Footer, ClientGate, forms, assessment UI
  src/lib/                      Assessment scoring/data, PDF/DOCX generators
  src/styles/legacy.css         The original design system, preserved as-is
  public/                       Static assets (logo, favicons, hero video, legacy testimonial assets)
apps/server/                    Express backend
  src/app.js                    App factory: middleware, routes, static/SPA serving
  src/routes/                   contact, assessment, testimonials, admin-testimonials, client-auth
  src/lib/                      storage (JSON/CSV), email, session helpers, PDF conversion
  data/                         Runtime JSON/CSV storage + uploads (gitignored, not web-servable)
  .env.example                  Every environment variable the server reads
scripts/package-hostinger.mjs   Assembles and validates the Hostinger deployment release
.github/workflows/ci.yml        Lint, test, build, and package on every push/PR
```

Original PHP/HTML/vanilla-JS files (`index.html`, `services/`, `api/`, `clients/*.php`, `css/`, `js/`, etc.) remain in the repository root as a historical reference pending removal in a follow-up cleanup; they are not part of the deployed Node app and should not be edited going forward.

## The maturity assessment

The lead magnet, and the most involved part of the site.

**Structure:** 5 dimensions × 4 questions = 20 questions. Each answer scores 1–5.

The five dimensions are Test Process & Governance, Automation Coverage & Effectiveness, Tooling & Infrastructure, Reporting & Observability, and Team Skills & Culture.

**Scoring:** each dimension is the mean of its 4 answers; the overall score is the mean of the 5 dimension scores. Scores map onto five maturity levels — 1 Initial, 2 Managed, 3 Defined, 4 Measured, 5 Optimising.

**Flow:** the visitor answers all 20 questions, hits an email gate requiring name, email, and company, and then sees their results — an overall score, a radar chart (recharts) plotted against a Level 4 target, and a per-dimension recommendation. Results can be downloaded as a PDF.

**Lead capture:** submitting the gate posts scores and contact details to `POST /api/assessment`, which emails them through and appends a row to `apps/server/data/leads.csv`.

Relevant files:
- `apps/web/src/lib/assessment-data.js` — all questions, answer options, per-level recommendations, and level definitions. **Edit content here.**
- `apps/web/src/lib/assessment-scoring.js` — pure scoring functions (unit-tested).
- `apps/web/src/lib/pdf/assessment-report.js` — the PDF report generator.
- `apps/web/src/pages/AssessmentPage.jsx` and `apps/web/src/components/assessment/` — step navigation, validation, email gate, results panel.

## API reference

All endpoints are under `/api`, served by `apps/server`. Field names and validation rules are documented in the route modules under `apps/server/src/routes/`; the summary below covers behaviour.

| Endpoint | Behaviour |
|---|---|
| `POST /api/contact` | Validates and emails a contact enquiry; appends to `leads.csv` even if SMTP fails. |
| `POST /api/assessment` | Validates assessment scores/dimensions/answers, emails the lead, appends to `leads.csv`. |
| `GET /api/testimonials` | Public list of **approved** testimonials only (email and approval state never exposed). |
| `POST /api/testimonials` | Multipart submission (logo + reference letter uploads); reference letters are converted to PDF (`pdf-lib`/`mammoth`); stored `approved: false`; emails a notification. |
| `POST /api/admin/login` | Checks `key` against `ADMIN_SESSION_SECRET`; sets an admin session cookie. |
| `GET /api/admin/testimonials` | All testimonials (including unapproved); requires an admin session. |
| `POST /api/admin/testimonials/:id/approve` / `/reject` | Toggle approval; requires an admin session. |
| `DELETE /api/admin/testimonials/:id` | Remove a testimonial; requires an admin session. |
| `PATCH /api/admin/testimonials/:id` | Update `logo`/`referencePdf`; requires an admin session. |
| `POST /api/clients/:slug/unlock` | Checks `code` against that client's access-code env var; sets a per-client session flag. |
| `GET /api/clients/:slug/session` | Returns `{ authenticated }` for the given client slug. |
| `POST /api/clients/:slug/logout` | Clears that client's session flag. |

Sessions use a single cookie (`bosch.sid`, HttpOnly, `SameSite=Lax`, 24h) holding independent per-client flags plus an admin flag, regenerated on successful authentication. The in-memory session store is dev/single-process only — a persistent store is needed before this scales past one Node process (see [Security notes](#security-notes)).

There is currently no admin UI for testimonial moderation; use the endpoints above directly (e.g. with `curl` or a REST client) until one is built.

## Testimonial workflow

1. A client submits the form on `/testimonials`, optionally attaching a company logo and a reference letter.
2. Uploads are converted/stored under `apps/server/data/uploads/`, served at `/uploads/*` (never under `apps/web`'s own build output).
3. An entry is appended to `apps/server/data/testimonials.json` with `approved: false`, and an email notification is sent.
4. You approve it via `POST /api/admin/testimonials/:id/approve`.
5. The testimonials page fetches `GET /api/testimonials`, which already filters to `approved: true` server-side.

Nothing appears publicly until it is explicitly approved.

## Client proposal pages

Each client gets a route namespace under `/clients/<slug>/`, defined in `apps/web/src/App.jsx` and gated by the shared `ClientGate` component (`apps/web/src/components/ClientGate.jsx`), which checks `GET /api/clients/:slug/session` and prompts for the access code if not yet authenticated.

Current clients:

- `weconnectu` — assessment report, maturity assessment results, two improvement-engagement proposals, and a Master Services Agreement page with both PDF and Word (DOCX) export.
- `comotion` — assessment report, two maturity-assessment results pages (Comotion AI, Seed Analytics), and an improvement-engagement proposal.
- `toomuchiwifi` — a single proposal page.

Each proposal page embeds its own `jsPDF` (and, for the WeconnectU service agreement, `docx`) generator under `apps/web/src/lib/pdf/clients/`, so the client can download a branded document of exactly what they are reading. These generators lay out pages manually in millimetres, so when adding content be aware that sections can spill onto the next page — check the output rather than assuming.

**To add a client:** add its access-code env var (`CLIENT_ACCESS_CODE_<NAME>`) to `apps/server/.env`/`.env.example` and the `clientVariables` map in `apps/server/src/routes/client-auth.js`, create `apps/web/src/pages/clients/<slug>/*.jsx` pages and route them in `App.jsx` wrapped in `<ClientGate slug="...">`, and add a PDF generator under `apps/web/src/lib/pdf/clients/`.

## Design system

`apps/web/src/styles/legacy.css` holds the original design system, imported globally — there are no per-page stylesheets, only occasional inline overrides. Tailwind utilities and `apps/web/src/lib/utils.js`'s `cn()` helper are available for new Radix-based components and coexist with the legacy classes.

The theme is dark (`#000` / `#111` surfaces) with a gold primary (`#b8961c`). Reusable building blocks include `.btn` variants, `.badge`, `.section`, `.container`, `.proposal-option-card`, `.proposal-table`, and `.process-steps`.

Breakpoints are 992px and 768px. Note that inline `grid-template-columns` overrides beat the responsive rules in the stylesheet — prefer `repeat(auto-fit, minmax(...))` over a hardcoded column count, and wrap wide tables in a container with `overflow-x: auto`.

## Testing

Both workspaces use Vitest. `apps/web` additionally uses React Testing Library (`tests/unit`, `tests/component`, `tests/integration`); `apps/server` uses `supertest` against the Express app factory directly (no real network binding, no real SMTP — `nodemailer` is mocked in tests). Coverage gates are enforced via `npm run test:coverage` and are currently set to 60% per workspace (lower than a mature project's bar, since this is a from-scratch suite); raise the thresholds in each workspace's `vitest.config.js` as coverage grows.

## Deployment

Production domain: **boschtechnologies.com**, deployed as a Hostinger **Node.js Web App** (not the static Custom PHP/HTML hosting the old PHP site used) — a genuine Node process serves both the API and the built frontend.

### Create the release

```bash path=null start=null
npm ci
npm run lint
npm run test:coverage
npm run package:hostinger
(cd dist && shasum -a 256 -c bosch-technologies-hostinger.tar.gz.sha256)
```

This produces `dist/bosch-technologies-hostinger.tar.gz` (and a `.sha256` checksum), containing:
- `package.json` — only `apps/server`'s runtime dependencies and a `start` script (no devDependencies, no workspaces).
- `src/` — the Express app (`apps/server/src`, unmodified).
- `.env.example` — reference only; real values are configured as environment variables in hPanel, never shipped as a real `.env`.
- `web/` — `apps/web`'s production build, served by the Express app itself.

Alternatively, download the `hostinger-release` artifact from a successful GitHub Actions run (`.github/workflows/ci.yml`) for the intended release commit.

### Deploy on Hostinger

1. In hPanel, create or select a **Node.js** application (Advanced → Node.js), choosing Node 22, an application root, and `src/index.js` as the startup file.
2. Upload and extract the release archive's contents into that application root, so `package.json` and `src/` sit directly in it (not nested inside an extra folder).
3. Set the environment variables listed in `.env.example` in hPanel's Node.js app settings — at minimum `SESSION_SECRET`, `ADMIN_SESSION_SECRET`, the three `CLIENT_ACCESS_CODE_*` values, and the SMTP variables. Set `NODE_ENV=production` and `SITE_URL` to the real domain.
4. Run hPanel's "Install NPM Packages" action (equivalent to `npm install` against the shipped `package.json`), then start/restart the app.
5. If migrating from the old PHP site, copy its `data/testimonials.json` into the new app's `DATA_DIR` (default `apps/server/data`, override with the `DATA_DIR` env var) before first start, so existing approved testimonials carry over. `data/leads.csv` can be migrated the same way if you want to retain lead history.
6. Verify `/`, every marketing route, `/assessment`, `/testimonials`, `/contact`, and each `/clients/<slug>/...` route both by clicking through and by opening/refreshing their URLs directly (confirms the SPA fallback works). Check the browser console for errors and confirm `/api/health` responds.

### Rollback

Keep the previous release archive. To roll back, stop the app, replace its files with the previous release's contents, reinstall packages, and restart.

The repository does not contain Hostinger credentials and cannot perform account-level hPanel steps itself.

## Configuration

All configuration is via environment variables read by `apps/server` (see `apps/server/.env.example` for the full, authoritative list). Nothing is hardcoded in source:

| Setting | Environment variable |
|---|---|
| Notification recipient | `NOTIFICATION_EMAIL` |
| SMTP credentials | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` |
| Session signing secret | `SESSION_SECRET` (required in production) |
| Testimonial admin key | `ADMIN_SESSION_SECRET` |
| Client access codes | `CLIENT_ACCESS_CODE_WECONNECTU`, `CLIENT_ACCESS_CODE_COMOTION`, `CLIENT_ACCESS_CODE_TOOMUCHIWIFI` |
| Runtime data location | `DATA_DIR` (default: `apps/server/data`) |
| Allowed frontend origin (CORS) | `WEB_ORIGIN` (default: `http://localhost:3000` outside production) |

## Security notes

Most of the weaknesses documented in the original PHP-era README are fixed by this architecture (secrets in environment variables instead of committed PHP files; runtime data under a gitignored `apps/server/data/` directory that is never web-servable instead of inside the public web root; the admin key sent as a request body instead of a URL query parameter; CORS restricted to `WEB_ORIGIN` instead of `*`). Remaining items to be aware of:

- **Sessions use an in-memory store** (`express-session`'s default `MemoryStore`), which is single-process only and loses all sessions on restart. Fine for the current traffic/scale; replace with a persistent store (e.g. file- or database-backed) before running multiple Node processes or before session persistence across restarts matters.
- **Client access codes remain shared, static secrets** transmitted once over a POST request — adequate for gating a commercial proposal, matching the original PHP model's security level, but not real per-user authentication. Do not put anything genuinely sensitive behind them.
- **No admin UI exists yet** for testimonial moderation; the admin endpoints are intended to be called directly (e.g. via `curl`) until a UI is built.
