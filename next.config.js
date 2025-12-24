/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Tambahkan ini untuk disable Turbopack secara eksplisit
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    qualities: [60, 65, 70, 75, 80, 85, 90],
  },
  env: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  }
}

module.exports = nextConfig