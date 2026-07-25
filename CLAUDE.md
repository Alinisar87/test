# Claude Personalization — Seven Figures Lab

## About This Project

**Project:** sevenfigureslab.com — Marketing site + lead-capture funnel for Seven Figures Lab
**Mission:** Convert warm traffic into paid Profit Curve Audit bookings
**Approach:** Spec-driven development (see `specs/` directory)

---

## Technical Stack & Conventions

### Framework & Tools
- **Framework:** Astro 5 (static, zero client JS)
- **Styling:** Tailwind CSS 4
- **Fonts:** Self-hosted (Inter + JetBrains Mono via fontsource)
- **Deployment:** Cloudflare Pages (Git integration, auto-deploy)
- **Node Version:** 22 (see .nvmrc)

### Code Conventions
- **Copy Management:** All page copy lives in `src/content/` as markdown/MDX — copy edits must NOT touch components
- **Brand Tokens:** Colors & fonts defined ONCE in `src/styles/global.css`
  - Use Tailwind class names: `bg-charcoal`, `text-accent`, `bg-offwhite`
  - NEVER use raw hex codes in components
- **Performance Budgets:**
  - Lighthouse mobile: ≥95 performance, ≥95 SEO, ≥90 accessibility
- **File Organization:**
  - `src/content/` — all pages, services, case studies (markdown)
  - `src/components/` — reusable Astro components
  - `specs/` — feature requirements, plans, validation results
  - `public/` — static assets

### Development Commands
```bash
nvm use              # Activate Node 22
npm install          # Dependencies
npm run dev          # Local dev (http://localhost:4321)
npm run build        # Production build → dist/
npm run preview      # Preview build locally
```

---

## Communication & Collaboration Style

### When Working With Me (Claude)
- **Language:** Roman Urdu preferred (Hinglish ok)
- **Response Style:** Concise, direct, action-oriented
- **Tone:** Professional but conversational
- **Format:** Prefer code examples + brief explanations

### Git Commits
- Use `feat(scope): description` format
- Example: `feat(kb-color-pass): royal-blue palette site-wide`
- Be descriptive but brief

### Documentation
- Keep specs concise — link to actual implementation, don't repeat
- Specs include: requirements.md, plan.md, validation.md per feature

---

## Development Workflow

1. **Spec First:** Write requirements before building
2. **Validate:** Check against existing specs in `specs/`
3. **Build:** Implement in components or content
4. **Test:** Run Lighthouse, check SEO, test forms
5. **Commit & Push:** Clear commit messages to branch
6. **Specs:** Update validation results in `specs/features/`

---

## Current State (Last Update: July 25, 2026)

### Completed Features
✅ Full design system (royal-blue rebrand, high-contrast variants)
✅ Home page (hero, 3-step process, differentiators)
✅ Audit funnel page
✅ 5 service pages (SEO, Google Ads, Paid Social, CRO, Email Retention)
✅ Services index + custom 404
✅ Pricing page (3 tiers, audit-first framing, $199/mo+)
✅ About page (credentials, team model)
✅ Contact page (forms + WhatsApp link)
✅ Case study template (Shopify example)
✅ Blog scaffold (collection + listing)
✅ Thank you page (booking section, next-steps timeline)
✅ Booking integration (Cal.com live)
✅ Form integration (Formspree + GHL fallback)
✅ SEO setup (OG meta, JSON-LD, sitemap, noindex for drafts)
✅ Tracking (guarded GTM via PUBLIC_GTM_ID)
✅ Design polish (sticky header, glow system, card depth, atmosphere)

### Brand Identity
- **Primary Color:** Royal Blue
- **Secondary:** Charcoal (deep text)
- **Accent:** Gold/Orange for CTAs
- **Background:** Offwhite (light theme)
- **Typography:** Inter (body), JetBrains Mono (code)

---

## Key Preferences

### What I Value
- **Performance:** Every change must maintain 95+ Lighthouse scores
- **Copy Quality:** Tone is professional + conversational (not robotic)
- **No Unused Code:** Delete before refactoring
- **Spec Compliance:** Changes must validate against existing specs
- **Git Discipline:** Clean history, clear commit messages

### What I Don't Want
- ❌ Over-engineering or premature abstraction
- ❌ Comments that repeat what the code does
- ❌ Breaking existing validated features
- ❌ Dependencies added without justification

---

## Personal Preferences for Claude

- **Language:** Roman Urdu میں بات کریں (Urdu in Roman script)
- **Terseness:** Short summaries, action over explanation
- **Autonomy:** Push to branch without asking (within scope)
- **Feedback:** Tell me what changed and why, not detailed play-by-play
- **Errors:** If something fails, diagnose + fix + explain

---

## Branch & Deployment

**Development Branch:** `claude/development-history-summary-c16zmn`
- All Claude-driven work goes here
- Auto-deploys to Cloudflare Pages preview URL
- Merge to main when validated

**Deployment:** Automatic on push to main branch

---

## Contact & Owner

**Name:** Ali Nisar
**Email:** ali.nisar88@gmail.com
**GitHub:** @alinisar87
**Timezone:** Check if mentioned in conversation
