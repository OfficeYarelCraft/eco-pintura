import { getTranslations, setRequestLocale } from "next-intl/server";
import { CampNou } from "@/components/sections/CampNou";
import { Contact } from "@/components/sections/Contact";
import { FanDeck } from "@/components/sections/FanDeck";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { LongZoom } from "@/components/sections/LongZoom";
import { ObrelierInsert } from "@/components/sections/ObrelierInsert";
import { Process } from "@/components/sections/Process";
import { Projects } from "@/components/sections/Projects";
import { Reviews } from "@/components/sections/Reviews";
import { FaqJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ locale: string }> };

/* Section order follows the story, not a template: hook → scale → proof → offer → accountability → work → process → voices → answers → ask. */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const faq = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <FaqJsonLd items={faq.raw("items") as { q: string; a: string }[]} />
      <Hero />
      <LongZoom />
      <CampNou />
      <FanDeck />
      <ObrelierInsert />
      <Projects />
      <Process />
      <Reviews />
      <Faq />
      <Contact />
    </>
  );
}
