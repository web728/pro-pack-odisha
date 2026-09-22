"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2,
  CheckCircle2,
  Layers,
  ArrowRight,
  ChevronRight,
  PackageCheck,
} from "lucide-react";
import { sectors } from "@/lib/site";
import { sectorDetails } from "@/lib/sector-details";
import { TextLink, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export function SectorsContent() {
  const [activeTab, setActiveTab] = useState(0);
  const currentSector = sectors[activeTab];

  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-10 lg:py-14">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Compact Header */}
        <div className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#15A7AE]/10 text-[#15A7AE]">
              <Layers size={12} />
            </span>
            <Eyebrow>Exhibition Coverage</Eyebrow>
          </div>
          <h1 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-[#1F3864] sm:text-3xl">
            Sectors & Technology Catalog
          </h1>
          <p className="mt-1 text-xs text-[var(--muted-foreground,#4b5563)] sm:text-sm">
            Select an industry sector below to view its equipment coverage, conversion machinery, and featured segments.
          </p>
        </div>

        {/* Master-Detail Grid - Equal Stretch Alignment */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Equal Height Tab List */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 sm:pb-0 lg:col-span-4 lg:flex-col lg:justify-between lg:overflow-visible">
            {sectors.map((s, i) => {
              const isActive = activeTab === i;
              return (
                <button
                  key={s.name}
                  onClick={() => setActiveTab(i)}
                  className={`group relative flex flex-1 shrink-0 items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-200 sm:p-4 lg:w-full ${
                    isActive
                      ? "border-[#EB622F] bg-white shadow-sm ring-1 ring-[#EB622F]/20"
                      : "border-[var(--border)] bg-white/80 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold transition-colors ${
                        isActive
                          ? "bg-[#EB622F] text-white"
                          : "bg-[#f7f8f7] text-[var(--muted,#6b7280)] group-hover:text-[#1F3864]"
                      }`}
                    >
                      0{i + 1}
                    </span>

                    <div>
                      <strong
                        className={`block text-xs font-bold leading-snug sm:text-sm ${
                          isActive
                            ? "text-[#1F3864]"
                            : "text-[var(--muted-foreground,#4b5563)] group-hover:text-[#1F3864]"
                        }`}
                      >
                        {s.name}
                      </strong>
                      <span className="hidden text-[11px] text-[var(--muted,#6b7280)] lg:block">
                        {sectorDetails[i]?.length || 0} Key technology areas
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    size={16}
                    className={`hidden transition-transform duration-200 lg:block ${
                      isActive
                        ? "translate-x-0.5 text-[#EB622F]"
                        : "text-slate-300 group-hover:text-slate-500"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Equal Height Detail Card */}
          <div className="flex flex-col lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-8"
              >
                <div>
                  {/* Visual Banner & Sector Title */}
                  <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                    
                    {/* Visual Image / Animation Container */}
                    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#f7f8f7] sm:col-span-5 sm:h-48">
                      {activeTab === 3 ? (
                        <div className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-[#15A7AE]/10 to-transparent p-4 text-center">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-[#15A7AE] shadow-xs">
                            <Settings2 size={26} className="animate-[spin_12s_linear_infinite]" />
                          </span>
                          <strong className="mt-3 text-xs font-bold tracking-wider text-[#1F3864]">
                            PROCESS · PRODUCE · PACK
                          </strong>
                          <span className="text-[11px] text-[var(--muted,#6b7280)]">
                            Food & Beverage Processing
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={`/assets/${currentSector.image}`}
                          alt={`${currentSector.name} machinery preview`}
                          fill
                          sizes="(max-width: 640px) 100vw, 320px"
                          className="object-cover"
                        />
                      )}
                      
                      <span className="absolute top-2.5 left-2.5 rounded-md bg-white/95 px-2 py-0.5 font-mono text-[10px] font-bold text-[#1F3864] shadow-2xs backdrop-blur-xs">
                        SECTOR 0{activeTab + 1}
                      </span>
                    </div>

                    {/* Sector Title & Detail */}
                    <div className="sm:col-span-7">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15A7AE]">
                        <PackageCheck size={14} />
                        <span>Verified Industry Vertical</span>
                      </div>

                      <h2 className="mt-1.5 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[#1F3864] sm:text-2xl">
                        {currentSector.name}
                      </h2>

                      <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                        {currentSector.detail}
                      </p>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="mt-6 border-t border-[var(--border)] pt-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted,#6b7280)]">
                      Included Machinery & Products 
                    </span>

                    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {sectorDetails[activeTab]?.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-start gap-2.5 rounded-lg border border-[var(--border)] bg-[#f7f8f7] p-2.5 text-xs leading-snug text-[#1F3864] transition-colors hover:border-[#EB622F]/50 hover:bg-white"
                        >
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#15A7AE]" />
                          <span className="font-medium">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar With Brand Orange Button */}
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] pt-4">
                  <span className="text-xs font-medium text-[var(--muted-foreground,#4b5563)]">
                    Want to showcase machinery in {currentSector.name}?
                  </span>
                  
                  <Link
                    href="/exhibitor-registration"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#EB622F] px-4 py-2 text-xs font-bold !text-white shadow-md transition-all duration-200 hover:bg-[#d55526] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#EB622F]/40 active:scale-95"
                  >
                    <span className="!text-white font-bold tracking-wide">
                      Book Stall in Sector 0{activeTab + 1}
                    </span>
                    <ArrowRight size={14} className="!text-white" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Footer Link */}
        <div className="mt-10 flex justify-center border-t border-[var(--border)] pt-6">
          <TextLink href="/exhibitors">
            Explore complete exhibitor profiles directory
          </TextLink>
        </div>

      </div>
    </RevealSection>
  );
}