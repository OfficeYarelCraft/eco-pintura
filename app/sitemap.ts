import type { MetadataRoute } from "next";
import { alternates, locales, localePath, site } from "@/lib/site";

const ROUTES = [
  { path: "", priority: 1 },
  { path: "/servicios", priority: 0.9 },
  { path: "/obras", priority: 0.8 },
  { path: "/contacto", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${site.url}${localePath(locale, path)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates(path)).map(([lang, href]) => [
            lang,
            `${site.url}${href}`,
          ]),
        ),
      },
    })),
  );
}
