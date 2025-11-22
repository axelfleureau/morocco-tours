/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Fix for deployment build issues on Replit
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  // Disable webpack cache during build to prevent hash errors
  webpack: (config, { isServer }) => {
    config.cache = false
    return config
  },
  // Configure for Replit environment
  // Note: allowedHosts is handled via hostname binding in dev script
  // Allow all hosts for Replit proxy and Firebase
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
        ],
      },
    ]
  },
}

export default nextConfig