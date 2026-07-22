import { redirect } from "next/navigation";
import { Brand } from "@/components/Brand";
import { AuthForm } from "@/components/AuthForm";
import { registerAction } from "@/app/actions/auth";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Create account — eFile Pak" };

export default async function RegisterPage() {
  if (await getSession()) redirect("/dashboard");
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Brand className="justify-center" />
        <h1 className="mt-6 text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted">
          Start your Tax Year 2026 return in minutes.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="register" action={registerAction} />
      </div>
    </main>
  );
}
