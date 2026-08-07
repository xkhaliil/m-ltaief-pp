"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  projectId: string;
  items: string[];
  onChange: (items: string[]) => void;
};

export function GalleryEditor({ projectId, items, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const uploaded: string[] = [];

      for (const file of Array.from(files)) {
        const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
        const path = `${projectId || "uploads"}/${Date.now()}-${safeName}`;
        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(path, file, { upsert: false });

        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from("gallery").getPublicUrl(path);
        uploaded.push(data.publicUrl);
      }

      onChange([...items, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="block text-muted text-[12px]">Gallery images</span>
        <label className="text-[12px] text-muted hover:text-accent transition-colors cursor-pointer">
          {uploading ? "Uploading…" : "+ Add image"}
          <input
            type="file"
            accept="image/*"
            multiple
            hidden
            disabled={uploading}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      </div>

      {error ? <p className="text-[12px] text-accent mt-1">{error}</p> : null}

      <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
        {items.map((src, index) => (
          <div key={`${src}-${index}`} className="text-[11px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="w-full aspect-square object-cover bg-border"
            />
            <div className="flex items-center justify-between mt-1 text-muted">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="hover:text-accent disabled:opacity-30 transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="hover:text-accent disabled:opacity-30 transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 ? (
        <p className="text-[12px] text-muted mt-2">No images yet.</p>
      ) : null}
    </div>
  );
}
