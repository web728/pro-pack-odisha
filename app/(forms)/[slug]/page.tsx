import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FormAside } from "@/components/forms/form-aside";
import { SubmissionForm } from "@/components/forms/submission-form";
import { BreadcrumbSchema } from "@/components/shared/page-shell";
import { RevealSection } from "@/components/shared/motion";
import { PageHero } from "@/components/shared/ui";
import { forms } from "@/lib/forms";
import { formLabel } from "@/lib/page-config";
import { pageMetadata } from "@/lib/seo";
import { ShieldCheck, Clock, Headphones } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(forms).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const form = forms[slug];
  if (!form) return {};
  return pageMetadata(slug, formLabel(slug), form.intro);
}

export default async function FormPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const form = forms[slug];
  if (!form) notFound();

  const label = formLabel(slug);

  return (
    <>
      {/* 1. SEO Structured Breadcrumbs */}
      <BreadcrumbSchema slug={slug} label={label} />

      {/* 2. Page Hero with Custom Vector Backdrop */}
      <PageHero eyebrow={label} title={form.title} description={form.intro} />

      {/* 3. Main Form Section */}
      <RevealSection className="border-b border-slate-200/80 bg-[#f7f8f7] py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          
          {/* Trust & Assistance Indicators Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white px-5 py-3 shadow-2xs text-xs text-slate-600">
          

            <div className="hidden sm:flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[var(--primary)]" />
                Response within 24 business hours
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5">
                <Headphones size={14} className="text-[var(--primary)]" />
                Helpline: +91 70083 41944
              </span>
            </div>
          </div>

          {/* 4. Asymmetric 12-Column Layout */}
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            
            {/* Left/Main Area: Interactive Submission Form (8 cols on desktop) */}
            <main className="order-2 lg:order-1 lg:col-span-8">
              <SubmissionForm type={slug} />
            </main>

            {/* Right/Sidebar Area: Sticky Information Panel (4 cols on desktop) */}
            <aside className="order-1 lg:order-2 lg:col-span-4 lg:sticky lg:top-28">
              <FormAside slug={slug} />
            </aside>

          </div>

        </div>
      </RevealSection>
    </>
  );
}