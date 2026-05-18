import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import FichaTecnicaEmail from '@/emails/ficha-tecnica';

const TO_EMAIL = 'bruno@saltoup.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'contato@saltoup.com';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { osNum, nomeFantasia, responsavel } = data;

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — ficha email not sent');
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const empresa = nomeFantasia || responsavel || 'Cliente';

    await resend.emails.send({
      from: `Salto OS <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `📋 Ficha Técnica OS #${osNum} — ${empresa}`,
      react: FichaTecnicaEmail(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Ficha email error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
