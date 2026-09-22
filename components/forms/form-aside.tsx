"use client";

import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
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
        <Eyebrow>PROPACK Odisha 2027</Eyebrow>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864]">
          Let’s connect.
        </h2>

        {/* Date & Venue Info Tile */}
        <div className="mt-4 space-y-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] p-3.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5 font-semibold text-[#1F3864]">
            <CalendarDays size={16} className="shrink-0 text-[#15A7AE]" />
            <span>25th to 28th February 2027</span>
          </div>
          <div className="flex items-start gap-2.5 text-[var(--muted-foreground,#4b5563)]">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#15A7AE]" />
            <span className="leading-snug">
              Janata Maidan, Bhubaneswar, Odisha
            </span>
          </div>
        </div>
      </div>

      {/* 2. Direct Desk Assistance */}
      <div className="border-t border-[var(--border)] pt-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F3864]">
          <Headphones size={15} className="text-[#15A7AE]" />
          <span>For Stall Booking & Sponsorship</span>
        </div>

        <p className="mt-2 text-xs leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-sm">
          Please contact the organizing team directly for booth bookings and
          sponsorships:
        </p>

        {/* Phone Helplines */}
        <div className="mt-3.5 space-y-2">
          {/* Primary Number */}
          <a
            href="tel:+917751809433"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] px-3.5 py-2.5 text-xs font-semibold text-[#1F3864] transition-all hover:border-[#EB622F] hover:bg-white sm:text-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[#15A7AE] shadow-2xs transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
              <Phone size={12} />
            </span>
            <div>
              <span className="block text-[10px] text-slate-500">
                Ms. Mamta 
              </span>
              <span>+91 77518 09433</span>
            </div>
          </a>

          {/* Secondary Number */}
          <a
            href="tel:+917008341944"
            className="group flex items-center gap-2.5 rounded-xl border border-[var(--border)] bg-[#f7f8f7] px-3.5 py-2.5 text-xs font-semibold text-[#1F3864] transition-all hover:border-[#EB622F] hover:bg-white sm:text-sm"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white text-[#15A7AE] shadow-2xs transition-colors group-hover:bg-[#EB622F] group-hover:text-white">
              <Phone size={12} />
            </span>
            <div>
              <span className="block text-[10px] text-slate-500">
                Mr. Ratiranjan Samal
              </span>
              <span>+91-70083 41944</span>
            </div>
          </a>
        </div>
      </div>

      {/* 3. Official Email Desks */}
      <div className="border-t border-[var(--border)] pt-5">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F3864]">
          <Building2 size={15} className="text-[#15A7AE]" />
          <span>OASME Contact Desk</span>
        </div>

        <div className="mt-3 space-y-2">
          <a
            href="mailto:oasme.odisha@gmail.com"
            className="flex items-center gap-2.5 text-xs font-medium text-[var(--muted-foreground,#4b5563)] hover:text-[#EB622F] transition-colors sm:text-sm"
          >
            <Mail size={14} className="text-[#15A7AE] shrink-0" />
            <span>oasme.odisha@gmail.com</span>
          </a>

          <a
            href="mailto:adventures.bbsr@gmail.com"
            className="flex items-center gap-2.5 text-xs font-medium text-[var(--muted-foreground,#4b5563)] hover:text-[#EB622F] transition-colors sm:text-sm"
          >
            <Mail size={14} className="text-[#15A7AE] shrink-0" />
            <span>adventures.bbsr@gmail.com</span>
          </a>
        </div>
      </div>

      {/* 5. Back to Exhibitor Services Link */}
      {isService && (
        <div className="border-t border-[var(--border)] pt-4">
          <Link
            href="/exhibitor-details"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-[#EB622F] hover:underline"
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
