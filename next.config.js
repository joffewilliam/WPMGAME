/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/YOUR-REPOSITORY-NAME' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/YOUR-REPOSITORY-NAME/' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
