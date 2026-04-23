"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TYPE_SPEED = 0.055; // seconds per character

export default function Hero() {
  const t = useTranslations("hero");
  const [animKey, setAnimKey] = useState(0);
  const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);

  const line1  = t("headlineLine1");
  const line2  = t("headlineLine2");
  const accent = t("headlineAccent");

  useEffect(() => {
    const reset = () => setAnimKey((k) => k + 1);
    window.addEventListener("hero-reset", reset);
    return () => window.removeEventListener("hero-reset", reset);
  }, []);

  // Hide before first client paint — LCP fires on SSR render
  useLayoutEffect(() => {
    gsap.set(["#hero-line1", "#hero-line2", "#hero-accent"], { opacity: 0 });
    gsap.set(["#hero-badge", "#hero-sub", "#hero-cta", "#hero-scroll"], { opacity: 0, y: 32 });
  }, [animKey]);

  useEffect(() => {
    ctxRef.current?.revert();
    const magneticCleanups: (() => void)[] = [];

    ctxRef.current = gsap.context(() => {
      const line1El  = document.getElementById("hero-line1");
      const line2El  = document.getElementById("hero-line2");
      const accentEl = document.getElementById("hero-accent");

      // Read original text from data-text (survives partial-typed reruns)
      const t1 = line1El?.getAttribute("data-text")  || line1;
      const t2 = line2El?.getAttribute("data-text")  || line2;
      const t3 = accentEl?.getAttribute("data-text") || accent;

      const d1 = t1.length * TYPE_SPEED;
      const d2 = t2.length * TYPE_SPEED;
      const d3 = t3.length * TYPE_SPEED;

      const start1 = 0.2;
      const start2 = start1 + d1;
      const start3 = start2 + d2;
      const startUI = start3 + d3;

      const makeTypeTween = (el: HTMLElement, text: string, delay: number) => {
        el.textContent = "";
        gsap.set(el, { opacity: 1 });
        const obj = { n: 0 };
        gsap.to(obj, {
          n: text.length,
          duration: text.length * TYPE_SPEED,
          delay,
          ease: "none",
          onUpdate() { el.textContent = text.slice(0, Math.round(obj.n)); },
          onComplete() { el.textContent = text; },
        });
      };

      if (line1El)  makeTypeTween(line1El,  t1, start1);
      if (line2El)  makeTypeTween(line2El,  t2, start2);
      if (accentEl) makeTypeTween(accentEl, t3, start3);

      gsap.to("#hero-badge",  { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: startUI });
      gsap.to("#hero-sub",    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: startUI + 0.15 });
      gsap.to("#hero-cta",    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: startUI + 0.3 });
      gsap.to("#hero-scroll", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: startUI + 0.8 });
    });

    // Magnetic CTA buttons — transition-[box-shadow] only, so CSS doesn't fight GSAP transform
    document.querySelectorAll<HTMLElement>("#hero-cta > *").forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width  / 2) * 0.45;
        const y = (e.clientY - rect.top  - rect.height / 2) * 0.45;
        gsap.to(el, { x, y, duration: 0.25, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      magneticCleanups.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => {
      ctxRef.current?.revert();
      magneticCleanups.forEach((fn) => fn());
    };
  }, [animKey, line1, line2, accent]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden px-6"
    >
      <div className="hero-glow-center absolute bottom-[-10%] left-1/2 w-[900px] h-[560px] pointer-events-none" />
      <div className="hero-glow-corner absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-[0.07]" />
      <div className="hero-noise absolute inset-0 pointer-events-none" />

      <div key={`rings-${animKey}`} className="contents">
        <div className="hero-ring hero-ring-1" />
        <div className="hero-ring hero-ring-2" />
        <div className="hero-ring hero-ring-3" />
        <div className="hero-ring hero-ring-4" />
        <div className="hero-ring hero-ring-5" />
      </div>

      <div
        id="hero-inner"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl w-full mx-auto flex-1 justify-center pt-40 pb-32"
      >
        <div id="hero-badge">
          <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
            {t("badge")}
          </span>
        </div>

        <div className="flex flex-col items-center gap-2 mt-14">
          {/* data-text preserves the full string for typewriter restarts */}
          <h1
            id="hero-line1"
            data-text={line1}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight text-text-primary"
          >
            {line1}
          </h1>
          <span
            id="hero-line2"
            data-text={line2}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight text-text-primary"
          >
            {line2}
          </span>
          <span
            id="hero-accent"
            data-text={accent}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-tight md:leading-[0.92] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent"
          >
            {accent}
          </span>
        </div>

        <p
          id="hero-sub"
          className="max-w-xl text-lg md:text-xl text-text-muted leading-relaxed mt-14"
        >
          {t("subheadline")}
        </p>

        <div
          id="hero-cta"
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          {/* transition-[box-shadow] only — avoids CSS fighting GSAP transform on magnetic effect */}
          <Link
            href={{ pathname: "/", hash: "#contact" }}
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-bold text-white overflow-hidden transition-[box-shadow] duration-300 hover:shadow-[0_12px_32px_rgba(255,92,0,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
            <span className="relative">{t("cta")}</span>
            <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href={{ pathname: "/", hash: "#services" }}
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-text-muted border border-border transition-[box-shadow,border-color,color] duration-300 hover:border-accent hover:text-text-primary hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          >
            {t("ctaSecondary")}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" viewBox="0 0 16 16" fill="none">
              <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div
        id="hero-scroll"
        className="relative z-10 flex flex-col items-center gap-2 pb-8 pointer-events-none"
      >
        <span className="text-[9px] font-bold tracking-[5px] uppercase text-text-muted/50">scroll</span>
        <div className="hero-scroll-line w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent" />
      </div>
    </section>
  );
}
