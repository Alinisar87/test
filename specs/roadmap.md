# Roadmap — sevenfigureslab.com

Each item = one feature branch with plan/requirements/validation per SDD. MVP cut line marked.

> **Process note (2026-07-20):** Ali granted standing approval — features proceed through plan→implement→validate without per-feature sign-off gates. Draft copy (guarantee wording, tier pricing, case-study numbers) is flagged in each feature's validation.md for Ali's later word-level review.

## Phase 1 — Foundation
1. ~~**scaffold**~~ ✅ — Astro + Tailwind project, layout shell (header/footer/nav), brand tokens, fonts, deploy pipeline to Cloudflare Pages (deploy from day one, not at the end) — *done 2026-07-20; Cloudflare dashboard connection pending (manual)*
2. ~~**design-system**~~ ✅ — typography scale, buttons, section components, the curve motif SVG, mobile nav — *done 2026-07-20*

## Phase 2 — Money pages
3. ~~**audit-page**~~ ✅ (/audit — build FIRST, it's the funnel) — *done 2026-07-20; DRAFT copy + Stripe link pending Ali*
   - Hero: "Find the exact point your ad spend stops making money"
   - What's in the audit (5 deliverables from offer doc)
   - The Ceiling Guarantee, verbatim
   - How it works: Pay → connect accounts → 5 days → walkthrough call
   - Stripe payment link CTA + FAQ (objections: "why paid?", "what access do you need?", "what if my account is small?")
4. ~~**home**~~ ✅ (/) — *done 2026-07-20; draft copy*
   - Hero: problem-first ("ROAS dies every time you scale? There's a curve that explains it") + single CTA → /audit
   - The curve explained in 3 steps (visual)
   - Why us: 3 differentiators (methodology / credentials / economics)
   - Case study teaser, pricing teaser, final CTA
5. ~~**thank-you**~~ ✅ (/thanks) — GHL calendar embed, "what happens next" timeline, sets `purchase` conversion event — *done 2026-07-20; GHL calendar URL pending*

### ——— MVP CUT LINE: site can launch and take money here ———

## Phase 3 — Trust pages
6. ~~**pricing**~~ ✅ (/pricing) — 3 retainer tiers table from offer doc, "every engagement starts with the audit" framing, FAQ — *done 2026-07-20; DRAFT TIER PRICES — replace before real traffic*
7. ~~**case-study**~~ ✅ (/case-studies/shopify-roas-ceiling) — the Shopify ads analysis rewritten as narrative: situation → curve found → fixes → numbers. Template reusable for future studies. — *template done 2026-07-20; placeholder numbers, noindex until real analysis*
8. ~~**about**~~ ✅ (/about) — founder story, credentials (FCCA/CIA/CFE/CAA), team model, why "Seven Figures Lab" — *done 2026-07-20; draft copy*
9. ~~**contact**~~ ✅ (/contact) — form → GHL, WhatsApp link, no phone-number-required friction — *done 2026-07-20; GHL endpoint + WhatsApp URL pending*

## Phase 4 — Growth infrastructure
10. ~~**tracking**~~ ✅ — GTM container, GA4 + Meta Pixel, conversion events wired and test-verified — *code rails done 2026-07-20; GTM/GA4/Pixel accounts + container config pending*
11. ~~**seo**~~ ✅ — meta/OG per page, sitemap.xml, schema.org (Organization, Service, FAQPage), OG image with the curve — *done 2026-07-20; Search Console pending domain*
12. ~~**blog-scaffold**~~ ✅ — content collection + listing + post template, zero posts required — *done 2026-07-20*
13. **lead-magnet** (post-launch) — free "Ceiling Calculator" (island component: input spend tiers + revenue → rough marginal ROAS) as email-capture alternative to the paid audit

14. ~~**kb-redesign**~~ ✅ — bright rebrand (KlientBoost-inspired), published packages from ~$199/mo (SoftCrust-style), services grid — *done 2026-07-20; prices/copy draft*
15. ~~**service-pages**~~ ✅ — one page per service line + /services index + custom 404 — *done 2026-07-20; copy draft*

## Later / parked
- **client-app** — client-facing app (reporting/plan experience, KlientBoost-style offering); Ali to develop for his customers
- /leads GCC services funnel (locked per ICP expansion condition)
- Urdu/Roman Urdu content hub
- Client results dashboard (needs 3+ case studies)

## Order rationale
Audit page before home: if only one page exists, warm intros can still convert. Tracking before SEO: no point ranking pages you can't measure. Blog last: content marketing without conversion infrastructure is vanity.
