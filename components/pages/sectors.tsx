
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
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

function getSectorFromHash(): number | null {
  if (typeof window === "undefined") return null;

  const match = window.location.hash.match(/^#sector-(\d+)$/);

  if (!match) return null;

  const index = Number(match[1]);

  return Number.isInteger(index) &&
    index >= 0 &&
    index < sectors.length
    ? index
    : null;
}

export function SectorsContent() {
  const [activeTab, setActiveTab] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const syncSector = () => {
      const index = getSectorFromHash();

      if (index !== null) {
        setActiveTab(index);
      }
    };

    syncSector();

    window.addEventListener("hashchange", syncSector);
    window.addEventListener("popstate", syncSector);

    return () => {
      window.removeEventListener("hashchange", syncSector);
      window.removeEventListener("popstate", syncSector);
    };
  }, []);

  const currentSector = sectors[activeTab];

  if (!currentSector) return null;

  const currentTopics = sectorDetails[activeTab] ?? [];

  function selectSector(index: number) {
    setActiveTab(index);

    const hash = `#sector-${index}`;

    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  }

  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-10 lg:py-14">
      <section
        aria-labelledby="sectors-page-heading"
        className="container mx-auto px-4 sm:px-6"
      >
        {/* Page introduction */}
        <header className="mb-8 max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-5 w-5 items-center justify-center rounded-full bg-[#15A7AE]/10 text-[#15A7AE]"
            >
              <Layers size={12} />
            </span>

            <Eyebrow>Exhibition Coverage</Eyebrow>
          </div>

          <h1
            id="sectors-page-heading"
            className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-extrabold tracking-tight text-[#1F3864] sm:text-3xl"
          >
            Sectors &amp; Technology Catalog
          </h1>

          <p className="mt-1 text-xs text-[var(--muted-foreground,#4b5563)] sm:text-sm">
            Select an industry sector below to view its equipment
            coverage, conversion machinery, and featured segments.
          </p>
        </header>

        {/* Sector navigation and details */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Sector navigation */}
          <nav
            aria-label="PROPACK Odisha exhibition sectors"
            className="flex min-w-0 flex-row gap-2 overflow-x-auto pb-2 sm:pb-0 lg:col-span-4 lg:flex-col lg:justify-between lg:overflow-visible"
          >
            {sectors.map((sector, index) => {
              const isActive = activeTab === index;

              return (
                <button
                  key={sector.name}
                  id={`sector-${index}`}
                  type="button"
                  onClick={() => selectSector(index)}
                  aria-pressed={isActive}
                  aria-controls="sector-detail-panel"
                  className={`group relative flex min-w-[160px] flex-1 shrink-0 items-center justify-between rounded-xl border p-3.5 text-left transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F] sm:p-4 lg:min-w-0 lg:w-full ${
                    isActive
                      ? "border-[#EB622F] bg-white shadow-sm ring-1 ring-[#EB622F]/20"
                      : "border-[var(--border)] bg-white/80 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="min-w-0">
                      <strong
                        className={`block break-words text-xs font-bold leading-snug sm:text-sm ${
                          isActive
                            ? "text-[#1F3864]"
                            : "text-[var(--muted-foreground,#4b5563)] group-hover:text-[#1F3864]"
                        }`}
                      >
                        {sector.name}
                      </strong>
                    </span>
                  </span>

                  <ChevronRight
                    size={16}
                    aria-hidden="true"
                    className={`hidden shrink-0 transition-transform duration-200 lg:block ${
                      isActive
                        ? "translate-x-0.5 text-[#EB622F]"
                        : "text-slate-300 group-hover:text-slate-500"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Active sector information */}
          <div
            id="sector-detail-panel"
            className="flex min-w-0 flex-col lg:col-span-8"
            aria-live="polite"
            aria-atomic="true"
          >
            <AnimatePresence mode="wait">
              <motion.article
                key={activeTab}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 10 }
                }
                animate={{ opacity: 1, y: 0 }}
                exit={
                  reduceMotion
                    ? undefined
                    : { opacity: 0, y: -10 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                  ease: "easeOut",
                }}
                aria-labelledby={`sector-title-${activeTab}`}
                className="flex h-full min-w-0 flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-8"
              >
                <div>
                  {/* Sector image and introduction */}
                  <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-12">
                    <div className="relative h-44 w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[#f7f8f7] sm:col-span-5 sm:h-48">
                      <Image
                        key={currentSector.image}
                        src={`/sections/${currentSector.image}`}
                        alt={`${currentSector.name} exhibition sector at PROPACK Odisha 2027`}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0 sm:col-span-7">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15A7AE]">
                        <PackageCheck
                          size={14}
                          aria-hidden="true"
                        />

                        <span>Industry Sector</span>
                      </div>

                      <h2
                        id={`sector-title-${activeTab}`}
                        className="mt-1.5 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[#1F3864] sm:text-2xl"
                      >
                        {currentSector.name}
                      </h2>

                      <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                        {currentSector.detail}
                      </p>
                    </div>
                  </div>

                  {/* Machinery and product categories */}
                  <section
                    aria-labelledby={`sector-products-${activeTab}`}
                    className="mt-6 border-t border-[var(--border)] pt-5"
                  >
                    <h3
                      id={`sector-products-${activeTab}`}
                      className="text-xs font-bold uppercase tracking-wider text-[var(--muted,#6b7280)]"
                    >
                      Included Machinery &amp; Products
                    </h3>

                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {currentTopics.map((topic) => (
                        <li
                          key={topic}
                          className="flex min-w-0 items-start gap-2.5 rounded-lg border border-[var(--border)] bg-[#f7f8f7] p-2.5 text-xs leading-snug text-[#1F3864] transition-colors hover:border-[#EB622F]/50 hover:bg-white"
                        >
                          <CheckCircle2
                            size={14}
                            aria-hidden="true"
                            className="mt-0.5 shrink-0 text-[#15A7AE]"
                          />

                          <span className="min-w-0 break-words font-medium">
                            {topic}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
 
              </motion.article>
            </AnimatePresence>
          </div>
        </div>

        {/* Exhibitor information */}
        <div className="mt-10 flex justify-center border-t border-[var(--border)] pt-6">
          <TextLink href="/exhibitors">
            Explore complete exhibitor profiles directory
          </TextLink>
        </div>
      </section>
    </RevealSection>
  );
}
