-- Online/offline switch for projects.
--
-- Until now the only way to take a project off the site was to delete it,
-- which is irreversible — all its text, layout and gallery went with it.
-- `published` lets a project be pulled from the public site and put back
-- later with everything intact.
--
-- Defaults to true so every existing project stays online after this runs.
alter table public.projects
  add column if not exists published boolean not null default true;

-- The public site lists by (section, position) and now also filters on
-- published, so fold it into the existing index.
drop index if exists public.projects_section_position_idx;
create index if not exists projects_published_section_position_idx
  on public.projects (published, section, position);

-- Offline projects must be invisible to the anon key, not merely filtered
-- out in the app: the same key is what the browser uses, so a `using (true)`
-- read policy would leave an unpublished project fetchable by anyone who
-- queries the table directly. Admin reads are authenticated and still see
-- everything, which is what /admin needs in order to list and un-hide them.
drop policy if exists "Public read access" on public.projects;

drop policy if exists "Public read published projects" on public.projects;
create policy "Public read published projects"
  on public.projects for select
  to anon
  using (published);

drop policy if exists "Authenticated read all projects" on public.projects;
create policy "Authenticated read all projects"
  on public.projects for select
  to authenticated
  using (true);
