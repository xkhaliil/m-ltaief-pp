"use client";

import type { ProjectLink } from "@/types/project";

type Props = {
  items: ProjectLink[];
  onChange: (items: ProjectLink[]) => void;
};

export function LinksEditor({ items, onChange }: Props) {
  const update = (index: number, patch: Partial<ProjectLink>) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Links</span>
        <button
          type="button"
          onClick={() => onChange([...items, { label: "", href: "" }])}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              value={item.label}
              placeholder="Label"
              onChange={(e) => update(index, { label: e.target.value })}
              className="w-1/3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
            <input
              value={item.href}
              placeholder="https://…"
              onChange={(e) => update(index, { href: e.target.value })}
              className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">No links.</p>
        ) : null}
      </div>
    </div>
  );
}
