
import type { Metadata } from "next";

import { ExhibitorsContent } from "@/components/pages/exhibitors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const page = contentPages["exhibitors"];

export const metadata: Metadata = pageMetadata(
  "exhibitors",
  page.label,
  page.description
);

const exhibitorBenefits = [
  "Meet the right buyers",
  "Network and collaborate",
  "Build brand awareness",
  "Grow your business",
  "Launch new products",
  "Gain market insights",
] as const;

export default function ExhibitorsPage() {
  const baseSchema = pageSchema("exhibitors");

  const benefitsId =
    "https://www.propackodisha.com/exhibitors#benefits";

  const benefitsSchema = {
    "@type": "ItemList",
    "@id": benefitsId,

    name: "Why Exhibit at PROPACK Odisha 2027",

    description:
      "Explore the business and networking benefits of exhibiting at PROPACK Odisha International Expo 2027.",

    numberOfItems: exhibitorBenefits.length,

    itemListElement: exhibitorBenefits.map(
      (benefit, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: benefit,
      })
    ),
  };

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",

        "@graph": [
          ...baseSchema["@graph"].map((node) => {
            if (node["@type"] === "WebPage") {
              return {
                ...node,

                relatedLink: [
                  "https://www.propackodisha.com/exhibitor-profile",
                  "https://www.propackodisha.com/exhibitor-registration",
                ],

                hasPart: {
                  "@id": benefitsId,
                },
              };
            }

            return node;
          }),

          benefitsSchema,
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

      <ContentPage slug="exhibitors">
        <ExhibitorsContent />
      </ContentPage>
    </>
  );
}
