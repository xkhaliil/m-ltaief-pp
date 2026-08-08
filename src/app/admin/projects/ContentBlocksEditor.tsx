"use client";

import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import type { ContentBlock } from "@/types/project";

type Props = {
  blocks: ContentBlock[];
  images: string[];
  onChange: (blocks: ContentBlock[]) => void;
};

function filename(src: string) {
  const clean = src.split("?")[0];
  const parts = clean.split("/");
  return parts[parts.length - 1] || src;
}

export function ContentBlocksEditor({ blocks, images, onChange }: Props) {
  const update = (index: number, block: ContentBlock) => {
    const next = [...blocks];
    next[index] = block;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addText = () => onChange([...blocks, { type: "text", text: "" }]);
  const addImage = () =>
    onChange([...blocks, { type: "image", src: images[0] ?? "" }]);

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Article layout</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            The order below is exactly how paragraphs and images appear on the page —
            drag nothing, just use the arrows to move a block up or down.
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={addText}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          + Add paragraph
        </button>
        <button
          type="button"
          onClick={addImage}
          disabled={images.length === 0}
          title={images.length === 0 ? "Upload an image in the Gallery section below first" : undefined}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Add image
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {blocks.map((block, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3"
          >
            <div className="flex flex-col items-center gap-1 pt-1 text-slate-400 dark:text-slate-600 shrink-0">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Move up"
              >
                ↑
              </button>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-600">{index + 1}</span>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === blocks.length - 1}
                className="flex h-6 w-6 items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                aria-label="Move down"
              >
                ↓
              </button>
            </div>

            <div className="min-w-0 flex-1">
              {block.type === "text" ? (
                <>
                  <span className="mb-1 inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Paragraph
                  </span>
                  <textarea
                    value={block.text}
                    onChange={(e) => update(index, { type: "text", text: e.target.value })}
                    rows={3}
                    className="block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100"
                  />
                </>
              ) : (
                <>
                  <span className="mb-1 inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Image
                  </span>
                  <div className="flex items-center gap-3">
                    {block.src ? (
                      <ImageWithSkeleton
                        src={block.src}
                        alt=""
                        wrapperClassName="h-16 w-16 shrink-0 rounded bg-slate-200 dark:bg-slate-700"
                        className="rounded"
                        sizes="64px"
                      />
                    ) : (
                      <div className="h-16 w-16 shrink-0 rounded bg-slate-200 dark:bg-slate-700" />
                    )}
                    <select
                      value={block.src}
                      onChange={(e) => update(index, { type: "image", src: e.target.value })}
                      className="w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100"
                    >
                      {!images.includes(block.src) ? (
                        <option value={block.src}>{filename(block.src) || "(choose an image)"}</option>
                      ) : null}
                      {images.map((src) => (
                        <option key={src} value={src}>
                          {filename(src)}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => remove(index)}
              className="shrink-0 rounded p-1 text-slate-400 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              aria-label="Remove block"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {blocks.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No content yet — add a paragraph or an image to start building the page.
        </p>
      ) : null}
    </div>
  );
}
