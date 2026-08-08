"use client";

import { useActionState, useState } from "react";
import type { ContentBlock, Project, ProjectLink, ProjectSection } from "@/types/project";
import { saveProject } from "./actions";
import { StringListEditor } from "./StringListEditor";
import { LinksEditor } from "./LinksEditor";
import { GalleryEditor } from "./GalleryEditor";
import { ContentBlocksEditor } from "./ContentBlocksEditor";

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
  nav_label: null,
  sub_lines: [],
  lines: [],
  links: [],
  content: [],
  videos: [],
  meta: "",
  gallery: [],
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900";
const labelClass = "mb-1.5 block text-xs font-medium text-slate-700";
const cardClass = "rounded-lg border border-slate-200 bg-white p-4 sm:p-5";

export function ProjectForm({ project }: { project: Project | null }) {
  const isNew = !project;
  const initial = project ?? EMPTY;

  const [state, formAction, pending] = useActionState(saveProject, null);

  const [id, setId] = useState(initial.id);
  const [section, setSection] = useState<ProjectSection>(initial.section);
  const [position, setPosition] = useState(initial.position);
  const [title, setTitle] = useState(initial.title);
  const [navLabel, setNavLabel] = useState(initial.nav_label ?? "");
  const [subLines, setSubLines] = useState<string[]>(initial.sub_lines);
  const [lines, setLines] = useState<string[]>(initial.lines);
  const [links, setLinks] = useState<ProjectLink[]>(initial.links);
  const [content, setContent] = useState<ContentBlock[]>(initial.content);
  const [videos, setVideos] = useState<string[]>(initial.videos);
  const [meta, setMeta] = useState(initial.meta);
  const [gallery, setGallery] = useState<string[]>(initial.gallery);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="originalId" value={initial.id} />
      <input type="hidden" name="sub_lines" value={JSON.stringify(subLines)} readOnly />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} readOnly />
      <input type="hidden" name="links" value={JSON.stringify(links)} readOnly />
      <input type="hidden" name="content" value={JSON.stringify(content)} readOnly />
      <input type="hidden" name="videos" value={JSON.stringify(videos)} readOnly />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} readOnly />

      <div className={cardClass}>
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Details</h3>
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

          <label className="block">
            <span className={labelClass}>Title</span>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />
          </label>

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

      <ContentBlocksEditor blocks={content} images={gallery} onChange={setContent} />

      <div className={cardClass}>
        <StringListEditor
          label="Video links"
          hint="A Vimeo or YouTube link (e.g. https://vimeo.com/1215280534), or just the Vimeo ID (e.g. 1215280534)."
          items={videos}
          onChange={setVideos}
          placeholder="https://vimeo.com/1215280534"
        />
      </div>

      <div className={cardClass}>
        <label className="block">
          <span className={labelClass}>Credits / metadata</span>
          <textarea
            name="meta"
            rows={3}
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {state?.error ? (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{state.error}</p>
      ) : null}

      <div className="sticky bottom-4 flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : isNew ? "Create project" : "Save"}
        </button>
      </div>
    </form>
  );
}
