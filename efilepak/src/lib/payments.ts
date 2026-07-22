// ============================================================================
//  PAYMENTS  —  gateway-agnostic seam
// ============================================================================
//  Stripe is not available to businesses in Pakistan, so this is built around a
//  provider interface, not a specific gateway. A working "mock" provider lets
//  the whole flow run in development; wire a real Pakistani gateway (Safepay,
//  JazzCash, Easypaisa) by implementing createCheckout/verify for it and
//  setting PAYMENTS_PROVIDER + its keys.
//
//    PAYMENTS_REQUIRED=true|false   gate submission on payment (default false)
//    PAYMENTS_PROVIDER=mock|safepay|jazzcash
//    PRICE_SALARIED / PRICE_FREELANCER / PRICE_BUSINESS / PRICE_AOP  (rupees)
// ============================================================================

import type { FilerType } from "@prisma/client";

const DEFAULT_PRICES: Record<FilerType, number> = {
  SALARIED: 2000,
  FREELANCER: 3000,
  BUSINESS: 5000,
  AOP: 7500,
};

export function priceForFiling(filerType: FilerType): number {
  const envKey = `PRICE_${filerType}`;
  const override = Number(process.env[envKey]);
  if (Number.isFinite(override) && override > 0) return override;
  return DEFAULT_PRICES[filerType];
}

export function isPaymentRequired(): boolean {
  return process.env.PAYMENTS_REQUIRED === "true";
}

export function paymentProvider(): string {
  return process.env.PAYMENTS_PROVIDER || "mock";
}

export interface CheckoutSession {
  /** Where to send the user to pay. For the mock provider this is our own
   *  confirm route; for a real gateway it's the hosted checkout URL. */
  url: string;
  reference: string;
}

/**
 * Begin a checkout. The mock provider returns an internal confirm URL that
 * marks the payment paid; a real gateway would create a hosted session here and
 * confirm via webhook. `index` is used to derive a stable reference without a
 * random source.
 */
export async function createCheckout(
  filingId: string,
  amount: number,
  index: number,
): Promise<CheckoutSession> {
  const provider = paymentProvider();
  const reference = `${provider}-${filingId.slice(0, 8)}-${index}`;

  switch (provider) {
    // case "safepay":  return createSafepaySession(...)
    // case "jazzcash": return createJazzCashSession(...)
    case "mock":
    default:
      return {
        url: `/filing/${filingId}/pay/confirm?ref=${encodeURIComponent(reference)}`,
        reference,
      };
  }
}
