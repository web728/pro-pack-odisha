import type { MetadataRoute } from "next";
import { indexableRoutes, seoUrl } from "@/lib/site";

const highPriorityRoutes = new Set([
  "about",
  "about-organizers",
  "sectors",
  "exhibitors",
  "exhibitor-profile",
  "visitors",
  "visitor-profile",
  "venue",
  "exhibitor-registration",
  "visitor-registration",
  "contact-us",
]);

const mediumPriorityRoutes = new Set([
  "resources",
  "market-overview",
  "exhibitor-details",
  "gallery",
  "news",
  "she-builds",
]);

function getPriority(slug: string): number {
  if (!slug) {
    return 1;
  }

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
  if (!slug || slug === "news") {
    return "weekly";
  }

  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  return indexableRoutes.map((slug) => {
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