/* =========================================================================
   GALLERY CLIENT CONTENT (app/gallery/GalleryClientContent.tsx)
   ========================================================================= */
"use client";

import { useState } from "react";
import { 
  Maximize2, 
  Download, 
  X, 
  Video as VideoIcon,
  Play
} from "lucide-react";
import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";
import { GalleryVideo } from "./page";

interface GalleryImage {
  id: string;
  image: string;
}

interface GalleryClientProps {
  images: GalleryImage[];
  videos: GalleryVideo[];
}

export default function GalleryClientContent({ images, videos }: GalleryClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Header Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Eyebrow>Visual & Video Archives</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              PROPACK Odisha <br />
              <span className="text-[#EB622F]">
                Official Gallery.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              Explore live event snapshots and highlights from Janata Maidan, Bhubaneswar.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* 2. Autoplay Video Highlights Section */}
      {videos.length > 0 && (
        <RevealSection className="border-b border-[var(--border)] bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <VideoIcon size={20} className="text-[#EB622F]" />
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1F3864]">
                Event Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {videos.map((video) => (
                <div 
                  key={video.id}
                  className="group relative overflow-hidden rounded-2xl border-2 border-[var(--border)] bg-black shadow-lg"
                >
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={video.embedUrl}
                      title={video.title}
                      className="absolute inset-0 h-full w-full border-0 pointer-events-none"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 bg-[#1F3864] text-white flex items-center justify-between">
                    <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold line-clamp-1">
                      {video.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#EB622F] px-2.5 py-1 text-xs font-bold text-white shadow-sm shrink-0">
                      <Play size={10} fill="white" /> Live
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      {/* 3. Clean Minimalist Image Grid Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage(item.image)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-white cursor-pointer shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt="Gallery Archive"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <div className="rounded-full bg-white/90 p-3 shadow-lg backdrop-blur-xs text-[#1F3864] transition-transform group-hover:scale-110">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
              <p className="text-base font-semibold text-[#1F3864]">No photos found inside <code className="text-[#EB622F]">public/gallery/</code></p>
              <p className="mt-2 text-sm text-gray-500">
                Please place your images directly inside the `public/gallery/` folder.
              </p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* --- CLEAN IMAGE LIGHTBOX MODAL (Enlarge & Download) --- */}
      {activeImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveImage(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end px-4 py-3 border-b border-[var(--border)] bg-[#f7f8f7]">
              <button 
                onClick={() => setActiveImage(null)}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-200 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative w-full h-[70vh] bg-black/5 flex items-center justify-center p-4">
              <img 
                src={activeImage} 
                alt="Enlarged Archive"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end px-6 py-4 border-t border-[var(--border)] bg-white gap-3">
              <a 
                href={activeImage} 
                download 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#EB622F] px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#d55524] transition-colors"
              >
                <Download size={16} />
                Download Image
              </a>
              <button 
                onClick={() => setActiveImage(null)}
                className="rounded-xl border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3864] hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}