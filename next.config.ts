import type { NextConfig } from "next";
import { APP_CONFIG } from "./app/config";

const nextConfig: NextConfig = {
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  poweredByHeader: false,
  typedRoutes: true,
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        source: "/:path*{/}?",
        headers: [
          // Keep the prerendered shell streaming through nginx.
          { key: "X-Accel-Buffering", value: "no" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Content-Security-Policy",
            // Compatible with static rendering; script-src is project-specific.
            value:
              "base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'",
          },
          ...(process.env.NODE_ENV === "production" &&
          new URL(APP_CONFIG.url).protocol === "https:"
            ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]
            : []),
          ...(!APP_CONFIG.isIndexable
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
