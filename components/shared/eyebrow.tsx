export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[var(--primary)] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] ring-2 ring-[var(--primary)]/25" />
      <span>{children}</span>
    </p>
  );
}