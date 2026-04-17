"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type SupportedLocale = (typeof routing.locales)[number];

export const LOCALE_STORAGE_KEY = "salto_locale";

function detectBrowserLocale(): SupportedLocale {
  const primary = navigator.language.split("-")[0].toLowerCase();
  return (routing.locales as readonly string[]).includes(primary)
    ? (primary as SupportedLocale)
    : routing.defaultLocale;
}

export default function LocaleDetector({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as SupportedLocale | null;

    if (saved && (routing.locales as readonly string[]).includes(saved)) {
      if (saved !== currentLocale) {
        router.replace(pathname, { locale: saved });
      }
    } else {
      const detected = detectBrowserLocale();
      localStorage.setItem(LOCALE_STORAGE_KEY, detected);
      if (detected !== currentLocale) {
        router.replace(pathname, { locale: detected });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
