"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, type CSSProperties } from "react";
import { ButtonA } from "@/components/ui/Button";
import { Tape } from "@/components/ui/Tape";
import { TapeA } from "@/components/ui/TapeLink";
import { ScaleTag, StatusTag } from "@/components/ui/Tags";
import { photos } from "@/lib/content";
import { easeFn } from "@/lib/motion";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const t = useTranslations("hero");
  const status = useTranslations("status");
  const meta = t.raw("meta") as string[];
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Despegar: the first scroll peels the tape off the corner.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const peelOpts = { ease: easeFn.despegar, clamp: true };
  const tapeRotate = useTransform(
    scrollYProgress,
    [0, 0.26],
    [0, 24],
    peelOpts,
  );
  const tapeX = useTransform(scrollYProgress, [0, 0.26], [0, 160], peelOpts);
  const tapeY = useTransform(scrollYProgress, [0, 0.26], [0, -150], peelOpts);
  const tapeOpacity = useTransform(scrollYProgress, [0.17, 0.26], [1, 0]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-paper"
    >
      <div className="wrap relative lg:grid lg:min-h-[min(calc(100svh-var(--nav-h)),940px)] lg:grid-cols-12 lg:gap-x-6">
        <div className="relative z-10 flex flex-col pb-9 pt-5 md:pb-14 md:pt-10 lg:col-span-7 lg:pb-[88px] lg:pt-14">
          <div className="load-roll" style={d(0)}>
            <StatusTag>{status("onSite")}</StatusTag>
          </div>

          <h1 id="hero-title" className="mt-6 md:mt-9 lg:mt-12">
            <span
              className="load-roll block font-display text-h3 font-extrabold leading-none"
              style={d(140)}
            >
              {t("kicker")}
            </span>{" "}
            <span className="mt-2 block font-display text-h1 font-black md:mt-3">
              <span className="load-roll block pb-[0.04em]" style={d(260)}>
                {t("line1")}
              </span>{" "}
              <span className="load-roll block pb-[0.06em]" style={d(400)}>
                {t("line2")}
              </span>
            </span>
          </h1>

          <p
            className="load-roll mt-6 max-w-[34rem] text-lead text-ink-soft md:mt-8"
            style={d(560)}
          >
            {t("sub")}
          </p>

          <div
            className="load-roll mt-7 flex flex-wrap items-center gap-x-8 gap-y-5 md:mt-9"
            style={d(640)}
          >
            <ButtonA href="#contacto">{t("cta")}</ButtonA>
            <TapeA href="#obras">{t("secondary")}</TapeA>
          </div>

          <ul className="mt-auto hidden gap-10 pt-16 font-body text-caption text-ink-soft lg:flex">
            {meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Photo: full-bleed below the text on mobile/tablet, bleeding off the right edge on desktop */}
      <div className="relative lg:absolute lg:bottom-0 lg:right-0 lg:top-0 lg:w-[41.25%]">
        <div
          className="load-roll relative aspect-[39/44] w-full overflow-hidden bg-plaster md:aspect-[834/560] lg:aspect-auto lg:h-[calc(100%-40px)]"
          style={d(180)}
        >
          <m.div
            className="absolute inset-[-6%_0_-6%_0]"
            style={reduce ? undefined : { y: photoY }}
          >
            <Image
              src={photos.heroRoller}
              alt={t("photoAlt")}
              fill
              priority
              placeholder="blur"
              fetchPriority="high"
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="object-cover object-[30%_50%]"
            />
          </m.div>
          <div className="absolute bottom-5 left-5 flex items-center gap-3 md:bottom-8 md:left-8 lg:left-6">
            <ScaleTag>1:1</ScaleTag>
            <span className="bg-paper px-2.5 py-1.5 font-body text-caption text-ink">
              {t("zoomHint")}
            </span>
          </div>
        </div>
        {/* Encintar (mobile/tablet): tape laid across the photo's top-left corner */}
        <PeelTape
          print={t("tape")}
          className="left-[-36px] top-[44px] w-[300px] md:top-[60px] md:w-[440px] lg:hidden"
          tapeClass="-rotate-[9deg]"
          motionStyle={
            reduce
              ? undefined
              : { rotate: tapeRotate, x: tapeX, y: tapeY, opacity: tapeOpacity }
          }
        />
      </div>

      {/* Encintar (desktop): tape bridging the headline and the photo */}
      <PeelTape
        print={t("tape")}
        className="left-[calc(58.75%-150px)] top-[132px] hidden w-[470px] lg:block"
        tapeClass="-rotate-[7deg]"
        motionStyle={
          reduce
            ? undefined
            : { rotate: tapeRotate, x: tapeX, y: tapeY, opacity: tapeOpacity }
        }
      />
    </section>
  );
}

type PeelStyle = {
  rotate: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  opacity: MotionValue<number>;
};

function PeelTape({
  print,
  className,
  tapeClass,
  motionStyle,
}: {
  print: string;
  className: string;
  tapeClass: string;
  motionStyle?: PeelStyle;
}) {
  return (
    <m.div
      aria-hidden
      className={`pointer-events-none absolute z-20 ${className}`}
      style={
        motionStyle
          ? { ...motionStyle, transformOrigin: "100% 50%" }
          : undefined
      }
    >
      <div className="load-tape" style={d(860)}>
        <Tape print={print} className={`h-9 md:h-10 ${tapeClass}`} />
      </div>
    </m.div>
  );
}
