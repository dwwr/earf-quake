import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Storybook iframe build is for humans; keep crawlers on the product page.
      disallow: ["/storybook/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
