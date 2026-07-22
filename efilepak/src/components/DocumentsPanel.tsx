import { uploadDocument, deleteDocument } from "@/app/actions/filings";

const DOC_KINDS = [
  ["salary_certificate", "Salary tax certificate"],
  ["tax_deduction_cert", "Tax deduction certificate (bank/other)"],
  ["bank_statement", "Bank statement"],
  ["property_docs", "Property / rent documents"],
  ["business_accounts", "Business accounts"],
  ["other", "Other supporting document"],
];

interface Doc {
  id: string;
  kind: string;
  originalName: string;
  size: number;
  mimeType: string;
}

function kindLabel(k: string) {
  return DOC_KINDS.find(([v]) => v === k)?.[1] ?? k;
}

export function DocumentsPanel({
  filingId,
  documents,
  editable,
}: {
  filingId: string;
  documents: Doc[];
  editable: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted">
        Upload the documents that support your return. PDF, JPG or PNG, up to
        10&nbsp;MB each.
      </p>

      {documents.length > 0 ? (
        <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
          {documents.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-3 p-3">
              <div className="min-w-0">
                <a
                  href={`/api/documents/${d.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate text-sm font-medium text-brand-700 hover:underline"
                >
                  {d.originalName}
                </a>
                <p className="text-xs text-muted">
                  {kindLabel(d.kind)} · {(d.size / 1024).toFixed(0)} KB
                </p>
              </div>
              {editable && (
                <form action={deleteDocument}>
                  <input type="hidden" name="docId" value={d.id} />
                  <button className="text-xs text-red-600 hover:underline">
                    Remove
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-center text-sm text-muted">
          No documents uploaded yet.
        </p>
      )}

      {editable && (
        <form
          action={uploadDocument}
          encType="multipart/form-data"
          className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <input type="hidden" name="filingId" value={filingId} />
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Document type</span>
            <select
              name="kind"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2"
            >
              {DOC_KINDS.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <input
            type="file"
            name="file"
            accept="application/pdf,image/png,image/jpeg,image/webp"
            required
            className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-brand-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white"
          />
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Upload
          </button>
        </form>
      )}
    </div>
  );
}
