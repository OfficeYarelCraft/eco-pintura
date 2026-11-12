import { getTranslations } from "next-intl/server";
import { localePath, site } from "@/lib/site";

function Script({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here: all values are our own static strings.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** HousePainter (a LocalBusiness subtype) with the six services as an offer catalogue. */
export async function BusinessJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "meta" });
  const s = await getTranslations({ locale, namespace: "services" });
  const items = s.raw("items") as { id: string; title: string; body: string }[];
  const data = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: t("description"),
    url: `${site.url}${localePath(locale)}`,
    logo: `${site.url}/logo/eco-pintura.svg`,
    image: `${site.url}/og.jpg`,
    telephone: site.phoneHref,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.mapsUrl,
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    ...(site.hours ? { openingHours: site.hours } : {}),
    knowsLanguage: ["es", "ca", "en"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: s("title"),
      itemListElement: items.map((i) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: i.title,
          description: i.body,
          areaServed: site.city,
        },
      })),
    },
  };
  return <Script data={data} />;
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return (
    <Script
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((i) => ({
          "@type": "Question",
          name: i.q,
          acceptedAnswer: { "@type": "Answer", text: i.a },
        })),
      }}
    />
  );
}
