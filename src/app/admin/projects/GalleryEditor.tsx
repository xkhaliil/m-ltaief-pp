"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { compressImage } from "@/lib/image-compress";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { uploadImageLocally } from "./local-upload";
import { safeStorageSegment } from "@/lib/storage-path";

type Props = {
  projectId: string;
  items: string[];
  onChange: (items: string[]) => void;
};

function isStorageQuotaError(message: string) {
  const m = message.toLowerCase();
  return (
    m.includes("quota") ||
    m.includes("payload too large") ||
    m.includes("exceeded the maximum allowed size") ||
    m.includes("insufficient")
  );
}

// Supabase's free tier includes 1GB of storage. Leave headroom under that so
// we switch to the local fallback before an upload actually fails, not after.
const SAFE_STORAGE_LIMIT_BYTES = 950 * 1024 * 1024;

export function GalleryEditor({ projectId, items, onChange }: Props) {
  const [uploading, setUploading] = useState<"compressing" | "uploading" | false>(false);
  const [error, setError] = useState<string | null>(null);

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    setError(null);

    const supabase = createClient();
    const uploaded: string[] = [];
    const failures: string[] = [];

    const { data: usageBytes } = await supabase.rpc("storage_usage_bytes");
    let skipCloud = typeof usageBytes === "number" && usageBytes >= SAFE_STORAGE_LIMIT_BYTES;

    // Each file is isolated in its own try/catch — one bad file (an
    // unsupported format, a dropped connection, ...) used to throw and
    // abort the whole batch, silently discarding every other file that had
    // already uploaded fine, with no per-file explanation of what failed.
    for (const original of Array.from(files)) {
      try {
        setUploading("compressing");
        const file = await compressImage(original);
        const safeName = safeStorageSegment(file.name, "image");

        const saveLocally = async () => {
          const formData = new FormData();
          formData.set("file", file, safeName);
          const result = await uploadImageLocally(formData);
          if ("error" in result) {
            throw new Error("Upload failed. Please try again.");
          }
          uploaded.push(result.url);
        };

        if (skipCloud) {
          setUploading("uploading");
          await saveLocally();
          continue;
        }

        setUploading("uploading");
        const path = `${safeStorageSegment(projectId, "uploads")}/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(path, file, { upsert: false });

        if (!uploadError) {
          const { data } = supabase.storage.from("gallery").getPublicUrl(path);
          uploaded.push(data.publicUrl);
          continue;
        }

        if (!isStorageQuotaError(uploadError.message)) {
          throw uploadError;
        }

        // Supabase storage is full — fall back to saving the rest of this
        // batch locally too, instead of retrying a doomed upload each time.
        skipCloud = true;
        await saveLocally();
      } catch (err) {
        failures.push(`${original.name}: ${err instanceof Error ? err.message : "upload failed"}`);
      }
    }

    if (uploaded.length) onChange([...items, ...uploaded]);
    setUploading(false);
    if (failures.length) setError(failures.join("\n"));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Gallery images</span>
        <label className="cursor-pointer rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors has-disabled:cursor-not-allowed has-disabled:opacity-50">
          {uploading === "compressing"
            ? "Optimizing…"
            : uploading === "uploading"
              ? "Uploading…"
              : "+ Add image"}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={Boolean(uploading)}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        Uploaded images become available to place in the article layout below.
      </p>

      {error ? (
        <p className="mt-2 whitespace-pre-line rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      ) : null}

      <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((src, index) => (
          <div key={`${src}-${index}`} className="text-xs">
            <ImageWithSkeleton
              src={src}
              alt=""
              wrapperClassName="w-full aspect-square rounded-md bg-slate-200 dark:bg-slate-700"
              className="rounded-md"
              sizes="(max-width: 640px) 33vw, 200px"
            />
            <div className="mt-1 flex items-center justify-between text-slate-400 dark:text-slate-600">
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
                disabled={index === items.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">No images yet.</p>
      ) : null}
    </div>
  );
}
