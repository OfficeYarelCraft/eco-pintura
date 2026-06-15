"use client";

import { m } from "motion/react";
import {
  Building2,
  Home,
  Leaf,
  Paintbrush,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const serviceKeys = ["interior", "exterior", "commercial", "consulting"] as const;
const icons: Record<(typeof serviceKeys)[number], LucideIcon> = {
  interior: Home,
  exterior: Building2,
  commercial: Paintbrush,
  consulting: Leaf,
};

export function ServicesSection({ showViewAll = true }: { showViewAll?: boolean }) {
  const t = useTranslations("services");

  return (
    <section className="bg-bg-soft py-24 lg:py-32" id="servicios">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          intro={t("intro")}
          title={t("title")}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {serviceKeys.map((key, i) => (
            <ServiceCard
              description={t(`${key}.description`)}
              icon={icons[key]}
              index={i}
              key={key}
              title={t(`${key}.title`)}
            />
          ))}
        </div>

        {showViewAll && (
          <Reveal className="mt-10 text-center">
            <Link
              className="font-semibold text-eco-forest underline-offset-4 hover:underline focus-visible:focus-ring"
              href="/servicios"
            >
              {t("viewAll")}
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.08}>
      <m.article
        className={cn(
          "group relative h-full overflow-hidden rounded-xl-brand border border-line bg-white p-6 shadow-brand-sm transition-shadow hover:shadow-glow-eco",
        )}
        whileHover={{ y: -6 }}
      >
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-lg-brand bg-grad-eco text-white">
          <m.div whileHover={{ rotate: 12, scale: 1.1 }}>
            <Icon className="h-7 w-7" />
          </m.div>
        </div>
        <h3 className="font-display text-step-1 font-semibold text-ink">{title}</h3>
        <p className="mt-3 text-step-0 leading-relaxed text-ink-soft">{description}</p>
      </m.article>
    </Reveal>
  );
}
