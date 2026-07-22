import Link from "next/link";
import { Header } from "@/components/Header";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Support } from "@/components/Support";
import { getSession } from "@/lib/auth";
import { getT } from "@/lib/i18n/server";

export default async function HomePage() {
  const session = await getSession();
  const { t } = await getT();
  const primaryHref = session ? "/dashboard" : "/register";

  const steps = [
    [t("landing.step1t"), t("landing.step1b")],
    [t("landing.step2t"), t("landing.step2b")],
    [t("landing.step3t"), t("landing.step3b")],
  ];
  const why = [
    [t("landing.why1t"), t("landing.why1b")],
    [t("landing.why2t"), t("landing.why2b")],
    [t("landing.why3t"), t("landing.why3b")],
  ];
  const faqs = [
    [t("landing.faq1q"), t("landing.faq1a")],
    [t("landing.faq2q"), t("landing.faq2a")],
    [t("landing.faq3q"), t("landing.faq3a")],
  ];

  return (
    <>
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-14 sm:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
            {t("landing.badge")}
          </span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            {t("landing.h1a")}
            <br />
            <span className="text-brand-600">{t("landing.h1b")}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            {t("landing.sub")}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="w-full rounded-xl bg-brand-600 px-6 py-3 text-center font-semibold text-white shadow-sm hover:bg-brand-700 sm:w-auto"
            >
              {t("landing.startReturn")}
            </Link>
            <Link
              href="#how"
              className="w-full rounded-xl border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-ink hover:bg-slate-50 sm:w-auto"
            >
              {t("landing.howItWorks")}
            </Link>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <DeadlineBanner />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            {t("landing.stepsTitle")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {steps.map(([title, body], i) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us (vs FBR's free form) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight">
          {t("landing.whyTitle")}
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {why.map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="font-semibold text-brand-700">{title}</h3>
              <p className="mt-2 text-sm text-muted">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-center text-2xl font-bold tracking-tight">
            {t("landing.faqTitle")}
          </h2>
          <div className="mt-8 divide-y divide-slate-200">
            {faqs.map(([q, a]) => (
              <details key={q} className="group py-4">
                <summary className="cursor-pointer list-none font-medium marker:content-none">
                  <span className="flex items-center justify-between">
                    {q}
                    <span className="text-brand-600 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-2 text-sm text-muted">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-8">
            <Support />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl bg-brand-600 px-6 py-12 text-center text-white">
          <h2 className="text-2xl font-bold">{t("landing.ctaTitle")}</h2>
          <p className="mx-auto mt-2 max-w-xl text-brand-50">{t("landing.ctaSub")}</p>
          <Link
            href={primaryHref}
            className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-brand-700 hover:bg-brand-50"
          >
            {t("landing.startReturn")}
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-muted">
          <p>{t("landing.footerDisclaimer")}</p>
          <p className="mt-2">© 2026 eFile Pak · Markup Valley</p>
        </div>
      </footer>
    </>
  );
}
