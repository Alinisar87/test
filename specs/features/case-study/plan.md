# Plan — Case Study (/case-studies/shopify-roas-ceiling)

**Branch:** session branch (serves as `feature/case-study`) · **Roadmap:** Phase 3, item 7
**Status:** [x] planned  [x] implemented  [x] validated (real numbers pending Ali)

## Problem Statement
The proof page: the Shopify ROAS analysis as narrative (situation → curve found → fixes → numbers), on a template reusable for future studies.

## Approach
New `caseStudies` content collection (markdown body = narrative, frontmatter = metrics/meta). Dynamic route `src/pages/case-studies/[slug].astro` — the reusable template: header, metric tiles, prose body, curve visual, CTA. Prose styles for markdown added to global.css.

## ⚠️ Placeholder-numbers rule
Ali's real Shopify analysis was not provided. All metrics/currency figures are written as **visible `[X]` placeholders** — the page must read as a template awaiting data, NOT as a fabricated client result. No invented "real" numbers presented as genuine. Ali supplies the real analysis; wording slots in.

## Files
- `src/content.config.ts` — add `caseStudies` collection
- `src/content/case-studies/shopify-roas-ceiling.md` — new (placeholder data)
- `src/pages/case-studies/[slug].astro` — new template

## Out of Scope
- Case-studies index page (one study; add listing when there are 2+)
