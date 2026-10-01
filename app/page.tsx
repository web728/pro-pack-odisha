import { HomeHero } from "@/components/home/home-hero";

import {
  EventSnapshot,
  SectorPreview,
  ParticipationPreview,
  TechnologyPreview,
  SupportedByStrip,
  SheBuildsPreview,
} from "@/components/home/sections";

import { OrganizerStrip } from "@/components/shared/organizer-strip";
import { CTA } from "@/components/shared/ui";

import { pageMetadata } from "@/lib/seo";
import { event, seoUrl } from "@/lib/site";

/**
 * Homepage SEO metadata
 * Pulled from lib/seo.ts
 */
export const metadata = pageMetadata("", "", "");

export default function Home() {
  /**
   * Event structured data
   */
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `${seoUrl}/#event`,

    name: event.fullName,

    description: event.description,

    url: `${seoUrl}/`,

    startDate: `${event.startDate}T${event.openingTime}:00+05:30`,

    endDate: `${event.endDate}T${event.closingTime}:00+05:30`,

    eventStatus: "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    image: [
      `${seoUrl}/social-card.png`,
    ],

    location: {
      "@type": "Place",
      name: "Janata Maidan",

      address: {
        "@type": "PostalAddress",
        streetAddress: "Janata Maidan",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        addressCountry: "IN",
      },
    },

    organizer: {
      "@type": "Organization",
      name: "Odisha Assembly of Small and Medium Enterprises (OASME)",
      url: "https://www.oasme.org.in",
    },
  };

  /**
   * Homepage structured data
   */
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seoUrl}/#webpage`,

    url: `${seoUrl}/`,

    name: "PROPACK Odisha International Expo 2027 | Bhubaneswar",

    description:
      "Explore packaging, printing, plastics, food processing and engineering at PROPACK Odisha International Expo, 25–28 February 2027, Janata Maidan, Bhubaneswar.",

    isPartOf: {
      "@id": `${seoUrl}/#website`,
    },

    about: {
      "@id": `${seoUrl}/#event`,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${seoUrl}/social-card.png`,
    },

    inLanguage: "en-IN",
  };

  return (
    <>
      <HomeHero />

      <SupportedByStrip />

      <EventSnapshot />

      <SectorPreview />

      <ParticipationPreview />

      <OrganizerStrip />

      <SheBuildsPreview />

      <TechnologyPreview />

      <CTA />

      {/* Event Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventSchema).replace(/</g, "\\u003c"),
        }}
      />

      {/* Homepage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}