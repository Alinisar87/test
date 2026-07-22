// Pure tax-computation engine. No framework / IO dependencies so it can be
// unit-tested in isolation and reused on both server and client.

import { getRegime, getYearRates } from "./rates.ts";
import type {
  FilingInput,
  Slab,
  TaxResult,
  WealthReconciliation,
} from "./types";

/** Progressive tax for a taxable income against a set of slabs. */
export function computeSlabTax(taxableIncome: number, slabs: Slab[]): number {
  if (taxableIncome <= 0) return 0;
  // Pick the highest bracket whose lower bound is <= income.
  let applicable: Slab = slabs[0];
  for (const slab of slabs) {
    if (taxableIncome >= slab.from) applicable = slab;
    else break;
  }
  const tax = applicable.base + applicable.rate * (taxableIncome - applicable.from);
  return round(tax);
}

/** Round to whole rupees (FBR returns are filed in whole rupees). */
function round(n: number): number {
  return Math.round(n);
}

function clampNonNegative(n: number): number {
  return n < 0 ? 0 : n;
}

/** Coerce a possibly-undefined/NaN numeric field to a finite number. */
function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

export function computeTax(input: FilingInput): TaxResult {
  const year = getYearRates(input.taxYear);
  const regime = getRegime(input.taxYear, input.filerType);
  const warnings: string[] = [];

  // --- 1. Build up normal-rate income -------------------------------------
  const salary = clampNonNegative(num(input.income.salary));
  const business = clampNonNegative(num(input.income.business));
  const propertyGross = clampNonNegative(num(input.income.propertyGross));
  const otherNormal = clampNonNegative(num(input.income.otherNormal));

  // Property: statutory 1/5 repair allowance on building rent.
  const propertyNet = input.income.propertyRepairAllowance
    ? round(propertyGross * 0.8)
    : propertyGross;

  const normalIncome = [
    { label: "Salary income", amount: salary },
    { label: "Business / professional income", amount: business },
    {
      label: "Property / rental income",
      amount: propertyNet,
      note: input.income.propertyRepairAllowance
        ? "After 1/5 (20%) repair allowance"
        : undefined,
    },
    { label: "Other income (normal rate)", amount: otherNormal },
  ].filter((l) => l.amount !== 0);

  const grossNormalIncome = salary + business + propertyNet + otherNormal;

  // --- 2. Deductible allowances -------------------------------------------
  const zakat = clampNonNegative(num(input.deductions.zakat));
  const deductibleAllowances = zakat;
  const taxableIncome = clampNonNegative(grossNormalIncome - deductibleAllowances);

  // --- 3. Slab tax + surcharge --------------------------------------------
  const slabTax = computeSlabTax(taxableIncome, regime.slabs);
  const averageRate = taxableIncome > 0 ? slabTax / taxableIncome : 0;

  const surcharge =
    taxableIncome > regime.surchargeThreshold
      ? round(slabTax * regime.surchargeRate)
      : 0;

  // --- 4. Tax credits (donations s.61, pension s.63) ----------------------
  // Both credits are given at the taxpayer's average rate of tax, on an amount
  // capped as a fraction of taxable income.
  const donations = clampNonNegative(num(input.deductions.donations));
  const pension = clampNonNegative(num(input.deductions.pensionContribution));

  const donationEligible = Math.min(
    donations,
    taxableIncome * year.donationCapFractionOfTaxableIncome,
  );
  const pensionEligible = Math.min(
    pension,
    taxableIncome * year.pensionCapFractionOfTaxableIncome,
  );

  const donationCredit = round(donationEligible * averageRate);
  const pensionCredit = round(pensionEligible * averageRate);

  const taxCredits = [
    donations > 0
      ? {
          label: "Charitable donations credit (s.61)",
          amount: donationCredit,
          note:
            donations > donationEligible
              ? "Capped at 30% of taxable income"
              : undefined,
        }
      : null,
    pension > 0
      ? {
          label: "Pension fund credit (s.63)",
          amount: pensionCredit,
          note:
            pension > pensionEligible
              ? "Capped at 20% of taxable income"
              : undefined,
        }
      : null,
  ].filter((x): x is NonNullable<typeof x> => x !== null);

  const totalTaxCredits = donationCredit + pensionCredit;

  const taxChargeable = clampNonNegative(slabTax + surcharge - totalTaxCredits);

  // --- 5. Settle against tax already paid ---------------------------------
  const taxAlreadyPaid =
    clampNonNegative(num(input.taxPaid.salaryWithholding)) +
    clampNonNegative(num(input.taxPaid.otherAdjustable)) +
    clampNonNegative(num(input.taxPaid.advanceTax));

  const net = taxChargeable - taxAlreadyPaid;
  const taxPayable = net > 0 ? round(net) : 0;
  const refundDue = net < 0 ? round(-net) : 0;

  const effectiveRate = taxableIncome > 0 ? taxChargeable / taxableIncome : 0;

  // --- 6. Wealth-statement reconciliation (s.116) -------------------------
  const wealth = reconcileWealth(input, grossNormalIncome);

  // --- 7. Warnings --------------------------------------------------------
  if (input.filerType === "SALARIED" && business > 0 && business > salary) {
    warnings.push(
      "Business income exceeds salary — a business/AOP return may apply instead of the salaried regime.",
    );
  }
  if (input.filerType !== "SALARIED" && salary > 0 && salary > grossNormalIncome * 0.75) {
    warnings.push(
      "Salary is more than 75% of income — the salaried regime (lower rates) may apply.",
    );
  }
  if (!wealth.reconciled) {
    warnings.push(
      `Wealth statement does not reconcile by Rs ${Math.abs(
        wealth.unreconciled,
      ).toLocaleString("en-PK")}. Review assets, expenses and inflows before filing.`,
    );
  }
  if (!input.taxpayer.cnic || input.taxpayer.cnic.replace(/\D/g, "").length !== 13) {
    warnings.push("A valid 13-digit CNIC is required to file.");
  }

  return {
    taxYear: input.taxYear,
    filerType: input.filerType,
    normalIncome,
    grossNormalIncome,
    deductibleAllowances,
    taxableIncome,
    slabTax,
    surcharge,
    taxCredits,
    totalTaxCredits,
    taxChargeable,
    taxAlreadyPaid,
    taxPayable,
    refundDue,
    effectiveRate,
    averageRate,
    wealth,
    warnings,
  };
}

