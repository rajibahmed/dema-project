/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['sequelize', 'sequelize-typescript'],
  },
  webpack: (config, { webpack }) => {
    return config;
  },
};

export default nextConfig;
