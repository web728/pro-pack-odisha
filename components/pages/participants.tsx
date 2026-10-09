"use client";

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Cog,
  FileText,
  FlaskConical,
  Layers,
  Search,
  Shapes,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button, Eyebrow, TextLink } from "@/components/shared/ui";
import { RevealSection } from "@/components/shared/motion";
import {
  industryMeta,
  participants,
  type IndustryKey,
} from "@/lib/participants-data";

type Filter = "all" | IndustryKey;

const ICONS: Record<IndustryKey, LucideIcon> = {
  paper: FileText,
  polymer: Layers,
  engineering: Cog,
  food: UtensilsCrossed,
  testing: FlaskConical,
  others: Shapes,
};

const ORDER: IndustryKey[] = [
  "paper",
  "polymer",
  "engineering",
  "food",
  "testing",
  "others",
];

function initials(name: string) {
  const words = name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(" ")
    .filter(Boolean);
  return ((words[0]?.[0] ?? "") + (words[1]?.[0] ?? "")).toUpperCase();
}

export function ParticipantsContent() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: participants.length };
    ORDER.forEach((k) => (c[k] = 0));
    participants.forEach((p) => {
      if (p.industry) c[p.industry] += 1;
    });
    return c;
  }, []);

  const maxCount = Math.max(...ORDER.map((k) => counts[k]));

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return participants.filter((p) => {
      if (filter !== "all" && p.industry !== filter) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [filter, query]);

  const tabs: { key: Filter; label: string }[] = [
    { key: "all", label: "All participants" },
    ...ORDER.map((k) => ({ key: k as Filter, label: industryMeta[k].label })),
  ];

  return (
    <>
      <style>{`
        @keyframes pp-rise {
          from { opacity: 0; transform: translateY(18px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pp-bar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pp-float {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .pp-card { animation: pp-rise 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .pp-bar  { transform-origin: left; animation: pp-bar 1.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .pp-float { animation: pp-float 7s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .pp-card, .pp-bar, .pp-float { animation: none !important; }
        }
      `}</style>

      {/* 1. Hero + industry spread */}
      <RevealSection className="relative overflow-hidden border-b border-[var(--border)] bg-[#f7f8f7] py-16 lg:py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#EB622F]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#15A7AE]/10 blur-3xl" />

        <div className="container relative mx-auto grid grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <Eyebrow>Previous Participants</Eyebrow>

            <h1 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-extrabold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Companies that have <br />
              <span className="text-[#EB622F]">shaped every edition.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              From packaging and printing to plastics, engineering and food
              processing, exhibitors from across the value chain have taken
              part in PROPACK Odisha. Here is the list of our{" "}
              <strong className="font-semibold text-[#1F3864]">
                previous participants
              </strong>
              .
            </p>

            <div className="mt-8 grid max-w-md grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-xs">
                <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#1F3864]">
                  {participants.length}+
                </p>
                <p className="mt-1 text-xs font-medium text-[var(--muted,#6b7280)]">
                  Participating companies
                </p>
              </div>
              <div className="rounded-xl border border-[var(--border)] bg-white p-4 shadow-xs">
                <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#EB622F]">
                  {ORDER.filter((k) => counts[k] > 0).length}
                </p>
                <p className="mt-1 text-xs font-medium text-[var(--muted,#6b7280)]">
                  Industry segments
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="/exhibitor-registration">Become an exhibitor</Button>
              <Button secondary href="/about">
                About the expo
              </Button>
            </div>
          </div>

          {/* Right: industry spread */}
          <div className="relative lg:col-span-5">
            <div className="pp-float rounded-2xl border border-[var(--border)] bg-white p-6 shadow-md sm:p-8">
              <p className="font-[family-name:var(--font-heading)] text-lg font-bold text-[#1F3864]">
                Participants by industry
              </p>
              <p className="mt-1 text-xs text-[var(--muted,#6b7280)]">
                Where our exhibitors come from
              </p>

              <div className="mt-6 space-y-4">
                {ORDER.map((k, i) => {
                  const Icon = ICONS[k];
                  const meta = industryMeta[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => {
                        setFilter(k);
                        document
                          .getElementById("participants-list")
                          ?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="group block w-full text-left"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 font-medium text-[#1F3864] transition-colors group-hover:text-[#EB622F]">
                          <Icon size={15} style={{ color: meta.color }} />
                          {meta.label}
                        </span>
                        <span className="font-bold text-[#1F3864]">
                          {counts[k]}
                        </span>
                      </div>
                      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#f7f8f7]">
                        <div
                          className="pp-bar h-full rounded-full"
                          style={{
                            width: `${(counts[k] / maxCount) * 100}%`,
                            backgroundColor: meta.color,
                            animationDelay: `${0.3 + i * 0.12}s`,
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* 2. Directory */}
      <RevealSection className="border-b border-[var(--border)] bg-white py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6" id="participants-list">
          <div className="max-w-3xl">
            <Eyebrow>Participant Directory</Eyebrow>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl">
              Browse every participating company.
            </h2>
            <p className="mt-3 text-base text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              Search by company name or filter by industry to find the brands
              you want to know more about.
            </p>
          </div>

          {/* Controls */}
          <div className="mt-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-sm">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#15A7AE]"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search company name"
                aria-label="Search company name"
                className="w-full rounded-xl border border-[var(--border)] bg-[#f7f8f7] py-3 pl-11 pr-10 text-sm font-medium text-[#1F3864] outline-none transition-all duration-300 placeholder:text-[var(--muted,#6b7280)] focus:border-[#EB622F] focus:bg-white focus:shadow-md"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--muted,#6b7280)] transition-colors hover:bg-[#EB622F] hover:text-white"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <p className="text-sm font-medium text-[var(--muted,#6b7280)]">
              Showing{" "}
              <span className="font-bold text-[#1F3864]">{visible.length}</span>{" "}
              of {participants.length} companies
            </p>
          </div>

          {/* Filter chips */}
          <div className="mt-5 flex flex-wrap gap-2.5" role="tablist">
            {tabs.map((t) => {
              const active = filter === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(t.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "border-[#1F3864] bg-[#1F3864] text-white shadow-md"
                      : "border-[var(--border)] bg-[#f7f8f7] text-[#1F3864] hover:-translate-y-0.5 hover:border-[#EB622F] hover:bg-white"
                  }`}
                >
                  {t.label}
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                      active
                        ? "bg-white/20 text-white"
                        : "bg-white text-[#15A7AE]"
                    }`}
                  >
                    {counts[t.key]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          {visible.length > 0 ? (
            <div
              key={`${filter}-${query}`}
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visible.map((p, i) => {
                const meta = p.industry ? industryMeta[p.industry] : null;
                const Icon = p.industry ? ICONS[p.industry] : Building2;
                return (
                  <article
                    key={p.id}
                    className="pp-card group relative flex flex-col justify-between rounded-2xl border border-[var(--border)] bg-[#f7f8f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F] hover:bg-white hover:shadow-xl"
                    style={{ animationDelay: `${Math.min(i, 15) * 45}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-white font-[family-name:var(--font-heading)] text-sm font-bold text-[#15A7AE] shadow-xs transition-colors duration-300 group-hover:border-[#EB622F] group-hover:bg-[#EB622F] group-hover:text-white">
                        {initials(p.name) || <Building2 size={20} />}
                      </div>
                      <h3 className="min-w-0 flex-1 break-words font-[family-name:var(--font-heading)] text-base font-bold leading-snug tracking-tight text-[#1F3864]">
                        {p.name}
                      </h3>
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0 text-[var(--muted,#6b7280)] opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#EB622F] group-hover:opacity-100"
                      />
                    </div>

                    {meta && (
                      <div className="mt-5 flex items-center gap-2 border-t border-[var(--border)] pt-4">
                        <Icon
                          size={14}
                          className="shrink-0"
                          style={{ color: meta.color }}
                        />
                        <span
                          className="text-xs font-semibold leading-tight"
                          style={{ color: meta.color }}
                        >
                          {meta.full}
                        </span>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-[var(--border)] bg-[#f7f8f7] px-6 py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-[var(--border)] bg-white text-[#15A7AE]">
                <Search size={24} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold text-[#1F3864]">
                No companies found
              </h3>
              <p className="mt-2 max-w-sm text-sm text-[var(--muted-foreground,#4b5563)]">
                Try a different spelling or clear the filters to see all
                participants.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-6 rounded-full bg-[#1F3864] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#EB622F]"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </RevealSection>

   
    </>
  );
}