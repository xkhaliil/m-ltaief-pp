import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./env";

// A cookie-free client for public, anonymous reads. Keeping this separate
// from the auth-aware server client lets the public pages stay cacheable
// (revalidated on demand from the admin actions) instead of forcing every
// request through dynamic, per-cookie rendering.
export function createPublicClient() {
  const { url, anonKey } = getSupabaseEnv();
  return createSupabaseClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
