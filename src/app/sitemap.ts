import type { MetadataRoute } from "next";
import { getSlugs } from "@/features/services/api/services.service";

const SITIO = "https://www.podiochile.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: SITIO, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...getSlugs().map((slug) => ({
      url: `${SITIO}/servicios/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...["privacidad", "terminos", "cookies"].map((ruta) => ({
      url: `${SITIO}/${ruta}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
