import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** حزمة تشغيل خفيفة للنشر على VPS/Docker بعد `npm run build` */
  output: "standalone",
};

export default nextConfig;
