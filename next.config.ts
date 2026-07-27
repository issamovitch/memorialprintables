import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: ["*"],
  async redirects() {
    return [
      {
        source: "/free/funeral/program/generator",
        destination: "/free-funeral-program-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
