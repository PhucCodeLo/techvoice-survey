/**
 * TechVoice — Định nghĩa 8 bước khảo sát + validation từng bước.
 */

import type { SurveyFormValues } from "@/lib/survey/types";

export type FieldType =
  | "select"
  | "text"
  | "textarea"
  | "radio"
  | "checkbox"
  | "rating";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  name: keyof SurveyFormValues;
  label: string;
  type: FieldType;
  required: boolean;
  placeholder?: string;
  hint?: string;
  options?: FieldOption[];
  rows?: number;
}

export interface StepDef {
  id: string;
  title: string;
  subtitle: string;
  fields: FieldDef[];
}

export const TOTAL_STEPS = 8;

export const STEPS: StepDef[] = [
  {
    id: "profile",
    title: "Thông tin cá nhân",
    subtitle: "Cho chúng tôi biết đôi chút về bạn",
    fields: [
      {
        name: "age",
        label: "Độ tuổi của bạn",
        type: "select",
        required: true,
        placeholder: "Chọn độ tuổi",
        options: [
          { value: "under-18", label: "Dưới 18 tuổi" },
          { value: "18-24", label: "18 – 24 tuổi" },
          { value: "25-34", label: "25 – 34 tuổi" },
          { value: "35-44", label: "35 – 44 tuổi" },
          { value: "45-plus", label: "Trên 45 tuổi" },
        ],
      },
      {
        name: "gender",
        label: "Giới tính",
        type: "select",
        required: false,
        hint: "Không bắt buộc",
        placeholder: "Chọn giới tính (không bắt buộc)",
        options: [
          { value: "male", label: "Nam" },
          { value: "female", label: "Nữ" },
          { value: "other", label: "Khác" },
          { value: "prefer-not-to-say", label: "Không muốn tiết lộ" },
        ],
      },
      {
        name: "occupation",
        label: "Nghề nghiệp",
        type: "select",
        required: true,
        placeholder: "Chọn nghề nghiệp",
        options: [
          { value: "Học sinh / Sinh viên", label: "Học sinh / Sinh viên" },
          { value: "Nhân viên văn phòng", label: "Nhân viên văn phòng" },
          { value: "Kỹ sư / Công nghệ", label: "Kỹ sư / Công nghệ" },
          { value: "Kinh doanh / Bán hàng", label: "Kinh doanh / Bán hàng" },
          { value: "Thiết kế / Sáng tạo", label: "Thiết kế / Sáng tạo" },
          { value: "Tự do / Freelancer", label: "Tự do / Freelancer" },
          { value: "Khác", label: "Khác" },
        ],
      },
    ],
  },
  {
    id: "product",
    title: "Sản phẩm của bạn",
    subtitle: "Bạn đang dùng thiết bị nào?",
    fields: [
      {
        name: "categories",
        label: "Nhóm sản phẩm đang sử dụng",
        type: "checkbox",
        required: true,
        hint: "Chọn một hoặc nhiều",
        options: [
          { value: "smartphone", label: "Smartphone" },
          { value: "laptop", label: "Laptop" },
          { value: "tablet", label: "Tablet" },
          { value: "headphones", label: "Tai nghe / TWS" },
          { value: "smartwatch", label: "Smartwatch" },
          { value: "accessories", label: "Phụ kiện công nghệ" },
          { value: "other", label: "Sản phẩm khác" },
        ],
      },
      {
        name: "brand",
        label: "Thương hiệu đang sử dụng",
        type: "text",
        required: true,
        placeholder: "Ví dụ: Apple, Samsung, Xiaomi…",
      },
      {
        name: "model",
        label: "Model sản phẩm",
        type: "text",
        required: true,
        placeholder: "Ví dụ: iPhone 15, Galaxy S24…",
      },
    ],
  },
  {
    id: "experience",
    title: "Trải nghiệm sử dụng",
    subtitle: "Bạn đã gắn bó với sản phẩm bao lâu?",
    fields: [
      {
        name: "usageDuration",
        label: "Thời gian đã sử dụng",
        type: "radio",
        required: true,
        options: [
          { value: "under-6m", label: "Dưới 6 tháng" },
          { value: "6-12m", label: "6 – 12 tháng" },
          { value: "1-2y", label: "1 – 2 năm" },
          { value: "over-2y", label: "Trên 2 năm" },
        ],
      },
      {
        name: "satisfaction",
        label: "Mức độ hài lòng tổng thể",
        type: "rating",
        required: true,
        hint: "1 = Rất không hài lòng, 5 = Rất hài lòng",
      },
    ],
  },
  {
    id: "pros-cons",
    title: "Điểm mạnh & điểm yếu",
    subtitle: "Điều gì khiến bạn thích / chưa thích?",
    fields: [
      {
        name: "strengths",
        label: "Điểm mạnh của sản phẩm",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Ví dụ: pin trâu, màn hình đẹp, hiệu năng mượt…",
      },
      {
        name: "weaknesses",
        label: "Điểm yếu của sản phẩm",
        type: "textarea",
        required: true,
        rows: 3,
        placeholder: "Ví dụ: máy nóng khi chơi game, sạc chậm…",
      },
    ],
  },
  {
    id: "value",
    title: "Giá trị & lòng trung thành",
    subtitle: "Sản phẩm có xứng đáng với giá tiền?",
    fields: [
      {
        name: "fairPrice",
        label: "Mức giá bạn cho rằng sản phẩm đáng mua",
        type: "text",
        required: true,
        placeholder: "Ví dụ: 12.000.000đ",
      },
      {
        name: "repurchase",
        label: "Bạn có tiếp tục mua sản phẩm của thương hiệu này?",
        type: "radio",
        required: true,
        options: [
          { value: "definitely", label: "Chắc chắn có" },
          { value: "maybe", label: "Có thể" },
          { value: "unsure", label: "Chưa chắc" },
          { value: "no", label: "Không" },
        ],
      },
    ],
  },
  {
    id: "future",
    title: "Thế hệ tiếp theo",
    subtitle: "Bạn mong chờ điều gì?",
    fields: [
      {
        name: "improvements",
        label: "Bạn muốn cải thiện điều gì ở thế hệ tiếp theo?",
        type: "textarea",
        required: true,
        rows: 4,
        placeholder: "Ví dụ: pin tốt hơn, giá mềm hơn, tản nhiệt tốt hơn…",
      },
    ],
  },
  {
    id: "extra",
    title: "Ý kiến khác",
    subtitle: "Còn điều gì bạn muốn chia sẻ?",
    fields: [
      {
        name: "otherFeedback",
        label: "Ý kiến khác",
        type: "textarea",
        required: false,
        hint: "Không bắt buộc",
        rows: 4,
        placeholder: "Chia sẻ thêm bất kỳ điều gì bạn muốn…",
      },
    ],
  },
  {
    id: "review",
    title: "Xác nhận & gửi",
    subtitle: "Kiểm tra lại thông tin trước khi gửi",
    fields: [],
  },
];

