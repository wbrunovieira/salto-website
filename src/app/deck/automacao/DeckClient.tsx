'use client';

import { useEffect } from 'react';
import OSInline from './OSInline';
import { slidesCapa } from './slides/01-capa';
import { slidesRealidade } from './slides/02-realidade';
import { slidesWhatsapp } from './slides/03-whatsapp';
import { slidesAcao } from './slides/04-acao';

const ALL_SLIDES = [slidesCapa, slidesRealidade, slidesWhatsapp, slidesAcao].join('');

const TITLES = [
  'Apresentação', 'Reconhece Isso?', 'O Custo do Manual', 'Antes vs Depois',
  'WhatsApp Inteligente', 'Como Funciona', 'O que Você Leva', 'Investimento', 'Proposta',
];

export default function DeckClient() {
  useEffect(() => {
    const w = window as typeof window & { lucide?: { createIcons: () => void }; closeMenu?: () => void };

    // ── Fullscreen — pure vanilla JS, no React state to avoid re-renders on fs change ──
    function toggleFullscreen() {
      try {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } catch { /* not supported */ }
    }

    const onFsChange = () => {
      const isFs = !!document.fullscreenElement;
      const fsEnter = document.getElementById('fs-enter');
      const fsExit = document.getElementById('fs-exit');
      if (fsEnter) fsEnter.style.display = isFs ? 'none' : 'block';
      if (fsExit) fsExit.style.display = isFs ? 'block' : 'none';
      // Force layout recalculation on iPad after fullscreen/orientation change
      setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);

    const fsbtn = document.getElementById('fsbtn');
    if (fsbtn) fsbtn.onclick = toggleFullscreen;

    // ── Slides ──
    let cur = 0;
    let transitioning = false;
    const slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    const N = slides.length;

    type GSAPStatic = {
      set: (targets: NodeListOf<Element> | Element[], vars: Record<string, unknown>) => void;
      to: (targets: Element | NodeListOf<Element> | Element[], vars: Record<string, unknown>) => void;
      killTweensOf: (targets: Element | Element[]) => void;
    };
    let gsap: GSAPStatic | null = null;

    import('gsap').then((mod) => { gsap = mod.default as unknown as GSAPStatic; });

    function animIn(s: HTMLElement, onUnlock: () => void) {
      if (!gsap) { onUnlock(); return; }
      const els = s.querySelectorAll('[data-a]');
      gsap.set(Array.from(els), { opacity: 0, y: 26 });
      // Slide visibility guaranteed by CSS (.slide.active { opacity:1 }) — only animate inner elements
      gsap.to(Array.from(els), { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.06, onComplete: onUnlock } as Record<string, unknown>);
    }

    function animOut(s: HTMLElement, cb: () => void) {
      if (!gsap) { cb(); return; }
      const els = s.querySelectorAll('[data-a]');
      gsap.killTweensOf(Array.from(els));
      gsap.killTweensOf(s);
      gsap.to(Array.from(els), { opacity: 0, y: -14, duration: 0.18, stagger: 0.025, ease: 'power2.in' } as Record<string, unknown>);
      gsap.to(s, { opacity: 0, duration: 0.28, ease: 'power2.in', delay: 0.04, onComplete: cb } as Record<string, unknown>);
    }

    function ui() {
      const ctr = document.getElementById('ctr');
      const bar = document.getElementById('bar');
      const bp = document.getElementById('bp') as HTMLButtonElement | null;
      const bn = document.getElementById('bn') as HTMLButtonElement | null;
      if (ctr) ctr.textContent = String(cur + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
      if (bar) bar.style.width = ((cur + 1) / N * 100) + '%';
      if (bp) bp.disabled = cur === 0;
      if (bn) bn.disabled = cur === N - 1;
      history.replaceState(null, '', '#slide-' + (cur + 1));
      document.querySelectorAll('.hitem').forEach((el, i) => el.classList.toggle('hactive', i === cur));
    }

    function goTo(n: number) {
      if (n < 0 || n >= N || n === cur || transitioning) return;
      transitioning = true;
      const prev = slides[cur];
      const next = slides[n];
      prev.style.pointerEvents = 'none';
      animOut(prev, () => {
        prev.classList.remove('active');
        prev.style.opacity = ''; // clear GSAP inline opacity so CSS controls it
        prev.style.pointerEvents = '';
        cur = n;
        next.style.opacity = ''; // clear any stale opacity before CSS .active kicks in
        next.classList.add('active');
        animIn(next, () => { transitioning = false; });
        ui();
      });
    }

    document.getElementById('bp')!.onclick = () => goTo(cur - 1);
    document.getElementById('bn')!.onclick = () => goTo(cur + 1);

    const onKeyDown = (e: KeyboardEvent) => {
      if ((document.activeElement as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(cur + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(cur - 1); }
    };
    document.addEventListener('keydown', onKeyDown);

    let tx = 0;
    let swipeBlocked = false;
    const onTouchStart = (e: TouchEvent) => {
      swipeBlocked = !!(e.target as HTMLElement).closest('canvas, input, button, textarea, select');
      tx = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (swipeBlocked) { swipeBlocked = false; return; }
      const dx = e.changedTouches[0].clientX - tx;
      if (dx < -50) goTo(cur + 1);
      if (dx > 50) goTo(cur - 1);
    };
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    const hlist = document.getElementById('hlist');
    if (hlist) {
      TITLES.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'hitem';
        btn.innerHTML = `<span class="hnum">${String(i + 1).padStart(2, '0')}</span><span class="htxt">${t}</span>`;
        btn.onclick = () => { goTo(i); closeMenu(); };
        hlist.appendChild(btn);
      });
    }

    function openMenu() {
      document.getElementById('hdrawer')?.classList.add('open');
      document.getElementById('hoverlay')?.classList.add('open');
    }
    function closeMenu() {
      document.getElementById('hdrawer')?.classList.remove('open');
      document.getElementById('hoverlay')?.classList.remove('open');
    }
    w.closeMenu = closeMenu;

    const hbtn = document.getElementById('hbtn');
    if (hbtn) hbtn.onclick = () => document.getElementById('hdrawer')?.classList.contains('open') ? closeMenu() : openMenu();
    document.getElementById('hoverlay')!.onclick = closeMenu;
    document.getElementById('hclose')!.onclick = closeMenu;

    const hashN = parseInt(location.hash.replace('#slide-', '')) - 1;
    cur = (hashN >= 0 && hashN < N) ? hashN : 0;

    slides[cur].classList.add('active');

    import('gsap').then((mod) => {
      gsap = mod.default as unknown as GSAPStatic;
      animIn(slides[cur], () => {});
      ui();
    });

    setTimeout(() => { if (w.lucide) w.lucide.createIcons(); }, 100);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('fullscreenchange', onFsChange);
      document.removeEventListener('webkitfullscreenchange', onFsChange);
      delete w.closeMenu;
    };
  }, []);

  return (
    <>
      <div id="bar" />
      <div className="noise" />

      {/* Logo Salto — fixo em todos os slides */}
      <div style={{
        position: 'fixed',
        top: 'calc(20px + env(safe-area-inset-top, 0px))',
        left: 'calc(24px + env(safe-area-inset-left, 0px))',
        zIndex: 300,
        pointerEvents: 'none', opacity: 0.5,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Salto" style={{ height: 32, width: 'auto', display: 'block' }} />
      </div>

      {/* Salto Automação pill — fixo em todos os slides */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(22px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(24px + env(safe-area-inset-right, 0px))',
        zIndex: 300,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,92,0,0.08)',
        border: '1px solid rgba(255,92,0,0.2)',
        borderRadius: 100,
        padding: '8px 16px',
        pointerEvents: 'none',
        backdropFilter: 'blur(6px)',
      }}>
        <div style={{
          width: 6, height: 6, borderRadius: '50%',
          background: '#FF5C00', flexShrink: 0,
        }} />
        <div style={{ lineHeight: 1 }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#f5f5f5', letterSpacing: -0.3, margin: '0 0 2px' }}>Salto</p>
          <p style={{ fontSize: 8, fontWeight: 700, color: '#FF5C00', letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>Automação</p>
        </div>
      </div>

      <div id="deck">
        {/*
          Use position:absolute instead of display:contents to avoid a Chrome bug
          where display:contents children disappear during fullscreen transitions.
        */}
        <div dangerouslySetInnerHTML={{ __html: ALL_SLIDES }} style={{ position: 'absolute', inset: 0 }} />
        {/* Slide final — Pedido/OS como componente React */}
        <div className="slide" style={{ overflow: 'auto', padding: 0, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OSInline />
        </div>
      </div>

      <div id="nav">
        <button className="nb" id="bp">←</button>
        <span id="ctr">01 / 09</span>
        <button className="nb" id="bn">→</button>
      </div>

      {/* Fullscreen button — click handled by vanilla JS to avoid React re-renders */}
      <button
        id="fsbtn"
        title="Fullscreen"
        style={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          left: 'calc(24px + env(safe-area-inset-left, 0px))',
          zIndex: 300,
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.03)',
          color: '#888', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'border-color .2s, color .2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#FF5C00'; (e.currentTarget as HTMLButtonElement).style.color = '#FF5C00'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLButtonElement).style.color = '#888'; }}
      >
        <svg id="fs-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 7V3h4"/><path d="M21 7V3h-4"/>
          <path d="M3 17v4h4"/><path d="M21 17v4h-4"/>
        </svg>
        <svg id="fs-exit" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'none' }}>
          <path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/>
          <path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/>
        </svg>
      </button>

      <button id="hbtn"><span /><span /><span /></button>
      <div id="hoverlay" />
      <div id="hdrawer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', margin: 0 }}>Navegar</p>
          <button
            id="hclose"
            style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, lineHeight: '1' }}
          >×</button>
        </div>
        <div id="hlist" />
        <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.07)', marginTop: 4 }}>
          <a href="/deck" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#555', fontSize: 12, fontWeight: 700, letterSpacing: 0.3 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            Todos os decks
          </a>
        </div>
      </div>
    </>
  );
}
