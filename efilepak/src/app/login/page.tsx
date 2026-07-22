import { redirect } from "next/navigation";
import { Brand } from "@/components/Brand";
import { AuthForm } from "@/components/AuthForm";
import { loginAction } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Log in — eFile Pak" };

export default async function LoginPage() {
  if (await getSession()) redirect("/dashboard");
  const { t } = await getT();
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Brand className="justify-center" />
        <h1 className="mt-6 text-2xl font-bold">{t("auth.welcomeBack")}</h1>
        <p className="mt-1 text-sm text-muted">{t("auth.loginSub")}</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="login" action={loginAction} />
      </div>
    </main>
  );
}
