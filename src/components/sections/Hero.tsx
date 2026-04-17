"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden px-6"
    >
      {/* backgrounds */}
      <div className="hero-glow-center absolute bottom-[-10%] left-1/2 w-[900px] h-[560px] pointer-events-none" />
      <div className="hero-glow-corner absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]" />
      <div className="hero-noise absolute inset-0 pointer-events-none" />

      {/* concentric rings */}
      <div className="hero-ring hero-ring-1" />
      <div className="hero-ring hero-ring-2" />
      <div className="hero-ring hero-ring-3" />
      <div className="hero-ring hero-ring-4" />
      <div className="hero-ring hero-ring-5" />

      {/* content — GSAP target: #hero-inner */}
      <motion.div
        id="hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mx-auto flex-1 justify-center pt-40 pb-32"
      >
        {/* Badge */}
        <motion.div id="hero-badge" variants={itemVariants}>
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
            {t("badge")}
          </span>
        </motion.div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-2 mt-14">
          <motion.h1
            id="hero-line1"
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight text-text-primary"
          >
            {t("headlineLine1")}
          </motion.h1>
          <motion.span
            id="hero-line2"
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight text-text-primary"
          >
            {t("headlineLine2")}
          </motion.span>
          <motion.span
            id="hero-accent"
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent"
          >
            {t("headlineAccent")}
          </motion.span>
        </div>

        {/* Subheadline */}
        <motion.p
          id="hero-sub"
          variants={itemVariants}
          className="max-w-xl text-lg md:text-xl text-text-muted leading-relaxed mt-14"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          id="hero-cta"
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <Link
            href="/#contact"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(255,92,0,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
            <span className="relative">{t("cta")}</span>
            <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href="/#services"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-text-muted border border-border transition-all duration-300 hover:-translate-y-[3px] hover:border-accent hover:text-text-primary hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            {t("ctaSecondary")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
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
