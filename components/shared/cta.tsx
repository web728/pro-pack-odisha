"use client";

import { CalendarDays, MapPin } from "lucide-react";
import { RevealDiv } from "@/components/shared/motion";
import { Eyebrow } from "./eyebrow";
import { Button } from "./button";

export function CTA() {
  return (
    <section className="cta relative overflow-hidden bg-[#1F3864] py-[30px] text-white sm:py-[38px]">
      {/* Subtle Industrial Grid Overlay matching #1F3864 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full stroke-white/[0.04] [mask-image:radial-gradient(ellipse_at_center,white_25%,transparent_85%)]"
          fill="none"
        >
          <defs>
            <pattern
              id="dark-cta-mesh"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 36 0 L 0 0 0 36" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dark-cta-mesh)" />
        </svg>

        {/* Ambient Teal Accent Glow (Matching brand color #15A7AE) */}
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#15A7AE]/[0.15] blur-3xl" />
      </div>

      <RevealDiv className="container relative z-10 mx-auto px-5 sm:px-8 lg:px-12">
        <div className="cta-inner flex flex-col items-start justify-between gap-5 sm:gap-7 lg:flex-row lg:items-center lg:gap-[30px]">
          {/* Left: Heading & Event Detail */}
          <div className="max-w-[720px]">
            <div className="text-slate-300">
              <Eyebrow>Let’s meet in Bhubaneswar</Eyebrow>
            </div>

            <h2 className="mb-0 mt-3 font-[family-name:var(--font-heading),Arial,sans-serif] text-[clamp(26px,2.6vw,36px)] font-[600] leading-[1.13] tracking-[-0.04em] text-white">
              One Expo. Endless Solutions.
            </h2>

            <p className="mb-0 mt-2.5 flex flex-wrap items-center gap-2 text-[14px] leading-normal text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays size={15} className="text-[#15A7AE]" />
                25th to 28th February 2027
              </span>
              <span className="text-slate-500">•</span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-[#15A7AE]" />
                Janata Maidan, Bhubaneswar, Odisha
              </span>
            </p>
          </div>

          {/* Right: Actions Container */}
          <div className="actions mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 lg:mt-0">
            {/* Primary Action Button (Brand Orange #EB622F) */}
            <Button href="/exhibitor-registration">Book your stall</Button>

            {/* Secondary Button */}
            <Button secondary theme="dark" href="/visitor-registration">
              Register your visit
            </Button>
          </div>
        </div>
      </RevealDiv>
    </section>
  );
}
