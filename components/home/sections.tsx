"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Layers3,
  Printer,
  Box,
  Settings2,
  Factory,
  MapPin,
} from "lucide-react";
import { sectors } from "@/lib/site";
import { Button, Eyebrow, TextLink } from "@/components/shared/ui";
import { OrganizerStrip } from "../shared/organizer-strip";

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
        <div className="flex items-center justify-center gap-4 text-center">
          <span className="h-px w-12 bg-slate-200 sm:w-20" aria-hidden="true" />
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
            Supported by
          </p>
          <span className="h-px w-12 bg-slate-200 sm:w-20" aria-hidden="true" />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-16 lg:gap-24">
          {supporters.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col items-center max-w-[260px] sm:max-w-[280px]"
            >
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

              <span className="mt-3 text-center text-xs font-semibold tracking-tight text-slate-700 transition-colors group-hover:text-slate-950 sm:text-[13px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

















/* =========================================================================
   1. EVENT SNAPSHOT (Stats & Summary - OASME & PROPACK 2027 At A Glance)
   ========================================================================= */
export function EventSnapshot() {
  return (
    <section className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        
        {/* Content */}
        <div className="lg:col-span-7">
          <div className="mb-2">
            <Eyebrow>About PROPACK Odisha 2027</Eyebrow>
          </div>

          <h2 className="max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            Where Industry, Innovation{' '}
            <br className="hidden sm:block" />
            <span className="text-[#EB622F]">&amp; Business Come Together.</span>
          </h2>

          <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg sm:leading-8">
            <p>
              PROPACK Odisha 2027 is the flagship platform of the{' '}
              <strong className="font-semibold text-[#1F3864]">
                Odisha Assembly of Small and Medium Enterprises (OASME)
              </strong>
              , bringing together the packaging, printing, paper, plastics,
              processing &amp; green energy value chain.
            </p>

            <p>
              The 4th edition will take place from{' '}
              <strong className="font-semibold text-[#1F3864]">
                25–28 February 2027
              </strong>{' '}
              at{' '}
              <strong className="font-semibold text-[#1F3864]">
                Janata Maidan, Bhubaneswar
              </strong>
              , bringing together machinery manufacturers, technology providers,
              material suppliers, processors, converters, buyers and decision-makers
              from Odisha, Eastern India and beyond.
            </p>

            <p>
              The exhibition combines a{' '}
              <strong className="font-semibold text-[#1F3864]">
                B2B trade exhibition, four-day conference programme
              </strong>{' '}
              and structured buyer–seller meets, creating opportunities for business
              development, technology discovery and industry networking.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <TextLink href="/about">About OASME &amp; Expo</TextLink>
          </div>
        </div>

        {/* Stats */}
        <dl className="grid grid-cols-1 gap-6 border-t border-[var(--border)] pt-8 sm:grid-cols-3 lg:col-span-5 lg:border-t-0 lg:pt-0">
          {[
            ["150+", "Exhibiting companies"],
            ["04", "Exhibition days"],
            ["10k+", "Trade visitors & buyers"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="border-t-2 border-[#15A7AE] pt-4 transition-all duration-300 hover:-translate-y-1"
            >
              <dt className="font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
                {value}
              </dt>

              <dd className="mt-3 max-w-[16ch] text-sm font-medium leading-5 text-[var(--muted,#6b7280)]">
                {label}
              </dd>
            </div>
          ))}
        </dl>

      </div>
    </section>
  );
}




















/* =========================================================================
   2. SECTOR PREVIEW (6 Industry Blocks - 3x2 Grid Layout)
   ========================================================================= */
export function SectorPreview() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24"
    >
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
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#EB622F]/[0.04] blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Explore the sectors</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
              From raw material to finished product.
            </h2>
          </div>
          <TextLink href="/sectors">All sector information</TextLink>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((sector, i) => {
            const Icon = icons[i] || Layers3;
            return (
              <div key={sector.name} className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
                <Link
                  href={`/sectors#sector-${i}`}
                  scroll={false} // Next.js ke auto-scroll bug ko rokne ke liye
                  onClick={(e) => {
                    // Agar user pehle se /sectors page par nahi hai toh router navigate karega,
                    // agar wahan hai toh smooth scroll trigger hoga.
                    if (window.location.pathname === "/sectors") {
                      e.preventDefault();
                      const element = document.getElementById(`sector-${i}`);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.history.pushState(null, "", `#sector-${i}`);
                      }
                    }
                  }}
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
              </div>
            );
          })}
        </div>
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
        {cards.map((card) => (
          <article
            key={card.label}
            className={`flex flex-col justify-between rounded-2xl border p-8 transition-shadow duration-300 hover:shadow-lg sm:p-10 ${card.bgClass}`}
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
          </article>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   4. TECHNOLOGY PREVIEW (Split Feature Banner - Odisha Growth Engine)
   ========================================================================= */
export function TechnologyPreview() {
  return (
    <section className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-stretch gap-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm lg:grid-cols-12">
          <div className="relative min-h-[300px] w-full sm:min-h-[380px] lg:col-span-5 lg:min-h-full">
            <Image
              src="/assets/packaging.webp"
              alt="Paper, board and container packaging materials"
              fill
              sizes="(max-width:800px) 100vw, 42vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-14">
            <Eyebrow>Odisha: The Growth Engine of Eastern India</Eyebrow>
            <h2 className="my-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              Packaging is no longer a downstream cost line —
              <span className="text-[#EB622F]"> it is a growth industry.</span>
            </h2>
            <p className="mb-6 max-w-[52ch] text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
              India&apos;s packaging market is estimated at over USD 100 billion and projected to grow at a double-digit compound rate through 2030, anchored by Vision 2036 and Viksit Odisha 2047.
            </p>
            <div>
              <TextLink href="/sectors">
                Explore the technology sectors & plastics advantage
              </TextLink>
            </div>
          </div>
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
      <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center">
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
      </div>
    </section>
  );
}

/* =========================================================================
   6. ORGANIZER STRIP (OASME Trust Bar)
   ========================================================================= */
export function OrganizerSection() {
  return <OrganizerStrip />;
}