import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
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
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: '*.private.blob.vercel-storage.com',
      }
    ]
  }
};

export default nextConfig;
