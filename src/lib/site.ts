function withHttps(hostOrUrl: string): string {
  const trimmed = hostOrUrl.trim().replace(/\/$/, "");
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/** Public origin — no trailing slash. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) {
    return withHttps(configured);
  }
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (production) {
    return withHttps(production);
  }
  if (process.env.VERCEL_URL) {
    return withHttps(process.env.VERCEL_URL);
  }
  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path === "/") {
    return base;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const ADSENSE_CLIENT = /^ca-pub-\d+$/;
const GA_ID = /^(G|GT|GTM|AW)-[A-Z0-9]+$/i;

/** Google AdSense publisher id (`ca-pub-…`). Empty until set in env. */
export function getAdsenseClient(): string | undefined {
  const value = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim();
  return value && ADSENSE_CLIENT.test(value) ? value : undefined;
}

/** Optional manual display unit id (digits only). Empty → Auto ads only. */
export function getAdsenseSlot(): string | undefined {
  const value = process.env.NEXT_PUBLIC_ADSENSE_SLOT?.trim();
  return value && /^\d+$/.test(value) ? value : undefined;
}

/** Google Analytics 4 measurement id (`G-…`). Optional. */
export function getGaId(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return value && GA_ID.test(value) ? value : undefined;
}

/** Search Console HTML-tag verification token. Optional. */
export function getGscVerification(): string | undefined {
  const value = process.env.NEXT_PUBLIC_GSC_VERIFICATION?.trim();
  return value || undefined;
}

/** Optional public contact email for /contact. */
export function getContactEmail(): string | undefined {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : undefined;
}
