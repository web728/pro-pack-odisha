
import fs from "node:fs";
import path from "node:path";
import GalleryClientContent from "./GalleryClientContent";

export interface GalleryImage {
  id: string;
  image: string;
}

export interface GalleryVideo {
  id: string;
  title: string;
  embedUrl?: string;
  videoUrl?: string;
}

export default function GalleryPage() {
  const dirPath = path.join(
    process.cwd(),
    "public",
    "gallery",
    "optimize"
  );

  let images: GalleryImage[] = [];
  let videos: GalleryVideo[] = [];

  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).sort();

      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp",
        ".avif",
        ".gif"
      ];

      const videoExtensions = [
        ".mp4",
        ".webm",
        ".mov"
      ];

      images = files
        .filter((file) =>
          imageExtensions.includes(
            path.extname(file).toLowerCase()
          )
        )
        .map((file, index) => ({
          id: `gallery-${index}`,
          image: `/gallery/optimize/${encodeURIComponent(file)}`
        }));

      videos = files
        .filter((file) =>
          videoExtensions.includes(
            path.extname(file).toLowerCase()
          )
        )
        .map((file, index) => ({
          id: `local-video-${index}`,
          title: path.parse(file).name
            .replace(/[-_]/g, " "),
          videoUrl: `/gallery/optimize/${encodeURIComponent(file)}`
        }));
    }
  } catch (error) {
    console.error("Gallery loading failed:", error);
  }

  // Existing YouTube video
  videos.unshift({
    id: "youtube-highlights",
    title:
      "Highlights from Propack Odisha & Odisha Plast Int'l Expo",
    embedUrl:
      "https://www.youtube.com/embed/P_xB4zJoDR8?autoplay=1&mute=1&loop=1&playlist=P_xB4zJoDR8&controls=0"
  });

  return (
    <GalleryClientContent
      images={images}
      videos={videos}
    />
  );
}
