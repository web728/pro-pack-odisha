/* =========================================================================
   NEWS & MEDIA PAGE (app/news/page.tsx)
   ========================================================================= */
import fs from "fs";
import path from "path";
import NewsClientContent from "./NewsClientContent";
import { newsData, pressMentions } from "@/data/newsData";

function getGalleryImagesForYear(year: string) {
  const dirPath = path.join(process.cwd(), "public", "news", year);
  try {
    if (!fs.existsSync(dirPath)) {
      return [];
    }
    const files = fs.readdirSync(dirPath);
    const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
    
    return files
      .filter((file) => imageExtensions.includes(path.extname(file).toLowerCase()))
      .map((file, index) => ({
        id: `${year}-${index}`,
        title: `Archive Image ${index + 1}`,
        image: `/news/${year}/${file}`,
        year: year,
      }));
  } catch (error) {
    return [];
  }
}

export default function NewsPage() {
  const allGalleryImages = [
    ...getGalleryImagesForYear("2027"),
    ...getGalleryImagesForYear("2026"),
    ...getGalleryImagesForYear("2025"),
    ...getGalleryImagesForYear("2024"),
    ...getGalleryImagesForYear("2023"),
  ];

  return (
    <NewsClientContent 
      allGalleryImages={allGalleryImages} 
      newsData={newsData} 
      pressMentions={pressMentions} 
    />
  );
}