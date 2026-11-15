"use client";



import { useEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";

import Link from "next/link";

import { motion, useAnimationFrame, useReducedMotion } from "framer-motion";

import { ArrowUpRight } from "lucide-react";



/* Site palette only */

const NAVY = "#14264a";

const ORANGE = "#eb622f";

const TEAL = "#0d7479";



/* Height of your sticky header. Hero fills the rest of the screen on desktop. */

const HEADER_H = 80;



const EASE_OUT = [0.16, 1, 0.3, 1] as const;



// all six sectors, always together

const SECTORS = [

  "Packaging",

  "Printing",

  "Plastics",

  "Processing",

  "Paper",

  "Green Energy",

] as const;



// lines taken from the site copy

const MESSAGES = [

  "4th Edition • Propack Odisha 2027",

  "One Expo. Endless Solutions.",

  "A leading MSME exhibition in Eastern India",

  "Powering multiple industries and driving the future",

  "Machinery, technology, materials and sustainable solutions",

] as const;



const SUPPORTERS = [

  { src: "/logo/support-1.png", alt: "MSME Department, Government of Odisha" },

  {

    src: "/logo/ipcal.png",

    alt: "Industrial Promotion & Investment Corporation of Odisha",

  },

  { src: "/logo/support-2.png", alt: "Ministry of MSME, Government of India" },

] as const;



const LETTERS = "PROPACK".split("");



// Expo runs 25 to 28 Feb 2027 (IST)

const EXPO_START = new Date("2027-02-25T00:00:00+05:30").getTime();

const EXPO_END = new Date("2027-02-28T23:59:59+05:30").getTime();



/* ---------- helpers ---------- */



const pad = (n: number) => String(n).padStart(2, "0");



type Countdown =

  | null

  | { state: "before"; d: number; h: number; m: number; s: number }

  | { state: "live" }

  | { state: "after" };



function useCountdown(): Countdown {

  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {

    setNow(Date.now());

    const id = setInterval(() => setNow(Date.now()), 1000);

    return () => clearInterval(id);

  }, []);



  if (now === null) return null;

  if (now > EXPO_END) return { state: "after" };

  if (now >= EXPO_START) return { state: "live" };

  const diff = EXPO_START - now;

  return {

    state: "before",

    d: Math.floor(diff / 86_400_000),

    h: Math.floor((diff % 86_400_000) / 3_600_000),

    m: Math.floor((diff % 3_600_000) / 60_000),

    s: Math.floor((diff % 60_000) / 1000),

  };

}



// pointy-top hexagon points

function hexPoints(cx: number, cy: number, r: number) {

  return Array.from({ length: 6 }, (_, k) => {

    const a = (Math.PI / 180) * (60 * k - 30);

    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;

  }).join(" ");

}



function Star({ className = "" }: { className?: string }) {

  return (

    <svg

      viewBox="0 0 24 24"

      fill="currentColor"

      className={`ppx-spin shrink-0 ${className}`}

      aria-hidden="true"

    >

      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />

    </svg>

  );

}



/* Live countdown pill: replaces the plain "days to go" text */

function CountdownPill({ data }: { data: Countdown }) {

  if (!data || data.state === "after") return null;

  return (

    <motion.span

      initial={{ opacity: 0, y: 10 }}

      animate={{ opacity: 1, y: 0 }}

      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.3 }}

      className="inline-flex items-center gap-2.5 rounded-full py-1.5 pl-3 pr-4 text-[12.5px] text-white shadow-sm sm:text-[13px]"

      style={{ backgroundColor: NAVY }}

    >

      <span className="relative flex h-2 w-2">

        <span

          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"

          style={{ backgroundColor: "#fff" }}

        />

        <span

          className="relative inline-flex h-2 w-2 rounded-full"

          style={{ backgroundColor: "#fff" }}

        />

      </span>

      {data.state === "live" ? (

        <span className="font-semibold">Expo is live now</span>

      ) : (

        <>

          <span className="text-white/70">Starts in</span>

          <span className="font-semibold tabular-nums">

            {data.d}d {pad(data.h)}h {pad(data.m)}m {pad(data.s)}s

          </span>

        </>

      )}

    </motion.span>

  );

}



/* Animated hexagon honeycomb behind everything (the brochure's motif) */

