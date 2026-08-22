import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /diagrams is the canonical diagram hub; the category route duplicated it.
      { source: "/category/diagrams", destination: "/diagrams", permanent: true },
    ];
  },
};

export default nextConfig;
