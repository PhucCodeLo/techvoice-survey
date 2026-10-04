/**
 * TechVoice — Server-side repository singleton.
 *
 * Đổi adapter tại đây khi có backend thật:
 *
 *   import { SupabaseSurveyRepository } from "./adapters/supabase";
 *   const repo = new SupabaseSurveyRepository(process.env.SUPABASE_URL!, ...);
 *
 * Không hard-code secret trong source — đọc từ biến môi trường.
 */

import { MemorySurveyRepository, type SurveyRepository } from "./repository";
import { seedSurveys } from "./mock";

let repo: SurveyRepository | null = null;
let seeded = false;

export function getServerRepository(): SurveyRepository {
  if (!repo) {
    // TODO(prod): switch theo SURVEY_ADAPTER env, ví dụ:
    // const adapter = process.env.SURVEY_ADAPTER ?? "memory";
    repo = new MemorySurveyRepository();
  }
  return repo;
}

/** Nạp dữ liệu mẫu cho trang /admin demo (chỉ chạy 1 lần / instance). */
export async function getSeededRepository(): Promise<SurveyRepository> {
  const r = getServerRepository();
  if (!seeded) {
    seeded = true;
    for (const input of seedSurveys()) {
      await r.save(input);
    }
  }
  return r;
}