function HexBackground({ reduce }: { reduce: boolean | null }) {

  const R = 46;

  const W = Math.sqrt(3) * R;

  const cells = useMemo(() => {

    const out: {

      key: string;

      pts: string;

      pulse: boolean;

      teal: boolean;

      dur: number;

      delay: number;

    }[] = [];

    for (let j = 0; j < 11; j++) {

      for (let i = 0; i < 16; i++) {

        const cx = i * W + (j % 2 ? W / 2 : 0);

        const cy = j * (R * 1.5);

        out.push({

          key: `${i}-${j}`,

          pts: hexPoints(cx, cy, R - 2),

          pulse: (i * 3 + j * 5) % 7 === 0,

          teal: (i + j) % 2 === 0,

          dur: 4 + ((i + j) % 3) * 1.5,

          delay: ((i * j) % 6) * 0.8,

        });

      }

    }

    return out;

  }, [W]);



  return (

    <div

      aria-hidden="true"

      className="pointer-events-none absolute inset-0 -z-10"

      style={{

        maskImage:

          "radial-gradient(ellipse 85% 90% at 62% 45%, rgba(0,0,0,0.35) 0%, #000 100%)",

        WebkitMaskImage:

          "radial-gradient(ellipse 85% 90% at 62% 45%, rgba(0,0,0,0.35) 0%, #000 100%)",

      }}

    >

      <svg

        viewBox="0 0 1200 700"

        preserveAspectRatio="xMidYMid slice"

        className="h-full w-full"

      >

        {cells.map((c) =>

          c.pulse && !reduce ? (

            <motion.polygon

              key={c.key}

              points={c.pts}

              fill={c.teal ? TEAL : ORANGE}

              stroke={ORANGE}

              strokeOpacity={0.18}

              strokeWidth={1}

              initial={{ fillOpacity: 0 }}

              animate={{ fillOpacity: [0, 0.18, 0] }}

              transition={{

                duration: c.dur,

                delay: c.delay,

                repeat: Infinity,

                ease: "easeInOut",

              }}

            />

          ) : (

            <polygon

              key={c.key}

              points={c.pts}

              fill="none"

              stroke={ORANGE}

              strokeOpacity={0.18}

              strokeWidth={1}

            />

          )

        )}

      </svg>

    </div>

  );

}



/* Three floating hexagons (two with photos) that frame the date badge */

function HexCluster({ reduce }: { reduce: boolean | null }) {

  const R = 62;

  const hexes = [

    { cx: 120, cy: 70, img: "/assets/printing.webp", id: "a", dur: 6 },

    { cx: 66, cy: 163, fill: TEAL, id: "b", dur: 7.5 },

    { cx: 174, cy: 163, img: "/assets/packaging.webp", id: "c", dur: 6.8 },

  ];

  return (

    <svg

      viewBox="0 0 240 240"

      className="pointer-events-none absolute left-1/2 top-1/2 w-[150%] -translate-x-1/2 -translate-y-1/2"

      aria-hidden="true"

    >

      <defs>

        {hexes.map((h) => (

          <clipPath key={h.id} id={`ppx-hex-${h.id}`}>

            <polygon points={hexPoints(h.cx, h.cy, R)} />

          </clipPath>

        ))}

      </defs>

      {hexes.map((h, i) => (

        <motion.g

          key={h.id}

          initial={{ opacity: 0, scale: 0.7 }}

          animate={

            reduce

              ? { opacity: 1, scale: 1 }

              : { opacity: 1, scale: 1, y: [0, -5, 0] }

          }

          transition={{

            opacity: { duration: 0.8, delay: 0.9 + i * 0.15 },

            scale: { duration: 0.9, ease: EASE_OUT, delay: 0.9 + i * 0.15 },

            y: { duration: h.dur, repeat: Infinity, ease: "easeInOut" },

          }}

          style={{ transformOrigin: `${h.cx}px ${h.cy}px` }}

        >

          {h.img ? (

            <image

              href={h.img}

              x={h.cx - R}

              y={h.cy - R}

              width={R * 2}

              height={R * 2}

              preserveAspectRatio="xMidYMid slice"

              clipPath={`url(#ppx-hex-${h.id})`}

            />

          ) : (

            <polygon points={hexPoints(h.cx, h.cy, R)} fill={h.fill} />

          )}

          <polygon

            points={hexPoints(h.cx, h.cy, R)}

            fill="none"

            stroke="#fff"

            strokeWidth={4}

          />

        </motion.g>

      ))}

    </svg>

  );

}



/**

* * Infinite ticker driven by requestAnimationFrame (via framer's*

* * useAnimationFrame), so it always moves: no CSS keyframes, nothing that a*

* * reduced-motion setting or a stylesheet clash can silently switch off.*

* * dir -1 = content travels right to left, dir 1 = left to right.*

* */

