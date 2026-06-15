"use client";

import { m } from "motion/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { BeforeAfterSlider } from "./gallery/BeforeAfterSlider";
import { cn } from "@/lib/utils";

type Filter = "all" | "interior" | "exterior" | "commercial";

interface GalleryItemData {
  id: string;
  category: Exclude<Filter, "all">;
  title: string;
  colors: [string, string];
}

const items: GalleryItemData[] = [
  { id: "1", category: "interior", title: "Salón luminoso", colors: ["#E8F5D6", "#9DD53A"] },
  { id: "2", category: "interior", title: "Dormitorio sereno", colors: ["#F2F5EA", "#5CBE49"] },
  { id: "3", category: "exterior", title: "Fachada renovada", colors: ["#FFF4E6", "#FBA63C"] },
  { id: "4", category: "commercial", title: "Oficina moderna", colors: ["#E4E9DA", "#37A94B"] },
  { id: "5", category: "exterior", title: "Terraza acogedora", colors: ["#FDE8D8", "#F47A29"] },
  { id: "6", category: "commercial", title: "Local comercial", colors: ["#D4EDDA", "#1F7A3D"] },
];

export function GallerySection({ fullPage = false }: { fullPage?: boolean }) {
  const t = useTranslations("gallery");
  const [filter, setFilter] = useState<Filter>("all");

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "interior", label: t("filters.interior") },
    { key: "exterior", label: t("filters.exterior") },
    { key: "commercial", label: t("filters.commercial") },
  ];

  const filtered =
    filter === "all" ? items : items.filter((item) => item.category === filter);

  return (
    <section className="py-16 sm:py-24 lg:py-32" id="proyectos">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow")}
          intro={t("intro")}
          title={t("title")}
        />

        <Reveal className="mt-10">
          <BeforeAfterSlider
            afterColor="#9DD53A"
            beforeColor="#E4E9DA"
            label={t("beforeAfter.label")}
          />
        </Reveal>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {filters.map((f) => (
            <button
              className={cn(
                "shrink-0 rounded-pill px-4 py-2 text-step--1 font-semibold transition-colors focus-visible:focus-ring sm:shrink",
                filter === f.key
                  ? "bg-grad-eco text-white"
                  : "bg-white text-ink-soft hover:bg-bg-soft",
              )}
              key={f.key}
              onClick={() => setFilter(f.key)}
              type="button"
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {(fullPage ? items : filtered).map((item, i) => (
            <GalleryItem colors={item.colors} index={i} key={item.id} title={item.title} />
          ))}
        </div>

        {!fullPage && (
          <Reveal className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Button asChild className="w-full sm:w-auto" variant="ghost">
              <Link href="/proyectos">{t("viewAll")}</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto">
              <Link href="/contacto">{t("cta")}</Link>
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function GalleryItem({
  title,
  colors,
  index,
}: {
  title: string;
  colors: [string, string];
  index: number;
}) {
  return (
    <Reveal delay={index * 0.05}>
      <m.figure
        className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl-brand shadow-brand-sm"
        whileHover={{ y: -4 }}
      >
        <div
          aria-label={`{{PROJECT_IMG_${index + 1}}} — ${title}`}
          className="aspect-[4/3] w-full"
          role="img"
          style={{
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
          }}
        />
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-full bg-ink/70 p-4 text-white backdrop-blur-sm transition-transform group-hover:translate-y-0">
          <p className="font-display font-semibold">{title}</p>
        </figcaption>
      </m.figure>
    </Reveal>
  );
}
