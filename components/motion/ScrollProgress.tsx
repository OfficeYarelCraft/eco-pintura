"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <m.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-grad-paint"
      style={{ scaleX }}
    />
  );
}
