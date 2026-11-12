"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Tape } from "@/components/ui/Tape";
import { ease } from "@/lib/motion";

type Step = { day: string; title: string; body: string };

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];
  const railRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const railIn = useInView(railRef, { once: true, amount: 0.5 });
  const listIn = useInView(listRef, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();
  const on = railIn || !!reduce;
  const onList = listIn || !!reduce;

  return (
    <PaintedSection
      tone="plaster"
      id="proceso"
      ariaLabelledby="process-title"
      className="overflow-hidden"
    >
      <div className="wrap pb-[var(--section-y)] pt-[var(--section-y)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="process-title"
            className="font-display text-h2 font-extrabold"
          >
            {t("title")}
          </h2>
          <p className="max-w-[27rem] text-lead text-ink-soft lg:pb-3">
            {t("intro")}
          </p>
        </div>

        {/* Desktop: masking-tape timeline */}
        <div ref={railRef} className="relative mt-24 hidden lg:block">
          <m.div
            className="absolute -left-7 -right-7 top-[60px] origin-left"
            initial={reduce ? false : { scaleX: 0 }}
            animate={on ? { scaleX: 1 } : undefined}
            transition={{ duration: 0.9, ease: ease.cinta }}
          >
            <Tape className="h-11" />
          </m.div>
          <ol className="relative grid grid-cols-5 gap-6">
            {steps.map((s, i) => (
              <li key={s.day} className="relative">
                <m.p
                  className="font-stencil text-[2.5rem] font-bold leading-none text-signal"
                  initial={reduce ? false : { opacity: 0, scale: 1.18 }}
                  animate={on ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    delay: 0.55 + i * 0.09,
                    duration: 0.22,
                    ease: ease.cinta,
                  }}
                  style={{ transformOrigin: "0% 100%" }}
                >
                  {s.day}
                </m.p>
                <m.span
                  aria-hidden
                  className="mt-3 block h-16 w-[3px] origin-top bg-ink"
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={on ? { scaleY: 1 } : undefined}
                  transition={{
                    delay: 0.62 + i * 0.09,
                    duration: 0.3,
                    ease: ease.cinta,
                  }}
                />
                <m.div
                  initial={
                    reduce ? false : { clipPath: "inset(-30% 100% -30% 0%)" }
                  }
                  animate={
                    on ? { clipPath: "inset(-30% -2% -30% 0%)" } : undefined
                  }
                  transition={{
                    delay: 0.75 + i * 0.09,
                    duration: 0.6,
                    ease: ease.rodillo,
                  }}
                >
                  <h3 className="mt-6 font-display text-[2.25rem] font-extrabold leading-none">
                    {s.title}
                  </h3>
                  <p className="mt-3.5 text-body text-ink-soft">{s.body}</p>
                </m.div>
              </li>
            ))}
          </ol>
        </div>

        {/* Mobile/tablet: day-by-day list */}
        <ol ref={listRef} className="mt-10 lg:hidden">
          {steps.map((s, i) => (
            <li
              key={s.day}
              className="relative py-6 md:grid md:grid-cols-[230px_1fr] md:gap-6"
            >
              <m.span
                aria-hidden
                className="absolute inset-x-0 top-0 block h-[1.5px] origin-left bg-ink"
                initial={reduce ? false : { scaleX: 0 }}
                animate={onList ? { scaleX: 1 } : undefined}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: ease.cinta,
                }}
              />
              <p className="font-stencil text-[2.5rem] font-bold leading-none text-signal">
                {s.day}
              </p>
              <div className="mt-2 md:mt-0">
                <h3 className="font-display text-h3 font-extrabold">
                  {s.title}
                </h3>
                <p className="mt-2 text-body text-ink-soft">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </PaintedSection>
  );
}
