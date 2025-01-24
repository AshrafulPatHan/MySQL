/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.icons8.com",
            },
        ],
        unoptimized: true, 
    },
    output: 'export', 
};

export default nextConfig;
