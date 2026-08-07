"use client";

import { useActionState } from "react";
import { login } from "./actions";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null);

  return (
    <main className="min-h-screen bg-paper text-ink flex items-center justify-center px-5">
      <form
        action={formAction}
        className="w-full max-w-[320px] text-[13px] leading-[1.5]"
      >
        <h1 className="font-bold mb-[1.45em]">Mohamed-Ali Ltaief — Admin</h1>

        <label className="block mb-[1em]">
          <span className="block mb-1 text-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="username"
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block mb-[1.45em]">
          <span className="block mb-1 text-muted">Password</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        {state?.error ? (
          <p className="mb-[1em] text-accent">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full border border-ink px-2 py-1.5 hover:bg-ink hover:text-white transition-colors disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}
