"use client";

import Link from "next/link";
import {
  Building2,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users2,
  Briefcase,
  Layers,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection, RevealDiv } from "@/components/shared/motion";

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

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl">
              Odisha Assembly of Small and Medium Enterprises
            </h1>

          

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)]">
              <p>
                The <strong>Odisha Assembly of Small and Medium Enterprises (OASME)</strong> is an apex association of industries recognized by the Government of Odisha. For over 4 decades, OASME has been championing the growth of Micro, Small, Medium, Handicraft, and Cottage sectors across all 30 districts of the state.
              </p>
              <p>
                Operating from its own headquarters at <em>Satya Bhawan, Industrial Estate, Cuttack</em>, OASME acts as the crucial bridge between enterprises and policy makers—providing free consultancy, industrial awareness, vendor development, and international trade delegation support.
              </p>
            </div>

            {/* Representation & Board Roles */}
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[var(--foreground,#111827)]">
                <Briefcase size={16} className="text-[var(--primary)]" />
                <span>OASME Represents On Key State & National Bodies</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {representations.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs sm:text-sm text-[var(--muted-foreground,#4b5563)]">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[var(--primary)]" />
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
                    className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--foreground,#111827)]"
                  >
                    <Layers size={12} className="text-[var(--primary)]" />
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:underline"
              >
                <span>Visit OASME official portal</span>
                <ExternalLink size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Secretariat Card */}
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-2">
             
                <Eyebrow>OASME</Eyebrow>
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)]">
                Direct Contact & Support
              </h3>
              
              <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)]">
                Connect directly with The Organizing Team for booth bookings, delegate passes, sponsorship, or institutional queries.
              </p>

              {/* Head Office Address */}
              <div className="mt-6 rounded-xl bg-[#f7f8f7] p-4 text-xs leading-relaxed text-[var(--foreground,#111827)] border border-[var(--border)]">
                <strong className="block text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                  Head Office Address:
                </strong>
                <span className="mt-1 block font-medium">
                  &ldquo;SATYA BHAWAN&rdquo;, Industrial Estate, Cuttack - 753010, Odisha, India
                </span>
              </div>

              {/* Quick Contact Links */}
              <div className="mt-6 space-y-3 border-t border-[var(--border)] pt-6">
                <a
                  href="tel:+917008341944"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">Helpline 1</span>
                    <strong className="text-sm font-semibold text-[var(--foreground,#111827)]">
                     +91 77518 09433 
                    </strong>
                  </div>
                </a>

                <a
                  href="tel:+917751809433"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Phone size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">Helpline 2</span>
                    <strong className="text-sm font-semibold text-[var(--foreground,#111827)]">
                      +91 70083 41944
                    </strong>
                  </div>
                </a>

                <a
                  href="mailto:info@oasme.org.in"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">Official Inquiries</span>
                    <strong className="text-sm font-semibold text-[var(--foreground,#111827)]">
                      info@oasme.org.in
                    </strong>
                  </div>
                </a>

                <a
                  href="mailto:oasme.ctc@gmail.com"
                  className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </span>
                  <div>
                    <span className="block text-[11px] text-[var(--muted,#6b7280)]">Contact Team</span>
                    <strong className="text-sm font-semibold text-[var(--foreground,#111827)]">
                      oasme.ctc@gmail.com
                    </strong>
                  </div>
                </a>
              </div>

              {/* Verified Trust Footer in Card */}
              <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--border)] pt-4 text-center text-xs text-[var(--muted,#6b7280)]">
                <Users2 size={14} className="text-[var(--primary)]" />
                <span>Serving 30+ District Industrial Chapters</span>
              </div>
            </div>
          </aside>

        </div>

      </div>
    </RevealSection>
  );
}