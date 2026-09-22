import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  FileText,
  BadgeCheck,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { exhibitorProfiles } from "@/lib/content";
import { Profiles } from "./profiles";
import { RevealSection } from "@/components/shared/motion";

export function ExhibitorsContent() {
  const participationPerks = [
    "Reach a market that is being built right now with new food processing, pharmaceutical, petrochemical, and e-commerce capacity",
    "Meet decision-makers through a curated, invitation-backed trade visitor programme drawing from OASME's membership and DIC network",
    "Position your brand at the State's premier packaging platform with 4 days of concentrated visibility",
    "Launch and demonstrate live machinery directly to qualified capital equipment buyers",
    "Access state departments, banks, SIDBI, certification bodies, and skill institutions under one roof",
    "Build your Eastern India channel across Odisha, West Bengal, Jharkhand, Chhattisgarh, Andhra Pradesh, and the North-East",
  ];

  return (
    <>
      {/* 1. WHY YOU SHOULD EXHIBIT */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-7">
            <div className="flex items-center gap-2">
              <Eyebrow>Why You Should Exhibit</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Showcase. Connect. Grow. <br />
              <span className="text-[#EB622F]">
                Powering Odisha&apos;s packaging & processing value chain.
              </span>
            </h1>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              <p>
                Reach a market that is being built right now. Odisha&apos;s
                packaging demand is being created by new food processing,
                pharmaceutical, petrochemical and e-commerce capacity — not
                competed for in a saturated market.
              </p>
              <p>
                PROPACK Odisha provides four days of concentrated visibility
                before Odisha&apos;s entire packaging and processing value chain
                at Janata Maidan, Bhubaneswar.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">
                Enquire about a stall
              </Button>
              <Button secondary href="/brochure">
                <FileText size={16} className="mr-1.5" />
                Explore brochure
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-[var(--border)] bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md sm:p-9">
              <div className="flex items-center gap-2">
                <BadgeCheck size={18} className="text-[#15A7AE]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1F3864]">
                  Key Highlights
                </span>
              </div>

              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[#1F3864] sm:text-2xl">
                Why exhibit at PROPACK
              </h3>

              <div className="mt-6 space-y-3.5 border-t border-[var(--border)] pt-6">
                {participationPerks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#15A7AE]"
                    />
                    <span className="text-sm font-medium leading-snug text-[#1F3864]">
                      {perk}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 2. WHO SHOULD EXHIBIT */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 border-b border-[var(--border)] pb-8 md:flex-row md:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Eyebrow>Who Should Exhibit</Eyebrow>
              </div>

              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
                Categories & Solution Providers
              </h2>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Packaging machinery, materials and equipment",
              "Corrugated box making machinery and corrugation plant",
              "Paper, board, film, foil, inks and consumables",
              "Flexo, gravure, offset, digital and screen printing presses",
              "Label printing and converting equipment",
              "Coding, marking, labelling and traceability solutions",
              "Barcodes, RFID and serialisation",
              "Rigid and flexible packaging",
              "Injection moulding, blow moulding, extrusion and thermoforming machinery",
              "Polymers, resins, masterbatches, compounds and additives",
              "Moulds, dies, tooling and mould-making services",
              "Plastics recycling, reprocessing and granulating plant",
              "Woven sacks, FIBC and bulk packaging solutions",
              "Food processing and production equipment",
              "End-of-line packaging, palletising and automation",
              "Supply chain, logistics, warehousing and material handling",
              "Testing, laboratory and quality-control equipment",
              "Recycling, waste management and sustainable material technologies",
              "Industrial automation, robotics and Industry 4.0 solutions",
              "Energy-efficiency, solar and utility solutions for packaging plants",
              "Financial institutions, certification bodies, consultancies and industry associations",
            ].map((item, i) => (
              <article
                id={`exhibit-item-${i}`}
                key={item}
                className="group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-lg sm:p-8"
              >
                <div>
                  

                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-[#1F3864] transition-colors group-hover:text-[#EB622F]">
                    {item}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* 3. EXHIBITOR PROFILE */}
      <Profiles title="Exhibitor Profile (Indicative & Not Restrictive)" items={exhibitorProfiles} />

      {/* 4. ALREADY EXHIBITING: Support Callout Banner */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-12 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2">
                <Eyebrow>Already Exhibiting?</Eyebrow>
              </div>

              <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
                Get ready for the exhibition floor.
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                Connect with the OASME team for stall booking, sponsorship
                opportunities, and exhibitor coordination.
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