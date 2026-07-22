import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    remotePatterns: [],
  },
  experimental: {
    /**
     * Optimize barrel imports for known large packages.
     * NOTE: embla packages are intentionally excluded — they use CJS default
     * exports that conflict with Next.js 15.5 tree-shaking in dev mode.
     */
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  /**
   * Disable the Next.js 15.5 built-in devtools overlay.
   * The "segment-explorer-node.js#SegmentViewNode" RSC manifest error
   * is a known Next.js 15.5.x bug in the devtools panel.
   * Disabling it keeps the dev server stable.
   */
  devIndicators: false,
};

export default nextConfig;
