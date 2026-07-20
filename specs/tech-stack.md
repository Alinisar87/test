# Tech Stack — sevenfigureslab.com

## Decisions

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** | Content-heavy marketing site → zero-JS by default, easiest path to 95+ PageSpeed. Islands available if needed. (Next.js rejected: SSR complexity buys nothing here.) |
| Styling | Tailwind CSS | Speed of iteration; Claude Code works well with it |
| Hosting | **Cloudflare Pages** | Free, global edge, fast for PK/GCC + US visitors alike |
| Forms | Native form → **GHL inbound webhook/form endpoint** | Leads land directly in the Seven Figures Lab GHL pipeline, tagged by `utm_source` + page |
| Checkout ($299 audit) | Stripe Payment Link (v1) | Zero build cost; upgrade to embedded checkout only if conversion data justifies it |
| Booking | GHL calendar embed on thank-you page | Audit walkthrough call self-schedules |
| Analytics | GA4 + Meta Pixel via **GTM** | One container; agency must practice what it preaches on clean tagging |
| Fonts | Self-hosted (fontsource): **Inter** (UI/body, tabular numerals) + **JetBrains Mono** (numbers/data accents) | No render-blocking Google Fonts requests |
| Images | Astro `<Image>`, AVIF/WebP | LCP discipline |
| Repo | Git, GitHub `Alinisar87/test` for now (may migrate to `sevenfigureslab-site` later) | CI deploy via Cloudflare Pages Git integration |

## Constraints
- Lighthouse mobile: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90 — validated per feature, not at the end
- No client-side JS except: GTM, GHL embeds, and one island for the curve animation (if used)
- All copy lives in `src/content/` as markdown/MDX — copy edits must never require touching components
- Env vars for GHL endpoint + GTM ID; nothing hardcoded

## Brand constants (v1 — revisit after logo)
- Distinct from Markup Valley palette (separate brand): deep charcoal `#111318`, electric green accent `#2AD17E` (profit/growth signal), off-white `#F7F7F5`
- Tone: analytical, direct, zero guru-speak. Numbers over adjectives.
- Visual motif: **the curve** — a rising-then-flattening spend curve used in hero, section dividers, favicon

## Integrations checklist
- [ ] GHL: new sub-account or pipeline "SFL — Audit Funnel" (stages: Audit Purchased → Data Received → Audit Delivered → Walkthrough Booked → Proposal → Won/Lost)
- [ ] Stripe: $299 payment link, webhook → GHL stage move
- [ ] GTM container with GA4 + Meta Pixel + conversion events (`audit_checkout_click`, `purchase`, `call_booked`)
- [ ] Cloudflare: domain sevenfigureslab.com (registered at Namecheap → nameservers to Cloudflare)
