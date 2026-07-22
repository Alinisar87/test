# Mission — Markup Valley Pay

## One-Line Pitch
A Raast-powered "get paid" collections app for Pakistani freelancers and micro-businesses — send a payment request, get paid instantly over Raast, track it in one dashboard — operated asset-light on a licensed partner's rails.

## Why This Exists
Freelancers and small sellers in Pakistan lose time and money chasing payments through screenshots, manual bank transfers, and unverified requests. Raast makes instant, free settlement possible, but there is no simple, compliant collections layer built for the individual earner. Markup Valley is building it because we already serve entrepreneurs end-to-end (formation + compliance) and have the KYC/AML muscle that is the hard part of fintech — letting us ship the software layer now while the licensed rail is a partnership, not a PKR 200M license.

## Target Audience
- **v1 primary:** Pakistani freelancers / remote workers collecting from local and overseas clients.
- **Fast-follow:** micro-merchants and small sellers taking customer payments (QR).
- **Strategic tie-in:** NRA-owned entities from Markup Valley's existing formation funnel needing a Pakistan collections/payout endpoint (cross-border).

## Scope — In
- Freelancer signup + lightweight KYC intake.
- Create a **payment request / digital invoice** (amount, purpose, payer contact).
- Get paid via **Raast** — dynamic QR + Request-to-Pay (RTP), rendered through a payment-rail adapter.
- A **dashboard**: request status (pending / paid / expired), history, basic export.
- **Provider-agnostic rail adapter** with a sandbox/mock implementation, swappable for a real sponsor EMI / 1LINK 1GO Raast P2M integration once signed.
- Notifications (email/WhatsApp) on payment received.

## Scope — Out (Explicit Non-Goals)
- **No holding of customer funds / e-money.** Settlement lands in the user's own bank/wallet via the licensed partner. We are not an EMI in v1.
- **No storing of bank/card credentials.** Never store PANs or full account numbers; tokenize / delegate to the partner.
- No lending, credit scoring, or wallet balances in v1 (that is the later TPP / sandbox track).
- No multi-currency FX handling in v1 beyond what the rail partner provides.
- Not a marketplace, accounting suite, or full ERP.

## Success Criteria
- A freelancer can go from signup → first paid Raast request in under 10 minutes.
- Payment-request → paid status reflects accurately end-to-end against the sandbox rail.
- Zero storage of prohibited payment credentials (verifiable in schema + code review).
- Rail adapter can be swapped to a real partner with no changes to app/domain code.
- Ready to demo to a prospective sponsor EMI / aggregator as a working product.

## Constraints
- **Regulatory:** operate asset-light — no activity that requires an SBP EMI/PSP license in v1. All settlement flows through a licensed partner.
- **Data sensitivity:** Client PII (name, phone, CNIC) → mandatory deep-review in validation. Payment data → never stored, always tokenized/delegated.
- **Entity:** Markup Valley (Pakistan, FBR-registered). Confirm SECP corporate form before any licensed-principal step (out of scope for v1).
- **Asset-light:** v1 must not block on a signed partner — sandbox/mock rail must let the full product run.

## Stakeholders
- **Owner:** Ali Nisar
- **Primary users:** Pakistani freelancers & micro-businesses
- **Approvers:** Ali Nisar (architect / manual review for anything touching PII or money movement)

## Open Questions
- [ ] Is the Pakistan "Markup Valley" entity a SECP-registered company or a sole-proprietor NTN? (Gates any future licensed step.)
- [ ] Which sponsor path first — a sponsor EMI/bank, or a 1LINK merchant aggregator (Paysys etc.)?
- [ ] KYC depth for v1 — self-attested + CNIC capture, or partner-delegated eKYC?
- [ ] Product brand — keep "Markup Valley Pay" or a standalone consumer brand?
