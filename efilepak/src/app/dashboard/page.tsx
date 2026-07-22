import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseComputed } from "@/lib/filings";
import {
  FILER_TYPE_LABELS,
  STATUS_LABELS,
  formatPKR,
} from "@/lib/format";

export const metadata = { title: "Your returns — eFile Pak" };

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slate-600",
  SUBMITTED: "bg-blue-50 text-blue-700",
  IN_REVIEW: "bg-indigo-50 text-indigo-700",
  INFO_NEEDED: "bg-amber-50 text-amber-800",
  FILED: "bg-brand-50 text-brand-700",
  COMPLETED: "bg-brand-600 text-white",
};

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const filings = await prisma.filing.findMany({
    where: { userId: session.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Your tax returns</h1>
            <p className="text-sm text-muted">
              Welcome back, {session.name.split(" ")[0] || "there"}.
            </p>
          </div>
          <Link
            href="/filing/new"
            className="rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            + Start a new return
          </Link>
        </div>

        {filings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <p className="text-lg font-semibold">No returns yet</p>
            <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
              Start your Tax Year 2026 return — it takes a few minutes and we
              handle the filing.
            </p>
            <Link
              href="/filing/new"
              className="mt-5 inline-block rounded-xl bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
            >
              Start my return
            </Link>
          </div>
        ) : (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {filings.map((f) => {
              const c = parseComputed(f.computed);
              const editable = f.status === "DRAFT" || f.status === "INFO_NEEDED";
              const owed = (c?.taxPayable ?? 0) > 0;
              return (
                <li
                  key={f.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">Tax Year {f.taxYear}</p>
                      <p className="text-sm text-muted">
                        {FILER_TYPE_LABELS[f.filerType]}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[f.status]}`}
                    >
                      {STATUS_LABELS[f.status]}
                    </span>
                  </div>

                  {c && (
                    <p className="mt-3 text-sm">
                      <span className="text-muted">
                        {owed ? "Payable" : "Refund"}:{" "}
                      </span>
                      <span className="font-semibold">
                        {formatPKR(owed ? c.taxPayable : c.refundDue)}
                      </span>
                    </p>
                  )}

                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/filing/${f.id}`}
                      className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700"
                    >
                      {editable ? "Continue" : "View"}
                    </Link>
                    {!editable && (
                      <Link
                        href={`/filing/${f.id}/package`}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                      >
                        Return package
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  );
}
