
"use client";

import { RevealSection } from "@/components/shared/motion";
import { participants } from "@/lib/participants-data";

export function ParticipantsContent() {
  return (
    <>
      <style>{`
        @keyframes pp-rise {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .pp-card {
          animation: pp-rise 0.55s
            cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .pp-card {
            animation: none !important;
          }
        }
      `}</style>

      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <section
          aria-labelledby="participants-heading"
          className="container mx-auto px-4 sm:px-6"
        >
          <h2 id="participants-heading" className="sr-only">
            Previous Participants at PROPACK Odisha
          </h2>

          <ul className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
            {participants.map((participant, index) => (
              <li
                key={participant.id}
                className="min-w-0 h-full"
              >
                <article
                  className="pp-card group flex h-full min-h-[104px] w-full items-center rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl sm:p-6"
                  style={{
                    animationDelay: `${
                      Math.min(index, 15) * 45
                    }ms`,
                  }}
                >
                  <h3 className="min-w-0 break-words font-[family-name:var(--font-heading)] text-base font-bold leading-snug tracking-tight text-[#1F3864]">
                    {participant.name}
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </RevealSection>
    </>
  );
}
