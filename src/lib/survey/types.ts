/**
 * TechVoice — Survey domain types.
 *
 * Mọi dữ liệu khảo sát trong hệ thống đều đi qua các kiểu này,
 * giúp việc thay backend (Supabase / Firebase / Postgres / Sheets / REST)
 * chỉ cần viết thêm một Adapter mà không đổi code UI.
 */

export type AgeRange = "under-18" | "18-24" | "25-34" | "35-44" | "45-plus";

export type Gender = "male" | "female" | "other" | "prefer-not-to-say";

export type ProductCategory =
  | "smartphone"
  | "laptop"
  | "tablet"
  | "headphones"
  | "smartwatch"
  | "accessories"
  | "other";

export type UsageDuration = "under-6m" | "6-12m" | "1-2y" | "over-2y";

export type RepurchaseIntent = "definitely" | "maybe" | "unsure" | "no";

/** Một bài khảo sát đã hoàn thành. */
export interface SurveyResponse {
  id: string;
  createdAt: string; // ISO string
  age: AgeRange;
  gender?: Gender;
  occupation: string;
  categories: ProductCategory[];
  brand: string;
  model: string;
  usageDuration: UsageDuration;
  satisfaction: number; // 1 - 5
  strengths: string;
  weaknesses: string;
  fairPrice: string;
  repurchase: RepurchaseIntent;
  improvements: string;
  otherFeedback?: string;
}

/** Dữ liệu thô gửi từ form (chưa có id / createdAt). */
export type SurveyInput = Omit<SurveyResponse, "id" | "createdAt">;

/** Giá trị form phía client — satisfaction có thể null khi chưa chọn. */
export interface SurveyFormValues {
  age: string;
  gender: string;
  occupation: string;
  categories: ProductCategory[];
  brand: string;
  model: string;
  usageDuration: string;
  satisfaction: number | null;
  strengths: string;
  weaknesses: string;
  fairPrice: string;
  repurchase: string;
  improvements: string;
  otherFeedback: string;
}

export const EMPTY_FORM: SurveyFormValues = {
  age: "",
  gender: "",
  occupation: "",
  categories: [],
  brand: "",
  model: "",
  usageDuration: "",
  satisfaction: null,
  strengths: "",
  weaknesses: "",
  fairPrice: "",
  repurchase: "",
  improvements: "",
  otherFeedback: "",
};

/* ---------- Label maps (hiển thị tiếng Việt) ---------- */

export const AGE_LABELS: Record<AgeRange, string> = {
  "under-18": "Dưới 18 tuổi",
  "18-24": "18 – 24 tuổi",
  "25-34": "25 – 34 tuổi",
  "35-44": "35 – 44 tuổi",
  "45-plus": "Trên 45 tuổi",
};

export const GENDER_LABELS: Record<Gender, string> = {
  male: "Nam",
  female: "Nữ",
  other: "Khác",
  "prefer-not-to-say": "Không muốn tiết lộ",
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  smartphone: "Smartphone",
  laptop: "Laptop",
  tablet: "Tablet",
  headphones: "Tai nghe / TWS",
  smartwatch: "Smartwatch",
  accessories: "Phụ kiện công nghệ",
  other: "Sản phẩm khác",
};

export const DURATION_LABELS: Record<UsageDuration, string> = {
  "under-6m": "Dưới 6 tháng",
  "6-12m": "6 – 12 tháng",
  "1-2y": "1 – 2 năm",
  "over-2y": "Trên 2 năm",
};

export const REPURCHASE_LABELS: Record<RepurchaseIntent, string> = {
  definitely: "Chắc chắn có",
  maybe: "Có thể",
  unsure: "Chưa chắc",
  no: "Không",
};
