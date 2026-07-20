# Validation — Tracking

## Smoke
- [ ] Env unset: zero `<script>` in all built pages (unchanged)
- [ ] Test ID set: GTM snippet + noscript present on every page; purchase push present on /thanks only

## Pending Ali (accounts required)
- [ ] Create GTM container + GA4 + Meta Pixel; set `PUBLIC_GTM_ID` in Cloudflare
- [ ] Configure the three triggers/tags per requirements.md
- [ ] Live-verify events in GA4 DebugView + Meta Test Events; re-run Lighthouse ≥ 95
