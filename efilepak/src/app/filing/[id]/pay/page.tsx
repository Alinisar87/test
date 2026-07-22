import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getAuthorizedFiling } from "@/lib/filings";
import { startPayment } from "@/app/actions/filings";
import { priceForFiling, paymentProvider } from "@/lib/payments";
import { getT } from "@/lib/i18n/server";
import { FILER_TYPE_LABELS, formatPKR } from "@/lib/format";

export const metadata = { title: "Payment — eFile Pak" };

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const filing = await getAuthorizedFiling(id);
  if (!filing) notFound();
  if (filing.status !== "DRAFT" && filing.status !== "INFO_NEEDED") {
    redirect(`/filing/${id}`);
  }
  const { t } = await getT();
  const amount = priceForFiling(filing.filerType);
  const isMock = paymentProvider() === "mock";

  return (
    <>
      <Header />
      <main className="mx-auto max-w-md px-4 py-12">
        <Link href={`/filing/${id}`} className="text-sm text-muted hover:text-ink">
          ← {t("common.back")}
        </Link>
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-bold">{t("pay.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("pay.body")}</p>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted">
                {t("pay.fee")} · {FILER_TYPE_LABELS[filing.filerType]}
              </span>
              <span className="text-2xl font-extrabold tabular-nums">
                {formatPKR(amount)}
              </span>
            </div>
          </div>

          <form action={startPayment} className="mt-6">
            <input type="hidden" name="filingId" value={filing.id} />
            <button className="w-full rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
              {t("pay.btn")} · {formatPKR(amount)}
            </button>
          </form>

          <p className="mt-3 text-xs text-muted">{t("pay.note")}</p>
          {isMock && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
              {t("pay.mockNote")}
            </p>
          )}
        </div>
      </main>
    </>
  );
}
