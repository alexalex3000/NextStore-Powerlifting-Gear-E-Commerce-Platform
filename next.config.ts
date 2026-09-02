import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.delommelsegazet.be',
      },
      {
        protocol: "https",
        hostname: 'blainesumner.com',
      },
      {
        protocol: "https",
        hostname: 'www.blainesumner.com',
      }
    ]
  }
};

export default nextConfig;
