"use client";

import { useRef, useEffect } from "react";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Process from "./sections/Process";
import About from "./sections/About";
import Stats from "./sections/Stats";
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
        .fromTo("#hero-badge",      { opacity: 1, y: 0 },              { opacity: 0, y: -30,             ease: "none" }, 0)
        .fromTo("#hero-line1",      { opacity: 1, y: 0, x: 0 },        { opacity: 0, y: -110, x: -20,    ease: "none" }, 0)
        .fromTo("#hero-line2",      { opacity: 1, y: 0, x: 0 },        { opacity: 0, y: -150, x: 20,     ease: "none" }, 0.05)
        .fromTo("#hero-accent-wrap", { opacity: 1, scale: 1, y: 0 },    { opacity: 0, scale: 1.22, y: -60, ease: "none" }, 0.02)
        .fromTo("#hero-sub",        { opacity: 1, y: 0 },              { opacity: 0, y: 70,               ease: "none" }, 0)
        .fromTo("#hero-cta",        { opacity: 1, y: 0, scale: 1 },    { opacity: 0, y: 45, scale: 0.92,  ease: "none" }, 0)
        .fromTo("#hero-rings-wrap", { opacity: 1 },                    { opacity: 0.5,                    ease: "none" }, 0);

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

      // ── Stats ─────────────────────────────────────────────────────
      gsap.fromTo("[data-stat]", { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: "#stats", start: "top 75%", once: true },
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


      // ── Orb: posição exata do ponto final via Range (text-center safe) ──
      // x: um pouco à esquerda do right edge (centro do char)
      // y: perto do bottom do char box (ponto tipograficamente fica na baseline)
      const textEndPos = (el: HTMLElement) => {
        const range = document.createRange();
        range.selectNodeContents(el);
        const rects = range.getClientRects();
        if (!rects.length) return null;
        const last = rects[rects.length - 1];
        return { x: last.right + 8, y: last.bottom - 16 };
      };

      // Quando orbLanded = true, o Lenis sync segue services-title2 a cada frame.
      // textEndPos chamado UMA vez no pouso; per-frame usa só getBoundingClientRect (leve).
      let orbLanded = false;
      let orbTargetX = 0;
      let orbOffsetInEl = 0;
      const servicesTitleEl = document.getElementById("services-title2");

      const syncOrb = () => {
        if (!orbLanded || !servicesTitleEl) return;
        const r = servicesTitleEl.getBoundingClientRect();
        gsap.set("#hero-orb", { x: orbTargetX, y: r.top + orbOffsetInEl });
      };
      lenisInstance.on("scroll", syncOrb);

      const orbIdleLoop = () =>
        gsap.to("#hero-orb", { scale: 1.12, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });

      const orbFadeOut = (dur = 0.3) => {
        orbLanded = false;
        gsap.killTweensOf("#hero-orb");
        gsap.to("#hero-orb", { opacity: 0, scale: 0, duration: dur, ease: "power2.in" });
      };

      // Calcula coords de pouso (Range, uma vez) e cacheia offset para sync por frame
      const prepOrbDock = () => {
        if (!servicesTitleEl) return null;
        const end = textEndPos(servicesTitleEl);
        if (!end) return null;
        const r = servicesTitleEl.getBoundingClientRect();
        orbTargetX = end.x;
        orbOffsetInEl = end.y - r.top;
        return end;
      };

      // ── Hero rings + orb: Services ───────────────────────────────────
      ScrollTrigger.create({
        trigger: "#services",
        start: "top 80%",
        end: "bottom top",

        onEnter() {
          gsap.to("#hero-rings-inner", { y: 300, scale: 1.15, duration: 1.0, ease: "power4.out" });

          const dotEl = document.getElementById("hero-dot");
          if (!dotEl) return;
          const end = prepOrbDock();
          if (!end) return;

          const dot = dotEl.getBoundingClientRect();
          gsap.set("#hero-dot", { opacity: 0 });
          orbLanded = false;
          gsap.killTweensOf("#hero-orb");
          gsap.set("#hero-orb", {
            xPercent: -50, yPercent: -50,
            x: dot.left + dot.width / 2, y: dot.top + dot.height / 2,
            opacity: 0, scale: 0.4,
          });
          gsap.to("#hero-orb", {
            opacity: 1, scale: 1, duration: 0.2, ease: "power2.out",
            onComplete() {
              gsap.to("#hero-orb", {
                x: end.x, y: end.y, duration: 0.9, ease: "power4.inOut",
                onComplete() {
                  orbLanded = true;
                  gsap.to("#hero-orb", {
                    scale: 1.7, duration: 0.12, ease: "power2.out", yoyo: true, repeat: 1,
                    onComplete: orbIdleLoop,
                  });
                },
              });
            },
          });
        },

        onLeaveBack() {
          gsap.to("#hero-rings-inner", { y: 0, scale: 1, duration: 0.8, ease: "power3.inOut" });

          orbLanded = false;
          gsap.killTweensOf("#hero-orb");

          const dotEl = document.getElementById("hero-dot");
          if (!dotEl) { orbFadeOut(0.4); return; }

          // Esconde o dot estático — orb vai viajar de volta até ele
          gsap.set("#hero-dot", { opacity: 0, scale: 0 });
          const dot = dotEl.getBoundingClientRect();

          gsap.to("#hero-orb", {
            x: dot.left + dot.width / 2,
            y: dot.top + dot.height / 2,
            duration: 0.85,
            ease: "power4.inOut",
            onComplete() {
              // Orb chegou: swap instantâneo orb → dot com pop-in
              gsap.set("#hero-orb", { opacity: 0, scale: 0 });
              gsap.to("#hero-dot", { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" });
            },
          });
        },

        onLeave: () => orbFadeOut(0.4),

        onEnterBack() {
          const end = prepOrbDock();
          if (!end) return;
          orbLanded = false;
          gsap.killTweensOf("#hero-orb");
          gsap.set("#hero-orb", { xPercent: -50, yPercent: -50, x: end.x, y: end.y, opacity: 0, scale: 0.6 });
          gsap.to("#hero-orb", {
            opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)",
            onComplete() { orbLanded = true; orbIdleLoop(); },
          });
        },
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
    <>
      {/* Orb que viaja do ponto final do headline até Services */}
      <div
        id="hero-orb"
        style={{
          position: "fixed", left: 0, top: 0,
          width: 18, height: 18, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #ff9a44, #ff5c00)",
          boxShadow: "0 0 20px 8px rgba(255,92,0,0.65), 0 0 50px 18px rgba(255,92,0,0.2)",
          pointerEvents: "none", zIndex: 51, opacity: 0,
        }}
      />

      {/* Camada fixa de anéis do hero — dim to 50% on scroll, move on services enter */}
      <div
        id="hero-rings-wrap"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 48 }}
      >
        <div id="hero-rings-inner" style={{ position: "absolute", inset: 0 }}>
          <div className="hero-ring hero-ring-1" />
          <div className="hero-ring hero-ring-2" />
          <div className="hero-ring hero-ring-3" />
          <div className="hero-ring hero-ring-4" />
          <div className="hero-ring hero-ring-5" />
        </div>
      </div>

      <div ref={containerRef}>
      <div id="hero-wrapper" className="relative h-[150vh]">
        <div
          className="sticky top-0 h-screen overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0px, black 72px)",
            maskImage: "linear-gradient(to bottom, transparent 0px, black 72px)",
          }}
        >
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
        <Stats />
        <About />
      </div>

      <div className="-mt-[8vh] relative z-40">
        <Contact />
      </div>
    </div>
    </>
  );
}
