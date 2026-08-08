"use client";

import { useActionState, useState } from "react";
import type { Profile } from "@/types/profile";
import { saveHomepage } from "./actions";

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300";

export function HomepageForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(saveHomepage, null);

  const [indexLabel, setIndexLabel] = useState(profile.index_label);
  const [indexSubtitle, setIndexSubtitle] = useState(profile.index_subtitle);

  return (
    <form action={formAction} className="space-y-5">
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Index heading</h3>
        <div className="space-y-4">
          <label className="block">
            <span className={labelClass}>Label</span>
            <input
              name="index_label"
              required
              value={indexLabel}
              onChange={(e) => setIndexLabel(e.target.value)}
              placeholder="/ˈɪndɛks/"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Subtitle</span>
            <input
              name="index_subtitle"
              required
              value={indexSubtitle}
              onChange={(e) => setIndexSubtitle(e.target.value)}
              placeholder="Selected works, 2011 — 2026"
              className={inputClass}
            />
          </label>
        </div>
      </div>

      {state?.error ? (
        <p className="rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">Saved.</p>
      ) : null}

      <div className="sticky bottom-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
