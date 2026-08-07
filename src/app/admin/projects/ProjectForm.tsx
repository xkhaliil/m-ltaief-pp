"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { Project, ProjectLink, ProjectSection } from "@/types/project";
import { saveProject } from "./actions";
import { StringListEditor } from "./StringListEditor";
import { LinksEditor } from "./LinksEditor";
import { GalleryEditor } from "./GalleryEditor";

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
  paragraphs: [],
  videos: [],
  meta: "",
  gallery: [],
};

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
  const [paragraphs, setParagraphs] = useState<string[]>(initial.paragraphs);
  const [videos, setVideos] = useState<string[]>(initial.videos);
  const [meta, setMeta] = useState(initial.meta);
  const [gallery, setGallery] = useState<string[]>(initial.gallery);

  return (
    <form action={formAction} className="max-w-[720px] text-[13px] leading-[1.5]">
      <input type="hidden" name="originalId" value={initial.id} />
      <input type="hidden" name="sub_lines" value={JSON.stringify(subLines)} readOnly />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} readOnly />
      <input type="hidden" name="links" value={JSON.stringify(links)} readOnly />
      <input type="hidden" name="paragraphs" value={JSON.stringify(paragraphs)} readOnly />
      <input type="hidden" name="videos" value={JSON.stringify(videos)} readOnly />
      <input type="hidden" name="gallery" value={JSON.stringify(gallery)} readOnly />

      <div className="flex items-center justify-between mb-[1.45em]">
        <h1 className="font-bold">{isNew ? "New project" : "Edit project"}</h1>
        <Link href="/admin" className="text-muted hover:text-accent transition-colors">
          ← Back
        </Link>
      </div>

      <div className="space-y-[1.1em]">
        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">
            Internal ID (slug — used in the URL, keep it stable once published)
          </span>
          <input
            name="id"
            required
            pattern="[a-z0-9-]+"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent font-mono"
          />
        </label>

        <div className="flex gap-4">
          <label className="block flex-1">
            <span className="block mb-1 text-muted text-[12px]">Section</span>
            <select
              name="section"
              value={section}
              onChange={(e) => setSection(e.target.value as ProjectSection)}
              className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent bg-white"
            >
              {SECTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block w-[120px]">
            <span className="block mb-1 text-muted text-[12px]">Order</span>
            <input
              type="number"
              name="position"
              value={position}
              onChange={(e) => setPosition(Number(e.target.value))}
              className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Title</span>
          <input
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">
            Menu label (optional — only if it should read differently in the side menu than the title)
          </span>
          <input
            name="nav_label"
            value={navLabel}
            onChange={(e) => setNavLabel(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <StringListEditor
          label="Info lines"
          hint="Venue, date, subtitle — shown under the title, one line each."
          items={lines}
          onChange={setLines}
        />

        <StringListEditor
          label="Menu sub-lines"
          hint="Extra line(s) shown under this item in the side menu (e.g. an Arabic title)."
          items={subLines}
          onChange={setSubLines}
        />

        <LinksEditor items={links} onChange={setLinks} />

        <StringListEditor
          label="Paragraphs"
          hint="Body text, one paragraph per box."
          items={paragraphs}
          onChange={setParagraphs}
          multiline
        />

        <StringListEditor
          label="Vimeo video IDs"
          hint="Just the number from the vimeo.com link, e.g. 1215280534."
          items={videos}
          onChange={setVideos}
          placeholder="1215280534"
        />

        <label className="block">
          <span className="block mb-1 text-muted text-[12px]">Credits / metadata</span>
          <textarea
            name="meta"
            rows={3}
            value={meta}
            onChange={(e) => setMeta(e.target.value)}
            className="w-full border border-border px-2 py-1.5 outline-none focus:border-accent"
          />
        </label>

        <GalleryEditor projectId={id} items={gallery} onChange={setGallery} />

        {state?.error ? <p className="text-accent">{state.error}</p> : null}

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
