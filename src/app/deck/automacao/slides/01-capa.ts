const FLOW_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 64" width="120" height="64">
  <!-- Node 1 -->
  <rect x="4" y="22" width="28" height="20" rx="6" fill="none" stroke="#FF5C00" stroke-width="2"/>
  <circle cx="18" cy="32" r="5" fill="#FF5C00" opacity="0.8"/>
  <!-- Arrow 1→2 -->
  <line x1="32" y1="32" x2="48" y2="32" stroke="#FF5C00" stroke-width="1.5" stroke-dasharray="3,2"/>
  <polygon points="48,29 55,32 48,35" fill="#FF5C00"/>
  <!-- Node 2 -->
  <rect x="55" y="22" width="28" height="20" rx="6" fill="rgba(255,92,0,0.15)" stroke="#FF5C00" stroke-width="2"/>
  <path d="M65 30 Q68 26 72 30 Q76 34 79 30" stroke="#FF5C00" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <!-- Arrow 2→3 -->
  <line x1="83" y1="32" x2="99" y2="32" stroke="#FF5C00" stroke-width="1.5" stroke-dasharray="3,2"/>
  <polygon points="99,29 106,32 99,35" fill="#FF5C00"/>
  <!-- Node 3 -->
  <rect x="106" y="22" width="10" height="20" rx="3" fill="#FF5C00"/>
  <!-- Labels -->
  <text x="18" y="52" text-anchor="middle" font-size="6" fill="#888" font-family="sans-serif">GATILHO</text>
  <text x="69" y="52" text-anchor="middle" font-size="6" fill="#888" font-family="sans-serif">PROCESSO</text>
  <text x="111" y="52" text-anchor="middle" font-size="6" fill="#888" font-family="sans-serif">AÇÃO</text>
</svg>`;

export const slidesCapa = `
<!-- ════════════════ S1 — CAPA ════════════════ -->
<div class="slide" data-s="1">
  <div class="gc"></div><div class="gco"></div>
  <div class="ring" style="width:280px;height:280px;--ro:.12;animation-delay:0s"></div>
  <div class="ring" style="width:480px;height:480px;--ro:.08;animation-delay:.8s"></div>
  <div class="ring" style="width:700px;height:700px;--ro:.06;animation-delay:1.6s"></div>
  <div class="ring" style="width:950px;height:950px;--ro:.03;animation-delay:2.4s"></div>

  <div style="position:relative;z-index:10;text-align:center">
    <div data-a style="margin-bottom:20px;display:flex;justify-content:center">
      ${FLOW_SVG}
    </div>
    <p data-a style="font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--muted);margin-bottom:28px">AUTOMAÇÃO INTELIGENTE</p>
    <h1 data-a class="hl mb2" style="font-size:clamp(36px,5vw,68px)">Você ainda faz isso</h1>
    <h1 data-a class="hl hl-acc" style="font-size:clamp(36px,5vw,68px);margin-bottom:28px">na mão?</h1>
    <p data-a style="font-size:clamp(22px,2.8vw,36px);font-weight:700;color:var(--text);max-width:560px;margin:0 auto 16px;line-height:1.3">
      A gente automatiza.
    </p>
    <p data-a style="font-size:clamp(15px,1.6vw,20px);color:var(--muted);max-width:520px;margin:0 auto;line-height:1.7">
      Descubra o que pode ser automático no seu negócio — e quanto tempo você vai recuperar.
    </p>
  </div>
</div>

<!-- ════════════════ S2 — RECONHECE ISSO? ════════════════ -->
<div class="slide" data-s="2">
  <div class="gc" style="opacity:.07"></div>
  <div style="max-width:740px;text-align:center;position:relative;z-index:2">
    <div data-a style="margin-bottom:28px;display:flex;justify-content:center">
      <span class="badge"><span class="dot"></span>UMA PERGUNTA RÁPIDA</span>
    </div>
    <h2 data-a class="hl mb2">Qual dessas tarefas você ou alguém</h2>
    <h2 data-a class="hl hl-acc" style="margin-bottom:36px">da equipe faz todo dia?</h2>

    <div data-a style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:32px">
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="message-circle" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Responder as mesmas perguntas no WhatsApp</p>
      </div>
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="clock" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Lembrar clientes de pagar</p>
      </div>
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="calendar" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Confirmar agendamentos um por um</p>
      </div>
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="file-text" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Preencher planilhas manualmente</p>
      </div>
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="bell" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Avisar sobre pedidos prontos</p>
      </div>
      <div class="card" style="padding:18px 16px;display:flex;align-items:flex-start;gap:12px;text-align:left">
        <i data-lucide="repeat" style="font-size:18px;color:var(--accent);flex-shrink:0;margin-top:2px"></i>
        <p class="clink">Copiar dado de um sistema para outro</p>
      </div>
    </div>

    <p data-a style="font-size:15px;color:var(--muted);line-height:1.85">
      Se você reconheceu pelo menos uma — <span style="color:var(--text);font-weight:700">temos conversa.</span>
    </p>
  </div>
</div>
`;
