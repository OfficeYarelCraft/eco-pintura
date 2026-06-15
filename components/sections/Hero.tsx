"use client";

import { m, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ChevronDown, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Pill } from "@/components/ui/Pill";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ease, fadeUp, fadeUpReduced, spring, stagger } from "@/lib/motion";
import { MeshBackground, BrushStroke } from "./hero/MeshBackground";
import { Particles } from "./hero/Particles";

export function Hero() {
  const t = useTranslations("hero");
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const variants = reduced ? fadeUpReduced : fadeUp;
  const containerVariants = stagger(0.08, 0.3);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-[100svh] overflow-hidden"
      id="inicio"
      ref={heroRef}
    >
      <m.div className="absolute inset-0" style={{ y: reduced ? 0 : bgY }}>
        <MeshBackground />
      </m.div>
      <Particles />
      <BrushStroke />

      <m.div
        animate="show"
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-24 pt-28 lg:px-8"
        initial="hidden"
        style={{
          y: reduced ? 0 : contentY,
          opacity: reduced ? 1 : contentOpacity,
          scale: reduced ? 1 : contentScale,
        }}
        variants={containerVariants}
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <m.div variants={variants}>
              <Pill className="mb-6" icon>
                {t("eyebrow")}
              </Pill>
            </m.div>

            <m.h1
              className="font-display text-step-5 font-semibold leading-[1.05] tracking-tight text-ink"
              id="hero-heading"
              variants={variants}
            >
              {t("titleBefore")}{" "}
              <span className="relative inline-block">
                <span className="text-gradient-paint">{t("titleHighlight")}</span>
              </span>{" "}
              {t("titleAfter")}
            </m.h1>

            <m.p
              className="mt-6 max-w-xl text-step-1 leading-relaxed text-ink-soft"
              variants={variants}
            >
              {t("subtitle")}
            </m.p>

            <m.div className="mt-10 flex flex-wrap gap-4" variants={variants}>
              <MagneticButton href="#contacto">{t("ctaPrimary")}</MagneticButton>
              <MagneticButton href="#proyectos" variant="ghost">
                {t("ctaSecondary")}
              </MagneticButton>
            </m.div>

            <m.p
              className="mt-8 text-step--1 font-medium text-ink-soft"
              variants={variants}
            >
              {t("trust")}
            </m.p>
          </div>

          <m.div
            className="hidden lg:block"
            transition={spring.gentle}
            variants={{
              hidden: { opacity: 0, y: 40, rotate: -2 },
              show: { opacity: 1, y: 0, rotate: 0, transition: spring.gentle },
            }}
          >
            <div className="rounded-xl-brand border border-white/40 bg-white/50 p-6 shadow-brand-md backdrop-blur-xl">
              <div className="flex flex-col gap-4">
                <ProofPill icon={Leaf} label={t("proofZeroVoc")} />
                <ProofPill icon={ShieldCheck} label={t("proofCertified")} />
                <ProofPill icon={Sparkles} label={t("proofEco")} />
              </div>
            </div>
          </m.div>
        </div>
      </m.div>

      <m.div
        animate={{ opacity: 1, y: [0, 8, 0] }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-soft"
        initial={{ opacity: 0 }}
        transition={{
          opacity: { delay: 1.4, duration: 0.5 },
          y: { duration: 2, repeat: Infinity, ease: ease.brand },
        }}
      >
        <span className="text-step--1 font-medium">{t("scrollCue")}</span>
        <ChevronDown aria-hidden className="h-5 w-5" />
      </m.div>

      <div className="absolute bottom-0 left-0 right-0 z-[5]">
        <svg
          aria-hidden
          className="w-full text-bg-soft"
          preserveAspectRatio="none"
          viewBox="0 0 1440 80"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,55 L1440,80 L0,80 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}

function ProofPill({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg-brand bg-bg/60 px-4 py-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grad-eco text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="font-display text-step-1 font-semibold text-ink">{label}</span>
    </div>
  );
}
