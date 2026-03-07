import type { NextConfig } from "next";
const path = require('path')

const nextConfig: NextConfig = {
  /* config options here */
  // ADD IMAGE HOSTS IF USING EXTERNAL IMAGES
  images: {
    domains: ["res.cloudinary.com"],
  },
  turbopack: {
    root: path.join(__dirname, '..'),
  }
};

export default nextConfig;
