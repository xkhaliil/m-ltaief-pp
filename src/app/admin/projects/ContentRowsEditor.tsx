"use client";

import { useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ContentItem, ContentRow, RowLayout } from "@/types/project";
import { ROW_LAYOUTS, ROW_LAYOUT_ORDER, newClientId, pdfLabel, isWebLink } from "@/lib/content-rows";
import { parseVideoEmbed } from "@/lib/video-embed";
import { ImageWithSkeleton } from "@/components/ImageWithSkeleton";
import { RichTextEditor } from "@/components/RichTextEditor";

type EditableItem = ContentItem & { _id: string };
type EditableRow = { id: string; layout: RowLayout; items: EditableItem[] };

type Props = {
  rows: ContentRow[];
  images: string[];
  onChange: (rows: ContentRow[]) => void;
};

function tagRows(rows: ContentRow[]): EditableRow[] {
  return rows.map((row) => ({
    id: row.id,
    layout: row.layout,
    items: row.items.map((item) => ({ ...item, _id: newClientId("item") })),
  }));
}

function stripRows(rows: EditableRow[]): ContentRow[] {
  return rows.map((row) => ({
    id: row.id,
    layout: row.layout,
    items: row.items.map(({ _id, ...item }) => item),
  }));
}

function defaultLayoutForCount(count: number): RowLayout {
  if (count <= 1) return "full";
  if (count === 2) return "half-half";
  return "thirds";
}

function filename(src: string) {
  const clean = src.split("?")[0];
  const parts = clean.split("/");
  return parts[parts.length - 1] || src;
}

const cardInputClass =
  "block w-full rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-900 dark:focus:border-slate-100";
const typeTagClass =
  "mb-1 inline-block rounded bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400";

