// Shared types for the tax engine and the questionnaire.
// These types are the contract between the wizard UI, the stored Filing.data,
// and the computation engine.

export type FilerType = "SALARIED" | "BUSINESS" | "AOP" | "FREELANCER";

/** A progressive tax bracket expressed in FBR's "base + rate on excess" form. */
export interface Slab {
  /** Lower bound of the bracket (taxable income at/above this uses this row). */
  from: number;
  /** Fixed tax at the lower bound. */
  base: number;
  /** Marginal rate applied to (income - from). */
  rate: number;
}

/** All questionnaire answers for a single filing. Stored as JSON in Filing.data. */
export interface FilingInput {
  taxYear: number;
  filerType: FilerType;

  taxpayer: {
    fullName: string;
    cnic: string;
    // Whether the person was resident in Pakistan for the tax year.
    resident: boolean;
  };

  income: {
    // Gross taxable salary for the year (after tax-exempt components removed).
    salary: number;
    // Net profit from business / profession (for BUSINESS / AOP filers).
    business: number;
    // Gross rental / property income for the year.
    propertyGross: number;
    // Apply the statutory 1/5 (20%) repair allowance on building rent.
    propertyRepairAllowance: boolean;
    // Other income taxed at normal slab rates (e.g. certain other sources).
    otherNormal: number;
    // Export receipts for IT / IT-enabled services (freelancers, s.154A).
    // Taxed under a FINAL regime at a concessional rate — not at slab rates.
    itExportReceipts: number;
    // Registered with the Pakistan Software Export Board (lower final rate).
    psebRegistered: boolean;
    // Income already taxed under a final/separate regime (dividends, profit on
    // debt subject to FTR, capital gains on securities, etc.). NOT added to
    // normal taxable income; captured for the wealth-statement reconciliation
    // and for completeness. Tax withheld on these is entered under `taxPaid`.
    finalRegimeIncome: number;
  };

  deductions: {
    // Zakat paid under the Zakat & Ushr Ordinance — a deductible allowance.
    zakat: number;
    // Donations eligible for a tax credit under section 61.
    donations: number;
    // Contributions to an approved pension fund — tax credit under section 63.
    pensionContribution: number;
  };

  taxPaid: {
    // Tax deducted by employer on salary.
    salaryWithholding: number;
    // Adjustable advance tax / withholding from other transactions
    // (bank, vehicle, utility, property, etc.).
    otherAdjustable: number;
    // Advance tax paid directly (u/s 147) during the year.
    advanceTax: number;
  };

  wealth: {
    openingNetAssets: number;
    closingNetAssets: number;
    // Total personal / household expenses for the year.
    personalExpenses: number;
    // Non-taxable inflows: gifts, inheritance, foreign remittance, exempt income.
    otherInflows: number;
  };
}

export interface TaxLine {
  label: string;
  amount: number;
  note?: string;
}

export interface WealthReconciliation {
  openingNetAssets: number;
  closingNetAssets: number;
  increaseInWealth: number;
  // Sum available to explain the increase: declared income + exempt inflows - expenses.
  explainedBy: number;
  // Positive => unexplained increase (a red flag). Near-zero => reconciled.
  unreconciled: number;
  reconciled: boolean;
}

export interface TaxResult {
  taxYear: number;
  filerType: FilerType;

  // Income build-up
  normalIncome: TaxLine[];
  grossNormalIncome: number;
  deductibleAllowances: number;
  taxableIncome: number;

  // Tax build-up
  slabTax: number;
  surcharge: number;
  taxCredits: TaxLine[];
  totalTaxCredits: number;

  // Final-tax regime: IT / IT-enabled services export (s.154A).
  itExportReceipts: number;
  itExportRate: number;
  itExportFinalTax: number;

  // Normal tax (after credits) + final taxes.
  taxChargeable: number;

  // Settlement
  taxAlreadyPaid: number;
  taxPayable: number; // > 0 => amount owed to FBR
  refundDue: number; // > 0 => refund receivable

  effectiveRate: number; // taxChargeable / taxableIncome
  averageRate: number; // slabTax / taxableIncome (used for credit computation)

  wealth: WealthReconciliation;

  // Human-readable notes / warnings surfaced to the taxpayer and staff.
  warnings: string[];
}
