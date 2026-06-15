import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GallerySection } from "@/components/sections/GallerySection";
import { CtaSection } from "@/components/sections/CtaSection";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.projects" });
  const prefix = locale === "es" ? "" : "/en";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${prefix}/proyectos`,
      languages: {
        es: "/proyectos",
        en: "/en/proyectos",
        "x-default": "/proyectos",
      },
    },
  };
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="pt-28" />
      <GallerySection fullPage />
      <CtaSection />
    </>
  );
}
