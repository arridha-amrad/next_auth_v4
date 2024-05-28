/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images.pexels.com",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
