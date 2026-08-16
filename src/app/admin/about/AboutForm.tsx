"use client";

import { useActionState, useState } from "react";
import type { Profile } from "@/types/profile";
import { saveProfile } from "./actions";
import { YearTextListEditor } from "./YearTextListEditor";

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300";

export function AboutForm({ profile }: { profile: Profile }) {
  const [state, formAction, pending] = useActionState(saveProfile, null);

  const [name, setName] = useState(profile.name);
  const [tagline, setTagline] = useState(profile.tagline);
  const [email, setEmail] = useState(profile.email);
  const [bioPdfUrl, setBioPdfUrl] = useState(profile.bio_pdf_url);
  const [deutschUrl, setDeutschUrl] = useState(profile.deutsch_url);
  const [worksTitle, setWorksTitle] = useState(profile.works_title);
  const [lecturesTitle, setLecturesTitle] = useState(profile.lectures_title);
  const [awardsTitle, setAwardsTitle] = useState(profile.awards_title);
  const [residenciesTitle, setResidenciesTitle] = useState(profile.residencies_title);
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

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Bio</h3>
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

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <label className="mb-4 block">
          <span className={labelClass}>Section title (shown on the public About page)</span>
          <input
            name="works_title"
            required
            value={worksTitle}
            onChange={(e) => setWorksTitle(e.target.value)}
            className={`${inputClass} font-semibold`}
          />
        </label>
        <YearTextListEditor items={works} onChange={setWorks} />
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <label className="mb-4 block">
          <span className={labelClass}>Section title (shown on the public About page)</span>
          <input
            name="lectures_title"
            required
            value={lecturesTitle}
            onChange={(e) => setLecturesTitle(e.target.value)}
            className={`${inputClass} font-semibold`}
          />
        </label>
        <YearTextListEditor items={lectures} onChange={setLectures} />
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <label className="mb-4 block">
          <span className={labelClass}>Section title (shown on the public About page)</span>
          <input
            name="awards_title"
            required
            value={awardsTitle}
            onChange={(e) => setAwardsTitle(e.target.value)}
            className={`${inputClass} font-semibold`}
          />
        </label>
        <YearTextListEditor items={awards} onChange={setAwards} />
      </div>

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <label className="mb-4 block">
          <span className={labelClass}>Section title (shown on the public About page)</span>
          <input
            name="residencies_title"
            required
            value={residenciesTitle}
            onChange={(e) => setResidenciesTitle(e.target.value)}
            className={`${inputClass} font-semibold`}
          />
        </label>
        <YearTextListEditor items={residencies} onChange={setResidencies} />
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
