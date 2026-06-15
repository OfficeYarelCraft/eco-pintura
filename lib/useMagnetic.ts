"use client";

import { useRef } from "react";
import { useSpring } from "motion/react";

interface MagneticOptions {
  radius?: number;
  strength?: number;
  disabled?: boolean;
}

export function useMagnetic({
  radius = 80,
  strength = 0.35,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x, y, onMouseMove, onMouseLeave };
}
