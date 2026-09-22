"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ChevronRight, Home } from "lucide-react";
import { CTA, PageHero } from "@/components/shared/ui";
import { contentPages, type ContentPageSlug } from "@/lib/page-config";
import { seoUrl } from "@/lib/site";

const pageFade: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

export function BreadcrumbSchema({
  slug,
  label,
}: {
  slug: string;
  label: string;
}) {
  const baseUrl = seoUrl.replace(/\/$/, "");
  const pageUrl = `${baseUrl}/${slug.replace(/^\//, "")}`;

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "PROPACK Odisha 2027",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: pageUrl,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemaData).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function ContentPage({
  slug,
  children,
  showCta = true,
}: {
  slug: ContentPageSlug;
  children: ReactNode;
  showCta?: boolean;
}) {
  const page = contentPages[slug] || {
    label: "Overview",
    title: "PROPACK Odisha 2027",
    description:
      "Eastern India's Largest MSME Exhibition on Packaging, Printing, Plastics & Processing Machinery.",
  };

  return (
    <>
      <BreadcrumbSchema slug={slug} label={page.label} />

   

      {/* Hero Banner */}
      <PageHero
        eyebrow={page.label}
        title={page.title}
        description={page.description}
      />

      {/* Page Main Content with Entry Motion */}
      <motion.div
        variants={pageFade}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        {children}
      </motion.div>

      {/* Bottom CTA Block */}
      {showCta && <CTA />}
    </>
  );
}
