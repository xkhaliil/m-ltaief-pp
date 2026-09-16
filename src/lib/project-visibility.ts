import type { Project } from "@/types/project";

// A project is online unless it has been explicitly switched off. Rows
// written before the `published` column existed (and any read that predates
// the 0011 migration being applied) come back with it undefined — treating
// that as online keeps the whole site from going dark if the migration
// hasn't been run yet.
export function isPublished(project: Pick<Project, "published">): boolean {
  return project.published !== false;
}
