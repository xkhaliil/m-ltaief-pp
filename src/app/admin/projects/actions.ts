"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem, ContentRow, ProjectLink, ProjectSection, RowLayout } from "@/types/project";
import { ROW_LAYOUTS } from "@/lib/content-rows";
import { sanitizeRichText } from "@/lib/sanitize-html";

const SECTIONS: ProjectSection[] = [
  "main",
  "motus",
  "lecture-performance",
  "writing-publishing",
  "archive",
];

function parseJsonArray<T>(formData: FormData, key: string): T[] {
  const raw = formData.get(key);
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function defaultLayoutForCount(count: number): RowLayout {
  if (count <= 1) return "full";
  if (count === 2) return "half-half";
  return "thirds";
}

function sanitizeItem(item: unknown): ContentItem | null {
  if (!item || typeof item !== "object") return null;
  const i = item as Record<string, unknown>;
  // Text items are authored with a rich-text editor (TipTap) and stored as
  // HTML — this is the actual trust boundary before that HTML is later
  // rendered with dangerouslySetInnerHTML on the public site.
  if (i.type === "text" && typeof i.text === "string") {
    const text = sanitizeRichText(i.text).trim();
    return text ? { type: "text", text } : null;
  }
  if (i.type === "image" && typeof i.src === "string" && i.src.trim()) {
    return { type: "image", src: i.src.trim() };
  }
  if (i.type === "video" && typeof i.src === "string" && i.src.trim()) {
    return { type: "video", src: i.src.trim() };
  }
  return null;
}

// Defense in depth: the admin editor keeps each row's item count in sync
// with its layout as you edit, but this is the one place that actually
// decides what gets persisted, so it re-validates rather than trusting the
// client — drops empty items/rows and corrects any row whose layout
// doesn't match its (post-cleanup) item count.
function sanitizeRows(raw: unknown[]): ContentRow[] {
  const rows: ContentRow[] = [];
  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, unknown>;
    if (typeof r.id !== "string" || !Array.isArray(r.items)) continue;

    const items = r.items
      .map(sanitizeItem)
      .filter((item): item is ContentItem => item !== null)
      .slice(0, 3);
    if (items.length === 0) continue;

    const requestedLayout = typeof r.layout === "string" ? (r.layout as RowLayout) : undefined;
    const layout =
      requestedLayout && ROW_LAYOUTS[requestedLayout]?.fractions.length === items.length
        ? requestedLayout
        : defaultLayoutForCount(items.length);

    rows.push({ id: r.id, layout, items });
  }
  return rows;
}

export async function saveProject(
  _prevState: { error: string } | null,
  formData: FormData,
) {
  const originalId = String(formData.get("originalId") ?? "");
  const id = String(formData.get("id") ?? "").trim();
  const section = String(formData.get("section") ?? "main") as ProjectSection;
  const position = Number(formData.get("position") ?? 0);
  const title = String(formData.get("title") ?? "").trim();
  const navLabelRaw = String(formData.get("nav_label") ?? "").trim();
  // Authored with the same rich-text editor as content-row text items —
  // same trust boundary before it's later rendered with dangerouslySetInnerHTML.
  const meta = sanitizeRichText(String(formData.get("meta") ?? "")).trim();

  if (!id) return { error: "Internal ID is required." };
  if (!/^[a-z0-9-]+$/.test(id)) {
    return { error: "Internal ID may only contain lowercase letters, numbers, and hyphens." };
  }
  if (!title) return { error: "Title is required." };
  if (!SECTIONS.includes(section)) return { error: "Invalid section." };

  const subLines = parseJsonArray<string>(formData, "sub_lines");
  const lines = parseJsonArray<string>(formData, "lines");
  const links = parseJsonArray<ProjectLink>(formData, "links").filter(
    (l) => l && l.label && l.href,
  );
  const content = sanitizeRows(parseJsonArray<unknown>(formData, "content"));
  // Video links now live as items inside content rows — always cleared on
  // save so a project never double-counts an old video once it's been
  // folded into the new editor.
  const videos: string[] = [];
  const gallery = parseJsonArray<string>(formData, "gallery").filter(Boolean);

  const supabase = await createClient();

  if (originalId && originalId !== id) {
    const { error: renameError } = await supabase
      .from("projects")
      .update({ id })
      .eq("id", originalId);
    if (renameError) return { error: renameError.message };
  }

  const { error } = await supabase.from("projects").upsert({
    id,
    section,
    position: Number.isFinite(position) ? position : 0,
    title,
    nav_label: navLabelRaw || null,
    sub_lines: subLines,
    lines,
    links,
    content,
    videos,
    meta,
    gallery,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
