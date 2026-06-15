"use client";

import { m, useScroll, useTransform } from "motion/react";
import {
  CheckCircle2,
  ClipboardList,
  MessageCircle,
  Paintbrush,
  Palette,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { spring } from "@/lib/motion";

const stepIcons = [MessageCircle, Palette, ClipboardList, Paintbrush, CheckCircle2];
const stepKeys = ["1", "2", "3", "4", "5"] as const;

export function ProcessSection() {
  const t = useTranslations("process");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-bg-soft py-16 sm:py-24 lg:py-32" id="proceso">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          intro={t("intro")}
          title={t("title")}
        />

        <div className="relative mt-10 sm:mt-16" ref={ref}>
          <div
            aria-hidden
            className="absolute bottom-0 left-[1.65rem] top-0 w-0.5 bg-line sm:left-7 lg:left-1/2 lg:-ml-px"
          >
            <m.div
              className="w-full origin-top bg-grad-eco"
              style={{ height: lineHeight }}
            />
          </div>

          <ol className="space-y-8 sm:space-y-12">
            {stepKeys.map((key, i) => {
              const Icon = stepIcons[i];
              const isEven = i % 2 === 0;
              return (
                <Reveal delay={i * 0.1} key={key}>
                  <li
                    className={`relative pl-14 sm:pl-16 lg:flex lg:items-center lg:pl-0 lg:gap-6 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    <m.div
                      className="absolute left-0 top-0 z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-grad-eco text-white shadow-glow-eco sm:h-14 sm:w-14 lg:relative lg:left-auto lg:top-auto lg:mx-0"
                      initial={{ scale: 0.8 }}
                      transition={spring.soft}
                      viewport={{ once: true }}
                      whileInView={{ scale: 1 }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                    </m.div>

                    <div
                      className={`min-w-0 flex-1 lg:max-w-[calc(50%-3rem)] ${
                        isEven ? "lg:text-right" : "lg:text-left"
                      }`}
                    >
                      <span className="font-display text-step--1 font-bold text-eco-green">
                        0{key}
                      </span>
                      <h3 className="mt-1 font-display text-step-1 font-semibold text-ink sm:text-step-2">
                        {t(`steps.${key}.title`)}
                      </h3>
                      <p className="mt-2 text-step-0 leading-relaxed text-ink-soft">
                        {t(`steps.${key}.description`)}
                      </p>
                    </div>

                    <div className="hidden flex-1 lg:block" />
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
