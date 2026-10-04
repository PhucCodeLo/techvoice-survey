import { Reveal } from "./Reveal";

const REASONS = [
  {
    icon: "💬",
    title: "Chia sẻ trải nghiệm thực tế",
    desc: "Ý kiến của người dùng thật có giá trị hơn mọi quảng cáo. Hãy kể câu chuyện của bạn.",
  },
  {
    icon: "🛠️",
    title: "Giúp cải thiện sản phẩm",
    desc: "Phản hồi của bạn được tổng hợp và gửi tới các thương hiệu để khắc phục điểm yếu.",
  },
  {
    icon: "🚀",
    title: "Đóng góp cho công nghệ tương lai",
    desc: "Mỗi khảo sát là một phiếu bầu cho những tính năng bạn muốn thấy ở thế hệ tiếp theo.",
  },
  {
    icon: "⚡",
    title: "Nhanh gọn, dễ thực hiện",
    desc: "Chỉ 8 bước ngắn, khoảng 3 phút, không cần đăng nhập, làm được ngay trên điện thoại.",
  },
];

export function WhyParticipate() {
  return (
    <section id="vi-sao" className="scroll-mt-20 bg-slate-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.2em] text-sky-400">
            Vì sao nên tham gia
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            3 phút của bạn, tương lai của công nghệ
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 90}>
              <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/40 hover:bg-white/[0.07]">
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 text-2xl" aria-hidden>
                  {r.icon}
                </span>
                <h3 className="text-[17px] font-bold text-white">{r.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-slate-400">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
