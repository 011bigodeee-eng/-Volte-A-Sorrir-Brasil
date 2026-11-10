import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  images: { qualities: [75, 90] },
};
export default config;
