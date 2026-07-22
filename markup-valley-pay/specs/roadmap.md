# Roadmap — Markup Valley Pay

A living document. Phases are implemented one at a time, each with its own feature spec under `specs/features/<slug>/`. Check off each phase when merged.

---

## Phase 1 — Rail Adapter + Sandbox Mock
**Slug:** `rail-adapter`
**Status:** [ ] not started  [ ] in progress  [ ] merged

**Goal:** Define the payment-rail interface and ship a sandbox/mock implementation so the whole product can run before any partner is signed.

**Scope:**
- `PaymentRail` interface: `createRequest`, `getStatus`, `handleCallback` (Raast QR + RTP).
- Zod contracts for request/response payloads (ISO 20022-shaped where sensible).
- Mock rail: deterministic QR/reference generation, simulated paid/expired callbacks.
- Idempotent callback handling with dedupe keys.
- Contract tests the real partner adapter must also pass.

**Why this first:** De-risks the whole asset-light thesis. Everything else builds on this seam; a real partner drops in behind it later.

---

## Phase 2 — Freelancer Onboarding + KYC Intake
**Slug:** `onboarding-kyc`
**Status:** [ ] not started  [ ] in progress  [ ] merged

**Goal:** A freelancer can sign up, complete lightweight KYC, and reach an empty dashboard.

**Scope:**
- NextAuth email/OTP signup.
- `KycProfile` capture (name, phone, CNIC) — encrypted, access-logged, no payment credentials.
- Onboarding checklist UI; brand navy/gold.

**Depends on:** Phase 1

---

## Phase 3 — Payment Requests + Dashboard
**Slug:** `collections-core`
**Status:** [ ] not started  [ ] in progress  [ ] merged

**Goal:** The core product — create a Raast payment request, share it, get paid, see status.

**Scope:**
- Create request (amount, purpose, payer contact) → QR + shareable link via the rail adapter.
- Dashboard: pending / paid / expired, history, CSV export.
- "You've been paid" notification (email + WhatsApp via GHL).

**Depends on:** Phases 1–2. **This is the product.**

---

## Phase 4 — Formation-Funnel Bundle
**Slug:** `funnel-bundle`
**Status:** [ ] not started  [ ] in progress  [ ] merged

**Goal:** Tie collections into Markup Valley's existing formation funnel — "form your entity → get a collections account."

**Scope:**
- Entry point from the funnel; pre-filled onboarding.
- Cross-border framing for NRA-owned entities (Pakistan payout endpoint).

**Depends on:** Phase 3

---

## Backlog (unprioritized)
- Real sponsor EMI / 1LINK 1GO Raast P2M adapter (swap the mock).
- Static QR / point-of-sale mode for micro-merchants.
- Recurring / bulk Request-to-Pay (subscriptions, invoicing runs).
- Thin-file "financial identity" data capture → seeds the future SBP-sandbox TPP credit product (Track 2).
- Multi-language UI (Urdu).

---

## MVP Cut Line
MVP = **Phases 1 through 3.** That is a real, demoable, asset-light collections product a freelancer can actually get paid through against the sandbox rail — and the artifact we show a prospective sponsor partner. Phase 4 (funnel bundle) and everything in the backlog are post-MVP.

---

## Revision Log
- 2026-07-22 — initial roadmap drafted (Track-1 asset-light collections product).
