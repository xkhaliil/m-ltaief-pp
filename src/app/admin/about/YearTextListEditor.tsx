"use client";

import type { CvRow } from "@/types/profile";

type Props = {
  label: string;
  items: CvRow[];
  onChange: (items: CvRow[]) => void;
};

export function YearTextListEditor({ label, items, onChange }: Props) {
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
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900">{label}</span>
        <button
          type="button"
          onClick={() => onChange([{ year: "", text: "" }, ...items])}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((row, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              value={row.year}
              placeholder="Year"
              onChange={(e) => update(index, { year: e.target.value })}
              className="w-[90px] rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <input
              value={row.text}
              placeholder="Credit line"
              onChange={(e) => update(index, { text: e.target.value })}
              className="flex-1 rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
            />
            <div className="flex items-center gap-1 shrink-0 text-slate-400">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 hover:text-slate-700 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="mt-1 text-sm text-slate-500">Nothing yet.</p>
        ) : null}
      </div>
    </div>
  );
}
