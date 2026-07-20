# Plan — Blog Scaffold

**Branch:** session branch · **Roadmap:** Phase 4, item 12
**Status:** [x] planned  [ ] implemented  [ ] validated

## Problem Statement
Content collection + listing + post template, zero posts required — so publishing later is "add a .md file", nothing else.

## Approach
`blog` collection (title, description, date, draft). `/blog` listing with graceful empty state (copy from `pages/blog.md`); `/blog/[slug].astro` template reusing prose styles + audit CTA. Not in the nav until content exists (mission: blog is scaffolding, not a feature). Listing is noindex while empty? No — indexable but empty-state copy is fine; drafts excluded from listing and sitemap.

## Files
- `src/content.config.ts` — add blog collection; `src/content/pages/blog.md`, `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro` — new

## Out of Scope
- Any posts, RSS, tags/categories, pagination (add at 10+ posts)
