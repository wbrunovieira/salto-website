import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import './deck.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-deck',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Salto — Deck Comercial',
};

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <body
        style={{
          background: '#0E0E0E',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          fontFamily: 'var(--font-deck)',
        }}
      >
        {children}
        <Script
          src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
