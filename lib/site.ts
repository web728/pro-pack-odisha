export const event = {
  name: "PROPACK Odisha",
  fullName: "PROPACK Odisha International Expo",
  date: "25–28 February 2027",
  startDate: "2027-02-25",
  endDate: "2027-02-28",
  openingTime: "10:00",
  closingTime: "18:00",
  venue: "Janata Maidan, Bhubaneswar, Odisha",
  phones: ["70083 41944", "77518 09433"],
  description:
    "Connect with the plastic, printing, packaging, food processing and engineering industries at PROPACK Odisha, 25–28 February 2027 in Bhubaneswar.",
};

const defaultSiteUrl = "https://www.propackodisha.com";

function normalizeUrl(url: string) {
  let normalized = url.trim();

  // Add protocol if missing
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  // Remove trailing slashes
  normalized = normalized.replace(/\/+$/, "");

  return normalized;
}

function normalizeSeoUrl(url: string) {
  const normalized = normalizeUrl(url);

  try {
    const parsed = new URL(normalized);

    // Keep one canonical production host
    if (
      parsed.hostname === "propackodisha.com" ||
      parsed.hostname === "www.propackodisha.com"
    ) {
      parsed.protocol = "https:";
      parsed.hostname = "www.propackodisha.com";
      parsed.port = "";
      parsed.pathname = "";

      return parsed.toString().replace(/\/+$/, "");
    }

    return normalized;
  } catch {
    return defaultSiteUrl;
  }
}

export const siteUrl = normalizeUrl(
  process.env.SITE_URL || defaultSiteUrl
);

// Canonical SEO identity of the public website
export const seoUrl = normalizeSeoUrl(
  process.env.NEXT_PUBLIC_SITE_URL || defaultSiteUrl
);

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
 * All publicly accessible routes.
 *
 * Operational service forms can be publicly accessible
 * while still being excluded from Google indexing.
 */
export const publicRoutes = [
  "",
  "about",
  "about-organizers",
  "sectors",
  "resources",
  "exhibitors",
  "exhibitor-profile",
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
 * Routes we intentionally want Google to discover/index.
 *
 * Internal exhibitor-service forms are NOT included here.
 */
export const indexableRoutes = [
  "",
  "about",
  "about-organizers",
  "sectors",
  "resources",
  "exhibitors",
  "exhibitor-profile",
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