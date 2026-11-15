"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { sectors } from "@/lib/site";
import { OrganizerStrip } from "../shared/organizer-strip";

/*
 * Assets this file expects in /public (all inside propack-assets.zip):
 *   /logo/propack-logo.svg          vector logo taken from the brochure
 *   /gallery/expo-01.webp … 10      real photos from past PROPACK expos
 * plus the images you already have: /sections/*, /assets/packaging.webp, /logo/support-*.png
 */

/* Website palette */
const NAVY = "#14264a";
const ORANGE = "#eb622f";
const TEAL = "#0d7479";
const SOFT = "#f6f7f6";

const heading = "font-[family-name:var(--font-heading)]";
const EASE = [0.16, 1, 0.3, 1] as const;

/* =========================================================================
   SHARED PIECES
   ========================================================================= */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p
      className="flex items-center gap-3 text-[14px] font-semibold"
      style={{ color: ORANGE }}
    >
      <span
        className="h-px w-8"
        style={{ backgroundColor: ORANGE }}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border-b pb-1 text-[15px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f] ${
        light
          ? "border-white/40 text-white hover:border-white"
          : "border-[#14264a]/30 text-[#14264a] hover:border-[#eb622f] hover:text-[#eb622f]"
      }`}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

function PillButton({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: ReactNode;
  outline?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f] ${
        outline
          ? "border border-[#14264a]/25 text-[#14264a] hover:border-[#14264a] hover:bg-[#14264a] hover:text-white"
          : "bg-[#eb622f] text-white hover:bg-[#d4541f]"
      }`}
    >
      {children}
      <ArrowUpRight
        size={16}
        className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}

