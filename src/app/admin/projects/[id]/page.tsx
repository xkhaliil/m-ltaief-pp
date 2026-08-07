import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Project } from "@/types/project";
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
    <main className="min-h-screen bg-paper text-ink px-5 py-6 sm:py-8">
      <div className="mx-auto">
        <ProjectForm project={project} />
      </div>
    </main>
  );
}
