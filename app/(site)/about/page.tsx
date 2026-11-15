
import type { Metadata } from "next";

import { AboutContent } from "@/components/pages/about";
import { ContentPage } from "@/components/shared/page-shell";

import { contentPages } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";

import {
  pageSchema,
  serializeJsonLd,
} from "@/lib/schema";

const page = contentPages["about"];

export const metadata: Metadata = pageMetadata(
  "about",
  page.label,
  page.description
);

export default function AboutPage() {
  const structuredData = pageSchema("about");

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

      <ContentPage slug="about">
        <AboutContent />
      </ContentPage>
    </>
  );
}