/* flat-top hexagon, the shape the brochure is built from */
function hexFlat(r: number) {
  return Array.from({ length: 6 }, (_, k) => {
    const a = (Math.PI / 180) * 60 * k;
    return `${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
}
const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

/* =========================================================================
   0. SUPPORTED BY
   ========================================================================= */
export function SupportedByStrip() {
  const supporters = [
    {
      name: "MSME Department, Government of Odisha",
      logo: "/logo/support-1.png",
    },
    {
      name: "Industrial Promotion & Investment Corporation of Odisha",
      logo: "/logo/ipcal.png",
    },
    {
      name: "Ministry of MSME, Government of India",
      logo: "/logo/support-2.png",
    },
  ];

  return (
    <section className="border-b border-neutral-200 bg-white py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="flex items-center justify-center gap-4 text-center">
          <span className="h-px w-12 bg-neutral-300 sm:w-20" aria-hidden="true" />
          <p className="text-[13px] font-semibold text-neutral-500">
            Supported by
          </p>
          <span className="h-px w-12 bg-neutral-300 sm:w-20" aria-hidden="true" />
        </Reveal>

        <Reveal
          delay={0.1}
          className="mx-auto mt-10 grid max-w-5xl grid-cols-1 divide-y divide-neutral-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {supporters.map((item) => (
            <div
              key={item.name}
              className="group flex flex-col items-center px-6 py-8 text-center sm:py-2"
            >
              <div
                className={`relative w-full transition-transform duration-300 group-hover:scale-[1.03] ${
                  item.name.includes("Industrial Promotion")
                    ? "h-16 sm:h-[72px]"
                    : "h-20 sm:h-24"
                }`}
              >
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 80vw, 300px"
                  className="object-contain"
                  priority
                />
              </div>
              <span
                className="mt-4 max-w-[26ch] text-[13px] font-semibold leading-snug"
                style={{ color: NAVY }}
              >
                {item.name}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   1. EVENT SNAPSHOT  (the brochure's own vector logo sits with the stats)
   ========================================================================= */
export function EventSnapshot() {
  const stats = [
    ["150+", "Exhibiting companies"],
    ["04", "Exhibition days"],
    ["10k+", "Trade visitors & buyers"],
  ];

  return (
    <section className="border-b border-neutral-200 bg-white py-16 lg:py-24">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>About PROPACK Odisha 2027</Eyebrow>
            <h2
              className={`${heading} mt-4 max-w-3xl text-[32px] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.12]`}
              style={{ color: NAVY }}
            >
              Where Industry, Innovation{" "}
              <br className="hidden sm:block" />
              <span style={{ color: ORANGE }}>&amp; Business Come Together.</span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.08}
            className="mt-7 max-w-[65ch] space-y-4 text-base leading-relaxed text-neutral-600 sm:text-lg sm:leading-8"
          >
            <p>
              PROPACK Odisha 2027 is the flagship platform of the{" "}
              <strong className="font-semibold" style={{ color: NAVY }}>
                Odisha Assembly of Small and Medium Enterprises (OASME)
              </strong>
              , bringing together the packaging, printing, paper, plastics,
              processing &amp; green energy value chain.
            </p>

            <p>
              The 4th edition will take place from{" "}
              <strong className="font-semibold" style={{ color: NAVY }}>
                25–28 February 2027
              </strong>{" "}
              at{" "}
              <strong className="font-semibold" style={{ color: NAVY }}>
                Bhubaneswar
              </strong>
              , bringing together machinery manufacturers, technology
              providers, material suppliers, processors, converters, buyers and
              decision-makers from Odisha, Eastern India and beyond.
            </p>

            <p>
              The exhibition combines a{" "}
              <strong className="font-semibold" style={{ color: NAVY }}>
                B2B trade exhibition, four-day conference programme
              </strong>{" "}
              and structured buyer–seller meets, creating opportunities for
              business development, technology discovery and industry
              networking.
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-8">
            <ArrowLink href="/about">About OASME &amp; Expo</ArrowLink>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:col-span-5">
          <div className="rounded-2xl border border-neutral-200 bg-white p-7 shadow-[0_30px_50px_-40px_rgba(20,38,74,0.5)] sm:p-9">
            <Image
              src="/logo/logo-bg.png"
              alt="PROPACK Odisha 2027, 4th edition"
              width={387}
              height={136}
              unoptimized
              className="mx-auto h-auto w-full max-w-[360px]"
            />
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-neutral-200 pt-7">
              {stats.map(([value, label]) => (
                <div key={label} className="border-t-2 pt-3" style={{ borderColor: TEAL }}>
                  <dt
                    className={`${heading} text-3xl font-extrabold tracking-tight sm:text-4xl`}
                    style={{ color: NAVY }}
                  >
                    {value}
                  </dt>
                  <dd className="mt-2 text-[12.5px] font-medium leading-snug text-neutral-500">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   2. SECTOR PREVIEW  (the brochure's hexagon cluster, interactive)
   ========================================================================= */
/*
 * Drop-in replacement for SectorPreview in home-sections-final.tsx.
 * It uses the same helpers already in that file (Eyebrow, Reveal, ArrowLink,
 * hexFlat, colors, EASE, heading). Only change to the imports at the top:
 *
 *   import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
 */
export function SectorPreview() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [wide, setWide] = useState(false);

  // labels + leader lines only where there is room for them
  useEffect(() => {
    const m = window.matchMedia("(min-width: 640px)");
    const f = () => setWide(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, []);

  const items = sectors.slice(0, 6);
  const R = 100;
  const S3 = Math.sqrt(3);
  const inner = R - 3;
  const ih = (S3 / 2) * inner; // half the hexagon height

  // top, then clockwise around the centre hexagon
  const pos: [number, number][] = [
    [0, -S3 * R],
    [1.5 * R, (-S3 * R) / 2],
    [1.5 * R, (S3 * R) / 2],
    [0, S3 * R],
    [-1.5 * R, (S3 * R) / 2],
    [-1.5 * R, (-S3 * R) / 2],
  ];

  // where each leader line starts (on the hexagon edge), ends, and where the name sits
  const leaders = pos.map(([cx, cy], i) => {
    if (i === 0)
      return { sx: cx, sy: cy - ih, ex: cx, ey: cy - ih - 30, tx: cx, ty: cy - ih - 42, anchor: "middle" as const };
    if (i === 3)
      return { sx: cx, sy: cy + ih, ex: cx, ey: cy + ih + 30, tx: cx, ty: cy + ih + 58, anchor: "middle" as const };
    if (i === 1 || i === 2)
      return { sx: cx + inner, sy: cy, ex: cx + inner + 42, ey: cy, tx: cx + inner + 52, ty: cy + 8, anchor: "start" as const };
    return { sx: cx - inner, sy: cy, ex: cx - inner - 42, ey: cy, tx: cx - inner - 52, ty: cy + 8, anchor: "end" as const };
  });

  const current = items[active] ?? items[0];

  function go(i: number) {
    const href = `/sectors#sector-${i}`;
    if (window.location.pathname === "/sectors") {
      const el = document.getElementById(`sector-${i}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#sector-${i}`);
      }
      return;
    }
    router.push(href, { scroll: false });
  }

  function pick(i: number) {
    // touch screens: first tap selects, the Explore link opens it
    if (window.matchMedia("(hover: none)").matches) {
      setActive(i);
      return;
    }
    go(i);
  }

  const handlers = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onFocus: () => setActive(i),
    onClick: (e: React.MouseEvent) => {
      e.preventDefault();
      pick(i);
    },
  });

  return (
    <section
      id="industries"
      className="overflow-hidden border-b border-neutral-200 py-10 lg:py-14"
      style={{ backgroundColor: SOFT }}
    >
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-6">
        {/* left: heading + details together */}
        <div className="lg:col-span-5">
        {/* heading */}
        <Reveal>
          <Eyebrow>Explore the sectors</Eyebrow>
          <h2
            className={`${heading} mt-3 text-[30px] font-bold leading-[1.1] tracking-tight sm:text-4xl`}
            style={{ color: NAVY }}
          >
            From raw material to finished product.
          </h2>
        </Reveal>

        {/* details */}
        <div className="mt-6 border-t border-neutral-200 pt-6">
          <div className="min-h-[128px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current?.name}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                <h3
                  className={`${heading} text-2xl font-bold tracking-tight`}
                  style={{ color: NAVY }}
                >
                  {current?.name}
                </h3>
                <p className="mt-2 max-w-[44ch] text-[15px] leading-relaxed text-neutral-600">
                  {current?.detail}
                </p>
                <button
                  type="button"
                  onClick={() => go(active)}
                  className="group mt-4 inline-flex items-center gap-1.5 border-b border-[#eb622f]/50 pb-1 text-[15px] font-semibold text-[#eb622f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f]"
                >
                  Explore
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* phones: names as chips since there is no room for outside labels */}
          <div className="mt-5 flex flex-wrap gap-2 sm:hidden">
            {items.map((s, i) => (
              <button
                key={s.name}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#eb622f] ${
                  i === active
                    ? "border-[#14264a] bg-[#14264a] text-white"
                    : "border-neutral-300 bg-white text-[#14264a]"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="mt-6">
            <ArrowLink href="/sectors">All sector information</ArrowLink>
          </div>
        </div>
        </div>

        {/* hexagon cluster */}
        <div className="lg:col-span-7">
          <svg
            viewBox={wide ? "-480 -335 960 670" : "-255 -262 510 524"}
            className="mx-auto h-auto w-full"
            role="group"
            aria-label="Sectors of PROPACK Odisha 2027"
          >
            <defs>
              {items.map((_, i) => (
                <clipPath key={i} id={`ppx-sec-${i}`}>
                  <polygon points={hexFlat(inner)} />
                </clipPath>
              ))}
            </defs>

            {/* centre hexagon */}
            <motion.g
              initial={reduce ? false : { opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: EASE }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            >
              <polygon points={hexFlat(inner)} fill={ORANGE} />
              <text
                textAnchor="middle"
                fill="#fff"
                fontStyle="italic"
                fontWeight={800}
                fontSize={19}
                className={heading}
              >
                <tspan x="0" y="-27">Eastern</tspan>
                <tspan x="0" y="-5">India&apos;s</tspan>
                <tspan x="0" y="17">Largest MSME</tspan>
                <tspan x="0" y="39">Exhibition</tspan>
              </text>
            </motion.g>

            {/* sector hexagons: photo only, centred */}
            {items.map((sector, i) => {
              const [cx, cy] = pos[i];
              const on = i === active;
              return (
                <g key={sector.name} transform={`translate(${cx} ${cy})`}>
                  <motion.g
                    initial={reduce ? false : { x: -cx, y: -cy, scale: 0.3, opacity: 0 }}
                    whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.08 }}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  >
                    <motion.g
                      animate={{ scale: on ? 1.05 : 1 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        filter: on
                          ? "drop-shadow(0 14px 18px rgba(20,38,74,0.32))"
                          : "drop-shadow(0 0 0 rgba(20,38,74,0))",
                        transition: "filter .4s",
                      }}
                    >
                      <a
                        href={`/sectors#sector-${i}`}
                        aria-label={`${sector.name}: explore`}
                        style={{ cursor: "pointer", outline: "none" }}
                        {...handlers(i)}
                      >
                        <g clipPath={`url(#ppx-sec-${i})`}>
                          <motion.g
                            animate={{ scale: on ? 1.14 : 1 }}
                            transition={{ duration: 0.9, ease: EASE }}
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          >
                            <image
                              href={`/sections/${sector.image}`}
                              x={-R}
                              y={(-S3 * R) / 2}
                              width={2 * R}
                              height={S3 * R}
                              preserveAspectRatio="xMidYMid slice"
                            />
                          </motion.g>
                        </g>
                        <polygon
                          points={hexFlat(inner)}
                          fill="#fff"
                          style={{
                            fillOpacity: on ? 0 : 0.4,
                            transition: "fill-opacity .4s",
                          }}
                        />
                      </a>
                    </motion.g>
                  </motion.g>
                </g>
              );
            })}

            {/* ring that glides to the active hexagon */}
            <motion.g
              initial={false}
              animate={{ x: pos[active][0], y: pos[active][1] }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 240, damping: 26 }
              }
              style={{ pointerEvents: "none" }}
            >
              <polygon
                points={hexFlat(inner * 1.05)}
                fill="none"
                stroke={ORANGE}
                strokeWidth={4}
                strokeLinejoin="round"
              />
            </motion.g>

            {/* names outside the cluster, joined to their hexagon by a line */}
            {wide &&
              items.map((sector, i) => {
                const L = leaders[i];
                const on = i === active;
                const w = 200;
                const rectX =
                  L.anchor === "end" ? L.tx - w : L.anchor === "start" ? L.tx : L.tx - w / 2;
                return (
                  <motion.g
                    key={`label-${sector.name}`}
                    initial={reduce ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, delay: 0.9 + i * 0.08 }}
                  >
                    <a
                      href={`/sectors#sector-${i}`}
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ cursor: "pointer", outline: "none" }}
                      {...handlers(i)}
                    >
                      {/* larger hit area */}
                      <rect x={rectX} y={L.ty - 28} width={w} height={40} fill="transparent" />

                      {/* base line */}
                      <motion.path
                        d={`M ${L.sx} ${L.sy} L ${L.ex} ${L.ey}`}
                        stroke="#b9c0cc"
                        strokeWidth={1.5}
                        fill="none"
                        initial={reduce ? false : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7, ease: EASE, delay: 0.9 + i * 0.08 }}
                      />
                      {/* orange line that draws when active */}
                      <motion.path
                        d={`M ${L.sx} ${L.sy} L ${L.ex} ${L.ey}`}
                        stroke={ORANGE}
                        strokeWidth={3}
                        strokeLinecap="round"
                        fill="none"
                        initial={false}
                        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                      />
                      {/* dot on the hexagon edge */}
                      <motion.circle
                        cx={L.sx}
                        cy={L.sy}
                        initial={false}
                        animate={{ r: on ? 6 : 3.5, fill: on ? ORANGE : "#9aa3b2" }}
                        transition={{ duration: 0.3 }}
                      />
                      <text
                        x={L.tx}
                        y={L.ty}
                        textAnchor={L.anchor}
                        fontSize={23}
                        fontWeight={700}
                        className={heading}
                        style={{
                          fill: on ? NAVY : "#8a93a3",
                          transition: "fill .3s",
                        }}
                      >
                        {sector.name}
                      </text>
                    </a>
                  </motion.g>
                );
              })}
          </svg>
        </div>

      </div>
    </section>
  );
}

