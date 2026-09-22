"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

interface OrganizerStripProps {
  className?: string;
  variant?: "light" | "white";
}

export function OrganizerStrip({
  className = "",
  variant = "light",
}: OrganizerStripProps) {
  const bgClass =
    variant === "white"
      ? "bg-white"
      : "bg-[#f7f8f7] border-y border-[var(--border)]";

  return (
    <section className={`py-6 sm:py-8 ${bgClass} ${className}`}>
      <motion.div
        className="container mx-auto flex flex-col gap-5 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Left Side: Badge + Organization Profile */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted,#6b7280)]">
            <ShieldCheck size={16} className="text-[#15A7AE]" />
            <span>Organised by</span>
          </div>

          <div className="hidden h-8 w-px bg-[var(--border)] sm:block" />

          {/* Clickable Logo & Brand Name Container */}
          <Link
            href="https://www.oasme.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Odisha Assembly of Small and Medium Enterprises"
            className="group flex items-center gap-3.5 transition-transform duration-200 hover:opacity-95"
          >
            {/* Logo Wrapper */}
            <div className="relative flex h-22 w-42 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1.5 shadow-sm transition-all duration-300 group-hover:border-[#EB622F] group-hover:shadow-md">
              <Image
                src="/logo/oasme-logo.jpeg"
                alt="OASME - Odisha Assembly of Small and Medium Enterprises Logo"
                width={144}
                height={54}
                className="object-contain"
                priority={false}
              />
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-center gap-1.5">
                <strong className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-[#1F3864] transition-colors duration-200 group-hover:text-[#EB622F] sm:text-xl">
                  OASME
                </strong>
                <ExternalLink
                  size={14}
                  className="text-[var(--muted,#6b7280)] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-[#EB622F]"
                />
              </div>
              <p className="text-xs text-[var(--muted,#6b7280)] sm:text-[13px]">
                Odisha Assembly of Small and Medium Enterprises
              </p>
            </div>
          </Link>
        </div>

        {/* Right Side: External Portal Action */}
        <div className="flex items-center gap-4">
          <Link
            href="https://www.oasme.org.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#1F3864] shadow-xs transition-all duration-200 hover:border-[#EB622F] hover:bg-[#EB622F]/5 hover:text-[#EB622F]"
          >
            <span>Official Portal</span>
            <ExternalLink size={13} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
