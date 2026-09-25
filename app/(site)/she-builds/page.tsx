import Image from "next/image";

import { Eyebrow } from "@/components/shared/ui";

export const metadata = {
  title: "She'Builds Odisha | PROPACK Odisha 2027",
  description:
    "A full day of PROPACK Odisha 2027 dedicated to women entrepreneurs and women-led enterprises.",
};

export default function SheBuildsPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* =========================================================
          HERO IMAGE
      ========================================================= */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="w-full">
          <Image
            src="/sections/she-build.png"
            alt="She'Builds Odisha - A Day for Women in Enterprise"
            width={1920}
            height={768}
            priority
            sizes="100vw"
            className="block h-auto w-full"
          />
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#f8faf9] py-16 sm:py-20 lg:py-24">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-[#15A7AE]/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-[#EB622F]/5 blur-3xl" />

        <div className="container relative mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>PROPACK Odisha 2027</Eyebrow>

            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-[#1F3864] sm:text-4xl lg:text-5xl">
              She&apos;Builds Odisha
            </h1>

            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#EB622F]" />

            <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[var(--muted-foreground,#4b5563)] sm:text-lg">
              One full day of PROPACK Odisha 2027 is dedicated to women
              entrepreneurs, in alignment with the State&apos;s women-led
              development agenda.
            </p>

            <div className="mt-8 inline-flex items-center rounded-full border border-[#15A7AE]/20 bg-[#15A7AE]/10 px-5 py-2.5 text-sm font-semibold text-[#138e94]">
              A Day for Women in Enterprise
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          KEY HIGHLIGHTS
      ========================================================= */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">

          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>Women in Enterprise</Eyebrow>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              Empowering Women Across Odisha&apos;s Manufacturing Value Chain
            </h2>

            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Creating meaningful opportunities for women-led enterprises
              through mentorship, finance, market access and industry
              connections.
            </p>
          </div>

          {/* Cards */}
          <div className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-3">

            {/* Card 1 */}
            <div className="group rounded-2xl border border-[var(--border)] bg-[#f8faf9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#15A7AE]/30 hover:shadow-lg">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#15A7AE]/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#15A7AE]" />
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold leading-snug text-[#1F3864]">
                Women Entrepreneurship Platform
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground,#4b5563)]">
                The Women Entrepreneurship Platform (WEP) Odisha Chapter
                provides mentoring, market linkage and financing support to
                women-led enterprises.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group rounded-2xl border border-[var(--border)] bg-[#f8faf9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#EB622F]/30 hover:shadow-lg">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#EB622F]/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#EB622F]" />
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold leading-snug text-[#1F3864]">
                Enterprise & Self-Employment
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground,#4b5563)]">
                Subhadra Yojana and the Lakhpati Didi mission have brought
                lakhs of rural women into enterprise and self-employment
                across Odisha.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group rounded-2xl border border-[var(--border)] bg-[#f8faf9] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#1F3864]/30 hover:shadow-lg">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#1F3864]/10">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1F3864]" />
              </div>

              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold leading-snug text-[#1F3864]">
                Women in PMEGP
              </h3>

              <p className="mt-3 text-sm leading-7 text-[var(--muted-foreground,#4b5563)]">
                Women already account for{" "}
                <strong className="font-semibold text-[#1F3864]">
                  over 42% of PMEGP beneficiaries
                </strong>{" "}
                in the State.
              </p>
            </div>

          </div>
        </div>
      </section>



{/* =========================================================
    WHAT TO EXPECT
========================================================= */}
<section className="bg-[#f8fafc] py-16 sm:py-20 lg:py-24">
  <div className="container mx-auto px-4 sm:px-6">
    <div className="mx-auto max-w-6xl">

      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow>SheBuilds Odisha</Eyebrow>

        <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[var(--color-navy)] sm:text-3xl lg:text-4xl">
          What to Expect
        </h2>

        <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
          A focused platform bringing together women entrepreneurs,
          industry leaders, financing institutions, skill partners and
          market opportunities.
        </p>
      </div>

      {/* Main Box */}
      <div className="mt-12 overflow-hidden rounded-2xl border border-[#dfe5e8] bg-white shadow-sm">

        <div className="grid lg:grid-cols-2">

          {/* Left */}
          <div className="border-b border-[#dfe5e8] p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EB622F]">
              <span className="h-3 w-3 rounded-full bg-white" />
            </div>

            <h3 className="mt-6 font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-[var(--color-navy)] sm:text-2xl">
              A Platform Built Around Women-Led Enterprise
            </h3>

            <p className="mt-4 text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
              The SheBuilds Odisha day will feature women industry leaders,
              financing institutions, skill partners and a curated
              buyer–seller session for women-owned enterprises.
            </p>

          </div>

          {/* Right */}
          <div className="bg-[#f8faf9] p-8 sm:p-10 lg:p-12">

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Item 1 */}
              <div className="rounded-xl border border-[#dfe5e8] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#15A7AE] hover:shadow-sm">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#15A7AE]" />
                </div>

                <h4 className="text-sm font-semibold text-[var(--color-navy)]">
                  Women Industry Leaders
                </h4>
              </div>

              {/* Item 2 */}
              <div className="rounded-xl border border-[#dfe5e8] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EB622F] hover:shadow-sm">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EB622F]/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EB622F]" />
                </div>

                <h4 className="text-sm font-semibold text-[var(--color-navy)]">
                  Financing Institutions
                </h4>
              </div>

              {/* Item 3 */}
              <div className="rounded-xl border border-[#dfe5e8] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#15A7AE] hover:shadow-sm">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#15A7AE]/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#15A7AE]" />
                </div>

                <h4 className="text-sm font-semibold text-[var(--color-navy)]">
                  Skill Partners
                </h4>
              </div>

              {/* Item 4 */}
              <div className="rounded-xl border border-[#dfe5e8] bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#EB622F] hover:shadow-sm">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-[#EB622F]/10">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EB622F]" />
                </div>

                <h4 className="text-sm font-semibold text-[var(--color-navy)]">
                  Buyer–Seller Session
                </h4>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* =========================================================
          WHO SHOULD
      ========================================================= */}
      <section className="border-t border-[var(--border)] bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>Participation</Eyebrow>

            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-bold tracking-tight text-[#1F3864] sm:text-3xl lg:text-4xl">
              Who Should Participate?
            </h2>

            <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-[#EB622F]" />

            <p className="mt-6 text-sm leading-7 text-[var(--muted-foreground,#4b5563)] sm:text-base">
              Women entrepreneurs, women-led enterprises and ecosystem
              partners connected with enterprise, manufacturing, finance,
              skills and market opportunities.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}