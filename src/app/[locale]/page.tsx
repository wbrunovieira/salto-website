import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <div className="flex items-center gap-4">
        <svg width="48" height="66" viewBox="0 0 56 76" fill="none" className="text-accent">
          <rect x="19" y="36" width="18" height="38" rx="5" fill="currentColor" />
          <polygon points="0,40 28,2 56,40" fill="currentColor" />
        </svg>
        <span className="font-black text-7xl tracking-tight text-text-primary">SALTO</span>
      </div>
      <p className="text-accent text-sm font-bold tracking-[6px] uppercase">
        {t("app.tagline")}
      </p>
    </main>
  );
}
