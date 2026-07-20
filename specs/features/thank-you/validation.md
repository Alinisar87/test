# Validation — Thank You

## Smoke
- [ ] Build clean; `/thanks` renders confirmation, timeline, calendar section placeholder (env unset)
- [ ] `noindex` meta present on /thanks only; 320px no overflow

## Functional
- [ ] With env unset: no iframe, graceful placeholder, zero `<script>`
- [ ] dataLayer snippet absent when `PUBLIC_GTM_ID` unset (build-time conditional)

## Pending external setup (Ali)
- [ ] Set `PUBLIC_GHL_CALENDAR_URL` (GHL calendar embed link) in Cloudflare env
- [ ] Stripe payment link success URL → https://sevenfigureslab.com/thanks
- [ ] Purchase event verified live once GTM (item 10) has a real container ID

## Merge Readiness
- [ ] End-of-phase regression sweep
