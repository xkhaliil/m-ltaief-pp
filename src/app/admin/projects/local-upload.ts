"use server";

// Fallback for when Supabase Storage's free-tier quota is full: writes the
// image straight into the codebase's public/ folder instead. This only
// works on hosts with a persistent, writable filesystem (a VPS, a
// long-running Node process) — not on serverless/edge platforms, where
// public/ is read-only at runtime. Files saved here are committed to git
// like any other static asset, so they need a redeploy (or a persistent
// volume) to show up if your host rebuilds from a fresh checkout.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { safeStorageSegment } from "@/lib/storage-path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");

export async function uploadImageLocally(
  formData: FormData,
): Promise<{ url: string } | { error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { error: "No file provided." };
  }

  const safeName = safeStorageSegment(file.name, "image");
  const filename = `${Date.now()}-${safeName}`;

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(UPLOAD_DIR, filename), buffer);
    return { url: `/images/uploads/${filename}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Local upload failed." };
  }
}
