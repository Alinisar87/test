# Requirements — Blog Scaffold

## Must
- `blog` collection: title, description, pubDate, draft (default true), markdown body
- `/blog`: lists non-draft posts newest-first (date, title, description); zero posts → styled empty state, no broken UI
- `/blog/[slug]`: prose-dark body, date, back-to-blog link, audit CTA; drafts get noindex and are excluded from listing/sitemap
- Publishing flow = drop a .md in `src/content/blog/` with `draft: false`; zero code edits
- Blog NOT added to header nav (until posts exist)

## Out of Scope
- RSS, OG-per-post images, author fields (single-author implied)
