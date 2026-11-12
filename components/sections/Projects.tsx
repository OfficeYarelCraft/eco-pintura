"use client";

import {
  AnimatePresence,
  LayoutGroup,
  m,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { TapeLink } from "@/components/ui/TapeLink";
import { projectPhotos } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { BeforeAfter } from "./BeforeAfter";

type Item = {
  id: string;
  cat: string;
  title: string;
  duration: string;
  alt: string;
};
const FILTERS = [
  "all",
  "pisos",
  "comunidades",
  "fachadas",
  "comercios",
  "obra-grande",
] as const;

/* Editorial layout for the "all" view on the home page (Figma › Desktop › Obras recientes). */
const FEATURED: Record<string, string> = {
  "camp-nou":
    "col-span-2 lg:col-span-8 [--h:250px] md:[--h:420px] lg:[--h:540px]",
  "sant-antoni":
    "col-span-2 md:col-span-1 md:row-span-2 lg:row-span-1 lg:col-span-4 [--h:430px] md:[--h:742px] lg:[--h:540px]",
  gracia: "col-span-1 lg:col-span-4 [--h:220px] md:[--h:330px] lg:[--h:400px]",
  eixample:
    "col-span-1 lg:col-span-4 lg:mt-16 [--h:220px] md:[--h:330px] lg:[--h:400px]",
  "poble-sec":
    "col-span-2 lg:col-span-4 [--h:250px] md:[--h:360px] lg:[--h:400px]",
};

export function Projects({
  full = false,
  headingLevel = "h2",
}: {
  full?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const t = useTranslations("work");
  const items = t.raw("items") as Item[];
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const reduce = useReducedMotion();
  const H = headingLevel;

  const featured = filter === "all" && !full;
  const visible = items.filter((i) =>
    filter === "all" ? (full ? true : i.id in FEATURED) : i.cat === filter,
  );

  return (
    <PaintedSection tone="paper" id="obras" ariaLabelledby="work-title">
      <div className="wrap pb-[var(--section-y)] pt-[var(--section-y)]">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <H id="work-title" className="font-display text-h2 font-extrabold">
            {t("title")}
          </H>
          <div
            role="group"
            aria-label={t("filtersLabel")}
            className="no-scrollbar -mx-[var(--gutter)] flex gap-2 overflow-x-auto px-[var(--gutter)] lg:mx-0 lg:px-0"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 px-4 py-3 font-body text-[0.875rem] font-medium leading-none transition-colors duration-200",
                  filter === f
                    ? "bg-ink text-paper"
                    : "text-ink shadow-[inset_0_0_0_1.5px_var(--ink)] hover:bg-plaster",
                )}
              >
                {t(`filters.${f}`)}
              </button>
            ))}
          </div>
        </div>

        <LayoutGroup>
          <m.ul
            layout
            className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-12 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-[60px]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((item, i) => (
                <m.li
                  key={item.id}
                  layout={reduce ? false : "position"}
                  className={cn(
                    featured
                      ? FEATURED[item.id]
                      : "col-span-2 [--h:300px] md:col-span-1 md:[--h:360px] lg:col-span-4 lg:[--h:420px]",
                  )}
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{ clipPath: "inset(0 0 0 100%)" }}
                  transition={{ duration: 0.55, ease: ease.rodillo }}
                >
                  <Tile
                    item={item}
                    priority={full && i < 2}
                    wide={featured && item.id === "camp-nou"}
                  />
                </m.li>
              ))}
            </AnimatePresence>
          </m.ul>
        </LayoutGroup>
        {visible.length === 0 && (
          <p className="mt-10 text-body text-ink-soft">{t("empty")}</p>
        )}

        <div className="mt-[72px] grid gap-8 lg:mt-24 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <BeforeAfter
              before={t("beforeAfter.before")}
              after={t("beforeAfter.after")}
              label={t("beforeAfter.handle")}
            />
          </div>
          <div className="lg:col-span-4">
            <h3 className="font-display text-h3 font-extrabold">
              {t("beforeAfter.title")}
            </h3>
            <p className="mt-4 max-w-[26rem] text-body text-ink-soft">
              {t("beforeAfter.body")}
            </p>
            {!full && (
              <div className="mt-8">
                <TapeLink href="/obras">{t("all")}</TapeLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </PaintedSection>
  );
}

function Tile({
  item,
  priority,
  wide,
}: {
  item: Item;
  priority?: boolean;
  wide?: boolean;
}) {
  const src = projectPhotos[item.id];
  return (
    <figure>
      <TileImage src={src} alt={item.alt} priority={priority} wide={wide} />
      <figcaption className="mt-3.5 flex items-start justify-between gap-4">
        <span className="font-body font-semibold leading-snug">
          {item.title}
        </span>
        <span className="shrink-0 text-small text-ink-soft">
          {item.duration}
        </span>
      </figcaption>
    </figure>
  );
}

function TileImage({
  src,
  alt,
  priority,
  wide,
}: {
  src: (typeof projectPhotos)[string];
  alt: string;
  priority?: boolean;
  wide?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className="relative w-full overflow-hidden bg-plaster"
      style={{ height: "var(--h)" }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <m.div
        className="absolute inset-0"
        variants={
          reduce
            ? undefined
            : {
                hidden: { clipPath: "inset(0 100% 0 0)" },
                show: { clipPath: "inset(0 0% 0 0)" },
              }
        }
        transition={{ duration: 0.85, ease: ease.rodillo }}
      >
        <m.div
          className="absolute inset-0"
          variants={
            reduce ? undefined : { hidden: { scale: 1.08 }, show: { scale: 1 } }
          }
          transition={{ duration: 1.3, ease: ease.out }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            placeholder="blur"
            priority={priority}
            sizes={
              wide
                ? "(min-width:1024px) 62vw, 100vw"
                : "(min-width:1024px) 34vw, (min-width:768px) 50vw, 100vw"
            }
            className="object-cover"
          />
        </m.div>
      </m.div>
    </m.div>
  );
}
