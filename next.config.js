/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('https://', ''),
      process.env.VITE_SUPABASE_URL?.replace('https://', '')
    ].filter(Boolean),
  },
}

module.exports = nextConfig 