-- `paragraphs` is fully superseded by the `content` block sequence added in
-- 0004 (every existing row was backfilled via scripts/backfill-content-blocks.mjs
-- before this ran). Dropping it keeps one source of truth for article body text.

alter table public.projects
  drop column if exists paragraphs;
