
import type { MetadataRoute } from "next";

import { indexableRoutes } from "@/lib/site";
import {
  buildPageUrl,
  getSearchPage,
  isIndexableRoute,
} from "@/lib/seo";

/**
 * Verified page modification dates.
 *
 * Add a route here only when its actual
 * last significant content update is known.
 *
 * Example:
 * about: "2026-11-08"
 */
const verifiedLastModified: Record<string, string> = {};

/**
 * Return a valid modification date only when
 * the date has been explicitly verified.
 */
function getLastModified(
  slug: string
): Date | undefined {
  const value = verifiedLastModified[slug];

  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  if (date.getTime() > Date.now()) {
    return undefined;
  }

  return date;
}

/**
 * Generate the public XML sitemap.
 *
 * Only explicitly indexable, configured
 * routes are included.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const uniqueRoutes = Array.from(
    new Set(
      indexableRoutes.map((slug) =>
        slug.trim().replace(/^\/+|\/+$/g, "")
      )
    )
  );

  return uniqueRoutes
    .filter((slug) => {
      return (
        Boolean(getSearchPage(slug)) &&
        isIndexableRoute(slug)
      );
    })
    .map((slug) => {
      const url = buildPageUrl(slug);
      const lastModified = getLastModified(slug);

      return {
        url,
        ...(lastModified ? { lastModified } : {}),
      };
    });
}