function reconcileWealth(
  input: FilingInput,
  declaredNormalIncome: number,
): WealthReconciliation {
  const opening = num(input.wealth.openingNetAssets);
  const closing = num(input.wealth.closingNetAssets);
  const expenses = clampNonNegative(num(input.wealth.personalExpenses));
  const otherInflows = clampNonNegative(num(input.wealth.otherInflows));
  const finalRegimeIncome = clampNonNegative(num(input.income.finalRegimeIncome));

  const increaseInWealth = closing - opening;
  // Everything that could fund an increase in net worth over the year.
  const explainedBy =
    declaredNormalIncome + finalRegimeIncome + otherInflows - expenses;
  const unreconciled = increaseInWealth - explainedBy;

  // Treat within Rs 1,000 as reconciled to allow for rounding.
  const reconciled = Math.abs(unreconciled) <= 1_000;

  return {
    openingNetAssets: opening,
    closingNetAssets: closing,
    increaseInWealth,
    explainedBy,
    unreconciled: round(unreconciled),
    reconciled,
  };
}

/** A zero-filled input, used to seed new filings and the wizard. */
export function emptyFilingInput(
  taxYear: number,
  filerType: FilingInput["filerType"] = "SALARIED",
): FilingInput {
  return {
    taxYear,
    filerType,
    taxpayer: { fullName: "", cnic: "", resident: true },
    income: {
      salary: 0,
      business: 0,
      propertyGross: 0,
      propertyRepairAllowance: true,
      otherNormal: 0,
      finalRegimeIncome: 0,
    },
    deductions: { zakat: 0, donations: 0, pensionContribution: 0 },
    taxPaid: { salaryWithholding: 0, otherAdjustable: 0, advanceTax: 0 },
    wealth: {
      openingNetAssets: 0,
      closingNetAssets: 0,
      personalExpenses: 0,
      otherInflows: 0,
    },
  };
}
