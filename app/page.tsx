import { HomeHero } from "@/components/home/home-hero";
import {
  EventSnapshot,
  SectorPreview,
  ParticipationPreview,
  TechnologyPreview,
  VenuePreview,
} from "@/components/home/sections";
import { OrganizerStrip } from "@/components/shared/organizer-strip";
import { CTA } from "@/components/shared/ui";
import { pageMetadata } from "@/lib/seo";
import { event, seoUrl } from "@/lib/site";
export const metadata = pageMetadata("", "", "");
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.fullName,
    description: event.description,
    startDate: "2027-02-25",
    endDate: "2027-02-28",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: seoUrl,
    organizer: {
      "@type": "Organization",
      name: "OSME",
      url: `${seoUrl}/about-organizers`,
    },
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
    image: `${seoUrl}/assets/printing.webp`,
  };
  return (
    <>
      <HomeHero />
      <EventSnapshot />
      <SectorPreview />
      <ParticipationPreview />
      <TechnologyPreview />
      <OrganizerStrip />
      <VenuePreview />
      <CTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
