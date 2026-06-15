"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { Pill } from "@/components/ui/Pill";
import { QuoteForm } from "@/components/sections/QuoteForm";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-24 lg:py-32" id="contacto">
      <div aria-hidden className="absolute inset-0 bg-grad-eco opacity-90" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <Reveal>
            <Pill className="border-white/30 bg-white/20 text-white" icon>
              {t("eyebrow")}
            </Pill>
            <h2 className="mt-4 font-display text-step-3 font-semibold leading-tight text-white">
              {t("title")}
            </h2>
            <p className="mt-4 max-w-md text-step-1 leading-relaxed text-white/85">
              {t("subtitle")}
            </p>
          </Reveal>
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
