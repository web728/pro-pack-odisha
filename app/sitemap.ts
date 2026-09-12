import type { MetadataRoute } from "next";
import { publicRoutes, seoUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes
    .filter((x) => x !== "view-pass")
    .map((slug) => ({
      url: `${seoUrl}/${slug}`,
      changeFrequency: "monthly",
      priority: slug ? 0.7 : 1,
    }));
}
