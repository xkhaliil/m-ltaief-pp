import DOMPurify from "isomorphic-dompurify";

// Text content items are authored with RichTextEditor (TipTap) and stored as
// HTML. Sanitized on save (server action) AND again here on render — the
// save-time pass is the real trust boundary (single admin write path), this
// is just a cheap defensive backstop in case that's ever bypassed.
const ALLOWED_TAGS = ["p", "strong", "em", "u", "s", "a", "h2", "h3", "ul", "ol", "li", "br", "span"];
const ALLOWED_ATTR = ["href", "target", "rel", "style"];

export function sanitizeRichText(html: string): string {
  return DOMPurify.sanitize(html, { ALLOWED_TAGS, ALLOWED_ATTR });
}
