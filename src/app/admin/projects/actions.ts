"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectLink, ProjectSection } from "@/types/project";

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
  const meta = String(formData.get("meta") ?? "");

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
  const paragraphs = parseJsonArray<string>(formData, "paragraphs").filter(Boolean);
  const videos = parseJsonArray<string>(formData, "videos").filter(Boolean);
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
    paragraphs,
    videos,
    meta,
    gallery,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}
