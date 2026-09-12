import { seoUrl } from "@/lib/site";
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/view-pass",
        "/submission-status",
        "/test",
        "/home-cloned-127",
      ],
    },
    sitemap: `${seoUrl}/sitemap.xml`,
  };
}
