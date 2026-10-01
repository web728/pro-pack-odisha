import { OrganizersContent } from "@/components/pages/about-organizers";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["about-organizers"];

export const metadata = pageMetadata(
  "about-organizers",
  page.label,
  page.description
);

export default function Page() {
  const organizersPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${seoUrl}/about-organizers#webpage`,

    url: `${seoUrl}/about-organizers`,

    name: "About OASME | PROPACK Odisha 2027 Organizer",

    description:
      "Learn about the Odisha Assembly of Small and Medium Enterprises (OASME), organizer of PROPACK Odisha 2027 and an industrial body supporting MSMEs across Odisha.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/about-organizers#organization`,
    },

    inLanguage: "en-IN",
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${seoUrl}/about-organizers#organization`,

    name: "Odisha Assembly of Small and Medium Enterprises",
    alternateName: "OASME",

    url: "https://www.oasme.org.in/",

    description:
      "Odisha Assembly of Small and Medium Enterprises (OASME) is an industrial organization supporting cottage, handicraft, micro, small and medium enterprises in Odisha and the organizer of PROPACK Odisha 2027.",

    address: {
      "@type": "PostalAddress",
      streetAddress: "Satya Bhawan",
      addressLocality: "Cuttack",
      addressRegion: "Odisha",
      addressCountry: "IN",
    },

    telephone: [
      "+91 70083 41944",
      "+91 77518 09433",
    ],

    email: [
      "oasme.odisha@gmail.com",
      "info@propackodisha.com",
    ],

    organizer: {
      "@id": `${seoUrl}/#event`,
    },

    areaServed: {
      "@type": "AdministrativeArea",
      name: "Odisha",
    },
  };

  return (
    <>
      <ContentPage slug="about-organizers">
        <OrganizersContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizersPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}