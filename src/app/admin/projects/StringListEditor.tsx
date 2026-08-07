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
      <div className="flex items-baseline justify-between">
        <span className="block text-muted text-[12px]">{label}</span>
        <button
          type="button"
          onClick={() => onChange([...items, ""])}
          className="text-[12px] text-muted hover:text-accent transition-colors"
        >
          + Add
        </button>
      </div>
      {hint ? <p className="text-[11px] text-muted mt-0.5">{hint}</p> : null}

      <div className="mt-2 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-2">
            <Field
              value={item}
              placeholder={placeholder}
              onChange={(e) => update(index, e.target.value)}
              rows={multiline ? 4 : undefined}
              className="flex-1 border border-border px-2 py-1.5 text-[13px] outline-none focus:border-accent"
            />
            <div className="flex flex-col gap-1 text-[11px] text-muted shrink-0 pt-1">
              <button
                type="button"
                onClick={() => move(index, -1)}
                disabled={index === 0}
                className="hover:text-accent disabled:opacity-30 transition-colors"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                className="hover:text-accent disabled:opacity-30 transition-colors"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(index)}
                className="hover:text-accent transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 ? (
          <p className="text-[12px] text-muted">Nothing yet.</p>
        ) : null}
      </div>
    </div>
  );
}
