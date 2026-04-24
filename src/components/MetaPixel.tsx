"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie.split("; ").find((r) => r.startsWith(name + "="))?.split("=")[1];
}

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    const eventId = uid();

    window.fbq?.("track", "PageView", {}, { eventID: eventId });

    fetch("/api/meta-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "PageView",
        event_id: eventId,
        event_source_url: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
