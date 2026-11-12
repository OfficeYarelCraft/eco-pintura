"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { Tape } from "@/components/ui/Tape";
import { ease } from "@/lib/motion";
import { site } from "@/lib/site";
import { QuoteForm } from "./QuoteForm";

export function Contact({
  headingLevel = "h2",
}: {
  headingLevel?: "h1" | "h2";
}) {
  const t = useTranslations("contact");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const H = headingLevel;

  return (
    <PaintedSection
      tone="signal"
      id="contacto"
      ariaLabelledby="contact-title"
      className="overflow-hidden"
      bleed={240}
    >
      {/* Despegar: the corner tapes peel away once the form is on screen, leaving a clean edge */}
      <CornerTape side="left" peel={inView && !reduce} />
      <CornerTape side="right" peel={inView && !reduce} />

      <div
        ref={ref}
        className="wrap grid gap-12 pb-[var(--section-y)] pt-[calc(var(--section-y)-8px)] lg:grid-cols-12 lg:gap-6"
      >
        <div className="flex min-w-0 flex-col lg:col-span-5">
          <H
            id="contact-title"
            className="font-display font-black leading-[0.9] [font-size:clamp(3.1rem,0.9rem+6.6vw,8.6rem)] lg:[font-size:min(calc((var(--vw-c)-96px)*0.4/6.25),8.75rem)]"
          >
            {t("title")}
          </H>
          <p className="mt-6 max-w-[28rem] text-lead text-ink">{t("body")}</p>
          <div className="mt-auto hidden pt-16 lg:block">
            <AltContact />
          </div>
        </div>
        <div className="min-w-0 lg:col-span-6 lg:col-start-7">
          <QuoteForm />
          <div className="mt-12 lg:hidden">
            <AltContact />
          </div>
        </div>
      </div>
    </PaintedSection>
  );
}

function AltContact() {
  const t = useTranslations("contact");
  return (
    <div className="max-w-[30rem] pt-5 shadow-[inset_0_1.5px_0_0_var(--ink)]">
      <p className="font-body font-semibold">{t("prefer")}</p>
      <p className="mt-2 flex flex-col gap-1 text-lead">
        <a
          href={site.whatsappHref}
          className="w-fit underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
        >
          WhatsApp {site.whatsappDisplay}
        </a>
        <a
          href={`tel:${site.phoneHref}`}
          className="w-fit underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
        >
          {t("call")} {site.phoneDisplay}
        </a>
        <a
          href={`mailto:${site.email}`}
          className="w-fit underline decoration-ink/30 decoration-2 underline-offset-4 hover:decoration-ink"
        >
          {site.email}
        </a>
      </p>
      <p className="mt-4 text-small text-ink/80">
        {site.address.street}, {site.address.postalCode} {site.address.locality}
      </p>
    </div>
  );
}

function CornerTape({ side, peel }: { side: "left" | "right"; peel: boolean }) {
  const left = side === "left";
  return (
    <m.div
      aria-hidden
      className={
        left
          ? "absolute -left-6 top-6 z-10 w-[190px] md:w-[260px]"
          : "absolute -right-6 top-9 z-10 w-[170px] md:w-[240px]"
      }
      style={{
        transformOrigin: left ? "100% 50%" : "0% 50%",
        rotate: left ? -5 : 4,
      }}
      animate={
        peel
          ? { rotate: left ? 22 : -24, x: left ? 70 : -70, y: -90, opacity: 0 }
          : undefined
      }
      transition={{
        duration: 0.7,
        ease: ease.despegar,
        delay: left ? 0.15 : 0.3,
        opacity: { delay: left ? 0.6 : 0.75, duration: 0.2 },
      }}
    >
      <Tape className="h-9 md:h-10" />
    </m.div>
  );
}
