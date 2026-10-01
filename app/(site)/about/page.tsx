import { AboutContent } from "@/components/pages/about";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

const page = contentPages["about"];

export const metadata = pageMetadata(
  "about",
  page.label,
  page.description
);

export default function Page() {
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${seoUrl}/about#webpage`,
    url: `${seoUrl}/about`,
    name: "Packaging, Printing & Plastics Expo in Odisha | PROPACK Odisha 2027",
    description:
      "Discover PROPACK Odisha International Expo, bringing together packaging, printing, paper, plastics, processing and green energy industries in Bhubaneswar.",
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
      <ContentPage slug="about">
        <AboutContent />
      </ContentPage>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
    </>
  );
}