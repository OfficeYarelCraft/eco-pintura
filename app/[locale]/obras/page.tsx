import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CampNou } from "@/components/sections/CampNou";
import { Contact } from "@/components/sections/Contact";
import { PageHeader } from "@/components/sections/PageHeader";
import { Projects } from "@/components/sections/Projects";
import { alternates, localePath } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.work" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath(locale, "/obras"),
      languages: alternates("/obras"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath(locale, "/obras"),
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "pages.work" });
  const nav = await getTranslations({ locale, namespace: "nav" });
  const hero = await getTranslations({ locale, namespace: "hero" });

  return (
    <>
      <PageHeader
        title={t("h1")}
        home={nav("home")}
        current={nav("work")}
        tape={hero("tape")}
      />
      <Projects full />
      <CampNou />
      <Contact />
    </>
  );
}
