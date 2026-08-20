"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { CvRow, HeadingFonts } from "@/types/profile";

const HEADING_FONT_KEYS: (keyof HeadingFonts)[] = [
  "name",
  "tagline",
  "works_title",
  "lectures_title",
  "awards_title",
  "residencies_title",
];

function parseHeadingFonts(formData: FormData): HeadingFonts {
  const raw = formData.get("heading_fonts");
  if (typeof raw !== "string" || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const fonts: HeadingFonts = {};
    for (const key of HEADING_FONT_KEYS) {
      const value = (parsed as Record<string, unknown>)[key];
      if (typeof value === "string" && value.trim()) fonts[key] = value.trim();
    }
    return fonts;
  } catch {
    return {};
  }
}

function parseRows(formData: FormData, key: string): CvRow[] {
  const raw = formData.get(key);
  if (typeof raw !== "string" || !raw.trim()) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (row): row is CvRow =>
          row &&
          typeof row.year === "string" &&
          typeof row.text === "string" &&
          // A row needs either a title or a location to be worth keeping —
          // the structured fields let location/city/country carry an entry
          // on their own, with no title text.
          (row.text.trim() || (typeof row.location === "string" && row.location.trim())),
      )
      .map((row) => ({
        year: row.year,
        text: row.text,
        ...(typeof row.location === "string" && row.location.trim() ? { location: row.location.trim() } : {}),
        ...(typeof row.city === "string" && row.city.trim() ? { city: row.city.trim() } : {}),
        ...(typeof row.country === "string" && row.country.trim() ? { country: row.country.trim() } : {}),
        ...(typeof row.url === "string" && row.url.trim() ? { url: row.url.trim() } : {}),
      }));
  } catch {
    return [];
  }
}

export async function saveProfile(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("profile").upsert({
    id: 1,
    name: String(formData.get("name") ?? "").trim(),
    tagline: String(formData.get("tagline") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    bio_pdf_url: String(formData.get("bio_pdf_url") ?? "").trim(),
    deutsch_url: String(formData.get("deutsch_url") ?? "").trim(),
    works_title: String(formData.get("works_title") ?? "").trim(),
    lectures_title: String(formData.get("lectures_title") ?? "").trim(),
    awards_title: String(formData.get("awards_title") ?? "").trim(),
    residencies_title: String(formData.get("residencies_title") ?? "").trim(),
    heading_fonts: parseHeadingFonts(formData),
    works: parseRows(formData, "works"),
    lectures: parseRows(formData, "lectures"),
    awards: parseRows(formData, "awards"),
    residencies: parseRows(formData, "residencies"),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/about");
  revalidatePath("/");
  return { error: "", success: true };
}
