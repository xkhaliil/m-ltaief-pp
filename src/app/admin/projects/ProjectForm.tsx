"use client";

import { useActionState, useState } from "react";
import type { ContentRow, Project, ProjectLink, ProjectSection } from "@/types/project";
import { normalizeContent } from "@/lib/content-rows";
import { saveProject } from "./actions";
import { StringListEditor } from "./StringListEditor";
import { LinksEditor } from "./LinksEditor";
import { GalleryEditor } from "./GalleryEditor";
import { ContentRowsEditor } from "./ContentRowsEditor";
import { RichTextEditor } from "@/components/RichTextEditor";
import { FontPickerInput } from "@/components/FontPickerInput";

const SECTIONS: { value: ProjectSection; label: string }[] = [
  { value: "main", label: "Main index" },
  { value: "motus", label: "Motus" },
  { value: "lecture-performance", label: "Lecture Performance / Panel" },
  { value: "writing-publishing", label: "Writing / Publishing Practice" },
  { value: "archive", label: "Archive" },
];

const EMPTY: Project = {
  id: "",
  section: "main",
  position: 0,
  title: "",
  title_font: null,
  nav_label: null,
  sub_lines: [],
  lines: [],
  links: [],
  content: [],
  videos: [],
  meta: "",
  gallery: [],
  thumbnail_url: null,
};

const inputClass =
  "w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300";
const cardClass = "rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5";

export function ProjectForm({ project }: { project: Project | null }) {
  const isNew = !project;
  const initial = project ?? EMPTY;

  const [state, formAction, pending] = useActionState(saveProject, null);

  const [id, setId] = useState(initial.id);
  const [section, setSection] = useState<ProjectSection>(initial.section);
  const [position, setPosition] = useState(initial.position);
  const [title, setTitle] = useState(initial.title);
  const [titleFont, setTitleFont] = useState<string | null>(initial.title_font);
  const [navLabel, setNavLabel] = useState(initial.nav_label ?? "");
  const [subLines, setSubLines] = useState<string[]>(initial.sub_lines);
  const [lines, setLines] = useState<string[]>(initial.lines);
  const [links, setLinks] = useState<ProjectLink[]>(initial.links);
  // Video links now live inline as items within content rows — this folds
  // any legacy `videos` column entries in as their own rows the first time
  // the project is opened here, and the column is left empty on save.
  const [content, setContent] = useState<ContentRow[]>(() =>
    normalizeContent(initial.content, initial.videos),
  );
  const [meta, setMeta] = useState(initial.meta);
  const [gallery, setGallery] = useState<string[]>(initial.gallery);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="originalId" value={initial.id} />
      <input type="hidden" name="sub_lines" value={JSON.stringify(subLines)} readOnly />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} readOnly />
      <input type="hidden" name="links" value={JSON.stringify(links)} readOnly />
      <input type="hidden" name="content" value={JSON.stringify(content)} readOnly />
      <input type="hidden" name="videos" value="[]" readOnly />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} readOnly />
      <input type="hidden" name="meta" value={meta} readOnly />
      <input type="hidden" name="title_font" value={titleFont ?? ""} readOnly />

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-slate-100">Details</h3>
        <div className="space-y-4">
          <label className="block">
            <span className={labelClass}>
              Internal ID (slug — used in the URL, keep it stable once published)
            </span>
            <input
              name="id"
              required
              pattern="[a-z0-9-]+"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`${inputClass} font-mono`}
            />
          </label>

          <div className="flex gap-4">
            <label className="block flex-1">
              <span className={labelClass}>Section</span>
              <select
                name="section"
                value={section}
                onChange={(e) => setSection(e.target.value as ProjectSection)}
                className={inputClass}
              >
                {SECTIONS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block w-[120px]">
              <span className={labelClass}>Order</span>
              <input
                type="number"
                name="position"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                className={inputClass}
              />
            </label>
          </div>

          <FontPickerInput
            label="Title"
            name="title"
            required
            value={title}
            onChange={setTitle}
            font={titleFont}
            onFontChange={setTitleFont}
            inputClassName={inputClass}
          />

          <label className="block">
            <span className={labelClass}>
              Menu label (optional — only if it should read differently in the side menu than
              the title)
            </span>
            <input
              name="nav_label"
              value={navLabel}
              onChange={(e) => setNavLabel(e.target.value)}
              className={inputClass}
            />
          </label>
        </div>
      </div>

      <div className={cardClass}>
        <StringListEditor
          label="Info lines"
          hint="Venue, date, subtitle — shown under the title, one line each."
          items={lines}
          onChange={setLines}
        />
      </div>

      <div className={cardClass}>
        <StringListEditor
          label="Menu sub-lines"
          hint="Extra line(s) shown under this item in the side menu (e.g. an Arabic title)."
          items={subLines}
          onChange={setSubLines}
        />
      </div>

      <div className={cardClass}>
        <LinksEditor items={links} onChange={setLinks} />
      </div>

      <div className={cardClass}>
        <GalleryEditor projectId={id} items={gallery} onChange={setGallery} />
      </div>

      <ContentRowsEditor rows={content} images={gallery} onChange={setContent} />

      <div className={cardClass}>
        <span className={labelClass}>Credits / metadata</span>
        <RichTextEditor value={meta} onChange={setMeta} placeholder="Credits / metadata…" />
      </div>

      {state?.error ? (
        <p className="rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">{state.error}</p>
      ) : null}

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : isNew ? "Create project" : "Save"}
        </button>
      </div>
    </form>
  );
}
