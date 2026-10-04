import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techvoice-survey.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TechVoice – Chia sẻ ý kiến về sản phẩm công nghệ",
    template: "%s | TechVoice",
  },
  description:
    "Chia sẻ trải nghiệm của bạn về smartphone, laptop, tai nghe và các sản phẩm điện tử để góp phần cải thiện công nghệ tương lai.",
  keywords: ["khảo sát công nghệ", "đánh giá sản phẩm", "smartphone", "laptop", "tai nghe", "techvoice"],
  authors: [{ name: "TechVoice" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "TechVoice",
    title: "TechVoice – Chia sẻ ý kiến về sản phẩm công nghệ",
    description:
      "Chia sẻ trải nghiệm của bạn về smartphone, laptop, tai nghe và các sản phẩm điện tử để góp phần cải thiện công nghệ tương lai.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechVoice – Chia sẻ ý kiến về sản phẩm công nghệ",
    description:
      "Chia sẻ trải nghiệm của bạn về smartphone, laptop, tai nghe và các sản phẩm điện tử để góp phần cải thiện công nghệ tương lai.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${beVietnamPro.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
