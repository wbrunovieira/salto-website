import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en", "es", "it"],
  defaultLocale: "pt",
  localeDetection: true,
  localeCookie: {
    name: "salto_locale",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  },
});
