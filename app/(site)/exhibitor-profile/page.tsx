import { ExhibitorProfileContent } from "@/components/pages/exhibitor-profile";
import { ContentPage } from "@/components/shared/page-shell";

import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const slug = "exhibitor-profile";

export const metadata = pageMetadata(
  slug,
  "Exhibitor Profile",
  "Indicative and not restrictive categories for PROPACK Odisha 2027 exhibitors."
);

export default function Page() {
  const exhibitorProfileSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${seoUrl}/exhibitor-profile#webpage`,

    url: `${seoUrl}/exhibitor-profile`,

    name: "Exhibitor Profile | PROPACK Odisha 2027",

    description:
      "Explore exhibitor categories, machinery, products and services represented at PROPACK Odisha 2027 in Bhubaneswar.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    mainEntity: {
      "@id": `${seoUrl}/exhibitor-profile#categories`,
    },

    inLanguage: "en-IN",
  };

  const categoryListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seoUrl}/exhibitor-profile#categories`,

    name: "PROPACK Odisha 2027 Exhibitor Categories",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Thing",
          name: "Packaging Materials and Formats",
          url: `${seoUrl}/exhibitor-profile`,
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Thing",
          name: "Plastics Processing, Polymers and Tooling",
          url: `${seoUrl}/exhibitor-profile`,
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Thing",
          name: "Packaging and Processing Machinery",
          url: `${seoUrl}/exhibitor-profile`,
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Thing",
          name: "Printing, Converting and Finishing",
          url: `${seoUrl}/exhibitor-profile`,
        },
      },
    ],
  };

  return (
    <>
      <ContentPage slug={slug}>
        <ExhibitorProfileContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exhibitorProfileSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(categoryListSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}