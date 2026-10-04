/**
 * TechVoice — Data access layer.
 *
 * Mọi thao tác đọc/ghi dữ liệu khảo sát đều đi qua interface `SurveyRepository`.
 * Muốn đổi backend, chỉ cần implement interface này:
 *
 *   export class SupabaseSurveyRepository implements SurveyRepository { ... }
 *   export class FirebaseSurveyRepository implements SurveyRepository { ... }
 *   export class PostgresSurveyRepository implements SurveyRepository { ... }
 *   export class GoogleSheetsSurveyRepository implements SurveyRepository { ... }
 *   export class RestApiSurveyRepository implements SurveyRepository { ... }
 *
 * rồi trỏ `getServerRepository()` sang class mới (xem src/lib/survey/server.ts).
 * UI và API routes không cần sửa gì thêm.
 */

import type { SurveyInput, SurveyResponse } from "./types";

export interface SurveyRepository {
  save(input: SurveyInput): Promise<SurveyResponse>;
  list(): Promise<SurveyResponse[]>;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function withMeta(input: SurveyInput): SurveyResponse {
  return { ...input, id: newId(), createdAt: new Date().toISOString() };
}

/* ------------------------------------------------------------------ */
/* Memory adapter — dùng cho API routes phía server (bản demo).        */
/* Dữ liệu sống theo vòng đời của server instance.                     */
/* ------------------------------------------------------------------ */
export class MemorySurveyRepository implements SurveyRepository {
  private store: SurveyResponse[] = [];

  async save(input: SurveyInput): Promise<SurveyResponse> {
    const record = withMeta(input);
    this.store.unshift(record);
    return record;
  }

  async list(): Promise<SurveyResponse[]> {
    return [...this.store];
  }
}

/* ------------------------------------------------------------------ */
/* LocalStorage adapter — dùng phía client khi chạy demo offline.      */
/* ------------------------------------------------------------------ */
const LS_KEY = "techvoice:surveys:v1";

export class LocalStorageSurveyRepository implements SurveyRepository {
  private read(): SurveyResponse[] {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      return raw ? (JSON.parse(raw) as SurveyResponse[]) : [];
    } catch {
      return [];
    }
  }

  private write(records: SurveyResponse[]) {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(records));
    } catch {
      /* storage đầy hoặc bị chặn — bỏ qua trong bản demo */
    }
  }

  async save(input: SurveyInput): Promise<SurveyResponse> {
    const record = withMeta(input);
    const records = this.read();
    records.unshift(record);
    this.write(records);
    return record;
  }

  async list(): Promise<SurveyResponse[]> {
    return this.read();
  }
}
