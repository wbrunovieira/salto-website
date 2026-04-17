import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import HeaderClient from "@/components/layout/HeaderClient";
import FooterClient from "@/components/layout/FooterClient";
import LocaleDetector from "@/components/LocaleDetector";
import "../globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://salto.com.br";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  preload: true,
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
    pt: "Salto — Alavanque suas vendas",
    en: "Salto — Boost your sales",
    es: "Salto — Impulsa tus ventas",
    it: "Salto — Potenzia le tue vendite",
  };

  const descriptions: Record<string, string> = {
    pt: "Estruturamos toda a sua jornada de vendas online — do tráfego pago à conversão.",
    en: "We structure your entire online sales journey — from paid traffic to conversion.",
    es: "Estructuramos todo tu viaje de ventas online — del tráfico pago a la conversión.",
    it: "Strutturiamo l'intero percorso di vendita online — dal traffico a pagamento alla conversione.",
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

  return (
    <html lang={locale}>
      <body className={`${montserrat.variable} font-sans antialiased bg-base text-text-primary`}>
        <NextIntlClientProvider messages={messages}>
          <LocaleDetector currentLocale={locale} />
          <HeaderClient locale={locale} />
          {children}
          <FooterClient />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
