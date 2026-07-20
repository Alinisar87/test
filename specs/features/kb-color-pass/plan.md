# Plan — KB Color Pass (blue palette + price removal)

**Branch:** session branch · **Roadmap:** amendment to item 14 (Ali directed 2026-07-20 night: "replicate completely including color, just not prices; remove audit prices")
**Status:** [x] planned  [x] implemented  [x] validated

## Decisions
- Palette moves to KlientBoost's color direction: **royal blue primary** on white, navy-leaning ink, **yellow marker highlights**, multicolor support chips. Color palettes aren't protectable; artwork/copy/logos are — none copied.
- All visible "$299" audit pricing removed site-wide (CTAs, kickers, guarantee, FAQs, JSON-LD offer). Audit stays a product; price is discussed on the call. Package prices unchanged (Ali: "just not prices").
- KB-style structure: full-bleed blue CTA band on home; honest stat strip (no fabricated reviews/logos/testimonials).

## Approach
Token-level swap: `--color-accent` → blue `#2a6bf5`, `--color-accent-deep` → `#1d4ed8`; green retired to a support chip color. Hardcoded brand hexes in Curve/Header/Footer/favicon/OG swapped to blue. Glow shadows re-tinted. Content edits strip prices. tech-stack.md brand v3.

## Validation (2026-07-20 night)
- [x] No visible "$299" anywhere in src (grep-verified; only the guarded analytics dataLayer keeps a value)
- [x] Lighthouse: / 99-100/100/100 · /audit 100/100/100 · /pricing 100/100/100 · /services/google-ads 100/100/100 — zero contrast failures after white-on-blue button + accent-lite-on-dark fixes
- [x] OG image + favicon regenerated in blue
