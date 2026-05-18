export const slidesAbertura = `

<!-- ════════════════════════════════════════
     S1 — CAPA
════════════════════════════════════════ -->
<div class="slide" data-s="1">
  <div class="gc"></div><div class="gco"></div>
  <div class="ring" style="width:280px;height:280px;--ro:.12;animation-delay:0s"></div>
  <div class="ring" style="width:480px;height:480px;--ro:.08;animation-delay:.8s"></div>
  <div class="ring" style="width:700px;height:700px;--ro:.06;animation-delay:1.6s"></div>
  <div class="ring" style="width:950px;height:950px;--ro:.03;animation-delay:2.4s"></div>

  <div style="position:relative;z-index:10;text-align:center">

    <!-- Logos -->
    <div data-a style="display:flex;align-items:center;justify-content:center;gap:20px;margin-bottom:36px">
      <img src="/logo.svg" alt="Salto" style="height:32px;width:auto;opacity:0.9">
      <div style="width:1px;height:32px;background:rgba(255,255,255,0.12)"></div>
      <div style="display:flex;align-items:center;gap:6px">
        <span style="font-size:22px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1">WB</span>
        <div style="line-height:1">
          <p style="font-size:8px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#555;margin:0">Digital</p>
          <p style="font-size:8px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#555;margin:0">Solutions</p>
        </div>
      </div>
    </div>

    <!-- Saudação personalizada -->
    <div data-a style="margin-bottom:16px;display:flex;align-items:center;justify-content:center;gap:12px">
      <span id="s1company-label" style="display:none;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.3)"></span>
    </div>

    <h1 data-a style="font-size:clamp(28px,3.8vw,52px);font-weight:900;letter-spacing:-1.5px;line-height:1;color:#f5f5f5;margin-bottom:12px">
      <span id="s1name-greeting"></span>tudo o que você precisa
    </h1>
    <h1 data-a style="font-size:clamp(28px,3.8vw,52px);font-weight:900;letter-spacing:-1.5px;line-height:1;background:linear-gradient(to right,#FF5C00,#FF7A28,#FF3D00);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:32px">
      para crescer online.
    </h1>

    <p data-a style="font-size:15px;color:#666;max-width:400px;margin:0 auto;line-height:1.6">
      Estratégia comercial · Automação · Presença digital · Inteligência artificial
    </p>

    <div id="s1logo-wrap" style="display:none;margin-top:28px">
      <img id="s1logo" src="" alt="" style="max-height:48px;max-width:200px;object-fit:contain;opacity:0.75;display:block;margin:0 auto">
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     S2 — QUEM SOMOS
════════════════════════════════════════ -->
<div class="slide" data-s="2">
  <div class="gco"></div>
  <div class="wfull mw900">
    <div data-a class="badge mb8"><span class="dot"></span>QUEM ESTÁ COM VOCÊ</div>
    <h2 data-a class="hl mb10">Um ecossistema completo<br>para o seu negócio.</h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

      <!-- Salto -->
      <div data-a style="border:1px solid rgba(255,92,0,0.2);border-radius:16px;background:rgba(255,92,0,0.04);padding:28px 26px;display:flex;flex-direction:column;gap:20px">
        <div>
          <img src="/logo.svg" alt="Salto" style="height:26px;width:auto;display:block;margin-bottom:14px">
          <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px">Estratégia Comercial</p>
          <p style="font-size:14px;color:var(--muted);line-height:1.6">Estruturamos o processo comercial de PMEs para crescer de forma previsível — do lead ao cliente recorrente.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <div style="display:flex;align-items:center;gap:10px">
            <div class="svc-dot"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Metodologia e Playbook</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="svc-dot"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">CRM e funil de vendas</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="svc-dot"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">90 dias para resultado</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div class="svc-dot"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Treinamento do time comercial</span>
          </div>
        </div>
        <div style="padding-top:14px;border-top:1px solid rgba(255,92,0,0.15)">
          <p style="font-size:11px;color:#555">Bruno Vieira · Fundador · 20+ anos em vendas · FGV · 4 idiomas</p>
        </div>
      </div>

      <!-- WB Digital -->
      <div data-a style="border:1px solid rgba(255,255,255,0.07);border-radius:16px;background:rgba(255,255,255,0.02);padding:28px 26px;display:flex;flex-direction:column;gap:20px">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <span style="font-size:26px;font-weight:900;color:#fff;letter-spacing:-1px;line-height:1">WB</span>
            <span style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#555">Digital Solutions</span>
          </div>
          <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64B5F6;margin-bottom:8px">Tecnologia e Inovação</p>
          <p style="font-size:14px;color:var(--muted);line-height:1.6">Soluções digitais premium — sites, plataformas, automação e IA — para empresas que querem crescer online.</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:6px;height:6px;border-radius:50%;background:#64B5F6;flex-shrink:0"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Sites, Plataformas e E-commerce</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:6px;height:6px;border-radius:50%;background:#64B5F6;flex-shrink:0"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Automação de processos</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:6px;height:6px;border-radius:50%;background:#64B5F6;flex-shrink:0"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Inteligência Artificial e Dados</span>
          </div>
          <div style="display:flex;align-items:center;gap:10px">
            <div style="width:6px;height:6px;border-radius:50%;background:#64B5F6;flex-shrink:0"></div>
            <span style="font-size:13px;color:var(--text);font-weight:600">Apps e sistemas customizados</span>
          </div>
        </div>
        <div style="padding-top:14px;border-top:1px solid rgba(255,255,255,0.06)">
          <p style="font-size:11px;color:#555">wbdigitalsolutions.com · Soluções premium e exclusivas</p>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     S3 — AS 4 FRENTES
════════════════════════════════════════ -->
<div class="slide" data-s="3">
  <div class="gc" style="opacity:.06"></div>
  <div class="wfull" style="max-width:820px;text-align:center">
    <div data-a class="badge mb8" style="margin-left:auto;margin-right:auto"><span class="dot"></span>TUDO EM UM ECOSSISTEMA</div>
    <h2 data-a class="hl mb2">4 frentes.</h2>
    <h2 data-a class="hl hl-acc mb10">1 objetivo: crescer.</h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;text-align:left">

      <!-- Google -->
      <div data-a style="border:1px solid rgba(66,133,244,0.25);border-radius:16px;background:rgba(66,133,244,0.04);padding:24px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <div>
            <p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#4285F4;margin:0 0 2px">Frente 01</p>
            <p style="font-size:15px;font-weight:800;color:#f5f5f5;margin:0">Google Meu Negócio</p>
          </div>
        </div>
        <p style="font-size:13px;color:var(--muted);line-height:1.55;margin:0">Apareça quando seu cliente está buscando. Perfil completo, reviews e presença no Maps.</p>
      </div>

      <!-- Automação -->
      <div data-a style="border:1px solid rgba(255,92,0,0.25);border-radius:16px;background:rgba(255,92,0,0.04);padding:24px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(255,92,0,0.15);border:1px solid rgba(255,92,0,0.35);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF5C00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </div>
          <div>
            <p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin:0 0 2px">Frente 02</p>
            <p style="font-size:15px;font-weight:800;color:#f5f5f5;margin:0">Automação</p>
          </div>
        </div>
        <p style="font-size:13px;color:var(--muted);line-height:1.55;margin:0">WhatsApp inteligente, CRM e fluxos automáticos. Nunca perca um lead por falta de resposta.</p>
      </div>

      <!-- Sites e Plataformas -->
      <div data-a style="border:1px solid rgba(100,181,246,0.2);border-radius:16px;background:rgba(100,181,246,0.03);padding:24px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(100,181,246,0.1);border:1px solid rgba(100,181,246,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64B5F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <div>
            <p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#64B5F6;margin:0 0 2px">Frente 03 · WB</p>
            <p style="font-size:15px;font-weight:800;color:#f5f5f5;margin:0">Sites e Plataformas</p>
          </div>
        </div>
        <p style="font-size:13px;color:var(--muted);line-height:1.55;margin:0">Presença digital exclusiva e de alta performance. Landing pages, e-commerce, sistemas sob medida.</p>
      </div>

      <!-- IA e Dados -->
      <div data-a style="border:1px solid rgba(139,92,246,0.2);border-radius:16px;background:rgba(139,92,246,0.03);padding:24px;display:flex;flex-direction:column;gap:14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:28px;height:28px;border-radius:50%;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8v.5A3.5 3.5 0 0 0 7.5 14h.5v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4h.5a3.5 3.5 0 0 0 3.5-3.5V10a8 8 0 0 0-8-8z"/></svg>
          </div>
          <div>
            <p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#8B5CF6;margin:0 0 2px">Frente 04 · WB</p>
            <p style="font-size:15px;font-weight:800;color:#f5f5f5;margin:0">IA e Dados</p>
          </div>
        </div>
        <p style="font-size:13px;color:var(--muted);line-height:1.55;margin:0">Chatbots, análise preditiva e automação avançada. Transforme dados em decisões e obstáculos em vantagens.</p>
      </div>

    </div>
  </div>
</div>
`;
