import type { Metadata } from "next";
import { event, seoUrl } from "./site";
export const searchPages: Record<
  string,
  { title: string; description: string }
> = {
  "": {
    title: "Propack Odisha International Expo 2027 | Bhubaneswar",
    description:
      "Explore packaging, printing, plastics, food processing and engineering at Propack Odisha International Expo, 25–28 February 2027, Janata Maidan, Bhubaneswar.",
  },
  about: {
    title: "Packaging, Printing & Plastics Expo in Odisha",
    description:
      "Discover Propack Odisha International Expo: five connected industries, machinery, materials and business connections in Bhubaneswar, 25–28 February 2027.",
  },
  exhibitors: {
    title: "Exhibit Packaging, Printing & Plastics Machinery",
    description:
      "Explore exhibitor profiles for Propack Odisha 2027: packaging machines, printing presses, polymers, food processing and engineering. Enquire about a stall.",
  },
  visitors: {
    title: "Visit the Packaging & Printing Exhibition in Odisha",
    description:
      "Plan your visit to Propack Odisha 2027 in Bhubaneswar. Explore machinery and materials, compare solutions and connect with industry suppliers.",
  },
  "exhibitor-registration": {
    title: "Exhibitor Registration & Stall Enquiry",
    description:
      "Enquire about exhibiting at Propack Odisha International Expo, 25–28 February 2027 at Janata Maidan, Bhubaneswar. Share your company and stall requirements.",
  },
  "visitor-registration": {
    title: "Visitor Registration | Bhubaneswar Expo 2027",
    description:
      "Register your interest in visiting Propack Odisha International Expo for packaging, printing, plastics, food processing and engineering in Bhubaneswar.",
  },
  "about-organizers": {
    title: "About OSME | Expo Organizer",
    description:
      "Meet OSME, the sole organizer of Propack Odisha International Expo. Contact the team for exhibition participation and visitor assistance.",
  },
  "contact-us": {
    title: "Contact OSME | Expo Enquiries & Venue",
    description:
      "Contact the Propack Odisha team on 70083 41944 or 77518 09433. Expo: 25–28 February 2027, Janata Maidan, Bhubaneswar, Odisha.",
  },
};
export function pageMetadata(
  slug: string,
  title: string,
  description: string,
): Metadata {
  const content = searchPages[slug] || { title, description };
  const url = `${seoUrl}/${slug}`;
  const displayTitle = slug
    ? `${content.title} | Propack Odisha 2027`
    : content.title;
  return {
    title: { absolute: displayTitle },
    description: content.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      siteName: event.fullName,
      title: displayTitle,
      description: content.description,
      url,
      images: [
        {
          url: `${seoUrl}/social-card.png`,
          width: 1200,
          height: 630,
          alt: "Propack Odisha International Expo, 25–28 February 2027, Bhubaneswar. Organized by OSME.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: content.description,
      images: [`${seoUrl}/social-card.png`],
    },
  };
}
