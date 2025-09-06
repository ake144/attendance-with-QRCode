import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 eslint: {
    ignoreDuringBuilds: true,
  },

   images: {
    remotePatterns:[
      {
        hostname:"utfs.io"
      }
    ]
   }
};

export default nextConfig;
