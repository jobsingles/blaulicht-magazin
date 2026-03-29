import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/magazin',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blaulichtsingles.ch',
      },
    ],
  },
};

export default nextConfig;
