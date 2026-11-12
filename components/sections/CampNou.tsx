"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Wipe } from "@/components/motion/Wipe";
import { Tape } from "@/components/ui/Tape";
import { StatusTag } from "@/components/ui/Tags";
import { photos } from "@/lib/content";
import { ease } from "@/lib/motion";

type Fact = { k: string; v: string };

export function CampNou() {
  const t = useTranslations("campNou");
  const status = useTranslations("status");
  const hero = useTranslations("hero");
  const facts = t.raw("facts") as Fact[];
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const crewY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const roofY = useTransform(scrollYProgress, [0, 1], [110, -90]);

  return (
    <PaintedSection
      tone="night"
      id="camp-nou"
      ariaLabelledby="campnou-title"
      roll={false}
      className="on-dark overflow-hidden text-paper"
    >
      {/* Encintar: the signal tape lays itself across the top edge */}
      <m.div
        aria-hidden
        className="absolute -left-10 -right-10 top-8 z-10 origin-left rotate-[1.5deg] md:top-10"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.75, ease: ease.cinta }}
      >
        <Tape
          print={hero("tape")}
          variant="signal"
          repeat={24}
          className="h-10 md:h-11"
        />
      </m.div>

      <div ref={ref} className="wrap pb-[var(--section-y)] pt-28 md:pt-32">
        <Wipe direction="x" duration={1} amount={0.4} delay={0.15}>
          <p
            aria-hidden
            className="fit-campnou font-stencil font-black uppercase leading-[0.8] text-signal"
          >
            <span className="block md:inline">CAMP </span>
            <span className="block md:inline">NOU</span>
          </p>
        </Wipe>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-5">
            <StatusTag tone="paper">{status("onSite")}</StatusTag>
            <h2
              id="campnou-title"
              className="mt-6 max-w-[14ch] font-display text-h2 font-extrabold"
            >
              {t("title")}
            </h2>
            <p className="mt-6 max-w-[34rem] text-lead text-paper/80">
              {t("body")}
            </p>
            <dl className="mt-10">
              {facts.map((f) => (
                <div
                  key={f.k}
                  className="hairline-t-inv grid gap-1 py-4 md:grid-cols-[150px_1fr] md:gap-6"
                >
                  <dt className="text-caption text-paper/60">{f.k}</dt>
                  <dd className="font-body font-semibold">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative max-lg:-mx-[var(--gutter)] lg:col-span-6 lg:col-start-7">
            <m.div style={reduce ? undefined : { y: crewY }}>
              <Wipe direction="x" duration={0.9} amount={0.25}>
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-night-raised">
                  <Image
                    src={photos.campNouCrew}
                    alt={t("photo1Alt")}
                    fill
                    placeholder="blur"
                    sizes="(min-width:1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Wipe>
            </m.div>
            <div className="mt-6 grid grid-cols-[1fr_1.9fr] items-start gap-6 max-lg:px-[var(--gutter)]">
              <p className="pt-1 text-caption text-paper/55">{t("caption")}</p>
              <m.div style={reduce ? undefined : { y: roofY }}>
                <Wipe direction="x" duration={0.9} delay={0.12} amount={0.25}>
                  <div className="relative aspect-[3/2] w-full overflow-hidden bg-night-raised">
                    <Image
                      src={photos.campNouRoof}
                      alt={t("photo2Alt")}
                      fill
                      placeholder="blur"
                      sizes="(min-width:1024px) 30vw, 64vw"
                      className="object-cover"
                    />
                  </div>
                </Wipe>
              </m.div>
            </div>
          </div>
        </div>

        <p className="mt-16 max-w-[34rem] text-caption text-paper/55 lg:mt-12">
          {t("trademark")}
        </p>
      </div>
    </PaintedSection>
  );
}
