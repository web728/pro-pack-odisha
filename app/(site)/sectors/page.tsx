import { SectorsContent } from "@/components/pages/sectors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { sectors, seoUrl } from "@/lib/site";

const page = contentPages["sectors"];

export const metadata = pageMetadata(
  "sectors",
  page.label,
  page.description
);

export default function Page() {
  const sectorsPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${seoUrl}/sectors#webpage`,

    url: `${seoUrl}/sectors`,

    name:
      "Packaging, Printing, Plastics & Processing Sectors | PROPACK Odisha 2027",

    description:
      "Explore the industry sectors represented at PROPACK Odisha 2027, including packaging, printing, plastics, paper, processing and green energy technologies.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    mainEntity: {
      "@id": `${seoUrl}/sectors#sector-list`,
    },

    inLanguage: "en-IN",
  };

  const sectorListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seoUrl}/sectors#sector-list`,

    name: "PROPACK Odisha 2027 Exhibition Sectors",

    numberOfItems: sectors.length,

    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,

      item: {
        "@type": "Thing",
        name: sector.name,
        description: sector.detail,
        url: `${seoUrl}/sectors#sector-${index}`,
      },
    })),
  };

  return (
    <>
      <ContentPage slug="sectors">
        <SectorsContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectorsPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectorListSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}