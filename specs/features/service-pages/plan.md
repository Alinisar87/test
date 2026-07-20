# Plan — Service Pages

**Branch:** session branch · **Roadmap:** item 15
**Status:** [x] planned  [x] implemented  [x] validated

## Problem Statement
The services grid (item 14) presents five service lines but the cards link nowhere. Each service needs its own page: what we do, how it ties to the marginal-ROAS methodology, which package fits, CTA.

## Approach
`services` content collection (one .md per service; frontmatter = structured copy, DRAFT). One dynamic template `src/pages/services/[slug].astro` renders all five; `/services` index reuses the grid. Home service cards + header/footer link in. Custom 404 page rides along (on-brand, links home/pricing).

## Task Groups
1. Collection + 5 content files (google-ads, paid-social, cro-landing-pages, seo, email-retention)
2. Template + /services index + nav/footer/home links + 404
3. Sweep: build, Lighthouse on one service page, viewport, sitemap includes /services/*

## Out of Scope
- Per-service case studies, per-service pricing (packages page covers it), illustrations

## Validation (2026-07-20)
- [x] All 5 service routes + /services index + custom 404 render; home cards/header/footer link through
- [x] Lighthouse 100/100/100, CLS 0 on /services/google-ads; all 15 routes 0px overflow at 320/1280
- [x] Sitemap includes all /services/* URLs
- ⚠️ All service copy + package-fit mapping is DRAFT for Ali review
