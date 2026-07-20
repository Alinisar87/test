# Plan — Design System

**Branch:** `claude/sfl-website-specs-phase-2-81fmd9` (session-designated branch; serves as the `feature/design-system` branch)
**Roadmap phase:** Phase 1, item 2
**Status:** [x] planned  [ ] implemented  [ ] validated  [ ] merged

---

## Problem Statement
The scaffold proved the stack; now every money page (audit, home, thank-you) needs the same building blocks. This feature turns the one-off placeholder styling into a small reusable system: typography scale, buttons, section components, the reusable curve motif, and a working mobile nav — so pages 3–9 are assembly, not invention.

## Approach
Small component library in `src/components/ui/`, all zero-JS Astro components styled with the existing brand tokens. Typography becomes global element styles + a few utility classes rather than per-page ad-hoc classes. The inline hero SVG from the placeholder graduates into a parameterized `Curve` component (chart variant + thin divider variant). Mobile nav is CSS-only (checkbox/`:checked` pattern or `<details>`) to preserve the zero-client-JS constraint. The placeholder home page is refactored to consume the new components — that refactor is the proof the system works.

## Task Groups

### Task Group 1 — Typography scale
- Global heading/body scale in `global.css` (h1–h4, lead, small, kicker/eyebrow style used in hero)
- `Prose` defaults for future markdown content (blog, case study)
- Mono "data" text style for numbers/labels

### Task Group 2 — Core components
- `Button.astro` — primary (accent), secondary (outline), sizes, renders as `<a>` or `<button>`
- `Section.astro` + `SectionHeader.astro` — container width, vertical rhythm, optional kicker/title/lead, dark (default) and offwhite variants
- `StatTile.astro` — the value+label tile from the placeholder, reusable

### Task Group 3 — Curve motif component
- `Curve.astro` with variants: `chart` (the labeled hero illustration, label text as props) and `divider` (thin decorative stroke for section breaks)
- Placeholder favicon already uses the motif — keep in sync

### Task Group 4 — Mobile nav + refactor proof
- CSS-only hamburger nav below `md:` breakpoint (accessible: real checkbox/label or `<details>`, focus styles, `aria` labels; nav links + audit CTA)
- Refactor `index.astro` and `Header.astro` to use Button, Section, StatTile, Curve — zero visual regression intended on desktop

## Files Likely to Change
- `src/styles/global.css` — modify (typography layer)
- `src/components/ui/Button.astro`, `Section.astro`, `SectionHeader.astro`, `StatTile.astro`, `Curve.astro` — new
- `src/components/Header.astro` — modify (mobile nav)
- `src/pages/index.astro` — modify (consume components)

## Out of Scope for This Feature
- Any new pages or real copy (items 3–9)
- Content collections schema (comes with the first content-bearing page)
- Animations beyond the existing curve draw-in; no JS islands
- Custom 404 page (small; can ride along with audit-page feature)

## Dependencies
- **Blocks:** items 3–9 (all pages consume these components)
- **Blocked by:** scaffold (done)

## Open Questions to Resolve Before Implementation
- [x] Mobile nav → **CSS-only slide-down panel** under the header (Ali approved 2026-07-20)
- [x] Section backgrounds → **dark default + `offwhite` variant** (Ali approved 2026-07-20)
