import Link from "next/link";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/auth";

const steps = [
  {
    title: "Answer a short questionnaire",
    body: "No tax jargon. We ask plain questions about your salary, business, property and bank deductions.",
  },
  {
    title: "Upload your documents",
    body: "Salary certificate, tax deduction certificates, bank statements — snap a photo or drop a PDF.",
  },
  {
    title: "We prepare & file",
    body: "Our team reviews your figures, prepares your return and wealth statement, and files it on FBR IRIS.",
  },
];

const faqs = [
  {
    q: "Do you file directly with FBR?",
    a: "Yes. You complete the questionnaire and uploads; our tax team verifies everything and files your return and wealth statement on the FBR IRIS portal on your behalf. You get the filed acknowledgement.",
  },
  {
    q: "Who is this for?",
    a: "Tax Year 2026 returns for salaried individuals, self-employed / business individuals, and Associations of Persons (AOPs).",
  },
  {
    q: "Is my information secure?",
    a: "Your data is stored against your private account and only used to prepare your return. You control what you submit.",
  },
  {
    q: "How is my tax calculated?",
    a: "We apply the Finance Act 2025 (Tax Year 2026) slab rates, deductible allowances, tax credits and adjust for tax already withheld — then a professional reviews it before filing.",
  },
];

export default async function HomePage() {
  const session = await getSession();
  const primaryHref = session ? "/dashboard" : "/register";

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-16 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
            FBR e-filing is now mandatory for individuals — Tax Year 2026
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            File your Pakistan tax return
            <br />
            <span className="text-brand-600">without the headache</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            Answer a few simple questions, upload your documents, and our team
            prepares and files your income tax return with FBR. Become a filer
            and stay on the Active Taxpayer List — the easy way.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="w-full rounded-xl bg-brand-600 px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-brand-700 sm:w-auto"
            >
              Start my return
            </Link>
            <Link
              href="#how"
              className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-ink hover:bg-slate-50 sm:w-auto"
            >
              How it works
            </Link>
          </div>
          <p className="mt-4 text-xs text-muted">
            Deadline for Tax Year 2026 returns: 30 September 2026.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Three steps to filed
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who / value */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            ["Salaried", "One salary certificate and your withholding — done in minutes."],
            ["Business & self-employed", "Report business income, expenses and advance tax paid."],
            ["AOP", "Association of Persons returns handled end to end."],
          ].map(([t, b]) => (
            <div key={t} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-brand-700">{t}</h3>
              <p className="mt-2 text-sm text-muted">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            Questions, answered
          </h2>
          <div className="mt-8 divide-y divide-slate-200">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:content-none">
                  <span className="flex items-center justify-between">
                    {f.q}
                    <span className="text-brand-600 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-brand-600 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">Ready to become a filer?</h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-50">
            Create your account and start your Tax Year 2026 return now.
          </p>
          <Link
            href={primaryHref}
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
          >
            Start my return
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted">
          <p>
            eFile Pak is a tax-preparation and filing service. It is not
            affiliated with or endorsed by the Federal Board of Revenue (FBR).
            Tax computations are estimates for review; a professional verifies
            every return before filing.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} eFile Pak. Built by Markup Valley.
          </p>
        </div>
      </footer>
    </>
  );
}
