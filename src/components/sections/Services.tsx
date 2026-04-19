"use client";

import { useTranslations } from "next-intl";

const ITEMS = ["diagnosis", "strategy", "ads", "crm", "metrics", "tech"] as const;

const ICONS: Record<string, React.ReactNode> = {
  diagnosis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6M8 11h6" />
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </svg>
  ),
  ads: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
  ),
  crm: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  metrics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  tech: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
};

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="relative bg-[#0E0E0E] px-6 pb-32 scroll-mt-20">
      {/* Overlap gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none z-10" />
      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto pt-32">

        {/* Header — IDs para GSAP */}
        <div className="flex flex-col items-center text-center mb-20">

          <span id="services-label" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {t("label")}
          </span>

          {/* overflow-hidden no pai para o slide-up do texto */}
          <div className="overflow-hidden mb-3">
            <h2 id="services-title1" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-text-primary">
              {t("title")}
            </h2>
          </div>

          <div className="overflow-hidden mb-10">
            <h2 id="services-title2" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent">
              {t("titleAccent")}
            </h2>
          </div>

          <p id="services-subtitle" className="max-w-2xl text-base md:text-lg text-text-muted leading-relaxed mb-5">
            {t("subtitle")}
          </p>

          <p id="services-contrast" className="text-sm font-semibold text-accent/80 tracking-wide">
            {t("contrast")}
          </p>
        </div>

        {/* Cards — data-col para animação por coluna */}
        <div id="services-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ITEMS.map((key, index) => {
            const isTech = key === "tech";
            return (
              <div
                key={key}
                data-col={index % 3}
                className={`service-card group relative p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(255,92,0,0.12)] ${
                  isTech
                    ? "border-border bg-gradient-to-br from-surface to-[#1a0a00]"
                    : "border-border bg-surface/60"
                }`}
              >
                <div className={`service-icon w-11 h-11 mb-5 ${isTech ? "text-accent" : "text-accent/70 group-hover:text-accent"} transition-colors duration-300`}>
                  {ICONS[key]}
                </div>
                <h3 className="text-base font-bold text-text-primary mb-2 tracking-tight">
                  {t(`items.${key}.title` as `items.diagnosis.title`)}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {t(`items.${key}.description` as `items.diagnosis.description`)}
                </p>
                {isTech && (
                  <span className="absolute top-5 right-5 text-[9px] font-bold tracking-[3px] uppercase text-accent border border-accent/30 rounded-full px-2 py-0.5">
                    WB
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
