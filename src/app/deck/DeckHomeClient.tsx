'use client';

import { useState } from 'react';

const GOOGLE_G = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AUTOMACAO_ICON = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5C00', boxShadow: '0 0 8px rgba(255,92,0,0.6)', flexShrink: 0 }} />
    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  </div>
);

const SALTO_ICON = (
  /* eslint-disable-next-line @next/next/no-img-element */
  <img src="/logo.svg" alt="Salto" style={{ height: 22, width: 'auto', opacity: 0.7 }} />
);

const GERAL_ICON = (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/logo.svg" alt="Salto" style={{ height: 18, width: 'auto', opacity: 0.7 }} />
    <span style={{ fontSize: 9, color: '#444', fontWeight: 700 }}>+</span>
    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.5, color: '#64B5F6' }}>WB</span>
  </div>
);

const DECKS = [
  {
    href: '/deck/google-business',
    tag: 'GOOGLE',
    title: 'Google Meu Negócio',
    sub: 'Presença no Google Maps e Busca',
    icon: GOOGLE_G,
    accentColor: '#4285F4',
  },
  {
    href: '/deck/automacao',
    tag: 'AUTOMAÇÃO',
    title: 'Automação',
    sub: 'WhatsApp inteligente e CRM',
    icon: AUTOMACAO_ICON,
    accentColor: '#FF5C00',
  },
  {
    href: '/deck/salto',
    tag: 'SALTO',
    title: 'Apresentação Salto',
    sub: 'Estratégia e metodologia comercial',
    icon: SALTO_ICON,
    accentColor: '#FF5C00',
  },
  {
    href: '/deck/geral',
    tag: 'GERAL',
    title: 'Apresentação Completa',
    sub: 'Salto + Google + Automação + WB Digital',
    icon: GERAL_ICON,
    accentColor: '#64B5F6',
  },
];

export default function DeckHomeClient() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: 52,
        fontFamily: 'var(--font-deck, Montserrat, Arial Black, sans-serif)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Salto" style={{ height: 38, width: 'auto' }} />
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#444', margin: 0 }}>
          Apresentações Comerciais
        </p>
      </div>

      {/* OS Pedido — ação rápida */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: '#333', margin: 0 }}>
          Ferramentas
        </p>
        <a
          href="/deck/os"
          onMouseEnter={() => setHovered(99)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 24px',
            background: '#141414',
            border: `1px solid ${hovered === 99 ? 'rgba(255,92,0,0.4)' : 'rgba(255,255,255,0.07)'}`,
            borderRadius: 12,
            textDecoration: 'none',
            transition: 'border-color 0.2s, transform 0.18s',
            transform: hovered === 99 ? 'translateY(-2px)' : 'translateY(0)',
            cursor: 'pointer',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hovered === 99 ? '#FF5C00' : '#555'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s', flexShrink: 0 }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#f5f5f5', margin: '0 0 2px', letterSpacing: -0.2 }}>Nova Ordem de Serviço</p>
            <p style={{ fontSize: 11, color: '#444', fontWeight: 500, margin: 0 }}>Gerar pedido, PDF e enviar por e-mail</p>
          </div>
          <span style={{ fontSize: 14, color: hovered === 99 ? '#FF5C00' : '#333', transition: 'color 0.2s', marginLeft: 8 }}>→</span>
        </a>
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', maxWidth: 740 }}>
        {DECKS.map((deck, i) => {
          const isHovered = hovered === i;
          return (
            <a
              key={deck.href}
              href={deck.href}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: 220,
                minHeight: 188,
                padding: '26px 22px',
                background: '#141414',
                border: `1px solid ${isHovered ? `${deck.accentColor}55` : 'rgba(255,255,255,0.07)'}`,
                borderRadius: 16,
                textDecoration: 'none',
                transition: 'border-color 0.2s, transform 0.18s',
                transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
                cursor: 'pointer',
              }}
            >
              {/* Top: icon */}
              <div>{deck.icon}</div>

              {/* Bottom: text + arrow */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#444', margin: '0 0 6px' }}>
                    {deck.tag}
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 800, color: '#f5f5f5', letterSpacing: -0.3, lineHeight: 1.2, margin: '0 0 5px' }}>
                    {deck.title}
                  </p>
                  <p style={{ fontSize: 11, color: '#555', fontWeight: 500, margin: 0 }}>
                    {deck.sub}
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 16, color: isHovered ? deck.accentColor : '#333', transition: 'color 0.2s', lineHeight: 1 }}>→</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
