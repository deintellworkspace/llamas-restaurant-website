import type { NextConfig } from "next";

// Long-lived caching for the versioned media in /public/assets. File names
// change when the media changes, so a year is safe.
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
