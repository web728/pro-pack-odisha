
/**
 * PROPACK Odisha
 * Central website and event configuration.
 *
 * Used by:
 * - Next.js metadata
 * - SEO helpers
 * - Sitemap
 * - Structured data
 * - Navigation and public pages
 */

const PRODUCTION_URL = "https://www.propackodisha.com";

function normalizeUrl(
  value: string | undefined,
  fallback = PRODUCTION_URL
): string {
  const input = value?.trim();

  if (!input) {
    return fallback;
  }

  try {
    const withProtocol = /^https?:\/\//i.test(input)
      ? input
      : `https://${input}`;

    const url = new URL(withProtocol);

    if (!["http:", "https:"].includes(url.protocol)) {
      return fallback;
    }

    if (url.username || url.password) {
      return fallback;
    }

    url.hash = "";
    url.search = "";
    url.pathname = "/";

    return url.origin;
  } catch {
    return fallback;
  }
}

/**
 * Normalize the canonical website identity.
 *
 * Always use HTTPS + WWW for the production domain.
 */
function normalizeSeoUrl(
  value: string | undefined
): string {
  const normalized = normalizeUrl(value);

  try {
    const url = new URL(normalized);

    const hostname = url.hostname.toLowerCase();

    if (
      hostname === "propackodisha.com" ||
      hostname === "www.propackodisha.com"
    ) {
      return PRODUCTION_URL;
    }

    return normalized;
  } catch {
    return PRODUCTION_URL;
  }
}

/**
 * Runtime website URL.
 *
 * This may point to another environment when configured.
 */
export const siteUrl = normalizeUrl(
  process.env.SITE_URL,
  PRODUCTION_URL
);

/**
 * Public SEO URL.
 *
 * Configure NEXT_PUBLIC_SITE_URL with the
 * canonical production domain.
 */
export const seoUrl = normalizeSeoUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL
);

/**
 * Official event information.
 */
export const event = {
  name: "PROPACK Odisha",

  fullName: "PROPACK Odisha International Expo",

  date: "25–28 February 2027",

  startDate: "2027-02-25",
  endDate: "2027-02-28",

  openingTime: "10:00",
  closingTime: "18:00",

  venue: "Bhubaneswar, Odisha",
venueName: "Bhubaneswar, Odisha",

  city: "Bhubaneswar",
  region: "Odisha",
  country: "IN",

  phones: [
    "70083 41944",
    "77518 09433",
  ],

  email: "info@propackodisha.com",

  logo: "/logo/logo-bg.png",

  ogImage: "/social-card.png",

  organizer: {
    name:
      "Odisha Assembly of Small and Medium Enterprises (OASME)",

    shortName: "OASME",

    url: "https://www.oasme.org.in",
  },

  description:
    "PROPACK Odisha International Expo 2027 brings together packaging, printing, plastics, paper, processing and green energy industries from 25–28 February 2027 at Janata Maidan, Bhubaneswar.",
};

/**
 * Actual content modification date.
 *
 * Update only when substantial website content
 * has genuinely changed.
 *
 * Do not automatically update on every deployment.
 */
export const contentUpdated = "2026-11-08";

/**
 * Exhibition industry sectors.
 *
 * Existing image filenames are preserved
 * to avoid breaking current image paths.
 */
export const sectors = [
  {
    name: "Plastic Industry",
    detail:
      "Raw materials, processing machinery, moulding and polymer solutions.",
    image: "plastic.png",
  },
  {
    name: "Printing Industry",
    detail:
      "Printing presses, inks, labels, coding and marking technologies.",
    image: "print.png",
  },
  {
    name: "Packaging Industry",
    detail:
      "Packaging machinery, materials and complete end-of-line solutions.",
    image: "packag.png",
  },
  {
    name: "Paper Industry",
    detail:
      "Pulp manufacturing, paper production, converting and finishing lines.",
    image: "paper.png",
  },
  {
    name: "Processing Industry",
    detail:
      "Processing equipment, food safety, refrigeration and storage.",
    image: "process.png",
  },
  {
    name: "Green Energy",
    detail:
      "Energy-efficiency, solar and utility solutions.",
    image: "green-energy.png",
  },
];

/**
 * Exhibitor service forms.
 *
 * Existing slugs must remain unchanged unless
 * corresponding routes and redirects are updated.
 */
export const services = [
  {
    slug: "power-requirement",
    title: "Power requirements",
    description:
      "Tell us about your machines, power phases and compressor requirements.",
  },
  {
    slug: "fasisca-name",
    title: "Fascia name",
    description:
      "Submit the exact company name to appear on your stall fascia.",
  },
  {
    slug: "exhibitor-badges",
    title: "Exhibitor badges",
    description:
      "Register up to six members of your exhibition team.",
  },
  {
    slug: "profile-for-exhibitor-directory",
    title: "Directory profile",
    description:
      "Share your company profile, logo, products and new launches.",
  },
  {
    slug: "stall-design",
    title: "Stall design",
    description:
      "Send your vendor details and stall design for organizer review.",
  },
];

/**
 * Publicly accessible website routes.
 *
 * Public accessibility does not automatically
 * mean Google indexing is enabled.
 */
export const publicRoutes: string[] = [
  "",
  "about",
  "about-organizers",
  "sectors",
  "resources",
  "brochure",
  "exhibitors",
  "exhibitor-profile",
  "participants",
  "exhibitor-details",
  "visitors",
  "visitor-profile",
  "market-overview",
  "gallery",
  "news",
  "she-builds",
  "venue",
  "privacy-policy",
  "exhibitor-registration",
  "visitor-registration",
  "contact-us",

  ...services.map((service) => service.slug),
];

/**
 * Routes intentionally eligible for indexing.
 *
 * This list is used by lib/seo.ts.
 *
 * Keep operational service forms excluded.
 */
export const indexableRoutes: string[] = [
  "",
  "about",
  "about-organizers",
  "sectors",
  "resources",
  "brochure",
  "exhibitors",
  "exhibitor-profile",
  "participants",
  "exhibitor-details",
  "visitors",
  "visitor-profile",
  "market-overview",
  "gallery",
  "news",
  "she-builds",
  "venue",
  "exhibitor-registration",
  "visitor-registration",
  "contact-us",
];

/**
 * Check whether a route is publicly accessible.
 */
export function isPublicRoute(
  slug: string
): boolean {
  const clean = slug
    .trim()
    .replace(/^\/+|\/+$/g, "");

  return publicRoutes.includes(clean);
}

/**
 * Check whether a route is intended
 * to be eligible for Google indexing.
 */
export function isIndexablePath(
  slug: string
): boolean {
  const clean = slug
    .trim()
    .replace(/^\/+|\/+$/g, "");

  return indexableRoutes.includes(clean);
}

/**
 * Build an absolute URL for a website path.
 *
 * Example:
 * getAbsoluteUrl("/exhibitors")
 * -> https://www.propackodisha.com/exhibitors
 */
export function getAbsoluteUrl(
  pathname = "/"
): string {
  const path = pathname.startsWith("/")
    ? pathname
    : `/${pathname}`;

  return new URL(path, `${seoUrl}/`).toString();
}
