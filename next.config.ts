import type { NextConfig } from "next";

// GitHub Pages serves static files from /SokoPay_website/, so the Pages workflow builds a static
// export under that base path. Every other build (dev, CI, a Node host) is left unchanged.
const pages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  ...(pages && {
    output: "export",
    basePath: "/SokoPay_website",
    // /dashboard/ is written as dashboard/index.html, which a static host can serve directly.
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
