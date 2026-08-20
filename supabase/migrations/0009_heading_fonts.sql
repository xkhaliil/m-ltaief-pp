-- Font-family choice for the site's visible headings/titles — project
-- title, profile name/tagline, the 4 CV section titles, and the homepage
-- index heading (label/subtitle). One JSONB column per admin page that
-- owns a set of fields (rather than one column per field) keeps this from
-- sprawling into a dozen new columns; two separate profile columns instead
-- of one shared one so AboutForm's save and HomepageForm's save can't
-- clobber each other's font choices (a JSONB column upsert replaces the
-- whole value, it doesn't merge keys).
alter table public.profile
  add column if not exists heading_fonts jsonb not null default '{}'::jsonb,
  add column if not exists homepage_heading_fonts jsonb not null default '{}'::jsonb;

alter table public.projects
  add column if not exists title_font text;
