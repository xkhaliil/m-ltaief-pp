-- Lets the app check total Supabase Storage usage (across all buckets)
-- before attempting an upload, so it can skip straight to the local
-- filesystem fallback when the free-tier quota is nearly full instead of
-- always trying-and-failing first. storage.objects isn't directly
-- selectable by normal roles, so this is exposed as a SECURITY DEFINER
-- function instead.

create or replace function public.storage_usage_bytes()
returns bigint
language sql
security definer
set search_path = public
as $$
  select coalesce(sum((metadata->>'size')::bigint), 0)
  from storage.objects;
$$;

grant execute on function public.storage_usage_bytes() to anon, authenticated;
