"use client";

import { inputClass } from "./ui";
import ImageUpload from "./ImageUpload";

type Row = Record<string, string>;

export interface RepeaterColumn<T extends Row> {
  key: keyof T & string;
  label: string;
  multiline?: boolean;
  placeholder?: string;
  /** Show an image uploader instead of a text box */
  image?: boolean;
  /** Small help text under the field */
  hint?: string;
}

/**
 * Add / remove / reorder rows of simple text fields.
 * Replaces the old "type JSON into a textarea" approach.
 */
export default function RepeaterField<T extends Row>({
  items,
  onChange,
  columns,
  emptyRow,
  addLabel,
  emptyText,
  errors = {},
  errorPrefix,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  columns: RepeaterColumn<T>[];
  emptyRow: T;
  addLabel: string;
  emptyText?: string;
  errors?: Record<string, string>;
  errorPrefix: string;
}) {
  const update = (index: number, key: keyof T & string, value: string) =>
    onChange(items.map((item, i) => (i === index ? ({ ...item, [key]: value } as T) : item)));

  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const iconBtn =
    "h-8 w-8 rounded-md border border-white/10 text-gray-300 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div className="space-y-3">
      {items.length === 0 && emptyText && <p className="text-sm text-gray-500 italic">{emptyText}</p>}

      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-white/10 bg-[#0e1730] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono text-gray-500">#{index + 1}</span>
            <div className="flex gap-1.5">
              <button type="button" className={iconBtn} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
                ↑
              </button>
              <button
                type="button"
                className={iconBtn}
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
                aria-label="Move down"
              >
                ↓
              </button>
              <button
                type="button"
                className={`${iconBtn} text-red-400 hover:bg-red-500/10`}
                onClick={() => remove(index)}
                aria-label="Remove"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {columns.map((col) => {
              const error = errors[`${errorPrefix}.${index}.${col.key}`];
              return (
                <div key={col.key}>
                  <label className="block text-xs font-medium text-gray-400 mb-1">{col.label}</label>
                  {col.image ? (
                    <ImageUpload value={item[col.key] ?? ""} onChange={(url) => update(index, col.key, url)} folder="products" />
                  ) : col.multiline ? (
                    <textarea
                      rows={3}
                      value={item[col.key] ?? ""}
                      placeholder={col.placeholder}
                      onChange={(e) => update(index, col.key, e.target.value)}
                      className={inputClass}
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[col.key] ?? ""}
                      placeholder={col.placeholder}
                      onChange={(e) => update(index, col.key, e.target.value)}
                      className={inputClass}
                    />
                  )}
                  {col.hint && <p className="mt-1 text-xs text-gray-500">{col.hint}</p>}
                  {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, { ...emptyRow }])}
        className="w-full rounded-lg border border-dashed border-white/20 py-2.5 text-sm text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
      >
        + {addLabel}
      </button>
    </div>
  );
}
