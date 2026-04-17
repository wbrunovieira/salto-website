"use client";

import { useTranslations } from "next-intl";

const TECH_STACK = [
  "TypeScript", "Next.js", "Go", "Rust",
  "Three.js", "Python", "Docker", "AI / LLMs",
];

export default function About() {
  const t = useTranslations("about");

  return (
    <section id="about" className="relative bg-[#0E0E0E] px-6 pb-32">
      {/* Overlap gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none z-10" />

      <div className="max-w-6xl mx-auto pt-32">

        {/* Label + headline */}
        <div className="flex flex-col items-center text-center mb-20">
          <span id="about-label" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            {t("label")}
          </span>

          <div className="overflow-hidden mb-3">
            <h2 id="about-title1" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-text-primary">
              {t("title")}
            </h2>
          </div>
          <div className="overflow-hidden">
            <h2 id="about-title2" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent">
              {t("titleAccent")}
            </h2>
          </div>
        </div>

        {/* Main content — 2 colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* Coluna esquerda: Salto + fundador */}
          <div id="about-left" className="flex flex-col gap-8">

            {/* Filosofia */}
            <div className="p-8 rounded-2xl border border-border bg-surface/40">
              {/* Ícone de salto */}
              <div className="w-10 h-10 mb-6 text-accent">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>

              <blockquote className="text-xl md:text-2xl font-bold text-text-primary leading-snug mb-6 tracking-tight">
                "{t("philosophy")}"
              </blockquote>

              <p className="text-sm text-text-muted leading-relaxed">
                {t("story")}
              </p>
            </div>

            {/* Fundador */}
            <div id="about-founder" className="flex items-center gap-5 p-6 rounded-2xl border border-border bg-surface/40">
              {/* Avatar inicial */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-accent-hover flex items-center justify-center text-white font-black text-xl shrink-0 shadow-[0_0_20px_rgba(255,92,0,0.3)]">
                B
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[3px] uppercase text-text-muted mb-1">
                  {t("founderLabel")}
                </p>
                <p className="text-base font-black text-text-primary">{t("founderName")}</p>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">{t("founderCredential")}</p>
              </div>
            </div>
          </div>

          {/* Coluna direita: WB Digital Solutions */}
          <div id="about-right" className="flex flex-col">
            <div className="p-8 rounded-2xl border border-border bg-gradient-to-br from-surface to-[#0a0a14] h-full hover:border-accent/30 hover:shadow-[0_8px_40px_rgba(255,92,0,0.08)] transition-all duration-300">

              {/* Header WB */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-bold tracking-[3px] uppercase text-text-muted">
                  {t("partnerLabel")}
                </span>
              </div>

              <h3 className="text-2xl font-black text-text-primary mb-4 tracking-tight">
                {t("partnerName")}
              </h3>

              <p className="text-sm text-text-muted leading-relaxed mb-8">
                {t("partnerDescription")}
              </p>

              {/* Tech stack badges */}
              <div id="tech-stack" className="flex flex-wrap gap-2 mb-8">
                {TECH_STACK.map((tech) => (
                  <span
                    key={tech}
                    className="tech-badge text-[11px] font-bold px-3 py-1.5 rounded-full border border-border bg-surface/60 text-text-muted hover:border-accent/40 hover:text-text-primary transition-all duration-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link para WB */}
              <a
                href="https://www.wbdigitalsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors duration-200 group"
              >
                {t("partnerLink")}
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
