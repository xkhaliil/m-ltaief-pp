-- Adds the editable homepage index heading (the "/ˈɪndɛks/ Selected works,
-- 2011 — 2026" text at the top of the main index page), previously hardcoded
-- in SiteClient.tsx.

alter table public.profile
  add column if not exists index_label text not null default '/ˈɪndɛks/',
  add column if not exists index_subtitle text not null default 'Selected works, 2011 — 2026';
