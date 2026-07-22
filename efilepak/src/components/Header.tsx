import Link from "next/link";
import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getSession } from "@/lib/auth";
import { getT } from "@/lib/i18n/server";

export async function Header() {
  const session = await getSession();
  const { t } = await getT();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Brand />
        <nav className="flex items-center gap-3 text-sm font-medium">
          <LanguageSwitcher />
          {session ? (
            <>
              {session.role === "STAFF" && (
                <Link href="/admin" className="text-muted hover:text-ink">
                  {t("nav.admin")}
                </Link>
              )}
              <Link href="/dashboard" className="text-muted hover:text-ink">
                {t("nav.dashboard")}
              </Link>
              <form action="/api/logout" method="post">
                <button className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50">
                  {t("nav.logout")}
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-muted hover:text-ink">
                {t("nav.login")}
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700"
              >
                {t("nav.getStarted")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
