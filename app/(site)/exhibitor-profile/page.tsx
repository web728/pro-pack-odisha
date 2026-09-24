/* =========================================================================
   EXHIBITOR PROFILE PAGE (app/exhibitor-profile/page.tsx)
   ========================================================================= */
import { RevealSection } from "@/components/shared/motion";
import { Eyebrow } from "@/components/shared/ui"; // ya tumhare project ke hisab se import path
import { CheckCircle2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "exhibitor-profile",
  "Exhibitor Profile",
  "Indicative and not restrictive categories for PROPACK Odisha 2027 exhibitors."
);

export default function ExhibitorProfilePage() {
  const profileSections = [
    {
      category: "Packaging Materials and Formats",
      items: [
        "Paper and board packaging",
        "Corrugated cartons",
        "Flexible packaging",
        "PET and plastic packaging",
        "Metal packaging",
        "Glass packaging",
        "Beverage packaging",
        "Cosmetic packaging",
        "Pharmaceutical packaging",
        "Aseptic packaging",
        "Liquid packaging",
        "Self-adhesive tapes and materials",
        "Raw materials and consumables",
      ],
    },
    {
      category: "Plastics Processing, Polymers and Tooling",
      items: [
        "Injection moulding machines",
        "Blow moulding machines",
        "Extrusion lines and extruders",
        "Blown and cast film lines",
        "Thermoforming machines",
        "Woven sack and FIBC plant",
        "Pipe and profile extrusion",
        "Moulds, dies and tooling",
        "Hot runner systems",
        "Chillers, dryers and auxiliary equipment",
        "Granulators, shredders and recycling plant",
        "Polymers, resins and compounds",
        "Masterbatches, additives and colourants",
        "Films, sheets and laminates",
        "Closures, caps and preforms",
        "PET bottle and preform machinery",
        "Polymer testing and evaluation services",
      ],
    },
    {
      category: "Packaging and Processing Machinery",
      items: [
        "Food packaging machinery",
        "Non-food packaging machinery",
        "Pharmaceutical packaging and processing machinery",
        "Food processing machinery",
        "Dairy processing machines",
        "Meat, fish and seafood processing equipment",
        "Confectionery equipment",
        "Bottling and canning technology",
        "Brewing and beverage processing",
        "Liquid processing",
        "Bulk solids handling",
        "Palletising and conveying equipment",
        "Refrigeration and cold chain systems",
        "Automation and robotics",
        "Weighing and measurement systems",
      ],
    },
    {
      category: "Printing, Converting and Finishing",
      items: [
        "Sheet-fed offset printing",
        "Rotogravure printing machines",
        "Flexographic printing machines",
        "Digital printing machines",
        "Wide-format and outdoor digital printing",
        "Label printing machines",
        "Pad and screen printing machines",
        "Tinplate printing",
        "Printing plates, cylinders and films",
        "Printing inks (offset, flexo, gravure, digital, UV, screen, industrial inkjet)",
        "Ink dispensers and filling machines",
        "Cutting, creasing and punching machines",
        "Dies and die-cutting",
        "Laser die-cutting",
        "Folding and gluing machines",
        "Lamination and coating equipment",
        "Hot-melt adhesive coaters",
        "UV coating equipment",
        "Embossing machines",
        "Book binding, perfect binding and sewing machines",
        "Hard case making machines",
        "Blades and knives",
        "Graphic arts supplies",
      ],
    },
    {
      category: "Enabling Services and Infrastructure",
      items: [
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
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <Eyebrow>Exhibitor Profile</Eyebrow>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
              Indicative and not restrictive.
            </h1>
            <p className="mt-4 text-base text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              Explore the comprehensive breakdown of product categories, machinery, and services welcomed at PROPACK Odisha 2027.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            {profileSections.map((section) => (
              <div key={section.category} className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm">
                <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1F3864] sm:text-2xl border-b border-[var(--border)] pb-4">
                  {section.category}
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="mt-1 shrink-0 text-[#15A7AE]" />
                      <span className="text-sm font-medium leading-snug text-[#1F3864]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>
    </main>
  );
}