"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveHomepage(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("profile").upsert({
    id: 1,
    index_label: String(formData.get("index_label") ?? "").trim(),
    index_subtitle: String(formData.get("index_subtitle") ?? "").trim(),
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { error: "", success: true };
}

type TileUpdate = { id: string; position: number; title: string; thumbnail_url: string | null };

function parseTiles(formData: FormData): TileUpdate[] | null {
  const raw = formData.get("tiles");
  if (typeof raw !== "string") return null;
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(
      (t): t is TileUpdate =>
        t && typeof t.id === "string" && typeof t.position === "number" && typeof t.title === "string",
    );
  } catch {
    return null;
  }
}

export async function saveMainTiles(
  _prevState: { error: string; success?: boolean } | null,
  formData: FormData,
) {
  const tiles = parseTiles(formData);
  if (!tiles) return { error: "Invalid data." };
  if (tiles.some((t) => !t.title.trim())) return { error: "Every tile needs a title." };

  const supabase = await createClient();

  const results = await Promise.all(
    tiles.map((tile) =>
      supabase
        .from("projects")
        .update({
          position: tile.position,
          title: tile.title.trim(),
          thumbnail_url: tile.thumbnail_url,
        })
        .eq("id", tile.id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) return { error: failed.error.message };

  revalidatePath("/admin");
  revalidatePath("/admin/homepage");
  revalidatePath("/");
  return { error: "", success: true };
}
