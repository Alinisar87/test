import { notFound } from "next/navigation";
import Link from "next/link";
import { ResultSummary } from "@/components/ResultSummary";
import { Disclaimer } from "@/components/Disclaimer";
import { Brand } from "@/components/Brand";
import { PrintButton } from "@/components/PrintButton";
import { getAuthorizedFiling, parseComputed, parseFilingInput } from "@/lib/filings";
import { FILER_TYPE_LABELS, STATUS_LABELS } from "@/lib/format";

export const metadata = { title: "Return package — eFile Pak" };

export default async function PackagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filing = await getAuthorizedFiling(id);
  if (!filing) notFound();

  const input = parseFilingInput(filing.data, filing.taxYear, filing.filerType);
  const result = parseComputed(filing.computed);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="no-print mb-6 flex items-center justify-between">
        <Link href={`/filing/${filing.id}`} className="text-sm text-muted hover:text-ink">
          ← Back to return
        </Link>
        <PrintButton />
      </div>

      <div className="print-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <Brand />
          <div className="text-right text-sm text-muted">
            <p className="font-semibold text-ink">Income Tax Return — Working</p>
            <p>Tax Year {filing.taxYear}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted">Taxpayer</dt>
            <dd className="font-medium">{input.taxpayer.fullName || filing.user.name}</dd>
          </div>
          <div>
            <dt className="text-muted">CNIC</dt>
            <dd className="font-medium">{input.taxpayer.cnic || "—"}</dd>
          </div>
          <div>
            <dt className="text-muted">Filer type</dt>
            <dd className="font-medium">{FILER_TYPE_LABELS[filing.filerType]}</dd>
          </div>
          <div>
            <dt className="text-muted">Status</dt>
            <dd className="font-medium">{STATUS_LABELS[filing.status]}</dd>
          </div>
          <div>
            <dt className="text-muted">Residency</dt>
            <dd className="font-medium">
              {input.taxpayer.resident ? "Resident" : "Non-resident"}
            </dd>
          </div>
          <div>
            <dt className="text-muted">Prepared</dt>
            <dd className="font-medium">
              {new Date(filing.updatedAt).toLocaleDateString("en-PK")}
            </dd>
          </div>
        </dl>

        <div className="mt-8">
          {result ? (
            <ResultSummary result={result} />
          ) : (
            <p className="text-sm text-muted">No computation available.</p>
          )}
        </div>

        {filing.documents.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Supporting documents
            </h3>
            <ul className="list-disc pl-5 text-sm">
              {filing.documents.map((d) => (
                <li key={d.id}>{d.originalName}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <Disclaimer />
        </div>
      </div>
    </main>
  );
}
