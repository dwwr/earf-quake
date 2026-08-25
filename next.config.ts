import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  // Storybook HTML uses relative asset URLs (./sb-manager/...). Those only
  // resolve under /storybook/ when the trailing slash is kept.
  skipTrailingSlashRedirect: true,

  // In production, static Storybook lives at public/storybook (prebuild).
  // In development, proxy to the Storybook dev server (npm run storybook).
  // Storybook listens at / — not /storybook/ — despite vite base settings.
  async rewrites() {
    if (!isDev) return [];
    return [
      {
        source: "/storybook",
        destination: "http://localhost:6006/",
      },
      {
        source: "/storybook/",
        destination: "http://localhost:6006/",
      },
      {
        source: "/storybook/:path*",
        destination: "http://localhost:6006/:path*",
      },
    ];
  },
};

export default nextConfig;
