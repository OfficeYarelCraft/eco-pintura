"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { useTranslations } from "next-intl";
import { PaintedSection } from "@/components/motion/PaintedSection";
import { TapeA } from "@/components/ui/TapeLink";
import { site } from "@/lib/site";

type QA = { q: string; a: string };

export function Faq() {
  const t = useTranslations("faq");
  const items = t.raw("items") as QA[];

  return (
    <PaintedSection
      tone="paper"
      id="preguntas"
      ariaLabelledby="faq-title"
      roll={false}
    >
      <div className="wrap grid gap-10 pb-[calc(var(--section-y)+40px)] pt-4 lg:grid-cols-12 lg:gap-6 lg:pt-8">
        <div className="lg:col-span-4">
          <h2
            id="faq-title"
            className="max-w-[10ch] font-display text-h2 font-extrabold"
          >
            {t("title")}
          </h2>
          <p className="mt-6 max-w-[22rem] text-body text-ink-soft">
            {t("more")}
          </p>
          <div className="mt-6">
            <TapeA href={site.whatsappHref}>{t("whatsapp")}</TapeA>
          </div>
        </div>
        <Accordion.Root
          type="single"
          collapsible
          defaultValue="q0"
          className="lg:col-span-7 lg:col-start-6"
        >
          {items.map((it, i) => (
            <Accordion.Item
              key={it.q}
              value={`q${i}`}
              className="shadow-[inset_0_1.5px_0_0_var(--ink)] last:shadow-[inset_0_1.5px_0_0_var(--ink),inset_0_-1.5px_0_0_var(--ink)]"
            >
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left">
                    <span className="font-display text-[1.75rem] font-extrabold leading-[1.02] md:text-[1.95rem]">
                      {it.q}
                    </span>
                    <svg
                      aria-hidden
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      className="mt-1 shrink-0 transition-transform duration-300 ease-cinta group-data-[state=open]:rotate-45"
                    >
                      <rect
                        x="12.5"
                        y="2"
                        width="3"
                        height="24"
                        fill="currentColor"
                      />
                      <rect
                        x="2"
                        y="12.5"
                        width="24"
                        height="3"
                        fill="currentColor"
                      />
                    </svg>
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="acc-content overflow-hidden">
                <p className="max-w-[40rem] pb-7 text-body text-ink-soft">
                  {it.a}
                </p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </PaintedSection>
  );
}
