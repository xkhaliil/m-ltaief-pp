export type ProjectSection =
  | "main"
  | "motus"
  | "lecture-performance"
  | "writing-publishing"
  | "archive";

export type ProjectLink = { label: string; href: string };

// A FONTS[number].family value (from src/lib/fonts.ts), or null/undefined
// for Default.
export type TextFont = string | null;

// Legacy flat shape — still what's actually stored for any project that
// hasn't been re-saved since content rows shipped. Never written going
// forward; only read by normalizeContent() for backward compatibility.
export type LegacyContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; width?: number; height?: number };

export type ContentItem =
  | { type: "text"; text: string }
  | { type: "image"; src: string; width?: number; height?: number }
  | { type: "video"; src: string }
  // A link to a PDF hosted elsewhere (Google Drive/Docs share link, etc.) —
  // deliberately not a file upload, so documents never end up as blobs in
  // Supabase storage/the database, same as Profile.bio_pdf_url.
  | { type: "pdf"; src: string };

// Fixed set of proportions a row's items can be split into — see
// ROW_LAYOUTS in src/lib/content-rows.ts for the fraction each maps to.
// items.length must match the layout's expected item count.
export type RowLayout = "full" | "half-half" | "third-two-thirds" | "two-thirds-third" | "thirds";

export type ContentRow = {
  id: string;
  layout: RowLayout;
  items: ContentItem[];
};

export type Project = {
  id: string;
  section: ProjectSection;
  position: number;
  title: string;
  title_font: TextFont;
  nav_label: string | null;
  nav_label_font: TextFont;
  sub_lines: string[];
  sub_lines_font: TextFont;
  lines: string[];
  lines_font: TextFont;
  links: ProjectLink[];
  links_font: TextFont;
  // Raw as read from the DB — may be the legacy flat shape or the new row
  // shape. Always normalizeContent() this before rendering or editing.
  content: ContentRow[] | LegacyContentBlock[];
  videos: string[];
  meta: string;
  gallery: string[];
  thumbnail_url: string | null;
  created_at?: string;
  updated_at?: string;
};

export type ProjectInput = Omit<Project, "created_at" | "updated_at">;
