"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const COOKIE_KEY = "salto_cookie_consent";

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!localStorage.getItem(COOKIE_KEY)) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (show && ref.current) {
      gsap.fromTo(ref.current,
        { y: 120, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [show]);

  const dismiss = (value: "accepted" | "declined") => {
    localStorage.setItem(COOKIE_KEY, value);
    if (ref.current) {
      gsap.to(ref.current, {
        y: 120, opacity: 0, duration: 0.4, ease: "power2.in",
        onComplete: () => setShow(false),
      });
    } else {
      setShow(false);
    }
  };

  if (!show) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-2rem)] max-w-2xl"
    >
      <div className="bg-surface/95 backdrop-blur-xl border border-border rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col sm:flex-row items-start sm:items-center gap-4">

        <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
          <span className="text-lg">🍪</span>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text-primary mb-0.5">{t("title")}</p>
          <p className="text-xs text-text-muted leading-relaxed">
            {t("description")}{" "}
            <Link href="/privacidade" className="text-accent hover:underline">{t("policy")}</Link>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => dismiss("declined")}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold text-text-muted border border-border hover:border-text-muted hover:text-text-primary transition-all duration-200"
          >
            {t("decline")}
          </button>
          <button
            onClick={() => dismiss("accepted")}
            className="group flex-1 sm:flex-none relative px-5 py-2.5 rounded-xl text-xs font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(255,92,0,0.4)]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-200" />
            <span className="relative">{t("accept")}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
