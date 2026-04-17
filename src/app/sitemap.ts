import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saltoup.com";

const SECTIONS = ["", "/#services", "/#process", "/#about", "/#contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const section of SECTIONS) {
      entries.push({
        url: `${BASE_URL}/${locale}${section}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: section === "" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE_URL}/${l}${section}`])
          ),
        },
      });
    }
  }

  return entries;
}
