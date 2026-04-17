"use client";

import { useRef, Fragment } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STATS = [
  { valueKey: "200+", labelKey: "statsProjects" },
  { valueKey: "4",    labelKey: "statsCountries" },
  { valueKey: "3×",   labelKey: "statsRoi" },
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

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-[68px]"
    >
      {/* ── Background: animated orange glow ── */}
      <motion.div
        className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[560px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #FF5C00 0%, transparent 68%)",
          filter: "blur(90px)",
          opacity: 0.18,
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Background: second subtle glow top-right ── */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]"
        style={{
          background: "radial-gradient(ellipse at top right, #FF5C00, transparent 60%)",
        }}
      />

      {/* ── Background: noise texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mx-auto gap-8"
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
          {/* Primary CTA */}
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover transition-all duration-300" />
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-accent to-accent-hover shadow-[0_0_40px_rgba(255,92,0,0.55)]" />
            <span className="relative">{t("cta")}</span>
            <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          {/* Secondary CTA */}
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
          {STATS.map((stat, i) => (
            <Fragment key={stat.labelKey}>
              {i > 0 && <div className="w-px h-10 bg-border/60 hidden sm:block" />}
              <StatCard value={stat.valueKey} label={t(stat.labelKey)} index={i} />
            </Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-[9px] font-bold tracking-[5px] uppercase text-text-muted/50">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-text-muted/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
