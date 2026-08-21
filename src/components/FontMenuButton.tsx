"use client";

import { useEffect, useRef, useState } from "react";
import { FONTS } from "@/lib/fonts";

type Props = {
  font: string | null;
  onFontChange: (font: string | null) => void;
};

// The "Aa ▾" typography popover on its own, with no text input attached —
// shared by FontPickerInput (one field, one font) and any editor where one
// font choice applies to a whole list of text entries at once (CV rows,
// info lines, menu sub-lines, link labels) rather than a single scalar.
export function FontMenuButton({ font, onFontChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const current = FONTS.find((f) => f.family === font) ?? FONTS[0];

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Typography"
        aria-label="Typography"
        className={`flex h-6 items-center gap-1 rounded px-1.5 text-xs font-medium transition-colors ${
          open
            ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <span style={{ fontFamily: current.preview }}>Aa</span>
        <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
          <path
            d="M2 3.5 5 6.5 8 3.5"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-10 mt-1 flex min-w-[170px] flex-col gap-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 shadow-lg">
          {FONTS.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => {
                onFontChange(f.family);
                setOpen(false);
              }}
              className={`rounded px-2 py-1 text-left text-sm transition-colors ${
                current.label === f.label
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
              style={{ fontFamily: f.preview }}
            >
              {f.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function currentFont(font: string | null) {
  return FONTS.find((f) => f.family === font) ?? FONTS[0];
}
