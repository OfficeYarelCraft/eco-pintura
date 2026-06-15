"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export function Marquee({ items, className }: MarqueeProps) {
  const reduced = useReducedMotion();
  const doubled = [...items, ...items];

  if (reduced) {
    return (
      <div className={cn("flex flex-wrap justify-center gap-4 py-8", className)}>
        {items.map((item) => (
          <span
            className="rounded-pill border border-line px-5 py-2 text-step--1 font-medium text-ink-soft"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden py-10", className)}>
      <m.div
        animate={{ x: ["0%", "-50%"] }}
        className="flex w-max gap-8"
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span
            className="rounded-pill border border-line bg-white/50 px-6 py-2.5 text-step--1 font-semibold text-ink-soft grayscale transition-all hover:grayscale-0 hover:text-eco-forest"
            key={`${item}-${i}`}
          >
            {item}
          </span>
        ))}
      </m.div>
    </div>
  );
}
