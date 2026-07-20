# Validation — Contact

## Smoke
- [x] Build clean; 320px OK; zero executable `<script>`
- [x] Env unset: graceful panel, no dead form

## Functional
- [x] All inputs labeled; keyboard navigable; select has ICP bands; no phone field

## Pending Ali
- [ ] Set `PUBLIC_GHL_FORM_ENDPOINT` + `PUBLIC_WHATSAPP_URL` in Cloudflare env; then live-test a submission lands in GHL tagged `source_page=contact`
- [ ] GHL form redirect → /thanks or a simple confirmation (decide in GHL)

## Merge Readiness
- [x] Sweep 2026-07-20 passed
