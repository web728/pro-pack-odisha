
import type { Metadata } from "next";

import { ExhibitorProfileContent } from "@/components/pages/exhibitor-profile";
import { ContentPage } from "@/components/shared/page-shell";

import {
  buildPageUrl,
  pageMetadata,
} from "@/lib/seo";

import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const slug = "exhibitor-profile";

const pageUrl = buildPageUrl(slug);
const categoriesId = `${pageUrl}#categories`;

export const metadata: Metadata = pageMetadata(
  slug,
  "Exhibitor Profile",
  "Indicative and not restrictive categories for PROPACK Odisha 2027 exhibitors."
);

// Keep these categories aligned with the visible page content.
const exhibitorCategories = [
  "Packaging Materials and Formats",
  "Plastics Processing, Polymers and Tooling",
  "Packaging and Processing Machinery",
  "Printing, Converting and Finishing",
] as const;

export default function ExhibitorProfilePage() {
  const baseSchema = pageSchema(slug);

  const categoryListSchema = {
    "@type": "ItemList",
    "@id": categoriesId,

    name: "PROPACK Odisha 2027 Exhibitor Categories",

    description:
      "Exhibitor categories covering packaging materials, plastics processing, packaging machinery, printing, converting and finishing technologies.",

    numberOfItems: exhibitorCategories.length,

    itemListOrder: "https://schema.org/ItemListOrderAscending",

    itemListElement: exhibitorCategories.map(
      (category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category,
      })
    ),
  };

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
                  "@id": categoriesId,
                },

                relatedLink: [
                  buildPageUrl("exhibitors"),
                  buildPageUrl("exhibitor-registration"),
                  buildPageUrl("sectors"),
                ],
              };
            }

            return node;
          }),

          categoryListSchema,
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

      <ContentPage slug={slug}>
        <ExhibitorProfileContent />
      </ContentPage>
    </>
  );
}
