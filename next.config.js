await import("./src/env.js");

import withPlaiceholder from "@plaiceholder/next";
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: 'uploadthing.com',
        },
        {
          protocol: "https",
          hostname: "lh3.googleusercontent.com"
        },
        {
          protocol: "https",
          hostname: "utfs.io"
        }
      ],
  },
};

export default withPlaiceholder(nextConfig);
