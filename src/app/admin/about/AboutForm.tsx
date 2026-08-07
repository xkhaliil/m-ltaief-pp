"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { Profile } from "@/types/profile";
import { saveProfile } from "./actions";
import { YearTextListEditor } from "./YearTextListEditor";

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
    <form action={formAction} className="max-w-[720px] text-[13px] leading-[1.5]">
      <input type="hidden" name="works" value={JSON.stringify(works)} readOnly />
      <input type="hidden" name="lectures" value={JSON.stringify(lectures)} readOnly />
      <input type="hidden" name="awards" value={JSON.stringify(awards)} readOnly />
      <input type="hidden" name="residencies" value={JSON.stringify(residencies)} readOnly />

      <div className="flex items-center justify-between mb-[1.45em]">
        <h1 className="font-bold">About / CV</h1>
        <Link href="/admin" className="text-muted hover:text-accent transition-colors">
          ← Back
        </Link>
      </div>

      <div className="space-y-[1.1em]">
        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Name</span>
          <input
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Tagline</span>
          <input
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Lives and works between Berlin and Tunis"
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Email</span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Biography PDF link</span>
          <input
            name="bio_pdf_url"
            value={bioPdfUrl}
            onChange={(e) => setBioPdfUrl(e.target.value)}
            placeholder="https://…"
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">
            &quot;Auf Deutsch&quot; link (optional)
          </span>
          <input
            name="deutsch_url"
            value={deutschUrl}
            onChange={(e) => setDeutschUrl(e.target.value)}
            placeholder="https://…"
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <YearTextListEditor
          label="Selected performance / theater & project(s)"
          items={works}
          onChange={setWorks}
        />
        <YearTextListEditor
          label="Selected lecture performances"
          items={lectures}
          onChange={setLectures}
        />
        <YearTextListEditor label="Awards and Grants" items={awards} onChange={setAwards} />
        <YearTextListEditor
          label="Fellowships / Residencies"
          items={residencies}
          onChange={setResidencies}
        />

        {state?.error ? <p className="text-accent">{state.error}</p> : null}
        {state?.success ? <p className="text-muted">Saved.</p> : null}

        <div className="pt-[0.5em]">
          <button
            type="submit"
            disabled={pending}
            className="border border-ink px-3 py-1.5 hover:bg-ink hover:text-white transition-colors disabled:opacity-50"
          >
            {pending ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
}
