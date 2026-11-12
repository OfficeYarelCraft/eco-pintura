"use client";

import { m, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Tape } from "@/components/ui/Tape";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Review = { quote: string; who: string; job: string };

/* Each note has its own tilt and offset — pinned by hand, not by a grid. */
const NOTES = [
  { r: -1.6, cls: "lg:mt-0" },
  { r: 1.2, cls: "md:mt-10 lg:mt-14" },
  {
    r: -0.9,
    cls: "md:col-span-2 md:mx-auto md:w-[min(100%,420px)] lg:col-span-1 lg:mx-0 lg:mt-5 lg:w-auto",
  },
];

/** Sample content — replace with real reviews (with written consent) before launch. */
export function Reviews() {
  const t = useTranslations("reviews");
  const items = t.raw("items") as Review[];
  const reduce = useReducedMotion();

  return (
    <PaintedSection tone="paper" id="resenas" ariaLabelledby="reviews-title">
      <div className="wrap pb-[var(--section-y)] pt-[var(--section-y)]">
        <h2
          id="reviews-title"
          className="max-w-[18ch] font-display text-h2 font-extrabold"
        >
          {t("title")}
        </h2>
        <ul className="mt-14 grid gap-12 md:grid-cols-2 md:gap-x-6 lg:mt-20 lg:grid-cols-3 lg:gap-x-9">
          {items.map((rev, i) => {
            const n = NOTES[i % NOTES.length];
            return (
              <m.li
                key={rev.who}
                className={cn("relative", n.cls)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
              >
                <m.blockquote
                  className="relative bg-[#fffffd] px-6 pb-6 pt-10 shadow-[inset_0_0_0_1px_rgb(21_21_19/0.14)] md:px-7 md:pb-7"
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { rotate: n.r * 4, y: 28, opacity: 0 },
                          show: {
                            rotate: n.r,
                            y: 0,
                            opacity: 1,
                            transition: {
                              duration: 0.6,
                              ease: ease.cinta,
                              delay: i * 0.1,
                            },
                          },
                        }
                  }
                  style={reduce ? { rotate: n.r } : undefined}
                >
                  <p className="text-lead text-ink">“{rev.quote}”</p>
                  <footer className="mt-5">
                    <cite className="block font-body font-semibold not-italic">
                      {rev.who}
                    </cite>
                    <span className="text-caption text-ink-soft">
                      {rev.job}
                    </span>
                  </footer>
                </m.blockquote>
                <m.div
                  aria-hidden
                  className="absolute left-[calc(50%-62px)] top-[-14px] w-[124px] origin-left"
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { scaleX: 0, rotate: -n.r * 2.2 },
                          show: {
                            scaleX: 1,
                            rotate: -n.r * 2.2,
                            transition: {
                              duration: 0.32,
                              ease: ease.cinta,
                              delay: 0.42 + i * 0.1,
                            },
                          },
                        }
                  }
                  style={reduce ? { rotate: -n.r * 2.2 } : undefined}
                >
                  <Tape className="h-8" />
                </m.div>
              </m.li>
            );
          })}
        </ul>
      </div>
    </PaintedSection>
  );
}
