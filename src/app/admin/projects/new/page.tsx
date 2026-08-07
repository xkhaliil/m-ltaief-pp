import { ProjectForm } from "../ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-paper text-ink px-5 py-6 sm:py-8">
      <div className="mx-auto">
        <ProjectForm project={null} />
      </div>
    </main>
  );
}
