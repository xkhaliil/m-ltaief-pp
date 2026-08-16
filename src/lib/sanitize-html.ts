import sanitizeHtml from "sanitize-html";

// Text content items are authored with RichTextEditor (TipTap) and stored as
// HTML. Sanitized on save (server action) AND again here on render — the
// save-time pass is the real trust boundary (single admin write path), this
// is just a cheap defensive backstop in case that's ever bypassed.
//
// Deliberately not isomorphic-dompurify: it pulls in jsdom, and jsdom's
// html-encoding-sniffer dependency ships an ESM-only sub-dependency
// (@exodus/bytes) that Vercel's bundled Node runtime can't require() —
// crashed every render that touched this module in production. This
// package does the same tag/attribute allowlisting without a DOM at all.
const ALLOWED_TAGS = ["p", "strong", "em", "u", "s", "a", "h2", "h3", "ul", "ol", "li", "br", "span"];

export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ["href", "target", "rel"],
      "*": ["style"],
    },
  });
}
