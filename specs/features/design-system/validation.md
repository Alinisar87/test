# Validation — Design System

How we know the feature actually works. Check each item off before merging.

---

## Smoke Tests
- [x] `npm run build` completes with zero errors
- [x] Placeholder page renders visually unchanged on desktop (screenshot compared; intended deltas: curve divider replaces plain border above stat tiles, construction-note contrast bumped 40%→60% for a11y)
- [x] Mobile: hamburger visible below `md`, opens/closes the nav, all links + CTA reachable (headless Chromium, keyboard-driven)

## Functional Tests
- [x] Button renders as `<a>` with href (both variants/sizes live on the page); `<button>` branch verified by inspection — first production use comes with forms
- [x] Section `offwhite` variant verified by inspection (flips to charcoal text; accent reserved for graphics/buttons) — first production use comes with pricing/case-study
- [x] Curve `chart` labels driven by props (index passes all four); `divider` variant renders on the page
- [x] StatTile matches placeholder look
- [x] View-source: still zero `<script>` tags

## Edge Cases
- [x] 320px: nav panel usable, 0px horizontal overflow closed and open
- [x] Keyboard-only: toggle operable via Space, focus ring visible, closed-menu links removed from tab order (visibility pattern)
- [x] SectionHeader with only `title` verified by inspection (conditional margins)

## Integration Points
- [ ] Cloudflare Pages auto-deploy succeeds on push; live page matches local — **verify on pages.dev after this push**

## Regression Check
- [x] Lighthouse mobile: **Performance 100 / SEO 100 / Accessibility 100**, CLS 0
- [x] Zero third-party requests (font setup unchanged; zero `<script>` re-verified)
- [x] Fonts still preloaded, no new weights

## Security / Compliance Check
- N/A

## Deep Review
- Not required — no client data, payments, or tax logic.
- [ ] Ali manually reviewed (live URL + diff)
- [ ] Spec and code are in sync

## Documentation Check
- [x] Component usage comments present
- [x] Roadmap item 2 checked off
- [x] Constitution still accurate

## Merge Readiness
- [x] All must-haves validated
- [x] No open questions left from plan.md
- [ ] Ali signs off
