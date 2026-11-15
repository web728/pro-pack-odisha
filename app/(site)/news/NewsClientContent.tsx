"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Download,
  ExternalLink,
  Images,
  Maximize2,
  Newspaper,
  X,
} from "lucide-react";

import { Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";
import type { Article, MediaMention } from "@/data/newsData";

type GalleryImage = {
  id: string;
  title: string;
  image: string;
  year: string;
};

type NewsClientProps = {
  allGalleryImages: GalleryImage[];
  newsData: Record<string, Article[]>;
  pressMentions: MediaMention[];
};

type ArchiveTab = "photos" | "press";

export default function NewsClientContent({
  allGalleryImages,
  pressMentions,
}: NewsClientProps) {
  const [activeTab, setActiveTab] = useState<ArchiveTab>("photos");
  const [selectedYear, setSelectedYear] = useState("All");
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const years = useMemo(
    () => [...new Set(allGalleryImages.map((image) => image.year))].sort((a, b) => b.localeCompare(a)),
    [allGalleryImages]
  );

  const currentGallery = useMemo(
    () =>
      selectedYear === "All"
        ? allGalleryImages
        : allGalleryImages.filter((image) => image.year === selectedYear),
    [allGalleryImages, selectedYear]
  );

  useEffect(() => {
    if (!activeImage) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveImage(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeImage]);

  return (
    <main className="min-h-screen bg-white">
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] pb-12 pt-16 lg:pb-16 lg:pt-24">
        <div className="container mx-auto px-4 sm:px-6">
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow>Media Center &amp; Press Updates</Eyebrow>
            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Latest News, Press Releases
              <span className="block text-[#EB622F]">&amp; Media Archives.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              Explore official announcements, event photo galleries, and extensive media coverage from leading publications.
            </p>
          </header>

          {/* One central switch replaces two separate archive sections. */}
          <nav aria-label="Media archive view" className="mt-9 flex justify-center">
            <div className="inline-flex max-w-full items-center gap-1 rounded-full border border-[var(--border)] bg-white p-1.5 shadow-sm">
              <button
                type="button"
                aria-pressed={activeTab === "photos"}
                onClick={() => setActiveTab("photos")}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                  activeTab === "photos"
                    ? "bg-[#1F3864] text-white"
                    : "text-[#1F3864] hover:bg-[#f7f8f7]"
                }`}
              >
                <Images size={17} aria-hidden="true" />
                Photo Gallery
              </button>
              <button
                type="button"
                aria-pressed={activeTab === "press"}
                onClick={() => setActiveTab("press")}
                className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors sm:px-6 ${
                  activeTab === "press"
                    ? "bg-[#1F3864] text-white"
                    : "text-[#1F3864] hover:bg-[#f7f8f7]"
                }`}
              >
                <Newspaper size={17} aria-hidden="true" />
                Press Coverage
              </button>
            </div>
          </nav>
        </div>
      </RevealSection>

      <div hidden={activeTab !== "photos"}>
        <RevealSection className="border-b border-[var(--border)] bg-white py-12 lg:py-16">
          <section aria-labelledby="photo-archive-heading" className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h2 id="photo-archive-heading" className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1F3864] sm:text-3xl">
                  Event Photo Gallery
                </h2>
               
              </div>
 
            </div>

            {currentGallery.length > 0 ? (
              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {currentGallery.map((item) => (
                  <li key={item.id} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => setActiveImage(item)}
                      aria-label={`View PROPACK Odisha photo from ${item.year}`}
                      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[#f7f8f7] text-left shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <span className="rounded-full bg-white/90 p-3 text-[#1F3864] shadow-lg backdrop-blur-xs">
                          <Maximize2 size={18} />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[#f7f8f7] px-5 py-12 text-center">
                <p className="text-sm font-medium text-[#1F3864]">No photos available for this selection.</p>
              </div>
            )}
          </section>
        </RevealSection>
      </div>
      <div hidden={activeTab !== "press"}>
        <RevealSection className="border-b border-[var(--border)] bg-white py-12 lg:py-16">
          <section aria-labelledby="press-archive-heading" className="container mx-auto px-4 sm:px-6">
            <div className="mb-8 max-w-3xl">
              <h2 id="press-archive-heading" className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1F3864] sm:text-3xl">
                Media Coverage &amp; Press Mentions
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-foreground,#4b5563)]">
                News reports and external media links covering PROPACK Odisha and previous editions.
              </p>
            </div>

            {pressMentions.length > 0 ? (
              <ul className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
                {pressMentions.map((item) => (
                  <li key={item.id} className="min-w-0">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full min-h-[190px] flex-col justify-between rounded-2xl border border-[var(--border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB622F]"
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-xs">
                          <span className="font-bold text-[#15A7AE]">{item.source}</span>
                         
                        </div>
                        <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold leading-snug text-[#1F3864] transition-colors group-hover:text-[#EB622F]">
                          {item.title}
                        </h3>
                      </div>
                      <span className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--border)] pt-4 text-sm font-semibold text-[#1F3864]">
                        Read coverage
                        <ExternalLink size={17} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-[var(--border)] bg-[#f7f8f7] px-5 py-12 text-center">
                <p className="text-sm font-medium text-[#1F3864]">No media links available yet.</p>
              </div>
            )}
          </section>
        </RevealSection>
      </div>

      {activeImage && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
          onClick={() => setActiveImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`PROPACK Odisha archive image, ${activeImage.year}`}
            className="relative flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex justify-end border-b border-[var(--border)] bg-[#f7f8f7] px-4 py-3">
              <button
                type="button"
                onClick={() => setActiveImage(null)}
                aria-label="Close image"
                className="rounded-full p-2 text-[#1F3864] transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#EB622F]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="relative h-[65vh] w-full bg-black/5 sm:h-[70vh]">
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-contain p-4"
              />
            </div>
            <div className="flex flex-wrap justify-end gap-3 border-t border-[var(--border)] bg-white px-5 py-4">
              <a
                href={activeImage.image}
                download
                className="inline-flex items-center gap-2 rounded-xl bg-[#EB622F] px-5 py-2.5 text-sm font-semibold !text-white transition-colors hover:bg-[#d55524]"
              >
                <Download size={16} aria-hidden="true" />
                Download image
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
