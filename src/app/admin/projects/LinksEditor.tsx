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
      <div className="flex items-baseline justify-between">
        <span className="block text-muted text-[12px]">Links</span>
        <button
          type="button"
          onClick={() => onChange([...items, { label: "", href: "" }])}
          className="text-[12px] text-muted hover:text-accent transition-colors"
        >
          + Add
        </button>
      </div>

      <div className="mt-2 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <input
              value={item.label}
              placeholder="Label"
              onChange={(e) => update(index, { label: e.target.value })}
              className="w-1/3 border border-border px-2 py-1.5 text-[13px] outline-none focus:border-accent"
            />
            <input
              value={item.href}
              placeholder="https://…"
              onChange={(e) => update(index, { href: e.target.value })}
              className="flex-1 border border-border px-2 py-1.5 text-[13px] outline-none focus:border-accent"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-[11px] text-muted hover:text-accent transition-colors pt-1.5"
            >
              ✕
            </button>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="text-[12px] text-muted">No links.</p>
        ) : null}
      </div>
    </div>
  );
}
