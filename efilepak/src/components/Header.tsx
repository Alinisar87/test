import Link from "next/link";
import { Brand } from "./Brand";
import { getSession } from "@/lib/auth";

export async function Header() {
  const session = await getSession();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Brand />
        <nav className="flex items-center gap-3 text-sm font-medium">
          {session ? (
            <>
              {session.role === "STAFF" && (
                <Link href="/admin" className="text-muted hover:text-ink">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="text-muted hover:text-ink">
                Dashboard
              </Link>
              <form action="/api/logout" method="post">
                <button className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-muted hover:text-ink">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-brand-600 px-3 py-1.5 text-white hover:bg-brand-700"
              >
                Get started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
