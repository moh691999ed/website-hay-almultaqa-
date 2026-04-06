import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  /** حزمة تشغيل خفيفة للنشر على VPS/Docker بعد `npm run build` */
  output: "standalone",
  /** يثبّت جذر التتبع على هذا المشروع ويزيل التحذير عند وجود package-lock في مجلد أعلى (مثل ~/mac) */
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
