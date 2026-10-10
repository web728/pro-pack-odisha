"use client";

import { RevealSection } from "@/components/shared/motion";
import { participants } from "@/lib/participants-data";

export function ParticipantsContent() {
  return (
    <>
      <style>{`
        @keyframes pp-rise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pp-card { animation: pp-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        @media (prefers-reduced-motion: reduce) {
          .pp-card { animation: none !important; }
        }
      `}</style>

      <RevealSection className="bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {participants.map((p, i) => (
              <article
                key={p.id}
                className="pp-card flex items-center rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl"
                style={{ animationDelay: `${Math.min(i, 15) * 45}ms` }}
              >
                <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-base font-bold leading-snug tracking-tight text-[#1F3864]">
                  {p.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}