"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { cn, isTouchDevice, prefersReducedMotion } from "@/lib/utils";

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const scale = useSpring(1, { stiffness: 300, damping: 25 });
  const cursorX = useSpring(x, { stiffness: 200, damping: 25 });
  const cursorY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onEnter = () => scale.set(1.8);
    const onLeave = () => scale.set(1);

    window.addEventListener("mousemove", move);
    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, [scale, x, y]);

  if (!visible) return null;

  return (
    <m.div
      aria-hidden
      className={cn(
        "pointer-events-none fixed left-0 top-0 z-[200] hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-grad-paint mix-blend-multiply md:block",
      )}
      style={{ x: cursorX, y: cursorY, scale }}
    />
  );
}
