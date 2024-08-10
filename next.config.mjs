/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.dev' : undefined,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
