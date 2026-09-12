"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  Compass,
  MapPin,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Ticket,
  Map,
} from "lucide-react";
import { VisitorQuestions } from "@/components/pages/visitor-questions";
import { Button, TextLink, Eyebrow } from "@/components/shared/ui";
import { visitorProfiles } from "@/lib/content";
import { Profiles } from "./profiles";
import { RevealSection } from "@/components/shared/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

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
      desc: "Connect directly with 300+ suppliers and compare commercial rates at Janata Maidan, 25–28 February 2027.",
    },
  ];

  return (
    <>
      {/* 1. WHY VISIT: Value Proposition Split */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          
          {/* Left: Main Copy & Actions */}
          <motion.div
            className="flex flex-col justify-center lg:col-span-7"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="flex items-center gap-2">
             
              <Eyebrow>Why Visit</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              See it. Compare it. <br />
              <span className="text-[var(--primary)]">Talk to the industry experts.</span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                Engage directly with global manufacturers and exhibitors showcasing live
                production machinery. Evaluate competing technical solutions and explore
                practical, cost-effective modernization ideas for your business.
              </p>
              <p>
                Connect with suppliers, enterprise buyers, and trade partners across packaging,
                printing, polymers, and food processing. Exchange insights with business leaders
                and stay ahead of fast-evolving industrial standards.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/visitor-registration">Register your visit</Button>
              <Link
                href="/view-pass"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-white px-4 py-2.5 text-xs font-semibold text-[var(--foreground,#111827)] shadow-2xs transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 hover:text-[var(--primary)]"
              >
                <Ticket size={15} />
                <span>View registered pass</span>
              </Link>
            </div>
          </motion.div>

          {/* Right: Step-by-Step Preparation Checklist Card */}
          <motion.div
            className="lg:col-span-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            <div className="rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md sm:p-8">
              <div className="flex items-center gap-2">
                <Compass size={18} className="text-[var(--primary)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground,#111827)]">
                  Visitor Roadmap
                </span>
              </div>

              <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                Make the most of your visit
              </h3>

              <p className="mt-1 text-xs text-[var(--muted,#6b7280)]">
                Three quick milestones to maximize your sourcing efficiency on the exhibition floor:
              </p>

              <div className="mt-6 space-y-4 border-t border-[var(--border)] pt-5">
                {visitSteps.map((step) => (
                  <div
                    key={step.num}
                    className="group flex items-start gap-3.5 rounded-xl border border-transparent p-2 transition-colors hover:border-[var(--border)] hover:bg-[#f7f8f7]"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 font-mono text-xs font-bold text-[var(--primary)] transition-colors group-hover:bg-[var(--primary)] group-hover:text-white">
                      {step.num}
                    </span>

                    <div>
                      <strong className="block text-xs font-bold text-[var(--foreground,#111827)] sm:text-sm">
                        {step.title}
                      </strong>
                      <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-4">
                <TextLink href="/view-pass">Already registered? View your pass</TextLink>
              </div>
            </div>
          </motion.div>

        </div>
      </RevealSection>

      {/* 2. WHO YOU'LL CONNECT WITH (Profiles directory) */}
      <Profiles title="Who you’ll connect with" items={visitorProfiles} />

      {/* 3. PLAN YOUR VISIT: Venue Logistics & Maps */}
      <RevealSection id="plan-your-visit" className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14">
          
          {/* Left: Venue & Dates Logistics */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2">
            
              <Eyebrow>Your Destination</Eyebrow>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl">
              Meet us in Bhubaneswar
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {/* Location Badge */}
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4">
                <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <div>
                  <strong className="block text-sm font-bold text-[var(--foreground,#111827)]">
                    Janata Maidan
                  </strong>
                  <span className="text-xs text-[var(--muted,#6b7280)]">
                    Bhubaneswar, Odisha, India
                  </span>
                </div>
              </div>

              {/* Dates Badge */}
              <div className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4">
                <Calendar size={20} className="mt-0.5 shrink-0 text-[var(--primary)]" />
                <div>
                  <strong className="block text-sm font-bold text-[var(--foreground,#111827)]">
                    25–28 February 2027
                  </strong>
                  <span className="text-xs text-[var(--muted,#6b7280)]">
                    Four Full Days · 10:00 AM – 6:00 PM
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)]">
              Contact the organizing committee for delegation registration, parking allocations,
              official hotel accommodations, and on-site accessibility assistance prior to your journey.
            </p>
          </div>

          {/* Right: Google Maps Navigation Action Box */}
          <div className="lg:col-span-5">
            <div className="flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-6 shadow-xs transition-all hover:border-[var(--primary)]/50 sm:p-8">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white border border-[var(--border)] text-[var(--primary)] shadow-2xs">
                  <Map size={22} />
                </div>

                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)]">
                  Plan your journey route
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                  Conveniently situated in the institutional heart of Bhubaneswar, accessible within 20 minutes from Biju Patnaik International Airport (BBI) and railway hub.
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Janata+Maidan+Bhubaneswar+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex w-full items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold !text-white shadow-sm transition-all duration-200 hover:bg-slate-800"
                >
                  <span className="!text-white font-medium">Open venue directions in Google Maps</span>
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