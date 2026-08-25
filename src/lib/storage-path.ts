// Supabase Storage only accepts a restricted set of characters in object
// keys, so anything outside [A-Za-z0-9._-] has to be stripped before it
// goes into a path. Project ids are typed by hand in the admin form and
// regularly contain accents or spaces ("différance"), which used to reach
// the API verbatim and come back as `Invalid key: différance/...`.
export function safeStorageSegment(value: string, fallback: string): string {
  const cleaned = value
    .normalize("NFKD")
    // Drop the combining marks NFKD split off, so "é" degrades to "e"
    // instead of being replaced by a dash.
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9.\-_]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  return cleaned || fallback;
}
