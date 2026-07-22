import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";
import { createFiling } from "@/app/actions/filings";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Start a return — eFile Pak" };

export default async function NewFilingPage() {
  if (!(await getSession())) redirect("/login");
  const { t } = await getT();

  const options = [
    { value: "SALARIED", label: t("wiz.salaried"), hint: t("wiz.salariedHint") },
    { value: "BUSINESS", label: t("wiz.business"), hint: t("wiz.businessHint") },
    { value: "FREELANCER", label: t("wiz.freelancer"), hint: t("wiz.freelancerHint") },
    { value: "AOP", label: t("wiz.aop"), hint: t("wiz.aopHint") },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">{t("wiz.newTitle")}</h1>
        <p className="mt-1 text-sm text-muted">{t("wiz.newSub")}</p>

        <form action={createFiling} className="mt-8 space-y-3">
          <input type="hidden" name="taxYear" value="2026" />
          {options.map((o) => (
            <label
              key={o.value}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-brand-400 has-[:checked]:border-brand-500 has-[:checked]:ring-2 has-[:checked]:ring-brand-200"
            >
              <input
                type="radio"
                name="filerType"
                value={o.value}
                defaultChecked={o.value === "SALARIED"}
                className="mt-1 h-4 w-4 accent-brand-600"
              />
              <span>
                <span className="block font-semibold">{o.label}</span>
                <span className="block text-sm text-muted">{o.hint}</span>
              </span>
            </label>
          ))}

          <button className="mt-4 w-full rounded-xl bg-brand-600 px-5 py-3 font-semibold text-white hover:bg-brand-700">
            {t("wiz.continue")}
          </button>
        </form>
      </main>
    </>
  );
}
