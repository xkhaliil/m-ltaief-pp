// Creates (or resets the password of) the single admin login for /admin.
// Usage: npm run create-admin -- someone@example.com "a-strong-password"
//
// Requires SUPABASE_SERVICE_ROLE_KEY in .env — this is the secret admin key
// from Supabase (Project Settings -> API -> service_role). Never expose it
// to the browser or commit it; it bypasses every database access rule.

import { createClient } from "@supabase/supabase-js";

const [, , email, password] = process.argv;

if (!email || !password) {
  console.error('Usage: npm run create-admin -- "email@example.com" "password"');
  process.exit(1);
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Add SUPABASE_SERVICE_ROLE_KEY to .env (Supabase dashboard -> Project Settings -> API -> service_role), then re-run.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: existing } = await supabase.auth.admin.listUsers();
  const match = existing?.users.find((u) => u.email === email);

  if (match) {
    const { error } = await supabase.auth.admin.updateUserById(match.id, { password });
    if (error) throw error;
    console.log(`Password updated for existing user: ${email}`);
    return;
  }

  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error) throw error;
  console.log(`Admin user created: ${email}`);
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
