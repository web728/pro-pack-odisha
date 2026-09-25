/* =========================================================================
   EXHIBITOR PROFILE CONTENT COMPONENT (ULTRA PREMIUM REVAMP)
   ========================================================================= */
import { RevealSection } from "@/components/shared/motion";
import { Eyebrow, Button } from "@/components/shared/ui";
import { CheckCircle2, FileText } from "lucide-react";
import Image from "next/image";

export function ExhibitorProfileContent() {
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
  ];

  return (
    <>
      {/* =========================================================
          EXHIBITOR PROFILE SECTIONS
      ========================================================= */}
      <RevealSection className="relative overflow-hidden border-b border-[var(--border)] bg-[#f8fafc] py-20 lg:py-28">
        
        {/* Top Right Image Container */}
       {/* Top Right Image */}
<div className="pointer-events-none absolute right-0 top-[-160] z-0 h-[560px] w-[560px] opacity-90 sm:h-[440px] sm:w-[440px] lg:h-[620px] lg:w-[620px]">
  <Image
    src="/sections/exhibitor-profile-top.png"
    alt=""
    fill
    className="object-contain"
  />
</div>

{/* Bottom Left Image */}
<div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[360px] w-[360px] opacity-90 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px]">
  <Image
    src="/sections/exhibitor-profile-bot.png"
    alt=""
    fill
    className="object-contain"
  />
</div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6">

          {/* Section Heading */}
          <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
            <Eyebrow>Exhibitor Profile</Eyebrow>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.12]">
              Indicative and <span className="text-[#EB622F]">not restrictive.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Explore the comprehensive breakdown of product categories, machinery, and services welcomed at PROPACK Odisha 2027.
            </p>
          </div>

          {/* Profile Categories List */}
          <div className="mx-auto max-w-6xl space-y-12">
            {profileSections.map((section, secIdx) => (
              <div 
                key={section.category} 
                className="rounded-3xl border border-[var(--border)] bg-white p-8 sm:p-10 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 border-b border-[var(--border)] pb-4 mb-6">
                  <span className={`h-2.5 w-2.5 rounded-full ${secIdx % 2 === 0 ? "bg-[#15A7AE]" : "bg-[#EB622F]"}`} />
                  <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#1F3864] sm:text-2xl">
                    {section.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item, idx) => (
                    <div key={item} className="flex items-start gap-3 p-3 rounded-xl hover:bg-[#f8faf9] transition-colors border border-transparent hover:border-[#dfe5e8]">
                      <CheckCircle2 size={16} className={`mt-1 shrink-0 ${idx % 2 === 0 ? "text-[#15A7AE]" : "text-[#EB622F]"}`} />
                      <span className="text-sm font-medium leading-snug text-[#1F3864]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Button href="/exhibitor-registration">
              Book your stall
            </Button>

            <Button secondary href="/exhibitors">
              <FileText size={16} className="mr-1.5" />
              Back to Exhibitors
            </Button>
          </div>

        </div>
      </RevealSection>
    </>
  );
}