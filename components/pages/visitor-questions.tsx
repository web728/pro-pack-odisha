"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { HelpCircle, ChevronDown, UserCheck, Store } from "lucide-react";
import { questions } from "@/lib/faqs";
import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function VisitorQuestions() {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2">
             
              <Eyebrow>Plan your participation</Eyebrow>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl">
              Your expo questions, answered.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Find essential guidelines regarding delegate entry, badge generation, stall allocation, and venue timings.
            </p>
          </div>

          {/* Interactive FAQ Accordion List */}
          <motion.div
            className="mt-12 space-y-3.5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {questions.map(([question, answer]) => (
              <motion.div key={question} variants={itemVariant}>
                <details className="group rounded-xl border border-[var(--border)] bg-white p-5 shadow-2xs transition-all duration-200 hover:border-[var(--primary)] hover:shadow-xs open:border-[var(--primary)]/80 open:shadow-xs [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-[family-name:var(--font-heading)] text-base font-bold text-[var(--foreground,#111827)] transition-colors group-open:text-[var(--primary)] sm:text-lg">
                    <span className="leading-snug">{question}</span>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#f7f8f7] text-[var(--muted,#6b7280)] transition-all duration-300 group-open:rotate-180 group-open:bg-[var(--primary)]/10 group-open:text-[var(--primary)]">
                      <ChevronDown size={17} />
                    </span>
                  </summary>

                  <div className="mt-3.5 border-t border-[var(--border)] pt-3.5 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                    {answer}
                  </div>
                </details>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Conversion Action Strip */}
          <div className="mt-14 flex flex-col items-center justify-center gap-4 rounded-2xl border border-[var(--border)] bg-white p-8 text-center shadow-xs sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--foreground,#111827)]">
                Still have unanswered queries?
              </h3>
              <p className="mt-1 text-xs text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                Connect directly with our registration desk.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/visitor-registration"
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold !text-white shadow-sm transition-all hover:bg-slate-800"
              >
                <UserCheck size={14} className="!text-white" />
                <span>Register your visit</span>
              </Link>

              <Link
                href="/exhibitor-registration"
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-xs font-bold !text-white shadow-sm transition-all hover:bg-red-700"
              >
                <Store size={14} className="!text-white" />
                <span>Enquire about a stall</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </RevealSection>
  );
}