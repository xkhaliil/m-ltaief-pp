export type ProjectSection =
  | "main"
  | "motus"
  | "lecture-performance"
  | "writing-publishing"
  | "archive";

export type ProjectLink = { label: string; href: string };

// Legacy flat shape — still what's actually stored for any project that
// hasn't been re-saved since content rows shipped. Never written going
// forward; only read by normalizeContent() for backward compatibility.
export type LegacyContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; width?: number; height?: number };

export type ContentItem =
  | { type: "text"; text: string }
  | { type: "image"; src: string; width?: number; height?: number }
  | { type: "video"; src: string };

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
  nav_label: string | null;
  sub_lines: string[];
  lines: string[];
  links: ProjectLink[];
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
