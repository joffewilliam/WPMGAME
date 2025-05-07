/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Use the repository name for base path and asset prefix
  basePath: process.env.NODE_ENV === 'production' ? '/WPMGAME' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/WPMGAME/' : '',
  images: {
    unoptimized: true,
  },
  // Disable trailing slash to avoid navigation issues
  trailingSlash: false,
};

module.exports = nextConfig;
