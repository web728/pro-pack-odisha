"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  MapPin,
  Phone,
  ChevronDown,
  Store,
  Layers,
  FileText,
  Ticket,
  Map,
  Users2,
  TrendingUp,
  Building2,
  HelpCircle,
  Sparkles,
  CalendarDays,
  DownloadCloud,
  FileCheck2,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

interface NavItem {
  title: string;
  href: string;
  desc: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

// 1. Precise, segregated IA
const navGroups: NavGroup[] = [
    {
    label: "About",
    items: [
      {
        title: "About Propack Odisha",
        href: "/about",
        desc: "Vision, highlights & exhibition legacy",
        icon: Building2,
      },
      {
        title: "About OASME",
        href: "/about-organizers",
        desc: "Apex MSME representative body",
        icon: Sparkles,
      },
      {
        title: "Venue & Location",
        href: "/venue",
        desc: "Janata Maidan, Bhubaneswar route",
        icon: Map,
      },
    ],
  },
  {
    label: "Exhibit",
    items: [
      {
        title: "Why Exhibit",
        href: "/exhibitors",
        desc: "B2B conversion benefits & ROI",
        icon: TrendingUp,
      },
      {
        title: "Book a Stall",
        href: "/exhibitor-registration",
        desc: "Reserve booth space & utilities",
        icon: Store,
      },
      {
        title: "Exhibitor Services",
        href: "/services",
        desc: "Badges, fascia, power & directory",
        icon: Layers,
      },
      {
        title: "Event Brochure",
        href: "/brochure",
        desc: "Floor plans & official prospectus",
        icon: FileText,
      },
    ],
  },
  {
    label: "Visit",
    items: [
      {
        title: "Visitor Guide",
        href: "/visitors",
        desc: "What to expect & attendee perks",
        icon: Users2,
      },
      {
        title: "Register as Visitor",
        href: "/visitor-registration",
        desc: "Free digital delegate entry",
        icon: Ticket,
      },
      {
        title: "Retrieve Pass",
        href: "/view-pass",
        desc: "Access your saved digital badge",
        icon: Sparkles,
      },
      {
        title: "Visitor FAQs",
        href: "/visitors#faqs",
        desc: "Entry, badges & visiting queries",
        icon: HelpCircle,
      },
    ],
  },
  {
    label: "Sectors & Market",
    items: [
      {
        title: "Technology Catalog",
        href: "/sectors",
        desc: "5 core sectors & machinery list",
        icon: Layers,
      },
      {
        title: "Odisha Industrial Context",
        href: "/market",
        desc: "Plastic clusters & investment zones",
        icon: TrendingUp,
      },
    ],
  },
  {
    label: "Downloads",
    items: [
      {
        title: "Downloads & Collaterals",
        href: "/resources",
        desc: "Forms, official logos & collateral kits",
        icon: DownloadCloud,
      },
      {
        title: "Event Brochure",
        href: "/brochure",
        desc: "Archived & official floor plan PDF",
        icon: FileText,
      },
      {
        title: "Rules & Guidelines",
        href: "/resources#guidelines",
        desc: "Stall fabrication & electrical safety",
        icon: FileCheck2,
      },
    ],
  },
];

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      className="inline-flex flex-shrink-0 items-center group"
      aria-label="Propack Odisha home"
      onClick={onNavigate}
    >
      <Image
        src="/logo/logo-bg.png"
        alt="Propack Odisha International Expo"
        width={200}
        height={80}
        priority
        className="h-auto w-[170px] sm:w-[200px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
      />
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedGroup, setMobileExpandedGroup] = useState<string | null>(null);

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const path = usePathname();
  const reducedMotion = useReducedMotion();
  const button = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (open) return;

      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 6) {
        setIsVisible(false);
        setActiveDropdown(null);
      } else if (currentScrollY < lastScrollY.current && lastScrollY.current - currentScrollY > 6) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    const dismiss = (event: Event) => {
      if (!header.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [open]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const tickerItems = (
  <div className="flex shrink-0 items-center gap-8 px-4 text-sm font-semibold sm:text-base">
    <span className="inline-flex items-center gap-2 text-slate-900">
      <CalendarDays size={18} className="shrink-0 text-red-600" />
      <span>25–28 February 2027</span>
    </span>

    <span className="text-slate-300">•</span>

    <span className="inline-flex items-center gap-2 text-slate-800">
      <MapPin size={18} className="shrink-0 text-red-600" />
      <span>Janata Maidan, Bhubaneswar, Odisha</span>
    </span>

    <span className="text-slate-300">•</span>

    <span className="inline-flex items-center gap-2 rounded-full bg-red-600/10 px-3 py-1 font-bold text-red-700">
      <Sparkles size={15} />
      <span>Eastern India&apos;s Largest B2B Industrial Expo</span>
    </span>

    <span className="text-slate-300">•</span>

    {/* Primary Helpline */}
    <a
      href="tel:+917751809433"
      className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-red-600"
    >
      <Phone size={16} className="shrink-0 text-red-600" />
      <span>Helpline: +91 77518 09433</span>
    </a>

    <span className="text-slate-300">•</span>

    {/* Secondary Helpline */}
    <a
      href="tel:+917008341944"
      className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-red-600"
    >
      <Phone size={16} className="shrink-0 text-red-600" />
      <span>+91 70083 41944</span>
    </a>

    <span className="text-slate-300">•</span>

    <span className="font-medium text-slate-600">
      Organized by Odisha Assembly of Small and Medium Enterprises (OASME)
    </span>

    <span className="text-slate-300">•</span>
  </div>
);

  return (
    <>
      {/* 1. Large Animated Continuous Ticker Strip */}
      <div className="group relative z-40 overflow-hidden border-b border-slate-200 bg-[#f7f8f7] py-2.5 print:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#f7f8f7] to-transparent sm:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#f7f8f7] to-transparent sm:w-16" />

        <div className="flex w-max motion-reduce:transform-none">
          <motion.div
            className="flex shrink-0 items-center group-hover:[animation-play-state:paused]"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 26,
            }}
          >
            {tickerItems}
            {tickerItems}
          </motion.div>
        </div>
      </div>

      {/* 2. Smart Sticky Header */}
      <motion.header
        ref={header}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 border-b border-[var(--border)] bg-white/95 backdrop-blur-md shadow-xs print:hidden"
      >
        <div className="container mx-auto flex h-[76px] lg:h-[88px] items-center justify-between gap-4 px-4 sm:px-6">
          <Brand onNavigate={() => setOpen(false)} />

          {/* Desktop Navigation With Targeted Dropdowns + Standalone Contact */}
          <nav
            className="hidden xl:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navGroups.map((group) => {
              const isDropdownOpen = activeDropdown === group.label;
              const hasActiveChild = group.items.some((item) => path === item.href);

              return (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(group.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] font-bold tracking-tight transition-colors ${
                      hasActiveChild
                        ? "text-[var(--primary)]"
                        : "text-slate-800 hover:text-[var(--primary)]"
                    }`}
                    aria-expanded={isDropdownOpen}
                  >
                    <span>{group.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180 text-[var(--primary)]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-1.5 w-72 origin-top-left rounded-2xl border border-[var(--border)] bg-white p-2 shadow-xl ring-1 ring-black/5"
                      >
                        <div className="space-y-1">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isCurrent = path === item.href;

                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`group flex items-start gap-3 rounded-xl p-2.5 transition-colors ${
                                  isCurrent
                                    ? "bg-[var(--primary)]/5 text-[var(--primary)]"
                                    : "hover:bg-[#f7f8f7]"
                                }`}
                              >
                                <span
                                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                                    isCurrent
                                      ? "border-[var(--primary)] bg-white text-[var(--primary)]"
                                      : "border-slate-200 bg-white text-slate-500 group-hover:border-[var(--primary)] group-hover:text-[var(--primary)]"
                                  }`}
                                >
                                  <Icon size={16} />
                                </span>
                                <div>
                                  <div
                                    className={`text-[13px] font-bold leading-snug transition-colors ${
                                      isCurrent
                                        ? "text-[var(--primary)]"
                                        : "text-slate-900 group-hover:text-[var(--primary)]"
                                    }`}
                                  >
                                    {item.title}
                                  </div>
                                  <p className="mt-0.5 text-[11px] leading-tight text-slate-500">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Standalone Direct Contact Link */}
            <Link
              href="/contact-us"
              className={`inline-flex items-center rounded-lg px-3 py-2 text-[14px] font-bold tracking-tight transition-colors ${
                path === "/contact-us"
                  ? "text-[var(--primary)]"
                  : "text-slate-800 hover:text-[var(--primary)]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA & Mobile Drawer Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/exhibitor-registration"
              className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-[13px] font-bold !text-white shadow-sm transition-all duration-200 hover:bg-red-700 hover:shadow-md active:scale-95"
            >
              <span className="!text-white font-bold">Exhibit with us</span>
              <ArrowUpRight size={16} className="!text-white" />
            </Link>

            <button
              ref={button}
              type="button"
              className="xl:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 shadow-2xs hover:bg-slate-50 active:scale-95"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Drawer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-nav"
              className="xl:hidden max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-[var(--border)] bg-white px-4 py-6 shadow-2xl"
              initial={reducedMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="space-y-3">
                {navGroups.map((group) => {
                  const isExpanded = mobileExpandedGroup === group.label;

                  return (
                    <div
                      key={group.label}
                      className="rounded-xl border border-slate-200 bg-slate-50/50 p-2"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setMobileExpandedGroup(isExpanded ? null : group.label)
                        }
                        className="flex w-full items-center justify-between p-2 text-left text-sm font-bold text-slate-900"
                      >
                        <span>{group.label}</span>
                        <ChevronDown
                          size={16}
                          className={`text-slate-400 transition-transform duration-200 ${
                            isExpanded ? "rotate-180 text-[var(--primary)]" : ""
                          }`}
                        />
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-1 border-t border-slate-200/80 pt-2">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between rounded-lg p-2 text-xs font-semibold text-slate-700 hover:bg-white hover:text-[var(--primary)]"
                              >
                                <span className="flex items-center gap-2">
                                  <Icon size={14} className="text-slate-400" />
                                  <span>{item.title}</span>
                                </span>
                                <ArrowUpRight size={14} className="text-slate-400" />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Standalone Contact in Mobile Menu */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-2">
                  <Link
                    href="/contact-us"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-between p-2 text-left text-sm font-bold text-slate-900"
                  >
                    <span>Contact Us</span>
                    <ArrowUpRight size={16} className="text-slate-400" />
                  </Link>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="mt-6 flex flex-col gap-2.5 pt-4 border-t border-slate-200">
                <Link
                  href="/exhibitor-registration"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-xs font-bold !text-white shadow-sm"
                >
                  <span className="!text-white">Book a Stall (Exhibit)</span>
                  <ArrowUpRight size={15} className="!text-white" />
                </Link>

                <Link
                  href="/visitor-registration"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-900 shadow-2xs"
                >
                  <span>Register as Delegate / Visitor</span>
                  <ArrowUpRight size={15} className="text-slate-400" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}