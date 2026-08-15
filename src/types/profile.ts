export type CvRow = { year: string; text: string; url?: string };

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
  works: [],
  lectures: [],
  awards: [],
  residencies: [],
};
