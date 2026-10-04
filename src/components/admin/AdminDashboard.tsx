"use client";

import { useEffect, useMemo, useState } from "react";
import { computeStats, type DashboardStats } from "@/lib/survey/stats";
import { CATEGORY_LABELS, type SurveyResponse } from "@/lib/survey/types";
import { VBarChart, DonutChart, HBarList } from "./charts";

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(2,132,199,0.12)] sm:p-7">
      <h2 className="text-[17px] font-bold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-[13.5px] text-slate-500">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function StatCard({ label, value, sub, icon }: { label: string; value: string; sub: string; icon: string }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-12px_rgba(2,132,199,0.12)]">
      <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-2xl" aria-hidden>
        {icon}
      </span>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">{value}</p>
      <p className="mt-1 text-[14px] font-semibold text-slate-600">{label}</p>
      <p className="mt-0.5 text-[13px] text-slate-400">{sub}</p>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="animate-pulse space-y-5" aria-label="Đang tải dữ liệu">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-40 rounded-3xl bg-slate-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="h-72 rounded-3xl bg-slate-100" />
        <div className="h-72 rounded-3xl bg-slate-100" />
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const [data, setData] = useState<SurveyResponse[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/surveys")
      .then(async (res) => {
        if (!res.ok) throw new Error("Không tải được dữ liệu");
        const json = await res.json();
        if (!cancelled) setData(json.data ?? []);
      })
      .catch(() => {
        if (!cancelled) setError("Không tải được dữ liệu thống kê. Vui lòng tải lại trang.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const stats: DashboardStats | null = useMemo(
    () => (data ? computeStats(data) : null),
    [data]
  );

  if (error) {
    return (
      <div role="alert" className="rounded-2xl bg-rose-50 px-6 py-8 text-center">
        <p className="font-semibold text-rose-700">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-xl bg-rose-600 px-6 py-2.5 text-[15px] font-semibold text-white"
        >
          Tải lại
        </button>
      </div>
    );
  }

  if (!stats) return <Skeleton />;

  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Tổng số người tham gia" value={String(stats.total)} sub="bài khảo sát hoàn thành" icon="👥" />
        <StatCard label="Điểm hài lòng trung bình" value={`${stats.avgSatisfaction}/5`} sub="trên tất cả sản phẩm" icon="⭐" />
        <StatCard
          label="Sản phẩm được đánh giá nhiều nhất"
          value={stats.topCategory?.label ?? "—"}
          sub={`${stats.topCategory?.count ?? 0} lượt đánh giá`}
          icon="📱"
        />
        <StatCard
          label="Thương hiệu phổ biến nhất"
          value={stats.topBrand?.label ?? "—"}
          sub={`${stats.topBrand?.count ?? 0} lượt nhắc đến`}
          icon="🏷️"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Phân bố mức độ hài lòng" subtitle="Số lượt đánh giá theo số sao">
          <VBarChart data={stats.satisfactionDist} />
        </Card>
        <Card title="Phân bố độ tuổi" subtitle="Độ tuổi của người tham gia khảo sát">
          <DonutChart data={stats.ageDist} />
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card title="Nhóm sản phẩm được đánh giá" subtitle="Top nhóm sản phẩm nhiều đánh giá nhất">
          <HBarList data={stats.categoryDist} />
        </Card>
        <Card title="Vấn đề người dùng phàn nàn nhiều nhất" subtitle="Tổng hợp từ mục điểm yếu & mong muốn cải thiện">
          <HBarList data={stats.topComplaints} />
        </Card>
      </div>

      <Card title="Phản hồi mới nhất" subtitle="Các bài khảo sát vừa được gửi">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-slate-100 text-[12.5px] uppercase tracking-wide text-slate-400">
                <th className="pb-3 pr-4 font-semibold">Sản phẩm</th>
                <th className="pb-3 pr-4 font-semibold">Thương hiệu</th>
                <th className="pb-3 pr-4 font-semibold">Hài lòng</th>
                <th className="pb-3 font-semibold">Điểm yếu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {stats.recent.map((r) => (
                <tr key={r.id} className="transition-colors hover:bg-slate-50/60">
                  <td className="py-3 pr-4 font-semibold text-slate-800">
                    {r.categories.map((c) => CATEGORY_LABELS[c]).join(", ")}
                    <span className="block text-[12.5px] font-normal text-slate-400">{r.model}</span>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{r.brand}</td>
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[13px] font-bold text-amber-700">
                      ★ {r.satisfaction}/5
                    </span>
                  </td>
                  <td className="max-w-[280px] truncate py-3 text-slate-500" title={r.weaknesses}>
                    {r.weaknesses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-5 py-4 text-center text-[13px] text-slate-500">
        Trang demo — đang dùng dữ liệu mẫu. Khi kết nối backend thật (Supabase / Firebase / PostgreSQL / Google Sheets),
        dashboard sẽ tự động hiển thị dữ liệu thực mà không cần sửa giao diện.
      </p>
    </div>
  );
}