/* =========================================================================
   3. PARTICIPATION  (diagonal split, like the brochure's stripes)
   ========================================================================= */
export function ParticipationPreview() {
  const cards = [
    {
      label: "For exhibitors",
      title: "Bring your innovation to market.",
      text: "Showcase machinery, equipment, and materials, meet serious industry professionals, and develop relationships across connected sectors.",
      href: "/exhibitors",
      cta: "Explore exhibiting",
      dark: true,
    },
    {
      label: "For visitors",
      title: "Find your next business solution.",
      text: "For manufacturers, processors, procurement teams, and entrepreneurs: compare technologies, access policy and finance, and network.",
      href: "/visitors",
      cta: "Plan your visit",
      dark: false,
    },
  ];

  return (
    <section className="border-b border-neutral-200 bg-white py-12 lg:py-16">
      <div className="container mx-auto grid grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 lg:gap-6">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.1} className="h-full">
            <Link
              href={c.href}
              className={`group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f] sm:p-10 ${
                c.dark
                  ? "text-white hover:shadow-[0_30px_50px_-30px_rgba(20,38,74,0.9)]"
                  : "border border-neutral-200 bg-white hover:border-[#eb622f]/50 hover:shadow-[0_30px_50px_-34px_rgba(20,38,74,0.45)]"
              }`}
              style={c.dark ? { backgroundColor: NAVY } : undefined}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1"
                style={{ backgroundColor: c.dark ? ORANGE : NAVY }}
              />
              <div>
                <p className="text-[14px] font-semibold" style={{ color: ORANGE }}>
                  {c.label}
                </p>
                <h2
                  className={`${heading} mt-4 max-w-[18ch] text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[34px]`}
                  style={{ color: c.dark ? "#fff" : NAVY }}
                >
                  {c.title}
                </h2>
                <p
                  className={`mt-4 max-w-[44ch] text-sm leading-relaxed sm:text-base ${
                    c.dark ? "text-white/75" : "text-neutral-600"
                  }`}
                >
                  {c.text}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span
                  className="text-[15px] font-semibold"
                  style={{ color: c.dark ? "#fff" : NAVY }}
                >
                  {c.cta}
                </span>
             <span
  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300
    ${
      c.dark
        ? "border-white/40 bg-white text-[#14264a]"
        : "border-[#14264a] bg-white text-[#14264a]"
    }
    group-hover:!border-[#eb622f]
    group-hover:!bg-[#eb622f]
    group-hover:!text-white
  `}
>
  <ArrowUpRight
    size={18}
    strokeWidth={2.5}
    className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
  />
</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================================================================
   4. CONCURRENT PROGRAMME  (from the brochure)
   ========================================================================= */
export function ProgrammePreview() {
  const reduce = useReducedMotion();
  const days = [
    {
      day: "Day 1",
      title: "Inauguration",
      text: "Formal opening in the presence of State dignitaries, followed by an industry outlook session.",
    },
    {
      day: "Day 2",
      title: "Business and Technical Sessions",
      text: "Technology, finance, compliance and market access for packaging MSMEs.",
    },
    {
      day: "Day 3",
      title: "SheBuilds Odisha",
      text: "A full day dedicated to women entrepreneurs and women-led enterprises.",
    },
    {
      day: "Day 4",
      title: "Valedictory and Awards",
      text: "Recognition of exhibitors, innovators and enterprises, followed by the closing session.",
    },
  ];

  return (
    <section
      className="border-b border-neutral-200 py-16 lg:py-24"
      style={{ backgroundColor: SOFT }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal>
          <Eyebrow>PROPACK Odisha 2027</Eyebrow>
          <h2
            className={`${heading} mt-4 text-[30px] font-bold leading-[1.12] tracking-tight sm:text-4xl`}
            style={{ color: NAVY }}
          >
            Concurrent Programme
          </h2>
        </Reveal>

        <div className="relative mt-12">
          {/* line that draws itself (desktop) */}
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[11px] hidden h-px origin-left md:block"
            style={{ backgroundColor: NAVY, opacity: 0.25 }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE }}
          />

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {days.map((d, i) => (
              <li key={d.day}>
                <Reveal delay={i * 0.12}>
                  <div className="flex items-center gap-3">
                    <svg viewBox="-12 -12 24 24" className="h-6 w-6 shrink-0" aria-hidden="true">
                      <polygon points={hexFlat(11)} fill={i === 2 ? TEAL : ORANGE} />
                    </svg>
                    <span
                      className="text-[13px] font-bold"
                      style={{ color: i === 2 ? TEAL : ORANGE }}
                    >
                      {d.day}
                    </span>
                  </div>
                  <h3
                    className={`${heading} mt-5 text-xl font-bold leading-snug`}
                    style={{ color: NAVY }}
                  >
                    {d.title}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-neutral-600">
                    {d.text}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2} className="mt-12">
          <p
            className="border-l-2 pl-4 text-[15px] leading-relaxed text-neutral-600"
            style={{ borderColor: ORANGE }}
          >
            Structured buyer–seller meets and one-to-one B2B matchmaking will
            run alongside the exhibition on all four days.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   5. SHE BUILDS PREVIEW  (image with a slanted edge and an orange stripe)
   ========================================================================= */
export function SheBuildsPreview() {
  const points = [
    <>
      <strong className="font-semibold" style={{ color: NAVY }}>
        The Women Entrepreneurship Platform (WEP) Odisha Chapter
      </strong>{" "}
      provides mentoring, market linkage and financing support to women-led
      enterprises.
    </>,
    <>
      <strong className="font-semibold" style={{ color: NAVY }}>
        Subhadra Yojana and the Lakhpati Didi mission
      </strong>{" "}
      have brought lakhs of rural women into enterprise and self-employment
      across Odisha.
    </>,
    <>
      Women already account for{" "}
      <strong className="font-semibold" style={{ color: NAVY }}>
        over 42% of PMEGP beneficiaries
      </strong>{" "}
      in the State.
    </>,
  ];

  return (
    <section className="border-b border-neutral-200 bg-white py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm lg:grid-cols-12">
            {/* content */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7 lg:p-14">
              <Eyebrow>She&apos;BUILDS Odisha</Eyebrow>
              <h2
                className={`${heading} mb-5 mt-4 text-[28px] font-bold leading-[1.1] tracking-tight sm:text-3xl lg:text-4xl`}
                style={{ color: NAVY }}
              >
                A Day for Women in Enterprise
              </h2>

              <p className="mb-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                One full day of PROPACK Odisha 2027 is dedicated to women
                entrepreneurs, in alignment with the State&apos;s women-led
                development agenda.
              </p>

              <ul className="mb-6 space-y-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                {points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: ORANGE }}
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mb-8 text-sm leading-relaxed text-neutral-600 sm:text-base">
                The SheBuilds Odisha day will feature women industry leaders,
                financing institutions, skill partners and a curated
                buyer–seller session for women-owned enterprises.
              </p>

              <div>
                <PillButton href="/she-builds">
                  Explore She&apos;Builds Odisha
                </PillButton>
              </div>
            </div>

            {/* image: normal grid cell, slanted edge + orange stripe on desktop */}
            <div className="relative min-h-[320px] sm:min-h-[400px] lg:col-span-5 lg:min-h-[560px] lg:bg-[#eb622f] lg:[clip-path:polygon(64px_0,100%_0,100%_100%,0_100%)]">
              <div className="absolute inset-0 lg:left-[14px] lg:[clip-path:polygon(64px_0,100%_0,100%_100%,0_100%)]">
                <Image
                  src="/sections/she.png"
                  alt="Women in Enterprise at She'Builds Odisha"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   6. TECHNOLOGY PREVIEW
   ========================================================================= */
export function TechnologyPreview() {
  return (
    <section className="text-white" style={{ backgroundColor: NAVY }}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* full-bleed image */}
        <div className="relative min-h-[300px] sm:min-h-[400px] lg:min-h-[540px]">
          <Image
            src="/assets/packaging.webp"
            alt="Paper, board and container packaging materials"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1.5"
            style={{ backgroundColor: ORANGE }}
          />
        </div>

        {/* content */}
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-14 lg:py-20 xl:px-20">
          <Reveal className="max-w-xl">
            <Eyebrow>Odisha: The Growth Engine of Eastern India</Eyebrow>
            <h2
              className={`${heading} mt-4 text-[28px] font-bold leading-[1.12] tracking-tight sm:text-4xl`}
            >
              Packaging is no longer a downstream cost line —
              <span style={{ color: ORANGE }}> it is a growth industry.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-[17px] sm:leading-8">
              India&apos;s packaging market is estimated at over{" "}
              <strong className="font-semibold text-white">USD 100 billion</strong>{" "}
              and projected to grow at a{" "}
              <strong className="font-semibold text-white">
                double-digit compound rate through 2030
              </strong>
              , anchored by Vision 2036 and Viksit Odisha 2047.
            </p>
            <div className="mt-8">
              <ArrowLink href="/sectors" light>
                Explore the technology sectors &amp; plastics advantage
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================================
   7. PAST EXPOS  (real photos in a moving honeycomb strip)
   ========================================================================= */
const GALLERY = [
  { src: "/gallery/expo-01.webp", alt: "Inauguration at a past PROPACK Odisha expo with the venue model" },
  { src: "/gallery/expo-02.webp", alt: "Exhibition hall at a past PROPACK Odisha expo" },
  { src: "/gallery/expo-03.webp", alt: "Pouches and shrink sleeves printing stall at a past expo" },
  { src: "/gallery/expo-04.webp", alt: "Exhibitor stall at a past PROPACK Odisha expo" },
  { src: "/gallery/expo-05.webp", alt: "Exhibitor team at their stall in a past expo" },
  { src: "/gallery/expo-06.webp", alt: "Machinery stall with visitors at a past expo" },
  { src: "/gallery/expo-07.webp", alt: "Polymers exhibitor stall at a past expo" },
  { src: "/gallery/expo-08.webp", alt: "Printing machinery stall at a past expo" },
  { src: "/gallery/expo-09.webp", alt: "Aisle of exhibitor stalls at a past expo" },
  { src: "/gallery/expo-10.webp", alt: "Film line machinery on display at a past expo" },
] as const;

function HexMarquee({ speed = 40 }: { speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.scrollWidth / 2;
    if (!w) return;
    if (!paused.current) x.current -= (speed * Math.min(delta, 64)) / 1000;
    if (x.current <= -w) x.current += w;
    el.style.transform = `translate3d(${x.current}px,0,0)`;
  });

  const tiles = useMemo(() => [...GALLERY, ...GALLERY], []);

  return (
    <div
      className="relative overflow-hidden"
      style={
        {
          "--hw": "clamp(190px, 22vw, 300px)",
          height: "calc(var(--hw) / 1.1547 * 1.5 + 12px)",
        } as React.CSSProperties
      }
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {tiles.map((img, i) => (
              <div
                key={`${copy}-${i}`}
                className="shrink-0"
                style={{
                  width: "var(--hw)",
                  marginRight: "calc(var(--hw) * -0.25)",
                  transform:
                    i % 2 === 1 ? "translateY(calc(var(--hw) / 2.3094))" : undefined,
                }}
              >
                <div
                  className="relative aspect-[1.1547] w-full"
                  style={{ clipPath: HEX_CLIP, transform: "scale(0.965)" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PastExposGallery() {
  return (
    <section className="overflow-hidden border-b border-neutral-200 bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>People · Partnership · Progress</Eyebrow>
            <h2
              className={`${heading} mt-4 text-[30px] font-bold leading-[1.12] tracking-tight sm:text-4xl`}
              style={{ color: NAVY }}
            >
              Glimpses of our <span style={{ color: ORANGE }}>past expos</span>
            </h2>
          </div>
          <p
            className={`${heading} text-xl font-bold italic sm:text-2xl`}
            style={{ color: TEAL }}
          >
            Building Industries together
          </p>
        </Reveal>
      </div>

      <div className="mt-10">
        <HexMarquee />
      </div>

      <div className="container mx-auto mt-8 px-4 sm:px-6">
        <p
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[14px] font-semibold"
          style={{ color: NAVY }}
        >
          <span>Exhibit</span>
          <span>Connect</span>
          <span>Collaborate</span>
          <span>Grow</span>
        </p>
      </div>
    </section>
  );
}

/* =========================================================================
   8. VENUE PREVIEW  (stripes from the brochure cover)
   ========================================================================= */
export function VenuePreview() {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200 py-12 lg:py-16"
      style={{ backgroundColor: SOFT }}
    >
      {/* diagonal stripes, orange and teal */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-48 md:block lg:w-64"
      >
        <polygon points="62,0 100,0 100,100 30,100" fill={ORANGE} />
        <polygon points="46,0 56,0 24,100 14,100" fill={TEAL} />
      </svg>

      <div className="container relative mx-auto flex flex-col items-start justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center md:pr-48 lg:pr-64">
        <Reveal className="flex items-start gap-4 sm:gap-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: `${TEAL}1a`, color: TEAL }}
          >
            <MapPin size={26} />
          </div>
          <div>
            <Eyebrow>Meet in Bhubaneswar</Eyebrow>
            <h2
              className={`${heading} mt-2 text-2xl font-bold tracking-tight sm:text-3xl`}
              style={{ color: NAVY }}
            >
              Janata Maidan, Odisha
            </h2>
            <p className="mt-1.5 text-sm text-neutral-600">
              25th to 28th February 2027 · Free entry for registered trade
              visitors
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="shrink-0">
          <PillButton href="/visitors#plan-your-visit">
            Plan your journey
          </PillButton>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================================
   9. ORGANIZER STRIP
   ========================================================================= */
export function OrganizerSection() {
  return <OrganizerStrip />;
}