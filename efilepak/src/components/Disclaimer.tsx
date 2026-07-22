"use client";

import { useT } from "./LanguageProvider";

export function Disclaimer({ className = "" }: { className?: string }) {
  const { t } = useT();
  return (
    <p
      className={`rounded-lg bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-800 ring-1 ring-amber-200 ${className}`}
    >
      {t("disclaimer")}
    </p>
  );
}
