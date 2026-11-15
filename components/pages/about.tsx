"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Users2,
  Workflow,
} from "lucide-react";
import { Button, TextLink, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const highlights = [
  "Flagship platform of the Odisha Assembly of Small and Medium Enterprises (OASME)",
  "Bringing together packaging, printing, paper, plastics, processing & green energy",
  "4-day B2B trade exhibition, conference programme & structured buyer-seller meets",
] as const;

const opportunities = [
  {
    icon: Workflow,
    title: "Explore the value chain",
    description:
      "Discover packaging machinery, printing presses, plastics processing equipment, paper conversions, and sustainable green energy solutions under one unified roof.",
    href: "/exhibitors",
    linkLabel: "Explore exhibitor profiles",
  },
  {
    icon: Users2,
    title: "Connect with decision-makers",
    description:
      "Engage directly with manufacturers, technology suppliers, processors, converters, and trade buyers from Odisha, Eastern India, and beyond.",
    href: "/visitors",
    linkLabel: "Discover the visitor experience",
  },
] as const;

export function AboutContent() {
  return (
    <>
      <RevealSection className="relative isolate overflow-hidden border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -right-28 -top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[#EB622F]/[0.07] blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-44 left-0 -z-10 h-[360px] w-[360px] rounded-full bg-[#15A7AE]/[0.07] blur-3xl"
          aria-hidden="true"
        />

        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <Eyebrow>About PROPACK Odisha 2027</Eyebrow>

            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.13] tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              <span className="sr-only">
                PROPACK Odisha International Expo 2027 —{" "}
              </span>
              Where Industry, Innovation <br className="hidden sm:block" />
              <span className="text-[#EB622F]">
                &amp; Business Come Together.
              </span>
            </h1>

            <div className="mt-6 max-w-[65ch] space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
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
                  Bhubaneswar, Odisha
                </strong>
                , bringing together machinery manufacturers, technology providers,
                material suppliers, processors, converters, buyers and decision-makers
                from Odisha, Eastern India and beyond.
              </p>
            </div>

            <ul className="mt-7 space-y-3 border-t border-[var(--border)] pt-6">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm font-medium leading-relaxed text-[#1F3864]"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    size={18}
                    className="mt-0.5 shrink-0 text-[#15A7AE]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">Become an exhibitor</Button>
              <Button secondary href="/visitor-registration">
                Register as visitor
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[540px] lg:col-span-5">
            <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-3 shadow-[0_30px_80px_-45px_rgba(31,56,100,0.4)] sm:p-4">
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-[#f7f8f7]">
                <Image
                  src="/assets/collage.webp"
                  alt="PROPACK Odisha exhibition industries: packaging lines, printing machinery and industrial technology"
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 56px), (max-width: 1024px) 540px, 42vw"
                  className="object-contain p-3 transition-transform duration-500 hover:scale-105 sm:p-5"
                />
              </div>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-24 w-24 rounded-2xl bg-[#15A7AE]/15 sm:-bottom-6 sm:-left-6"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-2xl bg-[#EB622F]/15 sm:-right-6 sm:-top-6"
            />
          </div>
        </div>
      </RevealSection>

      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Eyebrow>Exhibition Experience</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
              Engineered for technology discovery &amp; networking.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              The exhibition combines a{" "}
              <strong className="font-semibold text-[#1F3864]">
                B2B trade exhibition, four-day conference programme
              </strong>{" "}
              and structured buyer–seller meets, creating opportunities for business
              development, technology discovery and industry networking.
            </p>
          </div>

          <dl className="mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#15A7AE] shadow-sm">
                <CalendarDays size={21} aria-hidden="true" />
              </div>
              <div>
                <dt className="text-xs font-medium text-[var(--muted,#6b7280)]">Event Schedule</dt>
                <dd className="mt-1 text-sm font-bold text-[#1F3864]">25–28 February 2027</dd>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-4 sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#15A7AE] shadow-sm">
                <MapPin size={21} aria-hidden="true" />
              </div>
              <div>
                <dt className="text-xs font-medium text-[var(--muted,#6b7280)]">Location</dt>
                <dd className="mt-1 text-sm font-bold text-[#1F3864]">Bhubaneswar, Odisha</dd>
              </div>
            </div>
          </dl>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
            {opportunities.map(({ icon: Icon, title, description, href, linkLabel }) => (
              <article
                key={title}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl sm:p-9"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[#15A7AE] shadow-sm transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                    {description}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
                  <TextLink href={href}>{linkLabel}</TextLink>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    className="shrink-0 text-[var(--muted,#6b7280)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#EB622F]"
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>
    </>
  );
}
