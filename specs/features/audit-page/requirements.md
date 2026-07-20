# Requirements — Audit Page

## Functional — Must
- Route `/audit` renders: hero ("Find the exact point your ad spend stops making money"), 5 deliverables, Ceiling Guarantee block, 4-step how-it-works (Pay → connect accounts → 5 days → walkthrough call), payment CTA, FAQ (min. 3 objections: why paid / what access / small account)
- ALL copy lives in `src/content/pages/audit.md` frontmatter+body; the `.astro` component contains zero English copy
- Payment CTA href = `PUBLIC_STRIPE_AUDIT_URL` env var; falls back to `#` with a visible-in-code TODO when unset
- FAQ is zero-JS accordion (`<details>/<summary>`), keyboard accessible
- Multiple CTAs: hero + after guarantee + end of FAQ

## Technical
- Content collection `pages` via Astro 5 glob loader; permissive (passthrough) schema — page shapes vary
- No new dependencies; zero client-side JS
- Env vars documented in `.env.example`; nothing hardcoded

## UI / UX
- Existing ui components (Section, SectionHeader, Button, StatTile, Curve divider); brand tokens only
- Guarantee block visually distinct (accent border) — it's the risk-reversal moment
- Deliverables as numbered list with mono numbers (data-driven tone)

## Performance
- Lighthouse mobile ≥ 95/95/90 (validated in end-of-phase sweep)

## Out of Scope
- Stripe webhook handling, purchase tracking events, structured data
