"use client";

import {
  animate,
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "motion/react";
import { useTranslations } from "next-intl";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Link } from "@/i18n/navigation";
import { deckColours } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  colour: string;
  code: string;
  title: string;
  body: string;
};

/** Physical layout of the deck (px). The pivot hole sits 28px in from the blade's bottom-left. */
const HOLE = 28;

export function FanDeck({
  headingLevel = "h2",
  initial = "fachadas",
}: {
  headingLevel?: "h1" | "h2";
  initial?: string;
}) {
  const t = useTranslations("services");
  const items = t.raw("items") as Service[];
  const n = items.length;
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      items.findIndex((i) => i.id === initial),
    ),
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(stageRef, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const drag = useMotionValue(0);
  const H = headingLevel;

  const go = useCallback((i: number) => setActive(((i % n) + n) % n), [n]);

  // Respect deep links like /servicios#comunidades
  useEffect(() => {
    const fromHash = () => {
      const idx = items.findIndex(
        (i) => i.id === window.location.hash.slice(1),
      );
      if (idx >= 0) setActive(idx);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [items]);

  const onPan = (_: PointerEvent, info: PanInfo) =>
    drag.set(Math.max(-140, Math.min(140, info.offset.x)));
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    if (info.offset.x < -48 || info.velocity.x < -400) go(active + 1);
    else if (info.offset.x > 48 || info.velocity.x > 400) go(active - 1);
    animate(drag, 0, { duration: 0.35, ease: ease.cinta });
  };

  const onListKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const open = inView || !!reduce;
  const listOrder = [
    "pisos",
    "comunidades",
    "fachadas",
    "comercios",
    "obra-grande",
    "especiales",
  ]
    .map((id) => items.findIndex((i) => i.id === id))
    .filter((i) => i >= 0);

  return (
    <PaintedSection
      tone="paper"
      id="servicios"
      ariaLabelledby="services-title"
      className="overflow-hidden"
    >
      <div className="wrap grid gap-10 pb-[var(--section-y)] pt-[var(--section-y)] lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-4">
          <H
            id="services-title"
            className="font-display text-h2 font-extrabold"
          >
            {t("title")}
          </H>
          <p className="mt-5 max-w-[26rem] text-lead text-ink-soft">
            {t("intro")}
          </p>

          <ul
            className="mt-10 hidden lg:block"
            aria-label={t("listLabel")}
            onKeyDown={onListKey}
          >
            {listOrder.map((idx) => (
              <ServiceRow
                key={items[idx].id}
                s={items[idx]}
                active={idx === active}
                onSelect={() => go(idx)}
              />
            ))}
          </ul>
        </div>

        {/* Stage */}
        <div className="relative lg:col-span-8">
          <m.div
            ref={stageRef}
            className="fan-stage relative mx-auto h-[var(--stage-h)] w-full cursor-grab touch-pan-y select-none active:cursor-grabbing"
            onPan={onPan}
            onPanEnd={onPanEnd}
          >
            {items.map((s, i) => {
              const r = (i - active + n) % n;
              return (
                <Blade
                  key={s.id}
                  s={s}
                  rank={r}
                  n={n}
                  open={open}
                  drag={drag}
                  active={r === 0}
                  more={t("more")}
                  onSelect={() => go(i)}
                />
              );
            })}
            <span
              aria-hidden
              className="absolute z-[20] block size-[18px] rounded-full bg-ink"
              style={{
                left: "calc(var(--pivot-x) - 9px)",
                top: "calc(var(--pivot-y) - 9px)",
              }}
            />
            <span
              aria-hidden
              className="absolute text-caption text-ink-soft"
              style={{
                left: "calc(var(--pivot-x) + 28px)",
                top: "calc(var(--pivot-y) + var(--hint-dy))",
              }}
            >
              {t("drag")}
            </span>
          </m.div>
        </div>

        {/* Mobile/tablet list */}
        <ul
          className="grid gap-x-4 md:grid-cols-2 lg:hidden"
          aria-label={t("listLabel")}
          onKeyDown={onListKey}
        >
          {listOrder.map((idx) => (
            <ServiceRow
              key={items[idx].id}
              s={items[idx]}
              active={idx === active}
              onSelect={() => go(idx)}
              compact
            />
          ))}
        </ul>
      </div>
    </PaintedSection>
  );
}

function useStep() {
  const [step, setStep] = useState(10);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setStep(mq.matches ? 11 : 10);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return step;
}

function Blade({
  s,
  rank,
  n,
  open,
  drag,
  active,
  more,
  onSelect,
}: {
  s: Service;
  rank: number;
  n: number;
  open: boolean;
  drag: MotionValue<number>;
  active: boolean;
  more: string;
  onSelect: () => void;
}) {
  const colour = deckColours[s.id] ?? { bg: "var(--deck-blanco)", text: "ink" };
  const [hover, setHover] = useState(false);
  const step = useStep();
  const reduce = useReducedMotion();
  const base = useMotionValue(0);
  const opened = useRef(false);

  // Base angle = rank × step (fan open), plus a small lift when a back blade is hovered.
  useEffect(() => {
    const to = open ? rank * step + (!active && hover ? -2.5 : 0) : 0;
    if (reduce) {
      base.set(open ? rank * step : 0);
      return;
    }
    const first = open && !opened.current;
    if (open) opened.current = true;
    const controls = animate(base, to, {
      duration: first ? 0.9 : hover ? 0.28 : 0.62,
      delay: first ? (n - 1 - rank) * 0.05 : 0,
      ease: first ? ease.rodillo : ease.cinta,
    });
    return () => controls.stop();
  }, [open, rank, step, hover, active, n, base, reduce]);

  // Dragging tilts the whole fan; the front blade leans most.
  const rotate = useTransform(
    () => base.get() + drag.get() * 0.08 * (1 - rank / (n + 1)),
  );

  return (
    <m.div
      role="presentation"
      onClick={active ? undefined : onSelect}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={cn(
        "absolute flex w-[var(--bw)] flex-col overflow-hidden bg-paper shadow-[inset_0_0_0_1px_rgb(21_21_19/0.14)]",
        !active && "cursor-pointer",
      )}
      style={{
        height: "var(--bh)",
        left: `calc(var(--pivot-x) - ${HOLE}px)`,
        top: `calc(var(--pivot-y) - var(--bh) + ${HOLE}px)`,
        transformOrigin: `${HOLE}px calc(100% - ${HOLE}px)`,
        zIndex: n - rank,
        rotate,
      }}
    >
      <div
        className="flex shrink-0 flex-col justify-end px-5 pb-4"
        style={{ height: "var(--sw)", background: colour.bg }}
      >
        <span
          className={cn(
            "font-body font-semibold leading-tight",
            colour.text === "paper" ? "text-paper" : "text-ink",
          )}
        >
          {s.colour}
        </span>
        <span
          className={cn(
            "text-caption",
            colour.text === "paper" ? "text-paper/85" : "text-ink/80",
          )}
        >
          {s.code}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
        <span className="font-display text-[clamp(1.9rem,1.4rem+1.3vw,2.75rem)] font-extrabold leading-none">
          {s.title}
        </span>
        <span className="mt-3 text-small text-ink-soft">{s.body}</span>
        <span className="flex-1" />
        <div className="flex items-end justify-between">
          <span
            aria-hidden
            className="block size-[14px] rounded-full bg-plaster shadow-[inset_0_0_0_1px_rgb(21_21_19/0.2)]"
          />
          {active && (
            <Link
              href={{ pathname: "/servicios", hash: s.id }}
              className="font-body text-[0.9375rem] font-semibold underline decoration-signal decoration-[3px] underline-offset-[6px] hover:decoration-ink"
            >
              {more}
            </Link>
          )}
        </div>
      </div>
    </m.div>
  );
}

function ServiceRow({
  s,
  active,
  onSelect,
  compact,
}: {
  s: Service;
  active: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  const colour = deckColours[s.id];
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={active}
        className={cn(
          "flex w-full items-center gap-4 py-4 text-left transition-[background-color,color,padding] duration-300 ease-cinta",
          active ? "bg-ink px-4 text-paper" : "hairline-t hover:pl-2",
        )}
      >
        <span
          aria-hidden
          className="block size-8 shrink-0 shadow-[inset_0_0_0_1px_rgb(21_21_19/0.14)]"
          style={{ background: colour?.bg }}
        />
        <span
          className={cn(
            "flex-1 font-display font-extrabold leading-none",
            compact ? "text-[1.6rem]" : "text-[1.9rem]",
          )}
        >
          {s.title}
        </span>
        <span
          className={cn(
            "text-caption",
            active ? "text-paper/80" : "text-ink-soft",
          )}
        >
          {s.colour}
        </span>
      </button>
    </li>
  );
}
