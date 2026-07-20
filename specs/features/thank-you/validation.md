# Validation — Thank You

## Smoke
- [x] Build clean; `/thanks` renders confirmation, timeline, calendar section placeholder (env unset)
- [x] `noindex` meta present on /thanks only; 320px no overflow

## Functional
- [x] With env unset: no iframe, graceful placeholder, zero executable `<script>`
- [x] dataLayer snippet absent when `PUBLIC_GTM_ID` unset; present with test ID

## Pending external setup (Ali)
- [ ] Set `PUBLIC_BOOKING_URL` (Cal.com event link) in Cloudflare env
- [ ] Stripe payment link success URL → https://sevenfigureslab.com/thanks
- [ ] Purchase event verified live once GTM (item 10) has a real container ID

## Merge Readiness
- [x] Sweep 2026-07-20 passed
