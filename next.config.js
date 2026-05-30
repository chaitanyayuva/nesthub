const isMobileBuild = process.env.NEXT_PUBLIC_APP_TARGET === 'student' || process.env.NEXT_PUBLIC_APP_TARGET === 'admin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isMobileBuild ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

