import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3001/api',
  },
};

export default nextConfig;
