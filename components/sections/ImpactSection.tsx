"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface StatCounterProps {
  value: string;
  label: string;
  numericPart?: number;
  suffix?: string;
}

export function StatCounter({ value, label, numericPart, suffix = "" }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? value : "0");

  useEffect(() => {
    if (!inView || numericPart === undefined || reduced) {
      setDisplay(value);
      return;
    }

    const duration = 1500;
    const startTime = performance.now();
    const prefix = value.startsWith("+") ? "+" : value.startsWith("−") ? "−" : "";

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numericPart);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };

    requestAnimationFrame(tick);
  }, [inView, numericPart, reduced, suffix, value]);

  return (
    <div className="text-center" ref={ref}>
      <p className="font-display text-step-3 font-bold text-gradient-eco sm:text-step-4">{display}</p>
      <p className="mt-2 text-step--1 font-medium text-ink-soft">{label}</p>
    </div>
  );
}

export function ImpactSection() {
  const t = useTranslations("impact");

  const stats: Array<{
    value: string;
    label: string;
    numericPart?: number;
    suffix?: string;
  }> = [
    { value: "+500", label: t("stats.projects.label"), numericPart: 500 },
    { value: "0 COV", label: t("stats.voc.label") },
    { value: "100%", label: t("stats.certified.label"), numericPart: 100, suffix: "%" },
    { value: "−40%", label: t("stats.carbon.label"), numericPart: 40, suffix: "%" },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32" id="impacto">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow={t("eyebrow")}
            intro={t("intro")}
            title={t("title")}
          />

          <Reveal>
            <div className="rounded-xl-brand border border-line bg-white p-8 shadow-brand-md">
              <div className="mb-6 flex items-center justify-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-grad-eco font-display text-step-2 font-bold text-white shadow-glow-eco">
                  0 COV
                </div>
              </div>
              <ComparisonRow
                eco="0"
                label={t("comparison.vocLabel")}
                conventional="High"
              />
              <ComparisonRow
                eco="Minimal"
                label={t("comparison.odorLabel")}
                conventional="Strong"
              />
              <ComparisonRow
                eco="Same day"
                label={t("comparison.dryTimeLabel")}
                conventional="2–3 days"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-16 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal delay={i * 0.1} key={stat.label}>
              <StatCounter
                label={stat.label}
                numericPart={stat.numericPart}
                suffix={stat.suffix}
                value={stat.value}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonRow({
  label,
  conventional,
  eco,
}: {
  label: string;
  conventional: string;
  eco: string;
}) {
  return (
    <div className="border-t border-line py-4">
      <p className="mb-2 text-step--1 font-medium text-ink-soft">{label}</p>
      <div className="flex justify-between text-step-0">
        <span className="text-ink-soft line-through opacity-60">{conventional}</span>
        <span className="font-semibold text-eco-forest">{eco}</span>
      </div>
    </div>
  );
}
