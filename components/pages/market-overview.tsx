"use client";

import { motion, type Variants } from "framer-motion";
import {
  TrendingUp,
  Landmark,
  Layers,
  MapPin,
  AlertCircle,
  ChevronDown,
  Info,
  ArrowRight,
} from "lucide-react";
import { Button, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MarketContent() {
  const investmentRegions = [
    {
      title: "National Investment and Manufacturing Zone (NIMZ)",
      location: "Kalinganagar",
      desc: "Heavy industrial hub with high demand for bulk handling and secondary packaging.",
    },
    {
      title: "Petroleum, Chemicals & Petrochemicals Investment Region (PCPIR)",
      location: "Paradeep",
      desc: "Major coastal zone ensuring feedstock access for plastics and polymer converters.",
    },
    {
      title: "Port-Based Manufacturing Zone",
      location: "Dhamra",
      desc: "Strategic logistical gateway for coastal trade, shipping materials, and export goods.",
    },
    {
      title: "Food & Beverage Clusters & Plastic Parks",
      location: "Across Odisha",
      desc: "Dedicated state infrastructure fostering downstream plastic processing and agro-packaging.",
    },
  ];

  return (
    <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-4xl">
          
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
             
              <Eyebrow>The Industry Context</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[var(--foreground,#111827)] sm:text-4xl lg:text-5xl">
              A Connected Value Chain
            </h1>

            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              The original exhibition material connects packaging demand with
              food, beverages, pharmaceuticals, FMCG, electronics, hosiery, and
              arts and artifacts. Propack Odisha brings the suppliers and
              businesses serving these markets into one conversation.
            </p>
          </motion.div>

          {/* Section 2: Polymers & Plastics */}
          <motion.div
            className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-7 shadow-xs sm:p-9"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              <Layers size={16} />
              <span>Downstream Industrial Ecosystem</span>
            </div>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-3xl">
              Plastics, polymers and allied industries
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
              The source describes Odisha&apos;s Plastic, Polymer and Allied Cluster,
              raw material availability, automation, and opportunities for
              value-added manufacturing. Machinery, processing, and packaging
              businesses form an integral part of this expanding industrial ecosystem.
            </p>
          </motion.div>

          {/* Section 3: Investment Regions Grid */}
          <motion.div
            className="mt-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2">
            
              <Eyebrow>Strategic Corridors</Eyebrow>
            </div>

            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-3xl">
              Investment regions highlighted in the source
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {investmentRegions.map((region) => (
                <div
                  key={region.title}
                  className="flex flex-col justify-between rounded-xl border border-[var(--border)] bg-white p-5 shadow-2xs transition-all duration-200 hover:border-[var(--primary)] hover:shadow-xs"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)]">
                      <MapPin size={14} />
                      <span>{region.location}</span>
                    </div>
                    <h3 className="mt-2 font-[family-name:var(--font-heading)] text-base font-bold text-[var(--foreground,#111827)]">
                      {region.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)]">
                      {region.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Historical Figures Notice & Disclaimer */}
          <motion.div
            className="mt-12 space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--foreground,#111827)] sm:text-2xl">
                Reading the historical market figures
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
                The old website included forecasts and economic figures tied to
                earlier years. They are retained here strictly as historical source context
                and should not be interpreted as active 2027 market figures.
              </p>
            </div>

            {/* Warning Callout Card */}
            <div className="flex gap-4 rounded-xl border border-amber-300/80 bg-amber-50/80 p-5 text-amber-950">
              <AlertCircle size={22} className="mt-0.5 shrink-0 text-amber-600" />
              <div className="text-xs leading-relaxed sm:text-sm text-amber-900">
                <strong className="block font-semibold text-amber-950 mb-1">
                  Source Archive Notice:
                </strong>
                The export cited a 26.7% packaging CAGR forecast for 2021–2026;
                global plastics consumption of 627 million tonnes projected for
                2025; and Odisha GDP growth of 8.78% in 2014–15. It also included a
                2020 growth projection and a paper-packaging forecast for 2024.
                These periods have concluded and the archival export does not provide the
                underlying original research reports.
              </div>
            </div>

            {/* Custom Interactive Accordion */}
            <details className="group rounded-xl border border-[var(--border)] bg-white p-5 shadow-2xs transition-all [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-[family-name:var(--font-heading)] text-sm font-semibold text-[var(--foreground,#111827)] group-open:text-[var(--primary)]">
                <div className="flex items-center gap-2.5">
                  <Info size={16} className="text-[var(--primary)]" />
                  <span>Additional figures from the original archive export</span>
                </div>
                <ChevronDown
                  size={18}
                  className="text-[var(--muted,#6b7280)] transition-transform duration-300 group-open:rotate-180 group-open:text-[var(--primary)]"
                />
              </summary>

              <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                <p>
                  The source stated that Asia accounted for about 30% of global
                  plastics consumption, global consumption growth was 5%, Indian
                  plastics consumption growth exceeded 16%, and domestic PVC
                  production met 50% of demand. It cited approximately 50,000
                  plastics businesses, ₹3.5 lakh crore economic contribution, and
                  ₹35,000 crore exports.
                </p>
                <p>
                  It also cited a 17% share of live manufacturing projects worth ₹33
                  lakh crore (attributed to ASSOCHAM), a 12% Odisha GDP projection
                  for 2020 (attributed to Dun & Bradstreet), 5,000 tonnes of monthly
                  paper packaging with 7,000 tonnes projected for 2024, and
                  historical city rankings. These claims have not been verified as
                  current and are not used as active promotional statistics.
                </p>
              </div>
            </details>
          </motion.div>

          {/* Section 5: Direct Contact CTA */}
          <motion.div
            className="mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:p-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--foreground,#111827)] sm:text-xl">
                Looking for verified 2027 market participation?
              </h3>
              <p className="mt-1 text-xs text-[var(--muted-foreground,#4b5563)] sm:text-sm">
                Discuss your sector, machine profiles, and participation objectives directly with the exhibition team.
              </p>
            </div>

            <Button href="/contact-us">
              <span>Talk to the organizers</span>
              {/* <ArrowRight size={15} className="ml-1.5" /> */}
            </Button>
          </motion.div>

        </div>
      </div>
    </RevealSection>
  );
}