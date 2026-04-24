import { NextRequest, NextResponse } from "next/server";
import { sendMetaEvent } from "@/lib/meta-capi";

export async function POST(req: NextRequest) {
  try {
    const { event_name, event_id, event_source_url, fbp, fbc } = await req.json();
    if (!event_name || !event_id) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? undefined;
    const user_agent = req.headers.get("user-agent") ?? undefined;

    await sendMetaEvent({ event_name, event_id, event_source_url, ip, user_agent, fbp, fbc });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
