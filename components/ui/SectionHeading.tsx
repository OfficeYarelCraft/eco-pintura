"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Pill className="mb-4" icon>
          {eyebrow}
        </Pill>
      )}
      <h2 className="font-display text-step-2 font-semibold leading-tight text-ink sm:text-step-3">
        {title}
      </h2>
      {intro && (
        <p className="mt-3 max-w-2xl text-step-0 text-ink-soft leading-relaxed sm:mt-4 sm:text-step-1">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
