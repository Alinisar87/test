# Plan — Scaffold

**Branch:** `claude/sfl-website-specs-phase-2-81fmd9` (session-designated branch; serves as the `feature/scaffold` branch)
**Roadmap phase:** Phase 1, item 1
**Status:** [x] planned  [ ] implemented  [ ] validated  [ ] merged

---

## Problem Statement
Nothing exists yet — no project, no deploy target. This feature creates the Astro + Tailwind foundation every later roadmap item builds on: the layout shell (header/footer/nav), brand tokens, self-hosted fonts, and a working Cloudflare Pages deploy pipeline from day one (per the roadmap: "deploy from day one, not at the end").

## Approach
Initialize an Astro project with Tailwind at the repo root, alongside the existing `specs/`. Encode the brand constants from `tech-stack.md` as Tailwind theme tokens so every later feature consumes them by name, never by hex. Build a minimal `BaseLayout` with SEO-ready `<head>`, a simple header/nav/footer shell, and a placeholder home page that proves fonts, tokens, and layout render. Ship a build that Cloudflare Pages can deploy via its Git integration; document the one-time dashboard connection step for Ali.

## Task Groups

### Task Group 1 — Project init
- Astro (latest v5 unless Ali objects — see open questions) + Tailwind + TypeScript strict
- `.gitignore`, `README.md` (run/build/deploy instructions), `.nvmrc`
- `src/content/` directory established (copy-in-markdown constraint from tech-stack.md)

### Task Group 2 — Brand tokens + fonts
- Tailwind theme: `charcoal #111318`, `accent #2AD17E`, `offwhite #F7F7F5` as named tokens
- Fontsource self-hosted fonts, max 2 families, subset + `font-display: swap`, preloaded
- Global base styles: background, text color, selection color, focus rings

### Task Group 3 — Layout shell
- `BaseLayout.astro`: HTML skeleton, meta/title/description props, canonical URL, favicon placeholder
- `Header.astro` with desktop nav (Home, Audit, Pricing, Case Study, About, Contact — dead links to future routes are fine)
- `Footer.astro`: positioning one-liner, minimal links, © line
- Placeholder `index.astro` using the layout (real home page is roadmap item 4)

### Task Group 4 — Deploy pipeline
- Verify `astro build` output works for Cloudflare Pages (static output, `dist/`)
- `public/_headers` with sensible caching/security headers
- README section: exact Cloudflare Pages Git-integration settings (build command, output dir, Node version) — the dashboard connection itself is a one-time manual step for Ali

## Files Likely to Change
- `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind` config (v4 style: in CSS) — new
- `src/layouts/BaseLayout.astro` — new
- `src/components/Header.astro`, `src/components/Footer.astro` — new
- `src/pages/index.astro` — new
- `src/styles/global.css` — new (tokens + fonts)
- `public/_headers`, `public/favicon.svg` — new
- `README.md`, `.gitignore`, `.nvmrc` — new

## Out of Scope for This Feature
- Typography scale, buttons, section components, curve motif SVG, **mobile nav** — all roadmap item 2 (design-system)
- Any real page copy or content collections config — items 3–5
- GTM/analytics, forms, Stripe — later phases
- Actually connecting the Cloudflare Pages dashboard to the repo (manual, Ali's account)

## Dependencies
- **Blocks:** every other roadmap item
- **Blocked by:** nothing (Cloudflare/domain setup can happen in parallel)

## Open Questions to Resolve Before Implementation
- [x] Astro version → **Astro 5** (Ali approved 2026-07-20; tech-stack.md updated)
- [x] Fonts → **Inter + JetBrains Mono** (Ali approved 2026-07-20; tech-stack.md updated)
- [x] Repo → **stay in `Alinisar87/test` for now**, migrate later if needed (Ali approved 2026-07-20; tech-stack.md updated)
