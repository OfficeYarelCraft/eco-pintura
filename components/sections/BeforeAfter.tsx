"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { photos } from "@/lib/content";

/**
 * Drag the roller across the wall. Keyboard users get the same control through
 * a native range input layered on top (arrow keys, Home/End).
 * The "before" is a stand-in made from the same photo (desaturated + gotelé texture)
 * until a real before/after pair from the same tripod position is supplied.
 */
export function BeforeAfter({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(50);
  const [val, setVal] = useState(50);
  const dragging = useRef(false);
  const inView = useInView(box, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  useMotionValueEvent(pos, "change", (v) => setVal(Math.round(v)));

  // One idle nudge so people discover the handle (never loops).
  useEffect(() => {
    if (!inView || reduce) return;
    const seq = async () => {
      await animate(pos, 36, {
        duration: 0.5,
        ease: [0.65, 0, 0.35, 1],
        delay: 0.4,
      });
      await animate(pos, 50, { duration: 0.6, ease: [0.65, 0, 0.35, 1] });
    };
    seq();
  }, [inView, reduce, pos]);

  const setFromPointer = (e: PointerEvent) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      className="relative aspect-[5/6] w-full touch-pan-y select-none overflow-hidden bg-plaster md:aspect-[16/10]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as Element).setPointerCapture?.(e.pointerId);
        setFromPointer(e);
      }}
      onPointerMove={(e) => dragging.current && setFromPointer(e)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <Image
        src={photos.pisoEixample}
        alt={after}
        fill
        sizes="(min-width:1024px) 62vw, 100vw"
        placeholder="blur"
        className="object-cover"
      />
      <m.div
        aria-hidden
        className="absolute inset-0"
        style={{ clipPath: clip }}
      >
        <Image
          src={photos.pisoEixample}
          alt=""
          fill
          sizes="(min-width:1024px) 62vw, 100vw"
          placeholder="blur"
          className="object-cover [filter:grayscale(0.7)_brightness(0.7)_contrast(0.85)_sepia(0.3)]"
        />
        {/* gotelé: the stippled wall texture this job removed */}
        <span
          className="absolute inset-0 opacity-60 mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(rgb(0 0 0 / 0.22) 1.1px, transparent 1.7px), radial-gradient(rgb(255 255 255 / 0.18) 1px, transparent 1.6px)",
            backgroundSize: "7px 7px, 9px 9px",
            backgroundPosition: "0 0, 3px 4px",
          }}
        />
      </m.div>

      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-paper"
        style={{ left }}
      >
        <svg
          className="absolute left-1/2 top-[calc(50%-44px)] -translate-x-[50%]"
          width="56"
          height="88"
          viewBox="0 0 56 88"
        >
          <rect
            x="4"
            y="2"
            width="48"
            height="30"
            fill="#EEEEE8"
            stroke="#151513"
            strokeWidth="2"
          />
          {[10, 16, 22, 28, 34, 40].map((x) => (
            <rect key={x} x={x} y="9" width="2" height="16" fill="#151513" />
          ))}
          <path
            d="M28 32 V48 H40 V86"
            stroke="#151513"
            strokeWidth="3"
            fill="none"
          />
          <rect x="34" y="62" width="12" height="24" fill="#EE5524" />
        </svg>
      </m.div>

      <span className="pointer-events-none absolute bottom-4 left-4 bg-paper px-2.5 py-1.5 text-caption">
        {before}
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 bg-paper px-2.5 py-1.5 text-caption">
        {after}
      </span>

      <input
        type="range"
        min={2}
        max={98}
        value={val}
        aria-label={label}
        onChange={(e) => pos.set(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0 [&:focus-visible+span]:block"
        onPointerDown={(e) => e.stopPropagation()}
        style={{ pointerEvents: "none" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden shadow-[inset_0_0_0_3px_var(--ink)]"
      />
    </div>
  );
}
