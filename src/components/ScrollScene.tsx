"use client";

import { useRef, useEffect } from "react";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let killed = false;
    let lenisInstance: InstanceType<(typeof import("lenis"))["default"]> | null = null;
    let lenisRaf: ((time: number) => void) | null = null;

    const initGSAP = async () => {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (killed) return;

      gsap.registerPlugin(ScrollTrigger);

      // Smooth scroll — driven by GSAP ticker for perfect sync with ScrollTrigger
      lenisInstance = new Lenis({ autoRaf: false });
      lenisRaf = (time: number) => lenisInstance!.raf(time * 1000);
      lenisInstance.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);

      requestAnimationFrame(() => ScrollTrigger.refresh());

      // ── Hero: letras explodem para fora ──────────────────────────
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      heroTl
        .fromTo("#hero-badge",  { opacity: 1, y: 0 },              { opacity: 0, y: -30,             ease: "none" }, 0)
        .fromTo("#hero-line1",  { opacity: 1, y: 0, x: 0 },        { opacity: 0, y: -110, x: -20,    ease: "none" }, 0)
        .fromTo("#hero-line2",  { opacity: 1, y: 0, x: 0 },        { opacity: 0, y: -150, x: 20,     ease: "none" }, 0.05)
        .fromTo("#hero-accent", { opacity: 1, scale: 1, y: 0 },    { opacity: 0, scale: 1.22, y: -60, ease: "none" }, 0.02)
        .fromTo("#hero-sub",    { opacity: 1, y: 0 },              { opacity: 0, y: 70,               ease: "none" }, 0)
        .fromTo("#hero-cta",    { opacity: 1, y: 0, scale: 1 },    { opacity: 0, y: 45, scale: 0.92,  ease: "none" }, 0);

      // ── Services ─────────────────────────────────────────────────
      gsap.fromTo("#services", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#services", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      gsap.timeline({ scrollTrigger: { trigger: "#services", start: "top 60%", once: true } })
        .from("#services-label",    { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#services-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#services-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#services-subtitle", { opacity: 0, y: 24, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .from("#services-contrast", { opacity: 0, y: 12, duration: 0.4, ease: "power2.out" }, "-=0.2");

      const cardTrigger = { trigger: "#services-grid", start: "top 82%", once: true };
      gsap.fromTo("[data-col='0']", { opacity: 0, x: -70, rotation: -4 },
        { opacity: 1, x: 0, rotation: 0, stagger: 0.18, duration: 0.8, ease: "power3.out", scrollTrigger: cardTrigger });
      gsap.fromTo("[data-col='1']", { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, delay: 0.12, ease: "power3.out", scrollTrigger: cardTrigger });
      gsap.fromTo("[data-col='2']", { opacity: 0, x: 70, rotation: 4 },
        { opacity: 1, x: 0, rotation: 0, stagger: 0.18, duration: 0.8, delay: 0.24, ease: "power3.out", scrollTrigger: cardTrigger });
      gsap.fromTo(".service-icon", { scale: 0, rotation: -20, opacity: 0 }, {
        scale: 1, rotation: 0, opacity: 1,
        stagger: { each: 0.07 }, duration: 0.5, delay: 0.35, ease: "back.out(1.5)",
        scrollTrigger: cardTrigger,
      });

      // ── Process ──────────────────────────────────────────────────
      gsap.fromTo("#process", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#process", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      gsap.timeline({ scrollTrigger: { trigger: "#process", start: "top 60%", once: true } })
        .from("#process-label",    { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#process-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#process-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#process-subtitle", { opacity: 0, y: 24, duration: 0.5, ease: "power2.out" }, "-=0.3");

      gsap.fromTo("[data-step='0'], [data-step='2']", { opacity: 0, x: -60, y: 30 }, {
        opacity: 1, x: 0, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
      });
      gsap.fromTo("[data-step='1'], [data-step='3']", { opacity: 0, x: 60, y: 30 }, {
        opacity: 1, x: 0, y: 0, stagger: 0.2, duration: 0.8, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
      });
      gsap.fromTo(".process-step-badge", { scale: 0, opacity: 0 }, {
        scale: 1, opacity: 1, stagger: 0.12, duration: 0.45, delay: 0.3, ease: "back.out(1.7)",
        scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
      });
      gsap.fromTo(".process-step-icon", { scale: 0, rotation: -15, opacity: 0 }, {
        scale: 1, rotation: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.45, ease: "back.out(1.5)",
        scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
      });

      // ── About ─────────────────────────────────────────────────────
      gsap.fromTo("#about", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#about", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });
      gsap.timeline({ scrollTrigger: { trigger: "#about", start: "top 60%", once: true } })
        .from("#about-label",  { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#about-title1", { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#about-title2", { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5");
      gsap.fromTo("#about-left",  { opacity: 0, x: -60 }, {
        opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: "#about-left", start: "top 78%", once: true },
      });
      gsap.fromTo("#about-right", { opacity: 0, x: 60 }, {
        opacity: 1, x: 0, duration: 0.8, delay: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: "#about-right", start: "top 78%", once: true },
      });
      gsap.fromTo("#about-founder", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: "power2.out",
        scrollTrigger: { trigger: "#about-founder", start: "top 85%", once: true },
      });
      gsap.fromTo(".tech-badge", { opacity: 0, scale: 0.8 }, {
        opacity: 1, scale: 1, stagger: 0.06, duration: 0.4, delay: 0.3, ease: "back.out(1.4)",
        scrollTrigger: { trigger: "#tech-stack", start: "top 85%", once: true },
      });

      // ── Contact ───────────────────────────────────────────────────
      gsap.fromTo("#contact", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#contact", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });
      gsap.timeline({ scrollTrigger: { trigger: "#contact", start: "top 62%", once: true } })
        .from("#contact-label",    { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#contact-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#contact-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#contact-subtitle", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.3");
      gsap.fromTo("#contact-left",  { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: "#contact-left", start: "top 80%", once: true },
      });
      gsap.fromTo("#contact-right", { opacity: 0, x: 50 }, {
        opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: "#contact-right", start: "top 80%", once: true },
      });
    };

    initGSAP().then(async () => {
      const hash = window.location.hash.slice(1);
      if (!hash || hash === "hero") return;
      const el = document.getElementById(hash);
      if (!el) return;
      // Scroll instantâneo para a seção — evita conflito com scrub do hero
      el.scrollIntoView({ behavior: "instant" });
      // Atualiza ScrollTrigger com nova posição de scroll
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      ScrollTrigger.refresh();
    });

    return () => {
      killed = true;
      if (lenisInstance) { lenisInstance.destroy(); lenisInstance = null; }
      if (lenisRaf) {
        import("gsap").then(({ default: gsap }) => gsap.ticker.remove(lenisRaf!)).catch(() => {});
      }
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      }).catch(() => {});
    };
  }, []);

  return (
    <div ref={containerRef}>
      <div id="hero-wrapper" className="relative h-[150vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </div>

      <div className="-mt-[45vh] relative z-10">
        <Services />
      </div>

      <div className="-mt-[8vh] relative z-20">
        <Process />
      </div>

      <div className="-mt-[8vh] relative z-30">
        <About />
      </div>

      <div className="-mt-[8vh] relative z-40">
        <Contact />
      </div>
    </div>
  );
}
