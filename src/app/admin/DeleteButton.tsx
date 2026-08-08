"use client";

export function DeleteButton({
  action,
  label,
}: {
  action: () => Promise<void>;
  label: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(event) => {
        if (!window.confirm(`Delete "${label}"? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <button type="submit" className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
        Delete
      </button>
    </form>
  );
}
