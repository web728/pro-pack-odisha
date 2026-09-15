"use client";

import { motion, type Variants } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Profiles({ title, items }: { title: string; items: string[] }) {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
           
            <Eyebrow>Find your place</Eyebrow>
          </div>

          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)] sm:text-base">
            Covering machinery, conversion equipment, raw materials, and enterprise automation across the value chain.
          </p>
        </div>

        {/* Directory Grid */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              className="group relative flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--primary)] hover:bg-white hover:shadow-sm"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[var(--primary)] shadow-2xs transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                <CheckCircle2 size={13} strokeWidth={2.5} />
              </span>

              <span className="text-xs font-semibold leading-relaxed text-[var(--foreground,#111827)] transition-colors group-hover:text-[var(--primary)] sm:text-sm">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>

      

      </div>
    </RevealSection>
  );
}