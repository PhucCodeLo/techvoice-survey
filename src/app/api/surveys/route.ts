import { NextResponse } from "next/server";
import { getSeededRepository } from "@/lib/survey/server";
import type { SurveyInput } from "@/lib/survey/types";

const REQUIRED_FIELDS: (keyof SurveyInput)[] = [
  "age",
  "occupation",
  "categories",
  "brand",
  "model",
  "usageDuration",
  "satisfaction",
  "strengths",
  "weaknesses",
  "fairPrice",
  "repurchase",
  "improvements",
];

function validateInput(body: unknown): { ok: true; input: SurveyInput } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Dữ liệu không hợp lệ." };
  const b = body as Record<string, unknown>;

  for (const f of REQUIRED_FIELDS) {
    const v = b[f];
    const empty =
      v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
    if (empty) return { ok: false, error: `Thiếu trường bắt buộc: ${f}` };
  }

  const satisfaction = Number(b.satisfaction);
  if (!Number.isInteger(satisfaction) || satisfaction < 1 || satisfaction > 5) {
    return { ok: false, error: "Mức độ hài lòng phải từ 1 đến 5." };
  }
  if (!Array.isArray(b.categories) || b.categories.length === 0) {
    return { ok: false, error: "Vui lòng chọn ít nhất một nhóm sản phẩm." };
  }

  const input: SurveyInput = {
    age: b.age as SurveyInput["age"],
    gender: (b.gender as SurveyInput["gender"]) || undefined,
    occupation: String(b.occupation),
    categories: b.categories as SurveyInput["categories"],
    brand: String(b.brand).trim(),
    model: String(b.model).trim(),
    usageDuration: b.usageDuration as SurveyInput["usageDuration"],
    satisfaction,
    strengths: String(b.strengths).trim(),
    weaknesses: String(b.weaknesses).trim(),
    fairPrice: String(b.fairPrice).trim(),
    repurchase: b.repurchase as SurveyInput["repurchase"],
    improvements: String(b.improvements).trim(),
    otherFeedback: b.otherFeedback ? String(b.otherFeedback).trim() || undefined : undefined,
  };
  return { ok: true, input };
}

export async function GET() {
  const repo = await getSeededRepository();
  const data = await repo.list();
  return NextResponse.json({ data, count: data.length });
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const result = validateInput(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const repo = await getSeededRepository();
  const saved = await repo.save(result.input);
  return NextResponse.json({ data: saved }, { status: 201 });
}
