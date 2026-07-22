"use client";

import { useEffect, useState } from "react";
import { useT } from "./LanguageProvider";

const DEADLINE = Date.UTC(2026, 8, 30); // 30 September 2026

export function DeadlineBanner({ className = "" }: { className?: string }) {
  const { t } = useT();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const diff = Math.ceil((DEADLINE - Date.now()) / 86_400_000);
    setDaysLeft(diff > 0 ? diff : 0);
  }, []);

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-2 rounded-xl bg-brand-50 px-4 py-2.5 text-sm text-brand-800 ring-1 ring-brand-200 ${className}`}
    >
      <span>{t("deadline.text")}</span>
      {daysLeft !== null && (
        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
          {t("deadline.daysLeft", { n: daysLeft })}
        </span>
      )}
    </div>
  );
}