export function ContentRowsEditor({ rows: initialRows, images, onChange }: Props) {
  const [rows, setRows] = useState<EditableRow[]>(() => tagRows(initialRows));
  const [draggingLabel, setDraggingLabel] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const commit = (next: EditableRow[]) => {
    setRows(next);
    onChange(stripRows(next));
  };

  const findRowIndexByItemId = (rowList: EditableRow[], itemId: string) =>
    rowList.findIndex((row) => row.items.some((i) => i._id === itemId));

  function handleDragStart(event: DragStartEvent) {
    const id = String(event.active.id);
    if (id.startsWith("row:")) {
      setDraggingLabel("row");
      return;
    }
    if (id.startsWith("item:")) {
      const itemId = id.slice(5);
      const rowIndex = findRowIndexByItemId(rows, itemId);
      const item = rowIndex === -1 ? null : rows[rowIndex].items.find((i) => i._id === itemId);
      setDraggingLabel(item?.type ?? "item");
    }
  }

  // Live cross-row move while dragging, so items visibly slot in as you
  // hover a different row — matches how Trello-style boards feel; onDragEnd
  // below only has to handle same-row reordering + cleanup afterward.
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);
    if (!activeId.startsWith("item:") || activeId === overId) return;

    const activeItemId = activeId.slice(5);
    const activeRowIndex = findRowIndexByItemId(rows, activeItemId);
    if (activeRowIndex === -1) return;

    let overRowIndex = -1;
    let overItemIndex = -1;
    if (overId.startsWith("row:")) {
      overRowIndex = rows.findIndex((r) => r.id === overId.slice(4));
      overItemIndex = overRowIndex === -1 ? -1 : rows[overRowIndex].items.length;
    } else if (overId.startsWith("item:")) {
      const overItemId = overId.slice(5);
      overRowIndex = findRowIndexByItemId(rows, overItemId);
      overItemIndex =
        overRowIndex === -1 ? -1 : rows[overRowIndex].items.findIndex((i) => i._id === overItemId);
    }
    if (overRowIndex === -1 || activeRowIndex === overRowIndex) return;
    if (rows[overRowIndex].items.length >= 3) return; // rows cap at 3 up (thirds)

    setRows((prev) => {
      const next = prev.map((r) => ({ ...r, items: [...r.items] }));
      const fromIndex = next[activeRowIndex].items.findIndex((i) => i._id === activeItemId);
      if (fromIndex === -1) return prev;
      const [moved] = next[activeRowIndex].items.splice(fromIndex, 1);
      const insertAt = overItemIndex === -1 ? next[overRowIndex].items.length : overItemIndex;
      next[overRowIndex].items.splice(insertAt, 0, moved);
      return next;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setDraggingLabel(null);
    if (!over) return;
    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("row:")) {
      if (!overId.startsWith("row:")) return;
      const from = rows.findIndex((r) => r.id === activeId.slice(4));
      const to = rows.findIndex((r) => r.id === overId.slice(4));
      if (from !== -1 && to !== -1 && from !== to) commit(arrayMove(rows, from, to));
      return;
    }

    if (activeId.startsWith("item:")) {
      const activeItemId = activeId.slice(5);
      const rowIndex = findRowIndexByItemId(rows, activeItemId);
      if (rowIndex === -1) return;

      let next = rows.map((r) => ({ ...r, items: [...r.items] }));

      if (overId.startsWith("item:")) {
        const overItemId = overId.slice(5);
        const overRowIndex = findRowIndexByItemId(next, overItemId);
        if (overRowIndex === rowIndex) {
          const from = next[rowIndex].items.findIndex((i) => i._id === activeItemId);
          const to = next[rowIndex].items.findIndex((i) => i._id === overItemId);
          if (from !== -1 && to !== -1 && from !== to) {
            next[rowIndex].items = arrayMove(next[rowIndex].items, from, to);
          }
        }
      }

      // Drop rows left empty by the move, and snap any row whose item
      // count no longer matches its layout to a sensible default —
      // otherwise a row could show fewer filled slots than its layout
      // expects (blank gaps) after items get dragged out of it.
      next = next
        .filter((r) => r.items.length > 0)
        .map((r) =>
          ROW_LAYOUTS[r.layout].fractions.length === r.items.length
            ? r
            : { ...r, layout: defaultLayoutForCount(r.items.length) },
        );

      commit(next);
    }
  }

  const addRow = () => {
    commit([...rows, { id: newClientId("row"), layout: "full", items: [] }]);
  };

  const removeRow = (rowIndex: number) => {
    commit(rows.filter((_, i) => i !== rowIndex));
  };

  const setLayout = (rowIndex: number, layout: RowLayout) => {
    const next = [...rows];
    next[rowIndex] = { ...next[rowIndex], layout };
    commit(next);
  };

  const addItem = (rowIndex: number, item: ContentItem) => {
    const next = [...rows];
    const row = next[rowIndex];
    next[rowIndex] = { ...row, items: [...row.items, { ...item, _id: newClientId("item") }] };
    commit(next);
  };

  const updateItem = (rowIndex: number, itemId: string, patch: Partial<ContentItem>) => {
    const next = [...rows];
    next[rowIndex] = {
      ...next[rowIndex],
      items: next[rowIndex].items.map((i) => (i._id === itemId ? ({ ...i, ...patch } as EditableItem) : i)),
    };
    commit(next);
  };

  const removeItem = (rowIndex: number, itemId: string) => {
    const items = rows[rowIndex].items.filter((i) => i._id !== itemId);
    if (items.length === 0) {
      removeRow(rowIndex);
      return;
    }
    const next = [...rows];
    const layout = ROW_LAYOUTS[next[rowIndex].layout].fractions.length === items.length
      ? next[rowIndex].layout
      : defaultLayoutForCount(items.length);
    next[rowIndex] = { ...next[rowIndex], items, layout };
    commit(next);
  };

  const rowIds = rows.map((r) => `row:${r.id}`);

  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Article layout</h3>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Drag the ⠿ handle to reorder rows, or drag an item onto another row to place it side by
            side. Pick a row&apos;s split to control how it&apos;s divided.
          </p>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="shrink-0 rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
        >
          + Add row
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={rowIds} strategy={verticalListSortingStrategy}>
          <div className="mt-4 space-y-3">
            {rows.map((row, rowIndex) => (
              <RowCard
                key={row.id}
                row={row}
                rowIndex={rowIndex}
                images={images}
                onSetLayout={(layout) => setLayout(rowIndex, layout)}
                onRemoveRow={() => removeRow(rowIndex)}
                onAddItem={(item) => addItem(rowIndex, item)}
                onUpdateItem={(itemId, patch) => updateItem(rowIndex, itemId, patch)}
                onRemoveItem={(itemId) => removeItem(rowIndex, itemId)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {rows.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          No content yet — add a row, then fill it with text, an image, or a video.
        </p>
      ) : draggingLabel ? (
        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">Moving {draggingLabel}…</p>
      ) : null}
    </div>
  );
}

function RowCard({
  row,
  rowIndex,
  images,
  onSetLayout,
  onRemoveRow,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
}: {
  row: EditableRow;
  rowIndex: number;
  images: string[];
  onSetLayout: (layout: RowLayout) => void;
  onRemoveRow: () => void;
  onAddItem: (item: ContentItem) => void;
  onUpdateItem: (itemId: string, patch: Partial<ContentItem>) => void;
  onRemoveItem: (itemId: string) => void;
}) {
  // useSortable already registers `row:${row.id}` as a droppable target (it
  // combines useDraggable + useDroppable under one id) — that's what item
  // drags land on via the onDragOver/onDragEnd "row:" branch, so no separate
  // useDroppable call is needed here.
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `row:${row.id}`,
    data: { type: "row" },
  });

  const layoutMeta = ROW_LAYOUTS[row.layout];
  const slotCount = Math.max(layoutMeta.fractions.length, row.items.length);
  const itemIds = row.items.map((i) => `item:${i._id}`);

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="flex h-6 w-6 cursor-grab items-center justify-center rounded text-slate-400 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 active:cursor-grabbing"
            aria-label="Drag to reorder row"
          >
            ⠿
          </button>
          <span className="text-[10px] font-medium text-slate-400 dark:text-slate-600">
            Row {rowIndex + 1}
          </span>
          <div className="flex gap-1">
            {ROW_LAYOUT_ORDER.map((layout) => (
              <button
                key={layout}
                type="button"
                title={ROW_LAYOUTS[layout].label}
                onClick={() => onSetLayout(layout)}
                className={`rounded px-2 py-1 text-[11px] font-medium transition-colors ${
                  row.layout === layout
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {ROW_LAYOUTS[layout].glyph}
              </button>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={onRemoveRow}
          className="shrink-0 rounded p-1 text-slate-400 dark:text-slate-600 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          aria-label="Remove row"
        >
          ✕
        </button>
      </div>

      <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${slotCount}, minmax(0, 1fr))` }}>
          {Array.from({ length: slotCount }).map((_, slotIndex) => {
            const item = row.items[slotIndex];
            return item ? (
              <ItemCard
                key={item._id}
                item={item}
                images={images}
                onUpdate={(patch) => onUpdateItem(item._id, patch)}
                onRemove={() => onRemoveItem(item._id)}
              />
            ) : (
              <EmptySlot key={`empty-${slotIndex}`} images={images} onAdd={onAddItem} />
            );
          })}
        </div>
      </SortableContext>
    </div>
  );
}

