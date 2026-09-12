"use client";

import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Info,
  AlertTriangle,
  Building2,
  Headphones,
} from "lucide-react";
import { Eyebrow } from "@/components/shared/ui";
import { event, services } from "@/lib/site";

export function FormAside({ slug }: { slug: string }) {
  const isService = services.some((service) => service.slug === slug);

  return (
    <aside className="sticky top-28 flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-white p-6 shadow-xs sm:p-7">
      
      {/* 1. Header & Value Anchor */}
      <div>
        <Eyebrow>Propack Odisha 2027</Eyebrow>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--foreground,#111827)]">
          Let’s connect.
        </h2>

        {/* Date & Venue Info Tile */}
        <div className="mt-4 space-y-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-3.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 font-semibold text-[var(--foreground,#111827)]">
            <CalendarDays size={16} className="shrink-0 text-[var(--primary)]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-start gap-2.5 text-[var(--muted-foreground,#4b5563)]">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--primary)]" />
            <span className="leading-snug">{event.venue}</span>
          </div>
        </div>
      </div>

      {/* 2. Direct Desk Assistance */}
      <div className="border-t border-[var(--border)] pt-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground,#111827)]">
          <Headphones size={15} className="text-[var(--primary)]" />
          <span>Secretariat Assistance</span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
          Need help with your{" "}
          <strong className="font-semibold text-[var(--foreground,#111827)]">
            {slug === "contact-us" ? "enquiry" : "registration or stall requirements"}
          </strong>
          ? Our operations desk is available directly:
        </p>

        {/* Phone Helplines */}
        <div className="mt-3.5 space-y-2">
          <a
            href="tel:+917008341944"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] px-3.5 py-2.5 text-xs font-semibold text-[var(--foreground,#111827)] transition-all hover:border-[var(--primary)] hover:bg-white sm:text-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-2xs group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
              <Phone size={12} />
            </span>
            <span>+91 70083 41944</span>
          </a>

          <a
            href="tel:+917751809433"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] px-3.5 py-2.5 text-xs font-semibold text-[var(--foreground,#111827)] transition-all hover:border-[var(--primary)] hover:bg-white sm:text-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--primary)] shadow-2xs group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
              <Phone size={12} />
            </span>
            <span>+91 77518 09433</span>
          </a>
        </div>
      </div>

      {/* 3. Official Email Desks (Shown on contact-us) */}
      {slug === "contact-us" && (
        <div className="border-t border-[var(--border)] pt-5">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground,#111827)]">
            <Building2 size={15} className="text-[var(--primary)]" />
            <span>OASME Desk</span>
          </div>

          <div className="mt-3 space-y-2">
            <a
              href="mailto:info@oasme.org.in"
              className="flex items-center gap-2.5 text-xs font-medium text-[var(--muted-foreground,#4b5563)] hover:text-[var(--primary)] transition-colors sm:text-sm"
            >
              <Mail size={14} className="text-[var(--primary)] shrink-0" />
              <span>info@oasme.org.in</span>
            </a>

            <a
              href="mailto:oasme.ctc@gmail.com"
              className="flex items-center gap-2.5 text-xs font-medium text-[var(--muted-foreground,#4b5563)] hover:text-[var(--primary)] transition-colors sm:text-sm"
            >
              <Mail size={14} className="text-[var(--primary)] shrink-0" />
              <span>oasme.ctc@gmail.com</span>
            </a>
          </div>
        </div>
      )}

      {/* 4. Contextual Archival Disclaimers */}
      {slug === "brochure" && (
        <div className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs leading-relaxed text-amber-900">
          <Info size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <span>
            <strong>Archive Note:</strong> Demonstrates the historical 2023 edition layout. Connect with the secretariat desk for current 2027 stall allocations.
          </span>
        </div>
      )}

      {slug === "power-requirement" && (
        <div className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50/90 p-3.5 text-xs leading-relaxed text-amber-900">
          <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
          <span>
            <strong>Archived tariffs:</strong> Compressor ₹10,000; buildup power ₹2,500/kW; show power ₹3,500/kW. Provided strictly as historical indicators, not as active 2027 quotations.
          </span>
        </div>
      )}

      {/* 5. Back to Exhibitor Services Link */}
      {isService && (
        <div className="border-t border-[var(--border)] pt-4">
          <Link
            href="/exhibitor-details"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-[var(--primary)] hover:underline"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span>All exhibitor services</span>
          </Link>
        </div>
      )}

    </aside>
  );
}