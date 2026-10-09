import { ParticipantsContent } from "@/components/pages/participants";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["participants"];

export const metadata = pageMetadata(
  "participants",
  page.label,
  page.description
);

export default function Page() {
  const participantsPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${seoUrl}/participants#webpage`,
    url: `${seoUrl}/participants`,
    name: "Previous Participants | PROPACK Odisha 2027",
    description:
      "Explore companies that have participated in PROPACK Odisha across packaging, printing, paper, plastics, engineering and food processing.",
    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },
    about: {
      "@id": `${seoUrl}/#event`,
    },
    inLanguage: "en-IN",
  };

  return (
    <>
      <ContentPage slug="participants">
        <ParticipantsContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(participantsPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}