function EmptySlot({ images, onAdd }: { images: string[]; onAdd: (item: ContentItem) => void }) {
  return (
    <div className="flex min-h-[96px] flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-slate-300 dark:border-slate-700 p-2">
      <button
        type="button"
        onClick={() => onAdd({ type: "text", text: "" })}
        className="w-full rounded border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        + Text
      </button>
      <button
        type="button"
        onClick={() => onAdd({ type: "image", src: images[0] ?? "" })}
        disabled={images.length === 0}
        title={images.length === 0 ? "Upload an image in the Gallery section below first" : undefined}
        className="w-full rounded border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        + Image
      </button>
      <button
        type="button"
        onClick={() => onAdd({ type: "video", src: "" })}
        className="w-full rounded border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        + Video / Audio
      </button>
      <button
        type="button"
        onClick={() => onAdd({ type: "pdf", src: "" })}
        className="w-full rounded border border-slate-300 dark:border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        + PDF
      </button>
    </div>
  );
}

function ItemCard({
  item,
  images,
  onUpdate,
  onRemove,
}: {
  item: EditableItem;
  images: string[];
  onUpdate: (patch: Partial<ContentItem>) => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `item:${item._id}`,
    data: { type: "item" },
  });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`min-w-0 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="flex h-5 w-5 cursor-grab items-center justify-center rounded text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 active:cursor-grabbing"
            aria-label="Drag item"
          >
            ⠿
          </button>
          <span className={typeTagClass}>{item.type}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="flex h-5 w-5 items-center justify-center rounded text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          aria-label="Remove item"
        >
          ✕
        </button>
      </div>

      {item.type === "text" ? (
        <RichTextEditor value={item.text} onChange={(html) => onUpdate({ type: "text", text: html })} />
      ) : item.type === "image" ? (
        <div className="space-y-1.5">
          {item.src ? (
            <ImageWithSkeleton
              src={item.src}
              alt=""
              wrapperClassName="aspect-square w-full max-w-[200px] rounded bg-slate-200 dark:bg-slate-700"
              className="rounded"
              sizes="200px"
            />
          ) : (
            <div className="aspect-square w-full max-w-[200px] rounded bg-slate-200 dark:bg-slate-700" />
          )}
          <select
            value={item.src}
            onChange={(e) => onUpdate({ type: "image", src: e.target.value })}
            className={cardInputClass}
          >
            {!images.includes(item.src) ? (
              <option value={item.src}>{item.src ? filename(item.src) : "(choose an image)"}</option>
            ) : null}
            {images.map((src) => (
              <option key={src} value={src}>
                {filename(src)}
              </option>
            ))}
          </select>
        </div>
      ) : item.type === "video" ? (
        <div className="space-y-1.5">
          {(() => {
            const embed = item.src ? parseVideoEmbed(item.src) : null;
            if (!embed) {
              return (
                <div className="flex aspect-video w-full items-center justify-center rounded bg-slate-200 dark:bg-slate-700 text-[10px] text-slate-400 dark:text-slate-600">
                  Paste a link below
                </div>
              );
            }
            return embed.kind === "audio" ? (
              <iframe src={embed.src} className="h-[166px] w-full rounded border-0" title={embed.label} />
            ) : (
              <iframe
                src={embed.src}
                className="aspect-video w-full rounded border-0"
                title={embed.label}
              />
            );
          })()}
          <input
            value={item.src}
            onChange={(e) => onUpdate({ type: "video", src: e.target.value })}
            placeholder="Vimeo/YouTube link, SoundCloud link, or Vimeo ID"
            className={cardInputClass}
          />
        </div>
      ) : (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 rounded bg-slate-200 dark:bg-slate-700 px-2.5 py-3 text-[11px] text-slate-600 dark:text-slate-300">
            <PdfGlyph />
            <span className="truncate">{item.src ? pdfLabel(item.src) : "Paste a link below"}</span>
          </div>
          <input
            value={item.src}
            onChange={(e) => onUpdate({ type: "pdf", src: e.target.value })}
            placeholder="Google Drive/Docs share link (or any direct PDF link)"
            className={cardInputClass}
          />
          {item.src && !isWebLink(item.src) ? (
            <p className="rounded bg-red-50 dark:bg-red-950/40 px-2 py-1.5 text-[11px] text-red-700 dark:text-red-300">
              {item.src.startsWith("file://")
                ? "That's a path to a file on your own computer — it will never open for visitors. Upload the PDF to Google Drive (or similar), set it to “Anyone with the link”, and paste that share link instead."
                : "This needs to be a real web link (starting with https://) — a Google Drive/Docs share link, or any direct link to a hosted PDF."}
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
}

function PdfGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0" aria-hidden="true">
      <path
        d="M3.5 1.5h6L12.5 5v9a.5.5 0 0 1-.5.5H3.5a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M9.5 1.5V5h3" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
