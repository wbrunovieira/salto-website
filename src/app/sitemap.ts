import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saltoup.com";

const PAGES = ["", "/privacidade"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page === "" ? 1 : 0.5,
        alternates: {
          languages: {
            "x-default": `${BASE_URL}/pt${page}`,
            ...Object.fromEntries(
              routing.locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
            ),
          },
        },
      });
    }
  }

  return entries;
}
