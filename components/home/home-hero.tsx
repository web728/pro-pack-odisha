"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import { Button, Eyebrow, TextLink } from "@/components/shared/ui";
import { event } from "@/lib/site";
import { HeroBackground } from "./hero-background";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.15,
    },
  },
};

export function HomeHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center overflow-hidden border-b border-[var(--border)] bg-[#f7f8f7] py-10 lg:py-14">
      {/* Container with stretch alignment on desktop */}

      
      <div className="container mx-auto grid grid-cols-1 items-stretch gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10">
        
        {/* Left: Content Side */}
        <motion.div
          className="flex flex-col justify-center py-4 lg:col-span-7"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Eyebrow>Propack Odisha International Expo 2027</Eyebrow>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="my-3 font-[family-name:var(--font-heading)] text-[34px] font-bold leading-[1.08] tracking-[-2px] text-[var(--foreground,#111827)] sm:text-[44px] md:text-[52px] lg:my-5 lg:text-[clamp(36px,3.8vw,58px)] lg:tracking-[-2.5px]"
          >
            Where industry connects.
            <br />
            <span className="text-[var(--primary)]">Propack Odisha.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-4 max-w-[48ch] text-base leading-[1.6] text-[var(--muted-foreground,#4b5563)] sm:text-[17px]"
          >
            Packaging, printing, plastics, food processing and engineering.
            Discover the next solution for your business.
          </motion.p>

          {/* Event Details */}
          <motion.div
            variants={itemVariants}
            className="my-4 flex flex-wrap items-center gap-6 sm:gap-8"
          >
            <div className="flex items-start gap-2.5">
              <CalendarDays className="mt-0.5 shrink-0 text-[var(--primary)]" size={19} />
              <span className="leading-tight">
                <strong className="block text-[14px] font-semibold text-[var(--foreground,#111827)]">
                  {event.date}
                </strong>
                <small className="mt-1 block text-[12px] text-[var(--muted,#6b7280)]">
                  Four days. Five industries.
                </small>
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 shrink-0 text-[var(--primary)]" size={19} />
              <span className="leading-tight">
                <strong className="block text-[14px] font-semibold text-[var(--foreground,#111827)]">
                  Janata Maidan
                </strong>
                <small className="mt-1 block text-[12px] text-[var(--muted,#6b7280)]">
                  Bhubaneswar, Odisha
                </small>
              </span>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-3 flex flex-wrap items-center gap-4"
          >
            <Button href="/exhibitor-registration">Book your stall</Button>
            <Button secondary href="/visitor-registration">
              Register as visitor
            </Button>
          </motion.div>

          {/* Brochure Link */}
          <motion.div variants={itemVariants} className="mt-5">
            <TextLink href="/brochure">Explore the exhibition brochure</TextLink>
          </motion.div>
        </motion.div>

        {/* Right: Visual Side (Exact Content Match Height) */}
        <motion.div
          className="relative min-h-[380px] w-full overflow-hidden rounded-xl sm:min-h-[420px] lg:col-span-5 lg:h-full lg:min-h-0"
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <Image
            src="/assets/printing.webp"
            alt="Commercial printing press processing printed sheets"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 800px) 100vw, 42vw"
            className="object-cover object-[58%_center]"
          />

          {/* Shading overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-transparent via-35% to-black/70" />

          {/* Background overlay component */}
          <HeroBackground />

          {/* Caption */}
          <div className="absolute bottom-5 left-5 right-5 z-10 text-white sm:bottom-6 sm:left-6 sm:right-6">
            <span className="block text-xs font-semibold uppercase tracking-wider text-amber-300">
              Ideas. Materials. Machinery.
            </span>
            <strong className="mt-1 block font-[family-name:var(--font-heading)] text-xl font-medium tracking-normal text-white sm:text-2xl">
              Precision meets possibility.
            </strong>
          </div>
        </motion.div>

      </div>
    </section>
  );
}