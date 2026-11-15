
import type { Metadata } from "next";

import { VisitorsContent } from "@/components/pages/visitors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import {
  buildPageUrl,
  pageMetadata,
} from "@/lib/seo";
import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const slug = "visitors";
const page = contentPages[slug];

const pageUrl = buildPageUrl(slug);
const audienceId = `${pageUrl}#trade-audience`;

export const metadata: Metadata = pageMetadata(
  slug,
  page.label,
  page.description
);

export default function VisitorsPage() {
  const baseSchema = pageSchema(slug);

  const tradeAudienceSchema = {
    "@type": "BusinessAudience",
    "@id": audienceId,

    name: "PROPACK Odisha Trade Visitor Audience",

    audienceType:
      "Trade visitors, manufacturers, processors, buyers, distributors, industry professionals and decision-makers",

    geographicArea: {
      "@type": "AdministrativeArea",
      name: "Odisha",
      containedInPlace: {
        "@type": "Country",
        name: "India",
      },
    },
  };

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...baseSchema["@graph"].map((node) => {
            if (node["@type"] === "WebPage") {
              return {
                ...node,

                mainEntity: {
                  "@id": buildPageUrl("") + "#event",
                },

                audience: {
                  "@id": audienceId,
                },

                significantLink: [
                  buildPageUrl("visitor-registration"),
                  buildPageUrl("visitor-profile"),
                  buildPageUrl("venue"),
                ],
              };
            }

            return node;
          }),

          tradeAudienceSchema,
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
        <VisitorsContent />
      </ContentPage>
    </>
  );
}
