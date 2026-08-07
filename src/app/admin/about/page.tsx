import { createClient } from "@/lib/supabase/server";
import { EMPTY_PROFILE, type Profile } from "@/types/profile";
import { AboutForm } from "./AboutForm";

export const dynamic = "force-dynamic";

export default async function AboutAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();

  const profile = (data as Profile | null) ?? EMPTY_PROFILE;

  return (
    <main className="min-h-screen bg-paper text-ink px-5 py-6 sm:py-8">
      <div className="mx-auto">
        <AboutForm profile={profile} />
      </div>
    </main>
  );
}
