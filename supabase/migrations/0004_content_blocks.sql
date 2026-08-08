-- Replaces the fixed "one lead image, then all paragraphs, then the rest of
-- the gallery" layout with an explicit, admin-ordered sequence of text and
-- image blocks per project, so images can be placed anywhere relative to the
-- text instead of only before/after it.

alter table public.projects
  add column if not exists content jsonb not null default '[]'::jsonb;
