"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AGE_LABELS,
  CATEGORY_LABELS,
  DURATION_LABELS,
  EMPTY_FORM,
  GENDER_LABELS,
  REPURCHASE_LABELS,
  type ProductCategory,
  type SurveyFormValues,
} from "@/lib/survey/types";
import { STEPS, TOTAL_STEPS, validateStep } from "./steps";
import { SurveyField } from "./Field";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const labelOf = (name: keyof SurveyFormValues, raw: unknown): string => {
  if (raw === null || raw === undefined || raw === "") return "—";
  switch (name) {
    case "age":
      return AGE_LABELS[raw as keyof typeof AGE_LABELS] ?? String(raw);
    case "gender":
      return raw ? (GENDER_LABELS[raw as keyof typeof GENDER_LABELS] ?? String(raw)) : "—";
    case "categories":
      return (raw as ProductCategory[]).map((c) => CATEGORY_LABELS[c] ?? c).join(", ");
    case "usageDuration":
      return DURATION_LABELS[raw as keyof typeof DURATION_LABELS] ?? String(raw);
    case "satisfaction":
      return `${raw}/5`;
    case "repurchase":
      return REPURCHASE_LABELS[raw as keyof typeof REPURCHASE_LABELS] ?? String(raw);
    default:
      return String(raw);
  }
};

const REVIEW_ROWS: { name: keyof SurveyFormValues; label: string }[] = [
  { name: "age", label: "Độ tuổi" },
  { name: "gender", label: "Giới tính" },
  { name: "occupation", label: "Nghề nghiệp" },
  { name: "categories", label: "Nhóm sản phẩm" },
  { name: "brand", label: "Thương hiệu" },
  { name: "model", label: "Model" },
  { name: "usageDuration", label: "Thời gian sử dụng" },
  { name: "satisfaction", label: "Mức độ hài lòng" },
  { name: "strengths", label: "Điểm mạnh" },
  { name: "weaknesses", label: "Điểm yếu" },
  { name: "fairPrice", label: "Mức giá đáng mua" },
  { name: "repurchase", label: "Tiếp tục mua" },
  { name: "improvements", label: "Muốn cải thiện" },
  { name: "otherFeedback", label: "Ý kiến khác" },
];

