"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  TrendingUp,
  Store,
  Layers,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { sectors } from "@/lib/site";
import { exhibitorProfiles } from "@/lib/content";
import { Profiles } from "./profiles";
import { RevealSection } from "@/components/shared/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function ExhibitorsContent() {
  const participationPerks = [
    "Highlight new machinery, automated lines, and materials",
    "Position your brand as an Eastern India market leader",
    "Deliver focused sales pitches to qualified enterprise buyers",
    "Forge supply contracts across connected packaging industries",
    "Generate qualified direct leads without intermediary friction",
  ];

  return (
    <>
      {/* 1. WHY EXHIBIT: Split Value Proposition Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          
          {/* Left: Copy & Actions */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2">
           
              <Eyebrow>Why Exhibit</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              More than a display. <br />
              <span className="text-[var(--primary)]">A high-conversion business dialogue.</span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                Position your brand, introduce cutting-edge processing solutions, and
                communicate directly with commercial decision-makers who define capital investments.
              </p>
              <p>
                Propack Odisha offers a unified exhibition forum for technology providers, machinery
                fabricators, raw material converters, and allied industrial service partners to
                secure long-term enterprise procurement.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">Enquire about a stall</Button>
              <Button secondary href="/brochure">
                <FileText size={16} className="mr-1.5" />
                Explore brochure
              </Button>
            </div>
          </motion.div>

          {/* Right: Interactive Participation Highlights Card */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="rounded-2xl border border-[var(--border)] bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md sm:p-9">
              <div className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[var(--primary)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground,#111827)]">
                  Exhibitor ROI
                </span>
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                Make your participation count
              </h3>

              <p className="mt-2 text-xs text-[var(--muted,#6b7280)] sm:text-sm">
                Direct access to over 15,000+ targeted trade visitors, industrial procurement officers, and MSME business owners.
              </p>

              <div className="mt-6 space-y-3.5 border-t border-[var(--border)] pt-6">
                {participationPerks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[var(--primary)]"
                    />
                    <span className="text-sm font-medium leading-snug text-[var(--muted-foreground,#374151)]">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </RevealSection>

      {/* 2. WHO SHOULD EXHIBIT: Ecosystem Grid */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                
                <Eyebrow>Who Should Exhibit</Eyebrow>
              </div>
              
              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl">
                A connected industrial ecosystem.
              </h2>
            </div>

            <Link
              href="/sectors"
              className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--primary)] hover:underline"
            >
              <span>Explore equipment and materials by sector</span>
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <motion.div
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerGrid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {sectors.map((s, i) => (
              <motion.article
                id={`sector-${i}`}
                key={s.name}
                variants={fadeUp}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--primary)] hover:bg-white hover:shadow-lg sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1 font-mono text-xs font-semibold text-[var(--muted,#6b7280)] border border-[var(--border)] group-hover:border-[var(--primary)] group-hover:text-[var(--primary)] transition-colors">
                      SECTOR 0{i + 1}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-slate-300 transition-colors group-hover:bg-[var(--primary)]" />
                  </div>

                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] transition-colors group-hover:text-[var(--primary)]">
                    {s.name}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                    {s.detail}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-[var(--primary)] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span>View sector specifications</span>
                  <ArrowUpRight size={14} />
                </div>
              </motion.article>
            ))}
          </motion.div>

        </div>
      </RevealSection>

      {/* 3. PROFILES COMPONENT (Exhibitor Categories) */}
      <Profiles title="Exhibitor profiles" items={exhibitorProfiles} />

      {/* 4. ALREADY EXHIBITING: Support Callout Banner */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center">
            
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
              
                <Eyebrow>Already Exhibiting?</Eyebrow>
              </div>

              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-3xl lg:text-4xl">
                Get ready for the exhibition floor.
              </h2>
              
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Submit electrical loads, badge nominations, custom fascia typography, and official show directory profiles directly through the exhibitor portal.
              </p>
            </div>

            <div className="shrink-0">
              <Button href="/exhibitor-details">
                Open Exhibitor Service Centre
              </Button>
            </div>

          </div>
        </div>
      </RevealSection>
    </>
  );
}