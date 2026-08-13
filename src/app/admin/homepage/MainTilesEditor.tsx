"use client";

import { useActionState, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image-compress";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import type { Project } from "@/types/project";
import { flattenItems, normalizeContent } from "@/lib/content-rows";
import { uploadImageLocally } from "../projects/local-upload";
import { saveMainTiles } from "./actions";

type Tile = { id: string; title: string; thumbnail_url: string | null; fallback: string | null };

function fallbackThumbnail(project: Project): string | null {
  const firstImage = flattenItems(normalizeContent(project.content, project.videos)).find(
    (i) => i.type === "image",
  );
  return (firstImage?.type === "image" ? firstImage.src : null) ?? project.gallery[0] ?? null;
}

function isStorageQuotaError(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("quota") ||
    m.includes("payload too large") ||
    m.includes("exceeded the maximum allowed size") ||
    m.includes("insufficient")
  );
}

// Same headroom as GalleryEditor: switch to the local fallback before an
// upload actually fails, not after.
const SAFE_STORAGE_LIMIT_BYTES = 950 * 1024 * 1024;

async function uploadThumbnail(projectId: string, file: File): Promise<string> {
  const supabase = createClient();
  const compressed = await compressImage(file);
  const safeName = compressed.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");

  const { data: usageBytes } = await supabase.rpc("storage_usage_bytes");
  const skipCloud = typeof usageBytes === "number" && usageBytes >= SAFE_STORAGE_LIMIT_BYTES;

  const saveLocally = async () => {
    const formData = new FormData();
    formData.set("file", compressed, safeName);
    const result = await uploadImageLocally(formData);
    if ("error" in result) throw new Error(result.error);
    return result.url;
  };

  if (skipCloud) return saveLocally();

  const path = `${projectId}/thumb-${Date.now()}-${safeName}`;
  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, compressed, { upsert: false });

  if (!uploadError) {
    return supabase.storage.from("gallery").getPublicUrl(path).data.publicUrl;
  }
  if (!isStorageQuotaError(uploadError.message)) throw uploadError;
  return saveLocally();
}

export function MainTilesEditor({ projects }: { projects: Project[] }) {
  const [state, formAction, pending] = useActionState(saveMainTiles, null);
  const [tiles, setTiles] = useState<Tile[]>(
    projects.map((p) => ({
      id: p.id,
      title: p.title,
      thumbnail_url: p.thumbnail_url,
      fallback: fallbackThumbnail(p),
    })),
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= tiles.length) return;
    const next = [...tiles];
    [next[index], next[target]] = [next[target], next[index]];
    setTiles(next);
  };

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...tiles];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setTiles(next);
  };

  const updateTitle = (index: number, title: string) => {
    const next = [...tiles];
    next[index] = { ...next[index], title };
    setTiles(next);
  };

  const replaceThumbnail = async (index: number, file: File) => {
    const tile = tiles[index];
    setUploadingId(tile.id);
    setUploadError(null);
    try {
      const url = await uploadThumbnail(tile.id, file);
      setTiles((current) => {
        const next = [...current];
        const at = next.findIndex((t) => t.id === tile.id);
        if (at >= 0) next[at] = { ...next[at], thumbnail_url: url };
        return next;
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploadingId(null);
    }
  };

  const payload = JSON.stringify(
    tiles.map((t, i) => ({ id: t.id, position: i, title: t.title, thumbnail_url: t.thumbnail_url })),
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="tiles" value={payload} readOnly />

      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Main index tiles</h3>
          <a
            href="/admin/projects/new"
            className="shrink-0 rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            + Add new project
          </a>
        </div>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Drag to reorder. Hover a thumbnail to replace it. For links, video, or the full text
          layout of a project, use &quot;Edit&quot;.
        </p>

        <div className="space-y-2">
          {tiles.map((tile, index) => {
            const src = tile.thumbnail_url ?? tile.fallback;
            return (
              <div
                key={tile.id}
                draggable
                onDragStart={() => setDragIndex(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (dragIndex !== null) reorder(dragIndex, index);
                  setDragIndex(null);
                }}
                onDragEnd={() => setDragIndex(null)}
                className={`flex items-center gap-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 cursor-grab active:cursor-grabbing ${
                  dragIndex === index ? "opacity-50" : ""
                }`}
              >
                <span className="shrink-0 text-slate-300 dark:text-slate-700 select-none" aria-hidden="true">
                  ⠿
                </span>

                <label className="group relative block shrink-0 cursor-pointer">
                  {src ? (
                    <ImageWithSkeleton
                      src={src}
                      alt=""
                      wrapperClassName="h-16 w-16 rounded-md bg-slate-200 dark:bg-slate-700"
                      className="rounded-md"
                      sizes="64px"
                    />
                  ) : (
                    <span className="flex h-16 w-16 items-center justify-center rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] text-slate-400 dark:text-slate-600">
                      No image
                    </span>
                  )}
                  <span className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 text-[10px] font-medium text-white dark:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    {uploadingId === tile.id ? "…" : "Replace"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    disabled={Boolean(uploadingId)}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) replaceThumbnail(index, file);
                      e.target.value = "";
                    }}
                  />
                </label>

                <input
                  value={tile.title}
                  onChange={(e) => updateTitle(index, e.target.value)}
                  className="min-w-0 flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
                />

                <div className="flex shrink-0 flex-col gap-0.5 text-slate-400 dark:text-slate-600">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === tiles.length - 1}
                    className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    ↓
                  </button>
                </div>

                <a
                  href={`/admin/projects/${tile.id}`}
                  className="shrink-0 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  Edit →
                </a>
              </div>
            );
          })}
        </div>

        {tiles.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No &quot;Main index&quot; projects yet — click &quot;+ Add new project&quot; above to
            create one.
          </p>
        ) : null}
      </div>

      {uploadError ? (
        <p className="rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">{uploadError}</p>
      ) : null}
      {state?.error ? (
        <p className="rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">{state.error}</p>
      ) : null}
      {state?.success ? (
        <p className="rounded-md bg-emerald-50 dark:bg-emerald-950/40 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">Saved.</p>
      ) : null}

      <div className="sticky bottom-4">
        <button
          type="submit"
          disabled={pending || Boolean(uploadingId)}
          className="rounded-md bg-slate-900 dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-slate-900 shadow-md hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save order & tiles"}
        </button>
      </div>
    </form>
  );
}
