import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";
import { EMPTY_PROFILE, type Profile } from "@/types/profile";
import { AdminHeader } from "../AdminHeader";
import { HomepageForm } from "./HomepageForm";
import { MainTilesEditor } from "./MainTilesEditor";

export const dynamic = "force-dynamic";

export default async function HomepageAdminPage() {
  const supabase = await createClient();

  const [{ data: profileRow }, { data: mainProjects }] = await Promise.all([
    supabase.from("profile").select("*").eq("id", 1).maybeSingle(),
    supabase.from("projects").select("*").eq("section", "main").order("position", { ascending: true }),
  ]);

  const profile = (profileRow as Profile | null) ?? EMPTY_PROFILE;

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <AdminHeader title="Homepage" back={{ href: "/admin", label: "Dashboard" }} />
      <div className="mx-auto max-w-[760px] px-5 py-8 sm:px-8 space-y-8">
        <HomepageForm profile={profile} />
        <MainTilesEditor projects={(mainProjects ?? []) as Project[]} />
      </div>
    </main>
  );
}
