import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Clock, Headphones } from "lucide-react";

import { FormAside } from "@/components/forms/form-aside";
import { SubmissionForm } from "@/components/forms/submission-form";
import { BreadcrumbSchema } from "@/components/shared/page-shell";
import { RevealSection } from "@/components/shared/motion";
import { PageHero } from "@/components/shared/ui";

import { forms } from "@/lib/forms";
import { formLabel } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { seoUrl } from "@/lib/site";

export const dynamicParams = false;

/**
 * These form pages are public landing pages
 * and are allowed to appear in Google Search.
 */
const indexableForms = new Set([
  "exhibitor-registration",
  "visitor-registration",
]);

export function generateStaticParams() {
  return Object.keys(forms).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const form = forms[slug];

  if (!form) {
    return {};
  }

  const label = formLabel(slug);

  /**
   * Public registration pages
   */
  if (indexableForms.has(slug)) {
    return pageMetadata(
      slug,
      label,
      form.intro
    );
  }

  /**
   * Internal / exhibitor-service forms.
   *
   * They can remain publicly accessible when required,
   * but Google should not index them.
   */
  return {
    title: {
      absolute: `${label} | PROPACK Odisha 2027`,
    },

    description: form.intro,

    alternates: {
      canonical: `${seoUrl}/${slug}`,
    },

    robots: {
      index: false,
      follow: false,

      googleBot: {
        index: false,
        follow: false,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const form = forms[slug];

  if (!form) {
    notFound();
  }

  const label = formLabel(slug);

  return (
    <>
      {/* Structured Breadcrumbs */}
      <BreadcrumbSchema
        slug={slug}
        label={label}
      />

      {/* Page Hero */}
      <PageHero
        eyebrow={label}
        title={form.title}
        description={form.intro}
      />

      {/* Main Form Section */}
      <RevealSection className="border-b border-slate-200/80 bg-[#f7f8f7] py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">

          {/* Trust & Assistance Indicators */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-3 text-xs text-slate-600 shadow-2xs">

            <div className="hidden items-center gap-6 sm:flex">
              <span className="flex items-center gap-1.5">
                <Clock
                  size={14}
                  className="text-[#15A7AE]"
                />

                Response within 24 business hours
              </span>

              <span className="text-slate-300">
                •
              </span>

              <span className="flex items-center gap-1.5">
                <Headphones
                  size={14}
                  className="text-[#15A7AE]"
                />

                Helpline: +91 77518 09433
              </span>
            </div>

          </div>

          {/* Form + Sidebar */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">

            <main className="order-2 lg:order-1 lg:col-span-8">
              <SubmissionForm type={slug} />
            </main>

            <aside className="order-1 lg:order-2 lg:sticky lg:top-28 lg:col-span-4">
              <FormAside slug={slug} />
            </aside>

          </div>

        </div>
      </RevealSection>
    </>
  );
}