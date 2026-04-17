import { routing } from "@/i18n/routing";
import Hero from "@/components/sections/Hero";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <main>
      <Hero />
    </main>
  );
}
