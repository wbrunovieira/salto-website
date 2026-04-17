import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      <div className="flex items-center gap-4">
        <svg width="48" height="66" viewBox="0 0 56 76" fill="none">
          <rect x="19" y="36" width="18" height="38" rx="5" fill="#FF5C00" />
          <polygon points="0,40 28,2 56,40" fill="#FF5C00" />
        </svg>
        <span className="font-black text-7xl tracking-tight text-[#F5F5F5]">SALTO</span>
      </div>
      <p className="text-[#FF5C00] text-sm font-bold tracking-[6px] uppercase">
        {t("app.tagline")}
      </p>
    </main>
  );
}
