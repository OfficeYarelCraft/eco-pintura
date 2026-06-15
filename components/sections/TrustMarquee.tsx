"use client";

import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/Marquee";

export function TrustMarquee() {
  const t = useTranslations("marquee");
  const items = t.raw("items") as string[];

  return (
    <section aria-label="Certifications" className="border-y border-line bg-white/50">
      <Marquee items={items} />
    </section>
  );
}
