"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#danh-muc", label: "Danh mục" },
  { href: "#vi-sao", label: "Vì sao tham gia" },
  { href: "#khao-sat", label: "Khảo sát" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-slate-950/85 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Điều hướng chính">
        <Link href="/" className="flex items-center gap-2.5" aria-label="TechVoice — trang chủ">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-cyan-500 shadow-lg shadow-sky-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" aria-hidden>
              <path d="M3 11.5 12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M5.5 10.5V19a1 1 0 0 0 1 1H17a1 1 0 0 0 1-1v-8.5" strokeLinecap="round" />
              <path d="M9.5 20v-5h5v5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="text-lg font-extrabold tracking-tight text-white">
            Tech<span className="text-sky-400">Voice</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[15px] font-medium text-slate-300 transition-colors hover:text-white">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/survey"
          className="rounded-xl bg-sky-500 px-5 py-2.5 text-[15px] font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-400 active:scale-[0.97]"
        >
          Tham gia khảo sát
        </Link>
      </nav>
    </header>
  );
}
