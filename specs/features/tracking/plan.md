# Plan — Tracking

**Branch:** session branch · **Roadmap:** Phase 4, item 10
**Status:** [x] planned  [ ] implemented  [ ] validated

## Problem Statement
GTM container wiring: GA4 + Meta Pixel load through GTM; conversion events (`audit_checkout_click`, `purchase`, `call_booked`) captured.

## Approach
Code ships the rails; the container itself is configured in GTM's UI (Ali/Claude-assisted later — needs a real GTM account):
- BaseLayout: standard GTM head snippet + noscript iframe, rendered ONLY when `PUBLIC_GTM_ID` set → site stays zero-JS until tracking is real (and the perf budget is re-checked then)
- `purchase` push on /thanks already shipped (item 5), same guard
- `audit_checkout_click`: fired from GTM's own link-click trigger on the Stripe URL — **no site JS needed**; documented in requirements as GTM-side config
- `call_booked`: GHL calendar events can't be click-tracked reliably from the parent page; wire GHL→GA4 (or GHL webhook → server-side GA4) inside GHL — documented, out of code scope

## Files
- `src/layouts/BaseLayout.astro` — GTM snippets (guarded)

## Out of Scope
- The GTM container config itself, GA4 property + Meta Pixel creation (accounts needed — Ali)
