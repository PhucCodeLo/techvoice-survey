import type { Metadata } from "next";
import Link from "next/link";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Thống kê khảo sát",
  description: "Dashboard thống kê kết quả khảo sát sản phẩm công nghệ.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5" aria-label="TechVoice — về trang chủ">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden>
                  <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M5.5 10.5V19a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-8.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[16px] font-extrabold text-slate-900">
                Tech<span className="text-sky-600">Voice</span>
                <span className="ml-2 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                  Admin
                </span>
              </span>
            </Link>
          </div>
          <Link href="/" className="text-[14px] font-semibold text-slate-500 transition-colors hover:text-sky-600">
            ← Về trang chủ
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Tổng quan khảo sát
          </h1>
          <p className="mt-2 text-[15px] text-slate-500">
            Thống kê trực quan từ các bài khảo sát của người dùng.
          </p>
        </div>
        <AdminDashboard />
      </main>
    </div>
  );
}
