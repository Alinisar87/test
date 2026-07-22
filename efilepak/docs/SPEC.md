# eFile Pak — Product Spec & Constitution

## Mission

Make becoming and staying an FBR "filer" effortless for ordinary Pakistanis.
The taxpayer answers plain questions and uploads documents; eFile Pak computes
the return and a professional files it on IRIS.

## Context

- FBR has made **e-filing mandatory** for individuals and abolished manual
  returns (Dawn, 2025).
- A new **Simplified Electronic Return for Individuals** applies from TY2026,
  moving to granular, source-wise disclosures.
- Return deadline for TY2026: **30 September 2026**.

## Principles (the constitution)

1. **Estimate, then verify.** The app never presents a computed number as a
   filed return. A human reviews every filing. This is baked into the workflow
   (there is a mandatory `IN_REVIEW` stage) and surfaced in the UI disclaimer.
2. **Rates live in one place.** All statutory numbers are in
   `src/lib/tax/rates.ts` with sources and a "verify each year" banner. No magic
   numbers scattered in components.
3. **The tax engine is pure.** No IO, no framework. It runs identically on the
   server (persistence) and the client (live preview) and is unit-tested.
4. **Plain language over tax jargon.** Questions are phrased for someone who has
   never filed. Jargon appears only as hints.
5. **Least privilege on data.** Financial documents are served only to the
   owner or STAFF, behind an authorization check.

## Scope — v1 (this build)

- Taxpayer segments: **salaried**, **business/self-employed**, **AOP**.
- Tax Year **2026**.
- Outcome: a **prepared, review-ready return package** (income tax computation +
  wealth-statement reconciliation) that the Markup Valley team files on IRIS.

### Tax computation covered

- Progressive slab tax (salaried and non-salaried/AOP tables).
- Surcharge on income over Rs 10,000,000 (9% salaried / 10% others).
- Property income with the 1/5 repair allowance.
- Final/separate-regime income captured for the wealth statement (not taxed at
  slab rates).
- Deductible allowance: **Zakat**.
- Tax credits: **charitable donations (s.61)** and **approved pension fund
  (s.63)**, at the average rate with statutory caps.
- Reconciliation of tax already withheld / paid → payable or refund.
- **Wealth statement** reconciliation (s.116) with unexplained-increase flagging.

## v1.1 additions (aligned to FBR's July 2025 reforms)

The FBR rolled out a *simplified interactive return* — eight digital windows,
one question per screen, in Urdu and regional languages, with database-driven
auto-fill and fast refunds for salaried filers. This update responds:

- **Bilingual English + Urdu with RTL.** All taxpayer-facing surfaces translate;
  the dictionary (`src/lib/i18n/dictionary.ts`) is the single place to add
  Sindhi/Pashto/Punjabi/Balochi.
- **One-question-per-screen wizard**, mirroring the FBR "8 windows" UX.
- **Auto-fill scaffolding** (`src/lib/prefill.ts`) — honest about the fact that
  FBR's auto-fill reads its own central database, which third parties cannot
  access. The seam is ready for an authorised FBR/PRAL feed.
- **Fast-refund flag** (sub-Rs 50,000) and a **deadline countdown**; helpline.

**Positioning.** Because FBR now offers a free, simplified salaried form, eFile
Pak leads with *done-for-you*: a professional files for you, handles business/AOP
complexity, reconciles the wealth statement, and follows up the refund — value
FBR's self-service form does not provide.

## Workflow

```
DRAFT ──submit──> SUBMITTED ──> IN_REVIEW ──> FILED ──> COMPLETED
                                   │
                                   └──> INFO_NEEDED ──(taxpayer updates)──> back to review
```

Each transition writes a `StatusEvent` visible to the taxpayer as a timeline.

## Data model

`User` (role USER/STAFF) · `Filing` (taxYear, filerType, status, `data` JSON,
`computed` JSON) · `Document` · `StatusEvent`. See `prisma/schema.prisma`.

## Out of scope for v1 (roadmap)

- Direct submission to FBR IRIS (no public API — done manually by staff).
- Email verification, password reset, 2FA.
- Payments / subscription billing.
- Object storage for documents (currently local disk).
- Multi-year returns and prior-year carry-forward.
- OCR auto-extraction from uploaded salary/tax certificates.
- Freelancer/IT export (final tax regime) as a first-class flow.
- Notifications (email/WhatsApp) on status changes.

## Testing

- `npm test` runs the pure engine tests (`src/lib/tax/engine.test.ts`):
  slab boundaries vs FBR base figures, surcharge threshold, Zakat, credits,
  withholding → refund, property allowance, wealth reconciliation, CNIC
  validation.
- `npm run build` type-checks the entire app.

## Compliance & disclaimers

eFile Pak is a tax-preparation service, not affiliated with FBR. Computations
are estimates for review. Tax law changes annually; `rates.ts` must be verified
against the current Finance Act before any filing season.
