/* =========================================================================
   VISITORS CONTENT COMPONENT (components/pages/visitors/VisitorsContent.tsx)
   ========================================================================= */
"use client";

import Link from "next/link";
import {
  Compass,
  MapPin,
  Calendar,
  ArrowUpRight,
  Ticket,
  Map,
} from "lucide-react";
import { VisitorQuestions } from "@/components/pages/visitor-questions";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export function VisitorsContent() {
  const visitSteps = [
    {
      num: "01",
      title: "Target Solutions",
      desc: "Identify the machinery, automation systems, and packaging technologies you want to evaluate.",
    },
    {
      num: "02",
      title: "Get Visitor Badge",
      desc: "Register your business details online to instantly generate and save your digital entry pass.",
    },
    {
      num: "03",
      title: "Meet & Procure",
      desc: "Connect directly with exhibitors and compare commercial rates at Janata Maidan, 25th to 28th February 2027.",
    },
  ];

  const visitorProfiles = [
    "Packaging materials manufacturers",
    "Plastic processors and moulders",
    "Woven sack and FIBC manufacturers",
    "Plastics recyclers and reprocessors",
    "Corrugated box manufacturers",
    "Printers and converters",
    "Food processing units",
    "Agro industries",
    "Dairy product manufacturers",
    "Fish, seafood and meat processors",
    "Frozen, preserved and dehydrated food manufacturers",
    "Snack and confectionery manufacturers",
    "Beverage, brewing, canning and bottling units",
    "Pharmaceutical producers",
    "Cosmetics and personal care manufacturers",
    "Chemical product manufacturers",
    "FMCG and consumer goods manufacturers",
    "Electronics manufacturers",
    "Industrial product manufacturers",
    "Contract packagers and retail packagers",
    "E-commerce and quickcommerce fulfilment operators",
    "Food exporters, retailers, distributors and wholesalers",
    "Machinery importers, dealers and distributors",
    "Cold chain and refrigeration operators",
    "Water treatment and environmental engineers",
    "Consultants, food scientists and technologists",
    "Government departments, PSUs, academia and R&D institutions",
  ];

  return (
    <>
      {/* 1. WHY VISIT: Value Proposition Split */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left: Main Copy & Actions */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex items-center gap-2">
              <Eyebrow>Why Visit</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              One Expo. Endless Solutions. <br />
              <span className="text-[#EB622F]">
                Powering multiple industries. Driving the future.
              </span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                Reach a market that is being built right now. Odisha&apos;s
                packaging demand is being created by new food processing,
                pharmaceutical, petrochemical, and e-commerce capacity—not
                competed for in a saturated market.
              </p>
              <p>
                Connect with suppliers, enterprise buyers, and trade partners
                across packaging, printing, polymers, and food processing at
                Janata Maidan, Bhubaneswar.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/visitor-registration">Register your visit</Button>
              <Link
                href="/visitor-profile"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-xs font-semibold text-[#1F3864] shadow-2xs transition-all hover:border-[#EB622F] hover:bg-[#EB622F]/5 hover:text-[#EB622F]"
              >
                <Ticket size={15} />
                <span>View Visitor Profile</span>
              </Link>
            </div>
          </div>

          {/* Right: Step-by-Step Preparation Checklist Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md sm:p-8">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-[#15A7AE]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3864]">
                  Visitor Roadmap
                </span>
              </div>

              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[#1F3864] sm:text-2xl">
                Make the most of your visit
              </h3>

              <p className="mt-1 text-xs text-[var(--muted,#6b7280)]">
                Three quick milestones to maximize your sourcing efficiency on
                the exhibition floor:
              </p>

              <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-5">
                {visitSteps.map((step) => (
                  <div
                    key={step.num}
                    className="group flex items-start gap-3.5 rounded-xl border border-transparent p-2 transition-colors hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#15A7AE]/10 font-mono text-xs font-bold text-[#15A7AE] transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
                      {step.num}
                    </span>

                    <div>
                      <strong className="block text-xs font-bold text-[#1F3864] sm:text-sm">
                        {step.title}
                      </strong>
                      <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 2. VISITOR PROFILE SECTION (Grid Preview with Link) */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Eyebrow>Visitor Profile</Eyebrow>
              </div>

              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
                Indicative and not restrictive
              </h2>
            </div>
            <div>
              <Link 
                href="/visitor-profile"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#EB622F] hover:underline"
              >
                <span>View full visitor profile breakdown</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visitorProfiles.slice(0, 6).map((item, i) => (
              <div
                key={item}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-lg sm:p-8"
              >
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-[#1F3864] transition-colors group-hover:text-[#EB622F]">
                    {item}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/visitor-profile"
              className="inline-flex items-center gap-2 rounded-xl bg-[#1F3864] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#162747]"
            >
              <span>View all {visitorProfiles.length}+ visitor categories</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </RevealSection>

      {/* 3. PLAN YOUR VISIT: Venue Logistics & Maps */}
      <RevealSection
        id="plan-your-visit"
        className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24"
      >
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
              <Eyebrow>Your Destination</Eyebrow>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl">
              Meet us in Bhubaneswar
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-[#15A7AE]" />
                <div>
                  <strong className="block text-sm font-bold text-[#1F3864]">
                    Janata Maidan
                  </strong>
                  <span className="text-xs text-[var(--muted,#6b7280)]">
                    Bhubaneswar, Odisha, India
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-white p-4">
                <Calendar
                  size={20}
                  className="mt-0.5 shrink-0 text-[#15A7AE]"
                />
                <div>
                  <strong className="block text-sm font-bold text-[#1F3864]">
                    25th to 28th February 2027
                  </strong>
                  <span className="text-xs text-[var(--muted,#6b7280)]">
                    Four Days · Free entry for trade visitors
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)]">
              Free for registered trade visitors; all seminar sessions open to
              delegates at no charge.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs transition-all hover:border-[#EB622F]/50 sm:p-8">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7f8f7] border border-[var(--border)] text-[#15A7AE] shadow-2xs">
                  <Map size={22} />
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[#1F3864]">
                  Plan your journey route
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                  Conveniently situated at Janata Maidan, Bhubaneswar, the same
                  ground that hosted Utkarsh Odisha: Make in Odisha Conclave
                  2025.
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Janata+Maidan+Bhubaneswar+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between rounded-xl bg-[#1F3864] px-4 py-3 text-xs font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-[#162747]"
                >
                  <span className="!text-white font-medium">
                    Open venue directions in Google Maps
                  </span>
                  <ArrowUpRight
                    size={15}
                    className="!text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <VisitorQuestions />
    </>
  );
}