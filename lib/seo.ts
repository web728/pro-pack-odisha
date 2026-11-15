
import type { Metadata } from "next";
import { event, indexableRoutes, seoUrl } from "./site";

export type PageType =
  | "WebPage"
  | "AboutPage"
  | "ContactPage"
  | "CollectionPage";

export type SearchPage = {
  title: string;
  description: string;
  crumb?: string;
  type?: PageType;
  image?: string;
  noindex?: boolean;
};

export const BRAND_SUFFIX = " | PROPACK Odisha 2027";

const SITE_URL = seoUrl.replace(/\/+$/, "");

const DEFAULT_OG_IMAGE = new URL(
  event.ogImage,
  `${SITE_URL}/`
).toString();

const DEFAULT_OG_ALT =
  "PROPACK Odisha International Expo 2027, 25–28 February 2027, Janata Maidan, Bhubaneswar, Odisha";

export const searchPages: Record<string, SearchPage> = {
  "": {
    title:
      "PROPACK Odisha 2027 | Packaging, Printing & Plastics Expo",
    description:
      "Visit PROPACK Odisha International Expo 2027, featuring packaging, printing, plastics, processing and engineering. 25–28 February at Janata Maidan, Bhubaneswar.",
    crumb: "Home",
    type: "WebPage",
  },

  about: {
    title: "About the International Expo",
    crumb: "About the Expo",
    type: "AboutPage",
    description:
      "Discover PROPACK Odisha 2027, an international exhibition connecting packaging, printing, plastics, processing and engineering industries in Bhubaneswar.",
  },

  "about-organizers": {
    title: "About OASME, the Organiser",
    crumb: "About OASME",
    type: "AboutPage",
    description:
      "Learn about the Odisha Assembly of Small and Medium Enterprises (OASME), organiser of PROPACK Odisha 2027, and its initiatives supporting MSMEs in Odisha.",
  },

  sectors: {
    title: "Exhibition Sectors & Industries",
    crumb: "Exhibition Sectors",
    type: "CollectionPage",
    description:
      "Explore packaging, printing, plastics, paper, food processing, engineering and green energy sectors at PROPACK Odisha International Expo 2027.",
  },

  "market-overview": {
    title: "Odisha Industry & Market Overview",
    crumb: "Market Overview",
    type: "WebPage",
    description:
      "Explore Odisha's industrial and manufacturing landscape, including packaging, plastics, polymers, food processing and emerging business opportunities.",
  },

  resources: {
    title: "Expo Resources & Downloads",
    crumb: "Resources",
    type: "CollectionPage",
    description:
      "Find PROPACK Odisha 2027 exhibition resources, event information, brochures and useful documents for exhibitors and trade visitors.",
  },

  brochure: {
    title: "Exhibition Brochure & Information",
    crumb: "Brochure",
    type: "WebPage",
    description:
      "Explore the PROPACK Odisha 2027 exhibition brochure for event details, industry sectors, exhibitor opportunities and visitor information.",
  },

  exhibitors: {
    title: "Why Exhibit at PROPACK Odisha",
    crumb: "Why Exhibit",
    type: "WebPage",
    description:
      "Exhibit at PROPACK Odisha 2027 to showcase packaging machinery, printing technology, plastics and processing solutions to potential buyers in Eastern India.",
  },

  "exhibitor-profile": {
    title: "Exhibitor Profile & Categories",
    crumb: "Exhibitor Profile",
    type: "WebPage",
    description:
      "Explore exhibitor categories at PROPACK Odisha 2027, including packaging machinery, printing presses, plastics, polymers, processing and engineering.",
  },

  "exhibitor-registration": {
    title: "Exhibitor Registration & Stall Booking",
    crumb: "Exhibitor Registration",
    type: "WebPage",
    description:
      "Register your interest in exhibiting at PROPACK Odisha 2027, 25–28 February at Janata Maidan, Bhubaneswar. Submit your stall enquiry online.",
  },

  "exhibitor-details": {
    title: "Exhibitor Services & Details",
    crumb: "Exhibitor Services",
    type: "WebPage",
    description:
      "Access PROPACK Odisha 2027 exhibitor services, including stall requirements, fascia details, badges, directory information and exhibition submissions.",
  },

  participants: {
    title: "Previous Exhibitors & Participants",
    crumb: "Previous Participants",
    type: "CollectionPage",
    description:
      "Discover companies and industry participants from previous editions of PROPACK Odisha across packaging, printing, plastics, processing and related sectors.",
  },

  visitors: {
    title: "Why Visit PROPACK Odisha 2027",
    crumb: "Why Visit",
    type: "WebPage",
    description:
      "Visit PROPACK Odisha 2027 in Bhubaneswar to discover packaging machinery, printing technology, plastics, processing equipment and industry suppliers.",
  },

  "visitor-profile": {
    title: "Trade Visitor Profile & Industries",
    crumb: "Visitor Profile",
    type: "WebPage",
    description:
      "Explore the trade visitor profile for PROPACK Odisha 2027, covering packaging, printing, plastics, FMCG, pharmaceuticals, food processing and industrial buyers.",
  },

  "visitor-registration": {
    title: "Visitor Registration for the Expo",
    crumb: "Visitor Registration",
    type: "WebPage",
    description:
      "Register your interest in visiting PROPACK Odisha International Expo 2027, 25–28 February at Janata Maidan, Bhubaneswar, Odisha.",
  },

  venue: {
    title: "Expo Venue, Location & Directions",
    crumb: "Venue & Directions",
    type: "WebPage",
    description:
      "Find venue information and travel directions for PROPACK Odisha 2027 at Janata Maidan, Bhubaneswar, Odisha, from 25–28 February 2027.",
  },

  "she-builds": {
    title: "She'Builds Odisha: Women in Enterprise",
    crumb: "She'Builds Odisha",
    type: "WebPage",
    description:
      "Explore She'Builds Odisha at PROPACK Odisha 2027, featuring women entrepreneurs, mentoring, finance, market connections and buyer–seller opportunities.",
  },

  gallery: {
    title: "Event Photo & Video Gallery",
    crumb: "Gallery",
    type: "CollectionPage",
    description:
      "Explore the PROPACK Odisha photo and video gallery featuring previous exhibitions, machinery displays, exhibitor stalls, trade visitors and event highlights.",
  },

  news: {
    title: "Expo News, Updates & Announcements",
    crumb: "News & Updates",
    type: "CollectionPage",
    description:
      "Read PROPACK Odisha 2027 news, exhibition announcements, industry updates, exhibitor information and event highlights from Bhubaneswar.",
  },

  "contact-us": {
    title: "Contact PROPACK Odisha Expo Team",
    crumb: "Contact Us",
    type: "ContactPage",
    description:
      "Contact the PROPACK Odisha team for exhibition, stall booking and visitor enquiries. Call 70083 41944 or 77518 09433 for event information.",
  },

  "privacy-policy": {
    title: "Privacy Policy",
    crumb: "Privacy Policy",
    type: "WebPage",
    description:
      "Read the PROPACK Odisha Privacy Policy to understand how personal information submitted through exhibition enquiries and registration forms is handled.",
  },
};

