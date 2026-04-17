"use client";

import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const LOCALE_COUNTRY: Record<string, string> = {
  pt: "br",
  en: "us",
  es: "es",
  it: "it",
};

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511982864581";

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale();
  const defaultCountry = LOCALE_COUNTRY[locale] ?? "br";
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [state, setState] = useState<FormState>("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = useCallback((value: string, key: string) => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setState(res.ok ? "success" : "error");
    } catch {
      setState("error");
    }
  };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t("whatsappMessage"))}`;

  return (
    <section id="contact" className="relative bg-[#0E0E0E] px-6 pb-32">
      {/* Overlap gradient */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0E0E0E] to-transparent pointer-events-none z-10" />

      {/* Orange glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none opacity-[0.12]"
        style={{ background: "radial-gradient(ellipse at center, #FF5C00 0%, transparent 70%)", filter: "blur(80px)" }} />

      <div className="max-w-6xl mx-auto pt-32">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span id="contact-label" className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full text-[11px] font-bold tracking-[3px] uppercase text-text-muted border border-border bg-surface/50 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 animate-pulse" />
            {t("label")}
          </span>
          <div className="overflow-hidden mb-3">
            <h2 id="contact-title1" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight text-text-primary">
              {t("title")}
            </h2>
          </div>
          <div className="overflow-hidden mb-8">
            <h2 id="contact-title2" className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-tight bg-gradient-to-r from-accent via-[#FF7A28] to-accent-hover bg-clip-text text-transparent">
              {t("titleAccent")}
            </h2>
          </div>
          <p id="contact-subtitle" className="max-w-lg text-base md:text-lg text-text-muted leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-5xl mx-auto">

          {/* Left — contatos (2 cols) */}
          <div id="contact-left" className="lg:col-span-2 flex flex-col gap-3">

            {/* WhatsApp */}
            <div className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/40 hover:border-[#25D366]/30 transition-all duration-200">
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center shrink-0 hover:bg-[#25D366]/20 transition-colors duration-200">
                <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-text-muted">{t("whatsappLabel")}</p>
                <a href={waUrl} target="_blank" rel="noopener noreferrer"
                  className="text-sm font-semibold text-text-primary hover:text-[#25D366] transition-colors duration-200">
                  {t("whatsappNumber")}
                </a>
              </div>
              <button onClick={() => copyToClipboard(t("whatsappNumber"), "wa")}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 shrink-0">
                {copied === "wa"
                  ? <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 16 16" fill="none"><polyline points="2 8 6 12 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                }
              </button>
            </div>

            {/* Email */}
            <div className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all duration-200">
              <a href={`mailto:${t("email")}`}
                className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 hover:bg-accent/20 transition-colors duration-200">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-text-muted">{t("emailLabel")}</p>
                <a href={`mailto:${t("email")}`}
                  className="text-sm font-semibold text-text-primary hover:text-accent transition-colors duration-200 truncate block">
                  {t("email")}
                </a>
              </div>
              <button onClick={() => copyToClipboard(t("email"), "email")}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 shrink-0">
                {copied === "email"
                  ? <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 16 16" fill="none"><polyline points="2 8 6 12 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                }
              </button>
            </div>

            {/* Phone */}
            <div className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/30 hover:border-accent/30 transition-all duration-200">
              <a href="tel:+551150264203"
                className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center shrink-0 hover:bg-accent/20 transition-colors duration-200">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.29h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l.94-.94a2 2 0 0 1 2.25-.44c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
                </svg>
              </a>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold tracking-[2px] uppercase text-text-muted">{t("phoneLabel")}</p>
                <a href="tel:+551150264203"
                  className="text-sm font-semibold text-text-primary hover:text-accent transition-colors duration-200">
                  {t("phoneNumber")}
                </a>
              </div>
              <button onClick={() => copyToClipboard(t("phoneNumber"), "phone")}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 transition-all duration-200 shrink-0">
                {copied === "phone"
                  ? <svg className="w-3.5 h-3.5 text-accent" viewBox="0 0 16 16" fill="none"><polyline points="2 8 6 12 14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 11V3a1 1 0 0 1 1-1h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                }
              </button>
            </div>

            {/* Guarantee */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface/30">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="text-sm text-text-muted">{t("guarantee")}</p>
            </div>
          </div>

          {/* Right — Form (3 cols) */}
          <div id="contact-right" className="lg:col-span-3">
            {state === "success" ? (
              <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-accent/30 bg-surface/40 text-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="text-base font-bold text-text-primary">{t("form.success")}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl border border-border bg-surface/40 flex flex-col gap-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[11px] font-bold tracking-[2px] uppercase text-text-muted">{t("form.name")}</label>
                    <input
                      id="contact-name" name="name" value={form.name} onChange={handleChange} required
                      autoComplete="name"
                      className="bg-[#0E0E0E] border border-border rounded-xl px-4 py-3 text-sm text-accent placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                      placeholder={t("form.name")}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-[11px] font-bold tracking-[2px] uppercase text-text-muted">{t("form.email")}</label>
                    <input
                      id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required
                      autoComplete="email"
                      className="bg-[#0E0E0E] border border-border rounded-xl px-4 py-3 text-sm text-accent placeholder:text-text-muted/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
                      placeholder={t("form.email")}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold tracking-[2px] uppercase text-text-muted">{t("form.phone")}</label>
                  <PhoneInput
                    defaultCountry={defaultCountry}
                    value={form.phone}
                    onChange={(phone) => setForm((prev) => ({ ...prev, phone }))}
                    placeholder={t("form.phone")}
                    className="phone-input-container"
                  />
                </div>

                {state === "error" && (
                  <p className="text-xs text-red-400">{t("form.error")}</p>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="group relative w-full py-4 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(255,92,0,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-accent-hover" />
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.08] transition-opacity duration-300" />
                  <span className="relative">
                    {state === "submitting" ? t("form.submitting") : t("form.submit")}
                  </span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
