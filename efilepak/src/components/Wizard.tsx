"use client";

import { useMemo, useState, useTransition } from "react";
import { computeTax } from "@/lib/tax/engine";
import type { FilingInput } from "@/lib/tax/types";
import { saveFilingInput, submitFiling } from "@/app/actions/filings";
import { FILER_TYPE_LABELS, formatPKR } from "@/lib/format";
import { useT } from "./LanguageProvider";
import {
  CheckboxField,
  MoneyField,
  RadioCards,
  TextField,
} from "./fields";
import { ResultSummary } from "./ResultSummary";
import { Disclaimer } from "./Disclaimer";

interface Screen {
  group: string; // translation key for the progress label
  node: React.ReactNode;
}

export function Wizard({
  filingId,
  initialInput,
  documentsPanel,
}: {
  filingId: string;
  initialInput: FilingInput;
  documentsPanel: React.ReactNode;
}) {
  const { t } = useT();
  const [input, setInput] = useState<FilingInput>(initialInput);
  const [step, setStep] = useState(0);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  // Prefill (auto-fill) local UI state — not persisted; honest scaffolding.
  const [employer, setEmployer] = useState("");
  const [bank, setBank] = useState("");
  const [prefillReady, setPrefillReady] = useState(false);

  const result = useMemo(() => computeTax(input), [input]);
  const isSalaried = input.filerType === "SALARIED";
  const isFreelancer = input.filerType === "FREELANCER";

  function patch<K extends keyof FilingInput>(
    section: K,
    value: Partial<FilingInput[K]>,
  ) {
    setInput((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as object), ...value },
    }));
  }

  // --- Build the one-question-per-screen sequence ---------------------------
  const screens: Screen[] = [];

  screens.push({
    group: "wiz.s.type",
    node: (
      <Question title={t("wiz.s.type")} q={t("wiz.filerType")}>
        <RadioCards
          label=""
          value={input.filerType}
          onChange={(v) => setInput((p) => ({ ...p, filerType: v }))}
          options={[
            { value: "SALARIED", label: t("wiz.salaried"), hint: t("wiz.salariedHint") },
            { value: "BUSINESS", label: t("wiz.business"), hint: t("wiz.businessHint") },
            { value: "FREELANCER", label: t("wiz.freelancer"), hint: t("wiz.freelancerHint") },
            { value: "AOP", label: t("wiz.aop"), hint: t("wiz.aopHint") },
          ]}
        />
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.type",
    node: (
      <Question title={t("wiz.s.name")} q={t("wiz.q.name")}>
        <TextField
          label=""
          value={input.taxpayer.fullName}
          onChange={(v) => patch("taxpayer", { fullName: v })}
        />
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.type",
    node: (
      <Question title={t("wiz.s.cnic")} q={t("wiz.q.cnic")}>
        <TextField
          label=""
          value={input.taxpayer.cnic}
          placeholder="35202-1234567-8"
          hint={t("wiz.q.cnicHint")}
          onChange={(v) => patch("taxpayer", { cnic: v })}
        />
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.type",
    node: (
      <Question title={t("wiz.s.resident")} q={t("wiz.q.resident")}>
        <CheckboxField
          label={t("wiz.q.residentLabel")}
          checked={input.taxpayer.resident}
          onChange={(v) => patch("taxpayer", { resident: v })}
        />
      </Question>
    ),
  });

  // Prefill / auto-fill screen (salaried only — mirrors FBR's employer step)
  if (isSalaried) {
    screens.push({
      group: "wiz.s.type",
      node: (
        <Question title={t("wiz.s.prefill")} q={t("prefill.title")}>
          <p className="text-sm text-muted">{t("prefill.body")}</p>
          <TextField label={t("prefill.employer")} value={employer} onChange={setEmployer} />
          <TextField label={t("prefill.bank")} value={bank} onChange={setBank} />
          <button
            type="button"
            onClick={() => setPrefillReady(true)}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {t("prefill.btn")}
          </button>
          {prefillReady && employer && (
            <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-brand-800">
              {t("prefill.ready", { employer })}
            </p>
          )}
          <p className="text-xs text-muted">{t("prefill.note")}</p>
        </Question>
      ),
    });
  }

  // Income — freelancer gets a dedicated IT-export screen
  if (isFreelancer) {
    screens.push({
      group: "wiz.s.income",
      node: (
        <Question title={t("wiz.s.income")} q={t("wiz.q.itExport")}>
          <MoneyField
            label=""
            value={input.income.itExportReceipts}
            hint={t("wiz.q.itExportHint")}
            onChange={(v) => patch("income", { itExportReceipts: v })}
          />
          <CheckboxField
            label={t("wiz.q.pseb")}
            hint={t("wiz.q.psebHint")}
            checked={input.income.psebRegistered}
            onChange={(v) => patch("income", { psebRegistered: v })}
          />
          <MoneyField
            label={t("wiz.q.localIncome")}
            value={input.income.business}
            onChange={(v) => patch("income", { business: v })}
          />
        </Question>
      ),
    });
  } else {
    screens.push({
      group: "wiz.s.income",
      node: (
        <Question
          title={t("wiz.s.income")}
          q={isSalaried ? t("wiz.q.salary") : t("wiz.q.business")}
        >
          {isSalaried ? (
            <MoneyField
              label=""
              value={input.income.salary}
              hint={t("wiz.q.salaryHint")}
              onChange={(v) => patch("income", { salary: v })}
            />
          ) : (
            <MoneyField
              label=""
              value={input.income.business}
              hint={t("wiz.q.businessHint")}
              onChange={(v) => patch("income", { business: v })}
            />
          )}
        </Question>
      ),
    });
  }

  screens.push({
    group: "wiz.s.income",
    node: (
      <Question title={t("wiz.s.property")} q={t("wiz.q.property")}>
        <MoneyField
          label=""
          value={input.income.propertyGross}
          hint={t("wiz.q.propertyHint")}
          onChange={(v) => patch("income", { propertyGross: v })}
        />
        {input.income.propertyGross > 0 && (
          <CheckboxField
            label={t("wiz.q.repair")}
            checked={input.income.propertyRepairAllowance}
            onChange={(v) => patch("income", { propertyRepairAllowance: v })}
          />
        )}
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.income",
    node: (
      <Question title={t("wiz.s.other")} q={t("wiz.q.otherNormal")}>
        <MoneyField
          label={t("wiz.q.otherNormal")}
          value={input.income.otherNormal}
          onChange={(v) => patch("income", { otherNormal: v })}
        />
        <MoneyField
          label={t("wiz.q.finalRegime")}
          value={input.income.finalRegimeIncome}
          hint={t("wiz.q.finalRegimeHint")}
          onChange={(v) => patch("income", { finalRegimeIncome: v })}
        />
      </Question>
    ),
  });

  // Tax already paid
  if (isSalaried) {
    screens.push({
      group: "wiz.s.withholding",
      node: (
        <Question title={t("wiz.s.withholding")} q={t("wiz.q.salaryWithholding")}>
          <MoneyField
            label=""
            value={input.taxPaid.salaryWithholding}
            hint={t("wiz.q.salaryWithholdingHint")}
            onChange={(v) => patch("taxPaid", { salaryWithholding: v })}
          />
        </Question>
      ),
    });
  }

  screens.push({
    group: "wiz.s.withholding",
    node: (
      <Question title={t("wiz.s.withholding")} q={t("wiz.q.otherAdjustable")}>
        <MoneyField
          label={t("wiz.q.otherAdjustable")}
          value={input.taxPaid.otherAdjustable}
          hint={t("wiz.q.otherAdjustableHint")}
          onChange={(v) => patch("taxPaid", { otherAdjustable: v })}
        />
        <MoneyField
          label={t("wiz.q.advanceTax")}
          value={input.taxPaid.advanceTax}
          onChange={(v) => patch("taxPaid", { advanceTax: v })}
        />
      </Question>
    ),
  });

  // Deductions & credits
  screens.push({
    group: "wiz.s.deductions",
    node: (
      <Question title={t("wiz.s.deductions")} q={t("wiz.q.zakat")}>
        <MoneyField
          label=""
          value={input.deductions.zakat}
          hint={t("wiz.q.zakatHint")}
          onChange={(v) => patch("deductions", { zakat: v })}
        />
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.deductions",
    node: (
      <Question title={t("wiz.s.deductions")} q={t("wiz.q.donations")}>
        <MoneyField
          label={t("wiz.q.donations")}
          value={input.deductions.donations}
          hint={t("wiz.q.donationsHint")}
          onChange={(v) => patch("deductions", { donations: v })}
        />
        <MoneyField
          label={t("wiz.q.pension")}
          value={input.deductions.pensionContribution}
          hint={t("wiz.q.pensionHint")}
          onChange={(v) => patch("deductions", { pensionContribution: v })}
        />
      </Question>
    ),
  });

  // Wealth statement
  screens.push({
    group: "wiz.s.wealth",
    node: (
      <Question title={t("wiz.s.wealth")} q={t("wiz.q.opening")}>
        <p className="text-sm text-muted">{t("wiz.q.wealthIntro")}</p>
        <MoneyField
          label={t("wiz.q.opening")}
          value={input.wealth.openingNetAssets}
          allowNegative
          hint={t("wiz.q.openingHint")}
          onChange={(v) => patch("wealth", { openingNetAssets: v })}
        />
        <MoneyField
          label={t("wiz.q.closing")}
          value={input.wealth.closingNetAssets}
          allowNegative
          hint={t("wiz.q.closingHint")}
          onChange={(v) => patch("wealth", { closingNetAssets: v })}
        />
      </Question>
    ),
  });

  screens.push({
    group: "wiz.s.wealth",
    node: (
      <Question title={t("wiz.s.wealth")} q={t("wiz.q.expenses")}>
        <MoneyField
          label={t("wiz.q.expenses")}
          value={input.wealth.personalExpenses}
          onChange={(v) => patch("wealth", { personalExpenses: v })}
        />
        <MoneyField
          label={t("wiz.q.inflows")}
          value={input.wealth.otherInflows}
          onChange={(v) => patch("wealth", { otherInflows: v })}
        />
      </Question>
    ),
  });

  // Documents
  screens.push({
    group: "wiz.s.documents",
    node: (
      <div id="documents">
        <h2 className="text-lg font-bold">{t("wiz.s.documents")}</h2>
        <div className="mt-4">{documentsPanel}</div>
      </div>
    ),
  });

  // Review & submit
  screens.push({
    group: "wiz.s.review",
    node: (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">{t("wiz.s.review")}</h2>
        <p className="text-sm text-muted">{t("wiz.reviewIntro")}</p>
        <ResultSummary result={result} />
        <Disclaimer />
        <button
          onClick={submit}
          disabled={pending}
          className="w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
        >
          {pending ? t("wiz.submitting") : t("wiz.submit")}
        </button>
      </div>
    ),
  });

  const total = screens.length;
  const current = Math.min(step, total - 1);

  // Ordered unique groups for the progress rail.
  const groups: string[] = [];
  for (const s of screens) if (!groups.includes(s.group)) groups.push(s.group);
  const currentGroup = screens[current].group;

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
      if (await persist()) setStep((s) => Math.min(s + 1, total - 1));
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

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div>
        {/* Group progress rail */}
        <ol className="mb-4 flex flex-wrap gap-1 text-xs">
          {groups.map((g) => (
            <li
              key={g}
              className={`rounded-full px-3 py-1 font-medium ${
                g === currentGroup
                  ? "bg-brand-600 text-white"
                  : "bg-slate-100 text-muted"
              }`}
            >
              {t(g)}
            </li>
          ))}
        </ol>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-brand-600 transition-all"
              style={{ width: `${((current + 1) / total) * 100}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-muted">
            {t("wiz.questionOf", { n: current + 1, total })}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          {screens[current].node}

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={current === 0}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium disabled:opacity-40"
            >
              {t("common.back")}
            </button>
            <span className="text-xs text-muted">
              {pending
                ? t("common.saving")
                : savedAt
                  ? t("common.saved")
                  : t("common.changesSave")}
            </span>
            {current < total - 1 ? (
              <button
                onClick={goNext}
                disabled={pending}
                className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
              >
                {t("common.saveContinue")}
              </button>
            ) : (
              <span className="w-[92px]" />
            )}
          </div>
        </div>
      </div>

      {/* Live estimate */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{t("wiz.liveEstimate")}</h3>
            <span className="rounded-full bg-white px-2 py-0.5 text-xs text-muted ring-1 ring-slate-200">
              {FILER_TYPE_LABELS[input.filerType]}
            </span>
          </div>
          <div className="rounded-xl bg-white p-3 text-center ring-1 ring-slate-200">
            <p className="text-xs text-muted">
              {result.taxPayable > 0 ? t("wiz.estPayable") : t("wiz.estRefund")}
            </p>
            <p className="text-2xl font-extrabold tabular-nums">
              {formatPKR(result.taxPayable > 0 ? result.taxPayable : result.refundDue)}
            </p>
          </div>
          {result.refundDue > 0 && result.refundDue < 50_000 && (
            <p className="mt-2 rounded-lg bg-brand-50 px-2 py-1.5 text-xs text-brand-800">
              {t("refund.fast")}
            </p>
          )}
          <dl className="mt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted">{t("wiz.taxableIncome")}</dt>
              <dd className="tabular-nums">{formatPKR(result.taxableIncome)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{t("wiz.taxChargeable")}</dt>
              <dd className="tabular-nums">{formatPKR(result.taxChargeable)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted">{t("wiz.taxPaid")}</dt>
              <dd className="tabular-nums">{formatPKR(result.taxAlreadyPaid)}</dd>
            </div>
          </dl>
          {result.warnings.length > 0 && (
            <p className="mt-3 rounded-lg bg-amber-50 px-2 py-1.5 text-xs text-amber-800">
              {t("wiz.pointsToReview", { n: result.warnings.length })}
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}

function Question({
  title,
  q,
  children,
}: {
  title: string;
  q: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">
        {title}
      </p>
      <h2 className="mt-1 text-xl font-bold">{q}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}
