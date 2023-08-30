/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/:orgKey/:pKey/settings",
        destination: "/:orgKey/:pKey/settings/details",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
