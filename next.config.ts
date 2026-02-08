import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // GitHub Pages: uncomment and set your repo name when deploying
  // basePath: "/your-repo-name",
};

export default nextConfig;
