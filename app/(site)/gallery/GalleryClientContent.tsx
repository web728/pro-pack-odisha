
"use client";

import { useEffect, useState } from "react";
import {
  Maximize2,
  Download,
  X,
  Video as VideoIcon,
  Play,
} from "lucide-react";

import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

import type { GalleryImage, GalleryVideo } from "./page";

interface GalleryClientProps {
  images: GalleryImage[];
  videos: GalleryVideo[];
}

export default function GalleryClientContent({
  images,
  videos,
}: GalleryClientProps) {
  const [activeImage, setActiveImage] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!activeImage) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [activeImage]);

  return (
    <main className="min-h-screen bg-white">
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
              Explore live event snapshots and highlights from
              Bhubaneswar.
            </p>
          </div>
        </div>
      </RevealSection>

      {videos.length > 0 && (
        <RevealSection className="border-b border-[var(--border)] bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <VideoIcon
                size={20}
                className="text-[#EB622F]"
              />

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
                    {video.videoUrl ? (
                      <video
                        src={video.videoUrl}
                        className="absolute inset-0 h-full w-full object-contain"
                        controls
                        playsInline
                        preload="metadata"
                      >
                        Your browser does not support video
                        playback.
                      </video>
                    ) : video.embedUrl ? (
                      <iframe
                        src={video.embedUrl}
                        title={video.title}
                        className="absolute inset-0 h-full w-full border-0"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                      />
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 bg-[#1F3864] p-4 text-white">
                    <h3 className="line-clamp-1 font-[family-name:var(--font-heading)] text-sm font-bold">
                      {video.title}
                    </h3>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#EB622F] px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                      <Play
                        size={10}
                        fill="white"
                      />
                      Watch
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      )}

      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          {images.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveImage(item.image)}
                  aria-label="View gallery image"
                  className="group relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-2xl border border-[var(--border)] bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                >
                  <img
                    src={item.image}
                    alt="PROPACK Odisha Event Gallery"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <div className="rounded-full bg-white/90 p-3 text-[#1F3864] shadow-lg backdrop-blur-xs transition-transform group-hover:scale-110">
                      <Maximize2 size={18} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-[var(--border)] bg-white p-12 text-center">
              <p className="text-base font-semibold text-[#1F3864]">
                No gallery images available.
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Images will appear here once they are available.
              </p>
            </div>
          )}
        </div>
      </RevealSection>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-end border-b border-[var(--border)] bg-[#f7f8f7] px-4 py-3">
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                aria-label="Close image preview"
                className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex h-[70vh] w-full items-center justify-center bg-black/5 p-4">
              <img
                src={activeImage}
                alt="Enlarged PROPACK Odisha Gallery"
                decoding="async"
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-[var(--border)] bg-white px-4 py-4 sm:px-6">
              <a
                href={activeImage}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-[#EB622F] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#d55524]"
              >
                <Download size={16} />
                Download Image
              </a>

              <button
                type="button"
                onClick={() => setActiveImage(null)}
                className="rounded-xl border border-[var(--border)] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F3864] transition-colors hover:bg-gray-100"
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
