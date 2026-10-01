import { ServicesContent } from "@/components/pages/exhibitor-details";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { services, seoUrl } from "@/lib/site";

const page = contentPages["exhibitor-details"];

export const metadata = pageMetadata(
  "exhibitor-details",
  page.label,
  page.description
);

export default function Page() {
  const exhibitorServicePageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${seoUrl}/exhibitor-details#webpage`,

    url: `${seoUrl}/exhibitor-details`,

    name: "Exhibitor Service Centre | PROPACK Odisha 2027",

    description:
      "Access exhibitor services for PROPACK Odisha 2027, including power requirements, fascia details, exhibitor badges, directory profiles and stall design submissions.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    mainEntity: {
      "@id": `${seoUrl}/exhibitor-details#services`,
    },

    inLanguage: "en-IN",
  };

  const serviceListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seoUrl}/exhibitor-details#services`,

    name: "PROPACK Odisha Exhibitor Services",

    numberOfItems: services.length,

    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: "PROPACK Odisha",
          url: seoUrl,
        },
        url: `${seoUrl}/${service.slug}`,
      },
    })),
  };

  return (
    <>
      <ContentPage slug="exhibitor-details">
        <ServicesContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exhibitorServicePageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceListSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}