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
            className={`stroke-[#EB622F] stroke-[2] ${
              paused ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              strokeDasharray: "40 320",
              animation: "industrialLine 10s linear infinite",
            }}
          />
        </svg>
      </div>

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