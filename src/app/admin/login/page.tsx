"use client";

import { useActionState } from "react";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-5">
      <form
        action={formAction}
        className="w-full max-w-[360px] rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <h1 className="text-lg font-semibold text-slate-900">Mohamed-Ali Ltaief</h1>
        <p className="mt-1 mb-6 text-sm text-slate-500">Sign in to manage the site.</p>

        <label className="block mb-4">
          <span className="mb-1.5 block text-xs font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </label>

        <label className="block mb-6">
          <span className="mb-1.5 block text-xs font-medium text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
          />
        </label>

        {state?.error ? (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
