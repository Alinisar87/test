# Plan — Pricing (/pricing)

**Branch:** session branch (serves as `feature/pricing`) · **Roadmap:** Phase 3, item 6
**Status:** [x] planned  [ ] implemented  [ ] validated

## Problem Statement
Trust page: 3 retainer tiers, "every engagement starts with the audit" framing, FAQ.

## Approach
Copy in `src/content/pages/pricing.md`; tier table built from frontmatter; audit-first banner up top; FaqItem reuse. First production use of Section `offwhite` variant for the tier grid.

## ⚠️ Draft-price warning
Offer doc not provided. Tier names, inclusions, and **prices are Claude's draft, reasoned from "Dubai output at half the fee" economics — Ali MUST replace with real numbers before real traffic**. Flagged in validation.md.

## Files
- `src/content/pages/pricing.md`, `src/pages/pricing.astro` — new

## Out of Scope
- Per-tier checkout (sales-led after audit); comparison matrix
