/* =========================================================================
   VISITOR PROFILE PAGE (app/visitor-profile/page.tsx)
   ========================================================================= */
import { RevealSection } from "@/components/shared/motion";
import { Eyebrow } from "@/components/shared/ui";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Visitor Profile | PROPACK Odisha 2027",
  description: "Indicative and not restrictive visitor categories for PROPACK Odisha 2027 at Janata Maidan, Bhubaneswar.",
};

export default function VisitorProfilePage() {
  const visitorProfiles = [
    "Packaging materials manufacturers",
    "Plastic processors and moulders",
    "Woven sack and FIBC manufacturers",
    "Plastics recyclers and reprocessors",
    "Corrugated box manufacturers",
    "Printers and converters",
    "Food processing units",
    "Agro industries",
    "Dairy product manufacturers",
    "Fish, seafood and meat processors",
    "Frozen, preserved and dehydrated food manufacturers",
    "Snack and confectionery manufacturers",
    "Beverage, brewing, canning and bottling units",
    "Pharmaceutical producers",
    "Cosmetics and personal care manufacturers",
    "Chemical product manufacturers",
    "FMCG and consumer goods manufacturers",
    "Electronics manufacturers",
    "Industrial product manufacturers",
    "Contract packagers and retail packagers",
    "E-commerce and quickcommerce fulfilment operators",
    "Food exporters, retailers, distributors and wholesalers",
    "Machinery importers, dealers and distributors",
    "Cold chain and refrigeration operators",
    "Water treatment and environmental engineers",
    "Consultants, food scientists and technologists",
    "Government departments, PSUs, academia and R&D institutions",
  ];

  return (
    <main className="min-h-screen bg-white">
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <Link 
              href="/visitors" 
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15A7AE] hover:underline"
            >
              <ArrowLeft size={15} />
              <span>Back to Visitors Overview</span>
            </Link>
          </div>

          <div className="max-w-3xl">
            <Eyebrow>Visitor Profile</Eyebrow>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
              Indicative and not restrictive.
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              PROPACK Odisha 2027 welcomes trade visitors, enterprise buyers, manufacturers, and industry professionals across a diverse spectrum of sectors.
            </p>
          </div>

          <div className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-10">
            <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1F3864] sm:text-2xl border-b border-[var(--border)] pb-4">
              Invited Industry Categories &amp; Sectors
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visitorProfiles.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4 transition-all hover:border-[#EB622F] hover:bg-white hover:shadow-xs">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#15A7AE]" />
                  <span className="text-sm font-semibold leading-snug text-[#1F3864]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>
    </main>
  );
}