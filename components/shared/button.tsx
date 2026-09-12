"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  theme?: "light" | "dark";
  className?: string;
}

export function Button({
  href,
  children,
  secondary = false,
  theme = "light",
  className = "",
}: ButtonProps) {
  const isBookStall = href.includes("exhibitor-registration");

  const ctaTag = isBookStall
    ? "book-stand"
    : href.includes("visitor-registration")
      ? "register-visit"
      : href.includes("brochure")
        ? "download-brochure"
        : "learn-more";

  // 1. High-Priority "Book Stall" Primary CTA (Solid Red, Glow on Dark)
  if (isBookStall && !secondary) {
    return (
      <Link
        data-cta={ctaTag}
        href={href}
        className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-xs font-bold !text-white shadow-md shadow-red-950/20 transition-all duration-200 hover:bg-red-700 hover:shadow-lg hover:shadow-red-600/25 active:scale-95 sm:px-6 sm:py-3 sm:text-sm ${className}`}
      >
        <span className="!text-white font-bold tracking-wide">{children}</span>
        <ArrowUpRight
          size={16}
          className="!text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    );
  }

  // 2. Secondary Button on DARK Background (Glassmorphic White Outline)
  if (secondary && theme === "dark") {
    return (
      <Link
        data-cta={ctaTag}
        href={href}
        className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-semibold !text-white backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-white/10 active:scale-95 sm:px-6 sm:py-3 sm:text-sm ${className}`}
      >
        <span className="!text-white font-medium tracking-wide">{children}</span>
        <ArrowUpRight
          size={16}
          className="text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
        />
      </Link>
    );
  }

  // 3. Secondary Button on LIGHT Background
  if (secondary) {
    return (
      <Link
        data-cta={ctaTag}
        href={href}
        className={`group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 hover:text-black active:scale-95 sm:px-6 sm:py-3 sm:text-sm ${className}`}
      >
        <span>{children}</span>
        <ArrowUpRight
          size={16}
          className="text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-700"
        />
      </Link>
    );
  }

  // 4. Default Primary Button (Light vs Dark Adaptive)
  const defaultBg =
    theme === "dark"
      ? "bg-white !text-slate-950 hover:bg-slate-100"
      : "bg-slate-900 !text-white hover:bg-black";

  return (
    <Link
      data-cta={ctaTag}
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold shadow-sm transition-all duration-200 active:scale-95 sm:px-6 sm:py-3 sm:text-sm ${defaultBg} ${className}`}
    >
      <span className="font-bold tracking-wide">{children}</span>
      <ArrowUpRight
        size={16}
        className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}