"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TextLinkProps {
  href: string;
  children: React.ReactNode;
}

export function TextLink({ href, children }: TextLinkProps) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] underline-offset-4 hover:underline sm:text-sm"
    >
      <span>{children}</span>
      <ArrowRight
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  );
}