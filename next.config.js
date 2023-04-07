/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "timmousk.com",
      },
    ],
  },
};

module.exports = nextConfig;
