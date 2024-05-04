/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "y5tgmuhohl8uu9z7.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
