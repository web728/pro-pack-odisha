
import type { Metadata } from "next";

import { SectorsContent } from "@/components/pages/sectors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { sectors } from "@/lib/site";

import {
  buildPageUrl,
  pageMetadata,
} from "@/lib/seo";

import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const slug = "sectors";
const page = contentPages[slug];

const pageUrl = buildPageUrl(slug);
const sectorListId = `${pageUrl}#sector-list`;

export const metadata: Metadata = pageMetadata(
  slug,
  page.label,
  page.description
);

export default function SectorsPage() {
  const baseSchema = pageSchema(slug);

  const sectorListSchema = {
    "@type": "ItemList",
    "@id": sectorListId,

    name: "PROPACK Odisha 2027 Exhibition Sectors",

    description:
      "Industry sectors at PROPACK Odisha International Expo 2027, covering packaging, printing, plastics, processing, paper and green energy.",

    numberOfItems: sectors.length,

    itemListOrder:
      "https://schema.org/ItemListOrderAscending",

    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,

      item: {
        "@type": "Thing",
        "@id": `${pageUrl}#sector-${index}`,
        name: sector.name,
        description: sector.detail,
        url: `${pageUrl}#sector-${index}`,
      },
    })),
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
                  "@id": sectorListId,
                },

                relatedLink: [
                  buildPageUrl("exhibitors"),
                  buildPageUrl("exhibitor-profile"),
                  buildPageUrl("visitors"),
                ],
              };
            }

            return node;
          }),

          sectorListSchema,
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
        <SectorsContent />
      </ContentPage>
    </>
  );
}
