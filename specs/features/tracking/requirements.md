# Requirements — Tracking

## Must (code)
- GTM head snippet + `<noscript>` iframe in BaseLayout iff `PUBLIC_GTM_ID` set; no other vendor scripts (GA4/Pixel load via GTM)
- Unset → built HTML identical to pre-feature (zero scripts)

## Must (GTM container config — documented, done in GTM UI when account exists)
- GA4 config tag, Meta Pixel tag
- `audit_checkout_click`: link-click trigger where click URL contains the Stripe payment-link host
- `purchase`: custom-event trigger on dataLayer event `purchase` (already pushed by /thanks) → GA4 purchase + Pixel Purchase ($299)
- `call_booked`: configured GHL-side (calendar webhook → GA4 measurement protocol or GHL native GA4 integration)

## Validation constraint
- With a test GTM ID set locally: build must inject exactly the two snippets; Lighthouse impact accepted only ≥95 perf (GTM is the allowed JS exception in tech-stack.md)
