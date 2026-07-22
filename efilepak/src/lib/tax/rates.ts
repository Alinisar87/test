// ============================================================================
//  TAX RATE TABLES  —  READ THIS BEFORE TRUSTING ANY NUMBER
// ============================================================================
//  These slabs encode Pakistan's personal income-tax rates as understood for
//  Tax Year 2026 (income earned 1 Jul 2025 – 30 Jun 2026), i.e. the rates set
//  by the Finance Act 2025.
//
//  Tax law changes every year with the federal budget. Before any return is
//  actually filed, these tables MUST be reconciled against the current Finance
//  Act / FBR income-tax slab notification. Treat every figure the app produces
//  as an ESTIMATE for review by a qualified tax professional — never as the
//  final filed number. This is exactly why eFile Pak is a "prepare + we file"
//  service with a human review step, not an auto-submit black box.
//
//  Sources to verify against each year:
//    - Finance Act (FBR): https://www.fbr.gov.pk
//    - IRIS return form:  https://iris.fbr.gov.pk
// ============================================================================

import type { FilerType, Slab } from "./types";

export interface RegimeRates {
  slabs: Slab[];
  /** Surcharge rate applied to income tax when taxable income exceeds the cap. */
  surchargeRate: number;
  surchargeThreshold: number;
}

export interface YearRates {
  taxYear: number;
  salaried: RegimeRates;
  business: RegimeRates; // used for BUSINESS individuals and AOPs
  // Statutory caps used in tax-credit computations.
  donationCapFractionOfTaxableIncome: number; // section 61
  pensionCapFractionOfTaxableIncome: number; // section 63
}

// --- Tax Year 2026 (Finance Act 2025) ---------------------------------------

const TY2026: YearRates = {
  taxYear: 2026,

  // Salaried individuals — First Schedule, Part I, Division I (as amended FA2025).
  salaried: {
    slabs: [
      { from: 0, base: 0, rate: 0 },
      { from: 600_000, base: 0, rate: 0.01 },
      { from: 1_200_000, base: 6_000, rate: 0.11 },
      { from: 2_200_000, base: 116_000, rate: 0.23 },
      { from: 3_200_000, base: 346_000, rate: 0.3 },
      { from: 4_100_000, base: 616_000, rate: 0.35 },
    ],
    // FA2025 reduced the salaried surcharge from 10% to 9%.
    surchargeRate: 0.09,
    surchargeThreshold: 10_000_000,
  },

  // Business individuals / Association of Persons — normal (non-salaried) rates.
  business: {
    slabs: [
      { from: 0, base: 0, rate: 0 },
      { from: 600_000, base: 0, rate: 0.15 },
      { from: 1_200_000, base: 90_000, rate: 0.2 },
      { from: 1_600_000, base: 170_000, rate: 0.3 },
      { from: 3_200_000, base: 650_000, rate: 0.4 },
      { from: 5_600_000, base: 1_610_000, rate: 0.45 },
    ],
    surchargeRate: 0.1,
    surchargeThreshold: 10_000_000,
  },

  donationCapFractionOfTaxableIncome: 0.3,
  pensionCapFractionOfTaxableIncome: 0.2,
};

const YEARS: Record<number, YearRates> = {
  2026: TY2026,
};

export const DEFAULT_TAX_YEAR = 2026;

export function getYearRates(taxYear: number): YearRates {
  return YEARS[taxYear] ?? YEARS[DEFAULT_TAX_YEAR];
}

export function getRegime(taxYear: number, filerType: FilerType): RegimeRates {
  const year = getYearRates(taxYear);
  return filerType === "SALARIED" ? year.salaried : year.business;
}

export const SUPPORTED_TAX_YEARS = Object.keys(YEARS)
  .map(Number)
  .sort((a, b) => b - a);
