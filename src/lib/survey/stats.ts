/**
 * TechVoice — Tính toán thống kê cho dashboard /admin từ dữ liệu khảo sát.
 * Pure function: dễ test, dễ thay nguồn dữ liệu.
 */

import {
  AGE_LABELS,
  CATEGORY_LABELS,
  type SurveyResponse,
} from "./types";

export interface StatItem {
  label: string;
  count: number;
}

export interface DashboardStats {
  total: number;
  avgSatisfaction: number;
  topCategory: StatItem | null;
  topBrand: StatItem | null;
  ageDist: StatItem[];
  satisfactionDist: StatItem[];
  categoryDist: StatItem[];
  topComplaints: StatItem[];
  recent: SurveyResponse[];
}

/** Từ khóa -> nhóm vấn đề (để gom "top vấn đề người dùng phàn nàn"). */
const COMPLAINT_KEYWORDS: [RegExp, string][] = [
  [/pin|battery|tụt/i, "Pin nhanh hết"],
  [/nóng|nhiệt|lag|giật/i, "Nóng máy / giật lag"],
  [/giá|đắt|mắc/i, "Giá cao"],
  [/sạc|charge/i, "Sạc chậm / thiếu củ sạc"],
  [/quảng cáo|ads/i, "Quảng cáo trong phần mềm"],
  [/loa|âm thanh|sound/i, "Loa ngoài kém"],
  [/cập nhật|update/i, "Cập nhật phần mềm chậm"],
  [/bluetooth|kết nối|chập chờn/i, "Kết nối chập chờn"],
  [/camera/i, "Camera chưa tốt"],
  [/trầy|vỏ|xước|bền/i, "Độ bền / dễ trầy xước"],
];

export function computeStats(data: SurveyResponse[]): DashboardStats {
  const total = data.length;

  const avgSatisfaction =
    total === 0 ? 0 : data.reduce((s, r) => s + r.satisfaction, 0) / total;

  const countBy = <K extends string>(key: (r: SurveyResponse) => K[]): StatItem[] => {
    const map = new Map<string, number>();
    for (const r of data) for (const k of key(r)) map.set(k, (map.get(k) ?? 0) + 1);
    return [...map.entries()]
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count);
  };

  const categoryDist = countBy((r) =>
    r.categories.map((c) => CATEGORY_LABELS[c] ?? c)
  );
  const brandDist = countBy((r) => [r.brand]);

  const ageOrder = ["under-18", "18-24", "25-34", "35-44", "45-plus"] as const;
  const ageMap = new Map<string, number>();
  for (const r of data) {
    const label = AGE_LABELS[r.age] ?? r.age;
    ageMap.set(label, (ageMap.get(label) ?? 0) + 1);
  }
  const ageDist = ageOrder
    .map((k) => ({ label: AGE_LABELS[k], count: ageMap.get(AGE_LABELS[k]) ?? 0 }))
    .filter((d) => d.count > 0);

  const satDist: StatItem[] = [1, 2, 3, 4, 5].map((n) => ({
    label: `${n} sao`,
    count: data.filter((r) => r.satisfaction === n).length,
  }));

  const complaintMap = new Map<string, number>();
  for (const r of data) {
    const text = `${r.weaknesses} ${r.improvements}`;
    for (const [re, label] of COMPLAINT_KEYWORDS) {
      if (re.test(text)) complaintMap.set(label, (complaintMap.get(label) ?? 0) + 1);
    }
  }
  const topComplaints = [...complaintMap.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return {
    total,
    avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
    topCategory: categoryDist[0] ?? null,
    topBrand: brandDist[0] ?? null,
    ageDist,
    satisfactionDist: satDist,
    categoryDist: categoryDist.slice(0, 6),
    topComplaints,
    recent: [...data]
      .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
      .slice(0, 8),
  };
}
