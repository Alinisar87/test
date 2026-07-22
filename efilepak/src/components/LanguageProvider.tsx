"use client";

import { createContext, useContext } from "react";
import { translate, type Lang } from "@/lib/i18n/shared";

interface Ctx {
  lang: Lang;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<Ctx>({
  lang: "en",
  t: (k) => translate("en", k),
});

export function LanguageProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(lang, key, vars);
  return (
    <LanguageContext.Provider value={{ lang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  return useContext(LanguageContext);
}
