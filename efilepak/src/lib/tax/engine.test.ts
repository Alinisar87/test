// Run: npm test   (node --test, TypeScript stripped natively)
import { test } from "node:test";
import assert from "node:assert/strict";
import { computeSlabTax, computeTax, emptyFilingInput } from "./engine.ts";
import { getRegime } from "./rates.ts";

const salariedSlabs = getRegime(2026, "SALARIED").slabs;
const businessSlabs = getRegime(2026, "BUSINESS").slabs;

test("salaried: below exemption pays no tax", () => {
  assert.equal(computeSlabTax(600_000, salariedSlabs), 0);
  assert.equal(computeSlabTax(500_000, salariedSlabs), 0);
});

test("salaried: bracket boundaries match FBR base figures", () => {
  // At each bracket floor the tax equals the published base.
  assert.equal(computeSlabTax(1_200_000, salariedSlabs), 6_000);
  assert.equal(computeSlabTax(2_200_000, salariedSlabs), 116_000);
  assert.equal(computeSlabTax(3_200_000, salariedSlabs), 346_000);
  assert.equal(computeSlabTax(4_100_000, salariedSlabs), 616_000);
});

test("salaried: mid-bracket computation", () => {
  // 1,000,000 -> 1% of (1,000,000 - 600,000) = 4,000
  assert.equal(computeSlabTax(1_000_000, salariedSlabs), 4_000);
  // 5,000,000 -> 616,000 + 35% of 900,000 = 931,000
  assert.equal(computeSlabTax(5_000_000, salariedSlabs), 931_000);
});

test("business/AOP: bracket boundaries match FBR base figures", () => {
  assert.equal(computeSlabTax(1_200_000, businessSlabs), 90_000);
  assert.equal(computeSlabTax(1_600_000, businessSlabs), 170_000);
  assert.equal(computeSlabTax(3_200_000, businessSlabs), 650_000);
  assert.equal(computeSlabTax(5_600_000, businessSlabs), 1_610_000);
});

test("surcharge applies over Rs 10m taxable income (salaried 9%)", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 12_000_000;
  const r = computeTax(input);
  assert.ok(r.surcharge > 0, "surcharge should be charged");
  assert.equal(r.surcharge, Math.round(r.slabTax * 0.09));
});

test("no surcharge at or below Rs 10m", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 10_000_000;
  assert.equal(computeTax(input).surcharge, 0);
});

test("zakat reduces taxable income", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 2_000_000;
  input.deductions.zakat = 200_000;
  const r = computeTax(input);
  assert.equal(r.taxableIncome, 1_800_000);
});

test("withholding produces a refund when it exceeds liability", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 1_000_000; // tax = 4,000
  input.taxPaid.salaryWithholding = 10_000;
  const r = computeTax(input);
  assert.equal(r.taxChargeable, 4_000);
  assert.equal(r.refundDue, 6_000);
  assert.equal(r.taxPayable, 0);
});

test("property repair allowance applies 20% deduction", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.propertyGross = 1_000_000;
  input.income.propertyRepairAllowance = true;
  const r = computeTax(input);
  assert.equal(r.grossNormalIncome, 800_000);
});

test("wealth statement flags an unexplained increase", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 2_000_000;
  input.wealth.openingNetAssets = 1_000_000;
  input.wealth.closingNetAssets = 5_000_000; // +4,000,000
  input.wealth.personalExpenses = 500_000;
  // Explained by: 2,000,000 income - 500,000 expenses = 1,500,000 < 4,000,000
  const r = computeTax(input);
  assert.equal(r.wealth.reconciled, false);
  assert.ok(r.warnings.some((w) => w.includes("Wealth statement")));
});

test("wealth statement reconciles when inflows match", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.taxpayer.cnic = "1234567890123";
  input.income.salary = 2_000_000;
  input.wealth.openingNetAssets = 1_000_000;
  input.wealth.closingNetAssets = 2_500_000; // +1,500,000
  input.wealth.personalExpenses = 500_000; // 2,000,000 - 500,000 = 1,500,000
  const r = computeTax(input);
  assert.equal(r.wealth.reconciled, true);
});

test("freelancer: IT export final tax at 1% (non-PSEB)", () => {
  const input = emptyFilingInput(2026, "FREELANCER");
  input.taxpayer.cnic = "1234567890123";
  input.income.itExportReceipts = 5_000_000;
  input.income.psebRegistered = false;
  const r = computeTax(input);
  assert.equal(r.itExportFinalTax, 50_000); // 1%
  assert.equal(r.itExportRate, 0.01);
  assert.equal(r.taxChargeable, 50_000);
});

test("freelancer: PSEB-registered pays 0.25%", () => {
  const input = emptyFilingInput(2026, "FREELANCER");
  input.taxpayer.cnic = "1234567890123";
  input.income.itExportReceipts = 5_000_000;
  input.income.psebRegistered = true;
  const r = computeTax(input);
  assert.equal(r.itExportFinalTax, 12_500); // 0.25%
});

test("freelancer: export final tax stacks on top of local slab income", () => {
  const input = emptyFilingInput(2026, "FREELANCER");
  input.taxpayer.cnic = "1234567890123";
  input.income.business = 2_000_000; // local income -> business slabs
  input.income.itExportReceipts = 1_000_000; // -> 10,000 final tax
  const r = computeTax(input);
  // business slab on 2,000,000: 170,000 + 30% of 400,000 = 290,000
  assert.equal(r.slabTax, 290_000);
  assert.equal(r.itExportFinalTax, 10_000);
  assert.equal(r.taxChargeable, 300_000);
});

test("export receipts help reconcile the wealth statement", () => {
  const input = emptyFilingInput(2026, "FREELANCER");
  input.taxpayer.cnic = "1234567890123";
  input.income.itExportReceipts = 3_000_000;
  input.wealth.openingNetAssets = 0;
  input.wealth.closingNetAssets = 2_500_000;
  input.wealth.personalExpenses = 500_000; // 3,000,000 - 500,000 = 2,500,000
  const r = computeTax(input);
  assert.equal(r.wealth.reconciled, true);
});

test("invalid CNIC produces a warning", () => {
  const input = emptyFilingInput(2026, "SALARIED");
  input.income.salary = 1_000_000;
  const r = computeTax(input);
  assert.ok(r.warnings.some((w) => w.includes("CNIC")));
});
