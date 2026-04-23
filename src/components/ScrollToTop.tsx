"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Voltar ao topo"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.5)",
        pointerEvents: visible ? "all" : "none",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
      className="fixed bottom-24 right-6 z-[9997] w-11 h-11 rounded-full border border-border bg-surface/90 backdrop-blur-sm flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:shadow-[0_4px_16px_rgba(255,92,0,0.2)] transition-colors duration-200"
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}
