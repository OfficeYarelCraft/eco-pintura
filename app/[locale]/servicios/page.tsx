import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/sections/Contact";
import { FanDeck } from "@/components/sections/FanDeck";
import { Faq } from "@/components/sections/Faq";
import { PageHeader } from "@/components/sections/PageHeader";
import { Process } from "@/components/sections/Process";
import { FaqJsonLd } from "@/components/seo/JsonLd";
import { alternates, localePath } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.services" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath(locale, "/servicios"),
      languages: alternates("/servicios"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath(locale, "/servicios"),
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.services" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const hero = await getTranslations({ locale, namespace: "hero" });
  const faq = await getTranslations({ locale, namespace: "faq" });

  return (
    <>
      <FaqJsonLd items={faq.raw("items") as { q: string; a: string }[]} />
      <PageHeader
        title={t("h1")}
        home={nav("home")}
        current={nav("services")}
        tape={hero("tape")}
      />
      <FanDeck initial="pisos" />
      <Process />
      <Faq />
      <Contact />
    </>
  );
}
