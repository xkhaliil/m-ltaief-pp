"use client";

type Props = {
  label: string;
  hint?: string;
  items: string[];
  onChange: (items: string[]) => void;
  multiline?: boolean;
  placeholder?: string;
};

export function StringListEditor({
  label,
  hint,
  items,
  onChange,
  multiline,
  placeholder,
}: Props) {
  const update = (index: number, value: string) => {
    const next = [...items];
    next[index] = value;
    onChange(next);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const Field = multiline ? "textarea" : "input";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          + Add
        </button>
      </div>
      {hint ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}

      <div className="mt-3 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <Field
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(index, e.target.value)}
              rows={multiline ? 4 : undefined}
              className="flex-1 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100 focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100"
            />
            <div className="flex flex-col gap-0.5 shrink-0 text-slate-400 dark:text-slate-600">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="flex h-7 w-7 items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Nothing yet.</p>
        ) : null}
      </div>
    </div>
  );
}
