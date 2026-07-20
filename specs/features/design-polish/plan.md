# Plan — Design Polish

**Branch:** session branch · **Roadmap:** unscheduled visual-quality pass (Ali directed 2026-07-20: "focus on design now")
**Status:** [x] planned  [x] implemented  [x] validated

## Problem Statement
The pages are structurally right but visually flat — no atmosphere, no depth, generic cards, plain header/footer. Elevate the whole site to match the "the site IS the credibility proof" bar while keeping every constraint: zero JS, Lighthouse 100s, tokens only.

## Approach — all CSS/SVG, no JavaScript
1. **Atmosphere**: chart-paper grid texture + soft accent radial glow behind heroes (`.hero-atmo` utility) — the analytical brand made visible
2. **Header**: sticky with translucent charcoal + backdrop blur; active-page link state
3. **Curve chart**: soft accent glow under the stroke (blurred duplicate path)
4. **Buttons**: accent glow shadow on primary, hover lift, pressed state
5. **Cards** (teasers, tiers, guarantee, FAQ): hover borders, gradient washes, highlighted tier gets ring + badge (badge text from content frontmatter)
6. **Footer**: 3-column — brand + positioning, site links (incl. blog), fine print
7. **Rhythm**: slightly more generous large-screen section padding; StatTile values larger

## Files
- `src/styles/global.css`, `Header.astro`, `Footer.astro`, `ui/Button.astro`, `ui/Curve.astro`, `ui/StatTile.astro`, `ui/FaqItem.astro`, `pricing.md` (badge field), page hero sections — modify

## Out of Scope
- New copy, new sections, JS islands, logo design

## Validation (2026-07-20)
- [x] All 8 routes: 200, zero horizontal overflow at 320px and 1280px
- [x] Lighthouse 100/100/100, CLS 0 on /, /audit, /pricing
- [x] Zero client JS (all effects CSS/SVG); sticky header via backdrop-blur, no focus traps
- [x] Full-page screenshots reviewed (home, audit)
