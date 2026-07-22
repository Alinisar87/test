"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AuthState } from "@/app/actions/auth";
import { useT } from "./LanguageProvider";

type Action = (prev: AuthState, formData: FormData) => Promise<AuthState>;

export function AuthForm({
  mode,
  action,
}: {
  mode: "login" | "register";
  action: Action;
}) {
  const { t } = useT();
  const [state, formAction, pending] = useActionState(action, {});
  const isRegister = mode === "register";

  return (
    <form action={formAction} className="space-y-4">
      {state.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 ring-1 ring-red-200">
          {state.error}
        </p>
      )}

      {isRegister && (
        <Field label={t("auth.name")} name="name" type="text" autoComplete="name" required />
      )}
      <Field label={t("auth.email")} name="email" type="email" autoComplete="email" required />
      {isRegister && (
        <Field
          label={t("auth.phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+92 3XX XXXXXXX"
          hint={t("auth.phoneHint")}
        />
      )}
      <Field
        label={t("auth.password")}
        name="password"
        type="password"
        autoComplete={isRegister ? "new-password" : "current-password"}
        required
        hint={isRegister ? t("auth.passwordHint") : undefined}
      />

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {pending
          ? t("auth.pleaseWait")
          : isRegister
            ? t("auth.createBtn")
            : t("auth.loginBtn")}
      </button>

      <p className="text-center text-sm text-muted">
        {isRegister ? (
          <>
            {t("auth.haveAccount")}{" "}
            <Link href="/login" className="font-medium text-brand-700 hover:underline">
              {t("auth.loginBtn")}
            </Link>
          </>
        ) : (
          <>
            {t("auth.newHere")}{" "}
            <Link href="/register" className="font-medium text-brand-700 hover:underline">
              {t("auth.createBtn")}
            </Link>
          </>
        )}
      </p>
    </form>
  );
}

function Field({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
