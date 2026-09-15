import { forms } from "@/lib/forms";

export const contentPages = {
  sectors: {
    label: "Exhibition sectors",
    title: "Five sectors. One connected industry.",
    description:
      "Explore packaging, printing, plastics, food processing and engineering technologies at Propack Odisha International Expo.",
  },
  resources: {
    label: "Resources",
    title: "Useful information. In one place.",
    description:
      "Find the archived brochure, exhibitor services and visitor planning information for Propack Odisha.",
  },
  about: {
    label: "About the expo",
    title: "A platform for industry. A place for opportunity.",
    description:
      "Propack Odisha brings printing, packaging, plastics and allied industries together to explore technology, exchange ideas and do business.",
  },
  exhibitors: {
    label: "Exhibitors",
    title: "Bring your innovation to the right audience.",
    description:
      "Showcase your products, connect with industry professionals and build business relationships at Propack Odisha 2027.",
  },
  visitors: {
    label: "Visitors",
    title: "Discover solutions. Meet your next partner.",
    description:
      "Explore the products, technologies and people shaping the future of packaging, printing and allied industries.",
  },
  "about-organizers": {
    label: "About OASME",
    title: "Experience that brings industries together.",
    description:
      "Meet OASME, the organization behind Propack Odisha International Expo.",
  },
  "market-overview": {
    label: "Market overview",
    title: "Explore the opportunity in Odisha.",
    description:
      "A meeting point for the plastics, packaging and manufacturing value chains of eastern India.",
  },
  "exhibitor-details": {
    label: "Exhibitor service centre",
    title: "Everything your exhibition team needs.",
    description:
      "Prepare for Propack Odisha with a dedicated service centre for your stall, team and company profile.",
  },
  "privacy-policy": {
    label: "Privacy policy",
    title: "Your information, handled with care.",
    description:
      "How this website uses the information you submit to the Propack Odisha team.",
  },
} as const;

export type ContentPageSlug = keyof typeof contentPages;

export function formLabel(slug: string) {
  if (!(slug in forms)) return slug;
  if (slug === "fasisca-name") return "Fascia name";
  return slug
    .replaceAll("-", " ")
    .replace(/^./, (letter) => letter.toUpperCase());
}
