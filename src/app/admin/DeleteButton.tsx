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
      <button type="submit" className="text-muted hover:text-accent transition-colors">
        Delete
      </button>
    </form>
  );
}
