"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Sparkles, Workflow, Users2 } from "lucide-react";
import { Button, TextLink, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerCards: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

export function AboutContent() {
  const highlights = [
    "5 Core connected industrial sectors",
    "B2B direct supplier-to-buyer networking",
    "Live machinery & production line demonstrations",
  ];

  return (
    <>
      {/* 1. Main Overview Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          
          {/* Left: Content */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[var(--primary)]">
                <Sparkles size={14} />
              </span>
              <Eyebrow>Emerging markets. Growing opportunities.</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Built for the exchange <br />
              <span className="text-[var(--primary)]">that moves business forward.</span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                Propack Odisha International Expo is Eastern India&apos;s premier platform for
                market trends, investment opportunities, and industrial connections. Product
                displays and technical information exchange bring printing, packaging, and
                allied manufacturing enterprises together.
              </p>
              <p>
                Meet at Janata Maidan in Bhubaneswar to discover machinery innovations, understand
                evolving processing demands, and forge high-value partnerships across the entire value chain.
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="mt-6 space-y-2.5 border-t border-[var(--border)] pt-6">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-sm font-medium text-[var(--foreground,#111827)]">
                  <CheckCircle2 size={16} className="text-[var(--primary)] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">Become an exhibitor</Button>
              <Button secondary href="/visitor-registration">Register as visitor</Button>
            </div>
          </motion.div>

          {/* Right: Artwork Showcase Collage */}
          <motion.div
            className="relative flex items-center justify-center lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 shadow-md lg:p-8">
              <Image
                src="/assets/collage.webp"
                loading="eager"
                alt="Packaging lines, warehouses and printing machinery exhibition collage"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
                className="object-contain p-4 transition-transform duration-500 hover:scale-105"
              />
              
              {/* Subtle Ambient Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[var(--primary)]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-sky-500/10 blur-3xl" />
            </div>
          </motion.div>

        </div>
      </RevealSection>

      {/* 2. Value Chain & Connected Opportunities Grid */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="max-w-2xl">
            <Eyebrow>The exhibition at a glance</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl">
              From raw concept to industrial scale.
            </h2>
            <p className="mt-3 text-base text-[var(--muted-foreground,#4b5563)]">
              Bridging the gap between machinery manufacturers, raw material innovators, and high-volume commercial buyers.
            </p>
          </div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8"
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Card 1: Value Chain */}
            <motion.article
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-white hover:shadow-xl sm:p-10"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[var(--primary)] shadow-xs transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                  <Workflow size={24} />
                </div>
                
                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)]">
                  Explore the value chain
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                  State-of-the-art packaging machines and materials meet industrial coding, high-precision printing, food processing lines, logistics systems, and automated material-handling setups.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
                <TextLink href="/exhibitors">Explore exhibitor profiles</TextLink>
                <ArrowUpRight size={18} className="text-[var(--muted,#6b7280)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
              </div>
            </motion.article>

            {/* Card 2: Business Opportunities */}
            <motion.article
              variants={fadeUp}
              className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-white hover:shadow-xl sm:p-10"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[var(--primary)] shadow-xs transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                  <Users2 size={24} />
                </div>

                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)]">
                  Connect with opportunity
                </h3>
                
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                  Engage directly with commercial printers, flexible converters, packaging engineers, industrial procurement heads, and visionary enterprise founders seeking modern technological upgrades.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
                <TextLink href="/visitors">Discover the visitor experience</TextLink>
                <ArrowUpRight size={18} className="text-[var(--muted,#6b7280)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--primary)]" />
              </div>
            </motion.article>
          </motion.div>

        </div>
      </RevealSection>
    </>
  );
}