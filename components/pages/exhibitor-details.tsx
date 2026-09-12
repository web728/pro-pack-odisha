"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, ClipboardCheck, Sparkles, Store } from "lucide-react";
import { Eyebrow, TextLink } from "@/components/shared/ui";
import { services } from "@/lib/site";
import { RevealSection } from "@/components/shared/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function ServicesContent() {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[var(--border)] pb-8 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
            
              <Eyebrow>Plan. Prepare. Participate.</Eyebrow>
            </div>
            
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl">
              Exhibitor Service Centre
            </h1>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
            Have your company and stall credentials ready. Every submission is directly routed to the OASME for prompt review and allocation.
          </p>
        </div>

        {/* Services Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((s, i) => (
            <motion.article
              key={s.slug}
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg sm:p-8"
            >
              <div>
                {/* Index / Service Tag */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center rounded-md bg-[#f7f8f7] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--muted,#6b7280)] group-hover:bg-[var(--primary)]/10 group-hover:text-[var(--primary)] transition-colors">
                    0{i + 1} / SERVICE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-slate-300 transition-colors group-hover:bg-[var(--primary)]" />
                </div>

                <h2 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] transition-colors group-hover:text-[var(--primary)] sm:text-2xl">
                  {s.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                  {s.description}
                </p>
              </div>

              {/* Action Link Footer */}
              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-5">
                <TextLink href={`/${s.slug}`}>Complete form</TextLink>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--muted,#6b7280)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]"
                />
              </div>
            </motion.article>
          ))}

          {/* Highlighted CTA Card: Book a Stall */}
          <motion.article
            variants={fadeUp}
            className="group relative flex flex-col justify-between rounded-2xl border border-sky-200/80 bg-gradient-to-br from-[#eef5f7] to-[#e0f0f5] p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-sky-900/10 px-2.5 py-1 text-xs font-bold tracking-wide text-sky-900">
                  <Sparkles size={13} />
                  NEED A STALL?
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-sky-700 shadow-xs">
                  <Store size={18} />
                </span>
              </div>

              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Start with registration
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                Tell us about your machinery footprints, utilities, and booth size preferences to begin your official exhibitor onboarding.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-sky-300/60 pt-5">
              <Link
                href="/exhibitor-registration"
                className="font-semibold text-sm text-sky-950 underline decoration-sky-400 underline-offset-4 hover:text-sky-700"
              >
                Register your interest
              </Link>
              <ArrowUpRight
                size={18}
                className="text-sky-800 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
          </motion.article>
        </motion.div>

      </div>
    </RevealSection>
  );
}