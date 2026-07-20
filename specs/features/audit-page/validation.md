# Validation — Audit Page

## Smoke
- [ ] Build clean; `/audit` renders all six sections
- [ ] Zero `<script>` in built page; FAQ opens/closes without JS

## Functional
- [ ] No English copy in `audit.astro` (grep check)
- [ ] CTA href reads env var; `#` fallback when unset
- [ ] 320px no overflow

## DRAFT COPY — needs Ali's word-level review (standing approval: shipped as draft)
- [ ] 5 deliverables vs offer doc
- [ ] **Ceiling Guarantee wording — roadmap says verbatim; current text is Claude's draft**
- [ ] FAQ answers (incl. "$3K–$50K/month sweet spot" claim from ICP)
- [ ] Replace `PUBLIC_STRIPE_AUDIT_URL` placeholder with real Stripe payment link

## Merge Readiness
- [ ] Regression sweep at end of Phase 2 (Lighthouse all pages, viewport, zero-JS)
