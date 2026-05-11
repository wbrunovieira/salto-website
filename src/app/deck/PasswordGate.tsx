'use client';

import { useEffect, useState } from 'react';

export default function PasswordGate({ returnTo }: { returnTo: string }) {
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setError(params.get('error') === '1');
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0E0E0E',
        fontFamily: 'var(--font-deck, Montserrat, Arial Black, sans-serif)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '40px 36px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 20,
          background: '#141414',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.svg"
          alt="Salto"
          style={{ width: 140, height: 'auto', marginBottom: 28, display: 'block' }}
        />
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: 20,
          }}
        >
          Acesso restrito
        </p>

        {error && (
          <p
            style={{
              fontSize: 12,
              color: '#ff7070',
              marginBottom: 14,
              padding: '8px 12px',
              borderRadius: 8,
              background: 'rgba(255,112,112,0.08)',
              border: '1px solid rgba(255,112,112,0.2)',
            }}
          >
            Senha incorreta. Tente novamente.
          </p>
        )}

        <form method="POST" action="/api/deck-auth" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="hidden" name="returnTo" value={returnTo} />
          <div style={{ position: 'relative' }}>
            <input
              type={show ? 'text' : 'password'}
              name="password"
              placeholder="Senha de acesso"
              autoComplete="current-password"
              required
              style={{
                width: '100%',
                padding: '12px 44px 12px 16px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.08)',
                background: '#0E0E0E',
                color: '#F5F5F5',
                fontFamily: 'inherit',
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
            <button
              type="button"
              onClick={() => setShow(v => !v)}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 4,
                color: '#555',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {show ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 100,
              border: 'none',
              background: 'linear-gradient(to right, #FF5C00, #FF3D00)',
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: 13,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 1,
            }}
          >
            Entrar →
          </button>
        </form>
      </div>
    </div>
  );
}
