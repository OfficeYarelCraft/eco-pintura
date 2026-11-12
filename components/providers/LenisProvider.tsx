"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useState } from "react";

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

/**
 * Weighted smooth scroll on wheel/trackpad only. Touch keeps native scrolling,
 * and reduced-motion users get the browser default.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const navH =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
      ) || 80;
    const instance = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      autoRaf: true,
      anchors: { offset: -navH + 1 },
    });
    setLenis(instance);
    if (process.env.NODE_ENV !== "production")
      (window as unknown as { __lenis: Lenis }).__lenis = instance;
    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
