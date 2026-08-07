-- Portfolio content schema for m-ltaief.com
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

create table if not exists public.projects (
  id text primary key,
  section text not null default 'main'
    check (section in ('main', 'motus', 'lecture-performance', 'writing-publishing', 'archive')),
  position integer not null default 0,
  title text not null,
  nav_label text,
  sub_lines jsonb not null default '[]'::jsonb,
  lines jsonb not null default '[]'::jsonb,
  links jsonb not null default '[]'::jsonb,
  paragraphs jsonb not null default '[]'::jsonb,
  videos jsonb not null default '[]'::jsonb,
  meta text not null default '',
  gallery jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_section_position_idx
  on public.projects (section, position);

-- Keep updated_at current on every edit.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();

alter table public.projects enable row level security;

-- The public site reads projects with the anon key.
drop policy if exists "Public read access" on public.projects;
create policy "Public read access"
  on public.projects for select
  to anon, authenticated
  using (true);

-- Only a signed-in admin (created by hand in Supabase Auth) can write.
drop policy if exists "Authenticated write access" on public.projects;
create policy "Authenticated write access"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- Storage bucket for gallery image uploads from the admin portal.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "Public read gallery images" on storage.objects;
create policy "Public read gallery images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "Authenticated manage gallery images" on storage.objects;
create policy "Authenticated manage gallery images"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'gallery')
  with check (bucket_id = 'gallery');
