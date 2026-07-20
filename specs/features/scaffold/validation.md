# Validation — Scaffold

How we know the feature actually works. Check each item off before merging.

---

## Smoke Tests
- [ ] `npm install` from clean checkout succeeds
- [ ] `npm run dev` starts with no errors; placeholder page renders header/nav/footer
- [ ] `npm run build` completes with zero errors/warnings; `dist/` contains the static site
- [ ] `npm run preview` serves the built site correctly

## Functional Tests
- [ ] All 6 nav links present with correct hrefs
- [ ] `bg-charcoal` / `text-accent` / `bg-offwhite` classes resolve to the exact hex values from tech-stack.md
- [ ] Fonts load from same-origin (`/_astro/` or `/fonts/`), woff2, `font-display: swap`
- [ ] View-source: zero `<script>` tags shipped to the client

## Edge Cases
- [ ] Page at 320px viewport width: no horizontal scroll, nav usable
- [ ] Slow-network font fallback: text visible before fonts load (no FOIT)
- [ ] Direct request to an unbuilt route (e.g. `/audit`) returns Astro's 404, not a server error

## Integration Points
- [ ] Cloudflare Pages: build settings documented in README match what actually works (build command, output dir `dist`, Node version)
- [ ] After Ali connects the repo in the Cloudflare dashboard: deploy succeeds and the preview URL renders identically to local preview

## Regression Check
- [ ] `specs/` untouched by the build (no generated files leaking into specs)

## Security / Compliance Check
- [ ] `_headers` file present in `dist/` after build
- [ ] `git grep` finds no tokens/keys/secrets

## Deep Review
- Not required — no client data, payments, or tax logic in this feature.
- [ ] Ali manually reviewed diff
- [ ] Spec and code are in sync

## Documentation Check
- [ ] README covers dev/build/deploy
- [ ] tech-stack.md updated if Astro version or repo-name decisions change (per plan.md open questions)
- [ ] Roadmap item 1 checked off (at merge time)

## Merge Readiness
- [ ] Lighthouse mobile ≥ 95 perf / ≥ 95 SEO / ≥ 90 a11y on the deployed placeholder
- [ ] All must-haves validated
- [ ] No open questions left from plan.md
- [ ] Ali signs off
