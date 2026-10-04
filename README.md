# TechVoice – Khảo sát ý kiến sản phẩm công nghệ

Landing page + khảo sát đa bước + dashboard thống kê, xây dựng bằng **Next.js 16 + TypeScript + Tailwind CSS 4**, deploy trên Vercel.

## Tính năng

- **Landing page** (`/`): hero, danh mục sản phẩm (6 nhóm), lý do tham gia, CTA khảo sát — responsive, animation nhẹ.
- **Khảo sát đa bước** (`/survey`): 8 bước với progress bar, validation từng bước, không cần đăng nhập, màn hình cảm ơn sau khi gửi.
- **Dashboard admin** (`/admin`): tổng quan lượt tham gia, điểm hài lòng TB, biểu đồ phân bố độ tuổi / mức hài lòng / nhóm sản phẩm / vấn đề phàn nàn, bảng phản hồi mới nhất.
- **API** (`/api/surveys`): `GET` danh sách, `POST` gửi bài (validate server-side).
- **SEO**: title, meta description, Open Graph, favicon, semantic HTML, `lang="vi"`.

## Chạy project

Yêu cầu: Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build production
npm start        # chạy bản production
```

## Kiến trúc dữ liệu (dễ mở rộng)

Mọi thao tác dữ liệu đi qua interface `SurveyRepository` (`src/lib/survey/repository.ts`):

```ts
interface SurveyRepository {
  save(input: SurveyInput): Promise<SurveyResponse>;
  list(): Promise<SurveyResponse[]>;
}
```

Adapter hiện có:

| Adapter | Dùng ở | Ghi chú |
|---|---|---|
| `MemorySurveyRepository` | API routes (server) | Bản demo, dữ liệu theo vòng đời instance |
| `LocalStorageSurveyRepository` | Client | Demo offline |

Muốn kết nối backend thật, implement thêm class (Supabase / Firebase / PostgreSQL / Google Sheets / REST API) rồi trỏ `getServerRepository()` trong `src/lib/survey/server.ts` sang class mới — **không cần sửa UI hay API routes**. Secret đọc từ biến môi trường, không hard-code.

Dữ liệu mẫu cho dashboard nằm ở `src/lib/survey/mock.ts` (seeded, deterministic).

## Cấu trúc thư mục

```
src/
  app/
    page.tsx            # landing page
    survey/page.tsx     # trang khảo sát
    admin/page.tsx      # dashboard
    api/surveys/route.ts
    layout.tsx          # SEO metadata
  components/
    survey/             # wizard + fields + định nghĩa 8 bước
    admin/              # dashboard + biểu đồ SVG
    Navbar.tsx Hero.tsx Categories.tsx ...
  lib/
    survey/             # types, repository, server, mock, stats
```

## Deploy lên Vercel

```bash
vercel            # deploy preview
vercel --prod     # deploy production
```

Hoặc import repository GitHub này trên vercel.com — mọi thiết lập đã tương thích mặc định.

## Việc cần làm để lên production thật

1. Chọn backend (khuyến nghị Supabase hoặc PostgreSQL) và implement `SurveyRepository`.
2. Set biến môi trường (`SURVEY_ADAPTER`, connection string) trên Vercel.
3. (Tùy chọn) Thêm rate-limit / CAPTCHA cho API submit, và auth cho `/admin`.
4. Trỏ `NEXT_PUBLIC_SITE_URL` về domain chính thức để metadata chuẩn.
