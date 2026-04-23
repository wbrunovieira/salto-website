"use client";

import { useTranslations } from "next-intl";

const ITEMS = ["years", "diagnosis", "pillars"] as const;

const ICONS = {
  years: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" />
    </svg>
  ),
  diagnosis: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" />
    </svg>
  ),
  pillars: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
};

export default function Stats() {
  const t = useTranslations("stats");

  return (
    <section id="stats" className="relative bg-[#120900] px-6 py-20 overflow-hidden">
      {/* Dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      {/* Warm glow center */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(255,92,0,0.10) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-accent/10 rounded-2xl overflow-hidden border border-accent/15">
          {ITEMS.map((key) => (
            <div
              key={key}
              data-stat={key}
              className="flex flex-col items-center text-center px-6 py-10 bg-[#120900] hover:bg-[#1c0e00] transition-colors duration-300 group"
            >
              <div className="text-accent/60 group-hover:text-accent mb-4 transition-colors duration-300">
                {ICONS[key]}
              </div>
              <span className="text-5xl sm:text-6xl font-black tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2 leading-none">
                {t(`${key}.value`)}
              </span>
              <span className="text-xs font-semibold tracking-[2px] uppercase text-text-muted group-hover:text-accent/70 transition-colors duration-300 mt-1">
                {t(`${key}.label`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
