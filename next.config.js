/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
    swcPlugins: [["next-superjson-plugin", {}]],
  },
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};
