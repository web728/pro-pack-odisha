"use client";

import Link from "next/link";
import Image from "next/image";
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
      {/* Background PNG Image on Right Top Corner */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-[250px] w-[250px] sm:h-[320px] sm:w-[320px] lg:h-[380px] lg:w-[380px] opacity-90">
          <Image
            src="/assets/svg.png" // Replace with your actual image path
            alt=""
            fill
            className="object-contain object-top-right"
            priority
          />
        </div>

        {/* Ambient Warm Corner Light (Optional, remains near image) */}
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