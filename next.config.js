/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Use the repository name for base path in production
  basePath: process.env.NODE_ENV === 'production' ? '/WPMGAME' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/WPMGAME/' : '',
  trailingSlash: false, // Recommended for static exports to avoid issues with path resolution
  allowedDevOrigins: ["http://localhost:3001", "http://192.168.1.45:3001"],
};

module.exports = nextConfig;
