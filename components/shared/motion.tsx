"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealMode = "load" | "view";
type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  mode?: RevealMode;
};

const easing: [number, number, number, number] = [0.22, 1, 0.36, 1];

function motionProps(
  reduced: boolean | null,
  delay: number,
  mode: RevealMode,
) {
  if (reduced) return { initial: false as const };

  const initial = { opacity: 0.96, y: 8 };
  const target = {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: easing },
  };

  return mode === "load"
    ? { initial, animate: target }
    : {
        initial,
        whileInView: target,
        viewport: { once: true, amount: 0.12 },
      };
}

export function RevealSection({
  children,
  className,
  delay = 0,
  id,
  mode = "view",
}: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      {...motionProps(reduced, delay, mode)}
    >
      {children}
    </motion.section>
  );
}

export function RevealDiv({
  children,
  className,
  delay = 0,
  id,
  mode = "view",
}: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      id={id}
      className={className}
      {...motionProps(reduced, delay, mode)}
    >
      {children}
    </motion.div>
  );
}

export function RevealArticle({
  children,
  className,
  delay = 0,
  id,
  mode = "view",
}: RevealProps) {
  const reduced = useReducedMotion();
  return (
    <motion.article
      id={id}
      className={className}
      {...motionProps(reduced, delay, mode)}
    >
      {children}
    </motion.article>
  );
}

export function RevealDl({
  children,
  className,
  delay = 0,
  mode = "view",
}: Omit<RevealProps, "id">) {
  const reduced = useReducedMotion();
  return (
    <motion.dl className={className} {...motionProps(reduced, delay, mode)}>
      {children}
    </motion.dl>
  );
}
