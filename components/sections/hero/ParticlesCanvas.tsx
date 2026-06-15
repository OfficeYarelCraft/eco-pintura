"use client";

import { m } from "motion/react";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 22;

export function ParticlesCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const el = document.createElement("div");
      const isLeaf = i % 3 === 0;
      el.className = isLeaf
        ? "absolute opacity-20"
        : "absolute rounded-full bg-eco-lime opacity-30";
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.width = isLeaf ? "16px" : `${4 + Math.random() * 6}px`;
      el.style.height = isLeaf ? "20px" : el.style.width;

      if (isLeaf) {
        el.innerHTML = `<svg viewBox="0 0 16 20" fill="#5CBE49"><path d="M8 0 C12 6 14 12 8 20 C2 12 4 6 8 0Z"/></svg>`;
      }

      container.appendChild(el);
      return { el, duration: 14 + Math.random() * 10, delay: Math.random() * 5 };
    });

    return () => particles.forEach(({ el }) => el.remove());
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
      ref={containerRef}
    >
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <m.div
          animate={{ y: [0, -120], opacity: [0.3, 0] }}
          className="absolute"
          key={i}
          style={{
            left: `${(i * 17) % 100}%`,
            top: `${(i * 23) % 100}%`,
          }}
          transition={{
            duration: 14 + (i % 8),
            repeat: Infinity,
            delay: i * 0.4,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
