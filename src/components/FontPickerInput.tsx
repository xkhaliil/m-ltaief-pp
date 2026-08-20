"use client";

import { useEffect, useRef, useState } from "react";
import { FONTS } from "@/lib/fonts";

type Props = {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  font: string | null;
  onFontChange: (font: string | null) => void;
  placeholder?: string;
  required?: boolean;
  inputClassName: string;
};

// A single-line text input paired with the same "Aa ▾" typography picker
// RichTextEditor uses — for titles/headings, which are one plain string
// rather than TipTap HTML, so they can't go through the rich-text editor
// itself. The font choice is reported via onFontChange; this component
// doesn't submit it as its own form field, since callers vary (some store
// one font per scalar column, others aggregate several into one JSON blob).
export function FontPickerInput({
  label,
  name,
  value,
  onChange,
  font,
  onFontChange,
  placeholder,
  required,
  inputClassName,
}: Props) {
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
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <div ref={rootRef} className="relative">
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
      </div>
      <input
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ fontFamily: current.preview }}
        className={inputClassName}
      />
    </div>
  );
}
