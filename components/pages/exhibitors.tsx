/* =========================================================================
   EXHIBITORS CONTENT COMPONENT (ULTRA PREMIUM REVAMP)
   ========================================================================= */
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export function ExhibitorsContent() {
  const exhibitPillarsLeft = [
    {
      title: "MEET THE RIGHT BUYERS",
      desc: "Connect with serious industry professionals and decision makers."
    },
    {
      title: "NETWORK & COLLABORATE",
      desc: "Build valuable relationships with partners, suppliers and industry peers."
    },
    {
      title: "BUILD BRAND AWARENESS",
      desc: "Enhance your brand visibility and strengthen your market presence."
    }
  ];

  const exhibitPillarsRight = [
    {
      title: "GROW YOUR BUSINESS",
      desc: "Generate new leads and increase sales opportunities."
    },
    {
      title: "LAUNCH NEW PRODUCTS",
      desc: "Showcase your latest innovations to a targeted audience."
    },
    {
      title: "GAIN MARKET INSIGHTS",
      desc: "Understand industry trends, customer needs and competitor activities."
    }
  ];

  const participationPerks = [
    "Reach a market that is being built right now. Odisha's packaging demand is being created by new food processing, pharmaceutical, petrochemical and e-commerce capacity — not competed for in a saturated market.",
    "Meet decision-makers, not browsers. A curated, invitation-backed trade visitor programme drawing from OASME's membership and the State's DIC network.",
    "Position your brand at the State's premier packaging platform. Four days of concentrated visibility before Odisha's entire packaging and processing value chain.",
    "Launch and demonstrate. Live machinery demonstrations remain the single most effective way to sell capital equipment.",
    "Access policy and finance in one place. State departments, banks, SIDBI, certification bodies and skill institutions under the same roof as your customers.",
    "Build the Eastern India channel. Meet distributors and dealers covering Odisha, West Bengal, Jharkhand, Chhattisgarh, Andhra Pradesh and the North-East."
  ];

  const enablingServices = [
    "Quality control and testing laboratories",
    "Food safety and hygiene technology",
    "Environmental Technology",
    "Effluent and waste-water management",
    "Recycling Technology",
    "Storage and Warehousing equipment",
    "Logistics and Material Handling",
    "Facility Equipment",
    "Contract Manufacturing and Packaging services",
    "Skill and Training Institutions",
    "Trade Press and Industry Media",
    "Banks, NBFCs and Financial Institutions"
  ];

  return (
    <>
     {/* =========================================================
    1. WHY YOU SHOULD EXHIBIT
========================================================= */}
<RevealSection
  className="overflow-hidden border-b border-[var(--border)] bg-[#f8fafc] py-20 lg:py-28"
>
  <div className="container mx-auto px-4 sm:px-6">

    {/* Section Heading */}
    <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
      <Eyebrow>Why You Should Exhibit</Eyebrow>

      <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
        WHY YOU <span className="text-[#EB622F]">SHOULD EXHIBIT</span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
        Connect with buyers, build partnerships, showcase innovation and
        create meaningful business opportunities across the packaging value
        chain.
      </p>
    </div>

    {/* =====================================================
        CENTRAL VISUAL + CONNECTING POINTS
    ===================================================== */}
    <div className="relative mx-auto max-w-7xl">

      {/* Desktop connector lines */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden="true"
      >
        {/* Left upper */}
        <div className="absolute left-[30%] top-[17%] h-px w-[10%] bg-[#15A7AE]/50" />
        <div className="absolute left-[30%] top-[17%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#15A7AE] bg-white" />

        {/* Left middle */}
        <div className="absolute left-[30%] top-[50%] h-px w-[10%] bg-[#EB622F]/50" />
        <div className="absolute left-[30%] top-[50%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#EB622F] bg-white" />

        {/* Left bottom */}
        <div className="absolute left-[30%] top-[83%] h-px w-[10%] bg-[#15A7AE]/50" />
        <div className="absolute left-[30%] top-[83%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#15A7AE] bg-white" />

        {/* Right upper */}
        <div className="absolute right-[30%] top-[17%] h-px w-[10%] bg-[#EB622F]/50" />
        <div className="absolute right-[30%] top-[17%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#EB622F] bg-white" />

        {/* Right middle */}
        <div className="absolute right-[30%] top-[50%] h-px w-[10%] bg-[#15A7AE]/50" />
        <div className="absolute right-[30%] top-[50%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#15A7AE] bg-white" />

        {/* Right bottom */}
        <div className="absolute right-[30%] top-[83%] h-px w-[10%] bg-[#EB622F]/50" />
        <div className="absolute right-[30%] top-[83%] h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-[#EB622F] bg-white" />
      </div>

      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-0">

        {/* =================================================
            LEFT POINTS
        ================================================= */}
        <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-4 lg:pr-8">
          {exhibitPillarsLeft.map((item, index) => (
            <div
              key={item.title}
              className="group relative py-5 text-left lg:text-right"
            >
              {/* Mobile accent */}
              <div className="mb-3 flex items-center gap-2 lg:hidden">
                <span
                  className={`h-2 w-2 rounded-full ${
                    index % 2 === 0
                      ? "bg-[#15A7AE]"
                      : "bg-[#EB622F]"
                  }`}
                />
                <span className="h-px flex-1 bg-[#dfe5e8]" />
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.06em] text-[#1F3864] transition-colors duration-300 group-hover:text-[#EB622F] sm:text-base">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                {item.desc}
              </p>

              {/* Desktop connector endpoint */}
              <span
                className={`absolute -right-[9px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white lg:block ${
                  index % 2 === 0
                    ? "bg-[#15A7AE] shadow-[0_0_0_3px_rgba(21,167,174,0.12)]"
                    : "bg-[#EB622F] shadow-[0_0_0_3px_rgba(235,98,47,0.12)]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* =================================================
            CENTER IMAGE
        ================================================= */}
        <div className="order-1 relative flex min-h-[420px] items-center justify-center lg:order-2 lg:col-span-4 lg:min-h-[720px]">

          {/* Subtle circular background */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15A7AE]/[0.035] sm:h-[430px] sm:w-[430px] lg:h-[620px] lg:w-[620px]" />

          {/* Image */}
          <div className="relative z-10 h-[430px] w-[430px] transition-transform duration-500 hover:scale-[1.025] sm:h-[520px] sm:w-[520px] lg:h-[680px] lg:w-[680px] xl:h-[740px] xl:w-[740px]">
            <Image
              src="/sections/exhibit-bg.png"
              alt="Why You Should Exhibit - Showcase, Connect, Grow"
              fill
              sizes="(max-width: 640px) 430px, (max-width: 1024px) 520px, 740px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* =================================================
            RIGHT POINTS
        ================================================= */}
        <div className="order-3 flex flex-col justify-center lg:col-span-4 lg:pl-8">
          {exhibitPillarsRight.map((item, index) => (
            <div
              key={item.title}
              className="group relative py-5 text-left"
            >
              {/* Mobile accent */}
              <div className="mb-3 flex items-center gap-2 lg:hidden">
                <span className="h-px flex-1 bg-[#dfe5e8]" />

                <span
                  className={`h-2 w-2 rounded-full ${
                    index % 2 === 0
                      ? "bg-[#EB622F]"
                      : "bg-[#15A7AE]"
                  }`}
                />
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.06em] text-[#1F3864] transition-colors duration-300 group-hover:text-[#15A7AE] sm:text-base">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                {item.desc}
              </p>

              {/* Desktop connector endpoint */}
              <span
                className={`absolute -left-[9px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white lg:block ${
                  index % 2 === 0
                    ? "bg-[#EB622F] shadow-[0_0_0_3px_rgba(235,98,47,0.12)]"
                    : "bg-[#15A7AE] shadow-[0_0_0_3px_rgba(21,167,174,0.12)]"
                }`}
              />
            </div>
          ))}
        </div>

      </div>
    </div>

    {/* =====================================================
        DETAILED PARAGRAPH PERKS
    ===================================================== */}
    <div className="mx-auto mt-20 max-w-4xl space-y-5 rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-12">

      {participationPerks.map((perk, index) => (
        <div
          key={perk}
          className="flex items-start gap-4 border-b border-[#eef1f2] pb-5 last:border-b-0 last:pb-0"
        >
          <span
            className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              index % 2 === 0
                ? "bg-[#15A7AE]/10"
                : "bg-[#EB622F]/10"
            }`}
          >
            <CheckCircle2
              size={16}
              className={
                index % 2 === 0
                  ? "text-[#15A7AE]"
                  : "text-[#EB622F]"
              }
            />
          </span>

          <span className="text-sm leading-7 text-[#1F3864] sm:text-base">
            {perk}
          </span>
        </div>
      ))}
    </div>

    {/* CTA */}
    <div className="mt-14 flex flex-wrap justify-center gap-4">
      <Button href="/exhibitor-registration">
        Enquire about a stall
      </Button>

      <Button secondary href="/exhibitor-profile">
        <FileText size={16} className="mr-1.5" />
        View full exhibitor profile
      </Button>
    </div>

  </div>
</RevealSection>

      {/* 2. ENABLING SERVICES AND INFRASTRUCTURE */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Eyebrow>Support Infrastructure</Eyebrow>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl">
              Enabling Services and Infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {enablingServices.map((service) => (
              <div key={service} className="flex items-start gap-3.5 bg-[#f8faf9] p-5 rounded-2xl border border-[var(--border)] shadow-sm hover:border-[#15A7AE] transition-all">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#EB622F]" />
                <span className="text-sm font-semibold text-[#1F3864]">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 3. ALREADY EXHIBITING: Support Callout Banner */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 rounded-3xl border border-[var(--border)] bg-white p-8 sm:p-14 shadow-lg shadow-slate-100 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Eyebrow>Already Exhibiting?</Eyebrow>
              </div>

              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
                Get ready for the exhibition floor.
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                Connect with the OASME team for stall booking, sponsorship opportunities, and exhibitor coordination.
              </p>
            </div>

            <div className="shrink-0">
              <Button href="/exhibitor-registration">Book your stall</Button>
            </div>
          </div>
        </div>
      </RevealSection>
    </>
  );
}