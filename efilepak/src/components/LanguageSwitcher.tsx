"use client";

import { useT } from "./LanguageProvider";
import { LANGS } from "@/lib/i18n/dictionary";

export function LanguageSwitcher() {
  const { lang } = useT();

  function setLang(next: string) {
    if (next === lang) return;
    // Non-HttpOnly cookie so the layout can read it on the next server render.
    document.cookie = `efp_lang=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    window.location.reload();
  }

  return (
    <div className="inline-flex overflow-hidden rounded-lg border border-slate-300 text-xs">
      {LANGS.map((l) => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-2.5 py-1 font-medium ${
            l.code === lang ? "bg-brand-600 text-white" : "bg-white text-muted hover:bg-slate-50"
          }`}
          aria-pressed={l.code === lang}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
