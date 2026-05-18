import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import OsAutomacaoCliente from '@/emails/os-automacao-cliente';
import OsAutomacaoInterno from '@/emails/os-automacao-interno';

const TO_EMAIL = 'bruno@saltoup.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'contato@saltoup.com';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      osNum, date, nomeFantasia, razaoSocial, cnpj, endereco,
      bairro, cidade, estado, cep,
      responsavel, telefone, email, items, obs, total, pdfBase64,
    } = data;

    if (!process.env.RESEND_API_KEY) {
      console.warn('RESEND_API_KEY not set — OS automacao email not sent');
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const empresa = nomeFantasia || responsavel || 'Novo cliente';

    const attachment = pdfBase64
      ? [{ filename: `Proposta-Automacao-${osNum}.pdf`, content: pdfBase64 }]
      : [];

    // Email para Bruno
    await resend.emails.send({
      from: `Salto OS <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `📋 Proposta OS #${osNum} — ${empresa} — Automação`,
      react: OsAutomacaoInterno({ osNum, date, nomeFantasia, razaoSocial, cnpj, endereco, bairro, cidade, estado, cep, responsavel, telefone, email, items, obs, total }),
      attachments: attachment,
    });

    // Email para o cliente
    if (email) {
      await resend.emails.send({
        from: `Bruno Vieira | Salto <${FROM_EMAIL}>`,
        to: email,
        replyTo: TO_EMAIL,
        subject: `Sua Proposta Comercial #${osNum} — Salto Automação`,
        react: OsAutomacaoCliente({ osNum, date, nomeFantasia, responsavel, telefone, items, obs, total }),
        attachments: attachment,
        tags: [
          { name: 'tipo', value: 'os-automacao' },
          { name: 'os_num', value: String(osNum) },
          { name: 'empresa', value: empresa.slice(0, 64) },
        ],
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('OS automacao email error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
