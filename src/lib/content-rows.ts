import type { ContentItem, ContentRow, LegacyContentBlock, RowLayout } from "@/types/project";

export const ROW_LAYOUTS: Record<RowLayout, { label: string; glyph: string; fractions: number[] }> = {
  full: { label: "Full width", glyph: "▮", fractions: [1] },
  "half-half": { label: "Half + half", glyph: "▮ ▮", fractions: [1, 1] },
  "third-two-thirds": { label: "1/3 + 2/3", glyph: "▎▊", fractions: [1, 2] },
  "two-thirds-third": { label: "2/3 + 1/3", glyph: "▊▎", fractions: [2, 1] },
  thirds: { label: "Third + third + third", glyph: "▮▮▮", fractions: [1, 1, 1] },
};

export const ROW_LAYOUT_ORDER: RowLayout[] = [
  "full",
  "half-half",
  "third-two-thirds",
  "two-thirds-third",
  "thirds",
];

function isRowShape(value: unknown): value is ContentRow {
  return (
    !!value &&
    typeof value === "object" &&
    "layout" in value &&
    "items" in value &&
    Array.isArray((value as ContentRow).items)
  );
}

// Reads whatever shape is actually in the DB (old flat block array, or the
// new row array) and always returns rows — legacy blocks become one-item
// "full" rows, and any legacy `videos` column entries are appended the same
// way, so the very first time an existing project is opened in the new
// editor, everything (text, images, videos) already shows up unified and
// ready to be rearranged.
export function normalizeContent(
  raw: ContentRow[] | LegacyContentBlock[] | null | undefined,
  legacyVideos: string[] = [],
): ContentRow[] {
  const rows: ContentRow[] = [];
  let index = 0;

  if (Array.isArray(raw)) {
    if (raw.length > 0 && isRowShape(raw[0])) {
      for (const row of raw as ContentRow[]) {
        if (!row || !Array.isArray(row.items) || row.items.length === 0) continue;
        rows.push({ id: row.id || `row-${index}`, layout: row.layout, items: row.items });
        index += 1;
      }
    } else {
      for (const block of raw as LegacyContentBlock[]) {
        if (!block || typeof block !== "object") continue;
        if (block.type === "text" && block.text.trim()) {
          rows.push({ id: `row-${index}`, layout: "full", items: [{ type: "text", text: block.text }] });
          index += 1;
        } else if (block.type === "image" && block.src.trim()) {
          rows.push({
            id: `row-${index}`,
            layout: "full",
            items: [{ type: "image", src: block.src, width: block.width, height: block.height }],
          });
          index += 1;
        }
      }
    }
  }

  for (const video of legacyVideos) {
    if (video && video.trim()) {
      rows.push({ id: `row-${index}`, layout: "full", items: [{ type: "video", src: video }] });
      index += 1;
    }
  }

  return rows;
}

export function flattenItems(rows: ContentRow[]): ContentItem[] {
  return rows.flatMap((row) => row.items);
}

// Google Drive/Docs share links don't carry a real filename in the URL
// (just an opaque file id, ending in something like "/view") — only show a
// filename for links that plausibly end in an actual .pdf path.
export function pdfLabel(src: string): string {
  const basename = src.split("?")[0].split("/").pop() ?? "";
  return /\.pdf$/i.test(basename) ? decodeURIComponent(basename) : "View PDF";
}

let clientIdCounter = 0;

// Client-only id for new rows/items created interactively in the admin —
// normalizeContent()'s index-based ids are for the (server-safe,
// deterministic) initial load; anything added after that needs its own
// stable identity for React/dnd-kit that won't collide as rows are
// reordered, split, or merged.
export function newClientId(prefix: string): string {
  clientIdCounter += 1;
  return `${prefix}-${Date.now()}-${clientIdCounter}`;
}
