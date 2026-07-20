# Plan — Home (/)

**Branch:** `claude/sfl-website-specs-phase-2-81fmd9` (serves as `feature/home`)
**Roadmap phase:** Phase 2, item 4
**Status:** [x] planned  [ ] implemented  [ ] validated

---

## Problem Statement
Replace the scaffold placeholder with the real home page: problem-first hero funneling to /audit, the curve explained in 3 steps, three differentiators, case-study + pricing teasers, final CTA.

## Approach
Same architecture as audit-page: copy in `src/content/pages/home.md`, page assembles ui components. Hero keeps the approved curve-chart layout. Single primary CTA → /audit throughout (roadmap: "single CTA").

## Task Groups
1. `home.md` content (draft copy per positioning) + rewrite `index.astro` from content

## Files Likely to Change
- `src/content/pages/home.md` — new; `src/pages/index.astro` — rewrite

## Out of Scope
- Case-study page itself (item 7), pricing page itself (item 6) — teasers link to routes that 404 until then

## Open Questions
- [x] None — layout approved via placeholder; copy flagged as draft in validation.md
