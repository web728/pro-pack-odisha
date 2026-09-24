"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  Workflow,
  Users2,
  CalendarDays,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Button, TextLink, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export function AboutContent() {
  const highlights = [
    "Flagship platform of the Odisha Assembly of Small and Medium Enterprises (OASME)",
    "Bringing together packaging, printing, paper, plastics, processing & green energy",
    "4-day B2B trade exhibition, conference programme & structured buyer-seller meets",
  ];

  return (
    <>
      {/* 1. Main Overview Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left: Content */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex items-center gap-2">
              <Eyebrow>About PROPACK Odisha 2027</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Where Industry, Innovation <br />
              <span className="text-[#EB622F]">
                &amp; Business Come Together.
              </span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                PROPACK Odisha 2027 is the flagship platform of the{" "}
                <strong className="font-semibold text-[#1F3864]">
                  Odisha Assembly of Small and Medium Enterprises (OASME)
                </strong>
                , bringing together the packaging, printing, paper, plastics,
                processing &amp; green energy value chain.
              </p>
              <p>
                The 4th edition will take place from{" "}
                <strong className="font-semibold text-[#1F3864]">
                  25–28 February 2027
                </strong>{" "}
                at{" "}
                <strong className="font-semibold text-[#1F3864]">
                  Janata Maidan, Bhubaneswar
                </strong>
                , bringing together machinery manufacturers, technology providers,
                material suppliers, processors, converters, buyers and decision-makers
                from Odisha, Eastern India and beyond.
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="mt-6 space-y-2.5 border-t border-[var(--border)] pt-6">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 text-sm font-medium text-[#1F3864]"
                >
                  <CheckCircle2 size={16} className="text-[#15A7AE] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">
                Become an exhibitor
              </Button>
              <Button secondary href="/visitor-registration">
                Register as visitor
              </Button>
            </div>
          </div>

          {/* Right: Artwork Showcase Collage */}
          <div className="relative flex items-center justify-center lg:col-span-5">
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
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#EB622F]/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-[#15A7AE]/10 blur-3xl" />
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 2. Exhibition Format & Value Chain Grid */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Eyebrow>Exhibition Experience</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
              Engineered for technology discovery &amp; networking.
            </h2>
            <p className="mt-3 text-base text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              The exhibition combines a <strong className="font-semibold text-[#1F3864]">B2B trade exhibition, four-day conference programme</strong> and structured buyer–seller meets, creating opportunities for business development, technology discovery and industry networking.
            </p>
          </div>

          {/* Event Quick Meta Badges */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:max-w-2xl">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#15A7AE] shadow-xs">
                <CalendarDays size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--muted,#6b7280)]">Event Schedule</p>
                <p className="text-sm font-bold text-[#1F3864]">25–28 February 2027</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#15A7AE] shadow-xs">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-[var(--muted,#6b7280)]">Venue</p>
                <p className="text-sm font-bold text-[#1F3864]">Janata Maidan, Bhubaneswar</p>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {/* Card 1: Value Chain */}
            <article className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl sm:p-10">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[#15A7AE] shadow-xs transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
                  <Workflow size={24} />
                </div>

                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864]">
                  Explore the value chain
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                  Discover packaging machinery, printing presses, plastics processing equipment, paper conversions, and sustainable green energy solutions under one unified roof.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
                <TextLink href="/exhibitors">
                  Explore exhibitor profiles
                </TextLink>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--muted,#6b7280)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#EB622F]"
                />
              </div>
            </article>

            {/* Card 2: Business Opportunities */}
            <article className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl sm:p-10">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[#15A7AE] shadow-xs transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
                  <Users2 size={24} />
                </div>

                <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864]">
                  Connect with decision-makers
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                  Engage directly with manufacturers, technology suppliers, processors, converters, and trade buyers from Odisha, Eastern India, and beyond.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-6">
                <TextLink href="/visitors">
                  Discover the visitor experience
                </TextLink>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--muted,#6b7280)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#EB622F]"
                />
              </div>
            </article>
          </div>
        </div>
      </RevealSection>
    </>
  );
}