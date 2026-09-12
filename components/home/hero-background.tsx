"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

export function HeroBackground() {
  const [paused, setPaused] = useState(false);

  return (
    <>
      {/* Industrial / Technical Circuit Paths */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 400"
          fill="none"
          preserveAspectRatio="none"
          className="h-full w-full stroke-white/20 stroke-[1.2]"
        >
          {/* Static Circuit Trace Grid */}
          <path d="M-40 80H180L260 160H640M-40 240H100L220 320H640M350-40V80L450 180V440" />

          {/* Animated Glowing Signal Lines */}
          <path
            d="M-40 80H180L260 160H640M-40 240H100L220 320H640"
            className={`stroke-[var(--primary,#f59e0b)] stroke-[2] ${
              paused ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              strokeDasharray: "40 320",
              animation: "industrialLine 10s linear infinite",
            }}
          />
        </svg>
      </div>

      {/* Modern Floating Glass Toggle Button */}
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((prev) => !prev)}
        className="group absolute right-3 top-3 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-slate-950/60 px-3 py-1.5 text-xs font-medium text-white/90 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-white/40 hover:bg-slate-900/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[var(--primary,#f59e0b)] transition-transform group-hover:scale-110">
          {paused ? <Play size={10} className="fill-current" /> : <Pause size={10} className="fill-current" />}
        </span>
        <span className="text-[11px] tracking-wide">
          {paused ? "Play motion" : "Pause motion"}
        </span>
      </button>

      {/* Scoped Keyframes */}
      <style jsx>{`
        @keyframes industrialLine {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -360;
          }
        }
      `}</style>
    </>
  );
}