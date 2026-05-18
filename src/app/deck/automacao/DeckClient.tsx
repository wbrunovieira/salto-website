'use client';

import { useEffect } from 'react';
import OSInline from './OSInline';
import { slidesCapa } from './slides/01-capa';
import { slidesRealidade } from './slides/02-realidade';
import { slidesWhatsapp } from './slides/03-whatsapp';
import { slidesAcao } from './slides/04-acao';

const ALL_SLIDES = [slidesCapa, slidesRealidade, slidesWhatsapp, slidesAcao].join('');

const TITLES = [
  'Apresentação', 'Reconhece Isso?', 'O Custo do Manual', 'O que Automatizar',
  'WhatsApp Inteligente', 'Como Funciona', 'O que Você Leva', 'Investimento', 'Proposta',
];

export default function DeckClient() {
  useEffect(() => {
    const w = window as typeof window & { lucide?: { createIcons: () => void }; closeMenu?: () => void };

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
      gsap.to(s, { opacity: 1, duration: 0.35, ease: 'power2.out', onComplete: onUnlock } as Record<string, unknown>);
      gsap.to(Array.from(els), { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.1 } as Record<string, unknown>);
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
        prev.style.pointerEvents = '';
        cur = n;
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
      delete w.closeMenu;
    };
  }, []);

  return (
    <>
      <div id="bar" />
      <div className="noise" />

      {/* Logo Salto — fixo em todos os slides */}
      <div style={{
        position: 'fixed', top: 20, left: 24, zIndex: 300,
        pointerEvents: 'none', opacity: 0.5,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Salto" style={{ height: 32, width: 'auto', display: 'block' }} />
      </div>

      {/* Salto Automação pill — fixo em todos os slides */}
      <div style={{
        position: 'fixed', bottom: 22, right: 24, zIndex: 300,
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
        {/* display:contents torna este div invisível no layout — slides ficam posicionados em #deck */}
        <div dangerouslySetInnerHTML={{ __html: ALL_SLIDES }} style={{ display: 'contents' }} />
        {/* Slide 9 — Proposta como componente React */}
        <div className="slide" style={{ overflow: 'auto', padding: 0, alignItems: 'center', justifyContent: 'flex-start' }}>
          <OSInline />
        </div>
      </div>

      <div id="nav">
        <button className="nb" id="bp">←</button>
        <span id="ctr">01 / 09</span>
        <button className="nb" id="bn">→</button>
      </div>

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
      </div>
    </>
  );
}
