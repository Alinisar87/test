"use client";

import { useT } from "./LanguageProvider";

// Helpline / support details. Wire these to your real channels.
const SUPPORT_PHONE = "+92 300 0000000";
const SUPPORT_EMAIL = "help@efilepak.pk";

export function Support({ className = "" }: { className?: string }) {
  const { t } = useT();
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-5 ${className}`}
    >
      <h3 className="font-semibold">{t("help.title")}</h3>
      <p className="mt-1 text-sm text-muted">{t("help.body")}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm">
        <a
          href={`https://wa.me/${SUPPORT_PHONE.replace(/[^\d]/g, "")}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg bg-brand-600 px-3 py-1.5 font-medium text-white hover:bg-brand-700"
        >
          {t("help.cta")}
        </a>
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="rounded-lg border border-slate-300 px-3 py-1.5 font-medium hover:bg-slate-50"
        >
          {SUPPORT_EMAIL}
        </a>
      </div>
    </div>
  );
}
