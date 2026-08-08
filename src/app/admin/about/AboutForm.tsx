"use client";

import { useActionState, useState } from "react";
import type { Profile } from "@/types/profile";
import { saveProfile } from "./actions";
import { YearTextListEditor } from "./YearTextListEditor";

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-700";

export function AboutForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(saveProfile, null);

  const [name, setName] = useState(profile.name);
  const [tagline, setTagline] = useState(profile.tagline);
  const [email, setEmail] = useState(profile.email);
  const [bioPdfUrl, setBioPdfUrl] = useState(profile.bio_pdf_url);
  const [deutschUrl, setDeutschUrl] = useState(profile.deutsch_url);
  const [works, setWorks] = useState(profile.works);
  const [lectures, setLectures] = useState(profile.lectures);
  const [awards, setAwards] = useState(profile.awards);
  const [residencies, setResidencies] = useState(profile.residencies);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="works" value={JSON.stringify(works)} readOnly />
      <input type="hidden" name="lectures" value={JSON.stringify(lectures)} readOnly />
      <input type="hidden" name="awards" value={JSON.stringify(awards)} readOnly />
      <input type="hidden" name="residencies" value={JSON.stringify(residencies)} readOnly />

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Bio</h3>
        <div className="space-y-4">
          <label className="block">
            <span className={labelClass}>Name</span>
            <input
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Tagline</span>
            <input
              name="tagline"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Lives and works between Berlin and Tunis"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Email</span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Biography PDF link</span>
            <input
              name="bio_pdf_url"
              value={bioPdfUrl}
              onChange={(e) => setBioPdfUrl(e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>&quot;Auf Deutsch&quot; link (optional)</span>
            <input
              name="deutsch_url"
              value={deutschUrl}
              onChange={(e) => setDeutschUrl(e.target.value)}
              placeholder="https://…"
              className={inputClass}
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <YearTextListEditor
          label="Selected performance / theater & project(s)"
          items={works}
          onChange={setWorks}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <YearTextListEditor
          label="Selected lecture performances"
          items={lectures}
          onChange={setLectures}
        />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <YearTextListEditor label="Awards and Grants" items={awards} onChange={setAwards} />
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <YearTextListEditor
          label="Fellowships / Residencies"
          items={residencies}
          onChange={setResidencies}
        />
      </div>

      {state?.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Saved.</p>
      ) : null}

      <div className="sticky bottom-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
