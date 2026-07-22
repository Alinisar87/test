import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";
import { createFiling } from "@/app/actions/filings";

export const metadata = { title: "Start a return — eFile Pak" };

const OPTIONS = [
  {
    value: "SALARIED",
    label: "Salaried individual",
    hint: "You earn a salary from employment.",
  },
  {
    value: "BUSINESS",
    label: "Business / self-employed",
    hint: "You run a business or work for yourself.",
  },
  {
    value: "AOP",
    label: "Association of Persons (AOP)",
    hint: "A partnership or joint venture.",
  },
];

export default async function NewFilingPage() {
  if (!(await getSession())) redirect("/login");

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">Start your Tax Year 2026 return</h1>
        <p className="mt-1 text-sm text-muted">
          Choose the option that best describes you. You can change this later.
        </p>

        <form action={createFiling} className="mt-8 space-y-3">
          <input type="hidden" name="taxYear" value="2026" />
          {OPTIONS.map((o) => (
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
            Continue
          </button>
        </form>
      </main>
    </>
  );
}
