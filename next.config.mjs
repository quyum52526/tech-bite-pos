/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Hero photos live in /public/images/hero; next/image serves them as AVIF/WebP at the right size.
    formats: ["image/avif", "image/webp"],
    // Default hero photos come from Unsplash until local ones are dropped in (see lib/media.ts).
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
