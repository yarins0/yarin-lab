import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/faceb00k",
        destination: "/faceb00k/index.html",
      },
    ];
  },
};

export default nextConfig;
