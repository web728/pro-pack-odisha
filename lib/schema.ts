
import { event, seoUrl } from "./site";

import {
  buildPageUrl,
  cleanSlug,
  getPageTitle,
  getSearchPage,
} from "./seo";

const SCHEMA_CONTEXT = "https://schema.org";

const BASE_URL = seoUrl.replace(/\/+$/, "");

const HOME_URL = `${BASE_URL}/`;

const ORG_ID = `${HOME_URL}#organization`;
const ORGANIZER_ID = `${HOME_URL}#organizer`;
const WEBSITE_ID = `${HOME_URL}#website`;
const EVENT_ID = `${HOME_URL}#event`;
const VENUE_ID = `${HOME_URL}#venue`;
const HOME_PAGE_ID = `${HOME_URL}#webpage`;

const EVENT_STATUS =
  "https://schema.org/EventScheduled";

const ATTENDANCE_MODE =
  "https://schema.org/OfflineEventAttendanceMode";

const LOGO_URL = new URL(
  event.logo,
  HOME_URL
).toString();

const OG_IMAGE_URL = new URL(
  event.ogImage,
  HOME_URL
).toString();

/**
 * Convert Indian contact numbers into E.164.
 *
 * Supports:
 * 70083 41944
 * +91 70083 41944
 * 917008341944
 */
function toE164(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+91${digits}`;
  }

  if (
    digits.length === 12 &&
    digits.startsWith("91")
  ) {
    return `+${digits}`;
  }

  return null;
}

/**
 * Shared structured-data IDs.
 *
 * Reuse these IDs consistently across
 * homepage and individual page schemas.
 */
export const schemaIds = {
  organization: ORG_ID,
  organizer: ORGANIZER_ID,
  website: WEBSITE_ID,
  event: EVENT_ID,
  venue: VENUE_ID,
  homepage: HOME_PAGE_ID,
} as const;

/**
 * PROPACK Odisha Organization.
 *
 * Represents the exhibition brand,
 * not a separately verified legal entity.
 */
function organizationSchema() {
  const contactPoints = event.phones
    .map(toE164)
    .filter((phone): phone is string =>
      phone !== null
    )
    .map((phone) => ({
      "@type": "ContactPoint",
      telephone: phone,
      contactType: "general enquiries",
      areaServed: "IN",
      availableLanguage: ["en"],
    }));

  return {
    "@type": "Organization",
    "@id": ORG_ID,

    name: event.name,
    alternateName: event.fullName,

    url: HOME_URL,

    description: event.description,

    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },

    image: OG_IMAGE_URL,

    email: event.email,

    ...(contactPoints.length > 0
      ? { contactPoint: contactPoints }
      : {}),
  };
}

/**
 * Official event organizer.
 */
function organizerSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZER_ID,

    name: event.organizer.name,

    alternateName: event.organizer.shortName,

    url: event.organizer.url,
  };
}

/**
 * Google Site Name structured data.
 *
 * Use the official visible brand name.
 */
function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,

    url: HOME_URL,

    name: event.name,

    alternateName: [
      "PROPACK Odisha 2027",
      event.fullName,
    ],

    description: event.description,

    inLanguage: "en-IN",

    publisher: {
      "@id": ORG_ID,
    },
  };
}

/**
 * Physical exhibition venue.
 */
function venueSchema() {
  return {
    "@type": "Place",
    "@id": VENUE_ID,

    name: event.venueName,

    address: {
      "@type": "PostalAddress",
      addressLocality: event.city,
      addressRegion: event.region,
      addressCountry: event.country,
    },
  };
}

/**
 * Main exhibition Event.
 *
 * Date-only values are intentional until
 * official opening hours are confirmed.
 *
 * Do not invent:
 * - Ticket prices
 * - Availability
 * - Attendance counts
 * - Ratings or reviews
 */
function eventSchema() {
  return {
    "@type": "Event",
    "@id": EVENT_ID,

    name: `${event.fullName} 2027`,

    description: event.description,

    url: HOME_URL,

    startDate:
      `${event.startDate}T${event.openingTime}:00+05:30`,

    endDate:
      `${event.endDate}T${event.closingTime}:00+05:30`,

    eventStatus:
      "https://schema.org/EventScheduled",

    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",

    inLanguage: "en-IN",

    image: [OG_IMAGE_URL],

    location: {
      "@id": VENUE_ID,
    },

    organizer: {
      "@id": ORGANIZER_ID,
    },
  };
}

/**
 * Homepage WebPage entity.
 */
function homepageSchema() {
  const home = getSearchPage("");

  return {
    "@type": "WebPage",
    "@id": HOME_PAGE_ID,

    url: HOME_URL,

    name: getPageTitle(""),

    description:
      home?.description ?? event.description,

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": EVENT_ID,
    },

    mainEntity: {
      "@id": EVENT_ID,
    },

    inLanguage: "en-IN",

    primaryImageOfPage: {
      "@type": "ImageObject",
      url: OG_IMAGE_URL,
    },
  };
}

/**
 * Homepage structured-data graph.
 *
 * Render this once on the homepage.
 */
export function siteGraph() {
  return {
    "@context": SCHEMA_CONTEXT,

    "@graph": [
      organizationSchema(),

      organizerSchema(),

      websiteSchema(),

      venueSchema(),

      eventSchema(),

      homepageSchema(),
    ],
  };
}

/**
 * Individual page structured data.
 *
 * Generates:
 * - WebPage or supported subtype
 * - BreadcrumbList
 *
 * Uses the centralized SEO title
 * and canonical URL.
 */
export function pageSchema(slug: string) {
  const clean = cleanSlug(slug);

  if (!clean) {
    return null;
  }

  const page = getSearchPage(clean);

  if (!page) {
    return null;
  }

  const url = buildPageUrl(clean);

  const pageId = `${url}#webpage`;
  const breadcrumbId = `${url}#breadcrumb`;

  const pageTitle = getPageTitle(clean);

  const breadcrumbName =
    page.crumb ?? page.title;

  const webpage = {
    "@type": page.type ?? "WebPage",

    "@id": pageId,

    url,

    name: pageTitle,

    description: page.description,

    inLanguage: "en-IN",

    isPartOf: {
      "@id": WEBSITE_ID,
    },

    about: {
      "@id": EVENT_ID,
    },

    breadcrumb: {
      "@id": breadcrumbId,
    },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",

    "@id": breadcrumbId,

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: HOME_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: breadcrumbName,
        item: url,
      },
    ],
  };

  return {
    "@context": SCHEMA_CONTEXT,

    "@graph": [
      webpage,
      breadcrumb,
    ],
  };
}

/**
 * Safely serialize JSON-LD for insertion
 * into an HTML script element.
 */
export function serializeJsonLd(
  data: unknown
): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}
