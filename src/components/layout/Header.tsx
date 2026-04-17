"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
  it: "IT",
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const navVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const navItemVariants: Variants = {
  hidden: { y: -16, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: EASE } },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.35, ease: EASE },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <motion.header
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Top gradient accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Header bar */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-surface/80 backdrop-blur-lg border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

          {/* ── Logo ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
          >
            <Link href="/" className="flex items-center gap-3 group">
              <svg
                width="28"
                height="38"
                viewBox="0 0 56 76"
                fill="none"
                className="text-accent transition-transform duration-300 group-hover:scale-110"
              >
                <rect x="19" y="36" width="18" height="38" rx="5" fill="currentColor" />
                <polygon points="0,40 28,2 56,40" fill="currentColor" />
              </svg>
              <span className="font-black text-[22px] tracking-tight text-text-primary leading-none">
                SALTO
              </span>
            </Link>
          </motion.div>

          {/* ── Desktop Nav ── */}
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <motion.div key={link.href} variants={navItemVariants}>
                <Link
                  href={link.href}
                  className="relative text-sm font-semibold text-text-muted hover:text-text-primary transition-colors duration-200 group py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 rounded-full bg-gradient-to-r from-accent to-accent-hover group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </motion.nav>

          {/* ── Right: lang switcher + CTA ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
            className="hidden md:flex items-center gap-5"
          >
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 bg-surface/60 rounded-full px-2 py-1 border border-border">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => router.replace(pathname, { locale: loc })}
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full transition-all duration-200 ${
                    locale === loc
                      ? "bg-accent text-white shadow-[0_0_12px_rgba(255,92,0,0.4)]"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </button>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/#contact"
              className="relative px-5 py-2 rounded-full text-sm font-bold text-white overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(255,92,0,0.5)]" />
              <span className="relative">{t("actions.getStarted")}</span>
            </Link>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] group"
            aria-label="Toggle menu"
          >
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"}`} />
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-6"}`} />
          </motion.button>
        </div>

        {/* ── Mobile menu ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-lg border-t border-border"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.07, ease: "easeOut" }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-base font-semibold text-text-muted hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex gap-1">
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => { router.replace(pathname, { locale: loc }); setMenuOpen(false); }}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all duration-200 ${
                          locale === loc
                            ? "border-accent text-accent"
                            : "border-border text-text-muted hover:border-text-muted"
                        }`}
                      >
                        {LOCALE_LABELS[loc]}
                      </button>
                    ))}
                  </div>
                  <Link
                    href="/#contact"
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-hover"
                  >
                    {t("actions.getStarted")}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
