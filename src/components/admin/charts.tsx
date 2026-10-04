"use client";

import type { StatItem } from "@/lib/survey/stats";

const PALETTE = ["#0ea5e9", "#22d3ee", "#818cf8", "#38bdf8", "#2dd4bf", "#f472b6", "#fbbf24"];

/** Biểu đồ cột dọc — SVG thuần, responsive. */
export function VBarChart({ data, height = 180 }: { data: StatItem[]; height?: number }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const barW = 44;
  const gap = 18;
  const w = data.length * (barW + gap) + gap;
  const labelH = 34;
  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${w} ${height + labelH}`} style={{ height, minWidth: w }} className="w-full" role="img" aria-label="Biểu đồ cột">
        {data.map((d, i) => {
          const h = Math.max(6, (d.count / max) * height);
          const x = gap + i * (barW + gap);
          const y = height - h;
          return (
            <g key={d.label}>
              <rect x={x} y={y} width={barW} height={h} rx={8} fill={PALETTE[i % PALETTE.length]} opacity={0.9}>
                <title>{`${d.label}: ${d.count}`}</title>
              </rect>
              <text x={x + barW / 2} y={y - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill="#0f172a">
                {d.count}
              </text>
              <text x={x + barW / 2} y={height + 20} textAnchor="middle" fontSize={12} fill="#64748b">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Biểu đồ tròn (donut) — SVG thuần. */
export function DonutChart({ data, size = 190 }: { data: StatItem[]; size?: number }) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1;
  const r = 70;
  const c = 2 * Math.PI * r;
  let offset = 0;
  const cx = size / 2;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Biểu đồ tròn" className="-rotate-90">
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="#f1f5f9" strokeWidth={26} />
        {data.map((d, i) => {
          const frac = d.count / total;
          const el = (
            <circle
              key={d.label}
              cx={cx}
              cy={cx}
              r={r}
              fill="none"
              stroke={PALETTE[i % PALETTE.length]}
              strokeWidth={26}
              strokeDasharray={`${frac * c} ${c}`}
              strokeDashoffset={-offset * c}
              strokeLinecap="butt"
            >
              <title>{`${d.label}: ${d.count}`}</title>
            </circle>
          );
          offset += frac;
          return el;
        })}
        <text x={cx} y={cx - 6} textAnchor="middle" fontSize={26} fontWeight={800} fill="#0f172a" className="rotate-90" transform={`rotate(90 ${cx} ${cx})`}>
          {total}
        </text>
        <text x={cx} y={cx + 18} textAnchor="middle" fontSize={12} fill="#64748b" transform={`rotate(90 ${cx} ${cx})`}>
          lượt đánh giá
        </text>
      </svg>
      <ul className="grid grid-cols-1 gap-2.5">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-2.5 text-[14px]">
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} aria-hidden />
            <span className="font-medium text-slate-600">{d.label}</span>
            <span className="font-bold text-slate-900">{d.count}</span>
            <span className="text-slate-400">({Math.round((d.count / total) * 100)}%)</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Thanh ngang cho xếp hạng (top thương hiệu / vấn đề). */
export function HBarList({ data }: { data: StatItem[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <ul className="space-y-3.5">
      {data.map((d, i) => (
        <li key={d.label}>
          <div className="mb-1.5 flex items-center justify-between text-[14px]">
            <span className="font-medium text-slate-600">
              <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-[12px] font-bold text-slate-500">
                {i + 1}
              </span>
              {d.label}
            </span>
            <span className="font-bold text-slate-900">{d.count}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 transition-all duration-700"
              style={{ width: `${Math.max(4, (d.count / max) * 100)}%` }}
            />
          </div>
        </li>
      ))}
      {data.length === 0 && <li className="text-[14px] text-slate-400">Chưa có dữ liệu.</li>}
    </ul>
  );
}
