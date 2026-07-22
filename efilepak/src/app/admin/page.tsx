import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { parseComputed } from "@/lib/filings";
import { FILER_TYPE_LABELS, STATUS_LABELS, formatPKR } from "@/lib/format";

export const metadata = { title: "Admin — eFile Pak" };

const ACTIVE = ["SUBMITTED", "IN_REVIEW", "INFO_NEEDED"];

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.role !== "STAFF") redirect("/dashboard");

  const filings = await prisma.filing.findMany({
    where: { status: { not: "DRAFT" } },
    orderBy: [{ submittedAt: "desc" }],
    include: { user: { select: { name: true, email: true } } },
  });

  const queue = filings.filter((f) => ACTIVE.includes(f.status));
  const done = filings.filter((f) => !ACTIVE.includes(f.status));

  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold">Filing queue</h1>
        <p className="text-sm text-muted">
          {queue.length} return(s) awaiting action.
        </p>

        <Section title="Needs action" filings={queue} empty="Nothing in the queue." />
        <Section title="Filed / completed" filings={done} empty="No filed returns yet." />
      </main>
    </>
  );
}

function Section({
  title,
  filings,
  empty,
}: {
  title: string;
  filings: {
    id: string;
    taxYear: number;
    filerType: string;
    status: string;
    computed: string;
    submittedAt: Date | null;
    user: { name: string; email: string };
  }[];
  empty: string;
}) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
        {title}
      </h2>
      {filings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-muted">
          {empty}
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-2">Taxpayer</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Payable / refund</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filings.map((f) => {
                const c = parseComputed(f.computed);
                const owed = (c?.taxPayable ?? 0) > 0;
                return (
                  <tr key={f.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">{f.user.name}</p>
                      <p className="text-xs text-muted">{f.user.email}</p>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {FILER_TYPE_LABELS[f.filerType]}
                    </td>
                    <td className="px-4 py-3">
                      {c
                        ? `${owed ? "Payable" : "Refund"} ${formatPKR(
                            owed ? c.taxPayable : c.refundDue,
                          )}`
                        : "—"}
                    </td>
                    <td className="px-4 py-3">{STATUS_LABELS[f.status]}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/${f.id}`}
                        className="rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-700"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
