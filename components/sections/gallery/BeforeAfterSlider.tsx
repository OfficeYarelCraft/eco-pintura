"use client";

import { useCallback, useRef, useState } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/utils";

interface BeforeAfterSliderProps {
  beforeColor: string;
  afterColor: string;
  label: string;
}

export function BeforeAfterSlider({
  beforeColor,
  afterColor,
  label,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, x)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updatePosition(e.clientX);
  };

  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - 5));
    if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + 5));
  };

  return (
    <div
      aria-label={label}
      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl-brand shadow-brand-md"
      ref={containerRef}
      role="img"
    >
      <div
        className="absolute inset-0"
        style={{ background: afterColor }}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)`, background: beforeColor }}
      />
      <m.div
        aria-orientation="horizontal"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(position)}
        className="absolute bottom-0 top-0 z-10 w-1 cursor-ew-resize bg-white shadow-brand-md focus-visible:focus-ring"
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        role="slider"
        style={{ left: `${position}%` }}
        tabIndex={0}
      >
        <span
          className={cn(
            "absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-brand-md",
          )}
        >
          ↔
        </span>
      </m.div>
      <div className="absolute bottom-4 left-4 rounded-pill bg-white/80 px-3 py-1 text-step--1 font-medium backdrop-blur-sm">
        Before
      </div>
      <div className="absolute bottom-4 right-4 rounded-pill bg-white/80 px-3 py-1 text-step--1 font-medium backdrop-blur-sm">
        After
      </div>
    </div>
  );
}
