import type { Metadata } from "next";
import { event, seoUrl } from "./site";

type SearchPage = {
  title: string;
  description: string;
};

export const searchPages: Record<string, SearchPage> = {
  "": {
    title: "PROPACK Odisha International Expo 2027 | Bhubaneswar",
    description:
      "Explore packaging, printing, plastics, food processing and engineering at PROPACK Odisha International Expo, 25–28 February 2027, Janata Maidan, Bhubaneswar.",
  },

  about: {
  title: "Packaging, Printing & Plastics Expo in Odisha",
  description:
    "Discover PROPACK Odisha International Expo: five connected industries, machinery, materials and business connections in Bhubaneswar, 25–28 February 2027.",
},

 sectors: {
  title: "Packaging, Printing, Plastics & Processing Sectors",
  description:
    "Explore the industries represented at PROPACK Odisha 2027, including packaging, printing, plastics, paper, processing and green energy technologies.",
},

  resources: {
    title: "Exhibition Resources & Information",
    description:
      "Access PROPACK Odisha 2027 exhibition information and resources for exhibitors and trade visitors attending the event in Bhubaneswar.",
  },

exhibitors: {
  title: "Exhibit Packaging, Printing & Plastics Machinery",
  description:
    "Explore exhibitor profiles for PROPACK Odisha 2027: packaging machines, printing presses, polymers, food processing and engineering. Enquire about a stall.",
},


  visitors: {
  title: "Visit the Packaging & Printing Exhibition in Odisha",
  description:
    "Plan your visit to PROPACK Odisha 2027 in Bhubaneswar. Explore packaging, printing, plastics and processing technologies, meet suppliers and connect with industry professionals.",
},

"visitor-profile": {
  title: "Visitor Profile | Trade Buyer & Industry Categories",
  description:
    "Explore trade visitor categories for PROPACK Odisha 2027, including packaging, plastics, printing, food processing, pharma, FMCG, cold chain and industrial buyers.",
},

  "exhibitor-registration": {
    title: "Exhibitor Registration & Stall Enquiry",
    description:
      "Enquire about exhibiting at PROPACK Odisha International Expo, 25–28 February 2027 at Janata Maidan, Bhubaneswar. Share your company and stall requirements.",
  },

  "visitor-registration": {
    title: "Visitor Registration | Bhubaneswar Expo 2027",
    description:
      "Register your interest in visiting PROPACK Odisha International Expo for packaging, printing, plastics, food processing and engineering in Bhubaneswar.",
  },

 "about-organizers": {
  title: "About OASME | PROPACK Odisha 2027 Organizer",
  description:
    "Learn about the Odisha Assembly of Small and Medium Enterprises (OASME), organizer of PROPACK Odisha 2027 and its work supporting MSMEs across Odisha.",
},

 "market-overview": {
  title: "Odisha Industry & Market Overview",
  description:
    "Explore Odisha's packaging, plastics, polymers, food processing and manufacturing ecosystem connected with PROPACK Odisha 2027.",
},

  "exhibitor-details": {
  title: "Exhibitor Service Centre",
  description:
    "Access PROPACK Odisha 2027 exhibitor services for power requirements, fascia details, badges, directory profiles and stall design submissions.",
},


  "contact-us": {
    title: "Contact OASME | Expo Enquiries & Venue",
    description:
      "Contact the PROPACK Odisha team on 70083 41944 or 77518 09433. Expo: 25–28 February 2027, Janata Maidan, Bhubaneswar, Odisha.",
  },

  brochure: {
    title: "PROPACK Odisha 2027 Exhibition Brochure",
    description:
      "View information about PROPACK Odisha International Expo 2027, including exhibition sectors, participation opportunities and event details.",
  },
};

function buildPageUrl(slug: string) {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");

  if (!cleanSlug) {
    return `${seoUrl}/`;
  }

  return `${seoUrl}/${cleanSlug}`;
}

export function pageMetadata(
  slug: string,
  title: string,
  description: string
): Metadata {
  const cleanSlug = slug.replace(/^\/+|\/+$/g, "");

  const content =
    searchPages[cleanSlug] || {
      title,
      description,
    };

  const url = buildPageUrl(cleanSlug);

  const displayTitle = cleanSlug
    ? `${content.title} | PROPACK Odisha 2027`
    : content.title;

  return {
    title: {
      absolute: displayTitle,
    },

    description: content.description,

    alternates: {
      canonical: url,
    },

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
          alt: "PROPACK Odisha International Expo, 25–28 February 2027, Bhubaneswar. Organized by OASME.",
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