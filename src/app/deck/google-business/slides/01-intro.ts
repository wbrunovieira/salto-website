const GOOGLE_G_XL = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="110" height="110"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;

const GOOGLE_G_SM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" style="display:inline-block;vertical-align:middle;flex-shrink:0"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>`;

export const slidesIntro = `
<!-- ════════════════ S1 — CAPA ════════════════ -->
<div class="slide" data-s="1">
  <div class="gc"></div><div class="gco"></div>
  <div class="ring" style="width:280px;height:280px;--ro:.12;animation-delay:0s"></div>
  <div class="ring" style="width:480px;height:480px;--ro:.08;animation-delay:.8s"></div>
  <div class="ring" style="width:700px;height:700px;--ro:.06;animation-delay:1.6s"></div>
  <div class="ring" style="width:950px;height:950px;--ro:.03;animation-delay:2.4s"></div>

  <div style="position:relative;z-index:10;text-align:center">
    <div data-a style="margin-bottom:20px;display:flex;justify-content:center">
      ${GOOGLE_G_XL}
    </div>
    <p data-a style="font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:var(--muted);margin-bottom:28px">Perfil da Empresa no Google</p>
    <h1 data-a class="hl mb2" style="font-size:clamp(36px,5vw,68px)">Estar no Google</h1>
    <h1 data-a class="hl hl-acc" style="font-size:clamp(36px,5vw,68px);margin-bottom:28px">não custa nada.</h1>
    <p data-a style="font-size:clamp(15px,1.6vw,20px);color:var(--muted);max-width:540px;margin:0 auto;line-height:1.85">
      A ferramenta é gratuita.<br>
      <span style="color:var(--text);font-weight:600">Aparecer bem e converter clientes — é o que a Salto faz.</span>
    </p>
  </div>

</div>

<!-- ════════════════ S2 — A PERGUNTA ════════════════ -->
<div class="slide" data-s="2">
  <div class="gc" style="opacity:.07"></div>
  <div style="max-width:680px;text-align:center;position:relative;z-index:2">
    <div data-a style="margin-bottom:36px;display:flex;justify-content:center">
      <span class="badge"><span class="dot"></span>UMA PERGUNTA SIMPLES</span>
    </div>
    <h2 data-a class="hl mb2">Quando alguém perto daqui</h2>
    <h2 data-a class="hl mb2">procura o que você vende —</h2>
    <h2 data-a class="hl hl-acc" style="margin-bottom:48px">o seu negócio aparece?</h2>
    <p data-a style="font-size:16px;color:var(--muted);line-height:1.85;max-width:460px;margin:0 auto">
      Se não aparece, o cliente vai para o concorrente que está lá.<br>E isso acontece <span style="color:var(--text);font-weight:700">agora — enquanto estamos aqui.</span>
    </p>
  </div>
</div>
`;
