"use client";

import Link from "next/link";
import {
  CalendarDays,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { Brand } from "./header";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-[#1a2328] text-slate-300">
      {/* Background Subtle Tech Line Pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-25"
        aria-hidden="true"
      >
        <svg className="h-full w-full stroke-white/[0.04]" fill="none">
          <defs>
            <pattern
              id="footer-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 40 0 L 0 0 0 40" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          
          {/* Col 1: Brand & Venue Info (4 cols) */}
          <div className="flex flex-col justify-between lg:col-span-4">
            <div className="space-y-4">
              <div className="inline-block rounded-xl bg-white/95 p-3 shadow-sm">
                <Brand />
              </div>

              <p className="max-w-sm text-sm font-medium leading-relaxed text-slate-400">
                A meeting place for industries. <br />
                A starting point for boundless commercial possibilities.
              </p>
            </div>

            {/* Quick Venue Badge */}
            <div className="mt-8 space-y-2.5 rounded-xl border border-slate-800 bg-[#202b31]/60 p-4 backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-white">
                <CalendarDays size={15} className="text-[var(--primary)] shrink-0" />
                <span>25–28 February 2027</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <MapPin size={15} className="text-[var(--primary)] mt-0.5 shrink-0" />
                <span>Janata Maidan, Bhubaneswar, Odisha, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (2.5 cols) */}
          <div className="lg:col-span-3 lg:pl-4">
            <h3 className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest text-white">
              Explore the Expo
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  About Propack Odisha
                </Link>
              </li>
              <li>
                <Link
                  href="/about-organizers"
                  className="transition-colors hover:text-white"
                >
                  About OASME
                </Link>
              </li>
              <li>
                <Link
                  href="/sectors"
                  className="transition-colors hover:text-white"
                >
                  Exhibition Sectors
                </Link>
              </li>
              <li>
                <Link
                  href="/market"
                  className="transition-colors hover:text-white"
                >
                  Odisha Market Context
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="transition-colors hover:text-white"
                >
                  Resources & Brochure
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Delegate & Exhibitor CTAs (2.5 cols) */}
          <div className="lg:col-span-2">
            <h3 className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest text-white">
              Take Part
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/exhibitor-registration"
                  className="inline-flex items-center gap-1 font-semibold text-red-400 hover:text-red-300 transition-colors"
                >
                  <span>Exhibitor registration</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
              <li>
                <Link
                  href="/visitor-registration"
                  className="transition-colors hover:text-white"
                >
                  Visitor registration
                </Link>
              </li>
              <li>
                <Link
                  href="/exhibitor-details"
                  className="transition-colors hover:text-white"
                >
                  Exhibitor service centre
                </Link>
              </li>
              <li>
                <Link
                  href="/view-pass"
                  className="transition-colors hover:text-white"
                >
                  View visitor pass
                </Link>
              </li>
              <li>
                <Link
                  href="/visitors#plan-your-visit"
                  className="transition-colors hover:text-white"
                >
                  Plan your visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Secretariat Desk (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="font-[family-name:var(--font-heading)] text-xs font-bold uppercase tracking-widest text-white">
              Let’s Talk Business
            </h3>
            <div className="mt-5 space-y-3.5 text-sm">
              <a
                href="tel:+917008341944"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-[var(--primary)]">
                  <Phone size={13} />
                </span>
                <span>+91 70083 41944</span>
              </a>

              <a
                href="tel:+917751809433"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-[var(--primary)]">
                  <Phone size={13} />
                </span>
                <span>+91 77518 09433</span>
              </a>

              <a
                href="mailto:info@oasme.org.in"
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-[var(--primary)]">
                  <Mail size={13} />
                </span>
                <span className="break-all">info@oasme.org.in</span>
              </a>

              <div className="pt-2">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white underline decoration-slate-600 underline-offset-4 hover:decoration-white transition-all"
                >
                  <span>All secretariat contact details</span>
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Organizer Ribbon / Trust Anchor */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-800 bg-[#202b31]/40 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300">
              <Building2 size={16} />
            </span>
            <div className="text-xs">
              <strong className="text-white block font-semibold">
                Odisha Assembly of Small and Medium Enterprises (OASME)
              </strong>
              <span className="text-slate-400">
                Apex representative body catalyzing MSME industrial growth across Eastern India.
              </span>
            </div>
          </div>

          <Link
            href="/about-organizers"
            className="shrink-0 text-xs font-semibold text-slate-300 hover:text-white inline-flex items-center gap-1"
          >
            <span>Learn more about OASME</span>
            <ArrowUpRight size={13} />
          </Link>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-400 sm:flex-row">
          <span>
            © {currentYear} Propack Odisha International Expo. All rights reserved.
          </span>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>Privacy Policy</span>
            </Link>
            <span className="text-slate-700">•</span>
            <span>Organized by OASME</span>
          </div>
        </div>

      </div>
    </footer>
  );
}