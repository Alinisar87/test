# Tech Stack — sevenfigureslab.com

## Decisions

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5** | Content-heavy marketing site → zero-JS by default, easiest path to 95+ PageSpeed. Islands available if needed. (Next.js rejected: SSR complexity buys nothing here.) |
| Styling | Tailwind CSS | Speed of iteration; Claude Code works well with it |
| Hosting | **Cloudflare Pages** | Free, global edge, fast for PK/GCC + US visitors alike |
| Forms | Native form → **any POST endpoint** (**Formspree** live; `PUBLIC_FORM_ENDPOINT` env overrides; public URLs live in `src/config.ts`) | Ali opted out of GHL (2026-07-20); provider-agnostic keeps the switch a one-var change |
| Checkout ($299 audit) | Stripe Payment Link (v1) | Zero build cost; upgrade to embedded checkout only if conversion data justifies it |
| Booking | **Cal.com free** embed on thank-you page (**Cal.com live**; `PUBLIC_BOOKING_URL` env overrides; public URLs live in `src/config.ts`) | Ali opted out of GHL (2026-07-20); Cal.com free = unlimited bookings, availability set in-app, no Google Calendar required |
| Analytics | GA4 + Meta Pixel via **GTM** | One container; agency must practice what it preaches on clean tagging |
| Fonts | Self-hosted (fontsource): **Inter** (UI/body, tabular numerals) + **JetBrains Mono** (numbers/data accents) | No render-blocking Google Fonts requests |
| Images | Astro `<Image>`, AVIF/WebP | LCP discipline |
| Sitemap | `@astrojs/sitemap` (draft/noindex pages excluded via config scan) | Added in SEO feature |
| Repo | Git, GitHub `Alinisar87/test` for now (may migrate to `sevenfigureslab-site` later) | CI deploy via Cloudflare Pages Git integration |

## Constraints
- Lighthouse mobile: Performance ≥ 95, SEO ≥ 95, Accessibility ≥ 90 — validated per feature, not at the end
- No client-side JS except: GTM, GHL embeds, and one island for the curve animation (if used)
- All copy lives in `src/content/` as markdown/MDX — copy edits must never require touching components
- Env vars for GHL endpoint + GTM ID; nothing hardcoded

## Brand constants (v3 — blue palette pass 2026-07-20 night, per Ali "replicate including color"; v2 green retired)
- Light-first: background off-white `#F7F7F5`, ink charcoal `#111318`
- Primary accent: royal blue `#2A6BF5` (graphics) · deep blue `#1D4ED8` (buttons w/ white text, accent text on light) · light blue `#8AB0FF` (accent text on dark)
- Support brights (cards, blobs, highlights): amber `#FFC24B` (headline marker), coral `#FF6B57`, sky `#38BDF8`, violet `#7C5CFF`, green `#2AD17E` (support only)
- Dark charcoal retained as a contrast VARIANT (footer, highlighted pricing tier, optional dark sections)
- Headline device: amber marker-highlight on key phrases (`.hl`)
- Tone: energetic + conversion-focused, still numbers-over-adjectives. Inspired by KlientBoost's energy; zero copied assets/copy.
- Visual motif: **the curve** — unchanged

## Integrations checklist
- [ ] GHL: new sub-account or pipeline "SFL — Audit Funnel" (stages: Audit Purchased → Data Received → Audit Delivered → Walkthrough Booked → Proposal → Won/Lost)
- [ ] Stripe: $299 payment link, webhook → GHL stage move
- [ ] GTM container with GA4 + Meta Pixel + conversion events (`audit_checkout_click`, `purchase`, `call_booked`)
- [ ] Cloudflare: domain sevenfigureslab.com (registered at Namecheap → nameservers to Cloudflare)
