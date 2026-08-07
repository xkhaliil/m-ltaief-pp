-- Singleton "profile" row: bio fields + the four About/CV lists.
-- Run this once, after 0001_init.sql, in the Supabase SQL editor.

create table if not exists public.profile (
  id integer primary key default 1,
  name text not null default '',
  tagline text not null default '',
  email text not null default '',
  bio_pdf_url text not null default '',
  deutsch_url text not null default '',
  works jsonb not null default '[]'::jsonb,
  lectures jsonb not null default '[]'::jsonb,
  awards jsonb not null default '[]'::jsonb,
  residencies jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint profile_singleton check (id = 1)
);

drop trigger if exists profile_set_updated_at on public.profile;
create trigger profile_set_updated_at
  before update on public.profile
  for each row
  execute function public.set_updated_at();

alter table public.profile enable row level security;

drop policy if exists "Public read access" on public.profile;
create policy "Public read access"
  on public.profile for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated write access" on public.profile;
create policy "Authenticated write access"
  on public.profile for all
  to authenticated
  using (true)
  with check (true);

insert into public.profile (id) values (1)
on conflict (id) do nothing;
