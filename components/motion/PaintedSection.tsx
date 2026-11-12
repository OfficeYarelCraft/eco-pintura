"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "plaster" | "ink" | "night" | "signal" | "obrelier";

const toneVar: Record<Tone, string> = {
  paper: "var(--paper)",
  plaster: "var(--plaster)",
  ink: "var(--ink)",
  night: "var(--night)",
  signal: "var(--signal)",
  obrelier: "var(--ob-bg)",
};

type Props = {
  tone: Tone;
  id?: string;
  className?: string;
  children: ReactNode;
  /** Paint creeps up over the previous section by this much (px, capped by viewport). */
  bleed?: number;
  ariaLabelledby?: string;
  as?: "section" | "footer" | "div";
  /** Set false when the previous section has (nearly) the same colour. */
  roll?: boolean;
  /** Colour of the stippled roller edge (defaults to the section colour). */
  edge?: string;
};

/**
 * Section colour changes are a roller pass, not a fade.
 * As the section rises into view its paint climbs past its own top edge and
 * over the bottom padding of the previous section, finishing with a stippled
 * roller edge. Its own content always sits on painted wall.
 */
export function PaintedSection({
  tone,
  id,
  className,
  children,
  bleed = 200,
  ariaLabelledby,
  as = "section",
  roll = true,
  edge,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [b, setB] = useState(0);

  useEffect(() => {
    const calc = () =>
      setB(
        Math.round(Math.min(bleed, Math.max(72, window.innerHeight * 0.22))),
      );
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [bleed]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const lift = useTransform(scrollYProgress, [0, 0.85], [0, b], {
    clamp: true,
  });
  const clip = useTransform(
    lift,
    (v) => `inset(${Math.max(0, b - v)}px 0 0 0)`,
  );
  const edgeY = useTransform(lift, (v) => -v - 15);
  const edgeOpacity = useTransform(lift, [0, 4, b - 2, b], [0, 1, 1, 0]);

  const Tag = m[as];
  const color = toneVar[tone];

  return (
    <Tag
      ref={ref as never}
      id={id}
      aria-labelledby={ariaLabelledby}
      className={cn("relative isolate", className)}
    >
      {/* own wall: always painted */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: color }}
      />
      {/* the roller pass over the previous section */}
      {roll && !reduce && b > 0 && (
        <>
          <m.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -z-10"
            style={{
              top: -b,
              height: b + 2,
              background: color,
              clipPath: clip,
            }}
          />
          <m.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 block h-[16px]"
            style={{ y: edgeY, opacity: edgeOpacity, color: edge ?? color }}
          >
            <RollerEdge />
          </m.span>
        </>
      )}
      {children}
    </Tag>
  );
}

/* A roller edge drawn once from a fixed seed: irregular like a real nap, never a repeating tile,
   identical on server and client. */
function rollerPath(seed = 7, width = 1440) {
  let x = seed;
  const rnd = () => {
    x = (x * 16807) % 2147483647;
    return (x - 1) / 2147483646;
  };
  let d = `M0 16 L0 ${(9 + rnd() * 2).toFixed(1)}`;
  let cx = 0;
  let y = 10;
  while (cx < width) {
    cx += 5 + rnd() * 11;
    y = Math.max(6, Math.min(12.5, y + (rnd() - 0.5) * 3.2));
    d += ` L${Math.min(cx, width).toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L${width} 16 Z`;
  const specks: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 26; i++)
    specks.push({ x: rnd() * width, y: 2 + rnd() * 4.5, r: 0.6 + rnd() * 0.9 });
  return { d, specks };
}
const ROLLER = rollerPath();

/** Roller edge: the slightly ragged line a roller leaves at the end of a pass. */
function RollerEdge() {
  return (
    <svg
      className="block h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 16"
      aria-hidden
    >
      <path d={ROLLER.d} fill="currentColor" />
      {ROLLER.specks.map((p, i) => (
        <ellipse
          key={i}
          cx={p.x}
          cy={p.y}
          rx={p.r * 1.6}
          ry={p.r}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
