"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="section py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[#1F3864]">
          Something went wrong.
        </h1>
        <p className="mt-3 text-sm text-[var(--muted-foreground,#4b5563)]">
          Please try again, or contact the team on +91 77518 09433.
        </p>
        <button
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#EB622F] px-6 py-3 text-xs font-bold !text-white shadow-md transition-all hover:bg-[#d55526]"
          onClick={reset}
        >
          Try again
        </button>
      </div>
    </section>
  );
}