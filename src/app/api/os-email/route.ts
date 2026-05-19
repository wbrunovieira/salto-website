import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import OrdemServicoCliente from '@/emails/ordem-servico-cliente';
import OrdemServicoInterno from '@/emails/ordem-servico-interno';

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
      console.warn('RESEND_API_KEY not set — OS email not sent');
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const empresa = nomeFantasia || responsavel || 'Novo cliente';

    const attachment = pdfBase64
      ? [{ filename: `OS-${osNum}.pdf`, content: pdfBase64 }]
      : [];

    // Email para Bruno — sempre enviado, bloco independente
    await resend.emails.send({
      from: `Salto OS <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `🧾 Nova OS #${osNum} — ${empresa}`,
      react: OrdemServicoInterno({ osNum, date, nomeFantasia, razaoSocial, cnpj, endereco, bairro, cidade, estado, cep, responsavel, telefone, email, items, obs, total }),
      attachments: attachment,
    });

    // Email para o cliente — Resend retorna { data, error } em vez de lançar exceção
    let clientEmailError: string | null = null;
    if (email) {
      const { error: clientErr } = await resend.emails.send({
        from: `Bruno Vieira | Salto <${FROM_EMAIL}>`,
        to: email,
        replyTo: TO_EMAIL,
        subject: `Sua Ordem de Serviço #${osNum} — Salto`,
        react: OrdemServicoCliente({ osNum, date, nomeFantasia, responsavel, telefone, items, obs, total }),
        attachments: attachment,
        tags: [
          { name: 'tipo', value: 'os-google' },
          { name: 'os_num', value: String(osNum) },
          { name: 'empresa', value: empresa.slice(0, 64) },
        ],
      });

      if (clientErr) {
        console.error('OS client email error:', clientErr);
        clientEmailError = email;
        // Alerta direto — webhook não captura rejeições na API do Resend
        await resend.emails.send({
          from: `Salto Alerta <${FROM_EMAIL}>`,
          to: TO_EMAIL,
          subject: `⚠️ E-mail inválido na OS #${osNum} — ${empresa}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;color:#1a1a1a">
              <h2 style="color:#cc0000">⚠️ E-mail do cliente não foi entregue</h2>
              <p>O Resend retornou erro ao tentar enviar para o endereço abaixo. Verifique e reenvie manualmente.</p>
              <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:12px">
                <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">OS nº</td><td style="padding:8px 12px">${osNum}</td></tr>
                <tr><td style="padding:8px 12px;font-weight:600">Empresa</td><td style="padding:8px 12px">${empresa}</td></tr>
                <tr style="background:#f5f5f5"><td style="padding:8px 12px;font-weight:600">E-mail inválido</td><td style="padding:8px 12px;color:#cc0000"><strong>${email}</strong></td></tr>
                <tr><td style="padding:8px 12px;font-weight:600">Erro</td><td style="padding:8px 12px;color:#888">${clientErr.message ?? JSON.stringify(clientErr)}</td></tr>
              </table>
            </div>
          `,
        }).catch(() => { /* falha silenciosa — log principal já registrou */ });
      }
    }

    return NextResponse.json({ ok: true, clientEmailError });
  } catch (err) {
    console.error('OS email error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
