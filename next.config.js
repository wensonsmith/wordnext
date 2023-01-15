/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    scrollRestoration: true,
  },
  images: {
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
