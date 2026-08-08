// One-off: converts each project's old (gallery[0] as lead image, then all
// paragraphs, then the rest of gallery) layout into an explicit `content`
// block sequence, preserving exactly what's on the site today. Safe to
// re-run — it always recomputes `content` from `paragraphs` + `gallery`.

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, gallery, paragraphs");

  if (error) throw error;

  for (const p of projects) {
    const gallery = p.gallery ?? [];
    const paragraphs = p.paragraphs ?? [];
    const [lead, ...rest] = gallery;

    const blocks = [];
    if (lead) blocks.push({ type: "image", src: lead });
    for (const text of paragraphs) blocks.push({ type: "text", text });
    for (const src of rest) blocks.push({ type: "image", src });

    const { error: updateError } = await supabase
      .from("projects")
      .update({ content: blocks })
      .eq("id", p.id);

    if (updateError) {
      console.error(`FAILED ${p.id}:`, updateError.message);
    } else {
      console.log(`${p.id}: ${blocks.length} blocks`);
    }
  }
}

main().catch((err) => {
  console.error("Failed:", err.message ?? err);
  process.exit(1);
});
