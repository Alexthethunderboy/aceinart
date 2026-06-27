import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com', // For placeholders if needed
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For mock data images
      }
    ],
  },
  serverExternalPackages: ['@sanity/vision', 'isomorphic-dompurify', 'jsdom'],
};

export default nextConfig;
