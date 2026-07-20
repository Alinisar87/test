# Plan — Thank You (/thanks)

**Branch:** `claude/sfl-website-specs-phase-2-81fmd9` (serves as `feature/thank-you`)
**Roadmap phase:** Phase 2, item 5 — completes the MVP cut line
**Status:** [x] planned  [x] implemented  [x] validated (GHL URL pending Ali)

---

## Problem Statement
Post-purchase page: book the walkthrough call (GHL calendar embed), set expectations ("what happens next" timeline), and register the `purchase` conversion event.

## Approach
Copy in `src/content/pages/thanks.md`. GHL calendar iframe from `PUBLIC_BOOKING_URL` (styled placeholder panel when unset — env not yet provisioned). `purchase` dataLayer push rendered ONLY when `PUBLIC_GTM_ID` is set — inert until item 10 wires GTM; roadmap line satisfied, full verification deferred to tracking feature. Page is `noindex` (BaseLayout gains an optional `noindex` prop).

## Task Groups
1. `thanks.md` content + `/thanks` page + BaseLayout noindex prop

## Files Likely to Change
- `src/content/pages/thanks.md`, `src/pages/thanks.astro` — new
- `src/layouts/BaseLayout.astro` — add optional `noindex` prop

## Out of Scope
- GTM container itself (item 10); Stripe redirect config (done in Stripe dashboard: payment link success URL → /thanks)

## Open Questions
- [x] None — GHL calendar URL pending from Ali (env var, flagged in validation)
