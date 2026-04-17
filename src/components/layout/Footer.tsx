"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const NAV_LINKS = [
  { href: "/",          key: "home" },
  { href: "/#services", key: "services" },
  { href: "/#process",  key: "process" },
  { href: "/#about",    key: "about" },
  { href: "/#contact",  key: "contact" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511999999999"}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
  },
] as const;

export default function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#080808] border-t border-border px-6">
      {/* Top accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="max-w-6xl mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <svg width="24" height="32" viewBox="0 0 56 76" fill="none" className="text-accent transition-transform duration-300 group-hover:scale-110">
                <rect x="19" y="36" width="18" height="38" rx="5" fill="currentColor" />
                <polygon points="0,40 28,2 56,40" fill="currentColor" />
              </svg>
              <span className="font-black text-xl tracking-tight text-text-primary">SALTO</span>
            </Link>

            <p className="text-sm text-text-muted leading-relaxed max-w-[260px]">
              {t("description")}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent/40 transition-all duration-200"
                >
                  <span className="w-4 h-4">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Nav */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-text-muted">
              {t("nav")}
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-text-muted hover:text-text-primary transition-colors duration-200 w-fit group flex items-center gap-2"
                >
                  <span className="w-0 h-px bg-accent group-hover:w-3 transition-all duration-200" />
                  {t(`links.${link.key}` as `links.home`)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — CTA */}
          <div className="flex flex-col gap-4">
            <p className="text-[11px] font-bold tracking-[3px] uppercase text-text-muted">
              {t("contact")}
            </p>
            <Link
              href="/#contact"
              className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold text-white overflow-hidden w-fit transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,92,0,0.35)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
              <span className="relative">{t("tagline")}</span>
              <svg className="relative w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <div className="mt-4 p-4 rounded-xl border border-border bg-surface/30">
              <p className="text-[11px] font-bold tracking-[3px] uppercase text-text-muted mb-2">{t("partner")}</p>
              <a
                href="https://www.wbdigitalsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-text-primary hover:text-accent transition-colors duration-200 flex items-center gap-1.5 group"
              >
                {t("partnerName")}
                <svg className="w-3 h-3 text-text-muted group-hover:text-accent transition-colors" viewBox="0 0 16 16" fill="none">
                  <path d="M3 13L13 3M13 3H6M13 3v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            © {year} Salto. {t("rights")}
          </p>
          <p className="text-xs text-text-muted">
            {t("partner")}{" "}
            <a
              href="https://www.wbdigitalsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted/70 hover:text-accent transition-colors duration-200"
            >
              {t("partnerName")}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
