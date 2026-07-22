# eFile Pak

A SaaS tax-filing product for individuals in Pakistan. Any individual signs up,
answers a plain-language questionnaire, uploads their documents, and eFile Pak
computes their income tax + wealth statement and hands a review-ready package to
the team, who file it on the FBR **IRIS** portal.

Built in response to FBR making **e-filing mandatory for individuals** and
introducing the *Simplified Electronic Return* for Tax Year 2026.

> **This is a "prepare + we file" service, not an auto-submit bot.** FBR does not
> expose a public API for third parties to submit returns on a taxpayer's behalf.
> Every return is computed as an **estimate** and verified by a professional
> before it is filed on IRIS. Tax rates must be reconciled against the current
> Finance Act at filing time — see `src/lib/tax/rates.ts`.

## Stack

- **Next.js 15** (App Router, Server Actions, TypeScript)
- **Tailwind CSS 4**
- **Prisma** ORM — SQLite for local dev (swap to Postgres for production)
- **jose** (signed JWT session cookies) + **bcryptjs** (password hashing)
- **zod** (input validation)
- Pure, unit-tested tax engine (`src/lib/tax/`) reused on server and client

## Getting started

```bash
cd efilepak
cp .env.example .env          # set AUTH_SECRET etc.
npm install
npm run db:push               # create the SQLite schema
npm run db:seed               # create a STAFF admin (see .env for credentials)
npm run dev                   # http://localhost:3000
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | `prisma generate` + production build |
| `npm start` | Run the production build |
| `npm test` | Run the tax-engine unit tests (`node --test`) |
| `npm run db:push` | Sync the Prisma schema to the database |
| `npm run db:seed` | Create/update the STAFF admin account |

## What's built

- **Bilingual — English + اردو (RTL)** — full language toggle; the whole UI, including the questionnaire, flips to right-to-left Urdu. Structured to add Sindhi/Pashto/Punjabi/Balochi (mirrors FBR's own regional-language rollout) by extending one dictionary.
- **Auth** — register / login / logout with hashed passwords and JWT cookie sessions; `USER` and `STAFF` roles; optional WhatsApp number captured at signup.
- **Freelancer / IT-export regime** — a first-class filer type with the s.154A final tax on IT/ITeS export receipts (1%, or 0.25% for PSEB-registered), stacking correctly on top of any local slab income.
- **Status notifications** — email + WhatsApp on submission and every staff status change, via a provider seam (Resend + Meta WhatsApp Cloud API). Without keys it records a `LOGGED` notification instead of failing. Every attempt is persisted for audit.
- **Payments** — charge a per-return fee before filing. Gateway-agnostic (`src/lib/payments.ts`) with a working **mock** provider for dev and a documented path for Pakistani gateways (Safepay/JazzCash/Easypaisa). Gated by `PAYMENTS_REQUIRED`; per-filer pricing configurable via env.
- **Questionnaire wizard** — FBR-style **one question per screen** (matching the new "8 digital windows" simplified return), grouped into stages (about you → income → tax paid → deductions → wealth statement → documents → review) with a **live tax estimate** that updates as you type. Branches for salaried vs business/AOP.
- **Auto-fill scaffolding** — an "auto-fill" step that captures employer/bank and pre-labels fields, with an honest note that live FBR data isn't accessible to third parties. `src/lib/prefill.ts` is the swappable seam for a future authorised FBR/PRAL feed.
- **Fast-refund + deadline cues** — flags returns eligible for the sub-Rs 50,000 fast refund and shows a live 30 Sept 2026 deadline countdown; helpline/support block.
- **Document uploads** — PDF/JPG/PNG, stored per-filing, served through an authorization-checked route.
- **Tax engine** — TY2026 salaried and business/AOP slabs, surcharge over Rs 10m, Zakat allowance, donation (s.61) and pension (s.63) tax credits, withholding reconciliation, and a **wealth-statement reconciliation** with red-flag detection.
- **Filing workflow** — `DRAFT → SUBMITTED → IN_REVIEW → (INFO_NEEDED) → FILED → COMPLETED`, with a per-filing event timeline.
- **Dashboard** — a taxpayer's returns, status, and payable/refund at a glance.
- **Staff admin** — a queue of submitted returns, per-return review with computed figures + documents, status control, taxpayer-facing messages, and internal notes.
- **Printable return package** — a clean summary the taxpayer can print or save as PDF.

## Production notes (before going live)

1. **Verify the tax rates** in `src/lib/tax/rates.ts` against the current FBR
   Finance Act. Rates change every budget.
2. Swap SQLite for **Postgres** (`datasource` in `prisma/schema.prisma`) and set
   `DATABASE_URL`.
3. Move document storage from local disk to object storage (S3/R2) — see
   `uploadDocument` in `src/app/actions/filings.ts`.
4. Set a strong `AUTH_SECRET` and serve over HTTPS (session cookie is `secure`
   in production).
5. Add rate limiting on auth, email verification, and a privacy policy / data
   handling agreement (you are processing sensitive financial data).

See `docs/SPEC.md` for the full product spec and roadmap.
