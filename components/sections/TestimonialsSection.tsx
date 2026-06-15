"use client";

import { m, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { placeholders } from "@/lib/placeholders";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export function TestimonialsSection() {
  const t = useTranslations("testimonials");
  const reduced = useReducedMotion();
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="bg-bg-soft py-16 sm:py-24 lg:py-32" id="testimonios">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <p className="mt-2 text-step--1 text-ink-soft italic">{t("sampleNote")}</p>

        {/* Mobile: vertical stack with snap scroll */}
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {items.map((item, i) => (
            <div className="w-[min(85vw,320px)] shrink-0 snap-center" key={item.name}>
              <TestimonialCard index={i} item={item} />
            </div>
          ))}
        </div>

        {/* Tablet+: marquee */}
        <div className="mt-12 hidden overflow-hidden md:block">
          <m.div
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            className="flex w-max gap-6"
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[...items, ...items].map((item, i) => (
              <TestimonialCard
                index={i % items.length}
                item={item}
                key={`${item.name}-${i}`}
              />
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  const t = useTranslations("testimonials");

  return (
    <Reveal>
      <blockquote className="w-full shrink-0 rounded-xl-brand border border-line bg-white p-5 shadow-brand-sm sm:w-[380px] sm:p-6">
        <div aria-hidden className="mb-4 flex gap-1">
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star className="h-4 w-4 fill-paint-amber text-paint-amber" key={i} />
          ))}
        </div>
        <p className="text-step-0 leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</p>
        <footer className="mt-6">
          <cite className="not-italic">
            <p className="font-display font-semibold text-ink">{item.name}</p>
            <p className="text-step--1 text-ink-soft">
              {t(`items.${index}.role`, {
                city: placeholders.city,
                company: placeholders.company,
              })}
            </p>
          </cite>
        </footer>
      </blockquote>
    </Reveal>
  );
}
