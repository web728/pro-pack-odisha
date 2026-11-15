
import type { Metadata } from "next";

import { OrganizersContent } from "@/components/pages/about-organizers";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { event, seoUrl } from "@/lib/site";

import {
  pageSchema,
  schemaIds,
  serializeJsonLd,
} from "@/lib/schema";

const page = contentPages["about-organizers"];

export const metadata: Metadata = pageMetadata(
  "about-organizers",
  page.label,
  page.description
);

export default function AboutOrganizersPage() {
  const baseSchema = pageSchema("about-organizers");

  const organizerSchema = {
    "@type": "Organization",
    "@id": schemaIds.organizer,

    name: event.organizer.name,
    alternateName: event.organizer.shortName,
    url: event.organizer.url,

    description:
      "Odisha Assembly of Small and Medium Enterprises (OASME) is an industrial organization supporting cottage, handicraft, micro, small and medium enterprises in Odisha and the organizer of PROPACK Odisha International Expo.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Satya Bhawan",
      addressLocality: "Cuttack",
      addressRegion: "Odisha",
      addressCountry: "IN",
    },

    email: "oasme.odisha@gmail.com",

    areaServed: {
      "@type": "AdministrativeArea",
      name: "Odisha",
    },
  };

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...baseSchema["@graph"].map((node) => {
            if (node["@type"] === "AboutPage") {
              return {
                ...node,
                about: {
                  "@id": schemaIds.organizer,
                },
                mainEntity: {
                  "@id": schemaIds.organizer,
                },
              };
            }

            return node;
          }),
          organizerSchema,
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

      <ContentPage slug="about-organizers">
        <OrganizersContent />
      </ContentPage>
    </>
  );
}
