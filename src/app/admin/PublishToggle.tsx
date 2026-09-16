"use client";

import { useTransition } from "react";

// Online/offline switch shown next to a project in the dashboard list.
// Saves immediately rather than waiting for a form submit — it's a single
// reversible flag, and the row it belongs to has no Save button of its own.
export function PublishToggle({
  published,
  onToggle,
}: {
  published: boolean;
  onToggle: (next: boolean) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={published}
      disabled={pending}
      onClick={() => startTransition(() => onToggle(!published))}
      title={published ? "Visible on the site — click to take it offline" : "Hidden from the site — click to put it back online"}
      className={`flex items-center gap-1.5 rounded-full border px-2 py-0.5 transition-colors disabled:opacity-50 ${
        published
          ? "border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
          : "border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${published ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-600"}`}
      />
      {pending ? "…" : published ? "Online" : "Offline"}
    </button>
  );
}
