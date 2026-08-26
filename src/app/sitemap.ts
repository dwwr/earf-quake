import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const ROUTES = [
  { path: "/", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/about", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
