import type { Metadata } from "next";
import "./globals.css";
import { getLang } from "@/lib/i18n/server";
import { dirFor } from "@/lib/i18n/dictionary";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "eFile Pak — Simple tax return filing for Pakistan",
  description:
    "Answer a few questions, upload your documents, and we prepare and file your FBR income tax return for you.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  return (
    <html lang={lang} dir={dirFor(lang)}>
      <body className="min-h-screen antialiased">
        <LanguageProvider lang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
