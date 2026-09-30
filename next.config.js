/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/services/whatsapp-api-sms-automation',
        destination: '/services/whatsapp-api-msgs-automation',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
