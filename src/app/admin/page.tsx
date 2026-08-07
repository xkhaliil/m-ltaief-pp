import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Project, ProjectSection } from "@/types/project";
import { deleteProject, signOut } from "./actions";
import { DeleteButton } from "./DeleteButton";

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
    <main className="min-h-screen bg-paper text-ink px-5 py-6 sm:py-8">
      <div className="mx-auto max-w-[900px]">
        <header className="flex items-start justify-between gap-4 mb-[2em]">
          <div>
            <h1 className="font-bold text-[14px]">Mohamed-Ali Ltaief — Admin</h1>
            <p className="text-muted text-[12px] mt-1">{user?.email}</p>
          </div>
          <div className="flex items-center gap-4 text-[12px]">
            <Link
              href="/"
              target="_blank"
              className="hover:text-accent transition-colors"
            >
              View site
            </Link>
            <form action={signOut}>
              <button type="submit" className="hover:text-accent transition-colors">
                Sign out
              </button>
            </form>
          </div>
        </header>

        <div className="mb-[2em] flex gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-block border border-ink px-3 py-1.5 text-[12px] hover:bg-ink hover:text-white transition-colors"
          >
            + Add new project
          </Link>
          <Link
            href="/admin/about"
            className="inline-block border border-border px-3 py-1.5 text-[12px] hover:border-ink transition-colors"
          >
            Edit About / CV
          </Link>
        </div>

        {error ? (
          <p className="text-accent text-[13px]">
            Could not load projects: {error.message}
          </p>
        ) : null}

        {SECTION_ORDER.map((section) => {
          const items = grouped.get(section);
          if (!items?.length) return null;

          return (
            <section key={section} className="mb-[2em]">
              <h2 className="text-[12px] font-bold text-muted mb-2">
                {SECTION_LABELS[section]}
              </h2>
              <ul className="text-[13px] divide-y divide-border border-t border-b border-border">
                {items.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="min-w-0 truncate hover:text-accent transition-colors"
                    >
                      {project.title}
                    </Link>
                    <div className="flex items-center gap-4 shrink-0 text-[12px]">
                      <Link
                        href={`/admin/projects/${project.id}`}
                        className="text-muted hover:text-accent transition-colors"
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
    </main>
  );
}
