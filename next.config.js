/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "seeded-session-images.scdn.co",
      "wrapped-images.spotifycdn.com",
      "mosaic.scdn.co",
      "i.scdn.co",
    ],
  },
};

module.exports = nextConfig;
