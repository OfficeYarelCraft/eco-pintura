"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { TapeA } from "@/components/ui/TapeLink";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";

type Entry = { t: string; x: string };
type Proof = { t: string; d: string };

/* Vertical position (px, unscaled phone) of the UI row each callout points at. */
const CALLOUT_TOPS = [215, 444, 537];

export function ObrelierInsert() {
  const t = useTranslations("obrelier");
  const proofs = t.raw("proofs") as Proof[];
  const phoneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(phoneRef, { once: true, amount: 0.45 });
  const reduce = useReducedMotion();
  const live = inView || !!reduce;

  return (
    <PaintedSection
      tone="obrelier"
      id="obrelier"
      ariaLabelledby="obrelier-title"
      edge="var(--ob-amber)"
      className="on-dark overflow-hidden text-ob-text"
    >
      <div className="wrap grid gap-12 pb-[var(--section-y)] pt-[var(--section-y)] lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-6 lg:gap-y-0">
        <div className="lg:col-span-5 lg:row-start-1 lg:pt-6">
          <p className="flex items-baseline gap-3">
            <span className="text-small font-medium text-ob-text/70">
              {t("lockup")}
            </span>
            <span className="font-syne text-[1.75rem] font-bold leading-none text-ob-amber md:text-[2.1rem]">
              Obrelier
            </span>
          </p>
          <h2
            id="obrelier-title"
            className="mt-6 max-w-[12ch] font-display text-h2 font-extrabold text-paper"
          >
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[33rem] text-lead text-ob-text/80">
            {t("body")}
          </p>
          <p className="mt-5 max-w-[30rem] text-body text-ob-text/60">
            {t("why")}
          </p>
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          {/* Proofs as a list below 1280px; on wide desktops they become callouts on the phone */}
          <ul className="xl:hidden">
            {proofs.map((p) => (
              <li
                key={p.t}
                className="flex gap-3.5 py-4 shadow-[inset_0_1px_0_0_rgb(242_242_240/0.12)]"
              >
                <span
                  aria-hidden
                  className="mt-1.5 block size-2.5 shrink-0 bg-ob-amber"
                />
                <span>
                  <span className="block font-body font-semibold text-paper">
                    {p.t}
                  </span>
                  <span className="mt-1 block text-small text-ob-text/70">
                    {p.d}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-10 lg:mt-12">
            <TapeA
              href={site.obrelierUrl}
              target="_blank"
              rel="noopener"
              tone="amber"
              className="text-ob-amber"
            >
              {t("link")}
            </TapeA>
          </div>
        </div>

        <div className="relative row-start-2 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <div
            ref={phoneRef}
            className="relative mx-auto w-[300px] [--ph-k:1] lg:ml-6 lg:mr-0 lg:h-[620px] 2xl:h-[713px] 2xl:w-[345px] 2xl:[--ph-k:1.15]"
          >
            <div className="2xl:origin-top-left 2xl:scale-[1.15]">
              <Phone live={live} reduce={!!reduce} />
            </div>

            {/* Desktop callouts drawn outward from the phone */}
            <div className="absolute left-full top-0 hidden w-[350px] xl:block 2xl:w-[400px]">
              {proofs.map((p, i) => (
                <div
                  key={p.t}
                  className="absolute left-0 flex items-start"
                  style={{
                    top: `calc(var(--ph-k) * ${CALLOUT_TOPS[i]}px - 4px)`,
                  }}
                >
                  <m.span
                    aria-hidden
                    className="mt-1 block h-px w-[92px] shrink-0 origin-left bg-ob-amber"
                    initial={reduce ? false : { scaleX: 0 }}
                    animate={live ? { scaleX: 1 } : undefined}
                    transition={{
                      delay: 0.75 + i * 0.12,
                      duration: 0.4,
                      ease: ease.cinta,
                    }}
                  />
                  <m.span
                    aria-hidden
                    className="-ml-[94px] mt-[-3px] block size-2 shrink-0 bg-ob-amber"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={live ? { opacity: 1 } : undefined}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.1 }}
                  />
                  <m.div
                    className="-mt-2.5 ml-[100px] w-[245px] 2xl:w-[290px]"
                    initial={
                      reduce ? false : { clipPath: "inset(-30% 100% -30% 0%)" }
                    }
                    animate={
                      live ? { clipPath: "inset(-30% -2% -30% 0%)" } : undefined
                    }
                    transition={{
                      delay: 0.95 + i * 0.12,
                      duration: 0.5,
                      ease: ease.rodillo,
                    }}
                  >
                    <p className="font-body font-semibold text-paper">{p.t}</p>
                    <p className="mt-1 text-small text-ob-text/70">{p.d}</p>
                  </m.div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-caption text-ob-text/50 lg:ml-6 lg:mt-8 lg:text-left">
            {t("disclaimer")}
          </p>
        </div>
      </div>
    </PaintedSection>
  );
}

/** Illustrative Obrelier client view, in Obrelier's own type (Syne, Figtree, IBM Plex Mono). */
function Phone({ live, reduce }: { live: boolean; reduce: boolean }) {
  const t = useTranslations("obrelier.phone");
  const entries = t.raw("entries") as Entry[];
  return (
    <div
      className="relative h-[620px] w-[300px] rounded-device bg-[#1c1d20] p-2 shadow-[0_0_0_1px_rgb(255_255_255/0.06)]"
      role="img"
      aria-label={`${t("today")}: ${entries.map((e) => `${e.t} ${e.x}`).join(". ")}`}
    >
      <div className="flex h-full flex-col gap-3.5 overflow-hidden rounded-screen bg-ob-bg px-4 pb-4 pt-[18px] font-figtree text-ob-text">
        <div className="flex justify-between px-2.5 text-[13px] font-semibold">
          <span>9:41</span>
          <span className="text-[11px]">5G</span>
        </div>
        <div className="pt-3.5">
          <p className="font-syne text-[15px] font-bold text-ob-amber">
            Obrelier
          </p>
          <p className="mt-1.5 text-[19px] font-semibold leading-tight">
            {t("site")}
          </p>
          <p className="mt-1.5 flex items-center gap-2 text-[12px] font-medium">
            <span aria-hidden className="block size-2 bg-ob-amber" />
            {t("status")}
          </p>
        </div>
        <div className="rounded-ui bg-ob-surface px-3.5 pb-1.5 pt-3">
          <p className="text-[13px] font-semibold text-ob-text/70">
            {t("today")}
          </p>
          <ul>
            {entries.map((e, i) => (
              <m.li
                key={e.t}
                className="flex gap-3 border-t border-white/[0.07] py-2.5"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={live ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  delay: 0.15 + i * 0.12,
                  duration: 0.28,
                  ease: ease.cinta,
                }}
              >
                <span className="font-plexmono text-[12px] font-medium leading-[1.4] text-ob-amber">
                  {e.t}
                </span>
                <span className="text-[13px] leading-[1.4]">{e.x}</span>
              </m.li>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-between rounded-ui bg-ob-surface px-3.5 py-3">
          <span>
            <span className="block text-[11px] font-medium text-ob-text/60">
              {t("hoursLabel")}
            </span>
            <span className="font-syne text-[17px] font-bold">
              {t("hours")}
            </span>
          </span>
          <span className="rounded-chip bg-ob-amber px-3 py-2 text-[12px] font-semibold text-ob-bg">
            {t("view")}
          </span>
        </div>
      </div>
      <span
        aria-hidden
        className="absolute left-1/2 top-4 block h-[26px] w-[90px] -translate-x-1/2 rounded-full bg-black"
      />
    </div>
  );
}
