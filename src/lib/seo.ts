import { copy } from "@/content/copy";
import { getSiteUrl } from "@/lib/site";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: copy.brand,
    url: getSiteUrl(),
    description: copy.meta.description,
    applicationCategory: "EducationalApplication",
    operatingSystem: "Any",
    inLanguage: "en-US",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
