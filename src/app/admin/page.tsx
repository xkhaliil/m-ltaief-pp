import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectSection } from "@/types/project";
import { deleteProject } from "./actions";
import { DeleteButton } from "./DeleteButton";
import { AdminHeader } from "./AdminHeader";

export const dynamic = "force-dynamic";

const SECTION_LABELS: Record<ProjectSection, string> = {
  main: "Main index",
  motus: "Motus",
  "lecture-performance": "Lecture Performance / Panel",
  "writing-publishing": "Writing / Publishing Practice",
  archive: "Archive",
};

const SECTION_ORDER: ProjectSection[] = [
  "main",
  "motus",
  "lecture-performance",
  "writing-publishing",
  "archive",
];

export default async function AdminDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("section", { ascending: true })
    .order("position", { ascending: true });

  const grouped = new Map<ProjectSection, Project[]>();
  for (const project of (projects ?? []) as Project[]) {
    const list = grouped.get(project.section) ?? [];
    list.push(project);
    grouped.set(project.section, list);
  }

  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <AdminHeader title="Mohamed-Ali Ltaief — Admin" email={user?.email} />

      <div className="mx-auto max-w-[960px] px-5 py-8 sm:px-8">
        <div className="mb-6 flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="rounded-md bg-slate-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors"
          >
            + Add new project
          </Link>
          <Link
            href="/admin/about"
            className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Edit About / CV
          </Link>
          <Link
            href="/admin/homepage"
            className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Edit Homepage
          </Link>
        </div>

        {error ? (
          <p className="mb-6 rounded-md bg-red-50 dark:bg-red-950/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            Could not load projects: {error.message}
          </p>
        ) : null}

        <div className="space-y-6">
          {SECTION_ORDER.map((section) => {
            const items = grouped.get(section);
            if (!items?.length) return null;

            return (
              <section
                key={section}
                className="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              >
                <h2 className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {SECTION_LABELS[section]}
                </h2>
                <ul className="divide-y divide-slate-100">
                  {items.map((project) => (
                    <li
                      key={project.id}
                      className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="min-w-0 truncate text-sm text-slate-900 dark:text-slate-100 hover:text-slate-600 dark:hover:text-slate-400 transition-colors"
                      >
                        {project.title}
                      </Link>
                      <div className="flex shrink-0 items-center gap-4 text-xs font-medium">
                        <Link
                          href={`/admin/projects/${project.id}`}
                          className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                        >
                          Edit
                        </Link>
                        <DeleteButton
                          action={deleteProject.bind(null, project.id)}
                          label={project.title}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
