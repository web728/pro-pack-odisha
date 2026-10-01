import type { MetadataRoute } from "next";
import { publicRoutes, seoUrl } from "@/lib/site";

const excludedRoutes = new Set([
  "view-pass",
  "privacy-policy",
]);

const highPriorityRoutes = new Set([
  "about",
  "sectors",
  "exhibitors",
  "visitors",
  "exhibitor-registration",
  "visitor-registration",
  "about-organizers",
  "contact-us",
]);

const mediumPriorityRoutes = new Set([
  "resources",
  "market-overview",
  "exhibitor-details",
  "brochure",
]);

function getPriority(slug: string): number {
  if (!slug) return 1;

  if (highPriorityRoutes.has(slug)) {
    return 0.9;
  }

  if (mediumPriorityRoutes.has(slug)) {
    return 0.8;
  }

  return 0.6;
}

function getChangeFrequency(
  slug: string
): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (!slug) {
    return "weekly";
  }

  if (
    highPriorityRoutes.has(slug) ||
    mediumPriorityRoutes.has(slug)
  ) {
    return "monthly";
  }

  return "yearly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes
    .filter((slug) => !excludedRoutes.has(slug))
    .map((slug) => {
      const url = slug
        ? `${seoUrl}/${slug}`
        : `${seoUrl}/`;

      return {
        url,
        changeFrequency: getChangeFrequency(slug),
        priority: getPriority(slug),
      };
    });
}