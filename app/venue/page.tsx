import type { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Plane,
  Train,
  Car,
  Clock,
  ArrowUpRight,
  Building2,
  ShieldCheck,
  ParkingCircle,
  Truck,
  Wifi,
  Navigation,
} from "lucide-react";
import { BreadcrumbSchema } from "@/components/shared/page-shell";
import { PageHero, CTA, Eyebrow } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";

export const metadata: Metadata = {
  title: "Venue & Location | Janata Maidan, Bhubaneswar | PROPACK Odisha 2027",
  description:
    "Official venue location, route directions, transport connectivity, and facilities for PROPACK Odisha 2027 at Janata Maidan, Bhubaneswar.",
};

const transitHighlights = [
  {
    icon: Plane,
    title: "Biju Patnaik Int'l Airport (BBI)",
    distance: "7.5 km",
    time: "15–20 mins drive",
    desc: "Direct domestic flights connecting major Indian business hubs.",
  },
  {
    icon: Train,
    title: "Bhubaneswar Railway Station (BBS)",
    distance: "6.0 km",
    time: "12–15 mins drive",
    desc: "Major East Coast rail hub with daily Express & Vande Bharat trains.",
  },
  {
    icon: Car,
    title: "National Highway 16 (NH-16)",
    distance: "1.8 km",
    time: "4 mins connection",
    desc: "Golden quadrilateral arterial corridor connecting Eastern India.",
  },
];

const venueFacilities = [
  {
    icon: ParkingCircle,
    title: "Designated Parking",
    desc: "Ample multi-zone parking for exhibitors, cargo trucks, VIP delegates, and visitor vehicles.",
  },
  {
    icon: Truck,
    title: "Direct Freight & Logistics",
    desc: "Heavy machinery loading bays and wide industrial service gates for unobstructed stall fabrication.",
  },
  {
    icon: Wifi,
    title: "High-Speed Infrastructure",
    desc: "Industrial power redundancy, 3-phase supply taps, high-speed Wi-Fi, and registration desks.",
  },
  {
    icon: ShieldCheck,
    title: "Security & First Aid",
    desc: "24/7 CCTV surveillance, on-ground fire safety marshals, paramedic stations, and entry turnstiles.",
  },
];

