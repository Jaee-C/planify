/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/:pKey/settings",
        destination: "/:pKey/settings/details",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
