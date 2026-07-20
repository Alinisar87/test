# Requirements — Case Study

## Must
- Dynamic route from `caseStudies` collection (`getStaticPaths`) — template reusable for future studies with zero code changes
- Structure: kicker/title/dek, metric StatTiles row, narrative sections (situation → finding the curve → the fixes → the numbers), curve chart visual, audit CTA
- Markdown body rendered with readable prose styles (dark bg)
- Numbers appear ONLY as explicit placeholders (`[X]`, `$[X]`) until Ali provides the real analysis
- noindex while placeholder data is present (frontmatter `draft: true` → noindex)

## Technical
- `render(entry)` for body; prose styles in global.css (`.prose-dark`)

## Out of Scope
- Real metrics (Ali), charts generated from data
