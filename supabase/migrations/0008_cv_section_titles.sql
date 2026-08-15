-- The four CV section headings on the About page ("selected performance /
-- theater & project(s)", "selected lecture performances", "Awards and
-- Grants", "Fellowships / Residencies") were hardcoded in SiteClient.tsx.
-- Making them editable from /admin/about, defaulting to the existing text so
-- nothing changes until someone edits them.

alter table public.profile
  add column if not exists works_title text not null default 'selected performance / theater & project(s)',
  add column if not exists lectures_title text not null default 'selected lecture performances',
  add column if not exists awards_title text not null default 'Awards and Grants',
  add column if not exists residencies_title text not null default 'Fellowships / Residencies';
