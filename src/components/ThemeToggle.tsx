"use client";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
}

// Both icons are always mounted; the crossfade between them is driven purely
// by CSS (dark:opacity-*), not React state, so there's nothing to hydrate
// and no flash before the theme is known.
export function ThemeToggle({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className={`fixed right-5 top-5 z-50 h-[22px] w-[22px] cursor-pointer ${className ?? ""}`}
    >
      {/* Positioning context for the two stacked icons lives on this inner
          span, not the button itself, so a caller's own `absolute`/`block`
          className never collides with it (both setting `position` on the
          same element would silently pick one — Tailwind's utility order,
          not attribute order, decides which). */}
      <span className="relative block h-full w-full">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-full w-full transition-opacity duration-300 ease-in-out dark:opacity-0"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19.1v2.4M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.9 19.1l1.7-1.7M17.4 6.6l1.7-1.7" />
        </svg>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 ease-in-out dark:opacity-100"
          aria-hidden="true"
        >
          <path d="M20.5 14.5A8.5 8.5 0 1 1 9.5 3.5a7 7 0 0 0 11 11Z" />
        </svg>
      </span>
    </button>
  );
}
