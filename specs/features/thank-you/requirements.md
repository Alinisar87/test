# Requirements — Thank You

## Functional — Must
- `/thanks`: confirmation heading, "what happens next" 4-step timeline (book call → connect access → 5 days analysis → walkthrough), GHL calendar embed section
- Calendar iframe src = `PUBLIC_GHL_CALENDAR_URL`; unset → styled placeholder telling visitor a booking link is on its way by email (graceful, not broken)
- `purchase` event: `dataLayer.push({event:'purchase', value:299, currency:'USD'})` inline — rendered only when `PUBLIC_GTM_ID` set
- Page meta: `noindex` (thank-you pages must not rank/be crawled)
- All copy in `src/content/pages/thanks.md`

## Technical
- iframe is the allowed GHL-embed JS/embed exception; no other client JS
- BaseLayout `noindex?: boolean` prop → `<meta name="robots" content="noindex, nofollow">`

## Out of Scope
- Purchase-event end-to-end verification (needs live GTM — item 10)
