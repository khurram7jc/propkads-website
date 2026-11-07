/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/services/:slug',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
