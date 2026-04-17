"use client";

import { useTranslations } from "next-intl";

const STEPS = ["diagnosis", "strategy", "execution", "scale"] as const;

const STEP_ICONS: Record<string, React.ReactNode> = {
  diagnosis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7" /><path d="m21 21-4.35-4.35" /><path d="M11 8v6M8 11h6" />
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  execution: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

export default function Process() {
  const t = useTranslations("process");

  return (
    <section id="process" className="relative bg-[#0E0E0E] px-6 pb-32">
      {/* Overlap gradient from services */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto pt-32">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <span id="process-label" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {t("label")}
          </span>

          <div className="overflow-hidden mb-3">
            <h2 id="process-title1" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-text-primary">
              {t("title")}
            </h2>
          </div>
          <div className="overflow-hidden mb-10">
            <h2 id="process-title2" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent">
              {t("titleAccent")}
            </h2>
          </div>

          <p id="process-subtitle" className="max-w-2xl text-base md:text-lg text-text-muted leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Steps grid */}
        <div id="process-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {STEPS.map((step, index) => (
            <div
              key={step}
              data-step={index}
              className="process-step group relative p-8 rounded-2xl border border-border bg-surface/40 hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(255,92,0,0.10)] transition-all duration-300 overflow-hidden"
            >
              {/* Large background number */}
              <span className="process-step-number absolute -top-4 -right-2 text-[120px] font-black leading-none text-text-primary/[0.04] select-none pointer-events-none transition-all duration-500 group-hover:text-accent/10 group-hover:scale-110 origin-top-right">
                {t(`steps.${step}.number` as `steps.diagnosis.number`)}
              </span>

              {/* Step number badge */}
              <div className="flex items-center gap-3 mb-6">
                <span className="process-step-badge text-xs font-black tracking-[3px] text-accent bg-accent/10 border border-accent/20 rounded-full px-3 py-1">
                  {t(`steps.${step}.number` as `steps.diagnosis.number`)}
                </span>
                {/* Connector line */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
                )}
              </div>

              {/* Icon */}
              <div className="process-step-icon w-10 h-10 mb-4 text-accent/70 group-hover:text-accent transition-colors duration-300">
                {STEP_ICONS[step]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-black text-text-primary mb-3 tracking-tight">
                {t(`steps.${step}.title` as `steps.diagnosis.title`)}
              </h3>
              <p className="text-sm text-text-muted leading-relaxed">
                {t(`steps.${step}.description` as `steps.diagnosis.description`)}
              </p>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-accent to-accent-hover group-hover:w-full transition-all duration-500 rounded-b-2xl" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
