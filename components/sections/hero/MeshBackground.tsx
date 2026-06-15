"use client";

import { m, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

const blobs = [
  { color: "var(--eco-lime)", x: "5%", y: "12%", size: 220, sizeLg: 420, duration: 18, delay: 0 },
  { color: "var(--paint-amber)", x: "70%", y: "8%", size: 200, sizeLg: 380, duration: 20, delay: 2 },
  { color: "var(--paint-orange)", x: "65%", y: "65%", size: 240, sizeLg: 450, duration: 22, delay: 4 },
  { color: "var(--eco-green)", x: "10%", y: "70%", size: 210, sizeLg: 400, duration: 16, delay: 1 },
  { color: "var(--eco-green-deep)", x: "40%", y: "38%", size: 180, sizeLg: 320, duration: 19, delay: 3 },
];

export function MeshBackground() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-grad-hero">
      {blobs.map((blob, i) => (
        <m.div
          animate={
            reduced
              ? { opacity: 0.6 }
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -25, 15, 0],
                  scale: [1, 1.08, 0.95, 1],
                }
          }
          className="absolute rounded-full opacity-60"
          initial={{ opacity: 0, scale: 0.8 }}
          key={i}
          style={{
            left: blob.x,
            top: blob.y,
            width: `clamp(${blob.size}px, 55vw, ${blob.sizeLg}px)`,
            height: `clamp(${blob.size}px, 55vw, ${blob.sizeLg}px)`,
            background: blob.color,
            filter: "blur(60px)",
          }}
          transition={{
            opacity: { duration: 1, type: "tween" },
            x: { duration: blob.duration, repeat: Infinity, ease: "easeInOut", delay: blob.delay, type: "tween" },
            y: { duration: blob.duration, repeat: Infinity, ease: "easeInOut", delay: blob.delay, type: "tween" },
            scale: { duration: blob.duration, repeat: Infinity, ease: "easeInOut", delay: blob.delay, type: "tween" },
          }}
        />
      ))}
    </div>
  );
}

export function BrushStroke() {
  const reduced = useReducedMotion();

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute left-0 top-[32%] z-[1] w-full max-w-full opacity-80 sm:top-[28%]"
      fill="none"
      viewBox="0 0 1200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brushGrad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#FBA63C" />
          <stop offset="0.5" stopColor="#F47A29" />
          <stop offset="1" stopColor="#EE5524" />
        </linearGradient>
      </defs>
      <m.path
        d="M 20 120 Q 200 40 400 100 T 800 80 T 1180 110"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        stroke="url(#brushGrad)"
        strokeLinecap="round"
        strokeWidth="32"
        transition={{ duration: reduced ? 0.01 : 1.1, ease: ease.brand, delay: 0.2 }}
      />
    </svg>
  );
}
