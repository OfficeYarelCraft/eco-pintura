import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/sections/AboutSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { Hero } from "@/components/sections/Hero";
import { ImpactSection } from "@/components/sections/ImpactSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustMarquee } from "@/components/sections/TrustMarquee";
import { routing } from "@/i18n/routing";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustMarquee />
      <ServicesSection />
      <ImpactSection />
      <ProcessSection />
      <GallerySection />
      <TestimonialsSection />
      <AboutSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