/** Validate một bước, trả về map lỗi { fieldName: message }. */
export function validateStep(
  stepIndex: number,
  values: SurveyFormValues
): Record<string, string> {
  const errors: Record<string, string> = {};
  const step = STEPS[stepIndex];
  if (!step) return errors;

  for (const field of step.fields) {
    if (!field.required) continue;
    const v = values[field.name];
    const empty =
      v === "" ||
      v === null ||
      v === undefined ||
      (Array.isArray(v) && v.length === 0);
    if (empty) {
      errors[field.name as string] =
        field.type === "checkbox" || field.type === "radio" || field.type === "rating"
          ? "Vui lòng chọn một đáp án"
          : "Vui lòng điền thông tin này";
    }
  }

  // Validate định dạng riêng
  if (step.id === "value" && values.fairPrice.trim()) {
    const hasDigit = /\d/.test(values.fairPrice);
    if (!hasDigit) errors.fairPrice = "Vui lòng nhập mức giá hợp lệ (ví dụ: 12.000.000đ)";
  }
  if (
    step.id === "pros-cons" &&
    values.strengths.trim().length > 0 &&
    values.strengths.trim().length < 5
  ) {
    errors.strengths = "Vui lòng mô tả chi tiết hơn một chút";
  }

  return errors;
}
