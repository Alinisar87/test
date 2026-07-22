import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Wizard } from "@/components/Wizard";
import { DocumentsPanel } from "@/components/DocumentsPanel";
import { StatusStepper } from "@/components/StatusStepper";
import { ResultSummary } from "@/components/ResultSummary";
import { getAuthorizedFiling, parseComputed, parseFilingInput } from "@/lib/filings";
import { STATUS_LABELS } from "@/lib/format";

export const metadata = { title: "Your return — eFile Pak" };

export default async function FilingPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const filing = await getAuthorizedFiling(id);
  if (!filing) notFound();

  const input = parseFilingInput(filing.data, filing.taxYear, filing.filerType);
  const result = parseComputed(filing.computed);
  const editable = filing.status === "DRAFT" || filing.status === "INFO_NEEDED";

  const documentsPanel = (
    <DocumentsPanel filingId={filing.id} documents={filing.documents} editable={editable} />
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link href="/dashboard" className="text-sm text-muted hover:text-ink">
          ← All returns
        </Link>

        <div className="mt-3 mb-6 rounded-2xl border border-slate-200 bg-white p-5">
          <StatusStepper status={filing.status} />
        </div>

        {sp.submitted && (
          <div className="mb-6 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-800 ring-1 ring-brand-200">
            ✓ Your return has been submitted. Our team will review it and file it
            with FBR. You can track progress here.
          </div>
        )}
        {sp.err && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {sp.err === "toobig"
              ? "That file is larger than 10 MB."
              : sp.err === "type"
                ? "Only PDF, JPG, PNG or WebP files are accepted."
                : "Please choose a file to upload."}
          </div>
        )}

        {editable ? (
          <Wizard filingId={filing.id} initialInput={input} documentsPanel={documentsPanel} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold">Return summary</h2>
                  <Link
                    href={`/filing/${filing.id}/package`}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50"
                  >
                    View / print package
                  </Link>
                </div>
                {result ? (
                  <ResultSummary result={result} />
                ) : (
                  <p className="text-sm text-muted">No computation available.</p>
                )}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6" id="documents">
                <h2 className="mb-4 text-lg font-bold">Documents</h2>
                {documentsPanel}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="mb-3 text-sm font-semibold">Progress</h3>
                <ol className="space-y-3">
                  {filing.events.map((e) => (
                    <li key={e.id} className="text-sm">
                      <p className="font-medium">{STATUS_LABELS[e.status] ?? e.status}</p>
                      {e.message && <p className="text-muted">{e.message}</p>}
                      <p className="text-xs text-muted">
                        {new Date(e.createdAt).toLocaleString("en-PK")}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        )}
      </main>
    </>
  );
}
