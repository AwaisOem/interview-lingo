/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
    },
    reactStrictMode: false,
};
export default nextConfig;