"use client";

import { Heart, Leaf, Award, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const valueKeys = ["health", "sustainability", "quality", "closeness"] as const;
const valueIcons = { health: Heart, sustainability: Leaf, quality: Award, closeness: Users };

export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section className="py-16 sm:py-24 lg:py-32" id="nosotros">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <div className="grid items-start gap-10 sm:gap-16 lg:grid-cols-2">
          <SectionHeading
            eyebrow={t("eyebrow")}
            intro={t("intro")}
            title={t("title")}
          />

          <Reveal>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {valueKeys.map((key) => {
                const Icon = valueIcons[key];
                return (
                  <div
                    className="rounded-xl-brand border border-line bg-white p-5 shadow-brand-sm"
                    key={key}
                  >
                    <Icon aria-hidden className="mb-3 h-6 w-6 text-eco-green" />
                    <h3 className="font-display text-step-1 font-semibold">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-step--1 text-ink-soft">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3].map((i) => (
              <div
                aria-label={`{{TEAM_MEMBER_${i}}}`}
                className="flex flex-col items-center gap-3"
                key={i}
              >
                <div
                  className="h-24 w-24 rounded-full bg-grad-eco opacity-80"
                  role="img"
                />
                <span className="text-step--1 font-medium text-ink-soft">
                  {`{{TEAM_NAME_${i}}}`}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
