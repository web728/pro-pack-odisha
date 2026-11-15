import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import GalleryClientContent from "./GalleryClientContent";
import { pageMetadata, buildPageUrl } from "@/lib/seo";
import { pageSchema, serializeJsonLd } from "@/lib/schema";

export interface GalleryImage {
  id: string;
  image: string;
  alt: string;
}

export interface GalleryVideo {
  id: string;
  title: string;
  embedUrl?: string;
  videoUrl?: string;
}

const slug = "gallery";
const galleryUrl = buildPageUrl(slug);
const mediaDirectory = path.join(process.cwd(), "public", "gallery", "optimize");
const imageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"]);
const videoExtensions = new Set([".mp4", ".webm", ".mov"]);

export const metadata: Metadata = pageMetadata(
  slug,
  "Photo & Video Gallery",
  "Explore photo galleries and video highlights from previous PROPACK Odisha exhibitions, featuring packaging, printing, plastics and processing industries."
);

// The page is generated from files in public/gallery/optimize.
// Deploy again after uploading new images or videos to that directory.
export const dynamic = "force-static";

function readableFilename(filename: string): string {
  return path.parse(filename).name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function readGallery(): { images: GalleryImage[]; videos: GalleryVideo[] } {
  let filenames: string[] = [];

  try {
    filenames = fs.readdirSync(mediaDirectory, { withFileTypes: true })
      .filter((item) => item.isFile())
      .map((item) => item.name)
      .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) {
      console.error("Unable to read gallery files:", error);
    }
  }

  const images: GalleryImage[] = [];
  const videos: GalleryVideo[] = [
    {
      id: "youtube-highlights",
      title: "Highlights from Propack Odisha & Odisha Plast Int'l Expo",
      embedUrl: "https://www.youtube-nocookie.com/embed/P_xB4zJoDR8?rel=0",
    },
  ];

  for (const filename of filenames) {
    const extension = path.extname(filename).toLowerCase();
    const fileUrl = `/gallery/optimize/${encodeURIComponent(filename)}`;
    const description = readableFilename(filename);

    if (imageExtensions.has(extension)) {
      images.push({
        id: `photo-${filename}`,
        image: fileUrl,
        alt: description ? `PROPACK Odisha exhibition photo: ${description}` : "PROPACK Odisha exhibition photo",
      });
    } else if (videoExtensions.has(extension)) {
      videos.push({
        id: `video-${filename}`,
        title: description || "PROPACK Odisha event highlights",
        videoUrl: fileUrl,
      });
    }
  }

  return { images, videos };
}

export default function GalleryPage() {
  const { images, videos } = readGallery();
  const baseSchema = pageSchema(slug);

  const structuredData = baseSchema
    ? {
        "@context": "https://schema.org",
        "@graph": [
          ...baseSchema["@graph"].map((node) => {
          if (node["@type"] === "WebPage" || node["@type"] === "CollectionPage") {
            return {
              ...node,
              "@type": "CollectionPage",
              name: "PROPACK Odisha Photo & Video Gallery",
              mainEntity: { "@id": `${galleryUrl}#media-collection` },
            };
          }
          return node;
          }),
          {
            "@type": "ItemList",
            "@id": `${galleryUrl}#media-collection`,
            name: "PROPACK Odisha exhibition photos and videos",
            numberOfItems: images.length + videos.length,
            itemListElement: [
              ...images.map((item, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: item.alt,
                url: new URL(item.image, galleryUrl).href,
              })),
              ...videos.map((item, index) => ({
                "@type": "ListItem",
                position: images.length + index + 1,
                name: item.title,
                url: item.videoUrl
                  ? new URL(item.videoUrl, galleryUrl).href
                  : "https://www.youtube.com/watch?v=P_xB4zJoDR8",
              })),
            ],
          },
        ],
      }
    : null;

  return (
    <>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        />
      )}
      <GalleryClientContent images={images} videos={videos} />
    </>
  );
}
