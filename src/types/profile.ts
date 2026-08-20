// `location`/`city`/`country` are optional structured fields for entries
// added since this shipped — when `location` is set, the row renders as
// "text, location, city, country" with only `location` linked (via `url`,
// or auto-matched against CV_EXTERNAL_LINKS in SiteClient.tsx). Older rows
// have neither: everything lives in `text` as one free-text string, with
// `url` (if set) linking the whole thing — see CvRowText in SiteClient.tsx.
export type CvRow = {
  year: string;
  text: string;
  location?: string;
  city?: string;
  country?: string;
  url?: string;
};

// Font choice (a FONTS[number].family value, or absent for Default) for
// each visible heading AboutForm owns. Kept separate from
// HomepageHeadingFonts below so the two forms' saves can't clobber each
// other's choices — see the migration's comment.
export type HeadingFonts = Partial<
  Record<"name" | "tagline" | "works_title" | "lectures_title" | "awards_title" | "residencies_title", string>
>;
export type HomepageHeadingFonts = Partial<Record<"index_label" | "index_subtitle", string>>;

export type Profile = {
  id: number;
  name: string;
  tagline: string;
  email: string;
  bio_pdf_url: string;
  deutsch_url: string;
  index_label: string;
  index_subtitle: string;
  works_title: string;
  lectures_title: string;
  awards_title: string;
  residencies_title: string;
  heading_fonts: HeadingFonts;
  homepage_heading_fonts: HomepageHeadingFonts;
  works: CvRow[];
  lectures: CvRow[];
  awards: CvRow[];
  residencies: CvRow[];
  updated_at?: string;
};

export const EMPTY_PROFILE: Profile = {
  id: 1,
  name: "",
  tagline: "",
  email: "",
  bio_pdf_url: "",
  deutsch_url: "",
  index_label: "/ˈɪndɛks/",
  index_subtitle: "Selected works, 2011 — 2026",
  works_title: "selected performance / theater & project(s)",
  lectures_title: "selected lecture performances",
  awards_title: "Awards and Grants",
  residencies_title: "Fellowships / Residencies",
  heading_fonts: {},
  homepage_heading_fonts: {},
  works: [],
  lectures: [],
  awards: [],
  residencies: [],
};
