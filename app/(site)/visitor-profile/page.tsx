
import type { Metadata } from "next";
import Link from "next/link";

import { CheckCircle2, ArrowLeft } from "lucide-react";

import { RevealSection } from "@/components/shared/motion";
import { Eyebrow } from "@/components/shared/ui";

import { buildPageUrl, pageMetadata } from "@/lib/seo";
import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const slug = "visitor-profile";

const pageUrl = buildPageUrl(slug);
const categoryListId = `${pageUrl}#visitor-categories`;

export const metadata: Metadata = pageMetadata(
  slug,
  "Visitor Profile",
  "Indicative and not restrictive visitor categories for PROPACK Odisha 2027 at Bhubaneswar."
);

// Original visitor categories preserved in the same order.
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
] as const;

// Structured data uses the same categories shown on the page.
const visitorCategoriesSchema = {
  "@type": "ItemList",
  "@id": categoryListId,
  name: "PROPACK Odisha 2027 Visitor Categories",
  description:
    "Trade visitor categories invited to PROPACK Odisha International Expo 2027, including packaging, printing, plastics, processing and related industries.",
  numberOfItems: visitorProfiles.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: visitorProfiles.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

export default function VisitorProfilePage() {
  const baseSchema = pageSchema(slug);

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...baseSchema["@graph"].map((node) => {
            if (
              node["@type"] === "WebPage" ||
              node["@type"] === "CollectionPage"
            ) {
              return {
                ...node,
                "@type": "CollectionPage",
                mainEntity: {
                  "@id": categoryListId,
                },
                relatedLink: [
                  buildPageUrl("visitors"),
                  buildPageUrl("visitor-registration"),
                  buildPageUrl("venue"),
                ],
              };
            }

            return node;
          }),
          visitorCategoriesSchema,
        ],
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />
      )}

      <main className="min-h-screen bg-white">
        <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Back navigation */}
            <nav
              aria-label="Back to visitors overview"
              className="mb-6"
            >
              <Link
                href="/visitors"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#15A7AE] hover:underline focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EB622F]"
              >
                <ArrowLeft size={15} aria-hidden="true" />
                <span>Back to Visitors Overview</span>
              </Link>
            </nav>

            {/* Page introduction */}
            <header className="max-w-3xl">
              <Eyebrow>Visitor Profile</Eyebrow>

              <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
                Indicative and not restrictive.
              </h1>

              <p className="mt-4 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
                PROPACK Odisha 2027 welcomes trade visitors,
                enterprise buyers, manufacturers, and industry
                professionals across a diverse spectrum of
                sectors.
              </p>
            </header>

            {/* Visitor industry categories */}
            <section
              aria-labelledby="visitor-categories-heading"
              className="mt-12 rounded-2xl border border-[var(--border)] bg-white p-8 shadow-sm sm:p-10"
            >
              <h2
                id="visitor-categories-heading"
                className="border-b border-[var(--border)] pb-4 font-[family-name:var(--font-heading)] text-xl font-bold text-[#1F3864] sm:text-2xl"
              >
                Invited Industry Categories &amp; Sectors
              </h2>

              <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visitorProfiles.map((item) => (
                  <li
                    key={item}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-4 transition-all hover:border-[#EB622F] hover:bg-white hover:shadow-xs"
                  >
                    <CheckCircle2
                      size={18}
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-[#15A7AE]"
                    />

                    <span className="min-w-0 break-words text-sm font-semibold leading-snug text-[#1F3864]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </RevealSection>
      </main>
    </>
  );
}