export default function VenuePage() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Janata+Maidan+Bhubaneswar+Odisha";

  return (
    <>
      <BreadcrumbSchema slug="venue" label="Venue & Location" />

      <PageHero
        eyebrow="Venue & Location"
        title="Janata Maidan, Bhubaneswar"
        description="The premier exhibition ground of Eastern India. Centrally situated in Odisha's capital with seamless air, rail, and freight road connectivity."
      />

      {/* Quick Fact Banner */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="container mx-auto grid grid-cols-1 divide-y divide-slate-100 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
          <div className="flex items-center gap-3.5 py-4 sm:justify-center">
            <MapPin size={20} className="text-[#EB622F] shrink-0" />
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Official Venue
              </span>
              <strong className="text-xs font-bold text-[#1F3864] sm:text-sm">
                Janata Maidan, Bhubaneswar
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3.5 py-4 sm:justify-center">
            <CalendarDays size={20} className="text-[#EB622F] shrink-0" />
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Event Schedule
              </span>
              <strong className="text-xs font-bold text-[#1F3864] sm:text-sm">
                25th to 28th February 2027
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3.5 py-4 sm:justify-center">
            <Clock size={20} className="text-[#EB622F] shrink-0" />
            <div>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Exhibition Timings
              </span>
              <strong className="text-xs font-bold text-[#1F3864] sm:text-sm">
                10:00 AM – 06:00 PM
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Map + Location Overview Section */}
      <RevealSection className="border-b border-slate-200/80 bg-[#f7f8f7] py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left: Map Box (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Map Top Bar */}
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1F3864]">
                    <Navigation size={15} className="text-[#15A7AE]" />
                    <span>Live GPS Location</span>
                  </div>

                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#EB622F] hover:text-[#d55526] hover:underline"
                  >
                    <span>Open in Maps App</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                {/* Google Maps Responsive Iframe */}
                <div className="relative h-[380px] w-full sm:h-[460px]">
                  <iframe
                    title="Janata Maidan Bhubaneswar Map Location"
                    src="https://maps.google.com/maps?q=Janata%20Maidan,%20Bhubaneswar,%20Odisha&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="h-full w-full border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                {/* Address Strip Below Map */}
                <div className="p-4 sm:p-5 border-t border-slate-100 bg-white">
                  <p className="text-xs text-slate-600 sm:text-sm">
                    <strong className="font-semibold text-[#1F3864]">
                      Address:{" "}
                    </strong>
                    Janata Maidan, Chandrasekharpur, Bhubaneswar, Odisha, India.
                    Same ground that hosted Utkarsh Odisha: Make in Odisha
                    Conclave 2025.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Key Venue Details & Navigation Card (5 Cols) */}
            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8">
                <Eyebrow>Strategic Location</Eyebrow>

                <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl">
                  Heart of Odisha&apos;s Capital Hub
                </h2>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                  Janata Maidan is Odisha&apos;s most prominent exhibition
                  arena, offering a fully covered, air-conditioned hall venue
                  situated adjacent to major business hotels and commercial
                  zones.
                </p>

                <div className="mt-6 space-y-3.5 border-t border-slate-100 pt-5">
                  <div className="flex items-start gap-3">
                    <Building2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#15A7AE]"
                    />
                    <div>
                      <strong className="block text-xs font-semibold text-[#1F3864] sm:text-sm">
                        Prime Hospitality Radius
                      </strong>
                      <span className="text-xs text-slate-500">
                        Over star category hotels within close proximity.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Car size={18} className="mt-0.5 shrink-0 text-[#15A7AE]" />
                    <div>
                      <strong className="block text-xs font-semibold text-[#1F3864] sm:text-sm">
                        Direct Arterial Access
                      </strong>
                      <span className="text-xs text-slate-500">
                        Smooth connectivity from Jayadev Vihar square &
                        Nandankanan road.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#EB622F] px-5 py-3 text-xs font-bold !text-white shadow-sm transition-all hover:bg-[#d55526] hover:shadow-md active:scale-95 sm:text-sm"
                  >
                    <span className="!text-white">
                      Get Directions in Google Maps
                    </span>
                    <ArrowUpRight size={16} className="!text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Transit & Accessibility Distance Benchmarks */}
      <RevealSection className="border-b border-slate-200/80 bg-white py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Travel & Connectivity</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              Distance from Transit Hubs
            </h2>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Estimated travel times during regular exhibition hours:
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {transitHighlights.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.title}
                  className="group rounded-2xl border border-slate-200 bg-[#f7f8f7] p-6 transition-all hover:border-[#EB622F]/40 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#15A7AE] shadow-2xs group-hover:bg-[#EB622F] group-hover:text-white transition-colors">
                      <Icon size={20} />
                    </span>
                    <div className="text-right">
                      <span className="block font-mono text-base font-bold text-[#1F3864]">
                        {t.distance}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {t.time}
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-5 font-[family-name:var(--font-heading)] text-base font-bold text-[#1F3864]">
                    {t.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      {/* On-Site Exhibition Ground Facilities */}
      <RevealSection className="border-b border-slate-200/80 bg-[#f7f8f7] py-14 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl">
            <Eyebrow>Infrastructure & Amenities</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              On-Ground Expo Facilities
            </h2>
            <p className="mt-2 text-xs text-slate-500 sm:text-sm">
              Engineered to support heavy converting machinery displays and
              large delegation throughput.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {venueFacilities.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#15A7AE]/10 text-[#15A7AE]">
                    <Icon size={19} />
                  </span>

                  <h3 className="mt-4 font-[family-name:var(--font-heading)] text-sm font-bold text-[#1F3864] sm:text-base">
                    {f.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </RevealSection>

      {/* Bottom Conversion CTA */}
      <CTA />
    </>
  );
}
