"use client";

import { useActionState, useState } from "react";
import type { HomepageHeadingFonts, Profile } from "@/types/profile";
import { saveHomepage } from "./actions";
import { FontPickerInput } from "@/components/FontPickerInput";

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100";

export function HomepageForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(saveHomepage, null);

  const [indexLabel, setIndexLabel] = useState(profile.index_label);
  const [indexSubtitle, setIndexSubtitle] = useState(profile.index_subtitle);
  const [headingFonts, setHeadingFonts] = useState<HomepageHeadingFonts>(
    profile.homepage_heading_fonts ?? {},
  );

  const setFont = (key: keyof HomepageHeadingFonts) => (font: string | null) =>
    setHeadingFonts((prev) => {
      const next = { ...prev };
      if (font) next[key] = font;
      else delete next[key];
      return next;
    });

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="homepage_heading_fonts" value={JSON.stringify(headingFonts)} readOnly />

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Index heading</h3>
        <div className="space-y-4">
          <FontPickerInput
            label="Label"
            name="index_label"
            required
            value={indexLabel}
            onChange={setIndexLabel}
            placeholder="/ˈɪndɛks/"
            font={headingFonts.index_label ?? null}
            onFontChange={setFont("index_label")}
            inputClassName={inputClass}
          />

          <FontPickerInput
            label="Subtitle"
            name="index_subtitle"
            required
            value={indexSubtitle}
            onChange={setIndexSubtitle}
            placeholder="Selected works, 2011 — 2026"
            font={headingFonts.index_subtitle ?? null}
            onFontChange={setFont("index_subtitle")}
            inputClassName={inputClass}
          />
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
