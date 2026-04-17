import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "bruno@saltoup.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "contato@saltoup.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — email not sent");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: `Salto Website <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Novo contato: ${name}`,
      tags: [{ name: "source", value: "website-contact" }],
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0e0e0e; color: #f5f5f5; padding: 32px; border-radius: 12px;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 32px;">
            <div style="background: #FF5C00; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              ↑
            </div>
            <span style="font-weight: 900; font-size: 20px; letter-spacing: -1px;">SALTO</span>
          </div>
          <h2 style="color: #FF5C00; margin: 0 0 24px; font-size: 18px;">Novo contato pelo site</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252525; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; width: 120px;">Nome</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252525; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #252525; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">E-mail</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #252525;"><a href="mailto:${email}" style="color: #FF5C00;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">WhatsApp</td>
              <td style="padding: 12px 0;"><a href="https://wa.me/${phone.replace(/\D/g, '')}" style="color: #FF5C00;">${phone}</a></td>
            </tr>
          </table>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #252525; font-size: 11px; color: #555;">
            Enviado via saltoup.com
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
