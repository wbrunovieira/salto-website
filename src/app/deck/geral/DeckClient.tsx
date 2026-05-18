'use client';

import { useEffect } from 'react';
import { slidesAbertura } from './slides/01-abertura';
import { slidesServicos } from './slides/02-servicos';
import { slidesFechamento } from './slides/03-fechamento';

const ALL_SLIDES = [slidesAbertura, slidesServicos, slidesFechamento].join('');

const TITLES = [
  'Capa', 'Quem Somos', 'As 4 Frentes',
  'Google Meu Negócio', 'Automação', 'Sites e Plataformas',
  'IA e Dados', 'Estratégia Salto', 'Por Onde Começar',
];

const SETUP_HTML = `
<div style="width:100%;max-width:440px;padding:40px 36px;border:1px solid rgba(255,255,255,0.08);border-radius:20px;background:#141414">
  <div style="display:flex;align-items:center;gap:14px;margin-bottom:28px">
    <img src="/logo.svg" alt="Salto" style="height:24px;width:auto;display:block;opacity:0.85">
    <div style="width:1px;height:22px;background:rgba(255,255,255,0.1)"></div>
    <span style="font-size:18px;font-weight:900;color:#fff;letter-spacing:-0.5px;line-height:1">WB</span>
    <span style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555">Digital Solutions</span>
  </div>
  <p style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#888;margin-bottom:20px">Personalizar apresentação</p>
  <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px">
    <input id="inp-nome" type="text" placeholder="Nome do cliente" autocomplete="off"
      style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:#0E0E0E;color:#F5F5F5;font-family:inherit;font-size:14px;outline:none"
      onfocus="this.style.borderColor='rgba(255,92,0,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">
    <input id="inp-empresa" type="text" placeholder="Empresa" autocomplete="off"
      style="width:100%;padding:12px 16px;border-radius:10px;border:1px solid rgba(255,255,255,0.08);background:#0E0E0E;color:#F5F5F5;font-family:inherit;font-size:14px;outline:none"
      onfocus="this.style.borderColor='rgba(255,92,0,0.5)'" onblur="this.style.borderColor='rgba(255,255,255,0.08)'">
    <div id="logo-upload-area" onclick="document.getElementById('inp-logo').click()"
      style="border:1px dashed rgba(255,255,255,0.1);border-radius:10px;padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:border-color .2s"
      onmouseover="this.style.borderColor='rgba(255,92,0,0.35)'" onmouseout="this.style.borderColor='rgba(255,255,255,0.1)'">
      <input id="inp-logo" type="file" accept="image/*" style="display:none">
      <i data-lucide="image" style="font-size:16px;color:#666;flex-shrink:0"></i>
      <div style="flex:1;min-width:0">
        <p id="logo-label-txt" style="font-size:13px;color:#666;margin:0">Logo do cliente (opcional)</p>
        <img id="logo-preview" src="" alt="" style="display:none;max-height:30px;max-width:160px;object-fit:contain;margin-top:8px;border-radius:4px">
      </div>
    </div>
  </div>
  <button id="setup-ok" style="width:100%;padding:14px;border-radius:100px;border:none;background:linear-gradient(to right,#FF5C00,#FF3D00);color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer;letter-spacing:1px">
    Iniciar apresentação →
  </button>
  <p style="margin-top:14px;font-size:10px;color:#444;text-align:center">Deixe em branco para pular a personalização</p>
</div>
`;

