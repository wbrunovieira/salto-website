"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { LOCALE_STORAGE_KEY } from "@/components/LocaleDetector";

const LOCALE_LABELS: Record<string, string> = { pt: "PT", en: "EN", es: "ES", it: "IT" };

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "services", "process", "about", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  const navLinks = [
    { href: "/",          label: t("nav.home"),     section: "hero" },
    { href: "/#services", label: t("nav.services"), section: "services" },
    { href: "/#process",  label: t("nav.process"),  section: "process" },
    { href: "/#about",    label: t("nav.about"),    section: "about" },
    { href: "/#contact",  label: t("nav.contact"),  section: "contact" },
  ];

  return (
    <header className="header-animate fixed top-0 left-0 right-0 z-50">
      {/* Top gradient accent line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Header bar */}
      <div className={`transition-all duration-500 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-lg border-b border-border shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <div className="logo-animate">
            <Link href="/" className="flex items-center gap-3 group">
              <svg width="28" height="38" viewBox="0 0 56 76" fill="none"
                className="text-accent transition-transform duration-300 group-hover:scale-110">
                <rect x="19" y="36" width="18" height="38" rx="5" fill="currentColor" />
                <polygon points="0,40 28,2 56,40" fill="currentColor" />
              </svg>
              <span className="font-black text-[22px] tracking-tight text-text-primary leading-none">SALTO</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.section;
              return (
                <div key={link.href} className={`nav-item-animate-${i + 1}`}>
                  <Link
                    href={link.href}
                    className={`relative text-sm font-semibold transition-colors duration-200 group py-1 ${
                      isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right: lang switcher + CTA */}
          <div className="right-animate hidden md:flex items-center gap-5">
            <div className="flex items-center gap-0.5 bg-surface/60 rounded-full px-2 py-1 border border-border">
              {routing.locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => { localStorage.setItem(LOCALE_STORAGE_KEY, loc); router.replace(pathname, { locale: loc }); }}
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

            <Link
              href="/#contact"
              className="relative px-5 py-2 rounded-full text-sm font-bold text-white overflow-hidden group transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,92,0,0.35)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
              <span className="relative">{t("actions.getStarted")}</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
            aria-label="Toggle menu"
          >
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-6 translate-y-2 rotate-45" : "w-6"}`} />
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-4"}`} />
            <span className={`block h-[2px] bg-text-primary rounded-full transition-all duration-300 ${menuOpen ? "w-6 -translate-y-2 -rotate-45" : "w-6"}`} />
          </button>
        </div>

        {/* Mobile menu — CSS grid trick para animar height desconhecida */}
        <div className={`md:hidden grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}>
          <div className="overflow-hidden bg-surface/95 backdrop-blur-lg border-t border-border">
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.section;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-base font-semibold transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                  >
                    {link.label}
                  </Link>
                );
              })}

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
          </div>
        </div>
      </div>
    </header>
  );
}
