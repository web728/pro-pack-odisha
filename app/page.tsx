
import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";

import {
  EventSnapshot,
  SectorPreview,
  ParticipationPreview,
  SupportedByStrip,
  SheBuildsPreview,
} from "@/components/home/sections";

import { OrganizerStrip } from "@/components/shared/organizer-strip";
import { CTA } from "@/components/shared/ui";

import { pageMetadata } from "@/lib/seo";

import {
  siteGraph,
  serializeJsonLd,
} from "@/lib/schema";

/**
 * Homepage SEO
 *
 * Title, description, canonical URL,
 * Open Graph, Twitter and robots metadata
 * are managed centrally by lib/seo.ts.
 */
export const metadata: Metadata = pageMetadata(
  "",
  "",
  ""
);
 
export default function Home() {
  const structuredData = siteGraph();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(structuredData),
        }}
      />

      <HomeHero />

      <SupportedByStrip />

      <EventSnapshot />

      <SectorPreview />

      <ParticipationPreview />

      <SheBuildsPreview />

      <OrganizerStrip />

      <CTA />
    </>
  );
}
