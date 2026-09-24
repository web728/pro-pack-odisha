/* =========================================================================
   NEWS CLIENT CONTENT COMPONENT (app/news/NewsClientContent.tsx)
   ========================================================================= */
"use client";

import { useState } from "react";
import { 
  CalendarDays, 
  ArrowUpRight, 
  Tag,
  ExternalLink,
  Newspaper,
  Maximize2,
  Download,
  X,
  Image as ImageIcon
} from "lucide-react";
import { Button, TextLink, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";
import { Article, MediaMention } from "@/data/newsData";

interface GalleryImage {
  id: string;
  title: string;
  image: string;
  year: string;
}

interface NewsClientProps {
  allGalleryImages: GalleryImage[];
  newsData: Record<string, Article[]>;
  pressMentions: MediaMention[];
}

export default function NewsClientContent({ allGalleryImages, newsData, pressMentions }: NewsClientProps) {
  const [selectedYear, setSelectedYear] = useState<string>("All");
  const [activeImage, setActiveImage] = useState<{ src: string; title: string } | null>(null);

  // Filter gallery based on dropdown selection ("All" shows everything)
  const currentGallery = selectedYear === "All" 
    ? allGalleryImages 
    : allGalleryImages.filter((img) => img.year === selectedYear);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Header Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2">
              <Eyebrow>Media Center & Press Updates</Eyebrow>
            </div>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Latest News, Press Releases <br />
              <span className="text-[#EB622F]">
                &amp; Media Archives.
              </span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              Explore official announcements, event photo galleries, and extensive media coverage from leading publications.
            </p>
          </div>

          {/* Clean Dropdown Filter Bar */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-8">
            <label htmlFor="year-select" className="text-sm font-semibold text-[#1F3864]">
              Filter Archive Year:
            </label>
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-[var(--border)] bg-white px-4 py-2.5 text-sm font-semibold text-[#1F3864] shadow-xs outline-none transition-all focus:border-[#EB622F]"
            >
              <option value="All">All Years </option>
              <option value="2027">2027</option>
              <option value="2026">2026</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
        </div>
      </RevealSection>

      {/* 2. Automatic Image Gallery Section */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#15A7AE]">
              <ImageIcon size={14} /> Photo Gallery Archive
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1F3864]">
              Event Visual Highlights {selectedYear !== "All" ? `(${selectedYear})` : ""}
            </h2>
            <p className="mt-2 text-base text-[var(--muted-foreground,#4b5563)]">
              Click any image to view in full screen or download.
            </p>
          </div>

          {currentGallery.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {currentGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveImage({ src: item.image, title: item.title })}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[#f7f8f7] cursor-pointer shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={item.title}
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
            <div className="rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-12 text-center">
              <p className="text-base font-semibold text-[#1F3864]">No photos found for the selected year.</p>
            </div>
          )}
        </div>
      </RevealSection>

      {/* 3. Press Coverage & Media Mentions Section */}
      <RevealSection className="border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#15A7AE]">Press Archive</span>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold text-[#1F3864] sm:text-4xl">
              Media Coverage &amp; Press Mentions
            </h2>
            <p className="mt-3 text-base text-[var(--muted-foreground,#4b5563)]">
              Verified news reports and external media links covering PROPACK Odisha and Odisha Plast editions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pressMentions.map((item) => (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between rounded-2xl border-2 border-[var(--border)] bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#EB622F] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-[#1F3864]/5 px-3 py-1 text-xs font-bold text-[#1F3864] border border-[#1F3864]/10">
                      <Newspaper size={13} className="text-[#15A7AE]" />
                      {item.source}
                    </span>
                    <span className="text-xs font-medium text-[var(--muted,#6b7280)]">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-bold text-[#1F3864] group-hover:text-[#EB622F] transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4 text-sm font-bold text-[#15A7AE] group-hover:text-[#EB622F]">
                  <span className="underline underline-offset-4">Read Full Coverage</span>
                  <ExternalLink size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* --- IMAGE LIGHTBOX MODAL (Enlarge & Download) --- */}
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
                src={activeImage.src} 
                alt={activeImage.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="flex items-center justify-end px-6 py-4 border-t border-[var(--border)] bg-white gap-3">
              <a 
                href={activeImage.src} 
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