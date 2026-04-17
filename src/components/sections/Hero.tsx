"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { value: "200+", labelKey: "statsProjects" },
  { value: "4",    labelKey: "statsCountries" },
  { value: "3×",   labelKey: "statsRoi" },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

function StatCard({ value, label, index }: { value: string; label: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.8 + index * 0.1, ease: EASE }}
      className="flex flex-col items-center gap-1.5"
    >
      <span className="text-3xl md:text-4xl font-black text-text-primary tabular-nums">
        {value}
      </span>
      <span className="text-[11px] font-semibold text-text-muted uppercase tracking-[3px] text-center max-w-[90px]">
        {label}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const t = useTranslations("hero");

  const statsNodes = STATS.flatMap((stat, i) => [
    i > 0 ? <div key={`sep-${i}`} className="w-px h-10 bg-border/60 hidden sm:block" /> : null,
    <StatCard key={stat.labelKey} value={stat.value} label={t(stat.labelKey)} index={i} />,
  ]).filter(Boolean);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden px-6"
    >
      {/* backgrounds */}
      <div className="hero-glow-center absolute bottom-[-10%] left-1/2 w-[900px] h-[560px] pointer-events-none" />
      <div className="hero-glow-corner absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]" />
      <div className="hero-noise absolute inset-0 pointer-events-none" />

      {/* main content — flex-1 centers vertically inside min-h-screen */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mx-auto gap-8 flex-1 justify-center pt-[68px] pb-24"
      >
        {/* Badge */}
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-1 md:gap-2">
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[0.92] tracking-tight text-text-primary"
          >
            {t("headlineLine1")}
          </motion.h1>
          <motion.span
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[0.92] tracking-tight text-text-primary"
          >
            {t("headlineLine2")}
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[0.92] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent"
          >
            {t("headlineAccent")}
          </motion.span>
        </div>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-base md:text-lg text-text-muted leading-relaxed"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_40px_rgba(255,92,0,0.55)]" />
            <span className="relative">{t("cta")}</span>
            <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-text-muted border border-border hover:border-text-muted hover:text-text-primary transition-all duration-300 group"
          >
            {t("ctaSecondary")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-8 sm:gap-14 pt-6 border-t border-border/40 w-full justify-center"
        >
          {statsNodes}
        </motion.div>
      </motion.div>

      {/* Scroll indicator — fora do flex-1, fica naturalmente no final */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-8 pointer-events-none"
      >
        <span className="text-[9px] font-bold tracking-[5px] uppercase text-text-muted/50">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
