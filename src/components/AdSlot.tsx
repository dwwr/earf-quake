"use client";

import { useEffect } from "react";
import { copy } from "@/content/copy";
import { getAdsenseClient, getAdsenseSlot } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

/**
 * Manual AdSense display unit. Renders only when both
 * `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT` are set.
 * Leave the slot empty to rely on Auto ads alone.
 */
export function AdSlot() {
  const client = getAdsenseClient();
  const slot = getAdsenseSlot();

  useEffect(() => {
    if (!client || !slot) {
      return;
    }
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense throws if the slot is already filled during hot reload.
    }
  }, [client, slot]);

  if (!client || !slot) {
    return null;
  }

  return (
    <aside className="my-2" aria-label={copy.ads.label}>
      <p className="mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">
        {copy.ads.label}
      </p>
      <ins
        className="adsbygoogle block overflow-hidden rounded-xl border border-white/10 bg-[#0b1020]"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
