import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import NewsClientContent from "./NewsClientContent";
import { newsData, pressMentions } from "@/data/newsData";
import { pageMetadata, buildPageUrl } from "@/lib/seo";
import { pageSchema, serializeJsonLd } from "@/lib/schema";

const slug = "news";
const years = ["2027", "2026", "2025", "2024", "2023"] as const;
const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);

export const metadata: Metadata = pageMetadata(
  slug,
  "News, Media Coverage & Photo Gallery",
  "Explore PROPACK Odisha event photo archives, press coverage and media updates from previous editions and the upcoming 2027 exhibition in Bhubaneswar."
);

type GalleryImage = {
  id: string;
  title: string;
  image: string;
  year: string;
};

function getGalleryImagesForYear(year: string): GalleryImage[] {
  const folder = path.join(process.cwd(), "public", "news", year);

  try {
    if (!fs.existsSync(folder)) return [];

    return fs.readdirSync(folder, { withFileTypes: true })
      .filter(
        (entry) =>
          entry.isFile() && validExtensions.has(path.extname(entry.name).toLowerCase())
      )
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((filename) => ({
        id: `${year}-${filename}`,
        title: `PROPACK Odisha exhibition photo archive, ${year}`,
        image: `/news/${year}/${encodeURIComponent(filename)}`,
        year,
      }));
  } catch {
    // The news page remains functional if a year's archive directory is missing.
    return [];
  }
}

export default function NewsPage() {
  const allGalleryImages = years.flatMap(getGalleryImagesForYear);
  const baseSchema = pageSchema(slug);
  const pageUrl = buildPageUrl(slug);
  const mediaListId = `${pageUrl}#media-coverage`;

  const coverageList = {
    "@type": "ItemList",
    "@id": mediaListId,
    name: "PROPACK Odisha press coverage and media mentions",
    numberOfItems: pressMentions.length,
    itemListElement: pressMentions.map((mention, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: mention.title,
      url: mention.link,
    })),
  };

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...baseSchema["@graph"].map((node) =>
            node["@type"] === "WebPage" || node["@type"] === "CollectionPage"
              ? {
                  ...node,
                  "@type": "CollectionPage",
                  ...(pressMentions.length > 0
                    ? { mainEntity: { "@id": mediaListId } }
                    : {}),
                }
              : node
          ),
          ...(pressMentions.length > 0 ? [coverageList] : []),
        ],
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(structuredData),
          }}
        />
      )}

      <NewsClientContent
        allGalleryImages={allGalleryImages}
        newsData={newsData}
        pressMentions={pressMentions}
      />
    </>
  );
}
