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
          ...(!APP_CONFIG.isIndexable
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : []),
        ],
      },
    ];
  },
};

export default nextConfig;
