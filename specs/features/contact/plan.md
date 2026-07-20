# Plan — Contact (/contact)

**Branch:** session branch (serves as `feature/contact`) · **Roadmap:** Phase 3, item 9
**Status:** [x] planned  [ ] implemented  [ ] validated

## Problem Statement
Low-friction contact: native form → GHL, WhatsApp link, no phone-number-required friction.

## Approach
Native `<form method="POST">` to `PUBLIC_GHL_FORM_ENDPOINT` (no JS). Hidden `source_page` field for GHL tagging; UTM enrichment arrives with GTM (item 10). Endpoint unset → form hidden, graceful email/WhatsApp panel instead. WhatsApp link from `PUBLIC_WHATSAPP_URL` env (added to .env.example).

## Files
- `src/content/pages/contact.md`, `src/pages/contact.astro` — new; `.env.example` — add WhatsApp var

## Out of Scope
- Client-side validation beyond native `required`; spam protection (add GHL-side or Turnstile later if abused)
