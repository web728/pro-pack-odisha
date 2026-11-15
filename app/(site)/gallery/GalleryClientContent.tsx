"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Images,
  Maximize2,
  Play,
  X,
} from "lucide-react";

import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";
import type { GalleryImage, GalleryVideo } from "./page";

interface GalleryClientProps {
  images: GalleryImage[];
  videos: GalleryVideo[];
}

type MediaTab = "photos" | "videos";

const PHOTO_BATCH = 9;
const VIDEO_BATCH = 6;

export default function GalleryClientContent({
  images,
  videos,
}: GalleryClientProps) {
  const [activeTab, setActiveTab] = useState<MediaTab>("photos");
  const [visiblePhotos, setVisiblePhotos] = useState(PHOTO_BATCH);
  const [visibleVideos, setVisibleVideos] = useState(VIDEO_BATCH);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
  const [playingEmbeds, setPlayingEmbeds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightboxOpen = activeImageIndex !== null;

  const closeImage = useCallback(() => setActiveImageIndex(null), []);

  const goToImage = useCallback(
    (direction: -1 | 1) => {
      setActiveImageIndex((previous) => {
        if (previous === null || images.length === 0) return previous;
        return (previous + direction + images.length) % images.length;
      });
    },
    [images.length]
  );

  useEffect(() => {
    if (!isLightboxOpen) return;

    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeImage();
      if (event.key === "ArrowLeft") goToImage(-1);
      if (event.key === "ArrowRight") goToImage(1);

      if (event.key === "Tab") {
        const dialog = closeRef.current?.closest('[role="dialog"]');
        if (!dialog) return;
        const controls = Array.from(
          dialog.querySelectorAll<HTMLButtonElement>("button:not([disabled])")
        );
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      window.removeEventListener("keydown", onKeyDown);
      lastTriggerRef.current?.focus();
    };
  }, [isLightboxOpen, closeImage, goToImage]);

  function openImage(index: number, trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setActiveImageIndex(index);
  }

  function switchTab(nextTab: MediaTab) {
    setActiveTab(nextTab);
    if (nextTab === "photos") setPlayingEmbeds([]);
  }

  const activeImage =
    activeImageIndex === null ? null : images[activeImageIndex] ?? null;

  return (
    // Outer padding: header aur footer se gap yahin se aata hai
    <main className="min-h-screen bg-white px-0 pb-20 pt-20 sm:pb-24 sm:pt-24 lg:pb-32 lg:pt-32">
      <RevealSection className="border-y border-[var(--border)] bg-[#f7f8f7] py-12 sm:py-14 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow>Visual &amp; Video Archives</Eyebrow>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              PROPACK Odisha <span className="text-[#EB622F]">Official Gallery</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Explore event photographs and video highlights from PROPACK Odisha exhibitions in Bhubaneswar.
            </p>
          </header>

          <div className="mt-9 flex w-full justify-center sm:mt-10">
            <div
              role="group"
              aria-label="Choose gallery media type"
              className="inline-flex items-center justify-center gap-1 rounded-xl border border-[var(--border)] bg-white p-1 shadow-sm"
            >
              <button
                type="button"
                aria-pressed={activeTab === "photos"}
                onClick={() => switchTab("photos")}
                className={`inline-flex min-w-[118px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F] sm:min-w-36 ${
                  activeTab === "photos"
                    ? "bg-[#1F3864] !text-white"
                    : "text-[#1F3864] hover:bg-[#f7f8f7]"
                }`}
              >
                <Images size={16} aria-hidden="true" />
                Photos
              </button>
              <button
                type="button"
                aria-pressed={activeTab === "videos"}
                onClick={() => switchTab("videos")}
                className={`inline-flex min-w-[118px] items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F] sm:min-w-36 ${
                  activeTab === "videos"
                    ? "bg-[#1F3864] !text-white"
                    : "text-[#1F3864] hover:bg-[#f7f8f7]"
                }`}
              >
                <Clapperboard size={16} aria-hidden="true" />
                Videos
              </button>
            </div>
          </div>
        </div>
      </RevealSection>

      {activeTab === "photos" ? (
        <RevealSection className="bg-white py-12 sm:py-14 lg:py-16">
          <section
            aria-label="PROPACK Odisha event photo gallery"
            className="container mx-auto max-w-7xl px-4 sm:px-6"
          >
            {images.length > 0 ? (
              <>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                  {images.slice(0, visiblePhotos).map((item, index) => (
                    <li key={item.id} className="min-w-0">
                      <button
                        type="button"
                        onClick={(event) => openImage(index, event.currentTarget)}
                        aria-label={`Open ${item.alt}`}
                        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-xl border border-[var(--border)] bg-[#f7f8f7] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.alt}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        >
                          <span className="rounded-full bg-white/90 p-2.5 text-[#1F3864] shadow-sm">
                            <Maximize2 size={16} />
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                {visiblePhotos < images.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisiblePhotos((count) => count + PHOTO_BATCH)
                      }
                      className="rounded-lg border border-[#1F3864] bg-white px-6 py-2.5 text-sm font-semibold text-[#1F3864] transition-colors hover:bg-[#1F3864] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                    >
                      View More Photos
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-8 text-center text-sm text-[#1F3864]">
                Gallery photos are not available yet.
              </p>
            )}
          </section>
        </RevealSection>
      ) : (
        <RevealSection className="bg-white py-12 sm:py-14 lg:py-16">
          <section
            aria-label="PROPACK Odisha event video highlights"
            className="container mx-auto max-w-7xl px-4 sm:px-6"
          >
            {videos.length > 0 ? (
              <>
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                  {videos.slice(0, visibleVideos).map((video) => {
                    const embedPlaying = playingEmbeds.includes(video.id);
                    return (
                      <li key={video.id} className="min-w-0">
                        <div className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[#14264a] transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-md">
                          <div className="relative aspect-video w-full">
                            {video.videoUrl ? (
                              <video
                                src={video.videoUrl}
                                className="absolute inset-0 h-full w-full object-contain"
                                controls
                                playsInline
                                preload="none"
                              />
                            ) : video.embedUrl ? (
                              embedPlaying ? (
                                <iframe
                                  src={`${video.embedUrl}${
                                    video.embedUrl.includes("?") ? "&" : "?"
                                  }autoplay=1&mute=1`}
                                  title="Video player"
                                  className="absolute inset-0 h-full w-full border-0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                  allowFullScreen
                                  referrerPolicy="strict-origin-when-cross-origin"
                                />
                              ) : (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPlayingEmbeds((current) =>
                                      current.includes(video.id)
                                        ? current
                                        : [...current, video.id]
                                    )
                                  }
                                  aria-label="Play video"
                                  className="absolute inset-0 flex h-full w-full items-center justify-center text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#EB622F]"
                                >
                                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EB622F] shadow-md">
                                    <Play
                                      size={24}
                                      fill="currentColor"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </button>
                              )
                            ) : null}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {visibleVideos < videos.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleVideos((count) => count + VIDEO_BATCH)
                      }
                      className="rounded-lg border border-[#1F3864] bg-white px-6 py-2.5 text-sm font-semibold text-[#1F3864] transition-colors hover:bg-[#1F3864] hover:!text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                    >
                      View More Videos
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-8 text-center text-sm text-[#1F3864]">
                Gallery videos are not available yet.
              </p>
            )}
          </section>
        </RevealSection>
      )}

      {/* Lightbox: center me fixed size panel, cross + previous/next arrows */}
      {mounted &&
        activeImage &&
        createPortal(
          <div
            className="fixed inset-0 flex items-center justify-center bg-black/80 p-4"
            style={{ zIndex: 2147483000 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeImage();
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Gallery photo preview"
              className="relative flex h-[65vh] w-[92vw] max-w-4xl items-center justify-center sm:h-[70vh]"
              onClick={(event) => {
                if (event.target === event.currentTarget) closeImage();
              }}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={closeImage}
                aria-label="Close photo preview"
                className="absolute -top-12 right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X size={22} aria-hidden="true" />
              </button>

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => goToImage(-1)}
                  aria-label="Previous photo"
                  className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white sm:left-3 sm:h-12 sm:w-12"
                >
                  <ChevronLeft size={26} aria-hidden="true" />
                </button>
              )}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeImage.id}
                src={activeImage.image}
                alt={activeImage.alt}
                className="max-h-full max-w-full select-none rounded-lg object-contain shadow-2xl"
                draggable={false}
              />

              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => goToImage(1)}
                  aria-label="Next photo"
                  className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-white sm:right-3 sm:h-12 sm:w-12"
                >
                  <ChevronRight size={26} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}