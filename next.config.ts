/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This is the important part that skips the errors!
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
