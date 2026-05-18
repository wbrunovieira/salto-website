import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { Resend } from 'resend';

const ALERT_TO = 'bruno@saltoup.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'contato@saltoup.com';

type ResendWebhookEvent = {
  type: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    tags?: { name: string; value: string }[];
    created_at: string;
  };
};

const EVENTS_TO_ALERT = new Set([
  'email.bounced',
  'email.delivery_delayed',
  'email.complained',
]);

const EVENT_LABEL: Record<string, string> = {
  'email.bounced': '❌ E-mail rejeitado (bounce)',
  'email.delivery_delayed': '⏳ Entrega com atraso',
  'email.complained': '🚨 Marcado como spam',
};

const TIPO_LABEL: Record<string, string> = {
  'os-google': 'Google Business',
  'os-automacao': 'Automação',
};

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('RESEND_WEBHOOK_SECRET not set — webhook ignored');
    return NextResponse.json({ ok: true });
  }

  const payload = await req.text();
  const headers = {
    'svix-id': req.headers.get('svix-id') ?? '',
    'svix-timestamp': req.headers.get('svix-timestamp') ?? '',
    'svix-signature': req.headers.get('svix-signature') ?? '',
  };

  let event: ResendWebhookEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, headers) as ResendWebhookEvent;
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (!EVENTS_TO_ALERT.has(event.type)) {
    return NextResponse.json({ ok: true });
  }

  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — alert email skipped');
    return NextResponse.json({ ok: true });
  }

  const { data } = event;
  const tags = data.tags ?? [];
  const tipo = tags.find(t => t.name === 'tipo')?.value ?? '';
  const osNum = tags.find(t => t.name === 'os_num')?.value ?? '—';
  const empresa = tags.find(t => t.name === 'empresa')?.value ?? '—';

  // Only alert for our OS emails (both decks); ignore internal emails to Bruno
  if (!tipo.startsWith('os-')) {
    return NextResponse.json({ ok: true });
  }

  const label = EVENT_LABEL[event.type] ?? event.type;
  const tipoLabel = TIPO_LABEL[tipo] ?? tipo;
  const recipient = data.to[0] ?? '—';

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: `Salto Alerta <${FROM_EMAIL}>`,
    to: ALERT_TO,
    subject: `${label} — OS #${osNum} (${tipoLabel})`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#cc0000;margin-bottom:8px">${label}</h2>
        <p style="margin-bottom:16px">O e-mail enviado ao cliente <strong>não foi entregue</strong>. Verifique o endereço e entre em contato manualmente.</p>
        <table style="border-collapse:collapse;width:100%;font-size:14px">
          <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">Deck</td><td style="padding:8px 12px">${tipoLabel}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600">OS nº</td><td style="padding:8px 12px">${osNum}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">Empresa</td><td style="padding:8px 12px">${empresa}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600">E-mail do cliente</td><td style="padding:8px 12px;color:#cc0000"><strong>${recipient}</strong></td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">Assunto enviado</td><td style="padding:8px 12px">${data.subject}</td></tr>
          <tr><td style="padding:8px 12px;font-weight:600">Evento</td><td style="padding:8px 12px">${event.type}</td></tr>
          <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">ID do e-mail</td><td style="padding:8px 12px;font-size:12px;color:#666">${data.email_id}</td></tr>
        </table>
        <p style="margin-top:20px;font-size:13px;color:#888">Salto · Sistema de alertas automáticos</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: true });
}
