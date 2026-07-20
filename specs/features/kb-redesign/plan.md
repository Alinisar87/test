# Plan — KB Redesign (bright rebrand + packages + service menu)

**Branch:** session branch · **Roadmap:** item 14 (pivot, Ali directed 2026-07-20)
**Status:** [x] planned  [ ] implemented  [ ] validated

## Problem Statement
Ali's direction: KlientBoost (klientboost.com) as design/content reference, SoftCrust-style published packages "to start with", full service menu. Convert the existing dark analytical site to a bright, colorful, conversion-energy site — **inspired by, never copying** KlientBoost's artwork, copy, or branding.

## Decisions (Ali, 2026-07-20)
- Full bright rebrand (light bg, vivid multi-color, playful shapes, highlighted headlines)
- Pricing: published packages from ~$199/mo, 30-day rolling; $299 audit remains as flagship diagnostic product
- Services: full menu — Google Ads, Meta/Paid Social, CRO & Landing Pages, SEO, Email & Retention
- KlientBoost's client app idea → parked roadmap item (Ali will build an app for his customers later)

## Approach
Theme inversion at the token/component layer so pages mostly follow: light `#F7F7F5` background, charcoal ink, green stays primary, new support colors (amber, coral, sky, violet) for service cards and hero blobs. `hero-atmo` becomes colorful soft blobs + faint grid. Dark stays as a *variant* (footer, highlighted pricing tier) for contrast. Headline "marker highlight" via a tiny `*phrase*` → `<span class="hl">` convention in content frontmatter. Home gains a services grid (5 cards, colored icon blobs, hand-drawn mini SVG icons). Pricing page rebuilt around 3 monthly packages (DRAFT prices) + audit callout. Contrast rule: bright accent never used as small text on light bg (use `--color-accent-deep`).

## Task Groups
1. Constitution replan (tech-stack palette, mission scope note, roadmap items 14/15/parked-app)
2. Theme flip: global.css tokens/utilities, BaseLayout, Header, Footer, Section, Curve, StatTile, Button
3. Content: home services block + highlighted headings; pricing.md rebuilt (packages from $199 DRAFT)
4. Sweep: build, screenshots, Lighthouse 100s, contrast fixes

## Out of Scope
- Individual service pages (roadmap item 15); custom illustration library (needs a designer/budget); testimonials (no real clients citable — NO fabricated reviews); the client app

## Validation constraint
- Lighthouse ≥ 95/95/90 (target 100s), zero JS, 320px clean, all 8 routes
