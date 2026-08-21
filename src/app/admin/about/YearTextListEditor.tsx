"use client";

import type { CvRow } from "@/types/profile";
import { FontMenuButton, currentFont } from "@/components/FontMenuButton";

type Props = {
  items: CvRow[];
  onChange: (items: CvRow[]) => void;
};

const fieldClass =
  "rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100";

export function YearTextListEditor({ items, onChange }: Props) {
  const update = (index: number, patch: Partial<CvRow>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

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

  return (
    <div>
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() =>
            onChange([{ year: "", text: "", location: "", city: "", country: "", url: "" }, ...items])
          }
          className="rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((row, index) => (
          <div
            key={index}
            className="rounded-md border border-slate-200 dark:border-slate-800 p-2 space-y-2"
          >
            <div className="flex items-start gap-2">
              <input
                value={row.year}
                placeholder="Year"
                onChange={(e) => update(index, { year: e.target.value })}
                className={`w-[90px] ${fieldClass}`}
              />
              <input
                value={row.text}
                placeholder="Title"
                onChange={(e) => update(index, { text: e.target.value })}
                style={{ fontFamily: currentFont(row.font ?? null).preview }}
                className={`flex-1 ${fieldClass}`}
              />
              <div className="flex items-center gap-1 shrink-0 text-slate-400 dark:text-slate-600">
                <FontMenuButton font={row.font ?? null} onFontChange={(font) => update(index, { font: font ?? undefined })} />
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === items.length - 1}
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <input
                value={row.location ?? ""}
                placeholder="Location (venue/org — only this is linked)"
                onChange={(e) => update(index, { location: e.target.value })}
                style={{ fontFamily: currentFont(row.font ?? null).preview }}
                className={`flex-1 ${fieldClass}`}
              />
              <input
                value={row.city ?? ""}
                placeholder="City"
                onChange={(e) => update(index, { city: e.target.value })}
                style={{ fontFamily: currentFont(row.font ?? null).preview }}
                className={`w-[110px] ${fieldClass}`}
              />
              <input
                value={row.country ?? ""}
                placeholder="Country"
                onChange={(e) => update(index, { country: e.target.value })}
                style={{ fontFamily: currentFont(row.font ?? null).preview }}
                className={`w-[110px] ${fieldClass}`}
              />
            </div>
            <input
              value={row.url ?? ""}
              placeholder="Link for location (optional) — https://…"
              onChange={(e) => update(index, { url: e.target.value })}
              className={`w-full ${fieldClass}`}
            />
          </div>
        ))}
        {items.length === 0 ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Nothing yet.</p>
        ) : null}
      </div>
    </div>
  );
}