function Ticker({

  items,

  dir,

  speed,

  starClass,

  textClass,

  outlineAlt = false,

}: {

  items: readonly string[];

  dir: 1 | -1;

  speed: number; // px per second

  starClass: string;

  textClass: string;

  outlineAlt?: boolean;

}) {

  const trackRef = useRef<HTMLDivElement>(null);

  const x = useRef(0);

  const paused = useRef(false);



  // three passes per half so even ultra-wide screens never show a gap

  const half = useMemo(() => [...items, ...items, ...items], [items]);



  useAnimationFrame((_, delta) => {

    const el = trackRef.current;

    if (!el) return;

    const w = el.scrollWidth / 2;

    if (!w) return;

    if (!paused.current) {

      x.current += (dir * speed * Math.min(delta, 64)) / 1000;

    }

    if (dir === -1 && x.current <= -w) x.current += w;

    if (dir === 1 && x.current >= 0) x.current -= w;

    el.style.transform = `translate3d(${x.current}px,0,0)`;

  });



  return (

    <div

      className="flex w-max items-center"

      aria-hidden="true"

      onMouseEnter={() => (paused.current = true)}

      onMouseLeave={() => (paused.current = false)}

    >

      <div

        ref={trackRef}

        className="flex w-max items-center will-change-transform"

        style={{ transform: "translate3d(0,0,0)" }}

      >

        {[0, 1].map((copy) => (

          <div key={copy} className="flex shrink-0 items-center">

            {half.map((t, i) => {

              const outline = outlineAlt && i % 2 === 1;

              return (

                <span key={`${copy}-${i}`} className="flex items-center">

                  <span

                    className={`whitespace-nowrap px-5 sm:px-8 ${textClass}`}

                    style={

                      outline

                        ? { color: "transparent", WebkitTextStroke: "1.5px #fff" }

                        : undefined

                    }

                  >

                    {t}

                  </span>

                  <Star className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${starClass}`} />

                </span>

              );

            })}

          </div>

        ))}

      </div>

    </div>

  );

}



function Supporters({ className = "" }: { className?: string }) {

  return (

    <div className={`items-center gap-x-5 gap-y-3 ${className}`}>

      <span className="text-[12px] text-neutral-500">Supported by</span>

      {SUPPORTERS.map((s) => (

        <Image

          key={s.src}

          src={s.src}

          alt={s.alt}

          width={120}

          height={36}

          className="h-7 w-auto object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"

        />

      ))}

    </div>

  );

}



/* ---------- main ---------- */



export function HomeHero() {

  const reduce = useReducedMotion();

  const countdown = useCountdown();



  // phones: full width. tablets: leaves room for the badge. desktop: also fits the screen height

  const wordFont =

    "font-[family-name:var(--font-heading)] font-black leading-[0.82] tracking-[-0.05em] [font-size:20.5cqw] sm:[font-size:15.5cqw] lg:[font-size:min(16cqw,21svh)]";



  return (

    <section

      className="relative isolate w-full overflow-hidden bg-white lg:flex lg:flex-col"

      style={

        {

          color: NAVY,

          "--hero-h": `calc(100svh - ${HEADER_H}px)`,

        } as React.CSSProperties

      }

    >

      <style>{`

        @keyframes ppx-spin { to { transform: rotate(360deg) } }

        .ppx-spin { animation: ppx-spin 14s linear infinite; }

        @media (min-width: 1024px) {

          .ppx-fit { height: var(--hero-h); min-height: 600px; max-height: 900px; }

        }

        @media (prefers-reduced-motion: reduce) {

          .ppx-spin { animation: none !important; }

        }

      `}</style>



      <HexBackground reduce={reduce} />



      <div className="ppx-fit flex flex-col">

        {/* content block */}

        <div

          className="container mx-auto flex flex-1 flex-col justify-evenly gap-6 px-4 pb-3 pt-6 sm:px-6 lg:gap-0 lg:pt-5"

          style={{ containerType: "inline-size" }}

        >

          {/* top row */}

          <div className="flex flex-wrap items-center justify-between gap-3">

            <div className="flex flex-wrap items-center gap-2">

              <motion.span

                initial={{ opacity: 0, y: 10 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 }}

                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1.5 pl-2.5 pr-4 text-[12.5px] font-semibold shadow-sm sm:text-[13px]"

              >

                <span className="relative flex h-2 w-2">

                  <span

                    className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"

                    style={{ backgroundColor: ORANGE }}

                  />

                  <span

                    className="relative inline-flex h-2 w-2 rounded-full"

                    style={{ backgroundColor: ORANGE }}

                  />

                </span>

                4th Edition • Propack Odisha 2027

              </motion.span>



              <CountdownPill data={countdown} />

            </div>



            <motion.div

              initial={{ opacity: 0 }}

              animate={{ opacity: 1 }}

              transition={{ duration: 0.8, delay: 1.2 }}

              className="hidden rounded-full bg-white/80 py-1 pl-3 pr-2 backdrop-blur lg:block"

            >

              <Supporters className="flex" />

            </motion.div>

          </div>



          {/* wordmark + date badge */}

          <div className="relative flex items-center justify-between gap-4 sm:gap-6">

            <h1

              className="relative min-w-0 select-none"

            >

              <span className="sr-only">
                PROPACK Odisha 2027 International Packaging, Printing and Plastics Expo
              </span>

              {/* one solid navy, each letter rises from its own mask */}

              <span

                aria-hidden="true"

                className={`flex ${wordFont}`}

                style={{

                  color: NAVY,

                  filter: "drop-shadow(0 18px 22px rgba(20,38,74,0.16))",

                }}

              >

                {LETTERS.map((ch, i) => (

                  <span

                    key={i}

                    className="-mr-[0.06em] block overflow-hidden pb-[0.07em] pr-[0.06em]"

                  >

                    <motion.span

                      initial={{ y: reduce ? 0 : "110%" }}

                      animate={{ y: 0 }}

                      transition={{

                        duration: 0.95,

                        ease: EASE_OUT,

                        delay: 0.2 + i * 0.07,

                      }}

                      className="block"

                    >

                      {ch}

                    </motion.span>

                  </span>

                ))}

              </span>

            </h1>



            {/* date badge on a photo-hexagon cluster; badge doubles as booking link */}

            <div

              className="relative hidden shrink-0 sm:block"

              style={{

                width: "clamp(88px, min(14cqw, 19svh), 168px)",

                height: "clamp(88px, min(14cqw, 19svh), 168px)",

              }}

            >

              <HexCluster reduce={reduce} />

              <motion.div

                initial={{ opacity: 0, scale: 0.6, rotate: -40 }}

                animate={{ opacity: 1, scale: 1, rotate: 0 }}

                transition={{ duration: 1, ease: EASE_OUT, delay: 1.3 }}

                className="absolute inset-0"

              >

                <Link

                  href="/exhibitor-registration"

                  aria-label="Book your stall for Propack Odisha 2027"

                  className="group relative block h-full w-full"

                >

                  <svg

                    viewBox="0 0 200 200"

                    className="ppx-spin absolute inset-0 h-full w-full drop-shadow-[0_10px_24px_rgba(20,38,74,0.25)]"

                    aria-hidden="true"

                  >

                    <defs>

                      <path

                        id="ppx-badge-path"

                        d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"

                      />

                    </defs>

                    <circle cx="100" cy="100" r="98" fill="#fff" />

                    <text

                      fontSize="15.5"

                      fontWeight="700"

                      fill={NAVY}

                      letterSpacing="1"

                    >

                      <textPath

                        href="#ppx-badge-path"

                        textLength="486"

                        lengthAdjust="spacing"

                      >

                        25–28 February 2027 ✦ Bhubaneswar ✦ Odisha ✦

                      </textPath>

                    </text>

                  </svg>

                  <span

                    className="absolute inset-[24%] flex items-center justify-center rounded-full text-white shadow-[0_14px_30px_-10px_rgba(235,98,47,0.8)] transition-transform duration-500 group-hover:scale-110"

                    style={{ backgroundColor: ORANGE }}

                  >

                    <ArrowUpRight className="h-1/2 w-1/2 transition-transform duration-500 group-hover:rotate-45" />

                  </span>

                </Link>

              </motion.div>

            </div>

          </div>



          {/* edition line + message */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <motion.p

                initial={{ opacity: 0, y: 20 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.75 }}

                aria-hidden="true"

                className="font-[family-name:var(--font-heading)] font-black uppercase leading-[0.9] tracking-[-0.03em] [font-size:11cqw] sm:[font-size:8cqw] lg:[font-size:min(7.2cqw,9.5svh)]"

              >

                <span style={{ color: NAVY }}>Odisha</span>{" "}

                <span style={{ color: ORANGE }}>2027</span>

              </motion.p>



              <motion.dl

                initial={{ opacity: 0, y: 12 }}

                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.95 }}

                className="mt-4 flex flex-wrap gap-x-10 gap-y-3"

              >

                <div>

                  <dt className="text-[12px] text-neutral-500">Dates</dt>

                  <dd className="font-[family-name:var(--font-heading)] text-[19px] font-semibold leading-tight sm:text-[22px]">

                    25–28 Feb 2027

                  </dd>

                </div>

                <div>

                  <dt className="text-[12px] text-neutral-500">Venue</dt>

                  <dd className="font-[family-name:var(--font-heading)] text-[19px] font-semibold leading-tight sm:text-[22px]">

                    Bhubaneswar, Odisha

                  </dd>

                </div>

              </motion.dl>

            </div>



            <motion.div

              initial={{ opacity: 0, y: 16 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.9 }}

              className="lg:w-[38%] lg:min-w-[340px]"

            >

              <h2 className="font-[family-name:var(--font-heading)] text-[22px] font-bold leading-[1.1] tracking-tight sm:text-[26px]">

                One Expo. Endless Solutions.

              </h2>

              <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-neutral-600">

                A leading MSME exhibition in Eastern India powering multiple

                industries and driving the future through machinery,

                technology, materials, and sustainable solutions.

              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5">

                <Link

                  href="/exhibitor-registration"

                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-[14px] font-semibold text-white shadow-[0_12px_28px_-10px_rgba(235,98,47,0.7)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f]"

                  style={{ backgroundColor: ORANGE }}

                >

                  <span

                    aria-hidden="true"

                    className="absolute inset-0 -translate-x-full text-white! bg-black/15 transition-transform duration-500 ease-out group-hover:translate-x-0"

                  />

                  <span className="relative">Book your stall</span>

                  <ArrowUpRight

                    size={16}

                    className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"

                  />

                </Link>

                <Link

                  href="/visitor-registration"

                  className="inline-flex items-center rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-[14px] font-semibold transition-colors duration-300 hover:border-[#14264a] hover:bg-[#14264a] hover:text-white! focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f]"

                >

                  Register as visitor

                </Link>

                <Link

                  href="/brochure"

                  className="group px-1 py-2.5 text-[14px] font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#eb622f]"

                >

                  <span className="border-b border-neutral-300 pb-0.5 transition-colors group-hover:border-neutral-900">

                    Brochure

                  </span>

                </Link>

              </div>

            </motion.div>

          </div>

        </div>



        {/* criss-cross infinite bands, opposite directions */}

        <div

          className="relative h-[124px] shrink-0 sm:h-[150px]"

          aria-label="Packaging, Printing, Plastics, Processing, Paper and Green Energy"

        >

          {/* navy band: site messages, travels left to right */}

          <div className="absolute inset-x-[-8%] top-1/2 z-10 -translate-y-1/2">

            <motion.div

              initial={{ opacity: 0, y: 30 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.15 }}

              className="rotate-[2.4deg] border-y border-white/10 py-2.5 sm:py-3"

              style={{ backgroundColor: NAVY }}

            >

              <Ticker

                items={MESSAGES}

                dir={1}

                speed={60}

                starClass="text-[#eb622f]"

                textClass="text-[14px] font-medium tracking-wide text-white sm:text-[16px]"

              />

            </motion.div>

          </div>



          {/* orange band: all six sectors, travels right to left */}

          <div className="absolute inset-x-[-8%] top-1/2 z-20 -translate-y-1/2">

            <motion.div

              initial={{ opacity: 0, y: 30 }}

              animate={{ opacity: 1, y: 0 }}

              transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.3 }}

              className="-rotate-[2.6deg] border-y border-white/30 py-1.5 shadow-[0_22px_44px_-20px_rgba(20,38,74,0.55)] sm:py-2"

              style={{ backgroundColor: ORANGE }}

            >

              <Ticker

                items={SECTORS}

                dir={-1}

                speed={80}

                outlineAlt

                starClass="text-white"

                textClass="font-[family-name:var(--font-heading)] text-[26px] font-extrabold leading-none tracking-tight text-white sm:text-[38px]"

              />

            </motion.div>

          </div>

        </div>

      </div>



      {/* phones and tablets: supporters sit under the bands */}

      <div className="border-t border-neutral-200 bg-white lg:hidden">

        <Supporters className="container mx-auto flex flex-wrap px-4 py-4 sm:px-6" />

      </div>

    </section>

  );

}