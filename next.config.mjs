/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/default/:path*",
        destination: "https://viectot.nextform.vn/api/default/:path*",
      },
      {
        source: "/api/buss/:path*",
        destination: "https://viectot.nextform.vn/api/buss/:path*",
      },
      {
        source: "/api/admin/:path*",
        destination: "https://viectot.nextform.vn/api/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
