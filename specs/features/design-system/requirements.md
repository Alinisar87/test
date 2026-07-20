# Requirements — Design System

Functional and technical requirements for this feature. Be specific enough to validate against, but don't micromanage — leave room for Claude to make good local decisions.

---

## Functional Requirements

### Must
- Typography scale applied globally: h1–h4, lead paragraph, small/caption, kicker (mono uppercase tracking), consistent vertical rhythm
- `Button` component: `variant="primary" | "secondary"`, `size="md" | "lg"`, renders `<a href>` when given a link, `<button>` otherwise
- `Section` / `SectionHeader`: consistent max-width, horizontal padding, vertical spacing; SectionHeader takes optional kicker, title, lead
- `StatTile`: mono value + muted label, matches placeholder look
- `Curve` component with `chart` and `divider` variants; chart labels configurable via props (no hardcoded copy in the component)
- Mobile nav: below `md`, nav links collapse behind an accessible hamburger toggle; audit CTA remains visible; works with **zero client-side JavaScript**
- `index.astro` refactored to consume the system with no intended visual change on desktop

### Should
- Components documented with a one-line usage comment at the top of each file
- Focus states visible on all interactive elements (existing accent outline)

### Nice to have
- `Curve` divider used once on the placeholder page to prove it renders

## Technical Requirements
- Zero client-side JS (CSS-only nav — `:checked` or `<details>` pattern)
- All colors/fonts via existing tokens; no new hex values, no arbitrary Tailwind color values
- Components live in `src/components/ui/`; page-level components stay in `src/components/`
- No new dependencies

## Data Requirements
- None.

## API / Interface Contract
```astro
<Button href="/audit" variant="primary" size="lg">Get the $299 Audit</Button>
<Section variant="offwhite"> ... </Section>
<SectionHeader kicker="..." title="..." lead="..." />
<StatTile value="$299" label="flat-fee audit" />
<Curve variant="chart" ceilingLabel="your ceiling" subLabel="marginal ROAS crosses 1.0" xLabel="monthly ad spend →" yLabel="← profit" />
<Curve variant="divider" />
```

## UI / UX Requirements
- Mobile nav toggle: min 44×44px tap target, `aria-label`, visible focus ring; menu closes via the same toggle
- Nav panel: charcoal background, full-width links, comfortable tap spacing
- `offwhite` Section variant flips text to charcoal and keeps accent working (check contrast: accent-on-offwhite for text fails contrast — accent reserved for graphics/buttons with charcoal text)

## Security / Compliance Requirements
- N/A

## Performance Requirements
- Lighthouse mobile stays: Performance ≥ 95 (currently 100), SEO ≥ 95, Accessibility ≥ 90; CLS stays 0
- No added font weights/families

## Error Handling
- Components should render sensibly with optional props omitted (e.g. SectionHeader with title only)

## Out of Scope
- New pages, page copy, content collections, JS islands, 404 page
