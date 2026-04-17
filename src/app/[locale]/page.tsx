import { routing } from "@/i18n/routing";
import HeroClient from "@/components/sections/HeroClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <main>
      <HeroClient />
    </main>
  );
}
