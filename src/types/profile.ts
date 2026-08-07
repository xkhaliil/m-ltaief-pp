export type CvRow = { year: string; text: string };

export type Profile = {
  id: number;
  name: string;
  tagline: string;
  email: string;
  bio_pdf_url: string;
  deutsch_url: string;
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
  works: [],
  lectures: [],
  awards: [],
  residencies: [],
};
