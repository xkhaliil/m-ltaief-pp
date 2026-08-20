// Shared typography choices offered by every font picker in the admin (the
// rich-text editor's toolbar and the plain-input FontPickerInput). `family`
// is null for "Default" (falls back to whatever the surrounding element
// already uses) — the others are literal CSS font-family values, matched
// by whatever @font-face registers that exact name. Libre Baskerville is
// loaded as a plain Google Fonts stylesheet in layout.tsx. TT Norms Pro is
// a paid font with no license files yet, so it currently falls through to
// its sans-serif fallback.
export type FontChoice = { label: string; family: string | null; preview: string };

export const FONTS: FontChoice[] = [
  { label: "Default", family: null, preview: "'Helvetica Neue', Helvetica, Arial, sans-serif" },
  { label: "Libre Baskerville", family: "'Libre Baskerville', serif", preview: "'Libre Baskerville', serif" },
  { label: "TT Norms Pro", family: "'TT Norms Pro', sans-serif", preview: "'TT Norms Pro', sans-serif" },
];
