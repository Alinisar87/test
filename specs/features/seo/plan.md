# Plan — SEO

**Branch:** session branch · **Roadmap:** Phase 4, item 11
**Status:** [x] planned  [x] implemented  [x] validated (Search Console pending domain)

## Problem Statement
Meta/OG per page, sitemap.xml, schema.org (Organization, Service, FAQPage), OG image with the curve.

## Approach
- BaseLayout: OG/Twitter meta (title, description, url, image, site_name, card) from existing props + optional `ogType`
- OG image: 1200×630 PNG rendered once from an HTML template via local headless Chromium → `public/og.png` (generator script kept in `scripts/`)
- `@astrojs/sitemap` integration (new dep — tech-stack.md updated), filtering /thanks and draft case studies; `public/robots.txt` pointing at it
- JSON-LD: Organization (all pages, in BaseLayout); Service + FAQPage on /audit generated from the page's own content frontmatter (single source of truth)

## Files
- `src/layouts/BaseLayout.astro`, `src/pages/audit.astro` — modify
- `astro.config.mjs`, `package.json` — sitemap integration
- `scripts/generate-og.mjs`, `public/og.png`, `public/robots.txt` — new

## Out of Scope
- Per-page custom OG images (one brand image v1); blog RSS (with first post)
