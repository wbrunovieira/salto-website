export const slidesIntro = `
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
    <div data-a style="margin-bottom:32px">
      <img src="/logo.svg" alt="Salto" style="width:clamp(320px,42vw,560px);height:auto;display:block;margin:0 auto">
    </div>
    <div data-a style="margin-bottom:24px;display:flex;align-items:center;justify-content:center;gap:16px">
      <span id="s1company-label" style="display:none;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.35)"></span>
      <i data-lucide="handshake" style="font-size:28px;color:var(--accent);opacity:0.7"></i>
      <span id="s1salto-label" style="display:none;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.35)">Salto</span>
    </div>
    <p data-a class="mu" style="font-size:clamp(16px,1.6vw,20px);line-height:1.75;max-width:520px;margin:0 auto"><span id="s1name-greeting"></span>obrigado pelo seu tempo<br>e pela oportunidade dessa conversa.</p>
    <div id="s1logo-wrap" style="display:none;margin-top:28px">
      <img id="s1logo" src="" alt="" style="max-height:56px;max-width:220px;object-fit:contain;opacity:0.8;display:block;margin:0 auto">
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     S2 — APRESENTAÇÃO
════════════════════════════════════════ -->
<div class="slide" data-s="2">
  <div class="gco"></div>
  <div class="wfull mw900">
    <div data-a class="badge mb8"><span class="dot"></span>QUEM ESTÁ COM VOCÊ HOJE</div>

    <div style="display:grid;grid-template-columns:1.1fr 1fr;gap:20px;align-items:start">

      <!-- Coluna esquerda: Bruno -->
      <div>
        <div data-a class="card" style="padding:30px;margin-bottom:16px">
          <img src="/logo.svg" alt="Salto" style="width:90px;height:auto;display:block;margin-bottom:18px;opacity:0.75">
          <p style="font-size:34px;font-weight:900;letter-spacing:-1.5px;line-height:1;margin-bottom:6px">Bruno Vieira</p>
          <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:4px">Fundador Salto</p>
          <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:20px">Fundador WB Digital Solutions</p>
          <div class="divider" style="margin:0 0 18px"></div>
          <p class="mu lsr" style="font-size:14px;margin-bottom:18px">"Comecei a vender com 13 anos — balconista numa loja de materiais elétricos.<br><br>Depois fui para distribuição: comprava no atacado na Zona Leste e vendia para lojas de construção na Zona Sul de SP.<br><br>São mais de 20 anos vendendo — em segmentos completamente diferentes: tecnologia, empilhadeiras, construção.<br><br>Não sou consultor que nunca vendeu. Conheço o lado de cá do balcão."</p>
          <div style="height:1px;background:var(--border);margin-bottom:14px"></div>
          <p style="font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6">Pai de dois filhos &nbsp;·&nbsp; Esportes de aventura &nbsp;·&nbsp; Chef formado na Itália</p>
        </div>

        <div data-a class="card" style="padding:14px 22px">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px">Formação</p>
          <p style="font-size:13px;color:var(--muted);line-height:1.6">Pós-graduação em Vendas e Marketing · FGV<br>Especialista em Marketing Digital e Técnicas de Vendas</p>
        </div>
      </div>

      <!-- Coluna direita: credenciais em grid -->
      <div style="display:flex;flex-direction:column;gap:10px">

        <div data-a class="card" style="padding:18px 22px">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px">+20 anos de vendas — desde os 13</p>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">Balconista de materiais elétricos → distribuição para lojas de construção (Zona Leste → Zona Sul SP) → Varejo · Tecnologia · Empilhadeiras</p>
        </div>

        <div data-a class="card" style="padding:18px 22px">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:10px">Engenheiro full stack · Designer</p>
          <div style="display:flex;align-items:center;gap:14px;margin-bottom:10px">
            <img src="/wb-logo.svg" alt="WB Digital Solutions" style="width:110px;height:auto;display:block;flex-shrink:0">
            <div style="width:1px;height:24px;background:var(--border);flex-shrink:0"></div>
            <div>
              <p style="font-size:12px;color:var(--muted);line-height:1.4;margin-bottom:4px">Empresa de tecnologia do grupo</p>
              <a href="https://www.wbdigitalsolutions.com" target="_blank" style="font-size:11px;font-weight:700;color:var(--accent);text-decoration:none;letter-spacing:0.5px">wbdigitalsolutions.com ↗</a>
            </div>
          </div>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">Código puro, produto, UX — constrói o que propõe, sem depender de terceiros.</p>
        </div>

        <div data-a class="card" style="padding:18px 22px">
          <p style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:8px">Visão global</p>
          <p style="font-size:13px;color:var(--muted);line-height:1.5">Morou nos EUA, Portugal e Itália. Fala 4 idiomas. Traz perspectiva de como mercados diferentes resolvem os mesmos problemas.</p>
        </div>

        <div data-a class="card" style="padding:14px 20px;display:flex;align-items:center;gap:16px">
          <div style="text-align:center;flex-shrink:0">
            <p style="font-size:22px;font-weight:900;color:var(--text);line-height:1">+20</p>
            <p style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-top:3px">Anos vendendo</p>
          </div>
          <div style="width:1px;height:28px;background:var(--border);flex-shrink:0"></div>
          <p style="font-size:12px;color:var(--muted);line-height:1.5">Em segmentos diferentes — sem depender de um único nicho.</p>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- ════════════════════════════════════════
     S3 — COMO VAI FUNCIONAR
════════════════════════════════════════ -->
<div class="slide" data-s="3">
  <div class="gc" style="opacity:.07"></div>
  <div class="wfull" style="max-width:720px;text-align:center">
    <div data-a style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:40px">
      <span class="badge"><span class="dot"></span>COMO VAI FUNCIONAR HOJE</span>
      <span style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:100px;border:1px solid var(--border);background:rgba(255,255,255,.03);font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--muted)">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        20–30 min
      </span>
    </div>

    <h2 data-a class="hl mb2">Simples, direto</h2>
    <h2 data-a class="hl hl-acc" style="margin-bottom:48px">e sem enrolação.</h2>

    <div data-a style="display:flex;align-items:center;justify-content:center;gap:0">

      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;flex:1">
        <div style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,92,0,0.35);background:rgba(255,92,0,0.08);display:flex;align-items:center;justify-content:center">
          <span style="font-size:15px;font-weight:900;color:var(--accent)">1</span>
        </div>
        <p style="font-size:15px;font-weight:700;color:var(--text);line-height:1.4">Você fala<br><span style="font-weight:400;color:var(--muted);font-size:13px">sobre o seu negócio</span></p>
      </div>

      <div style="flex:0 0 40px;display:flex;align-items:center;justify-content:center;padding-bottom:36px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;flex:1">
        <div style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,92,0,0.35);background:rgba(255,92,0,0.08);display:flex;align-items:center;justify-content:center">
          <span style="font-size:15px;font-weight:900;color:var(--accent)">2</span>
        </div>
        <p style="font-size:15px;font-weight:700;color:var(--text);line-height:1.4">Eu apresento<br><span style="font-weight:400;color:var(--muted);font-size:13px">como a Salto trabalha</span></p>
      </div>

      <div style="flex:0 0 40px;display:flex;align-items:center;justify-content:center;padding-bottom:36px">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </div>

      <div style="display:flex;flex-direction:column;align-items:center;gap:14px;flex:1">
        <div style="width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,92,0,0.35);background:rgba(255,92,0,0.08);display:flex;align-items:center;justify-content:center">
          <span style="font-size:15px;font-weight:900;color:var(--accent)">3</span>
        </div>
        <p style="font-size:15px;font-weight:700;color:var(--text);line-height:1.4">Decidimos juntos<br><span style="font-weight:400;color:var(--muted);font-size:13px">sem pressão, sem pressa</span></p>
      </div>

    </div>

    <p data-a style="margin-top:52px;font-size:14px;color:var(--muted);line-height:1.7;max-width:480px;margin-left:auto;margin-right:auto">
      Você pergunta o que quiser no caminho. Aqui não tem script rígido — tem conversa de verdade.
    </p>
  </div>
</div>

<!-- ════════════════════════════════════════
     S4 — CONVERSA SOBRE A EMPRESA
════════════════════════════════════════ -->
<div class="slide" data-s="4">
  <div class="gco"></div>
  <div class="wfull mw860">
    <div data-a class="badge mb8"><span class="dot"></span>AGORA É A SUA VEZ</div>
    <h2 data-a class="hl mb2">Me conta sobre</h2>
    <h2 data-a class="hl hl-acc mb10">o seu negócio.</h2>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="store" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">O negócio hoje</p>
          <p class="mu" style="font-size:13px;line-height:1.5">O que você vende, para quem, e como o cliente chega até você?</p>
        </div>
      </div>

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="target" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">Onde quer chegar</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Qual o objetivo dos próximos 6 a 12 meses?</p>
        </div>
      </div>

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="funnel" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">O processo comercial</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Como funciona hoje do lead até o fechamento?</p>
        </div>
      </div>

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="alert-triangle" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">O maior gargalo</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Onde sente que o resultado está travando — leads, conversão ou retenção?</p>
        </div>
      </div>

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="flask-conical" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">O que já tentou</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Que ações ou fornecedores já usou? O que funcionou e o que não veio?</p>
        </div>
      </div>

      <div data-a class="card" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="megaphone" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">Marketing</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Faz ou fez marketing digital ou offline? Depende muito de indicação — tem um processo para isso ou acontece de forma espontânea?</p>
        </div>
      </div>

      <div data-a class="card card-hot" style="padding:20px 24px;display:flex;gap:16px;align-items:flex-start">
        <i data-lucide="message-circle" style="font-size:20px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <div>
          <p style="font-size:14px;font-weight:700;color:var(--text);margin-bottom:6px">Algo que queira compartilhar</p>
          <p class="mu" style="font-size:13px;line-height:1.5">Contexto que acha importante eu saber antes de apresentar?</p>
        </div>
      </div>

    </div>
  </div>
</div>
`;
