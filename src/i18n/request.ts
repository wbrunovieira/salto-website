import { cache } from "react";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const NAMESPACES = ["common", "nav", "hero", "services", "process", "about", "contact", "footer", "cookies", "stats"] as const;

const loadMessages = cache(async (locale: string) => {
  const modules = await Promise.all(
    NAMESPACES.map((ns) => import(`../../messages/${locale}/${ns}.json`))
  );
  return modules.reduce<Record<string, unknown>>(
    (acc, mod) => ({ ...acc, ...mod.default }),
    {}
  );
});

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  return { locale, messages: await loadMessages(locale) };
});
