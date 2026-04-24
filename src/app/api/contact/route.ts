import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import NovoContato from "@/emails/novo-contato";
import ConfirmacaoContato from "@/emails/confirmacao-contato";

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
      react: NovoContato({ name, email, phone }),
    });

    // Email de confirmação para o visitante
    await resend.emails.send({
      from: `Bruno Vieira | Salto <${FROM_EMAIL}>`,
      to: email,
      subject: "Recebi sua mensagem! 🚀",
      react: ConfirmacaoContato({ name }),
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
