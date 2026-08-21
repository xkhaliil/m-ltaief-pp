"use client";

import { FontMenuButton, currentFont } from "@/components/FontMenuButton";

type Props = {
  label: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  font: string | null;
  onFontChange: (font: string | null) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
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
  type,
  inputClassName,
}: Props) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{label}</span>
        <FontMenuButton font={font} onFontChange={onFontChange} />
      </div>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ fontFamily: currentFont(font).preview }}
        className={inputClassName}
      />
    </div>
  );
}
