import type { MetadataRoute } from "next";
import { seoUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/submission-status",
          "/test",
          "/home-cloned-127",
        ],
      },
    ],

    sitemap: `${seoUrl}/sitemap.xml`,

    host: "www.propackodisha.com",
  };
}