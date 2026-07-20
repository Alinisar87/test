# Validation — Contact

## Smoke
- [x] Build clean; 320px OK; zero executable `<script>`
- [x] Env unset: graceful panel, no dead form

## Functional
- [x] All inputs labeled; keyboard navigable; select has ICP bands; no phone field

## Pending Ali
- [x] Form wired: Formspree endpoint via src/config.ts, env-overridable (2026-07-20)
- [ ] Live-test: submit the form once on the deployed site and confirm it arrives in the Formspree inbox/email
- [ ] `PUBLIC_WHATSAPP_URL` still unset (WhatsApp button hidden until provided)
- [ ] Optional: Formspree redirect/thank-you setting (defaults to Formspree's own confirmation page)

## Merge Readiness
- [x] Sweep 2026-07-20 passed
