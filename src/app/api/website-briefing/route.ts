import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAIL = 'bruno@saltoup.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'contato@saltoup.com';

export async function POST(req: NextRequest) {
  try {
    const { nome, empresa, telefone, email, tipo, obs } = await req.json();

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — website briefing not sent');
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const label = empresa || nome || 'Novo lead';
    const tipoLabel = tipo || '—';

    await resend.emails.send({
      from: `WB Digital <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `🌐 Novo briefing de site — ${label}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:0 auto;color:#1a1a1a">
          <h2 style="color:#1565C0;margin-bottom:8px">🌐 Novo briefing de website</h2>
          <p style="margin-bottom:20px;color:#444">Um cliente preencheu o formulário no deck WB Digital Solutions.</p>
          <table style="border-collapse:collapse;width:100%;font-size:14px">
            <tr style="background:#f5f5f5"><td style="padding:10px 14px;font-weight:600;width:38%">Nome</td><td style="padding:10px 14px">${nome || '—'}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">Empresa</td><td style="padding:10px 14px">${empresa || '—'}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px 14px;font-weight:600">Telefone</td><td style="padding:10px 14px">${telefone || '—'}</td></tr>
            <tr><td style="padding:10px 14px;font-weight:600">E-mail</td><td style="padding:10px 14px">${email || '—'}</td></tr>
            <tr style="background:#f5f5f5"><td style="padding:10px 14px;font-weight:600">Tipo de projeto</td><td style="padding:10px 14px;font-weight:700;color:#1565C0">${tipoLabel}</td></tr>
            ${obs ? `<tr><td style="padding:10px 14px;font-weight:600;vertical-align:top">Observações</td><td style="padding:10px 14px;color:#555;line-height:1.6">${obs}</td></tr>` : ''}
          </table>
          <p style="margin-top:20px;font-size:12px;color:#aaa">WB Digital Solutions · Briefing automático via deck</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Website briefing error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
