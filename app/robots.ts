
import type { MetadataRoute } from "next";
import { seoUrl } from "@/lib/site";

/**
 * PROPACK Odisha — Search Engine Crawling Rules
 *
 * Public pages and essential rendering assets
 * remain accessible to search engines.
 *
 * Sensitive resources require authentication.
 * robots.txt is not a security mechanism.
 */

const blockedPaths = [
  "/api/",
  "/submission-status",
  "/test",
  "/home-cloned-127",
];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = seoUrl.replace(/\/+$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: blockedPaths,
    },

    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
