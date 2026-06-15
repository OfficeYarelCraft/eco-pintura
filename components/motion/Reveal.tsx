"use client";

import { m, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { fadeUp, fadeUpReduced } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof m;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Component = m[as] as typeof m.div;

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      ref={ref}
      transition={{ delay }}
      variants={reduced ? fadeUpReduced : fadeUp}
      viewport={{ once: true, margin: "-15% 0px" }}
      whileInView="show"
    >
      {children}
    </Component>
  );
}
