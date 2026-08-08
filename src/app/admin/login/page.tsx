"use client";

import { useActionState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center px-5">
      <ThemeToggle className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors" />
      <form
        action={formAction}
        className="w-full max-w-[360px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Mohamed-Ali Ltaief</h1>
        <p className="mt-1 mb-6 text-sm text-slate-500 dark:text-slate-400">Sign in to manage the site.</p>

        <label className="block mb-4">
          <span className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
          />
        </label>

        <label className="block mb-6">
          <span className="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
          />
        </label>

        {state?.error ? (
          <p className="mb-4 rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-slate-900 dark:bg-white px-3 py-2 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
