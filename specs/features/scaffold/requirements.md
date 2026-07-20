# Requirements — Scaffold

Functional and technical requirements for this feature. Be specific enough to validate against, but don't micromanage — leave room for Claude to make good local decisions.

---

## Functional Requirements

### Must
- `npm run dev` serves a placeholder home page with header, nav, footer rendered
- `npm run build` produces a static site in `dist/` with zero errors
- Header nav links to all v1 routes (`/`, `/audit`, `/pricing`, `/case-studies/shopify-roas-ceiling`, `/about`, `/contact`) — 404s acceptable until those features ship
- Brand tokens usable in any component via Tailwind class names (e.g. `bg-charcoal`, `text-accent`)
- Fonts render self-hosted; site makes **zero** third-party network requests

### Should
- Placeholder page shows the positioning line from mission.md so the deploy preview isn't an empty box
- README documents: local dev, build, and the exact Cloudflare Pages settings

### Nice to have
- `favicon.svg` placeholder using the accent green (real curve favicon is roadmap item 11)

## Technical Requirements
- Astro (version per open question in plan.md), static output — no SSR adapter
- Tailwind CSS with brand tokens defined once, in the theme, not sprinkled as arbitrary values
- TypeScript strict mode
- Fontsource packages for fonts; max 2 families; `font-display: swap`; woff2 only
- Node version pinned via `.nvmrc` and mirrored in README/Cloudflare settings
- `src/content/` exists (empty with `.gitkeep` is fine) to anchor the copy-in-markdown constraint

## Data Requirements
- None. No forms, no collections config yet.

## API / Interface Contract
- N/A for this feature.

## UI / UX Requirements
- Layout shell responsive: header collapses gracefully on mobile (simple stacked or trimmed links — the real mobile nav is roadmap item 2)
- Colors: `#111318` charcoal, `#2AD17E` accent, `#F7F7F5` off-white per tech-stack.md
- Dark, analytical look: charcoal background, off-white text, accent used sparingly
- Semantic landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`; skip-to-content link

## Security / Compliance Requirements
- `public/_headers`: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, long-cache for hashed assets
- No secrets in repo; no env vars needed yet (GHL/GTM come later)

## Performance Requirements
- Lighthouse mobile on the placeholder page: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90 (per tech-stack.md, validated per feature)
- Zero client-side JS shipped
- Fonts preloaded; no layout shift from font swap on the placeholder page

## Error Handling
- N/A beyond default Astro 404 page (custom 404 can come with design-system)

## Out of Scope
- Mobile nav interaction, typography scale, component library (roadmap item 2)
- Real copy, content collections schema (items 3–5)
- Analytics, forms, payments (phases 3–4)
