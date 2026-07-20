# Validation — Scaffold

How we know the feature actually works. Check each item off before merging.

---

## Smoke Tests
- [x] `npm install` from clean checkout succeeds
- [x] `npm run dev` starts with no errors; placeholder page renders header/nav/footer (200 on `/`)
- [x] `npm run build` completes with zero errors/warnings; `dist/` contains the static site
- [x] `npm run preview` serves the built site correctly

## Functional Tests
- [x] All 6 nav links present with correct hrefs
- [x] `bg-charcoal` / `text-accent` / `bg-offwhite` resolve to `#111318` / `#2ad17e` / `#f7f7f5` in built CSS
- [x] Fonts load from same-origin `/_astro/`, woff2, `font-display: swap`
- [x] View-source: zero `<script>` tags shipped to the client

## Edge Cases
- [x] Page at 320px viewport width: 0px horizontal overflow (headless Chromium check), nav usable
- [x] Slow-network font fallback: `font-display: swap` confirmed in built CSS → no FOIT
- [x] Direct request to an unbuilt route (`/audit`) returns 404, not a server error

## Integration Points
- [x] Cloudflare Pages: build settings documented in README match what actually works (`npm run build`, output `dist`, Node 22)
- [ ] After Ali connects the repo in the Cloudflare dashboard: deploy succeeds and the preview URL renders identically to local preview — **pending (manual, Ali's Cloudflare account)**

## Regression Check
- [x] `specs/` untouched by the build (no generated files leaking into specs)

## Security / Compliance Check
- [x] `_headers` file present in `dist/` after build
- [x] `git grep` finds no tokens/keys/secrets

## Deep Review
- Not required — no client data, payments, or tax logic in this feature.
- [ ] Ali manually reviewed diff — **pending**
- [x] Spec and code are in sync

## Documentation Check
- [x] README covers dev/build/deploy
- [x] tech-stack.md updated (Astro 5, fonts, repo name)
- [x] Roadmap item 1 checked off

## Merge Readiness
- [ ] Lighthouse mobile ≥ 95 perf / ≥ 95 SEO / ≥ 90 a11y on the deployed placeholder — **pending Cloudflare connection** (zero-JS static page with self-hosted subsetted fonts; expected to pass comfortably)
- [x] All other must-haves validated
- [x] No open questions left from plan.md
- [ ] Ali signs off — **pending**

---

*Validation run 2026-07-20 (local: build, preview, headless Chromium at 320px/1280px, external-request audit — zero third-party requests).*
