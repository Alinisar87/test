import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { ResultSummary } from "@/components/ResultSummary";
import { DocumentsPanel } from "@/components/DocumentsPanel";
import { getSession } from "@/lib/auth";
import { getAuthorizedFiling, parseComputed, parseFilingInput } from "@/lib/filings";
import { updateFilingStatus, saveStaffNote } from "@/app/actions/filings";
import { FILER_TYPE_LABELS, STATUS_LABELS } from "@/lib/format";

export const metadata = { title: "Review return — eFile Pak" };

const STATUS_OPTIONS = [
  "SUBMITTED",
  "IN_REVIEW",
  "INFO_NEEDED",
  "FILED",
  "COMPLETED",
];

export default async function AdminFilingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "STAFF") redirect("/dashboard");

  const { id } = await params;
  const filing = await getAuthorizedFiling(id);
  if (!filing) notFound();

  const input = parseFilingInput(filing.data, filing.taxYear, filing.filerType);
  const result = parseComputed(filing.computed);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/admin" className="text-sm text-muted hover:text-ink">
          ← Queue
        </Link>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">
              {input.taxpayer.fullName || filing.user.name}
            </h1>
            <p className="text-sm text-muted">
              {filing.user.email} · {FILER_TYPE_LABELS[filing.filerType]} · TY{" "}
              {filing.taxYear} · CNIC {input.taxpayer.cnic || "—"}
            </p>
          </div>
          <Link
            href={`/filing/${filing.id}/package`}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            Return package
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-bold">Computed return</h2>
              {result ? (
                <ResultSummary result={result} />
              ) : (
                <p className="text-sm text-muted">No computation.</p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-4 text-lg font-bold">Documents</h2>
              <DocumentsPanel
                filingId={filing.id}
                documents={filing.documents}
                editable={false}
              />
            </div>
          </div>

          <aside className="space-y-6">
            {/* Status control */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-semibold">
                Status: {STATUS_LABELS[filing.status]}
              </h3>
              <form action={updateFilingStatus} className="space-y-2">
                <input type="hidden" name="filingId" value={filing.id} />
                <select
                  name="status"
                  defaultValue={filing.status}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
                <input
                  name="message"
                  placeholder="Note for the taxpayer (optional)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button className="w-full rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
                  Update status
                </button>
              </form>
            </div>

            {/* Internal notes */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-semibold">Internal notes</h3>
              <form action={saveStaffNote} className="space-y-2">
                <input type="hidden" name="filingId" value={filing.id} />
                <textarea
                  name="notes"
                  rows={4}
                  defaultValue={filing.notes ?? ""}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
                <button className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                  Save note
                </button>
              </form>
            </div>

            {/* Timeline */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="mb-3 text-sm font-semibold">History</h3>
              <ol className="space-y-3">
                {filing.events.map((e) => (
                  <li key={e.id} className="text-sm">
                    <p className="font-medium">
                      {STATUS_LABELS[e.status] ?? e.status}
                    </p>
                    {e.message && <p className="text-muted">{e.message}</p>}
                    <p className="text-xs text-muted">
                      {new Date(e.createdAt).toLocaleString("en-PK")}
                      {e.actor ? ` · ${e.actor}` : ""}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
