import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { signOut } from "./actions";

export function AdminHeader({
  title,
  email,
  back,
}: {
  title: string;
  email?: string;
  back?: { href: string; label: string };
}) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
      <ThemeToggle className="text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors" />
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="min-w-0">
          {back ? (
            <Link
              href={back.href}
              className="mb-1 inline-block text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              ← {back.label}
            </Link>
          ) : null}
          <h1 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
          {email ? <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{email}</p> : null}
        </div>
        <nav className="flex shrink-0 items-center gap-4 text-xs font-medium">
          <Link href="/admin" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            Dashboard
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            View site
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
