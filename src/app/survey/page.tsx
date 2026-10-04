import type { Metadata } from "next";
import Link from "next/link";
import { SurveyWizard } from "@/components/survey/SurveyWizard";

export const metadata: Metadata = {
  title: "Khảo sát trải nghiệm sản phẩm",
  description:
    "Tham gia khảo sát 8 bước về smartphone, laptop, tai nghe và các sản phẩm điện tử bạn đang sử dụng. Ẩn danh, miễn phí, chỉ mất khoảng 3 phút.",
};

export default function SurveyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50/80 via-white to-white">
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Điều hướng">
          <Link href="/" className="flex items-center gap-2.5" aria-label="TechVoice — về trang chủ">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 shadow-lg shadow-sky-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden>
                <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 10.5V19a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-8.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Tech<span className="text-sky-600">Voice</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-[14px] font-semibold text-slate-500 transition-colors hover:text-sky-600"
          >
            ← Về trang chủ
          </Link>
        </nav>
      </header>
      <main>
        <SurveyWizard />
      </main>
    </div>
  );
}
