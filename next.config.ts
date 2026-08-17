import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Loyiha skrinshotlari og'ir PNG (400–750 KB). AVIF/WebP bilan ular
    // brauzerga bir necha barobar yengil yetib boradi.
    formats: ["image/avif", "image/webp"],
  },
  // Xavfsizlik sarlavhalari: sayt statik portfolio, shuning uchun cheklovlar qattiq.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        // Shriftlar hech qachon o'zgarmaydi (CV PDF uchun yuklanadi) — uzoq kesh.
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
