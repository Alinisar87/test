# Validation — Design System

How we know the feature actually works. Check each item off before merging.

---

## Smoke Tests
- [ ] `npm run build` completes with zero errors
- [ ] Placeholder page renders visually unchanged on desktop (compare screenshots)
- [ ] Mobile: hamburger visible below `md`, opens/closes the nav, all links + CTA reachable

## Functional Tests
- [ ] Button renders as `<a>` with href, `<button>` without; both variants and sizes render
- [ ] Section `offwhite` variant: charcoal text, no accent-on-offwhite body text (contrast)
- [ ] Curve `chart` labels driven by props; `divider` variant renders
- [ ] StatTile matches placeholder look
- [ ] View-source: still zero `<script>` tags

## Edge Cases
- [ ] 320px: nav panel usable, no horizontal overflow
- [ ] Keyboard-only: toggle focusable and operable (Enter/Space), focus visible, links tabbable when open
- [ ] SectionHeader with only `title` (no kicker/lead) renders without stray spacing

## Integration Points
- [ ] Cloudflare Pages auto-deploy succeeds on push; live page matches local

## Regression Check
- [ ] Lighthouse mobile: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90, CLS 0
- [ ] Zero third-party requests (headless check)
- [ ] Fonts still preloaded, no new weights

## Security / Compliance Check
- N/A

## Deep Review
- Not required — no client data, payments, or tax logic.
- [ ] Ali manually reviewed (live URL + diff)
- [ ] Spec and code are in sync

## Documentation Check
- [ ] Component usage comments present
- [ ] Roadmap item 2 checked off
- [ ] Constitution still accurate

## Merge Readiness
- [ ] All must-haves validated
- [ ] No open questions left from plan.md
- [ ] Ali signs off
