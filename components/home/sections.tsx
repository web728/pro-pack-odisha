"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  Layers3,
  Printer,
  Box,
  Settings2,
  Factory,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { sectors, event } from "@/lib/site";
import { Button, Eyebrow, TextLink } from "@/components/shared/ui";
import { OrganizerStrip } from "../shared/organizer-strip";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const icons = [Layers3, Printer, Box, Settings2, Factory];

/* =========================================================================
   0. SUPPORTED BY STRIP (Refined Minimal B2B)
   ========================================================================= */
export function SupportedByStrip() {
  const supporters = [
    {
      name: "MSME Department, Government of Odisha",
      logo: "/logo/support-1.png",
    },
    {
      name: "Ministry of MSME, Government of India",
      logo: "/logo/support-2.png",
    },
    {
      name: "Industrial Promotion & Investment Corporation of Odisha",
      logo: "/logo/ipcal.png",
    },
  ];

  return (
    <section className="relative border-b border-[var(--border)] bg-gradient-to-b from-[#f8faf9] to-white py-10 sm:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Minimal Centered Anchor with Horizontal Accents */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center justify-center gap-4 text-center"
        >
          <span className="h-px w-12 bg-slate-200 sm:w-20" aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
            Supported by
          </p>
          <span className="h-px w-12 bg-slate-200 sm:w-20" aria-hidden="true" />
        </motion.div>

        {/* Clean Balanced Logo Display */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-16 lg:gap-24"
        >
          {supporters.map((item) => (
            <motion.div
              key={item.name}
              variants={fadeUp}
              className="group flex flex-col items-center max-w-[260px] sm:max-w-[280px]"
            >
              {/* Uniform Logo Container */}
              <div className="relative flex h-20 w-[220px] items-center justify-center transition-transform duration-300 ease-out group-hover:scale-[1.03] sm:h-24 sm:w-[260px]">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 220px, 260px"
                  className="object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
                  priority
                />
              </div>

              {/* Clean Caption */}
              <span className="mt-3 text-center text-xs font-semibold tracking-tight text-slate-700 transition-colors group-hover:text-slate-950 sm:text-[13px]">
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   1. EVENT SNAPSHOT (Stats & Summary)
   ========================================================================= */
export function EventSnapshot() {
  return (
    <section className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        {/* Left Copy */}
        <motion.div
          className="lg:col-span-7"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Eyebrow>The exhibition at a glance</Eyebrow>
          <h2 className="my-4 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
            One Expo. Endless Solutions.
            <br />
            <span className="text-[#EB622F]">
              Powering multiple industries. Driving the future.
            </span>
          </h2>
          <p className="max-w-[56ch] text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
            Eastern India's largest MSME exhibition brings technology providers,
            manufacturers, and business buyers together at Janata Maidan,
            Bhubaneswar. Explore machinery, sustainable materials, and
            industrial solutions.
          </p>
          <div className="mt-6">
            <TextLink href="/about">About the expo</TextLink>
          </div>
        </motion.div>

        {/* Right Stats Grid */}
        <motion.dl
          className="grid grid-cols-3 gap-4 border-t border-[var(--border)] pt-8 sm:gap-6 lg:col-span-5 lg:border-t-0 lg:pt-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {[
            ["150+", "Exhibiting companies"],
            ["04", "Exhibition days"],
            ["10k+", "Trade visitors"],
          ].map(([value, label]) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="border-t-2 border-[#15A7AE] pt-4"
            >
              <dt className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#1F3864] sm:text-4xl lg:text-5xl">
                {value}
              </dt>
              <dd className="mt-2 text-xs font-medium text-[var(--muted,#6b7280)] sm:text-sm">
                {label}
              </dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/* =========================================================================
   2. SECTOR PREVIEW (5 Industry Blocks)
   ========================================================================= */
export function SectorPreview() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24"
    >
      {/* Background PNG Image on Right Top Corner */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] lg:h-[340px] lg:w-[340px] opacity-85">
          <Image
            src="/assets/svg.png"
            alt=""
            fill
            className="object-contain object-top-right"
            priority
          />
        </div>

        {/* Ambient Warm Corner Light */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#EB622F]/[0.04] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        {/* Header Strip */}
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Explore the sectors</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
              From raw material to finished product.
            </h2>
          </div>
          <TextLink href="/sectors">All sector information</TextLink>
        </div>

        {/* 5-Column Responsive Grid */}
        <motion.div
          className="grid grid-cols-1 divide-y divide-[var(--border)] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {sectors.map((sector, i) => {
            const Icon = icons[i] || Layers3;
            return (
              <motion.div key={sector.name} variants={fadeUp}>
                <Link
                  href={`/sectors#sector-${i}`}
                  className="group relative flex h-full flex-col justify-between p-6 transition-all duration-300 hover:bg-[#fafaf9] lg:p-7"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] transition-transform duration-300 group-hover:scale-110">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <span className="font-mono text-xs font-semibold tracking-wider text-[var(--muted,#6b7280)]">
                        0{i + 1}
                      </span>
                    </div>

                    <h3 className="mt-6 font-[family-name:var(--font-heading)] text-lg font-bold text-[#1F3864] group-hover:text-[#EB622F] transition-colors">
                      {sector.name}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                      {sector.detail}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[#EB622F]">
                    <span>Explore</span>
                    <ArrowUpRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* =========================================================================
   3. PARTICIPATION PREVIEW (Exhibitors vs Visitors)
   ========================================================================= */
export function ParticipationPreview() {
  const cards = [
    {
      label: "For exhibitors",
      title: "Bring your innovation to market.",
      text: "Showcase machinery, equipment, and materials, meet serious industry professionals, and develop relationships across connected sectors.",
      href: "/exhibitors",
      cta: "Explore exhibiting",
      bgClass: "bg-[#faf2f1] border-rose-200/70",
      accentBadge: "text-rose-700 bg-rose-100/80",
    },
    {
      label: "For visitors",
      title: "Find your next business solution.",
      text: "For manufacturers, processors, procurement teams, and entrepreneurs: compare technologies, access policy and finance, and network.",
      href: "/visitors",
      cta: "Plan your visit",
      bgClass: "bg-[#eef5f7] border-sky-200/70",
      accentBadge: "text-sky-800 bg-sky-100/80",
    },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-white py-12 lg:py-16">
      <div className="container relative z-10 mx-auto grid grid-cols-1 gap-6 px-4 sm:px-6 md:grid-cols-2 lg:gap-8">
        {cards.map((card, index) => (
          <motion.article
            key={card.label}
            className={`flex flex-col justify-between rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-lg sm:p-10 ${card.bgClass}`}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.1 }}
          >
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${card.accentBadge}`}
              >
                {card.label}
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl">
                {card.title}
              </h2>
              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                {card.text}
              </p>
            </div>
            <div className="mt-8">
              <TextLink href={card.href}>{card.cta}</TextLink>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   4. TECHNOLOGY PREVIEW (Split Feature Banner)
   ========================================================================= */
export function TechnologyPreview() {
  return (
    <section className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm lg:grid-cols-12">
          {/* Image Side */}
          <motion.div
            className="relative min-h-[300px] w-full sm:min-h-[380px] lg:col-span-5 lg:min-h-full"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/assets/packaging.webp"
              alt="Paper, board and container packaging materials"
              fill
              sizes="(max-width:800px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
          </motion.div>

          {/* Copy Side */}
          <motion.div
            className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Eyebrow>Technology in context</Eyebrow>
            <h2 className="my-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              Materials. Machines.
              <br />
              <span className="text-[#EB622F]">Sustainable solutions.</span>
            </h2>
            <p className="mb-6 max-w-[52ch] text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Explore the links between packaging, printing, plastics
              processing, and converting. Discover energy-efficient
              technologies, mono-material formats, and EPR compliance solutions.
            </p>
            <div>
              <TextLink href="/sectors">
                Explore the technology sectors
              </TextLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   5. VENUE PREVIEW (Janata Maidan Callout)
   ========================================================================= */
export function VenuePreview() {
  return (
    <section className="border-b border-[var(--border)] bg-white py-12 lg:py-16">
      <motion.div
        className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#15A7AE]/10 text-[#15A7AE]">
            <MapPin size={26} />
          </div>
          <div>
            <Eyebrow>Meet in Bhubaneswar</Eyebrow>
            <h2 className="text-xl font-bold tracking-tight text-[#1F3864] sm:text-2xl">
              Janata Maidan, Odisha
            </h2>
            <p className="mt-1 text-xs text-[var(--muted,#6b7280)] sm:text-sm">
              25th to 28th February 2027 · Free entry for registered trade
              visitors
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <Button secondary href="/visitors#plan-your-visit">
            Plan your journey
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

/* =========================================================================
   6. ORGANIZER STRIP (OASME Trust Bar)
   ========================================================================= */
export function OrganizerSection() {
  return <OrganizerStrip />;
}
