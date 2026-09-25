"use client";

import Link from "next/link";
import {
  Phone,
  Mail,
  ExternalLink,
  CheckCircle2,
  Users2,
  Briefcase,
  Layers,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export function OrganizersContent() {
  const representations = [
    "Board of Directors, IDCO & OSIC",
    "Micro & Small Enterprises Facilitation Council (MSEFC)",
    "Empowered Committee on MSME Finance, RBI",
    "Govt. of India MSME-DI Advisory Committee",
    "State Level Inter Institutional Committee (SLIIC)",
    "PLACs of NALCO, MCL, RSP, HAL, NTPC & IOCL",
  ];

  const keyCommittees = [
    "Packaging Industries",
    "Plastic & Polymer Industries",
    "Food Processing Industries",
    "Foundry & Engineering",
    "Electrical & Electronics",
    "International Trade Promotion Council",
  ];

  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Main Split Grid */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Organization Profile & Authority */}
          <div className="flex flex-col lg:col-span-7">
            <div className="flex items-center gap-2">
              <Eyebrow>Apex Industrial Body</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
              Odisha Assembly of Small and Medium Enterprises
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)]">
              <p>
                Founded on 12th August 1985, OASME has served for over four decades as a common forum for the cottage, handicraft, micro, small and medium enterprises of Odisha. The Assembly guides entrepreneurs, offers free consultancy, assists in the establishment of new industrial units and publishes profiles, journals and souvenirs that carry industry knowledge to the last mile.
              </p>
              <p>
                Today OASME works as a bridge between Odisha&apos;s MSME community and the State and Union Governments — taking industry concerns into policy forums and carrying the benefits of schemes such as PMEGP, PM Vishwakarma, CM-SRIM, the Odisha MSME Development Policy and the Odisha Exports Policy back to enterprises on the ground. PROPACK Odisha is OASME&apos;s flagship platform for the packaging, printing, plastics and processing value chain.
              </p>
              <p>
                PROPACK Odisha 2027 is organised and delivered by OASME. Three earlier editions have established it as the State&apos;s principal meeting ground for the packaging, printing, plastics, converting and processing value chain, drawing exhibitors and buyers from across India.
              </p>
            </div>

            {/* Representation & Board Roles */}
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1F3864]">
                <Briefcase size={16} className="text-[#EB622F]" />
                <span>OASME Represents On Key State & National Bodies</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {representations.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-2 text-xs sm:text-sm text-[var(--muted-foreground,#4b5563)]"
                  >
                    <CheckCircle2
                      size={15}
                      className="mt-0.5 shrink-0 text-[#15A7AE]"
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specialized Councils Pill Cloud */}
            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted,#6b7280)]">
                Key Sector Focus:
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {keyCommittees.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-medium text-[#1F3864]"
                  >
                    <Layers size={12} className="text-[#15A7AE]" />
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/contact-us">Contact exhibition team</Button>
              <Link
                href="https://www.oasme.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#EB622F] transition-colors hover:underline"
              >
                <span>Visit OASME official portal</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2">
                <Eyebrow>OASME</Eyebrow>
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864]">
                Direct Contact & Support
              </h3>

              <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)]">
                For stall booking & sponsorship, please contact the organizing
                team directly.
              </p>

              {/* Head Office Address */}
              <div className="mt-6 rounded-xl bg-[#f7f8f7] p-4 text-xs leading-relaxed text-[#1F3864] border border-[var(--border)]">
                <strong className="block text-xs font-bold uppercase tracking-wider text-[#EB622F]">
                  Organised By:
                </strong>
                <span className="mt-1 block font-medium">
                  Odisha Assembly of Small and Medium Enterprises (OASME), Satya
                  Bhawan, Cuttack
                </span>
              </div>

              {/* Quick Contact Links */}
              <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-6">
                <a
                  href="tel:+917008341944"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] group-hover:bg-[#EB622F] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">
                      Mr. Ratiranjan Samal
                    </span>
                    <strong className="text-sm font-semibold text-[#1F3864]">
                      +91 70083 41944
                    </strong>
                  </div>
                </a>

                <a
                  href="tel:+917751809433"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] group-hover:bg-[#EB622F] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">
                      Ms. Mamta
                    </span>
                    <strong className="text-sm font-semibold text-[#1F3864]">
                      +91 77518 09433
                    </strong>
                  </div>
                </a>

                <a
                  href="mailto:oasme.odisha@gmail.com"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] group-hover:bg-[#EB622F] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">
                      Official Email
                    </span>
                    <strong className="text-sm font-semibold text-[#1F3864]">
                      oasme.odisha@gmail.com
                    </strong>
                  </div>
                </a>

                <a
                  href="mailto:  oasme.odisha@gmail.com"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] group-hover:bg-[#EB622F] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">
                      Event Support
                    </span>
                    <strong className="text-sm font-semibold text-[#1F3864]">
                      oasme.odisha@gmail.com
                    </strong>
                  </div>
                </a>
              </div>

              {/* Verified Trust Footer in Card */}
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--muted,#6b7280)]">
                <Users2 size={14} className="text-[#15A7AE]" />
                <span>Serving 30+ District Industrial Chapters</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </RevealSection>
  );
}