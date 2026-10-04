import Link from "next/link";
import { Reveal } from "./Reveal";

/** Minh họa công nghệ bằng CSS: thẻ kính nổi + vòng gradient. */
function TechVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[420px]" aria-hidden>
      {/* vòng gradient xoay */}
      <div className="animate-spin-slow absolute inset-6 rounded-full bg-[conic-gradient(from_0deg,#0ea5e9,#22d3ee,#818cf8,#0ea5e9)] opacity-25 blur-2xl" />
      <div className="absolute inset-10 rounded-full border border-white/10" />
      <div className="absolute inset-20 rounded-full border border-white/10" />

      {/* thẻ kính: đánh giá */}
      <div className="animate-float absolute left-2 top-8 w-52 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl sm:w-60">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-400 to-cyan-500" />
          <div>
            <p className="text-[13px] font-bold text-white">Galaxy S24</p>
            <p className="text-[11px] text-slate-400">1.248 đánh giá</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} viewBox="0 0 24 24" className={`h-5 w-5 ${s <= 4 ? "fill-amber-400" : "fill-white/20"}`}>
              <path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4 6.1 20.7l1.3-6.6L2.5 9.5l6.6-.8L12 2.5z" />
            </svg>
          ))}
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-sky-400 to-cyan-400" />
        </div>
      </div>

      {/* thẻ kính: pin */}
      <div className="animate-float-delayed absolute bottom-10 right-2 w-48 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <p className="text-[12px] font-semibold text-slate-300">Thời lượng pin</p>
        <p className="mt-1 text-2xl font-extrabold text-white">
          9.2<span className="text-sm font-medium text-slate-400">/10</span>
        </p>
        <div className="mt-2 flex gap-1">
          {[80, 65, 90, 75, 95, 70, 85].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-sky-400/70" style={{ height: `${h * 0.35}px` }} />
          ))}
        </div>
      </div>

      {/* badge trung tâm */}
      <div className="animate-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-slate-900/80 px-5 py-4 text-center shadow-2xl backdrop-blur-xl">
        <p className="text-3xl font-extrabold text-white">12.4K+</p>
        <p className="text-[12px] font-medium text-slate-400">ý kiến đã gửi</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pb-20 pt-32 sm:pb-28 sm:pt-40">
      {/* nền trang trí */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-sky-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(148,163,184,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.25) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-[13px] font-semibold text-sky-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-sky-400" />
            Khảo sát cộng đồng công nghệ 2026
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
            Ý kiến của bạn{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
              định hình công nghệ
            </span>{" "}
            tương lai
          </h1>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-slate-400">
            Chia sẻ trải nghiệm của bạn về các sản phẩm điện tử và giúp các thương
            hiệu tạo ra những sản phẩm tốt hơn.
          </p>
          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
            <Link
              href="/survey"
              className="rounded-2xl bg-sky-500 px-8 py-4 text-center text-[17px] font-bold text-white shadow-xl shadow-sky-500/30 transition-all hover:-translate-y-0.5 hover:bg-sky-400 active:scale-[0.98]"
            >
              Tham gia khảo sát
            </Link>
            <a
              href="#danh-muc"
              className="rounded-2xl border border-white/15 bg-white/5 px-8 py-4 text-center text-[17px] font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10 active:scale-[0.98]"
            >
              Khám phá khảo sát
            </a>
          </div>
          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              ["12.4K+", "ý kiến đã gửi"],
              ["4.6/5", "điểm hài lòng TB"],
              ["8 bước", "hoàn thành nhanh"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="text-2xl font-extrabold text-white">{v}</dd>
                <dd className="mt-1 text-[13px] text-slate-500">{l}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={150} className="hidden lg:block">
          <TechVisual />
        </Reveal>
      </div>
    </section>
  );
}
