import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eco Pintura — Pintores en Barcelona",
    short_name: "Eco Pintura",
    description:
      "Pintores en Barcelona para pisos, comunidades, fachadas, comercios y obra grande.",
    start_url: "/",
    display: "browser",
    background_color: "#eeeee8",
    theme_color: "#eeeee8",
    lang: "es",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
