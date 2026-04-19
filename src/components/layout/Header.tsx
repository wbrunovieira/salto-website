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
  const [activeSection, setActiveSection] = useState(() => {
    if (typeof window === "undefined") return "hero";
    return window.location.hash.slice(1) || "hero";
  });

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

  useEffect(() => {
    const animate = async () => {
      const { default: gsap } = await import("gsap");
      const line = document.getElementById("logo-line") as SVGPathElement | null;
      const ball = document.getElementById("logo-ball");
      if (!line || !ball) return;
      const length = line.getTotalLength();
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
      gsap.set(ball, { scale: 0, transformOrigin: "50% 50%" });
      gsap.timeline({ delay: 0.5 })
        .to(line, { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut" })
        .to(ball, { scale: 1, duration: 0.45, ease: "back.out(1.7)" }, "-=0.15")
        .to(ball, { scale: 1.35, duration: 0.7, ease: "sine.inOut", repeat: -1, yoyo: true }, "+=0.1");
    };
    animate();
  }, []);

  const navLinks = [
    { label: t("nav.home"),     section: "hero" },
    { label: t("nav.services"), section: "services" },
    { label: t("nav.process"),  section: "process" },
    { label: t("nav.about"),    section: "about" },
    { label: t("nav.contact"),  section: "contact" },
  ];

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    setActiveSection(section);
    if (section === "hero") {
      window.scrollTo({ top: 0, behavior: "instant" });
      window.history.replaceState(null, "", window.location.pathname.split("#")[0]);
      window.dispatchEvent(new CustomEvent("hero-reset"));
    } else {
      const el = document.getElementById(section);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", window.location.pathname.split("#")[0] + "#" + section);
    }
  };

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
            <Link href="/" className="flex items-center group">
              <svg
                viewBox="0 0 482 149"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
                aria-label="Salto"
              >
                <path
                  id="logo-line"
                  d="M392 96C466 121.6 476.5 65.3333 472.5 34"
                  stroke="#FF5C00"
                  strokeWidth="3"
                />
                <path
                  id="logo-ball"
                  d="M482 39C482 44.5228 477.747 49 472.5 49C467.253 49 463 44.5228 463 39C463 33.4772 467.253 29 472.5 29C477.747 29 482 33.4772 482 39Z"
                  fill="#FF5C00"
                />
                <path
                  d="M38.0973 118.094C31.0943 118.06 24.3338 117.231 17.816 115.608C11.2982 113.984 5.93668 111.889 1.73138 109.321L10.9041 88.8341C14.8718 91.1614 19.2793 93.0532 24.1267 94.5094C29.0541 95.8864 33.8256 96.5862 38.4413 96.6088C41.147 96.6221 43.2567 96.4732 44.7703 96.1623C46.3638 95.7722 47.5203 95.2606 48.2396 94.6274C48.9593 93.9147 49.3215 93.0809 49.3262 92.1259C49.3336 90.6139 48.5039 89.4161 46.8369 88.5325C45.17 87.649 42.9453 86.9218 40.1627 86.3511C37.4601 85.7012 34.4789 85.05 31.2193 84.3974C27.96 83.6652 24.6619 82.7338 21.3249 81.6033C18.0676 80.4733 15.0508 78.9862 12.2744 77.1422C9.57762 75.2986 7.40085 72.9005 5.74407 69.9478C4.08769 66.9156 3.2704 63.1712 3.29222 58.7147C3.31754 53.542 4.77297 48.8538 7.65851 44.65C10.624 40.3671 14.9779 36.9664 20.7202 34.4479C26.542 31.9297 33.7503 30.6917 42.3449 30.7338C47.9952 30.7614 53.5629 31.3856 59.0481 32.6061C64.5333 33.8267 69.4583 35.6812 73.8231 38.1696L65.2479 58.5405C61.1199 56.4512 57.1086 54.8797 53.2143 53.8261C49.3995 52.7728 45.6617 52.2372 42.001 52.2193C39.2953 52.2061 37.1454 52.4343 35.5515 52.904C33.9576 53.3737 32.8005 54.0047 32.0804 54.797C31.4399 55.5897 31.1173 56.4635 31.1126 57.4184C31.1056 58.8509 31.9355 60.0089 33.6024 60.8925C35.2697 61.6964 37.4549 62.3836 40.1579 62.9539C42.9405 63.5246 45.9616 64.1363 49.2213 64.7889C52.5605 65.4419 55.8588 66.3334 59.1162 67.4635C62.3735 68.5936 65.3506 70.0805 68.0474 71.9241C70.8237 73.768 73.0403 76.1664 74.697 79.119C76.3538 82.0717 77.1715 85.7365 77.1501 90.1134C77.1251 95.2065 75.6299 99.8946 72.6644 104.178C69.7789 108.381 65.4648 111.782 59.7221 114.38C53.9799 116.899 46.7716 118.137 38.0973 118.094ZM76.3323 116.372L113.269 32.9909L140.963 33.1265L177.081 116.865L147.955 116.722L121.321 46.4002L132.303 46.4539L104.981 116.512L76.3323 116.372ZM98.1291 101.915L105.391 81.6567L143.828 81.8449L150.891 102.173L98.1291 101.915ZM181.577 116.887L181.986 33.3273L210.158 33.4652L209.856 95.1798L247.577 95.3645L247.47 117.209L181.577 116.887ZM264.419 117.292L264.721 55.5777L240.251 55.4579L240.357 33.6131L317.471 33.9905L317.364 55.8354L292.893 55.7156L292.591 117.43L264.419 117.292ZM367.013 119.704C360.248 119.671 353.967 118.566 348.168 116.389C342.449 114.212 337.49 111.164 333.291 107.244C329.093 103.244 325.813 98.5726 323.452 93.2291C321.17 87.8859 320.045 82.0709 320.075 75.784C320.106 69.4176 321.289 63.6139 323.622 58.3728C326.036 53.0526 329.361 48.4531 333.598 44.5743C337.835 40.616 342.824 37.5765 348.564 35.4559C354.384 33.3356 360.676 32.2921 367.441 32.3252C374.284 32.3587 380.566 33.4638 386.285 35.6405C392.005 37.8172 396.963 40.9054 401.162 44.9051C405.36 48.8252 408.601 53.4568 410.882 58.8C413.244 64.064 414.409 69.8792 414.378 76.2456C414.347 82.5325 413.125 88.336 410.712 93.6562C408.378 98.9768 405.092 103.616 400.855 107.575C396.618 111.453 391.629 114.453 385.889 116.574C380.149 118.694 373.857 119.738 367.013 119.704ZM367.124 96.9047C369.751 96.9175 372.18 96.4519 374.413 95.5079C376.726 94.5642 378.722 93.2211 380.401 91.4785C382.161 89.6567 383.525 87.4749 384.492 84.933C385.46 82.3115 385.952 79.3694 385.968 76.1066C385.984 72.8438 385.521 69.9367 384.578 67.3855C383.636 64.7547 382.294 62.5596 380.552 60.8002C378.889 58.9617 376.907 57.5593 374.604 56.5931C372.38 55.6272 369.955 55.1378 367.329 55.125C364.703 55.1121 362.233 55.5775 359.921 56.5212C357.688 57.4652 355.692 58.8482 353.932 60.6699C352.252 62.4125 350.928 64.5946 349.961 67.216C348.993 69.7579 348.501 72.6603 348.485 75.9231C348.47 79.1859 348.933 82.1327 349.875 84.7635C350.817 87.3148 352.12 89.5097 353.782 91.3482C355.524 93.1075 357.507 94.4701 359.73 95.436C362.034 96.4023 364.498 96.8918 367.124 96.9047Z"
                  fill="#F5F5F5"
                />
              </svg>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.section;
              return (
                <div key={link.section} className={`nav-item-animate-${i + 1}`}>
                  <a
                    href={link.section === "hero" ? "#" : `#${link.section}`}
                    onClick={(e) => handleNavClick(e, link.section)}
                    className={`relative text-sm font-semibold transition-colors duration-200 group py-1 ${
                      isActive ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                    }`}
                  >
                    {link.label}
                    <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`} />
                  </a>
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

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="relative px-5 py-2 rounded-full text-sm font-bold text-white overflow-hidden group transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(255,92,0,0.35)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
              <span className="relative">{t("actions.getStarted")}</span>
            </a>
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
                  <a
                    key={link.section}
                    href={link.section === "hero" ? "#" : `#${link.section}`}
                    onClick={(e) => { handleNavClick(e, link.section); setMenuOpen(false); }}
                    className={`text-base font-semibold transition-colors duration-200 ${
                      isActive ? "text-accent" : "text-text-muted hover:text-text-primary"
                    }`}
                    style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                  >
                    {link.label}
                  </a>
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
                <a
                  href="#contact"
                  onClick={(e) => { handleNavClick(e, "contact"); setMenuOpen(false); }}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-accent to-accent-hover"
                >
                  {t("actions.getStarted")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
