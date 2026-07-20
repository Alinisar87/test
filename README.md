# sevenfigureslab.com

Marketing site + lead-capture funnel for Seven Figures Lab. One job: convert warm traffic into paid Profit Curve Audit bookings.

Built spec-first — see `specs/` for the constitution (mission, tech stack, roadmap) and per-feature specs.

## Stack

Astro 5 (static, zero client JS) · Tailwind CSS 4 · self-hosted fonts (Inter + JetBrains Mono via fontsource) · Cloudflare Pages.

## Local development

```bash
nvm use          # Node 22 (see .nvmrc)
npm install
npm run dev      # http://localhost:4321
```

## Build & preview

```bash
npm run build    # static output → dist/
npm run preview
```

## Deploy — Cloudflare Pages (Git integration)

One-time setup in the Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git:

| Setting | Value |
|---|---|
| Repository | `Alinisar87/test` |
| Production branch | (default branch) |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION` = `22` |

Every push then deploys automatically; non-production branches get preview URLs.

## Conventions

- All page copy lives in `src/content/` as markdown/MDX — copy edits must never require touching components.
- Brand tokens (colors, fonts) are defined once in `src/styles/global.css` — use Tailwind class names (`bg-charcoal`, `text-accent`, `bg-offwhite`), never raw hex in components.
- Performance budget per feature: Lighthouse mobile ≥ 95 performance, ≥ 95 SEO, ≥ 90 accessibility.
