import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection } from "@/components/sections/CtaSection";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  const prefix = locale === "es" ? "" : "/en";
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${prefix}/contacto`,
      languages: {
        es: "/contacto",
        en: "/en/contacto",
        "x-default": "/contacto",
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <div className="pt-28" />
      <CtaSection />
    </>
  );
}
