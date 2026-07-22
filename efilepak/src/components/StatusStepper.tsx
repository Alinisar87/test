import { STATUS_LABELS, STATUS_STEPS } from "@/lib/format";

export function StatusStepper({ status }: { status: string }) {
  // INFO_NEEDED maps back onto the IN_REVIEW position visually.
  const effective = status === "INFO_NEEDED" ? "IN_REVIEW" : status;
  const current = STATUS_STEPS.indexOf(effective as (typeof STATUS_STEPS)[number]);

  return (
    <div>
      <ol className="flex items-center gap-1">
        {STATUS_STEPS.map((s, i) => {
          const done = i <= current;
          return (
            <li key={s} className="flex flex-1 items-center gap-1">
              <div
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold ${
                  done ? "bg-brand-600 text-white" : "bg-slate-200 text-muted"
                }`}
              >
                {i + 1}
              </div>
              {i < STATUS_STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 ${i < current ? "bg-brand-600" : "bg-slate-200"}`}
                />
              )}
            </li>
          );
        })}
      </ol>
      <div className="mt-1 flex justify-between text-[10px] text-muted">
        {STATUS_STEPS.map((s) => (
          <span key={s} className="flex-1 text-center first:text-left last:text-right">
            {STATUS_LABELS[s]}
          </span>
        ))}
      </div>
      {status === "INFO_NEEDED" && (
        <p className="mt-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs text-amber-800">
          Our team needs more information from you — please review and update your return.
        </p>
      )}
    </div>
  );
}
