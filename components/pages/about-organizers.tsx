"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  ExternalLink,
  Layers3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

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

const contactDetails = [
  {
    label: "Mr. Ratiranjan Samal",
    text: "+91 70083 41944",
    href: "tel:+917008341944",
    icon: Phone,
  },
  {
    label: "Ms. Mamta",
    text: "+91 77518 09433",
    href: "tel:+917751809433",
    icon: Phone,
  },
  {
    label: "Official Email",
    text: "oasme.odisha@gmail.com",
    href: "mailto:oasme.odisha@gmail.com",
    icon: Mail,
  },
  {
    label: "Event Support",
    text: "info@propackodisha.com",
    href: "mailto:info@propackodisha.com",
    icon: Mail,
  },
];

export function OrganizersContent() {
  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <header className="max-w-3xl">
              <Eyebrow>Apex Industrial Body</Eyebrow>
              <h1 className="mt-4 max-w-[19ch] font-[family-name:var(--font-heading)] text-3xl font-extrabold leading-[1.12] tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
                Odisha Assembly of Small and Medium Enterprises
              </h1>
              <div className="mt-5 h-1 w-14 rounded-full bg-[#EB622F]" aria-hidden="true" />
            </header>

            <div className="mt-8 max-w-[76ch] space-y-5 text-base leading-8 text-[var(--muted-foreground,#4b5563)]">
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

            <section aria-labelledby="representation-heading" className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-[var(--border)] px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EB622F]/10 text-[#EB622F]" aria-hidden="true">
                  <BriefcaseBusiness size={20} />
                </span>
                <h2 id="representation-heading" className="font-[family-name:var(--font-heading)] text-base font-bold leading-snug text-[#1F3864] sm:text-lg">
                  OASME Represents On Key State &amp; National Bodies
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-x-7 gap-y-4 p-5 sm:grid-cols-2 sm:p-7">
                {representations.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-[var(--muted-foreground,#4b5563)]">
                    <CheckCircle2 size={17} className="mt-1 shrink-0 text-[#15A7AE]" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="sector-focus-heading" className="mt-9">
              <div className="mb-4 flex items-center gap-2">
                <Layers3 size={19} className="text-[#15A7AE]" aria-hidden="true" />
                <h2 id="sector-focus-heading" className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#1F3864]">
                  Key Sector Focus
                </h2>
              </div>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {keyCommittees.map((item) => (
                  <li key={item} className="flex min-h-12 items-center rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm font-medium leading-5 text-[#1F3864]">
                    <span className="mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EB622F]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button href="/contact-us">Contact exhibition team</Button>
              <Link
                href="https://www.oasme.org.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#EB622F] underline-offset-4 transition-colors hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB622F]"
              >
                Visit OASME official portal
                <ExternalLink size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <aside className="min-w-0 lg:col-span-5" aria-labelledby="contact-heading">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_16px_50px_-35px_rgba(31,56,100,0.45)] lg:sticky lg:top-28">
              <div className="border-b border-[var(--border)] px-6 py-7 sm:px-8">
                <Eyebrow>OASME</Eyebrow>
                <h2 id="contact-heading" className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold leading-tight tracking-tight text-[#1F3864]">
                  Direct Contact &amp; Support
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground,#4b5563)]">
                  For stall booking &amp; sponsorship, please contact the organizing team directly.
                </p>
              </div>

              <div className="px-6 py-6 sm:px-8">
                <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4">
                  <MapPin size={19} className="mt-0.5 shrink-0 text-[#15A7AE]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#EB622F]">Organised By</p>
                    <address className="mt-1 text-sm font-medium not-italic leading-6 text-[#1F3864]">
                      Odisha Assembly of Small and Medium Enterprises (OASME), Satya Bhawan, Cuttack
                    </address>
                  </div>
                </div>

                <ul className="mt-5 divide-y divide-[var(--border)]">
                  {contactDetails.map(({ label, text, href, icon: Icon }) => (
                    <li key={href}>
                      <a
                        href={href}
                        className="group flex min-w-0 items-center gap-3 rounded-lg py-4 transition-colors hover:bg-[#f7f8f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#15A7AE]/10 text-[#15A7AE] transition-colors group-hover:bg-[#EB622F] group-hover:text-white" aria-hidden="true">
                          <Icon size={17} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-xs text-[var(--muted,#6b7280)]">{label}</span>
                          <span className="mt-0.5 block break-words text-sm font-semibold text-[#1F3864]">{text}</span>
                        </span>
                        <ArrowUpRight size={15} className="ml-auto shrink-0 text-[#1F3864]/40 transition-colors group-hover:text-[#EB622F]" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-[var(--border)] pt-5 text-center text-xs text-[var(--muted,#6b7280)]">
                  Serving 30+ District Industrial Chapters
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </RevealSection>
  );
}
