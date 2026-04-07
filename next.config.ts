import type { NextConfig } from "next";
<<<<<<< HEAD
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
=======
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794

const nextConfig: NextConfig = {
  /** حزمة تشغيل خفيفة للنشر على VPS/Docker بعد `npm run build` */
  output: "standalone",
<<<<<<< HEAD
  /** يثبّت جذر التتبع على هذا المشروع ويزيل التحذير عند وجود package-lock في مجلد أعلى (مثل ~/mac) */
  outputFileTracingRoot: projectRoot,
=======
>>>>>>> c70be41ce36f9f98afbf8905cf0ea6474ecda794
};

export default nextConfig;
