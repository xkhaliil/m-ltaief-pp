import { AdminHeader } from "../../AdminHeader";
import { ProjectForm } from "../ProjectForm";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <AdminHeader title="New project" back={{ href: "/admin", label: "Dashboard" }} />
      <div className="mx-auto max-w-[760px] px-5 py-8 sm:px-8">
        <ProjectForm project={null} />
      </div>
    </main>
  );
}
