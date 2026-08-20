"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const COLORS = ["#000000", "#ff50ff", "#777777", "#b91c1c", "#1d4ed8"];

type Align = "left" | "center" | "right" | "justify";
const ALIGNMENTS: { value: Align; label: string }[] = [
  { value: "left", label: "Align left" },
  { value: "center", label: "Align center" },
  { value: "right", label: "Align right" },
  { value: "justify", label: "Justify" },
];

// `family` is null for "Default" (unsets the mark, falling back to the
// site's normal body font) — the other two are set as a literal CSS
// font-family value via TipTap's inline style, so whatever @font-face
// registers that exact name (Libre Baskerville is loaded in layout.tsx)
// picks it up wherever the stored HTML later renders. TT Norms Pro is a
// paid font we don't have license files for yet, so for now it just falls
// through to the sans-serif fallback until real files are supplied.
const FONTS: { label: string; family: string | null; preview: string }[] = [
  { label: "Default", family: null, preview: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { label: "Libre Baskerville", family: "'Libre Baskerville', serif", preview: "'Libre Baskerville', serif" },
  { label: "TT Norms Pro", family: "'TT Norms Pro', sans-serif", preview: "'TT Norms Pro', sans-serif" },
];

// Uncontrolled by design: `value` seeds the editor once on mount (each item
// card has a stable key, so it never remounts under your cursor), and every
// keystroke flows out via onChange. Re-syncing content on every prop change
// is the standard TipTap footgun — it fights the user's own cursor.
export function RichTextEditor({ value, onChange, placeholder }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Link.configure({ openOnClick: false, autolink: true }),
      TextStyle,
      Color,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: placeholder ?? "Text…" }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { class: "cargo-rich-editor-content" },
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 dark:border-slate-800 p-1">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="Bold"
        >
          <span className="font-bold">B</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="Italic"
        >
          <span className="italic">I</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          label="Underline"
        >
          <span className="underline">U</span>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          label="Strikethrough"
        >
          <span className="line-through">S</span>
        </ToolbarButton>

        <Divider />

        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          label="Heading"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          label="Subheading"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          label="Bullet list"
        >
          •
        </ToolbarButton>

        <Divider />

        <ToolbarButton active={editor.isActive("link")} onClick={setLink} label="Link">
          Link
        </ToolbarButton>

        <Divider />

        <FontMenu editor={editor} />

        <Divider />

        <AlignMenu editor={editor} />

        <Divider />

        {COLORS.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => editor.chain().focus().setColor(color).run()}
            title={color}
            aria-label={`Text color ${color}`}
            className="h-5 w-5 shrink-0 rounded-full border border-slate-300 dark:border-slate-600"
            style={{ backgroundColor: color }}
          />
        ))}
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="ml-1 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Reset color
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}

function Divider() {
  return <div className="mx-1 h-4 w-px shrink-0 bg-slate-200 dark:bg-slate-700" />;
}

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`flex h-6 min-w-6 shrink-0 items-center justify-center rounded px-1.5 text-xs font-medium transition-colors ${
        active
          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      {children}
    </button>
  );
}

// Small popover of the four alignment options, opened from a single toolbar
// button showing the current alignment — same pattern as the doc-editor
// alignment control this was modeled after.
function AlignMenu({ editor }: { editor: Editor }) {
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

  const current = ALIGNMENTS.find((a) => editor.isActive({ textAlign: a.value }))?.value ?? "left";

  return (
    <div ref={rootRef} className="relative">
      <ToolbarButton active={open} onClick={() => setOpen((v) => !v)} label="Text alignment">
        <span className="flex items-center gap-0.5">
          <AlignIcon value={current} />
          <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </ToolbarButton>
      {open ? (
        <div className="absolute left-0 top-full z-10 mt-1 flex gap-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 shadow-lg">
          {ALIGNMENTS.map((a) => (
            <ToolbarButton
              key={a.value}
              active={current === a.value}
              label={a.label}
              onClick={() => {
                editor.chain().focus().setTextAlign(a.value).run();
                setOpen(false);
              }}
            >
              <AlignIcon value={a.value} />
            </ToolbarButton>
          ))}
        </div>
      ) : null}
    </div>
  );
}

// Same open/close popover pattern as AlignMenu, listing each typeface name
// set in its own font so it doubles as a preview.
function FontMenu({ editor }: { editor: Editor }) {
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

  const currentFamily = editor.getAttributes("textStyle").fontFamily as string | undefined;
  const current = FONTS.find((f) => f.family === currentFamily) ?? FONTS[0];

  return (
    <div ref={rootRef} className="relative">
      <ToolbarButton active={open} onClick={() => setOpen((v) => !v)} label="Typography">
        <span className="flex items-center gap-1 px-0.5">
          <span style={{ fontFamily: current.preview }}>Aa</span>
          <svg width="8" height="8" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </ToolbarButton>
      {open ? (
        <div className="absolute left-0 top-full z-10 mt-1 flex min-w-[170px] flex-col gap-0.5 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1 shadow-lg">
          {FONTS.map((f) => (
            <button
              key={f.label}
              type="button"
              onClick={() => {
                if (f.family) editor.chain().focus().setFontFamily(f.family).run();
                else editor.chain().focus().unsetFontFamily().run();
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

function AlignIcon({ value }: { value: Align }) {
  const widths = [9, value === "justify" ? 9 : 7, 9, value === "justify" ? 9 : 7];
  const xs = { left: [1, 1, 1, 1], center: [1, 1.5, 1, 1.5], right: [1, 3, 1, 3], justify: [1, 1, 1, 1] }[value];
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
      {widths.map((w, i) => (
        <rect key={i} x={xs[i]} y={1 + i * 3} width={w} height="1.4" rx="0.7" fill="currentColor" />
      ))}
    </svg>
  );
}
