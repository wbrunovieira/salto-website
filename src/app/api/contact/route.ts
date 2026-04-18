import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "bruno@saltoup.com";
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "contato@saltoup.com";

// Simple in-memory rate limiter (5 requests per IP per hour)
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 3600_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { name, email, phone, _trap } = await req.json();

    // Honeypot — bots preenchem este campo oculto, humanos não
    if (_trap) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not set — email not sent");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Email para Bruno
    await resend.emails.send({
      from: `${name} via Salto <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      replyTo: email,
      subject: `Novo contato: ${name}`,
      tags: [{ name: "source", value: "website-contact" }],
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#f5f5f5;padding:32px;border-radius:12px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px;">
            <div style="background:#FF5C00;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">↑</div>
            <span style="font-weight:900;font-size:20px;letter-spacing:-1px;">SALTO</span>
          </div>
          <h2 style="color:#FF5C00;margin:0 0 24px;font-size:18px;">Novo contato pelo site</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:12px 0;border-bottom:1px solid #252525;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;width:120px;">Nome</td><td style="padding:12px 0;border-bottom:1px solid #252525;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:12px 0;border-bottom:1px solid #252525;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;">E-mail</td><td style="padding:12px 0;border-bottom:1px solid #252525;"><a href="mailto:${email}" style="color:#FF5C00;">${email}</a></td></tr>
            <tr><td style="padding:12px 0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:2px;">WhatsApp</td><td style="padding:12px 0;"><a href="https://wa.me/${phone.replace(/\D/g, "")}" style="color:#FF5C00;">${phone}</a></td></tr>
          </table>
          <div style="margin-top:32px;padding-top:24px;border-top:1px solid #252525;font-size:11px;color:#555;">Enviado via saltoup.com</div>
        </div>`,
    });

    // Email de confirmação para o visitante
    await resend.emails.send({
      from: `Bruno Vieira | Salto <${FROM_EMAIL}>`,
      to: email,
      subject: "Recebi sua mensagem! 🚀",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0e0e0e;color:#f5f5f5;padding:32px;border-radius:12px;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:32px;">
            <div style="background:#FF5C00;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;">↑</div>
            <span style="font-weight:900;font-size:20px;letter-spacing:-1px;">SALTO</span>
          </div>
          <h2 style="color:#FF5C00;margin:0 0 16px;font-size:20px;">Olá, ${name}! 👋</h2>
          <p style="margin:0 0 16px;line-height:1.6;color:#f5f5f5;">Recebi sua mensagem e já está na minha fila de prioridade.</p>
          <p style="margin:0 0 24px;line-height:1.6;color:#888;">Entrarei em contato em até <strong style="color:#f5f5f5;">24 horas</strong>. Se preferir, pode me chamar diretamente no WhatsApp:</p>
          <a href="https://wa.me/5511982864581" style="display:inline-block;background:linear-gradient(135deg,#FF5C00,#FF3D00);color:#fff;font-weight:700;padding:14px 28px;border-radius:999px;text-decoration:none;font-size:14px;">Falar no WhatsApp →</a>
          <div style="margin-top:40px;padding-top:24px;border-top:1px solid #252525;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#f5f5f5;">Bruno Vieira</p>
            <p style="margin:4px 0 0;font-size:12px;color:#888;">Fundador · Salto</p>
            <p style="margin:4px 0 0;font-size:12px;color:#555;">saltoup.com</p>
          </div>
        </div>`,
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
