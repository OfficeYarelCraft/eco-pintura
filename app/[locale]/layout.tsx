import type { Metadata, Viewport } from "next";
import {
  Big_Shoulders,
  Big_Shoulders_Stencil,
  Figtree,
  IBM_Plex_Mono,
  Schibsted_Grotesk,
  Syne,
} from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Nav } from "@/components/layout/Nav";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { BusinessJsonLd } from "@/components/seo/JsonLd";
import { routing } from "@/i18n/routing";
import {
  alternates,
  localePath,
  ogLocale,
  site,
  type SiteLocale,
} from "@/lib/site";
import "../globals.css";

/* Big Shoulders: Chicago city-signage type. opsz is pinned to 72 (the Display cut) in CSS. */
const display = Big_Shoulders({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "block",
  adjustFontFallback: false,
});
/* Stencil cut: how painters letter a job site. */
const stencil = Big_Shoulders_Stencil({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-stencil",
  display: "block",
  adjustFontFallback: false,
});
/* Newspaper workhorse for reading. */
const body = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
/* Obrelier's own brand faces, used only inside the partner insert. */
const syne = Syne({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-syne",
  display: "swap",
  preload: false,
});
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  preload: false,
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#eeeee8",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: t("title"),
    description: t("description"),
    applicationName: site.name,
    alternates: { canonical: localePath(locale), languages: alternates() },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: localePath(locale),
      siteName: site.name,
      locale: ogLocale[locale as SiteLocale],
      type: "website",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: t("ogAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/og.jpg"],
    },
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${display.variable} ${stencil.variable} ${body.variable} ${syne.variable} ${figtree.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-clip">
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <LenisProvider>
              <BusinessJsonLd locale={locale} />
              <Nav />
              <main id="contenido">{children}</main>
              <Footer />
              <MobileActionBar />
            </LenisProvider>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
