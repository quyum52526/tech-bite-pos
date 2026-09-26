/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Hero photos live in /public/images/hero; next/image serves them as AVIF/WebP at the right size.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
