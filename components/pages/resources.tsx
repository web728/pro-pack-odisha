"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  FileText,
  ArrowUpRight,
  HelpCircle,
  Sparkles,
  FolderDown,
} from "lucide-react";
import { resources } from "@/lib/navigation";
import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const rowVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ResourcesContent() {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div className="mb-10 border-b border-[var(--border)] pb-6">
            <div className="flex items-center gap-2">
              <Eyebrow>Exhibition Kit & Collaterals</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl">
              Official Resources & Downloads
            </h1>

            <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Access floor maps, event brochures, exhibitor kits, and regulatory
              guidelines for PROPACK Odisha 2027.
            </p>
          </div>

          {/* Resources List / Rows */}
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {resources.map((resource) => (
              <motion.article
                key={resource.href}
                variants={rowVariant}
                className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-2xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EB622F] hover:shadow-md sm:flex-row sm:items-center sm:p-7"
              >
                <div className="flex items-start gap-4">
                  {/* Document Icon */}
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f8f7] border border-[var(--border)] text-[#15A7AE] transition-colors duration-300 group-hover:bg-[#EB622F] group-hover:text-white">
                    <FileText size={20} />
                  </span>

                  {/* Copy */}
                  <div>
                    <span className="inline-block rounded-md bg-[#f7f8f7] px-2.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--muted,#6b7280)] group-hover:bg-[#15A7AE]/10 group-hover:text-[#15A7AE] transition-colors">
                      {resource.kind}
                    </span>

                    <h2 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-bold text-[#1F3864] transition-colors group-hover:text-[#EB622F] sm:text-xl">
                      {resource.title}
                    </h2>

                    <p className="mt-1 max-w-xl text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                      {resource.description}
                    </p>
                  </div>
                </div>

                {/* Direct Action Link Button */}
                <div className="shrink-0 self-end sm:self-center">
                  <Link
                    href={resource.href}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] px-4 py-2 text-xs font-semibold text-[#1F3864] transition-all duration-200 group-hover:border-[#EB622F] group-hover:bg-[#EB622F] group-hover:text-white"
                  >
                    <span>{resource.label}</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Need Help / Support Notice Box */}
          <div className="mt-10 flex items-start gap-3.5 rounded-xl border border-[var(--border)] bg-white p-5 text-xs text-[var(--muted-foreground,#4b5563)] shadow-2xs sm:text-sm">
            <HelpCircle size={18} className="mt-0.5 shrink-0 text-[#15A7AE]" />
            <div className="leading-relaxed">
              Need current stall rates, custom bare-space electrical grids, or
              sponsorship details?{" "}
              <Link
                href="/contact-us"
                className="font-semibold text-[#EB622F] underline decoration-[#EB622F]/40 underline-offset-4 hover:decoration-[#EB622F]"
              >
                Contact the organizing team
              </Link>{" "}
              for direct support.
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
}
