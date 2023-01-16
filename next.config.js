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
  redirects: () => {
    return [
      {
        source: '/gone-with-wind',
        destination: '/articles/dengfenglai',
        permanent: true,
      },
      {
        source: '/2020-02-spring-breeze',
        destination: '/articles/2020-02-spring-breeze',
        permanent: true,
      },
      {
        source: '/react-with-tailwindcss-from-scratch',
        destination: '/articles/react-with-tailwindcss-from-scratch',
        permanent: true,
      },
      {
        source: '/investment-strategy-2020',
        destination: '/articles/investment-strategy-2020',
        permanent: true,
      },
      {
        source: '/2010-2020-lost-golden-decade',
        destination: '/articles/2010-2020-lost-golden-decade',
        permanent: true,
      },
      {
        source: '/win10-add-xiaohe',
        destination: '/articles/win10-add-xiaohe',
        permanent: true,
      },
      {
        source: '/laravel-beyond-curd-actions',
        destination: '/articles/laravel-beyond-curd-actions',
        permanent: true,
      },
      {
        source: '/laravel-beyond-curd-models',
        destination: '/articles/laravel-beyond-curd-models',
        permanent: true,
      },
      {
        source: '/laravel-beyond-curd-working-with-data',
        destination: '/articles/laravel-beyond-curd-working-with-data',
        permanent: true,
      },
      {
        source: '/laravel-beyond-curd-domains',
        destination: '/articles/laravel-beyond-curd-domains',
        permanent: true,
      },
      {
        source: '/laravel-beyond-curd-preface',
        destination: '/articles/laravel-beyond-curd-preface',
        permanent: true,
      },
      {
        source: '/seek-better-me',
        destination: '/articles/keep-looking-dont-settle',
        permanent: true,
      },
    ]
  }
}

module.exports = nextConfig
