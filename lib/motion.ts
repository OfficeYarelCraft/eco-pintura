export const ease = {
  brand: [0.22, 1, 0.36, 1] as const,
  soft: [0.16, 1, 0.3, 1] as const,
};

export const spring = {
  soft: { type: "spring" as const, stiffness: 120, damping: 18, mass: 0.9 },
  snappy: { type: "spring" as const, stiffness: 320, damping: 26 },
  gentle: { type: "spring" as const, stiffness: 70, damping: 20 },
};

export const dur = { fast: 0.25, base: 0.5, slow: 0.85 };

export const fadeUp = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.slow, ease: ease.brand },
  },
};

export const fadeUpReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.fast } },
};

export const stagger = (s = 0.09, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: delay } },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { ...spring.soft },
  },
};
