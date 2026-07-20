# Requirements — Contact

## Must
- Fields: name, email, store URL (optional), monthly ad spend (select bands from ICP: <$3K / $3–10K / $10–50K / $50K+), message. **No phone field** (mission: no phone-number friction)
- POST to `PUBLIC_GHL_FORM_ENDPOINT`; hidden `source_page=contact`; native `required` on name/email/message
- Endpoint unset → no broken form: styled panel with email + WhatsApp alternatives
- WhatsApp CTA from `PUBLIC_WHATSAPP_URL` (hidden when unset)
- Labels properly associated (a11y); form styling works on charcoal bg
- Copy in `contact.md`; zero JS

## Out of Scope
- UTM capture (item 10), success page routing (GHL redirect config)
