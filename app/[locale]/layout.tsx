import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { GrainOverlay } from "@/components/motion/GrainOverlay";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/sections/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import "../globals.css";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  weight: ["500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    metadataBase: new URL("https://{{DOMAIN}}"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: locale === "es" ? "/" : "/en",
      languages: {
        es: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og-image.svg"],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      className={`${fredoka.variable} ${plusJakarta.variable}`}
      lang={locale}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-hidden">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <LenisProvider>
              <ScrollProgress />
              <GrainOverlay />
              <CustomCursor />
              <JsonLd locale={locale} />
              <Navbar />
              <main>{children}</main>
              <Footer />
            </LenisProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
