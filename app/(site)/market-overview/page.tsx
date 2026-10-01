import { MarketContent } from "@/components/pages/market-overview";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["market-overview"];

export const metadata = pageMetadata(
  "market-overview",
  page.label,
  page.description
);

export default function Page() {
  const marketOverviewSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seoUrl}/market-overview#webpage`,

    url: `${seoUrl}/market-overview`,

    name: "Odisha Industry & Market Overview | PROPACK Odisha 2027",

    description:
      "Explore Odisha's packaging, plastics, polymers, food processing and manufacturing ecosystem connected with PROPACK Odisha 2027.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: [
      {
        "@type": "Thing",
        name: "Packaging Industry in Odisha",
      },
      {
        "@type": "Thing",
        name: "Plastics and Polymer Industry in Odisha",
      },
      {
        "@type": "Thing",
        name: "Food Processing Industry in Odisha",
      },
      {
        "@type": "Thing",
        name: "Manufacturing in Odisha",
      },
    ],

    mainEntity: {
      "@id": `${seoUrl}/market-overview#investment-regions`,
    },

    inLanguage: "en-IN",
  };

  const investmentRegionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seoUrl}/market-overview#investment-regions`,

    name: "Odisha Investment Regions and Industrial Corridors",

    numberOfItems: 4,

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Place",
          name: "National Investment and Manufacturing Zone (NIMZ)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Kalinganagar",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Place",
          name: "Petroleum, Chemicals & Petrochemicals Investment Region (PCPIR)",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Paradeep",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Place",
          name: "Port-Based Manufacturing Zone",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dhamra",
            addressRegion: "Odisha",
            addressCountry: "IN",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Thing",
          name: "Food & Beverage Clusters & Plastic Parks across Odisha",
        },
      },
    ],
  };

  return (
    <>
      <ContentPage slug="market-overview">
        <MarketContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(marketOverviewSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(investmentRegionsSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}