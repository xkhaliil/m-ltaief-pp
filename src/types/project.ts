export type ProjectSection =
  | "main"
  | "motus"
  | "lecture-performance"
  | "writing-publishing"
  | "archive";

export type ProjectLink = { label: string; href: string };

export type ContentBlock = { type: "text"; text: string } | { type: "image"; src: string };

export type Project = {
  id: string;
  section: ProjectSection;
  position: number;
  title: string;
  nav_label: string | null;
  sub_lines: string[];
  lines: string[];
  links: ProjectLink[];
  content: ContentBlock[];
  videos: string[];
  meta: string;
  gallery: string[];
  created_at?: string;
  updated_at?: string;
};

export type ProjectInput = Omit<Project, "created_at" | "updated_at">;
