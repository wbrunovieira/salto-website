const GOOGLE_G_LG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;

const GOOGLE_G_MD = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;

export const slidesRealidade = `
<!-- ════════════════ S3 — A REALIDADE ════════════════ -->
<div class="slide" data-s="3">
  <div class="gco"></div>
  <div class="wfull mw860">
    <div data-a class="badge mb8"><span class="dot"></span>A REALIDADE DO MERCADO</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center">

      <div>
        <h2 data-a class="hl mb2">Os números</h2>
        <h2 data-a class="hl hl-acc mb8">não mentem.</h2>
        <p data-a style="font-size:15px;color:var(--muted);line-height:1.85;margin-bottom:20px">
          A busca local é a principal forma de descobrir empresas hoje — em qualquer cidade, em qualquer setor.
        </p>
        <div data-a style="padding:16px 20px;border-left:2px solid var(--accent);background:rgba(255,92,0,.04);border-radius:0 8px 8px 0">
          <p style="font-size:14px;color:var(--muted);line-height:1.7;font-style:italic">"Você vende bem mas não aparece no Google? Está trabalhando para o concorrente que aparece."</p>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;gap:12px">
        <div data-a class="card card-hot" style="padding:22px 26px;text-align:center">
          <p style="font-size:clamp(52px,7vw,80px);font-weight:900;color:var(--accent);line-height:1;margin-bottom:8px">93%</p>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">dos consumidores usaram o Google para encontrar um negócio local no último ano</p>
          <p style="font-size:10px;color:rgba(255,255,255,0.2);margin-top:8px;letter-spacing:1px">BrightLocal · Local Consumer Review Survey 2023</p>
        </div>
        <div data-a class="card" style="padding:16px 22px;display:flex;align-items:center;gap:18px">
          <p style="font-size:clamp(28px,3.5vw,42px);font-weight:900;color:var(--text);line-height:1;flex-shrink:0;white-space:nowrap">1 em 3</p>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">buscas no celular tem intenção local — alguém procurando perto de você</p>
        </div>
        <div data-a class="card" style="padding:16px 22px;display:flex;align-items:center;gap:18px">
          <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
            ${GOOGLE_G_LG}
          </div>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">custo zero — o Google Business Profile é 100% gratuito para qualquer empresa</p>
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ════════════════ S4 — ASSIM FICA NO GOOGLE ════════════════ -->
<div class="slide" data-s="4">
  <div class="gco"></div>
  <div class="wfull mw900">
    <div data-a style="margin-bottom:16px;display:flex;justify-content:center">
      ${GOOGLE_G_MD}
    </div>
    <div data-a class="badge mb6"><span class="dot"></span>ASSIM FICA NO GOOGLE</div>
    <h2 data-a class="hl mb2">É isso que o cliente vê</h2>
    <h2 data-a class="hl hl-acc mb8">quando procura por você.</h2>

    <div style="display:grid;grid-template-columns:1fr auto;gap:28px;align-items:start">

      <!-- Left: feature list -->
      <div style="display:flex;flex-direction:column;gap:9px;padding-top:4px">
        <div data-a style="display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border:1px solid var(--border);border-radius:10px;background:rgba(255,255,255,.02)">
          <i data-lucide="map-pin" style="font-size:17px;color:var(--accent);flex-shrink:0;margin-top:1px"></i>
          <div><p style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px">Nome, endereço e mapa</p><p style="font-size:12px;color:var(--muted);line-height:1.5">Aparece no Maps e na busca com a distância até você</p></div>
        </div>
        <div data-a style="display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border:1px solid var(--border);border-radius:10px;background:rgba(255,255,255,.02)">
          <i data-lucide="star" style="font-size:17px;color:var(--accent);flex-shrink:0;margin-top:1px"></i>
          <div><p style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px">Avaliações e estrelas</p><p style="font-size:12px;color:var(--muted);line-height:1.5">Prova social antes do primeiro contato</p></div>
        </div>
        <div data-a style="display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border:1px solid var(--border);border-radius:10px;background:rgba(255,255,255,.02)">
          <i data-lucide="phone-call" style="font-size:17px;color:var(--accent);flex-shrink:0;margin-top:1px"></i>
          <div><p style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px">Ligar, rota e WhatsApp em 1 toque</p><p style="font-size:12px;color:var(--muted);line-height:1.5">O cliente age na hora — sem fricção</p></div>
        </div>
        <div data-a style="display:flex;align-items:flex-start;gap:13px;padding:13px 16px;border:1px solid rgba(255,92,0,.2);border-radius:10px;background:rgba(255,92,0,.04)">
          <i data-lucide="image" style="font-size:17px;color:var(--accent);flex-shrink:0;margin-top:1px"></i>
          <div><p style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:3px">Fotos do produto e ambiente</p><p style="font-size:12px;color:var(--muted);line-height:1.5">Cliente vê o que vai encontrar antes de sair de casa</p></div>
        </div>
      </div>

      <!-- Right: mock Google knowledge panel -->
      <div data-a style="width:270px;flex-shrink:0;background:#202124;border-radius:14px;overflow:hidden;font-family:Arial,sans-serif">
        <!-- Photos strip -->
        <div style="display:grid;grid-template-columns:2fr 1fr;height:90px;gap:2px">
          <div style="background:linear-gradient(135deg,#2d3748,#1a202c);display:flex;align-items:center;justify-content:center">
            <i data-lucide="utensils" style="font-size:28px;color:rgba(255,255,255,.2)"></i>
          </div>
          <div style="display:grid;grid-rows:1fr 1fr;gap:2px">
            <div style="background:linear-gradient(135deg,#2a4365,#1a365d);display:flex;align-items:center;justify-content:center">
              <i data-lucide="pizza" style="font-size:14px;color:rgba(255,255,255,.2)"></i>
            </div>
            <div style="background:linear-gradient(135deg,#322659,#1a1a2e);display:flex;align-items:center;justify-content:center">
              <i data-lucide="coffee" style="font-size:14px;color:rgba(255,255,255,.2)"></i>
            </div>
          </div>
        </div>
        <!-- Info -->
        <div style="padding:14px 16px">
          <p style="font-size:17px;font-weight:700;color:#e8eaed;margin-bottom:3px">Pizzaria do João</p>
          <p style="font-size:12px;color:#9aa0a6;margin-bottom:8px">Pizzaria · <span style="color:#4db46e">Aberto agora</span> · fecha às 22h</p>
          <div style="display:flex;align-items:center;gap:5px;margin-bottom:12px">
            <span style="color:#FBBC04;font-size:13px;letter-spacing:1px">★★★★★</span>
            <span style="font-size:13px;font-weight:700;color:#FBBC04">4.8</span>
            <span style="font-size:12px;color:#9aa0a6">(127)</span>
          </div>
          <!-- Actions -->
          <div style="display:flex;gap:6px;margin-bottom:12px">
            <div style="flex:1;padding:8px 0;border-radius:100px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#e8eaed;font-size:11px;font-weight:600;text-align:center">Rotas</div>
            <div style="flex:1;padding:8px 0;border-radius:100px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#e8eaed;font-size:11px;font-weight:600;text-align:center">Ligar</div>
            <div style="flex:1;padding:8px 0;border-radius:100px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);color:#e8eaed;font-size:11px;font-weight:600;text-align:center">Site</div>
          </div>
          <!-- Details -->
          <div style="display:flex;flex-direction:column;gap:8px">
            <div style="display:flex;gap:10px;align-items:flex-start">
              <i data-lucide="map-pin" style="font-size:13px;color:#9aa0a6;flex-shrink:0;margin-top:1px"></i>
              <span style="font-size:12px;color:#9aa0a6">Rua das Flores, 123 · SP</span>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <i data-lucide="phone" style="font-size:13px;color:#9aa0a6;flex-shrink:0;margin-top:1px"></i>
              <span style="font-size:12px;color:#8ab4f8">(11) 9 8888-7777</span>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <i data-lucide="clock" style="font-size:13px;color:#9aa0a6;flex-shrink:0;margin-top:1px"></i>
              <span style="font-size:12px;color:#4db46e">Aberto · fecha 22:00</span>
            </div>
          </div>
        </div>
        <!-- Footer -->
        <div style="padding:8px 16px 12px;border-top:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:6px">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" style="flex-shrink:0"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          <span style="font-size:10px;color:#9aa0a6;font-weight:600">Google</span>
          <span style="font-size:10px;color:#5f6368">· Perfil do negócio</span>
        </div>
      </div>

    </div>
  </div>
</div>
`;