export function cleanSlug(slug: string): string {
  return slug
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/");
}

export function buildPageUrl(slug: string): string {
  const clean = cleanSlug(slug);

  if (!clean) {
    return `${SITE_URL}/`;
  }

  const encodedPath = clean
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${SITE_URL}/${encodedPath}`;
}

export function getSearchPage(
  slug: string
): SearchPage | undefined {
  return searchPages[cleanSlug(slug)];
}

export function getPageTitle(slug: string): string {
  const clean = cleanSlug(slug);
  const page = getSearchPage(clean);

  if (!page) {
    return searchPages[""].title;
  }

  if (!clean) {
    return page.title;
  }

  if (page.title.includes("PROPACK Odisha 2027")) {
    return page.title;
  }

  return `${page.title}${BRAND_SUFFIX}`;
}

export function getPageDescription(
  slug: string
): string {
  return (
    getSearchPage(slug)?.description ??
    searchPages[""].description
  );
}

export function isIndexableRoute(
  slug: string
): boolean {
  const clean = cleanSlug(slug);
  const page = getSearchPage(clean);

  if (!page || page.noindex === true) {
    return false;
  }

  return indexableRoutes.some(
    (route) => cleanSlug(route) === clean
  );
}

function getPageImage(page: SearchPage): string {
  if (!page.image) {
    return DEFAULT_OG_IMAGE;
  }

  return new URL(
    page.image,
    `${SITE_URL}/`
  ).toString();
}

function validatePageSEO(
  slug: string,
  title: string,
  description: string,
  isConfigured: boolean
): void {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const route = slug || "home";

  if (!isConfigured) {
    console.warn(
      `[SEO] Missing searchPages configuration: ${route}`
    );
  }

  if (title.length > 65) {
    console.warn(
      `[SEO] Long title (${title.length} chars): ${route}`
    );
  }

  if (description.length < 90) {
    console.warn(
      `[SEO] Short description (${description.length} chars): ${route}`
    );
  }

  if (description.length > 165) {
    console.warn(
      `[SEO] Long description (${description.length} chars): ${route}`
    );
  }
}

export function pageMetadata(
  slug: string,
  fallbackTitle?: string,
  fallbackDescription?: string
): Metadata {
  const clean = cleanSlug(slug);

  const configuredPage = getSearchPage(clean);

  const page: SearchPage = configuredPage ?? {
    title: fallbackTitle ?? "PROPACK Odisha 2027",
    description:
      fallbackDescription ??
      searchPages[""].description,
    type: "WebPage",
    noindex: true,
  };

  const title = configuredPage
    ? getPageTitle(clean)
    : page.title.includes("PROPACK Odisha 2027")
      ? page.title
      : `${page.title}${BRAND_SUFFIX}`;

  const description = page.description;

  const canonicalUrl = buildPageUrl(clean);
  const imageUrl = getPageImage(page);

  const shouldIndex =
    Boolean(configuredPage) &&
    isIndexableRoute(clean);

  validatePageSEO(
    clean,
    title,
    description,
    Boolean(configuredPage)
  );

  return {
    title: {
      absolute: title,
    },

    description,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: shouldIndex,
      follow: true,

      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: "en_IN",

      url: canonicalUrl,
      siteName: event.fullName,

      title,
      description,

      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: DEFAULT_OG_ALT,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title,
      description,

      images: [
        {
          url: imageUrl,
          alt: DEFAULT_OG_ALT,
        },
      ],
    },
  };
}
