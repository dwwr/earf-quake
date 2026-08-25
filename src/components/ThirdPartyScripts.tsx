import Script from "next/script";
import { getAdsenseClient, getGaId } from "@/lib/site";

/**
 * Loads AdSense (when `NEXT_PUBLIC_ADSENSE_CLIENT` is set) and GA4
 * (when `NEXT_PUBLIC_GA_ID` is set). Same pattern as ca-llc-field-manual.
 */
export function ThirdPartyScripts() {
  const adsenseClient = getAdsenseClient();
  const gaId = getGaId();

  return (
    <>
      {adsenseClient ? (
        <Script
          id="adsense"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClient}`}
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      ) : null}
      {gaId ? (
        <>
          <Script
            id="ga4-src"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
    </>
  );
}
