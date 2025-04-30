/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ]
  },
}

module.exports = nextConfig
