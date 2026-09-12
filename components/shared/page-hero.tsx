"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { RevealDiv } from "@/components/shared/motion";
import { Eyebrow } from "./eyebrow";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-[#f6f7f6] py-12 print:hidden sm:py-14 lg:py-16">
      {/* Background SVG: Subtle Modern Curved Sweep + Soft Dot Array */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute right-0 top-0 h-full w-[650px] stroke-slate-400/[0.22] [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_85%)] lg:w-[820px]"
          viewBox="0 0 800 400"
          fill="none"
        >
          {/* Subtle Dot Array Grid */}
          <defs>
            <pattern
              id="clean-dot-array"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" className="fill-slate-400/30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#clean-dot-array)" stroke="none" />

          {/* Clean Smooth Sweeping Industrial Contours */}
          <path
            d="M850 -50 C 650 40, 520 180, 480 450"
            strokeWidth="1.2"
          />
          <path
            d="M850 40 C 680 120, 570 240, 540 450"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
          <path
            d="M850 130 C 720 190, 640 280, 610 450"
            strokeWidth="1.2"
          />

          {/* Minimal Primary Accent Node */}
          <circle cx="563" cy="248" r="3" className="fill-[var(--primary)]" />
        </svg>

        {/* Ambient Warm Corner Light */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[var(--primary)]/[0.04] blur-3xl" />
      </div>

      {/* Hero Content */}
      <RevealDiv className="container relative z-10 mx-auto px-4 sm:px-6" mode="load">
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[var(--muted,#6b7280)]"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 font-medium transition-colors hover:text-[var(--foreground,#111827)]"
          >
            <Home size={13} className="text-[var(--primary)]" />
            <span>Home</span>
          </Link>
          <ChevronRight size={13} className="text-slate-400" />
          <span className="font-semibold text-[var(--foreground,#111827)]">
            {eyebrow}
          </span>
        </nav>

        <Eyebrow>{eyebrow}</Eyebrow>

        <h1 className="my-3 max-w-4xl font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-[clamp(32px,3.6vw,50px)] lg:leading-[1.12]">
          {title}
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
          {description}
        </p>
      </RevealDiv>
    </section>
  );
}