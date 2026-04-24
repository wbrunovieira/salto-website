import { createHash } from "crypto";

const PIXEL_ID = "4003723679765029";
const API_VERSION = "v21.0";

function hash(value: string): string {
  return createHash("sha256").update(value.toLowerCase().trim()).digest("hex");
}

export interface MetaEventPayload {
  event_name: string;
  event_id: string;
  event_source_url?: string;
  ip?: string;
  user_agent?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  phone?: string;
}

export async function sendMetaEvent(payload: MetaEventPayload): Promise<void> {
  const token = process.env.META_PIXEL_ACCESS_TOKEN;
  if (!token) return;

  const user_data: Record<string, string> = {};
  if (payload.ip)         user_data.client_ip_address = payload.ip;
  if (payload.user_agent) user_data.client_user_agent = payload.user_agent;
  if (payload.fbp)        user_data.fbp = payload.fbp;
  if (payload.fbc)        user_data.fbc = payload.fbc;
  if (payload.email)      user_data.em = hash(payload.email);
  if (payload.phone)      user_data.ph = hash(payload.phone.replace(/\D/g, ""));

  await fetch(
    `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [{
          event_name: payload.event_name,
          event_time: Math.floor(Date.now() / 1000),
          event_id: payload.event_id,
          action_source: "website",
          event_source_url: payload.event_source_url,
          user_data,
        }],
      }),
    }
  ).catch((err) => console.error("Meta CAPI error:", err));
}
