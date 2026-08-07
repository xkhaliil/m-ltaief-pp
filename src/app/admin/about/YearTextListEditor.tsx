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
      <div className="flex items-baseline justify-between">
        <span className="block text-muted text-[12px] font-bold">{label}</span>
        <button
          type="button"
          onClick={() => onChange([{ year: "", text: "" }, ...items])}
          className="text-[12px] text-muted hover:text-accent transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="mt-2 space-y-2">
        {items.map((row, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              value={row.year}
              placeholder="Year"
              onChange={(e) => update(index, { year: e.target.value })}
              className="w-[90px] border border-border px-2 py-1.5 text-[13px] outline-none focus:border-accent"
            />
            <input
              value={row.text}
              placeholder="Credit line"
              onChange={(e) => update(index, { text: e.target.value })}
              className="flex-1 border border-border px-2 py-1.5 text-[13px] outline-none focus:border-accent"
            />
            <div className="flex items-center gap-1 text-[11px] text-muted shrink-0 pt-1.5">
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
        {items.length === 0 ? (
          <p className="text-[12px] text-muted">Nothing yet.</p>
        ) : null}
      </div>
    </div>
  );
}
