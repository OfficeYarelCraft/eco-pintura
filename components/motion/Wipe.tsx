"use client";

import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

type WipeProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  /** x = left→right roller pass, y = bottom→top, down = top→bottom */
  direction?: "x" | "y" | "down";
  delay?: number;
  duration?: number;
  amount?: number;
};

/* Insets extend 30% beyond the box once open, so accents (É, À) and ascenders
   on tight display line-heights are never shaved off by the final clip. */
const hidden = {
  x: "inset(-30% 100% -30% 0%)",
  y: "inset(100% -2% -30% -2%)",
  down: "inset(-30% -2% 100% -2%)",
};
const shown = {
  x: "inset(-30% -2% -30% 0%)",
  y: "inset(-30% -2% -30% -2%)",
  down: "inset(-30% -2% -30% -2%)",
};

/**
 * Hard-edged reveal (no fade, no blur): content is cut in along one edge,
 * like paint meeting tape.
 *
 * The OUTER element is observed and the INNER one is clipped: Chrome's
 * IntersectionObserver honours the target's own clip-path, so a fully clipped
 * target would never report as visible.
 */
export function Wipe({
  children,
  className,
  innerClassName,
  direction = "x",
  delay = 0,
  duration = 0.72,
  amount = 0.3,
}: WipeProps) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <div className={className}>
        <div className={innerClassName}>{children}</div>
      </div>
    );
  }
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      <m.div
        className={innerClassName}
        variants={{
          hidden: { clipPath: hidden[direction] },
          show: {
            clipPath: shown[direction],
            transition: { duration, delay, ease: ease.rodillo },
          },
        }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
