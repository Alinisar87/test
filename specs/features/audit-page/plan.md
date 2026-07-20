# Plan — Audit Page (/audit)

**Branch:** `claude/sfl-website-specs-phase-2-81fmd9` (serves as `feature/audit-page`)
**Roadmap phase:** Phase 2, item 3
**Status:** [x] planned  [x] implemented  [x] validated (draft copy pending Ali)

---

## Problem Statement
The funnel page — the one page that must exist for warm intros to convert. Sells the $299 Profit Curve Audit: what's in it, the guarantee, how it works, payment CTA, objection-handling FAQ.

## Approach
This feature also establishes the **copy-in-content architecture** (tech-stack constraint: all copy in `src/content/`, copy edits never touch components). Astro 5 content collection `pages` (glob loader, markdown + structured frontmatter); the page component reads its entry and renders sections with existing ui components plus a new zero-JS `FaqItem` (details/summary). Stripe link comes from `PUBLIC_STRIPE_AUDIT_URL` env var (placeholder until Ali creates the payment link).

## Task Groups
1. **Content infra** — `src/content.config.ts` with `pages` collection; `.env.example`; `src/content/pages/audit.md` (draft copy)
2. **Page + FaqItem** — `src/pages/audit.astro` rendering hero / deliverables / guarantee / how-it-works / CTA / FAQ; `src/components/ui/FaqItem.astro`

## Files Likely to Change
- `src/content.config.ts`, `src/content/pages/audit.md`, `.env.example` — new
- `src/pages/audit.astro`, `src/components/ui/FaqItem.astro` — new

## Out of Scope
- Real Stripe link (env placeholder until Ali provides), GTM events (item 10), OG/schema polish (item 11)

## Dependencies
- **Blocks:** home (links here), thank-you
- **Blocked by:** design-system (done)

## Open Questions
- [x] Offer doc not provided → deliverables, guarantee wording, FAQ answers are **DRAFT** copy derived from mission/ICP/roadmap; flagged in validation.md for Ali's word-level review. Proceeding under standing approval.
