"use client";

import type { FieldDef } from "./steps";
import type { SurveyFormValues } from "@/lib/survey/types";
import { cn } from "@/lib/utils";

interface FieldProps {
  field: FieldDef;
  value: SurveyFormValues[keyof SurveyFormValues];
  error?: string;
  onChange: (name: keyof SurveyFormValues, value: unknown) => void;
}

const baseInput =
  "w-full rounded-xl border bg-white px-4 py-3.5 text-[16px] text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/15";

function Label({ field }: { field: FieldDef }) {
  return (
    <label className="mb-2 flex items-baseline gap-2 text-[15px] font-semibold text-slate-800">
      {field.label}
      {field.required && (
        <span className="text-rose-500" aria-hidden>
          *
        </span>
      )}
      {field.hint && (
        <span className="text-[13px] font-normal text-slate-400">({field.hint})</span>
      )}
    </label>
  );
}

function ErrorText({ error }: { error?: string }) {
  if (!error) return null;
  return (
    <p role="alert" className="mt-1.5 flex items-center gap-1.5 text-[13px] font-medium text-rose-600">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
      </svg>
      {error}
    </p>
  );
}

export function SurveyField({ field, value, error, onChange }: FieldProps) {
  const invalid = Boolean(error);
  const inputClass = cn(baseInput, invalid ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/15" : "border-slate-200");

  switch (field.type) {
    case "text":
      return (
        <div>
          <Label field={field} />
          <input
            type="text"
            className={inputClass}
            placeholder={field.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            aria-invalid={invalid}
          />
          <ErrorText error={error} />
        </div>
      );

    case "textarea":
      return (
        <div>
          <Label field={field} />
          <textarea
            className={cn(inputClass, "resize-y leading-relaxed")}
            placeholder={field.placeholder}
            rows={field.rows ?? 3}
            value={(value as string) ?? ""}
            onChange={(e) => onChange(field.name, e.target.value)}
            aria-invalid={invalid}
          />
          <ErrorText error={error} />
        </div>
      );

    case "select":
      return (
        <div>
          <Label field={field} />
          <div className="relative">
            <select
              className={cn(inputClass, "appearance-none pr-11", !(value as string) && "text-slate-400")}
              value={(value as string) ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              aria-invalid={invalid}
            >
              <option value="" disabled>
                {field.placeholder ?? "Chọn một đáp án"}
              </option>
              {field.options?.map((o) => (
                <option key={o.value} value={o.value} className="text-slate-900">
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" aria-hidden
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <ErrorText error={error} />
        </div>
      );

    case "radio":
      return (
        <fieldset>
          <Label field={field} />
          <div className="grid gap-2.5" role="radiogroup">
            {field.options?.map((o) => {
              const checked = value === o.value;
              return (
                <button
                  key={o.value}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  onClick={() => onChange(field.name, o.value)}
                  className={cn(
                    "flex min-h-[52px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 active:scale-[0.99]",
                    checked
                      ? "border-sky-500 bg-sky-50 text-sky-900 shadow-sm ring-4 ring-sky-500/10"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
                    invalid && !checked && "border-rose-200"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                      checked ? "border-sky-500" : "border-slate-300"
                    )}
                    aria-hidden
                  >
                    {checked && <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />}
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>
          <ErrorText error={error} />
        </fieldset>
      );

    case "checkbox":
      return (
        <fieldset>
          <Label field={field} />
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2" role="group">
            {field.options?.map((o) => {
              const arr = (value as string[]) ?? [];
              const checked = arr.includes(o.value);
              return (
                <button
                  key={o.value}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => {
                    const next = checked
                      ? arr.filter((v) => v !== o.value)
                      : [...arr, o.value];
                    onChange(field.name, next);
                  }}
                  className={cn(
                    "flex min-h-[52px] items-center gap-3 rounded-xl border px-4 py-3 text-left text-[15px] font-medium transition-all duration-200 active:scale-[0.99]",
                    checked
                      ? "border-sky-500 bg-sky-50 text-sky-900 shadow-sm ring-4 ring-sky-500/10"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                      checked ? "border-sky-500 bg-sky-500 text-white" : "border-slate-300 text-transparent"
                    )}
                    aria-hidden
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {o.label}
                </button>
              );
            })}
          </div>
          <ErrorText error={error} />
        </fieldset>
      );

    case "rating": {
      const current = (value as number | null) ?? 0;
      return (
        <fieldset>
          <Label field={field} />
          <div className="flex items-center justify-center gap-2 sm:gap-3" role="radiogroup" aria-label={field.label}>
            {[1, 2, 3, 4, 5].map((n) => {
              const active = n <= current;
              return (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={current === n}
                  aria-label={`${n} sao`}
                  onClick={() => onChange(field.name, n)}
                  className="group flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-200 hover:scale-110 active:scale-95 sm:h-16 sm:w-16"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className={cn(
                      "h-10 w-10 transition-all duration-200 sm:h-12 sm:w-12",
                      active ? "fill-amber-400 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]" : "fill-slate-200 group-hover:fill-amber-200"
                    )}
                    aria-hidden
                  >
                    <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4 6.1 20.7l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
                  </svg>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[13px] text-slate-500">
            {current > 0 ? `Bạn đã chọn ${current}/5` : "Chạm để chọn số sao"}
          </p>
          <ErrorText error={error} />
        </fieldset>
      );
    }

    default:
      return null;
  }
}
