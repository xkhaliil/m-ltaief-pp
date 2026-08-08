import type { NextConfig } from "next";

// Gallery/content-block images live in Supabase Storage as full-resolution
// originals (several thousand px, several MB each) — letting next/image
// optimize them (resize + re-encode to a modern format) instead of shipping
// the raw file for a 300px thumbnail is the fix for the scroll jank:
// decoding a 6000x4100 source just to show it at 300x225 was the actual
// cost, not the smooth-scroll code itself.
const supabaseHostname = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
