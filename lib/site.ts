/**
 * Site-wide facts. Office, phones and address are shared with IBRA Gestiones
 * (same office, ibra-gestiones.vercel.app). Email is routed through Resend.
 */
export const site = {
  name: "Eco Pintura",
  /** NEXT_PUBLIC_SITE_URL (custom domain) → Vercel production URL → localhost. */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),
  /** Office landline. */
  phoneDisplay: "+34 934 717 303",
  phoneHref: "+34934717303",
  /** Mobile used for WhatsApp — CONFIRM this number is on WhatsApp before launch. */
  whatsappDisplay: "+34 654 302 219",
  whatsappHref: "https://wa.me/34654302219",
  email: "hola@ecopintura.es",
  address: {
    street: "Carrer de Pereda, 86-88, nave",
    postalCode: "08930",
    locality: "Sant Adrià de Besòs",
    region: "Barcelona",
    country: "ES",
  },
  geo: { lat: 41.4306546, lng: 2.2067896 },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=41.4306546,2.2067896",
  city: "Barcelona",
  /** Opening hours are not published yet — add (schema.org format) once confirmed. */
  hours: null as string | null,
  areaServed: [
    "Barcelona",
    "Sant Adrià de Besòs",
    "L'Hospitalet de Llobregat",
    "Badalona",
    "Sant Cugat del Vallès",
    "Cornellà de Llobregat",
    "Esplugues de Llobregat",
    "El Prat de Llobregat",
  ],
  obrelierUrl: "https://obrelier.com",
  credit: { name: "Yarel Craft Digital", url: "https://yarelcraft.co.uk" },
  instagram: "", // add when available
} as const;

export const locales = ["es", "ca", "en"] as const;
export type SiteLocale = (typeof locales)[number];

export const ogLocale: Record<SiteLocale, string> = {
  es: "es_ES",
  ca: "ca_ES",
  en: "en_GB",
};

/** Path for a locale under `localePrefix: "as-needed"` (es is unprefixed). */
export function localePath(locale: string, path = "") {
  const clean = path === "/" ? "" : path;
  return locale === "es" ? clean || "/" : `/${locale}${clean}`;
}

export function alternates(path = "") {
  return {
    "es-ES": localePath("es", path),
    "ca-ES": localePath("ca", path),
    en: localePath("en", path),
    "x-default": localePath("es", path),
  };
}
