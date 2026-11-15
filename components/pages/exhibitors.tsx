import Image from "next/image";
import { CheckCircle2, FileText } from "lucide-react";

import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const exhibitPillarsLeft = [
  {
    title: "MEET THE RIGHT BUYERS",
    desc: "Connect with serious industry professionals and decision makers.",
  },
  {
    title: "NETWORK & COLLABORATE",
    desc: "Build valuable relationships with partners, suppliers and industry peers.",
  },
  {
    title: "BUILD BRAND AWARENESS",
    desc: "Enhance your brand visibility and strengthen your market presence.",
  },
] as const;

const exhibitPillarsRight = [
  {
    title: "GROW YOUR BUSINESS",
    desc: "Generate new leads and increase sales opportunities.",
  },
  {
    title: "LAUNCH NEW PRODUCTS",
    desc: "Showcase your latest innovations to a targeted audience.",
  },
  {
    title: "GAIN MARKET INSIGHTS",
    desc: "Understand industry trends, customer needs and competitor activities.",
  },
] as const;

const participationPerks = [
  "Reach a market that is being built right now. Odisha's packaging demand is being created by new food processing, pharmaceutical, petrochemical and e-commerce capacity — not competed for in a saturated market.",
  "Meet decision-makers, not browsers. A curated, invitation-backed trade visitor programme drawing from OASME's membership and the State's DIC network.",
  "Position your brand at the State's premier packaging platform. Four days of concentrated visibility before Odisha's entire packaging and processing value chain.",
  "Launch and demonstrate. Live machinery demonstrations remain the single most effective way to sell capital equipment.",
  "Access policy and finance in one place. State departments, banks, SIDBI, certification bodies and skill institutions under the same roof as your customers.",
  "Build the Eastern India channel. Meet distributors and dealers covering Odisha, West Bengal, Jharkhand, Chhattisgarh, Andhra Pradesh and the North-East.",
] as const;

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
  "Banks, NBFCs and Financial Institutions",
] as const;

export function ExhibitorsContent() {
  return (
    <>
      <RevealSection className="overflow-hidden border-b border-[var(--border)] bg-[#f8fafc] py-16 lg:py-24">
        <section
          aria-labelledby="why-exhibit-heading"
          className="container mx-auto px-4 sm:px-6"
        >
          <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
            <Eyebrow>Why You Should Exhibit</Eyebrow>
            <h1
              id="why-exhibit-heading"
              className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.12]"
            >
              WHY YOU <span className="text-[#EB622F]">SHOULD EXHIBIT</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Discover new opportunities, connect with industry leaders, build
              meaningful partnerships, and explore innovative solutions across
              the Plastic, Printing, Packaging, Paper, Processing and Green
              Energy sectors.
            </p>
          </div>

          {/* Original three-column composition, with the illustration kept compact. */}
          <div className="relative mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-0">
              <ul className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-4 lg:pr-8">
                {exhibitPillarsLeft.map((item, index) => (
                  <li
                    key={item.title}
                    className="group relative py-5 text-left lg:text-right"
                  >
                    <div className="mb-3 flex items-center gap-2 lg:hidden" aria-hidden="true">
                      <span className={`h-2 w-2 rounded-full ${index % 2 === 0 ? "bg-[#15A7AE]" : "bg-[#EB622F]"}`} />
                      <span className="h-px flex-1 bg-[#dfe5e8]" />
                    </div>
                    <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.06em] text-[#1F3864] transition-colors duration-300 group-hover:text-[#EB622F] sm:text-base">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                      {item.desc}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`absolute -right-[9px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white lg:block ${index % 2 === 0 ? "bg-[#15A7AE] shadow-[0_0_0_3px_rgba(21,167,174,0.12)]" : "bg-[#EB622F] shadow-[0_0_0_3px_rgba(235,98,47,0.12)]"}`}
                    />
                  </li>
                ))}
              </ul>

              {/* Compact central artwork; no image enlargement or spill into copy columns. */}
              <div className="order-1 relative flex min-h-[290px] items-center justify-center sm:min-h-[360px] lg:order-2 lg:col-span-4 lg:min-h-[440px]">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#15A7AE]/[0.035] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]"
                />
                <div className="relative z-10 aspect-square w-[min(78vw,280px)] transition-transform duration-500 hover:scale-[1.025] sm:w-[330px] lg:w-full lg:max-w-[350px]">
                  <Image
                    src="/sections/exhibit-bg.png"
                    alt="PROPACK Odisha exhibitor benefits: connect with buyers, launch products and build business relationships"
                    fill
                    sizes="(max-width: 639px) 280px, (max-width: 1023px) 330px, 350px"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <ul className="order-3 flex flex-col justify-center lg:col-span-4 lg:pl-8">
                {exhibitPillarsRight.map((item, index) => (
                  <li key={item.title} className="group relative py-5 text-left">
                    <div className="mb-3 flex items-center gap-2 lg:hidden" aria-hidden="true">
                      <span className="h-px flex-1 bg-[#dfe5e8]" />
                      <span className={`h-2 w-2 rounded-full ${index % 2 === 0 ? "bg-[#EB622F]" : "bg-[#15A7AE]"}`} />
                    </div>
                    <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-[0.06em] text-[#1F3864] transition-colors duration-300 group-hover:text-[#15A7AE] sm:text-base">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-xs leading-6 text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                      {item.desc}
                    </p>
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[9px] top-1/2 hidden h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-white lg:block ${index % 2 === 0 ? "bg-[#EB622F] shadow-[0_0_0_3px_rgba(235,98,47,0.12)]" : "bg-[#15A7AE] shadow-[0_0_0_3px_rgba(21,167,174,0.12)]"}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-2xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-10 lg:mt-16">
            <ul className="grid grid-cols-1 gap-x-10 gap-y-0 md:grid-cols-2">
              {participationPerks.map((perk, index) => (
                <li
                  key={perk}
                  className="flex items-start gap-3 border-b border-[#eef1f2] py-5 last:border-b-0 md:[&:nth-last-child(-n+2)]:border-b-0"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    size={19}
                    className={`mt-1 shrink-0 ${index % 2 === 0 ? "text-[#15A7AE]" : "text-[#EB622F]"}`}
                  />
                  <p className="text-sm leading-7 text-[#1F3864] sm:text-base">
                    {perk}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4 sm:mt-12">
            <Button href="/exhibitor-registration">Enquire about a stall</Button>
            <Button secondary href="/exhibitor-profile">
              <FileText aria-hidden="true" size={16} className="mr-1.5" />
              View full exhibitor profile
            </Button>
          </div>
        </section>
      </RevealSection>

      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <section
          aria-labelledby="enabling-services-heading"
          className="container mx-auto px-4 sm:px-6"
        >
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Eyebrow>Support Infrastructure</Eyebrow>
            <h2
              id="enabling-services-heading"
              className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl"
            >
              Enabling Services and Infrastructure
            </h2>
          </div>
          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enablingServices.map((service) => (
              <li
                key={service}
                className="flex h-full items-start gap-3.5 rounded-xl border border-[var(--border)] bg-[#f8faf9] p-5 transition-colors duration-300 hover:border-[#15A7AE]"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-[#EB622F]"
                />
                <span className="text-sm font-semibold leading-6 text-[#1F3864]">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </RevealSection>

     
    </>
  );
}
