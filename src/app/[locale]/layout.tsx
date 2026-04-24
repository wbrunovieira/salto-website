import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import HeaderClient from "@/components/layout/HeaderClient";
import FooterClient from "@/components/layout/FooterClient";
import LocaleDetector from "@/components/LocaleDetector";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CookieBanner from "@/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "@/components/ScrollToTop";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://saltoup.com";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    pt: "Salto | Consultoria de Vendas e Marketing Digital",
    en: "Salto | Sales Consulting & Digital Marketing",
    es: "Salto | Consultoría de Ventas y Marketing Digital",
    it: "Salto | Consulenza Vendite e Marketing Digitale",
  };

  const descriptions: Record<string, string> = {
    pt: "Consultoria de vendas, marketing digital e CRM integrados. Diagnóstico 100% gratuito para PMEs. Estratégia personalizada, do tráfego pago ao fechamento.",
    en: "Sales consulting, digital marketing and CRM integrated. 100% free diagnosis for SMBs. Customized strategy, from paid traffic to closing.",
    es: "Consultoría de ventas, marketing digital y CRM integrados. Diagnóstico 100% gratuito para pymes. Estrategia personalizada, del tráfico pago al cierre.",
    it: "Consulenza vendite, marketing digitale e CRM integrati. Diagnosi 100% gratuita per PMI. Strategia personalizzata, dal traffico a pagamento alla chiusura.",
  };

  return {
    title: titles[locale] ?? titles.pt,
    description: descriptions[locale] ?? descriptions.pt,
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, `${BASE_URL}/${loc}`])
      ),
    },
    icons: {
      icon: "/icon.svg",
      apple: "/icon.svg",
    },
    openGraph: {
      title: titles[locale] ?? titles.pt,
      description: descriptions[locale] ?? descriptions.pt,
      locale,
      url: `${BASE_URL}/${locale}`,
      siteName: "Salto",
      type: "website",
      images: [{ url: `${BASE_URL}/og-image?locale=${locale}`, width: 1200, height: 630, alt: titles[locale] ?? titles.pt }],
    },
    twitter: {
      card: "summary_large_image",
      title: titles[locale] ?? titles.pt,
      description: descriptions[locale] ?? descriptions.pt,
      images: [`${BASE_URL}/og-image?locale=${locale}`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "pt" | "en" | "es" | "it")) {
    notFound();
  }

  const messages = await getMessages();

  const schemaDescriptions: Record<string, string> = {
    pt: "Estratégia comercial e tecnologia integradas para alavancar as vendas do seu negócio.",
    en: "Integrated sales strategy and technology to boost your business results.",
    es: "Estrategia comercial y tecnología integradas para impulsar las ventas de tu negocio.",
    it: "Strategia commerciale e tecnologia integrate per potenziare le vendite della tua azienda.",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Salto",
    url: `${BASE_URL}/${locale}`,
    logo: `${BASE_URL}/icon.svg`,
    description: schemaDescriptions[locale] ?? schemaDescriptions.pt,
    founder: { "@type": "Person", name: "Bruno Vieira" },
    sameAs: ["https://www.wbdigitalsolutions.com"],
    serviceType: ["Sales Strategy", "Digital Marketing", "CRM", "Sales Training"],
    areaServed: ["BR", "US", "ES", "IT"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Portuguese", "English", "Spanish", "Italian"],
    },
  };

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Meta Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','4003723679765029');fbq('track','PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=4003723679765029&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className={`${montserrat.variable} font-sans antialiased bg-base text-text-primary`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleDetector currentLocale={locale} />
          <HeaderClient locale={locale} />
          {children}
          <FooterClient />
          <WhatsAppFloat />
          <CookieBanner />
          <Analytics />
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
