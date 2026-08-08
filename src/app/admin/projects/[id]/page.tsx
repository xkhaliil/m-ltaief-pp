import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";
import { AdminHeader } from "../../AdminHeader";
import { ProjectForm } from "../ProjectForm";

export const dynamic = "force-dynamic";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle<Project>();

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-100">
      <AdminHeader title={project.title} back={{ href: "/admin", label: "Dashboard" }} />
      <div className="mx-auto max-w-[760px] px-5 py-8 sm:px-8">
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
