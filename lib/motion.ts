/**
 * Motion tokens — the whole site is a paint job in three acts.
 *  Cinta     (tape laid)      : snaps, UI responses       280–380 ms
 *  Rodillo   (roller pass)    : wipes, reveals, fan       600–900 ms
 *  Despegar  (tape peeled)    : slow start, fast release  700 ms / scrubbed
 * No bounce, no count-ups, no blanket fade-ups.
 */
import { cubicBezier } from "motion/react";

/** Bezier definitions — for `transition.ease`. */
export const ease = {
  cinta: [0.2, 0.9, 0.1, 1] as const,
  rodillo: [0.65, 0, 0.35, 1] as const,
  despegar: [0.55, 0, 0.9, 0.35] as const,
  out: [0.16, 1, 0.3, 1] as const,
};

/** Easing functions — for `useTransform(..., { ease })`. */
export const easeFn = {
  cinta: cubicBezier(...ease.cinta),
  rodillo: cubicBezier(...ease.rodillo),
  despegar: cubicBezier(...ease.despegar),
};

export const dur = {
  micro: 0.16,
  ui: 0.28,
  wipe: 0.64,
  fan: 0.9,
  peel: 0.7,
};

/** Hard-edged reveal: content is cut in left → right like a roller pass. */
export const wipeX = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  show: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: dur.wipe, ease: ease.rodillo },
  },
};

export const wipeY = {
  hidden: { clipPath: "inset(100% 0 0 0)" },
  show: {
    clipPath: "inset(0% 0 0 0)",
    transition: { duration: dur.wipe, ease: ease.rodillo },
  },
};

export const inViewOnce = { once: true, amount: 0.35 } as const;
