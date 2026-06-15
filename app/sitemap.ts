import type { MetadataRoute } from "next";

const baseUrl = "https://{{DOMAIN}}";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/proyectos", "/servicios", "/contacto"];
  const locales = ["es", "en"] as const;

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}${locale === "es" ? route : `/en${route}`}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
