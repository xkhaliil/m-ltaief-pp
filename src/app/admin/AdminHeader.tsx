import Link from "next/link";
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
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[960px] items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="min-w-0">
          {back ? (
            <Link
              href={back.href}
              className="mb-1 inline-block text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
              ← {back.label}
            </Link>
          ) : null}
          <h1 className="truncate text-base font-semibold text-slate-900">{title}</h1>
          {email ? <p className="mt-0.5 text-xs text-slate-500">{email}</p> : null}
        </div>
        <nav className="flex shrink-0 items-center gap-4 text-xs font-medium">
          <Link href="/admin" className="text-slate-500 hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <Link
            href="/"
            target="_blank"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            View site
          </Link>
          <form action={signOut}>
            <button type="submit" className="text-slate-500 hover:text-slate-900 transition-colors">
              Sign out
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
