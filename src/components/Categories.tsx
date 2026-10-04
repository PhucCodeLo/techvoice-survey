import Link from "next/link";
import { Reveal } from "./Reveal";

const CATEGORIES = [
  { emoji: "📱", name: "Smartphone", desc: "Đánh giá điện thoại bạn đang dùng mỗi ngày", count: "4.2K đánh giá" },
  { emoji: "💻", name: "Laptop", desc: "Hiệu năng, pin và trải nghiệm làm việc", count: "2.8K đánh giá" },
  { emoji: "🎧", name: "Tai nghe", desc: "Âm thanh, chống ồn và độ thoải mái", count: "2.1K đánh giá" },
  { emoji: "⌚", name: "Smartwatch", desc: "Theo dõi sức khỏe và tính năng thông minh", count: "1.4K đánh giá" },
  { emoji: "📲", name: "Tablet", desc: "Màn hình, bút cảm ứng và giải trí", count: "980 đánh giá" },
  { emoji: "🔌", name: "Phụ kiện", desc: "Sạc, ốp lưng, bàn phím và hơn thế nữa", count: "1.1K đánh giá" },
];

export function Categories() {
  return (
    <section id="danh-muc" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-sky-600">
            Danh mục khảo sát
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Bạn đang dùng sản phẩm nào?
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-slate-500">
            Chọn nhóm sản phẩm bạn muốn đánh giá — mỗi ý kiến đều giúp hoàn thiện
            thế hệ thiết bị tiếp theo.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.name} delay={(i % 3) * 90}>
              <Link
                href="/survey"
                className="group flex h-full flex-col rounded-3xl border border-slate-100 bg-slate-50/60 p-7 transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:bg-white hover:shadow-[0_20px_50px_-16px_rgba(2,132,199,0.25)]"
              >
                <span
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  aria-hidden
                >
                  {c.emoji}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{c.name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-slate-500">{c.desc}</p>
                <p className="mt-5 flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-sky-600">{c.count}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-50 text-sky-600 transition-all duration-300 group-hover:bg-sky-500 group-hover:text-white" aria-hidden>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
