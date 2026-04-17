import { routing } from "@/i18n/routing";
import ScrollSceneClient from "@/components/ScrollSceneClient";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function HomePage() {
  return (
    <main>
      <ScrollSceneClient />
    </main>
  );
}
