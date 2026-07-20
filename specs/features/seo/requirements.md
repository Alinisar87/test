# Requirements — SEO

## Must
- Every page: unique title/description (already), canonical (already), og:title/description/url/type/image/site_name, twitter:card=summary_large_image
- `sitemap-index.xml` generated at build; excludes /thanks and any `draft: true` case study; robots.txt references it
- JSON-LD: Organization site-wide (name, url, logo, sameAs empty for now); on /audit additionally Service (name, price $299 USD, provider) + FAQPage from the audit FAQ frontmatter
- OG image: charcoal bg, curve motif, positioning line, wordmark — 1200×630 PNG < 150KB
- noindex pages must NOT appear in sitemap (verify)

## Technical
- `@astrojs/sitemap` (only new dependency; recorded in tech-stack.md)
- JSON-LD via `<script type="application/ld+json">` — data scripts, not executable JS; zero-JS budget intact
