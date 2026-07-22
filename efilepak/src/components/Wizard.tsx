"use client";

import { useMemo, useState, useTransition } from "react";
import { computeTax } from "@/lib/tax/engine";
import type { FilingInput } from "@/lib/tax/types";
import { saveFilingInput, submitFiling } from "@/app/actions/filings";
import { FILER_TYPE_LABELS, formatPKR } from "@/lib/format";
import {
  CheckboxField,
  MoneyField,
  RadioCards,
  TextField,
} from "./fields";
import { ResultSummary } from "./ResultSummary";
import { Disclaimer } from "./Disclaimer";

const STEPS = [
  "About you",
  "Income",
  "Tax already paid",
  "Deductions & credits",
  "Wealth statement",
  "Documents",
  "Review & submit",
];

export function Wizard({
  filingId,
  initialInput,
  documentsPanel,
}: {
  filingId: string;
  initialInput: FilingInput;
  documentsPanel: React.ReactNode;
}) {
  const [input, setInput] = useState<FilingInput>(initialInput);
  const [step, setStep] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const result = useMemo(() => computeTax(input), [input]);

  function patch<K extends keyof FilingInput>(
    section: K,
    value: Partial<FilingInput[K]>,
  ) {
    setInput((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object), ...value },
    }));
  }

  async function persist(): Promise<boolean> {
    const res = await saveFilingInput(filingId, JSON.stringify(input));
    if (res.error) {
      setError(res.error);
      return false;
    }
    setError(null);
    setSavedAt(Date.now());
    return true;
  }

  function goNext() {
    startTransition(async () => {
      if (await persist()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
    });
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }
  function submit() {
    startTransition(async () => {
      if (await persist()) await submitFiling(filingId);
    });
  }

  const isSalaried = input.filerType === "SALARIED";

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Left: steps */}
      <div>
        {/* Stepper */}
        <ol className="mb-6 flex flex-wrap gap-1 text-xs">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                onClick={() => setStep(i)}
                className={`rounded-full px-3 py-1 font-medium transition ${
                  i === step
                    ? "bg-brand-600 text-white"
                    : i < step
                      ? "bg-brand-50 text-brand-700"
                      : "bg-slate-100 text-muted"
                }`}
              >
                {i + 1}. {label}
              </button>
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-bold">{STEPS[step]}</h2>

          <div className="mt-4 space-y-4">
            {step === 0 && (
              <>
                <RadioCards
                  label="How do you earn most of your income?"
                  value={input.filerType}
                  onChange={(v) => setInput((p) => ({ ...p, filerType: v }))}
                  options={[
                    { value: "SALARIED", label: "Salaried", hint: "Employment income" },
                    { value: "BUSINESS", label: "Business", hint: "Self-employed / sole proprietor" },
                    { value: "AOP", label: "AOP", hint: "Association of Persons" },
                  ]}
                />
                <TextField
                  label="Full name (as per CNIC)"
                  value={input.taxpayer.fullName}
                  onChange={(v) => patch("taxpayer", { fullName: v })}
                />
                <TextField
                  label="CNIC"
                  value={input.taxpayer.cnic}
                  placeholder="35202-1234567-8"
                  hint="13 digits, with or without dashes."
                  onChange={(v) => patch("taxpayer", { cnic: v })}
                />
                <CheckboxField
                  label="I was a resident of Pakistan during the tax year"
                  checked={input.taxpayer.resident}
                  onChange={(v) => patch("taxpayer", { resident: v })}
                />
              </>
            )}

            {step === 1 && (
              <>
                {isSalaried ? (
                  <MoneyField
                    label="Annual gross salary (taxable)"
                    value={input.income.salary}
                    hint="Total salary for the year after removing tax-exempt allowances."
                    onChange={(v) => patch("income", { salary: v })}
                  />
                ) : (
                  <MoneyField
                    label="Net business / professional income"
                    value={input.income.business}
                    hint="Net profit after business expenses."
                    onChange={(v) => patch("income", { business: v })}
                  />
                )}
                <MoneyField
                  label="Property / rental income (gross)"
                  value={input.income.propertyGross}
                  onChange={(v) => patch("income", { propertyGross: v })}
                />
                {input.income.propertyGross > 0 && (
                  <CheckboxField
                    label="Apply 1/5 (20%) repair allowance on building rent"
                    checked={input.income.propertyRepairAllowance}
                    onChange={(v) => patch("income", { propertyRepairAllowance: v })}
                  />
                )}
                <MoneyField
                  label="Other income taxed at normal rates"
                  value={input.income.otherNormal}
                  hint="E.g. certain other sources not under a final tax regime."
                  onChange={(v) => patch("income", { otherNormal: v })}
                />
                <MoneyField
                  label="Income under final / separate tax regime"
                  value={input.income.finalRegimeIncome}
                  hint="Dividends, profit on debt (FTR), capital gains on securities, etc. Not added to normal income; used for the wealth statement."
                  onChange={(v) => patch("income", { finalRegimeIncome: v })}
                />
              </>
            )}

            {step === 2 && (
              <>
                {isSalaried && (
                  <MoneyField
                    label="Tax deducted by employer on salary"
                    value={input.taxPaid.salaryWithholding}
                    hint="From your salary tax certificate."
                    onChange={(v) => patch("taxPaid", { salaryWithholding: v })}
                  />
                )}
                <MoneyField
                  label="Other adjustable tax withheld"
                  value={input.taxPaid.otherAdjustable}
                  hint="Bank transactions, vehicle, utilities, property, etc."
                  onChange={(v) => patch("taxPaid", { otherAdjustable: v })}
                />
                <MoneyField
                  label="Advance tax paid (u/s 147)"
                  value={input.taxPaid.advanceTax}
                  onChange={(v) => patch("taxPaid", { advanceTax: v })}
                />
              </>
            )}

            {step === 3 && (
              <>
                <MoneyField
                  label="Zakat paid (deductible allowance)"
                  value={input.deductions.zakat}
                  hint="Zakat deducted under the Zakat & Ushr Ordinance."
                  onChange={(v) => patch("deductions", { zakat: v })}
                />
                <MoneyField
                  label="Charitable donations (tax credit u/s 61)"
                  value={input.deductions.donations}
                  hint="Donations to approved institutions. Credit capped at 30% of taxable income."
                  onChange={(v) => patch("deductions", { donations: v })}
                />
                <MoneyField
                  label="Approved pension fund contribution (u/s 63)"
                  value={input.deductions.pensionContribution}
                  hint="Contributions to a registered pension fund. Credit capped at 20% of taxable income."
                  onChange={(v) => patch("deductions", { pensionContribution: v })}
                />
              </>
            )}

            {step === 4 && (
              <>
                <p className="text-sm text-muted">
                  Your wealth statement reconciles your net worth at the start and
                  end of the year against your income and spending. It is
                  mandatory for individuals.
                </p>
                <MoneyField
                  label="Net assets at start of year"
                  value={input.wealth.openingNetAssets}
                  allowNegative
                  hint="Total assets minus liabilities on 1 July."
                  onChange={(v) => patch("wealth", { openingNetAssets: v })}
                />
                <MoneyField
                  label="Net assets at end of year"
                  value={input.wealth.closingNetAssets}
                  allowNegative
                  hint="Total assets minus liabilities on 30 June."
                  onChange={(v) => patch("wealth", { closingNetAssets: v })}
                />
                <MoneyField
                  label="Personal & household expenses for the year"
                  value={input.wealth.personalExpenses}
                  onChange={(v) => patch("wealth", { personalExpenses: v })}
                />
                <MoneyField
                  label="Other inflows (gifts, inheritance, remittance, exempt income)"
                  value={input.wealth.otherInflows}
                  onChange={(v) => patch("wealth", { otherInflows: v })}
                />
              </>
            )}

            {step === 5 && (
              <div id="documents">{documentsPanel}</div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <p className="text-sm text-muted">
                  Review your figures. When you submit, our team receives your
                  return, verifies everything, and files it with FBR.
                </p>
                <ResultSummary result={result} />
                <Disclaimer />
                <button
                  onClick={submit}
                  disabled={pending}
                  className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
                >
                  {pending ? "Submitting…" : "Submit to eFile Pak team"}
                </button>
              </div>
            )}
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              Back
            </button>
            <span className="text-xs text-muted">
              {pending
                ? "Saving…"
                : savedAt
                  ? "Saved"
                  : "Changes save as you continue"}
            </span>
            {step < STEPS.length - 1 ? (
              <button
                onClick={goNext}
                disabled={pending}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                Save & continue
              </button>
            ) : (
              <span className="w-[92px]" />
            )}
          </div>
        </div>
      </div>

      {/* Right: live summary */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Live estimate</h3>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs text-muted ring-1 ring-slate-200">
              {FILER_TYPE_LABELS[input.filerType]}
            </span>
          </div>
          <div className="rounded-xl bg-white p-3 text-center ring-1 ring-slate-200">
            <p className="text-xs text-muted">
              {result.taxPayable > 0 ? "Estimated payable" : "Estimated refund"}
            </p>
            <p className="text-2xl font-extrabold tabular-nums">
              {formatPKR(
                result.taxPayable > 0 ? result.taxPayable : result.refundDue,
              )}
            </p>
          </div>
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">Taxable income</dt>
              <dd className="tabular-nums">{formatPKR(result.taxableIncome)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tax chargeable</dt>
              <dd className="tabular-nums">{formatPKR(result.taxChargeable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">Tax already paid</dt>
              <dd className="tabular-nums">{formatPKR(result.taxAlreadyPaid)}</dd>
            </div>
          </dl>
          {result.warnings.length > 0 && (
            <p className="mt-3 rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-800">
              {result.warnings.length} point(s) to review
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