export default function DeckClient() {
  useEffect(() => {
    const w = window as typeof window & { lucide?: { createIcons: () => void }; closeMenu?: () => void };

    // ── Fullscreen — pure vanilla JS ──
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
      setTimeout(() => window.dispatchEvent(new Event('resize')), 50);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    document.addEventListener('webkitfullscreenchange', onFsChange);

    const fsbtn = document.getElementById('fsbtn');
    if (fsbtn) fsbtn.onclick = toggleFullscreen;

    // ── Slides ──
    let cur: number = 0;
    const slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    const N = slides.length;

    type GSAPStatic = {
      set: (targets: NodeListOf<Element> | Element[], vars: Record<string, unknown>) => void;
      to: (targets: Element | NodeListOf<Element> | Element[], vars: Record<string, unknown>) => void;
    };
    let gsap: GSAPStatic | null = null;

    import('gsap').then((mod) => { gsap = mod.default as unknown as GSAPStatic; });

    function animIn(s: HTMLElement) {
      if (!gsap) return;
      const els = s.querySelectorAll('[data-a]');
      gsap.set(Array.from(els), { opacity: 0, y: 26 });
      gsap.to(Array.from(els), { opacity: 1, y: 0, duration: 0.55, stagger: 0.07, ease: 'power3.out', delay: 0.06 } as Record<string, unknown>);
    }

    function animOut(s: HTMLElement, cb: () => void) {
      if (!gsap) { cb(); return; }
      const els = s.querySelectorAll('[data-a]');
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
      if (n < 0 || n >= N || n === cur) return;
      const prev = slides[cur];
      const next = slides[n];
      prev.style.pointerEvents = 'none';
      animOut(prev, () => {
        prev.classList.remove('active');
        prev.style.opacity = '';
        prev.style.pointerEvents = '';
        cur = n;
        next.style.opacity = '';
        next.classList.add('active');
        animIn(next);
        ui();
      });
    }

    const bpEl = document.getElementById('bp');
    const bnEl = document.getElementById('bn');
    if (bpEl) bpEl.onclick = () => goTo(cur - 1);
    if (bnEl) bnEl.onclick = () => goTo(cur + 1);

    const onKeyDown = (e: KeyboardEvent) => {
      if ((document.activeElement as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(cur + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(cur - 1); }
    };
    document.addEventListener('keydown', onKeyDown);

    let tx = 0;
    const onTouchStart = (e: TouchEvent) => { tx = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - tx;
      if (dx < -50) goTo(cur + 1);
      if (dx > 50) goTo(cur - 1);
    };
    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    // ── Hamburger ──
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
    const hoverlay = document.getElementById('hoverlay');
    if (hoverlay) hoverlay.onclick = closeMenu;
    const hclose = document.getElementById('hclose');
    if (hclose) hclose.onclick = closeMenu;

    // ── Init hash ──
    const hashN = parseInt(location.hash.replace('#slide-', '')) - 1;
    cur = (hashN >= 0 && hashN < N) ? hashN : 0;

    // ── Personalização ──
    const LS = { nome: 'salto_pres_nome', emp: 'salto_pres_empresa', logo: 'salto_pres_logo' };
    let _logoB64: string | null = null;

    function applyData(nome: string, empresa: string, logo: string | null) {
      const companyLabel = document.getElementById('s1company-label');
      const nameGreeting = document.getElementById('s1name-greeting');
      const logoWrap = document.getElementById('s1logo-wrap');
      const logoEl = document.getElementById('s1logo') as HTMLImageElement | null;
      if (nameGreeting) nameGreeting.textContent = nome ? nome + ', ' : '';
      if (companyLabel) { companyLabel.textContent = empresa; companyLabel.style.display = empresa ? 'inline' : 'none'; }
      if (logo) {
        if (logoEl) logoEl.src = logo;
        if (logoWrap) logoWrap.style.display = 'block';
      } else {
        if (logoWrap) logoWrap.style.display = 'none';
      }
    }

    function showSetup() { const s = document.getElementById('setup'); if (s) s.style.display = 'flex'; }
    function hideSetup() { const s = document.getElementById('setup'); if (s) s.style.display = 'none'; }

    const inpLogo = document.getElementById('inp-logo') as HTMLInputElement | null;
    if (inpLogo) {
      inpLogo.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          _logoB64 = ev.target?.result as string;
          const prev = document.getElementById('logo-preview') as HTMLImageElement | null;
          if (prev) { prev.src = _logoB64; prev.style.display = 'block'; }
          const lbl = document.getElementById('logo-label-txt');
          if (lbl) { lbl.textContent = '✓ Logo carregado'; lbl.style.color = '#FF5C00'; }
        };
        reader.readAsDataURL(file);
      });
    }

    const setupOk = document.getElementById('setup-ok');
    if (setupOk) {
      setupOk.onclick = () => {
        const nome = (document.getElementById('inp-nome') as HTMLInputElement)?.value.trim() ?? '';
        const empresa = (document.getElementById('inp-empresa') as HTMLInputElement)?.value.trim() ?? '';
        localStorage.setItem(LS.nome, nome);
        localStorage.setItem(LS.emp, empresa);
        if (_logoB64) localStorage.setItem(LS.logo, _logoB64);
        else localStorage.removeItem(LS.logo);
        applyData(nome, empresa, _logoB64 || localStorage.getItem(LS.logo));
        hideSetup();
      };
    }

    ['inp-nome', 'inp-empresa'].forEach(id => {
      document.getElementById(id)?.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter') (document.getElementById('setup-ok') as HTMLButtonElement)?.click();
      });
    });

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
      resetBtn.onmouseover = () => { resetBtn.style.color = 'rgba(255,255,255,0.55)'; resetBtn.style.borderColor = 'rgba(255,255,255,0.22)'; };
      resetBtn.onmouseout = () => { resetBtn.style.color = 'rgba(255,255,255,0.18)'; resetBtn.style.borderColor = 'rgba(255,255,255,0.06)'; };
      resetBtn.onclick = () => {
        [LS.nome, LS.emp, LS.logo].forEach(k => localStorage.removeItem(k));
        _logoB64 = null;
        ['inp-nome', 'inp-empresa'].forEach(id => { const el = document.getElementById(id) as HTMLInputElement | null; if (el) el.value = ''; });
        const prev = document.getElementById('logo-preview') as HTMLImageElement | null;
        if (prev) { prev.style.display = 'none'; prev.src = ''; }
        const lbl = document.getElementById('logo-label-txt');
        if (lbl) { lbl.textContent = 'Logo do cliente (opcional)'; lbl.style.color = '#666'; }
        applyData('', '', null);
        showSetup();
      };
    }

    const savedNome = localStorage.getItem(LS.nome) || '';
    const savedEmp = localStorage.getItem(LS.emp) || '';
    const savedLogo = localStorage.getItem(LS.logo) || null;
    if (savedNome || savedEmp || savedLogo) { applyData(savedNome, savedEmp, savedLogo); }
    else { showSetup(); }

    slides[cur].classList.add('active');

    import('gsap').then((mod) => {
      gsap = mod.default as unknown as GSAPStatic;
      animIn(slides[cur]);
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
      {/* Setup overlay */}
      <div
        id="setup"
        style={{ position: 'fixed', inset: 0, zIndex: 999, background: '#0E0E0E', display: 'none', alignItems: 'center', justifyContent: 'center' }}
        dangerouslySetInnerHTML={{ __html: SETUP_HTML }}
      />

      <div id="bar" />
      <div className="noise" />

      <div id="deck" dangerouslySetInnerHTML={{ __html: ALL_SLIDES }} />

      {/* Nav */}
      <div id="nav">
        <button className="nb" id="bp">←</button>
        <span id="ctr">01 / 09</span>
        <button className="nb" id="bn">→</button>
      </div>

      {/* Logo Salto — fixo */}
      <div style={{
        position: 'fixed',
        top: 'calc(20px + env(safe-area-inset-top, 0px))',
        left: 'calc(24px + env(safe-area-inset-left, 0px))',
        zIndex: 300, pointerEvents: 'none', opacity: 0.4,
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Salto" style={{ height: 28, width: 'auto', display: 'block' }} />
      </div>

      {/* Branding pill — Salto + WB */}
      <div style={{
        position: 'fixed',
        bottom: 'calc(22px + env(safe-area-inset-bottom, 0px))',
        right: 'calc(24px + env(safe-area-inset-right, 0px))',
        zIndex: 300,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 100, padding: '7px 14px 7px 10px',
        pointerEvents: 'none', backdropFilter: 'blur(6px)',
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Salto" style={{ height: 16, width: 'auto' }} />
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ lineHeight: 1 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: '#fff', letterSpacing: -0.3, margin: '0 0 1px' }}>WB</p>
          <p style={{ fontSize: 7, fontWeight: 700, color: '#555', letterSpacing: 1.5, textTransform: 'uppercase', margin: 0 }}>Digital</p>
        </div>
      </div>

      {/* Fullscreen */}
      <button
        id="fsbtn"
        title="Fullscreen"
        style={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          left: 'calc(24px + env(safe-area-inset-left, 0px))',
          zIndex: 300, width: 36, height: 36, borderRadius: '50%',
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

      {/* Reset personalização */}
      <button
        id="reset-btn"
        title="Personalizar apresentação"
        style={{
          position: 'fixed',
          bottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
          left: 'calc(68px + env(safe-area-inset-left, 0px))',
          zIndex: 300, width: 36, height: 36, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'transparent', color: 'rgba(255,255,255,0.18)',
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: 16, lineHeight: '1',
          transition: 'all .25s',
        }}
      >↺</button>

      {/* Hamburger */}
      <button id="hbtn"><span /><span /><span /></button>
      <div id="hoverlay" />
      <div id="hdrawer">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: '#888', margin: 0 }}>Navegar</p>
          <button id="hclose" style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#888', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, lineHeight: '1' }}>×</button>
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
