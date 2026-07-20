# Roadmap — sevenfigureslab.com

Each item = one feature branch with plan/requirements/validation per SDD. MVP cut line marked.

## Phase 1 — Foundation
1. ~~**scaffold**~~ ✅ — Astro + Tailwind project, layout shell (header/footer/nav), brand tokens, fonts, deploy pipeline to Cloudflare Pages (deploy from day one, not at the end) — *done 2026-07-20; Cloudflare dashboard connection pending (manual)*
2. **design-system** — typography scale, buttons, section components, the curve motif SVG, mobile nav

## Phase 2 — Money pages
3. **audit-page** (/audit — build FIRST, it's the funnel)
   - Hero: "Find the exact point your ad spend stops making money"
   - What's in the audit (5 deliverables from offer doc)
   - The Ceiling Guarantee, verbatim
   - How it works: Pay → connect accounts → 5 days → walkthrough call
   - Stripe payment link CTA + FAQ (objections: "why paid?", "what access do you need?", "what if my account is small?")
4. **home** (/)
   - Hero: problem-first ("ROAS dies every time you scale? There's a curve that explains it") + single CTA → /audit
   - The curve explained in 3 steps (visual)
   - Why us: 3 differentiators (methodology / credentials / economics)
   - Case study teaser, pricing teaser, final CTA
5. **thank-you** (/thanks) — GHL calendar embed, "what happens next" timeline, sets `purchase` conversion event

### ——— MVP CUT LINE: site can launch and take money here ———

## Phase 3 — Trust pages
6. **pricing** (/pricing) — 3 retainer tiers table from offer doc, "every engagement starts with the audit" framing, FAQ
7. **case-study** (/case-studies/shopify-roas-ceiling) — the Shopify ads analysis rewritten as narrative: situation → curve found → fixes → numbers. Template reusable for future studies.
8. **about** (/about) — founder story, credentials (FCCA/CIA/CFE/CAA), team model, why "Seven Figures Lab"
9. **contact** (/contact) — form → GHL, WhatsApp link, no phone-number-required friction

## Phase 4 — Growth infrastructure
10. **tracking** — GTM container, GA4 + Meta Pixel, conversion events wired and test-verified
11. **seo** — meta/OG per page, sitemap.xml, schema.org (Organization, Service, FAQPage), OG image with the curve
12. **blog-scaffold** — content collection + listing + post template, zero posts required
13. **lead-magnet** (post-launch) — free "Ceiling Calculator" (island component: input spend tiers + revenue → rough marginal ROAS) as email-capture alternative to the paid audit

## Later / parked
- /leads GCC services funnel (locked per ICP expansion condition)
- Urdu/Roman Urdu content hub
- Client results dashboard (needs 3+ case studies)

## Order rationale
Audit page before home: if only one page exists, warm intros can still convert. Tracking before SEO: no point ranking pages you can't measure. Blog last: content marketing without conversion infrastructure is vanity.
