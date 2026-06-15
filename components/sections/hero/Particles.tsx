"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";

const ParticlesCanvas = dynamic(
  () => import("./ParticlesCanvas").then((m) => m.ParticlesCanvas),
  { ssr: false },
);

export function Particles() {
  const reduced = useReducedMotion();
  if (reduced) return null;
  return <ParticlesCanvas />;
}
