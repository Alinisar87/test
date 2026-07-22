# Tech Stack — Markup Valley Pay

## Architecture Summary
A Next.js (App Router) full-stack web app: server-rendered dashboard + API routes, a Postgres/Prisma data layer, and a **payment-rail adapter** abstraction that isolates all Raast/settlement calls behind one interface. v1 ships with a sandbox/mock rail; a real sponsor EMI / 1LINK 1GO Raast P2M implementation drops in behind the same interface with no domain-code changes.

## Languages & Runtimes
| Concern | Choice | Why |
|---|---|---|
| Primary language | TypeScript (strict) | Markup Valley SaaS default; type safety across app + API + rail contracts |
| Runtime version | Node 20+ | Current LTS; Vercel-supported |
| Type system | TypeScript strict mode | Catch rail/schema mismatches at compile time |

## Frameworks & Libraries
| Concern | Choice | Why |
|---|---|---|
| Web framework | Next.js 14+ (App Router) | Firm SaaS default; SSR dashboard + API routes in one repo |
| ORM / DB client | Prisma | Firm default; typed schema, migrations |
| Validation | Zod | Runtime validation of API + rail payloads; pairs with TS |
| Auth | NextAuth (Auth.js) | Firm default; email/OTP for freelancers |
| Testing | Vitest + Playwright | Unit/contract tests for the rail adapter; E2E for the pay flow |
| Linting / Formatting | ESLint + Prettier | Firm default |
| Styling | Tailwind + brand tokens | Navy #1B2A4A / Gold #C9A84C |

## Data Layer
- **Database:** SQLite for local dev → Postgres for staging/prod (firm default).
- **Schema strategy:** Prisma migrations, code-first.
- **Backup / retention:** provider-managed (Neon/Supabase/Vercel Postgres) once hosted.
- **Key tables:** `User`, `KycProfile`, `PaymentRequest`, `PaymentEvent` (rail webhook/callback log), `Notification`. **No table stores PANs or full bank account numbers** — only partner tokens/references.

## External Integrations
| Service | Purpose | Auth method |
|---|---|---|
| Payment-rail partner (sandbox → sponsor EMI / 1LINK 1GO Raast P2M) | Create Raast QR/RTP, receive paid callbacks | Bearer token / mTLS per partner (via adapter) |
| Notifications (email + WhatsApp via GHL) | "You've been paid" alerts | GHL API key (check `ghl-markupvalley` skill) |
| Markup Valley formation funnel (later) | Bundle collections into onboarding | TBD — roadmap Phase 4 |

## Deployment & Hosting
- **Environment:** local (SQLite) → Vercel (Postgres) for staging/prod.
- **CI/CD:** GitHub → Vercel preview per branch; type-check + tests gate.
- **Secrets management:** Vercel env vars / `.env` (never committed). Rail keys are partner-scoped.
- **Domain / URL:** TBD (subdomain of markupvalley.com or standalone).

## Security & Compliance
- **Never store payment credentials** — no PANs, no full account numbers. Only partner-issued tokens/reference IDs.
- **PII (name, phone, CNIC):** encrypted at rest where the host supports it; access-logged; mandatory deep-review in validation.
- **Asset-light guardrail:** the app must not hold or move funds itself — settlement is always the licensed partner's. Any code path implying custody is a validation failure.
- **Idempotency:** rail callbacks/webhooks handled idempotently (replay-safe) via `PaymentEvent` dedupe keys.

## Performance Targets
- Payment-request create → shareable QR/link in < 2s.
- Dashboard first load Lighthouse performance ≥ 90 (mobile).

## Development Conventions
- **Git workflow:** work on the designated branch `claude/pral-fbr-online-markup-qf65kf`; specs committed alongside code.
- **Commit style:** `feat:`, `fix:`, `spec:`, `chore:`, `docs:`, `refactor:` — small, logical commits.
- **Code style:** ESLint + Prettier; Zod at every trust boundary.
- **Folder structure:** app project rooted at `markup-valley-pay/`; specs under `markup-valley-pay/specs/`.

## Versioning
- **Spec versioning:** specs in `markup-valley-pay/specs/`, committed with the code that implements them.
- **Release versioning:** semver once past MVP.

## Rejected Alternatives
- **Building an EMI/wallet in v1** — rejected: PKR 200M capital + SBP three-stage licensing; asset-light partner model ships now.
- **Coupling directly to one partner's API up front** — rejected: no partner signed; adapter + sandbox mock keeps us swappable.
- **Astro (this repo's site stack)** — rejected for the app: needs auth, DB, stateful dashboards; Next.js is the firm SaaS default.
- **Storing bank details for "convenience"** — rejected: regulatory + sensitivity red line; tokenize/delegate only.
