-- Optional override for the thumbnail shown on the index grid (previously
-- always derived from the first content image / first gallery image), so it
-- can be swapped from the Homepage admin screen without touching the
-- project's article content.

alter table public.projects
  add column if not exists thumbnail_url text;
