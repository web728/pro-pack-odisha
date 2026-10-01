import { ExhibitorsContent } from "@/components/pages/exhibitors";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["exhibitors"];

export const metadata = pageMetadata(
  "exhibitors",
  page.label,
  page.description
);

export default function Page() {
  const exhibitorsPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seoUrl}/exhibitors#webpage`,

    url: `${seoUrl}/exhibitors`,

    name: "Exhibit Packaging, Printing & Plastics Machinery | PROPACK Odisha 2027",

    description:
      "Explore exhibiting opportunities at PROPACK Odisha 2027 and connect with buyers, showcase machinery, launch products and build business relationships in Bhubaneswar.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    relatedLink: [
      `${seoUrl}/exhibitor-profile`,
      `${seoUrl}/exhibitor-registration`,
    ],

    inLanguage: "en-IN",
  };

  const exhibitorBenefitsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${seoUrl}/exhibitors#benefits`,

    name: "Why Exhibit at PROPACK Odisha 2027",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Thing",
          name: "Meet the right buyers",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Thing",
          name: "Network and collaborate",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Thing",
          name: "Build brand awareness",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Thing",
          name: "Grow your business",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Thing",
          name: "Launch new products",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Thing",
          name: "Gain market insights",
        },
      },
    ],
  };

  return (
    <>
      <ContentPage slug="exhibitors">
        <ExhibitorsContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exhibitorsPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(exhibitorBenefitsSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}