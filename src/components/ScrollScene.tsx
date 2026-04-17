"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./sections/Hero";
import Services from "./sections/Services";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.refresh();

      // ═══════════════════════════════════════════════════════
      // HERO: letras explodem para fora conforme o scroll
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
        .to("#hero-badge",  { opacity: 0, y: -30,                   ease: "none" }, 0)
        .to("#hero-line1",  { opacity: 0, y: -110, x: -20,          ease: "none" }, 0)
        .to("#hero-line2",  { opacity: 0, y: -150, x: 20,           ease: "none" }, 0.05)
        .to("#hero-accent", { opacity: 0, scale: 1.22, y: -60,      ease: "none" }, 0.02)
        .to("#hero-sub",    { opacity: 0, y: 70,                     ease: "none" }, 0)
        .to("#hero-cta",    { opacity: 0, y: 45, scale: 0.92,        ease: "none" }, 0);

      // ═══════════════════════════════════════════════════════
      // SERVICES: sobe enquanto hero ainda está na tela
      // ═══════════════════════════════════════════════════════
      gsap.fromTo(
        "#services",
        { y: 80 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#services",
            start: "top 100%",
            end: "top 20%",
            scrub: 1.2,
          },
        }
      );

      // ═══════════════════════════════════════════════════════
      // SERVICES HEADER: montagem dinâmica
      // ═══════════════════════════════════════════════════════
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#services",
          start: "top 60%",
          once: true,
        },
      });

      headerTl
        .from("#services-label",    { opacity: 0, y: -20,  duration: 0.5, ease: "power2.out" })
        .from("#services-title1",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.2")
        .from("#services-title2",   { y: "105%", duration: 0.7, ease: "power4.out" }, "-=0.5")
        .from("#services-subtitle", { opacity: 0, y: 24, duration: 0.5, ease: "power2.out" }, "-=0.3")
        .from("#services-contrast", { opacity: 0, y: 12, duration: 0.4, ease: "power2.out" }, "-=0.2");

      // ═══════════════════════════════════════════════════════
      // CARDS: 3 direções — coluna esquerda, centro, direita
      // ═══════════════════════════════════════════════════════
      const cardTrigger = {
        trigger: "#services-grid",
        start: "top 82%",
        once: true,
      };

      // Coluna esquerda — desliza da esquerda com leve rotação
      gsap.fromTo("[data-col='0']",
        { opacity: 0, x: -70, rotation: -4 },
        { opacity: 1, x: 0, rotation: 0, stagger: 0.18, duration: 0.8, ease: "power3.out", scrollTrigger: cardTrigger }
      );

      // Coluna central — sobe de baixo
      gsap.fromTo("[data-col='1']",
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, stagger: 0.18, duration: 0.8, delay: 0.12, ease: "power3.out", scrollTrigger: cardTrigger }
      );

      // Coluna direita — desliza da direita com leve rotação
      gsap.fromTo("[data-col='2']",
        { opacity: 0, x: 70, rotation: 4 },
        { opacity: 1, x: 0, rotation: 0, stagger: 0.18, duration: 0.8, delay: 0.24, ease: "power3.out", scrollTrigger: cardTrigger }
      );

      // Ícones: scale + rotation burst após os cards entrarem
      gsap.fromTo(".service-icon",
        { scale: 0, rotation: -20, opacity: 0 },
        {
          scale: 1, rotation: 0, opacity: 1,
          stagger: { each: 0.07, from: "start" },
          duration: 0.5,
          delay: 0.35,
          ease: "back.out(1.5)",
          scrollTrigger: cardTrigger,
        }
      );
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <div ref={containerRef}>
      {/* 150vh wrapper: hero CSS-sticky, transição não força muito scroll */}
      <div id="hero-wrapper" className="relative h-[150vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <Hero />
        </div>
      </div>

      {/* Services começa a aparecer com 45vh de antecedência */}
      <div className="-mt-[45vh] relative z-10">
        <Services />
      </div>
    </div>
  );
}
