// ============================================================================
//  PREFILL / AUTO-FILL SCAFFOLDING
// ============================================================================
//  FBR's own IRIS return form auto-fills salary, withholding-by-CNIC, bank
//  closing balances and CNIC-linked registered purchases from FBR's CENTRAL
//  DATABASE. That data is accessible only to FBR — there is no public API for a
//  third party to read a taxpayer's withholding or bank balances.
//
//  So eFile Pak cannot replicate that auto-fill against live data today. This
//  module defines the SEAM where a real feed would plug in if/when FBR or PRAL
//  grants authorised access (e.g. an official taxpayer-authorised data-sharing
//  API). Until then the stub returns `source: "none"` and the taxpayer confirms
//  every figure from their own documents.
// ============================================================================

export interface PrefillRequest {
  cnic: string;
  employer?: string;
  bank?: string;
  taxYear: number;
}

export interface PrefillResult {
  /** Where the numbers came from. "none" until a real integration exists. */
  source: "none" | "fbr" | "pral" | "manual";
  salaryWithholding?: number;
  otherAdjustable?: number;
  closingBankBalance?: number;
  /** Human-readable explanation shown to the taxpayer. */
  note: string;
  /** Field labels we can pre-populate/highlight for the user to confirm. */
  suggestedFields: string[];
}

/**
 * Attempt to pre-fill a return. Replace the body with a real integration when
 * authorised FBR/PRAL access is available. The public contract stays the same.
 */
export async function fetchPrefill(req: PrefillRequest): Promise<PrefillResult> {
  // No live data source is wired up. We surface which fields a real feed WOULD
  // populate so the UI can guide the user to confirm them from documents.
  return {
    source: "none",
    note:
      "Live FBR data is not accessible to third parties. Confirm each amount from your own salary and bank documents.",
    suggestedFields: req.employer
      ? ["salaryWithholding", "otherAdjustable", "closingBankBalance"]
      : ["otherAdjustable", "closingBankBalance"],
  };
}
