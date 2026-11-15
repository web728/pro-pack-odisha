
import type { Metadata } from "next";

import { ParticipantsContent } from "@/components/pages/participants";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { participants } from "@/lib/participants-data";
import { buildPageUrl, pageMetadata } from "@/lib/seo";
import { pageSchema, serializeJsonLd } from "@/lib/schema";

const slug = "participants";
const page = contentPages[slug];

const pageUrl = buildPageUrl(slug);
const participantListId = `${pageUrl}#participant-list`;

export const metadata: Metadata = pageMetadata(
  slug,
  page.label,
  page.description
);

export default function ParticipantsPage() {
  const baseSchema = pageSchema(slug);

  const participantListSchema = {
    "@type": "ItemList",
    "@id": participantListId,
    name: "Previous Participants at PROPACK Odisha",
    description:
      "Companies featured in the previous participants directory of PROPACK Odisha.",
    numberOfItems: participants.length,
    itemListElement: participants.map((participant, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: participant.name,
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
                  "@id": participantListId,
                },
                about: {
                  "@id": `${pageUrl.replace(
                    /\/participants$/,
                    ""
                  )}/#event`,
                },
              };
            }

            return node;
          }),
          participantListSchema,
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
        <ParticipantsContent />
      </ContentPage>
    </>
  );
}