export function SurveyWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<SurveyFormValues>(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  const isLast = step === TOTAL_STEPS - 1;
  const progress = useMemo(() => ((step + 1) / TOTAL_STEPS) * 100, [step]);

  const handleChange = useCallback((name: keyof SurveyFormValues, value: unknown) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name as string]) return prev;
      const next = { ...prev };
      delete next[name as string];
      return next;
    });
  }, []);

  const scrollTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = () => {
    const errs = validateStep(step, values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, TOTAL_STEPS - 1));
    scrollTop();
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
    scrollTop();
  };

  const handleSubmit = async () => {
    // Validate toàn bộ form trước khi gửi
    for (let i = 0; i < TOTAL_STEPS - 1; i++) {
      const errs = validateStep(i, values);
      if (Object.keys(errs).length > 0) {
        setStep(i);
        setErrors(errs);
        scrollTop();
        return;
      }
    }
    setStatus("submitting");
    setSubmitError("");
    try {
      const payload = {
        age: values.age,
        gender: values.gender || undefined,
        occupation: values.occupation,
        categories: values.categories,
        brand: values.brand.trim(),
        model: values.model.trim(),
        usageDuration: values.usageDuration,
        satisfaction: values.satisfaction,
        strengths: values.strengths.trim(),
        weaknesses: values.weaknesses.trim(),
        fairPrice: values.fairPrice.trim(),
        repurchase: values.repurchase,
        improvements: values.improvements.trim(),
        otherFeedback: values.otherFeedback.trim() || undefined,
      };
      const res = await fetch("/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Gửi khảo sát thất bại, vui lòng thử lại.");
      }
      setStatus("success");
      scrollTop();
    } catch (e) {
      setStatus("error");
      setSubmitError(e instanceof Error ? e.message : "Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  /* ------------------------- Success screen ------------------------- */
  if (status === "success") {
    return (
      <div ref={topRef} className="mx-auto w-full max-w-2xl px-4 py-16 text-center sm:py-24">
        <div className="animate-pop mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" aria-hidden>
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Cảm ơn bạn đã chia sẻ ý kiến!
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-slate-600">
          Ý kiến của bạn đã được ghi nhận và sẽ giúp các thương hiệu tạo ra những
          sản phẩm tốt hơn trong tương lai.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => router.push("/")}
            className="rounded-xl bg-sky-600 px-8 py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-700 active:scale-[0.98]"
          >
            Về trang chủ
          </button>
          <button
            onClick={() => {
              setValues(EMPTY_FORM);
              setStep(0);
              setStatus("idle");
            }}
            className="rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-[16px] font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]"
          >
            Làm khảo sát khác
          </button>
        </div>
      </div>
    );
  }

  const current = STEPS[step];

  return (
    <div ref={topRef} className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-[14px] font-medium">
          <span className="text-slate-500">
            Bước <span className="font-bold text-slate-900">{step + 1}</span> / {TOTAL_STEPS}
          </span>
          <span className="text-slate-500">{Math.round(progress)}%</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemin={1}
          aria-valuemax={TOTAL_STEPS}
          aria-label="Tiến độ khảo sát"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step dots (desktop) */}
      <ol className="mb-8 hidden items-center justify-between sm:flex" aria-hidden>
        {STEPS.map((s, i) => (
          <li key={s.id} className="flex items-center">
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-bold transition-colors",
                i < step
                  ? "bg-sky-600 text-white"
                  : i === step
                    ? "bg-sky-100 text-sky-700 ring-2 ring-sky-500"
                    : "bg-slate-100 text-slate-400"
              )}
            >
              {i < step ? "✓" : i + 1}
            </span>
            {i < STEPS.length - 1 && (
              <span className={cn("mx-1 h-0.5 w-6 sm:w-8", i < step ? "bg-sky-500" : "bg-slate-200")} />
            )}
          </li>
        ))}
      </ol>

      {/* Card */}
      <div
        key={current.id}
        className="animate-fade-up rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_40px_-12px_rgba(2,132,199,0.15)] sm:p-10"
      >
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {current.title}
        </h1>
        <p className="mt-2 text-[15px] text-slate-500">{current.subtitle}</p>

        {current.id !== "review" ? (
          <div className="mt-8 space-y-7">
            {current.fields.map((f) => (
              <SurveyField
                key={f.name}
                field={f}
                value={values[f.name]}
                error={errors[f.name as string]}
                onChange={handleChange}
              />
            ))}
          </div>
        ) : (
          <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-slate-50/60">
            {REVIEW_ROWS.map((row) => (
              <div key={row.name} className="grid grid-cols-[130px_1fr] gap-3 px-4 py-3 text-[14px] sm:grid-cols-[180px_1fr] sm:px-5">
                <dt className="font-medium text-slate-500">{row.label}</dt>
                <dd className="font-semibold text-slate-800 break-words">{labelOf(row.name, values[row.name])}</dd>
              </div>
            ))}
          </dl>
        )}

        {submitError && (
          <p role="alert" className="mt-6 rounded-xl bg-rose-50 px-4 py-3 text-[14px] font-medium text-rose-700">
            {submitError}
          </p>
        )}

        {/* Nav buttons */}
        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 0 || status === "submitting"}
            className="rounded-xl border border-slate-200 bg-white px-8 py-3.5 text-[16px] font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Quay lại
          </button>
          {!isLast ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-xl bg-sky-600 px-10 py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-sky-600/25 transition-all hover:bg-sky-700 active:scale-[0.98]"
            >
              Tiếp tục
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={status === "submitting"}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-emerald-600 px-10 py-3.5 text-[16px] font-semibold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
            >
              {status === "submitting" && (
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              )}
              {status === "submitting" ? "Đang gửi…" : "Gửi khảo sát"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-[13px] text-slate-400">
        Thông tin của bạn được ẩn danh và chỉ dùng cho mục đích nghiên cứu.
      </p>
    </div>
  );
}
