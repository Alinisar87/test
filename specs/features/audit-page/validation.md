# Validation — Audit Page

## Smoke
- [x] Build clean; `/audit` renders all six sections
- [x] Zero executable `<script>` (JSON-LD data blocks only); FAQ opens/closes without JS

## Functional
- [x] No English copy in `audit.astro`
- [x] CTA href reads env var; `#` fallback when unset
- [x] 320px no overflow (headless sweep)

## DRAFT COPY — needs Ali's word-level review (standing approval: shipped as draft)
- [x] All visible audit pricing removed site-wide per Ali (2026-07-20 night); audit fee now "quoted up front"
- [ ] 5 deliverables vs offer doc
- [ ] **Ceiling Guarantee wording — roadmap says verbatim; current text is Claude's draft**
- [ ] FAQ answers (incl. "$3K–$50K/month sweet spot" claim from ICP)
- [ ] Replace `PUBLIC_STRIPE_AUDIT_URL` placeholder with real Stripe payment link

## Merge Readiness
- [x] Sweep 2026-07-20: Lighthouse 100/100/100, CLS 0, zero external requests
