"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      // ═══════════════════════════════════════════════════════
      // HERO → letras explodem para fora
      // ═══════════════════════════════════════════════════════
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-wrapper",
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      heroTl
        .to("#hero-badge",  { opacity: 0, y: -30,                ease: "none" }, 0)
        .to("#hero-line1",  { opacity: 0, y: -110, x: -20,       ease: "none" }, 0)
        .to("#hero-line2",  { opacity: 0, y: -150, x: 20,        ease: "none" }, 0.05)
        .to("#hero-accent", { opacity: 0, scale: 1.22, y: -60,   ease: "none" }, 0.02)
        .to("#hero-sub",    { opacity: 0, y: 70,                  ease: "none" }, 0)
        .to("#hero-cta",    { opacity: 0, y: 45, scale: 0.92,     ease: "none" }, 0);

      // ═══════════════════════════════════════════════════════
      // SERVICES → slide up + montagem dinâmica
      // ═══════════════════════════════════════════════════════
      gsap.fromTo("#services", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#services", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      gsap.timeline({
        scrollTrigger: { trigger: "#services", start: "top 60%", once: true },
      })
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

      // ═══════════════════════════════════════════════════════
      // PROCESS → slide up sobre Services + montagem dos steps
      // ═══════════════════════════════════════════════════════
      gsap.fromTo("#process", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#process", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      // Header assembly
      gsap.timeline({
        scrollTrigger: { trigger: "#process", start: "top 60%", once: true },
      })
        .from("#process-label",    { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#process-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#process-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#process-subtitle", { opacity: 0, y: 24, duration: 0.5, ease: "power2.out" }, "-=0.3");

      // Steps entram em sequência — par da esquerda, ímpar da direita
      gsap.fromTo("[data-step='0'], [data-step='2']",
        { opacity: 0, x: -60, y: 30 },
        {
          opacity: 1, x: 0, y: 0,
          stagger: 0.2, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
        }
      );
      gsap.fromTo("[data-step='1'], [data-step='3']",
        { opacity: 0, x: 60, y: 30 },
        {
          opacity: 1, x: 0, y: 0,
          stagger: 0.2, duration: 0.8, delay: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
        }
      );

      // Badges dos números estouram
      gsap.fromTo(".process-step-badge",
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          stagger: 0.12, duration: 0.45, delay: 0.3, ease: "back.out(1.7)",
          scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
        }
      );

      // Ícones dos steps
      gsap.fromTo(".process-step-icon",
        { scale: 0, rotation: -15, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          stagger: 0.1, duration: 0.5, delay: 0.45, ease: "back.out(1.5)",
          scrollTrigger: { trigger: "#process-grid", start: "top 80%", once: true },
        }
      );

      // ═══════════════════════════════════════════════════════
      // ABOUT → slide up sobre Process + montagem 2 colunas
      // ═══════════════════════════════════════════════════════
      gsap.fromTo("#about", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#about", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      gsap.timeline({
        scrollTrigger: { trigger: "#about", start: "top 60%", once: true },
      })
        .from("#about-label",  { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#about-title1", { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#about-title2", { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5");

      // Coluna esquerda desliza da esquerda
      gsap.fromTo("#about-left",
        { opacity: 0, x: -60 },
        {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: "#about-left", start: "top 78%", once: true },
        }
      );

      // Coluna direita (WB) desliza da direita
      gsap.fromTo("#about-right",
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 0.8, delay: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: "#about-right", start: "top 78%", once: true },
        }
      );

      // Founder card sobe
      gsap.fromTo("#about-founder",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.25, ease: "power2.out",
          scrollTrigger: { trigger: "#about-founder", start: "top 85%", once: true },
        }
      );

      // Tech badges aparecem em cascata
      gsap.fromTo(".tech-badge",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          stagger: 0.06, duration: 0.4, delay: 0.3, ease: "back.out(1.4)",
          scrollTrigger: { trigger: "#tech-stack", start: "top 85%", once: true },
        }
      );

      // ═══════════════════════════════════════════════════════
      // CONTACT → slide up sobre About + montagem
      // ═══════════════════════════════════════════════════════
      gsap.fromTo("#contact", { y: 80 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: "#contact", start: "top 100%", end: "top 20%", scrub: 1.2 },
      });

      gsap.timeline({
        scrollTrigger: { trigger: "#contact", start: "top 62%", once: true },
      })
        .from("#contact-label",    { opacity: 0, y: -20, duration: 0.5, ease: "power2.out" })
        .from("#contact-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#contact-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#contact-subtitle", { opacity: 0, y: 20, duration: 0.5, ease: "power2.out" }, "-=0.3");

      gsap.fromTo("#contact-left",
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: "#contact-left", start: "top 80%", once: true } }
      );

      gsap.fromTo("#contact-right",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: "#contact-right", start: "top 80%", once: true } }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef}>
      {/* Hero sticky wrapper */}
      <div id="hero-wrapper" className="relative h-[150vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </div>

      {/* Services sobe enquanto hero ainda está visível */}
      <div className="-mt-[45vh] relative z-10">
        <Services />
      </div>

      {/* Process sobe sobre Services */}
      <div className="-mt-[30vh] relative z-20">
        <Process />
      </div>

      {/* About sobe sobre Process */}
      <div className="-mt-[30vh] relative z-30">
        <About />
      </div>

      {/* Contact sobe sobre About */}
      <div className="-mt-[30vh] relative z-40">
        <Contact />
      </div>
    </div>
  );
}
