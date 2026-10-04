/**
 * TechVoice — Dữ liệu mẫu cho trang /admin demo.
 * Sinh deterministic (seeded PRNG) để dashboard ổn định giữa các lần load.
 */

import type {
  AgeRange,
  Gender,
  ProductCategory,
  RepurchaseIntent,
  SurveyInput,
  UsageDuration,
} from "./types";

/* Seeded PRNG (mulberry32) — kết quả giống nhau mỗi lần chạy */
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20261004);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const pickMany = <T>(arr: T[], min: number, max: number): T[] => {
  const n = min + Math.floor(rand() * (max - min + 1));
  const copy = [...arr];
  const out: T[] = [];
  for (let i = 0; i < n && copy.length; i++) {
    out.push(copy.splice(Math.floor(rand() * copy.length), 1)[0]);
  }
  return out;
};

const AGES: AgeRange[] = ["under-18", "18-24", "18-24", "25-34", "25-34", "25-34", "35-44", "45-plus"];
const GENDERS: (Gender | undefined)[] = ["male", "female", "female", "male", "other", undefined];
const OCCUPATIONS = [
  "Sinh viên",
  "Nhân viên văn phòng",
  "Kỹ sư phần mềm",
  "Thiết kế đồ họa",
  "Kinh doanh",
  "Freelancer",
  "Giáo viên",
];
const CATS: ProductCategory[] = ["smartphone", "laptop", "tablet", "headphones", "smartwatch", "accessories"];
const DURATIONS: UsageDuration[] = ["under-6m", "6-12m", "1-2y", "1-2y", "over-2y"];
const REPURCHASE: RepurchaseIntent[] = ["definitely", "definitely", "maybe", "maybe", "unsure", "no"];

const BRAND_MODELS: Record<string, string[]> = {
  Apple: ["iPhone 15", "iPhone 14 Pro", "MacBook Air M3", "AirPods Pro 2", "Apple Watch SE"],
  Samsung: ["Galaxy S24", "Galaxy Z Flip 5", "Galaxy Buds 2 Pro", "Galaxy Watch 6"],
  Xiaomi: ["Redmi Note 13", "Xiaomi 14", "Mi Band 8"],
  Sony: ["WH-1000XM5", "WF-1000XM5", "Xperia 1 V"],
  Lenovo: ["ThinkPad E14", "Legion 5", "Tab P12"],
  ASUS: ["ROG Zephyrus G14", "Vivobook 15", "Zenfone 10"],
  Logitech: ["MX Master 3S", "G Pro X"],
  Anker: ["Soundcore Liberty 4", "737 Power Bank"],
};

const STRENGTHS = [
  "Pin trâu, dùng cả ngày thoải mái",
  "Màn hình đẹp, màu sắc rực rỡ",
  "Hiệu năng mượt, không giật lag",
  "Camera chụp đêm rất tốt",
  "Thiết kế sang, cầm nắm chắc tay",
  "Chống ồn tốt, đeo lâu không đau tai",
  "Sạc nhanh, 30 phút đầy 70%",
  "Hệ sinh thái đồng bộ tiện lợi",
];

const WEAKNESSES = [
  "Pin tụt nhanh khi dùng 4G",
  "Máy nóng khi chơi game nặng",
  "Giá cao so với cấu hình",
  "Sạc chậm, củ sạc bán riêng",
  "Phần mềm còn nhiều quảng cáo",
  "Loa ngoài âm lượng nhỏ",
  "Cập nhật phần mềm chậm",
  "Vỏ dễ trầy xước",
  "Kết nối bluetooth đôi lúc chập chờn",
  "Camera trước chất lượng trung bình",
];

const IMPROVEMENTS = [
  "Mong pin tốt hơn và sạc nhanh hơn",
  "Hy vọng giá mềm hơn cho sinh viên",
  "Cần cải thiện tản nhiệt khi dùng nặng",
  "Muốn camera zoom xa rõ nét hơn",
  "Mong có củ sạc kèm theo trong hộp",
  "Giao diện nên gọn gàng, ít quảng cáo hơn",
  "Cần hỗ trợ cập nhật lâu dài hơn",
];

const PRICES = ["8.500.000đ", "12.990.000đ", "15.500.000đ", "21.000.000đ", "7.200.000đ", "28.900.000đ", "5.490.000đ", "18.000.000đ"];

/** Sinh ~52 bài khảo sát mẫu. */
export function seedSurveys(count = 52): SurveyInput[] {
  const out: SurveyInput[] = [];
  const brands = Object.keys(BRAND_MODELS);
  for (let i = 0; i < count; i++) {
    const brand = pick(brands);
    const satisfaction = Math.min(5, Math.max(1, Math.round(3.4 + (rand() + rand() - 1) * 2.4)));
    out.push({
      age: pick(AGES),
      gender: pick(GENDERS),
      occupation: pick(OCCUPATIONS),
      categories: pickMany(CATS, 1, 3),
      brand,
      model: pick(BRAND_MODELS[brand]),
      usageDuration: pick(DURATIONS),
      satisfaction,
      strengths: pick(STRENGTHS),
      weaknesses: pick(WEAKNESSES),
      fairPrice: pick(PRICES),
      repurchase: satisfaction >= 4 ? pick(["definitely", "definitely", "maybe"] as RepurchaseIntent[]) : pick(REPURCHASE),
      improvements: pick(IMPROVEMENTS),
      otherFeedback: rand() > 0.7 ? "Nhìn chung hài lòng, sẽ giới thiệu cho bạn bè." : undefined,
    });
  }
  return out;
}
