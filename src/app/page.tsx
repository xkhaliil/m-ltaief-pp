import { createPublicClient } from "@/lib/supabase/public";
import type { Project } from "@/types/project";
import type { Profile } from "@/types/profile";
import { SiteClient } from "./SiteClient";

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("section", { ascending: true })
      .order("position", { ascending: true });

    if (error) throw error;
    return (data ?? []) as Project[];
  } catch {
    // Supabase not configured yet, or the table is empty — render an
    // empty site instead of crashing the page.
    return [];
  }
}

async function getProfile(): Promise<Profile | null> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", 1)
      .maybeSingle();

    if (error) throw error;
    return data as Profile | null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const [projects, profile] = await Promise.all([getProjects(), getProfile()]);
  return <SiteClient projects={projects} profile={profile} />;
}
