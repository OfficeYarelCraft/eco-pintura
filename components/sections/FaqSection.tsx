"use client";

import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { placeholders } from "@/lib/placeholders";

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section className="bg-bg-soft py-16 sm:py-24 lg:py-32" id="faq">
      <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
        <SectionHeading
          align="center"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />

        <Accordion className="mt-12" collapsible type="single">
          {items.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                {t(`items.${i}.answer`, { serviceArea: placeholders.serviceArea })}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
