-- Extends the typography picker (0009) to the rest of the text that's
-- actually visible on the public site: a project's menu label, its info
-- lines and menu sub-lines (each list shares one font rather than one per
-- line — keeps the editor usable), and its link labels. CV entries and the
-- profile email piggyback on the existing JSONB fields (heading_fonts,
-- and each CvRow's own object) and need no schema change.
alter table public.projects
  add column if not exists nav_label_font text,
  add column if not exists lines_font text,
  add column if not exists sub_lines_font text,
  add column if not exists links_font text;
