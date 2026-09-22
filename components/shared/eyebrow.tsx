export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#EB622F] sm:text-xs">
      <span className="h-1.5 w-1.5 rounded-full bg-[#EB622F] ring-2 ring-[#EB622F]/25" />
      <span>{children}</span>
    </p>
  );
}