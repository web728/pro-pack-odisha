/* =========================================================================
   GALLERY PAGE (app/gallery/page.tsx)
   ========================================================================= */
import fs from "fs";
import path from "path";
import GalleryClientContent from "./GalleryClientContent";

interface GalleryImage {
  id: string;
  image: string;
}

export interface GalleryVideo {
  id: string;
  title: string;
  embedUrl: string;
}

export default function GalleryPage() {
  const dirPath = path.join(process.cwd(), "public", "gallery");
  let images: GalleryImage[] = [];

  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
      
      images = files
        .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
        .map((file, index) => ({
          id: `gallery-${index}`,
          image: `/gallery/${file}`,
        }));
    }
  } catch (error) {
    images = [];
  }

  const videos: GalleryVideo[] = [
    {
      id: "vid-1",
      title: "Highlights from Propack Odisha & Odisha Plast Int'l Expo",
      embedUrl: "https://www.youtube.com/embed/P_xB4zJoDR8?autoplay=1&mute=1&loop=1&playlist=P_xB4zJoDR8&controls=0&showinfo=0",
    }
  ];

  return <GalleryClientContent images={images} videos={videos} />;
}