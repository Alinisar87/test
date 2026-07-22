import { formatPKR, formatPct } from "@/lib/format";
import type { TaxResult } from "@/lib/tax/types";

function Row({
  label,
  amount,
  note,
  strong,
  negative,
}: {
  label: string;
  amount: number;
  note?: string;
  strong?: boolean;
  negative?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className={`text-sm ${strong ? "font-semibold" : ""}`}>
        {label}
        {note && <span className="ms-1 text-xs text-muted">({note})</span>}
      </span>
      <span
        className={`tabular-nums ${strong ? "font-semibold" : ""} ${
          negative ? "text-red-600" : ""
        }`}
      >
        {negative ? "– " : ""}
        {formatPKR(Math.abs(amount))}
      </span>
    </div>
  );
}

export function ResultSummary({ result }: { result: TaxResult }) {
  const owed = result.taxPayable > 0;
  return (
    <div className="space-y-5">
      {/* Headline */}
      <div
        className={`rounded-2xl p-5 text-center ${
          owed ? "bg-slate-900 text-white" : "bg-brand-600 text-white"
        }`}
      >
        <p className="text-sm opacity-80">
          {owed ? "Balance tax payable to FBR" : "Refund receivable from FBR"}
        </p>
        <p className="mt-1 text-3xl font-extrabold tabular-nums">
          {formatPKR(owed ? result.taxPayable : result.refundDue)}
        </p>
        <p className="mt-1 text-xs opacity-80">
          Tax Year {result.taxYear} · effective rate {formatPct(result.effectiveRate)}
        </p>
      </div>

      {/* Income */}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Taxable income
        </h3>
        {result.normalIncome.map((l) => (
          <Row key={l.label} label={l.label} amount={l.amount} note={l.note} />
        ))}
        <div className="my-1 border-t border-slate-100" />
        <Row label="Gross income" amount={result.grossNormalIncome} />
        {result.deductibleAllowances > 0 && (
          <Row
            label="Less: deductible allowances (Zakat)"
            amount={result.deductibleAllowances}
            negative
          />
        )}
        <Row label="Taxable income" amount={result.taxableIncome} strong />
      </section>

      {/* Tax */}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Tax computation
        </h3>
        <Row label="Income tax (slab)" amount={result.slabTax} />
        {result.surcharge > 0 && <Row label="Surcharge" amount={result.surcharge} />}
        {result.taxCredits.map((c) => (
          <Row key={c.label} label={`Less: ${c.label}`} amount={c.amount} note={c.note} negative />
        ))}
        {result.itExportFinalTax > 0 && (
          <Row
            label="IT/ITeS export final tax (s.154A)"
            amount={result.itExportFinalTax}
            note={`${(result.itExportRate * 100).toFixed(2)}% of exports`}
          />
        )}
        <Row label="Tax chargeable" amount={result.taxChargeable} strong />
        <div className="my-1 border-t border-slate-100" />
        <Row label="Less: tax already paid / withheld" amount={result.taxAlreadyPaid} negative />
        <Row
          label={owed ? "Balance payable" : "Refund due"}
          amount={owed ? result.taxPayable : result.refundDue}
          strong
          negative={!owed}
        />
      </section>

      {/* Wealth */}
      <section className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Wealth statement reconciliation
        </h3>
        <Row label="Net assets — opening" amount={result.wealth.openingNetAssets} />
        <Row label="Net assets — closing" amount={result.wealth.closingNetAssets} />
        <Row label="Increase in wealth" amount={result.wealth.increaseInWealth} />
        <Row label="Explained by income & inflows" amount={result.wealth.explainedBy} />
        <div
          className={`mt-2 rounded-lg px-3 py-2 text-sm ${
            result.wealth.reconciled
              ? "bg-brand-50 text-brand-700"
              : "bg-amber-50 text-amber-800"
          }`}
        >
          {result.wealth.reconciled
            ? "✓ Wealth statement reconciles."
            : `Unreconciled: ${formatPKR(Math.abs(result.wealth.unreconciled))}. Review before filing.`}
        </div>
      </section>

      {/* Warnings */}
      {result.warnings.length > 0 && (
        <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-800">
            Points to review
          </h3>
          <ul className="list-disc space-y-1 ps-5 text-sm text-amber-900">
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
