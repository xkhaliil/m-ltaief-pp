import { createClient } from "@/lib/supabase/server";
import { EMPTY_PROFILE, type Profile } from "@/types/profile";
import { AdminHeader } from "../AdminHeader";
import { AboutForm } from "./AboutForm";

export const dynamic = "force-dynamic";

export default async function AboutAdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();

  const profile = (data as Profile | null) ?? EMPTY_PROFILE;

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <AdminHeader title="About / CV" back={{ href: "/admin", label: "Dashboard" }} />
      <div className="mx-auto max-w-[760px] px-5 py-8 sm:px-8">
        <AboutForm profile={profile} />
      </div>
    </main>
  );
}
