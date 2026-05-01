'use client';

import { useEffect, useState } from 'react';

export default function PasswordGate({ returnTo }: { returnTo: string }) {
  const [error, setError] = useState(false);

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
          <input
            type="password"
            name="password"
            placeholder="Senha de acesso"
            autoComplete="current-password"
            required
            style={{
              width: '100%',
              padding: '12px 16px',
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
