/** @type {import('next').NextConfig} */
const nextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         {
  //           key: 'Cross-Origin-Opener-Policy',
  //           value: 'same-origin allow-popups',
  //         },
  //       ],
  //     },
  //   ];
  // },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  reactStrictMode: true, 
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  compiler: {
    // removeConsole: {
    //   exclude: ['error'],
    // },
  },
  images: {
    unoptimized: true,
  },
  pageExtensions: ['mdx', 'md', 'jsx', 'js', 'tsx', 'ts'],
  output: 'export',
};

module.exports = nextConfig;
