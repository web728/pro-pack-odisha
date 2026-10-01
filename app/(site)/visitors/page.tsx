import { VisitorsContent } from "@/components/pages/visitors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["visitors"];

export const metadata = pageMetadata(
  "visitors",
  page.label,
  page.description
);

export default function Page() {
  const visitorsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seoUrl}/visitors#webpage`,

    url: `${seoUrl}/visitors`,

    name: "Visit the Packaging & Printing Exhibition in Odisha | PROPACK Odisha 2027",

    description:
      "Plan your visit to PROPACK Odisha 2027 in Bhubaneswar. Explore packaging, printing, plastics, processing technologies, meet suppliers and connect with industry professionals.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    mainEntity: {
      "@id": `${seoUrl}/#event`,
    },

    significantLink: [
      `${seoUrl}/visitor-registration`,
      `${seoUrl}/visitor-profile`,
      `${seoUrl}/venue`,
    ],

    inLanguage: "en-IN",
  };

  const visitorAudienceSchema = {
    "@context": "https://schema.org",
    "@type": "Audience",
    "@id": `${seoUrl}/visitors#trade-audience`,

    audienceType:
      "Trade visitors, manufacturers, processors, buyers, distributors, industry professionals and decision-makers",

    geographicArea: {
      "@type": "AdministrativeArea",
      name: "Odisha, India",
    },
  };

  return (
    <>
      <ContentPage slug="visitors">
        <VisitorsContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(visitorsPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(visitorAudienceSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}