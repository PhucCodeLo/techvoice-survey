import Link from "next/link";
import { Reveal } from "./Reveal";

const STEPS_PREVIEW = [
  { n: "01", t: "Thông tin cá nhân" },
  { n: "02", t: "Sản phẩm đang dùng" },
  { n: "03", t: "Trải nghiệm & hài lòng" },
  { n: "04", t: "Điểm mạnh – điểm yếu" },
  { n: "05", t: "Giá trị & trung thành" },
  { n: "06", t: "Mong muốn tương lai" },
  { n: "07", t: "Ý kiến khác" },
  { n: "08", t: "Xác nhận & gửi" },
];

export function SurveyCTA() {
  return (
    <section id="khao-sat" className="relative scroll-mt-20 overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-sky-100/70 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-sky-600">
              Bắt đầu khảo sát
            </p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Sẵn sàng chia sẻ trải nghiệm của bạn?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
              Khảo sát gồm 8 bước ngắn gọn, có thanh tiến độ rõ ràng, tự động lưu
              từng bước và kiểm tra dữ liệu trước khi gửi. Không cần tạo tài khoản.
            </p>
            <Link
              href="/survey"
              className="mt-8 inline-block rounded-2xl bg-sky-600 px-10 py-4 text-[17px] font-bold text-white shadow-xl shadow-sky-600/25 transition-all hover:-translate-y-0.5 hover:bg-sky-500 active:scale-[0.98]"
            >
              Tham gia khảo sát ngay
            </Link>
            <p className="mt-4 text-[13px] text-slate-400">
              Miễn phí · Ẩn danh · Khoảng 3 phút
            </p>
          </Reveal>

          <Reveal delay={120}>
            <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STEPS_PREVIEW.map((s) => (
                <li
                  key={s.n}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 px-5 py-4 transition-all duration-200 hover:border-sky-200 hover:bg-white hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-500 text-[14px] font-extrabold text-white">
                    {s.n}
                  </span>
                  <span className="text-[15px] font-semibold text-slate-700">{s.t}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden>
                <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.5 10.5V19a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-8.5" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-[16px] font-extrabold text-white">
              Tech<span className="text-sky-400">Voice</span>
            </span>
          </div>
          <nav aria-label="Liên kết phụ">
            <ul className="flex items-center gap-6 text-[14px] text-slate-400">
              <li><a href="#danh-muc" className="transition-colors hover:text-white">Danh mục</a></li>
              <li><a href="#khao-sat" className="transition-colors hover:text-white">Khảo sát</a></li>
              <li><Link href="/admin" className="transition-colors hover:text-white">Thống kê</Link></li>
            </ul>
          </nav>
        </div>
        <p className="mt-8 text-center text-[13px] text-slate-600">
          © 2026 TechVoice. Khảo sát cộng đồng vì công nghệ tốt hơn.
        </p>
      </div>
    </footer>
  );
}
