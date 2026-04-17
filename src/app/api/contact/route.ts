import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, business } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // TODO: integrar com serviço de e-mail (Resend, SendGrid, etc.)
    // Por ora, loga e retorna sucesso para validar o fluxo
    console.log("Contact form submission:", { name, email, phone, business });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
