"use client";

import {
  m,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { useLenis } from "@/components/providers/LenisProvider";
import { ScaleTag } from "@/components/ui/Tags";
import { zoomFrames } from "@/lib/content";
import { easeFn } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Stop = { scale: string; title: string; body: string; alt: string };
type Rect = { x: number; y: number; s: number };

/* Each frame's rectangle in the outermost frame's normalized coordinates. */
function frameRects(): Rect[] {
  const n = zoomFrames.length;
  const rects: Rect[] = new Array(n);
  rects[n - 1] = { x: 0, y: 0, s: 1 };
  for (let k = n - 2; k >= 0; k--) {
    const outer = rects[k + 1];
    const inset = zoomFrames[k + 1].inset!;
    rects[k] = {
      x: outer.x + inset.x * outer.s,
      y: outer.y + inset.y * outer.s,
      s: outer.s * inset.s,
    };
  }
  return rects;
}
const RECTS = frameRects();
const LAST = RECTS.length - 1;

/**
 * Camera for a continuous position s ∈ [0, LAST]: frame k fills the stage at s = k.
 * Between stops we zoom around the unique fixed point of the two framings,
 * interpolating scale logarithmically: one smooth pull-back, no jumps.
 */
function camera(s: number) {
  const k = Math.min(Math.floor(s), LAST - 1);
  const u = Math.min(1, Math.max(0, s - k));
  const a = RECTS[k],
    b = RECTS[k + 1];
  const Sa = 1 / a.s,
    Sb = 1 / b.s;
  const S = Sa * Math.pow(Sb / Sa, u);
  const axis = (pa: number, pb: number) => {
    const Ta = -pa * Sa,
      Tb = -pb * Sb;
    const fixed = (Tb - Ta) / (Sa - Sb);
    const c = Sa * fixed + Ta;
    return c - S * fixed;
  };
  return { S, Tx: axis(a.x, b.x), Ty: axis(a.y, b.y) };
}

/* Scroll → camera position, with a short hold on every stop so captions can be read. */
const P_IN = [0, 0.08, 0.34, 0.42, 0.66, 0.74, 0.94, 1];
const S_OUT = [0, 0, 1, 1, 2, 2, 3, 3];

export function LongZoom() {
  const t = useTranslations("zoom");
  const stops = t.raw("stops") as Stop[];
  const reduce = useReducedMotion();
  if (reduce)
    return <StaticStops title={t("title")} intro={t("intro")} stops={stops} />;
  return (
    <PinnedZoom
      title={t("title")}
      intro={t("intro")}
      stops={stops}
      progressLabel={t("progress")}
    />
  );
}

function PinnedZoom({
  title,
  intro,
  stops,
  progressLabel,
}: {
  title: string;
  intro: string;
  stops: Stop[];
  progressLabel: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 42,
    mass: 0.35,
  });
  const s = useTransform(p, P_IN, S_OUT, {
    ease: Array(P_IN.length - 1).fill(easeFn.rodillo),
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(s, "change", (v) =>
    setActive(Math.min(LAST, Math.max(0, Math.round(v)))),
  );

  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const targetP = [0.04, 0.38, 0.7, 0.97][i];
    const y = top + travel * targetP;
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      id="escala"
      aria-labelledby="zoom-title"
      className="on-dark relative bg-ink text-paper"
    >
      <div className="wrap pb-10 pt-[var(--section-y)] lg:pb-0">
        <h2
          id="zoom-title"
          className="max-w-[12ch] font-display text-h2 font-extrabold lg:max-w-[16ch]"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-[30rem] text-lead text-paper/75">{intro}</p>
      </div>

      <div
        ref={track}
        id="escala-track"
        className="relative h-[330svh] lg:h-[420svh]"
      >
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden lg:items-center lg:justify-center">
          <div className="wrap flex h-full flex-col max-lg:px-0 lg:grid lg:h-auto lg:grid-cols-12 lg:items-start lg:gap-x-6">
            {/* Desktop stop list */}
            <ol className="hidden lg:col-span-4 lg:block">
              {stops.map((stop, i) => (
                <li key={stop.scale}>
                  <button
                    type="button"
                    onClick={() => jump(i)}
                    aria-current={active === i ? "step" : undefined}
                    className={cn(
                      "block w-full py-[18px] text-left transition-[opacity,padding] duration-300 ease-cinta",
                      active === i
                        ? "pl-5 opacity-100 shadow-[inset_4px_0_0_0_var(--signal)]"
                        : "hairline-t-inv opacity-45 hover:opacity-80",
                    )}
                  >
                    <span className="flex items-baseline gap-3.5">
                      <span
                        className={cn(
                          "font-stencil text-[2.5rem] font-bold leading-none",
                          active === i ? "text-signal" : "text-paper",
                        )}
                      >
                        {stop.scale}
                      </span>
                      <span className="font-display text-h3 font-extrabold">
                        {stop.title}
                      </span>
                    </span>
                    <span className="mt-1.5 block max-w-[24rem] text-small text-paper/80">
                      {stop.body}
                    </span>
                  </button>
                </li>
              ))}
            </ol>

            {/* Stage */}
            <div className="relative min-h-0 flex-1 lg:col-span-8 lg:flex-none">
              <div className="relative h-full w-full overflow-hidden bg-night lg:h-[min(calc(100svh-290px),600px)]">
                {zoomFrames.map((frame, j) => (
                  <ZoomLayer
                    key={j}
                    j={j}
                    s={s}
                    alt={stops[j]?.alt ?? ""}
                    src={frame.src}
                  />
                ))}
                {RECTS.slice(0, LAST).map((_, j) => (
                  <InsetOutline key={j} j={j} s={s} />
                ))}
                <div className="absolute left-5 top-5 z-40 lg:left-6 lg:top-6">
                  <ScaleTag>{stops[active]?.scale}</ScaleTag>
                </div>
              </div>

              {/* Desktop filmstrip */}
              <div className="mt-6 hidden grid-cols-4 gap-6 lg:grid">
                {zoomFrames.map((frame, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => jump(i)}
                    className="group text-left"
                    aria-label={`${stops[i]?.scale} — ${stops[i]?.title}`}
                  >
                    <span
                      className={cn(
                        "relative block aspect-[204/110] overflow-hidden transition-opacity duration-300",
                        active === i
                          ? "opacity-100 shadow-[inset_0_0_0_3px_var(--signal)]"
                          : "opacity-50 group-hover:opacity-80",
                      )}
                    >
                      <Image
                        src={frame.src}
                        alt=""
                        fill
                        sizes="200px"
                        placeholder="blur"
                        className="-z-10 object-cover"
                      />
                    </span>
                    <span
                      className={cn(
                        "mt-2 block font-stencil text-[1.15rem] font-bold leading-none",
                        active === i ? "text-signal" : "text-paper",
                      )}
                    >
                      {stops[i]?.scale}
                    </span>
                  </button>
                ))}
              </div>
              <ProgressLine p={p} label={progressLabel} />
            </div>

            {/* Mobile/tablet caption (hard cut between stops) */}
            <div
              className="wrap relative h-[200px] shrink-0 pt-6 md:h-[210px] lg:hidden"
              aria-live="polite"
            >
              {stops.map((stop, i) => (
                <div
                  key={stop.scale}
                  className={cn(
                    "absolute inset-x-[var(--gutter)] top-6",
                    active === i ? "visible" : "invisible",
                  )}
                  aria-hidden={active !== i}
                >
                  <h3 className="font-display text-h2 font-extrabold">
                    {stop.title}
                  </h3>
                  <p className="mt-2 max-w-[28rem] text-body text-paper/75">
                    {stop.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[var(--section-y)] max-lg:h-12" />
    </section>
  );
}

function ZoomLayer({
  j,
  s,
  src,
  alt,
}: {
  j: number;
  s: MotionValue<number>;
  src: (typeof zoomFrames)[number]["src"];
  alt: string;
}) {
  const r = RECTS[j];
  const scale = useTransform(s, (v) => camera(v).S * r.s);
  const x = useTransform(s, (v) => {
    const c = camera(v);
    return `${(c.S * r.x + c.Tx) * 100}%`;
  });
  const y = useTransform(s, (v) => {
    const c = camera(v);
    return `${(c.S * r.y + c.Ty) * 100}%`;
  });
  // Frames deeper than the next one are fully covered: skip painting them.
  const visibility = useTransform(s, (v) =>
    j <= Math.floor(v + 1e-4) + 1 ? "visible" : "hidden",
  );
  return (
    <m.div
      className="absolute inset-0 will-change-transform"
      style={{
        scale,
        x,
        y,
        visibility,
        originX: 0,
        originY: 0,
        zIndex: 10 + (LAST - j),
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 130vw, 200vw"
        placeholder="blur"
        quality={80}
        className="object-cover"
      />
    </m.div>
  );
}

/** Orange outline marking where the camera came from (drawn in screen space so it stays crisp). */
function InsetOutline({ j, s }: { j: number; s: MotionValue<number> }) {
  const r = RECTS[j];
  const left = useTransform(
    s,
    (v) => `${(camera(v).S * r.x + camera(v).Tx) * 100}%`,
  );
  const top = useTransform(
    s,
    (v) => `${(camera(v).S * r.y + camera(v).Ty) * 100}%`,
  );
  const size = useTransform(s, (v) => `${camera(v).S * r.s * 100}%`);
  const opacity = useTransform(s, (v) => {
    const k = camera(v).S * r.s;
    return k < 0.96 && k > 0.03 ? 1 : 0;
  });
  return (
    <m.span
      aria-hidden
      className="pointer-events-none absolute z-30 block shadow-[inset_0_0_0_2.5px_var(--signal)]"
      style={{ left, top, width: size, height: size, opacity }}
    />
  );
}

function ProgressLine({ p, label }: { p: MotionValue<number>; label: string }) {
  const scaleX = useTransform(p, [0, 1], [0.02, 1]);
  return (
    <div
      className="relative mx-[var(--gutter)] mt-5 h-[2px] bg-paper/15 lg:mx-0"
      aria-hidden
      title={label}
    >
      <m.span
        className="absolute inset-0 block origin-left bg-signal"
        style={{ scaleX }}
      />
    </div>
  );
}

/** Reduced motion: the four frames stacked, no pin, no scaling. */
function StaticStops({
  title,
  intro,
  stops,
}: {
  title: string;
  intro: string;
  stops: Stop[];
}) {
  return (
    <section
      id="escala"
      aria-labelledby="zoom-title"
      className="on-dark bg-ink pb-[var(--section-y)] text-paper"
    >
      <div className="wrap pt-[var(--section-y)]">
        <h2
          id="zoom-title"
          className="max-w-[16ch] font-display text-h2 font-extrabold"
        >
          {title}
        </h2>
        <p className="mt-5 max-w-[30rem] text-lead text-paper/75">{intro}</p>
      </div>
      <ol className="wrap mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {stops.map((stop, i) => (
          <li key={stop.scale}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={zoomFrames[i].src}
                alt={stop.alt}
                fill
                sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
              <ScaleTag className="absolute left-4 top-4">
                {stop.scale}
              </ScaleTag>
            </div>
            <h3 className="mt-4 font-display text-h3 font-extrabold">
              {stop.title}
            </h3>
            <p className="mt-2 text-small text-paper/80">{stop.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
