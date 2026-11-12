import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { alternates, localePath } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath(locale, "/contacto"),
      languages: alternates("/contacto"),
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath(locale, "/contacto"),
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Contact headingLevel="h1" />
      <Faq />
    </>
  );
}
